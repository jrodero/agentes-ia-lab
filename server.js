import 'dotenv/config';
import OpenAI from "openai";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import {
  addDiaryEntry,
  addPost,
  addReply,
  authenticateUser,
  createSession,
  createPasswordResetToken,
  createUser,
  deleteDiaryEntry,
  deleteSession,
  ensureAuthStore,
  ensureCommunityStore,
  findUserBySessionToken,
  getBootstrapData,
  getSessionCookie,
  publicUser,
  resetPasswordWithToken,
  toggleChecklist,
  toggleFavorite,
} from "./community-store.js";
import {
  saludoInicial,
  crearSesion,
  extraerContacto,
  contactoCompleto,
  obtenerConversacionUtil,
  crearEstadoLead,
} from "./bot-core.js";
import { guardarLead } from "./leads.js";
import { buildMigrationResponseRequest, formatMigrationReply } from "./migration-agent.js";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
const PORT = Number(process.env.PORT || 4000);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.disable("x-powered-by");

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; base-uri 'self'; connect-src 'self'; font-src 'self' https://fonts.gstatic.com data:; frame-ancestors 'none'; img-src 'self' data: https:; object-src 'none'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; form-action 'self'"
  );
  res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  res.setHeader("X-Frame-Options", "DENY");
  next();
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const sessions = {};
ensureCommunityStore();
ensureAuthStore();

const featuredCountries = [
  {
    id: "australia",
    name: "Australia",
    focus: "Working Holiday y aterrizaje laboral",
  },
  {
    id: "nueva-zelanda",
    name: "Nueva Zelanda",
    focus: "Aterrizaje equilibrado y adaptación",
  },
  {
    id: "espana",
    name: "España",
    focus: "Idioma, comunidad y reinicio",
  },
];

const toolSnapshots = {
  "visa-alerts": [
    {
      country: "Australia",
      summary: "Verifica elegibilidad y documentación oficial antes de iniciar cualquier proceso.",
    },
    {
      country: "Nueva Zelanda",
      summary: "Conviene revisar cupos, fechas y condiciones activas directamente en la web oficial.",
    },
  ],
  first30: [
    "Definir alojamiento puente real antes de viajar.",
    "Ordenar documentos y copias digitales.",
    "Priorizar SIM, cuenta bancaria y presupuesto de llegada.",
  ],
};

function parseCookies(cookieHeader = "") {
  return Object.fromEntries(
    cookieHeader
      .split(";")
      .map((chunk) => chunk.trim())
      .filter(Boolean)
      .map((chunk) => {
        const index = chunk.indexOf("=");
        return [chunk.slice(0, index), decodeURIComponent(chunk.slice(index + 1))];
      })
  );
}

function getAuthenticatedUser(req) {
  const cookies = parseCookies(req.headers.cookie || "");
  const token = cookies[getSessionCookie()];
  return findUserBySessionToken(token);
}

function setSessionCookie(res, token) {
  res.setHeader(
    "Set-Cookie",
    `${getSessionCookie()}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 30}`
  );
}

function clearSessionCookie(res) {
  res.setHeader("Set-Cookie", `${getSessionCookie()}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`);
}

function requireCommunityAuth(req, res, next) {
  const user = getAuthenticatedUser(req);
  if (!user) {
    return res.status(401).json({ error: "Necesitas iniciar sesión." });
  }

  req.communityUser = user;
  next();
}

