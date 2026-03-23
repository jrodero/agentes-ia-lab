import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const port = String(3200 + Math.floor(Math.random() * 400));
const baseUrl = `http://127.0.0.1:${port}`;
const password = "ClaveSegura123";
const newPassword = "NuevaClave456";
const email = `healthcheck+${Date.now()}@example.com`;
const tempDir = path.join(process.cwd(), "tests", ".tmp");
const authFile = path.join(tempDir, `users-${Date.now()}.json`);
const communityFile = path.join(tempDir, `community-${Date.now()}.json`);

let cookie = "";
let createdPostId = "";
let createdEntryId = "";
let resetToken = "";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function formatLine(ok, method, path, detail) {
  return `${ok ? "✅" : "❌"} ${method} ${path} → ${detail}`;
}

function formatError(method, path, error) {
  return formatLine(false, method, path, `ERROR ${error.message}`);
}

async function waitForServer(url, timeoutMs = 10000) {
  const start = Date.now();

  while (Date.now() - start < timeoutMs) {
    try {
      const response = await fetch(`${url}/api/health`);
      if (response.ok) return;
    } catch {
      // El servidor todavía no está listo.
    }

    await sleep(250);
  }

  throw new Error("El servidor no respondió a tiempo.");
}

async function request({ method, path, body }) {
  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...(cookie ? { Cookie: cookie } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const setCookie = response.headers.get("set-cookie");
  if (setCookie) {
    cookie = setCookie.split(";")[0];
  }

  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return {
      status: response.status,
      statusText: response.statusText,
      data: await response.json(),
    };
  }

  return {
    status: response.status,
    statusText: response.statusText,
    text: await response.text(),
  };
}

async function runCheck({ method, path, body, expectedStatus, validate }) {
  try {
    const response = await request({ method, path, body });

    if (response.status === expectedStatus) {
      if (validate) {
        const validationMessage = validate(response);
        if (validationMessage) {
          return {
            ok: false,
            line: formatLine(false, method, path, validationMessage),
          };
        }
      }

      return {
        ok: true,
        line: formatLine(true, method, path, `${response.status} ${response.statusText}`.trim()),
      };
    }

    return {
      ok: false,
      line: formatLine(false, method, path, `ERROR ${response.status} ${response.statusText}`.trim()),
    };
  } catch (error) {
    return {
      ok: false,
      line: formatError(method, path, error),
    };
  }
}

const server = spawn("node", ["server.js"], {
  cwd: process.cwd(),
  env: {
    ...process.env,
    PORT: port,
    AUTH_FILE: authFile,
    COMMUNITY_FILE: communityFile,
  },
  stdio: ["ignore", "pipe", "pipe"],
});

let stderr = "";

fs.mkdirSync(tempDir, { recursive: true });

server.stderr.on("data", (chunk) => {
  stderr += chunk.toString();
});

try {
  await waitForServer(baseUrl);

  const checks = [
    { method: "GET", path: "/api/health", expectedStatus: 200 },
    { method: "GET", path: "/api/posts", expectedStatus: 200 },
    { method: "GET", path: "/api/forum", expectedStatus: 200 },
    { method: "GET", path: "/api/countries", expectedStatus: 200 },
    { method: "GET", path: "/api/tools/visa-alerts", expectedStatus: 200 },
    { method: "GET", path: "/api/tools/first30", expectedStatus: 200 },
    {
      method: "GET",
      path: "/rutas/",
      expectedStatus: 200,
      validate: ({ text }) =>
        text?.includes("Routes Community") ? "" : "La app beta no devolvió el HTML esperado.",
    },
    { method: "GET", path: "/api/community/bootstrap", expectedStatus: 200 },
    { method: "GET", path: "/api/auth/me", expectedStatus: 401 },
    {
      method: "POST",
      path: "/api/community/posts",
      expectedStatus: 401,
      body: {
        category: "tramites",
        routeId: "espana-soft-landing",
        title: "Sin login",
        body: "Esto no debería publicarse.",
      },
    },
    {
      method: "POST",
      path: "/api/auth/register",
      expectedStatus: 201,
      body: {
        name: "Health Check",
        email,
        password,
        origin: "España",
        stage: "explorando",
      },
    },
    {
      method: "GET",
      path: "/api/auth/me",
      expectedStatus: 200,
      validate: ({ data }) =>
        data.user?.email === email ? "" : "La sesión no quedó activa tras el registro.",
    },
    {
      method: "GET",
      path: "/api/community/bootstrap",
      expectedStatus: 200,
      validate: ({ data }) => (data.user?.email === email ? "" : "Bootstrap no devolvió el usuario autenticado."),
    },
    {
      method: "POST",
      path: "/api/community/posts",
      expectedStatus: 201,
      body: {
        category: "tramites",
        routeId: "espana-soft-landing",
        title: "Prueba de publicación",
        body: "Queremos validar que el hilo quede guardado con sesión activa.",
      },
      validate: ({ data }) => {
        createdPostId = data.post?.id || "";
        return createdPostId ? "" : "No se devolvió el id del post creado.";
      },
    },
    {
      method: "POST",
      path: "/api/community/posts/seed-1/replies",
      expectedStatus: 200,
      body: {
        body: "Respuesta desde la prueba de integración.",
      },
      validate: ({ data }) =>
        Array.isArray(data.post?.replies) ? "" : "La respuesta al hilo no devolvió replies.",
    },
    {
      method: "POST",
      path: "/api/community/favorites/espana-soft-landing/toggle",
      expectedStatus: 200,
      validate: ({ data }) =>
        data.favorites?.includes("espana-soft-landing") ? "" : "No se guardó la ruta en favoritos.",
    },
    {
      method: "POST",
      path: "/api/community/checklist/toggle",
      expectedStatus: 200,
      body: {
        key: "espana-soft-landing:before",
      },
      validate: ({ data }) =>
        data.checklist?.["espana-soft-landing:before"] === true
          ? ""
          : "No se marcó la etapa del checklist.",
    },
    {
      method: "POST",
      path: "/api/community/diary",
      expectedStatus: 201,
      body: {
        routeId: "espana-soft-landing",
        mood: "enfocado",
        title: "Entrada de prueba",
        body: "Estamos verificando la bitácora autenticada.",
      },
      validate: ({ data }) => {
        createdEntryId = data.entry?.id || "";
        return createdEntryId ? "" : "No se devolvió el id de la entrada de bitácora.";
      },
    },
    {
      method: "GET",
      path: "/api/community/diary",
      expectedStatus: 200,
      validate: ({ data }) =>
        data.diary?.some((entry) => entry.id === createdEntryId) ? "" : "La bitácora no devolvió la entrada creada.",
    },
    {
      method: "POST",
      path: "/api/auth/forgot-password",
      expectedStatus: 200,
      body: {
        email,
      },
      validate: ({ data }) => {
        resetToken = data.token || "";
        return resetToken ? "" : "No se devolvió el token de recuperación.";
      },
    },
    {
      method: "POST",
      path: "/api/auth/reset-password",
      expectedStatus: 200,
      body: () => ({
        token: resetToken,
        password: newPassword,
      }),
    },
    {
      method: "GET",
      path: "/api/auth/me",
      expectedStatus: 401,
    },
    {
      method: "POST",
      path: "/api/auth/login",
      expectedStatus: 401,
      body: {
        email,
        password,
      },
    },
    {
      method: "POST",
      path: "/api/auth/login",
      expectedStatus: 200,
      body: {
        email,
        password: newPassword,
      },
    },
    {
      method: "DELETE",
      path: "/api/community/diary/__ENTRY_ID__",
      expectedStatus: 200,
      validate: ({ data }) => (data.ok === true ? "" : "No se pudo eliminar la entrada creada."),
    },
    {
      method: "POST",
      path: "/api/auth/logout",
      expectedStatus: 200,
    },
    {
      method: "GET",
      path: "/api/auth/me",
      expectedStatus: 401,
    },
  ];

  const results = [];

  for (const check of checks) {
    const resolvedBody = typeof check.body === "function" ? check.body() : check.body;
    const resolvedPath = check.path.replace("__ENTRY_ID__", createdEntryId);
    results.push(
      await runCheck({
        ...check,
        path: resolvedPath,
        body: resolvedBody,
      })
    );
  }

  results.forEach((result) => {
    console.log(result.line);
  });

  if (results.some((result) => !result.ok)) {
    process.exitCode = 1;
  }
} catch (error) {
  console.error(`❌ tests/health.js → ERROR ${error.message}`);
  if (stderr.trim()) {
    console.error(stderr.trim());
  }
  process.exitCode = 1;
} finally {
  server.kill("SIGTERM");
  fs.rmSync(authFile, { force: true });
  fs.rmSync(communityFile, { force: true });
}