function registerCommunityUser(req, res) {
  const { name, username, email, password, origin, stage } = req.body;

  if (!name || !email || !password || !origin || !stage) {
    return res.status(400).json({ error: "Faltan datos obligatorios." });
  }

  if (password.length < 8) {
    return res.status(400).json({ error: "La contraseña debe tener al menos 8 caracteres." });
  }

  try {
    const user = createUser({ name, username, email, password, origin, stage });
    const token = createSession(user.id);
    setSessionCookie(res, token);

    return res.status(201).json({
      user,
      ...getBootstrapData(user.id),
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

function loginCommunityUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Faltan email o contraseña." });
  }

  try {
    const user = authenticateUser({ email, password });
    const token = createSession(user.id);
    setSessionCookie(res, token);

    return res.json({
      user,
      ...getBootstrapData(user.id),
    });
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
}

function logoutCommunityUser(req, res) {
  const cookies = parseCookies(req.headers.cookie || "");
  const token = cookies[getSessionCookie()];
  if (token) {
    deleteSession(token);
  }
  clearSessionCookie(res);
  res.json({ ok: true });
}

app.get("/api/init", (req, res) => {
  const sessionId = Date.now().toString() + Math.random().toString(36).slice(2, 8);
  sessions[sessionId] = crearSesion();

  res.json({
    sessionId,
    message: saludoInicial,
  });
});

app.post("/api/chat", async (req, res) => {
  const { sessionId, message } = req.body;

  if (!sessionId || !message) {
    return res.status(400).json({
      error: "Faltan sessionId o message",
    });
  }

  if (!sessions[sessionId]) {
    sessions[sessionId] = crearSesion();
  }

  const sesion = sessions[sessionId];

  extraerContacto(sesion.estadoLead, message);

  sesion.historial.push({
    role: "user",
    content: message,
  });

  try {
    const response = await client.responses.create(
      buildMigrationResponseRequest(sesion.historial, {
        enableOfficialSearch: true,
      })
    );

    const texto = formatMigrationReply(response, {
      includeSources: false,
    });

    sesion.historial.push({
      role: "assistant",
      content: texto,
    });

    let leadSaved = false;

    if (contactoCompleto(sesion.estadoLead)) {
      guardarLead({
        fecha: new Date().toISOString(),
        nombre: sesion.estadoLead.nombre,
        email: sesion.estadoLead.email,
        whatsapp: sesion.estadoLead.whatsapp,
        interesAsesoria: sesion.estadoLead.interesAsesoria,
        conversacion: obtenerConversacionUtil(sesion.historial),
      });

      leadSaved = true;
      sesion.estadoLead = crearEstadoLead();
    }

    res.json({
      reply: texto,
      leadSaved,
    });
  } catch (error) {
    console.error("Error en /api/chat:", error.message);
    res.status(500).json({
      error: "Error al generar respuesta",
    });
  }
});

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    service: "guay-life",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/posts", (req, res) => {
  const data = getBootstrapData();
  res.json({ posts: data.posts });
});

app.get("/api/forum", (req, res) => {
  const data = getBootstrapData();
  res.json({
    total: data.posts.length,
    posts: data.posts,
  });
});

app.get("/api/countries", (req, res) => {
  res.json({ countries: featuredCountries });
});

app.get("/api/tools/visa-alerts", (req, res) => {
  res.json({
    tool: "visa-alerts",
    items: toolSnapshots["visa-alerts"],
  });
});

app.get("/api/tools/first30", (req, res) => {
  res.json({
    tool: "first30",
    checklist: toolSnapshots.first30,
  });
});

app.get("/api/community/bootstrap", (req, res) => {
  const user = getAuthenticatedUser(req);
  const data = getBootstrapData(user?.id);

  res.json({
    user: user ? publicUser(user) : null,
    ...data,
  });
});

app.get("/api/auth/me", (req, res) => {
  const user = getAuthenticatedUser(req);
  if (!user) {
    return res.status(401).json({ error: "No hay una sesión activa." });
  }

  res.json({ user });
});

app.post("/api/auth/forgot-password", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Necesitamos un email para iniciar la recuperación." });
  }

  try {
    const reset = createPasswordResetToken(email);
    res.json({
      ok: true,
      message: "Token de recuperación generado.",
      token: reset.token,
      expiresAt: reset.expiresAt,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

app.post("/api/auth/reset-password", (req, res) => {
  const { token, password } = req.body;

  if (!token || !password) {
    return res.status(400).json({ error: "Faltan el token o la nueva contraseña." });
  }

  if (password.length < 8) {
    return res.status(400).json({ error: "La contraseña debe tener al menos 8 caracteres." });
  }

  try {
    const user = resetPasswordWithToken({ token, password });
    res.json({
      ok: true,
      message: "La contraseña se actualizó correctamente.",
      user,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/api/auth/register", registerCommunityUser);
app.post("/api/auth/login", loginCommunityUser);
app.post("/api/auth/logout", logoutCommunityUser);

app.post("/api/community/auth/register", registerCommunityUser);
app.post("/api/community/auth/login", loginCommunityUser);
app.post("/api/community/auth/logout", logoutCommunityUser);

app.post("/api/community/posts", requireCommunityAuth, (req, res) => {
  const { category, routeId, title, body } = req.body;

  if (!category || !routeId || !title || !body) {
    return res.status(400).json({ error: "Faltan datos para publicar." });
  }

  const post = addPost(req.communityUser, { category, routeId, title, body });
  res.status(201).json({ post });
});

app.post("/api/community/posts/:postId/replies", requireCommunityAuth, (req, res) => {
  const { body } = req.body;
  if (!body) {
    return res.status(400).json({ error: "La respuesta no puede estar vacía." });
  }

  try {
    const post = addReply(req.communityUser, req.params.postId, body);
    res.json({ post });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

app.get("/api/community/diary", requireCommunityAuth, (req, res) => {
  const data = getBootstrapData(req.communityUser.id);
  res.json({ diary: data.diary });
});

app.post("/api/community/diary", requireCommunityAuth, (req, res) => {
  const { routeId, mood, title, body } = req.body;
  if (!routeId || !mood || !title || !body) {
    return res.status(400).json({ error: "Faltan datos para la bitácora." });
  }

  const entry = addDiaryEntry(req.communityUser, { routeId, mood, title, body });
  res.status(201).json({ entry });
});

app.delete("/api/community/diary/:entryId", requireCommunityAuth, (req, res) => {
  const deleted = deleteDiaryEntry(req.communityUser, req.params.entryId);
  if (!deleted) {
    return res.status(404).json({ error: "No encontramos esa entrada." });
  }
  res.json({ ok: true });
});

app.post("/api/community/favorites/:routeId/toggle", requireCommunityAuth, (req, res) => {
  const favorites = toggleFavorite(req.communityUser, req.params.routeId);
  res.json({ favorites });
});

app.post("/api/community/checklist/toggle", requireCommunityAuth, (req, res) => {
  const { key } = req.body;
  if (!key) {
    return res.status(400).json({ error: "Falta la clave del checklist." });
  }

  const checklist = toggleChecklist(req.communityUser, key);
  res.json({ checklist });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
