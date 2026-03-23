import fs from "fs";
import path from "path";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const COMMUNITY_FILE = process.env.COMMUNITY_FILE
  ? path.resolve(process.env.COMMUNITY_FILE)
  : path.join(__dirname, "community-data.json");
export const DEFAULT_AUTH_FILE = path.join(__dirname, "data", "users.json");
export const AUTH_FILE = process.env.AUTH_FILE ? path.resolve(process.env.AUTH_FILE) : DEFAULT_AUTH_FILE;
const SESSION_COOKIE = "glr_session";
const RESET_TOKEN_TTL_MS = 1000 * 60 * 30;

const seedPosts = [
  {
    id: "seed-1",
    authorName: "Carla en Valencia",
    routeId: "espana-soft-landing",
    category: "alojamiento",
    title: "¿Cuánto tiempo conviene entrar con alojamiento puente antes de buscar habitación fija?",
    body:
      "Voy a llegar a Valencia y no sé si reservar una semana, diez días o dos semanas. Me preocupa pagar de más, pero también entrar con presión y terminar aceptando cualquier habitación.",
    createdAt: "2026-03-20T10:00:00.000Z",
    replies: [
      {
        id: "seed-1-r1",
        authorName: "Leo en Madrid",
        body:
          "Yo entraría con al menos 10 a 14 días si tu presupuesto te lo permite. Te da margen para entender zonas y evitar alquileres que después te arrepientas de haber aceptado.",
        createdAt: "2026-03-20T12:00:00.000Z",
      },
    ],
  },
  {
    id: "seed-2",
    authorName: "Nico viajando",
    routeId: "australia-working-holiday",
    category: "tramites",
    title: "Orden de trámites al llegar a Australia para no perder la primera semana",
    body:
      "Estoy intentando armar una secuencia clara: SIM, cuenta bancaria, TFN, alojamiento temporal y CV local. ¿Qué les funcionó primero a ustedes y qué harían distinto?",
    createdAt: "2026-03-19T09:00:00.000Z",
    replies: [
      {
        id: "seed-2-r1",
        authorName: "Lucía en Melbourne",
        body:
          "SIM y banca móvil el primer día. Después TFN y CV. Si no tienes conectividad y cuenta local, todo se siente más lento de lo que realmente es.",
        createdAt: "2026-03-19T10:30:00.000Z",
      },
    ],
  },
  {
    id: "seed-3",
    authorName: "Marina NZ",
    routeId: "nueva-zelanda-soft-landing",
    category: "vida-real",
    title: "¿Nueva Zelanda sirve si quiero un ritmo menos agresivo que Australia?",
    body:
      "No busco solo ahorrar. Quiero una experiencia ordenada, algo de aventura y no sentirme tan pasada por arriba al llegar. ¿A alguien le pasó este cambio de expectativa?",
    createdAt: "2026-03-18T16:00:00.000Z",
    replies: [],
  },
];

function createDefaultCommunityStore() {
  return {
    posts: seedPosts,
    diaryEntries: [],
    favorites: [],
    checklist: [],
  };
}

function createDefaultAuthStore() {
  return {
    users: [],
    sessions: [],
    passwordResetTokens: [],
  };
}

function ensureDirForFile(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function readJsonFile(filePath, fallback) {
  try {
    if (!fs.existsSync(filePath)) {
      return fallback;
    }

    const raw = fs.readFileSync(filePath, "utf-8");
    return {
      ...fallback,
      ...JSON.parse(raw || "{}"),
    };
  } catch {
    return fallback;
  }
}

export function ensureCommunityStore() {
  if (!fs.existsSync(COMMUNITY_FILE)) {
    fs.writeFileSync(COMMUNITY_FILE, JSON.stringify(createDefaultCommunityStore(), null, 2), "utf-8");
  }
}

export function ensureAuthStore() {
  ensureDirForFile(AUTH_FILE);
  if (!fs.existsSync(AUTH_FILE)) {
    fs.writeFileSync(AUTH_FILE, JSON.stringify(createDefaultAuthStore(), null, 2), "utf-8");
  }
}

export function loadCommunityStore() {
  ensureCommunityStore();
  return readJsonFile(COMMUNITY_FILE, createDefaultCommunityStore());
}

export function saveCommunityStore(store) {
  fs.writeFileSync(COMMUNITY_FILE, JSON.stringify(store, null, 2), "utf-8");
}

export function loadAuthStore() {
  ensureAuthStore();
  const store = readJsonFile(AUTH_FILE, createDefaultAuthStore());
  const { nextStore, changed } = mergeBundledAdminUsers(store);

  if (changed) {
    saveAuthStore(nextStore);
  }

  return nextStore;
}

export function saveAuthStore(store) {
  ensureAuthStore();
  fs.writeFileSync(AUTH_FILE, JSON.stringify(store, null, 2), "utf-8");
}

function normalizeEmail(email) {
  return String(email || "")
    .trim()
    .toLowerCase();
}

function normalizeUsername(username) {
  return String(username || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

function buildFallbackUsername(name, email) {
  const fromName = normalizeUsername(name);
  if (fromName) return fromName;

  return normalizeUsername(normalizeEmail(email).split("@")[0]) || `usuario-${crypto.randomUUID().slice(0, 8)}`;
}

function formatUsername(username, name, email) {
  const raw = String(username || "").trim().slice(0, 40);
  return raw || buildFallbackUsername(name, email);
}

function isUsernameTaken(users, username, ignoredUserId = null) {
  const normalizedCandidate = normalizeUsername(username);

  return users.some((user) => {
    if (ignoredUserId && user.id === ignoredUserId) return false;
    return normalizeUsername(user.username) === normalizedCandidate;
  });
}

function hashPassword(password) {
  return bcrypt.hashSync(password, 10);
}

function verifyPassword(password, storedHash) {
  return bcrypt.compareSync(password, storedHash);
}

function loadBundledAuthSeed() {
  return readJsonFile(DEFAULT_AUTH_FILE, createDefaultAuthStore());
}

// Si Railway apunta AUTH_FILE a otro volumen, seguimos garantizando el admin del repo.
function mergeBundledAdminUsers(store) {
  if (AUTH_FILE === DEFAULT_AUTH_FILE) {
    return { nextStore: store, changed: false };
  }

  const seedStore = loadBundledAuthSeed();
  const adminSeeds = seedStore.users.filter((user) => user.role === "admin");

  if (!adminSeeds.length) {
    return { nextStore: store, changed: false };
  }

  const nextUsers = [...store.users];
  let changed = false;

  adminSeeds.forEach((seedUser) => {
    const normalizedSeedUser = {
      id: seedUser.id || crypto.randomUUID(),
      name: String(seedUser.name || "").trim(),
      username: formatUsername(seedUser.username, seedUser.name, seedUser.email),
      email: normalizeEmail(seedUser.email),
      passwordHash: seedUser.passwordHash,
      role: seedUser.role || "admin",
      origin: String(seedUser.origin || "").trim(),
      bio: String(seedUser.bio || "").trim(),
      stage: seedUser.stage || "explorando",
      createdAt: seedUser.createdAt || new Date().toISOString(),
    };

    const existingIndex = nextUsers.findIndex(
      (user) =>
        user.email === normalizedSeedUser.email ||
        normalizeUsername(user.username) === normalizeUsername(normalizedSeedUser.username)
    );

    if (existingIndex === -1) {
      nextUsers.push(normalizedSeedUser);
      changed = true;
      return;
    }

    const existingUser = nextUsers[existingIndex];
    const mergedUser = {
      ...existingUser,
      ...normalizedSeedUser,
      id: existingUser.id || normalizedSeedUser.id,
      createdAt: existingUser.createdAt || normalizedSeedUser.createdAt,
    };

    if (JSON.stringify(existingUser) !== JSON.stringify(mergedUser)) {
      nextUsers[existingIndex] = mergedUser;
      changed = true;
    }
  });

  if (!changed) {
    return { nextStore: store, changed: false };
  }

  return {
    nextStore: {
      ...store,
      users: nextUsers,
    },
    changed: true,
  };
}

export function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    role: user.role,
    origin: user.origin,
    bio: user.bio,
    stage: user.stage,
    createdAt: user.createdAt,
  };
}

function buildUserRecord({ name, username, email, password, origin, stage = "explorando", role = "user", bio = "" }) {
  const normalizedEmail = normalizeEmail(email);
  const displayUsername = formatUsername(username, name, normalizedEmail);

  return {
    id: crypto.randomUUID(),
    name: String(name || "").trim(),
    username: displayUsername,
    email: normalizedEmail,
    passwordHash: hashPassword(password),
    role,
    origin: String(origin || "").trim(),
    bio: String(bio || "").trim(),
    stage,
    createdAt: new Date().toISOString(),
  };
}

export function createUser({ name, username, email, password, origin, stage = "explorando", role = "user", bio = "" }) {
  const store = loadAuthStore();
  const normalizedEmail = normalizeEmail(email);
  const displayUsername = formatUsername(username, name, normalizedEmail);

  if (store.users.some((user) => user.email === normalizedEmail)) {
    throw new Error("Ya existe una cuenta con ese email.");
  }

  if (isUsernameTaken(store.users, displayUsername)) {
    throw new Error("Ya existe una cuenta con ese nombre de usuario.");
  }

  const user = buildUserRecord({
    name,
    username: displayUsername,
    email: normalizedEmail,
    password,
    origin,
    stage,
    role,
    bio,
  });

  store.users.push(user);
  saveAuthStore(store);

  return publicUser(user);
}

export function replaceUsers(users) {
  const store = loadAuthStore();
  const nextUsers = users.map((user) => ({
    id: user.id || crypto.randomUUID(),
    name: String(user.name || "").trim(),
    username: formatUsername(user.username, user.name, user.email),
    email: normalizeEmail(user.email),
    passwordHash: user.passwordHash,
    role: user.role || "user",
    origin: String(user.origin || "").trim(),
    bio: String(user.bio || "").trim(),
    stage: user.stage || "explorando",
    createdAt: user.createdAt || new Date().toISOString(),
  }));

  const userIds = new Set(nextUsers.map((user) => user.id));

  store.users = nextUsers;
  store.sessions = store.sessions.filter((session) => userIds.has(session.userId));
  store.passwordResetTokens = [];
  saveAuthStore(store);

  return nextUsers.map(publicUser);
}

export function authenticateUser({ email, password }) {
  const store = loadAuthStore();
  const credential = String(email || "").trim();
  const normalizedEmail = normalizeEmail(credential);
  const normalizedCredentialUsername = normalizeUsername(credential);
  const user = store.users.find(
    (item) =>
      item.email === normalizedEmail || normalizeUsername(item.username) === normalizedCredentialUsername
  );

  if (!user) {
    throw new Error("El usuario no existe.");
  }

  if (!verifyPassword(password, user.passwordHash)) {
    throw new Error("La contraseña es incorrecta.");
  }

  return publicUser(user);
}

export function createSession(userId) {
  const store = loadAuthStore();
  const token = crypto.randomBytes(32).toString("hex");

  store.sessions = store.sessions.filter((session) => session.userId !== userId);
  store.sessions.push({
    token,
    userId,
    createdAt: new Date().toISOString(),
  });

  saveAuthStore(store);
  return token;
}

export function deleteSession(token) {
  const store = loadAuthStore();
  store.sessions = store.sessions.filter((session) => session.token !== token);
  saveAuthStore(store);
}

export function findUserBySessionToken(token) {
  if (!token) return null;

  const store = loadAuthStore();
  const session = store.sessions.find((item) => item.token === token);
  if (!session) return null;

  const user = store.users.find((item) => item.id === session.userId);
  return user ? publicUser(user) : null;
}

export function createPasswordResetToken(email) {
  const store = loadAuthStore();
  const normalizedEmail = normalizeEmail(email);
  const user = store.users.find((item) => item.email === normalizedEmail);

  if (!user) {
    throw new Error("No encontramos una cuenta con ese email.");
  }

  const token = crypto.randomBytes(20).toString("hex");
  const expiresAt = new Date(Date.now() + RESET_TOKEN_TTL_MS).toISOString();

  store.passwordResetTokens = store.passwordResetTokens.filter(
    (item) => item.userId !== user.id && new Date(item.expiresAt).getTime() > Date.now()
  );
  store.passwordResetTokens.push({
    token,
    userId: user.id,
    email: user.email,
    createdAt: new Date().toISOString(),
    expiresAt,
  });

  saveAuthStore(store);

  return {
    token,
    expiresAt,
    email: user.email,
  };
}

export function resetPasswordWithToken({ token, password }) {
  const store = loadAuthStore();
  const now = Date.now();
  const resetEntry = store.passwordResetTokens.find(
    (item) => item.token === String(token || "").trim() && new Date(item.expiresAt).getTime() > now
  );

  if (!resetEntry) {
    throw new Error("El token no es válido o ya expiró.");
  }

  const user = store.users.find((item) => item.id === resetEntry.userId);
  if (!user) {
    throw new Error("No encontramos el usuario para este token.");
  }

  user.passwordHash = hashPassword(password);
  store.passwordResetTokens = store.passwordResetTokens.filter((item) => item.userId !== user.id);
  store.sessions = store.sessions.filter((session) => session.userId !== user.id);
  saveAuthStore(store);

  return publicUser(user);
}

export function getSessionCookie() {
  return SESSION_COOKIE;
}

export function getBootstrapData(userId = null) {
  const store = loadCommunityStore();

  return {
    posts: [...store.posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    diary: userId ? store.diaryEntries.filter((entry) => entry.userId === userId) : [],
    favorites: userId ? store.favorites.filter((item) => item.userId === userId).map((item) => item.routeId) : [],
    checklist: userId
      ? Object.fromEntries(
          store.checklist.filter((item) => item.userId === userId).map((item) => [item.key, item.completed])
        )
      : {},
  };
}

export function addPost(user, { category, routeId, title, body }) {
  const store = loadCommunityStore();
  const post = {
    id: crypto.randomUUID(),
    authorName: user.name,
    userId: user.id,
    routeId,
    category,
    title: title.trim(),
    body: body.trim(),
    createdAt: new Date().toISOString(),
    replies: [],
  };

  store.posts.unshift(post);
  saveCommunityStore(store);
  return post;
}

export function addReply(user, postId, body) {
  const store = loadCommunityStore();
  const post = store.posts.find((item) => item.id === postId);
  if (!post) {
    throw new Error("No encontramos el hilo.");
  }

  const reply = {
    id: crypto.randomUUID(),
    authorName: user.name,
    userId: user.id,
    body: body.trim(),
    createdAt: new Date().toISOString(),
  };

  post.replies.push(reply);
  saveCommunityStore(store);
  return post;
}

export function addDiaryEntry(user, { routeId, mood, title, body }) {
  const store = loadCommunityStore();
  const entry = {
    id: crypto.randomUUID(),
    userId: user.id,
    routeId,
    mood,
    title: title.trim(),
    body: body.trim(),
    createdAt: new Date().toISOString(),
  };

  store.diaryEntries.unshift(entry);
  saveCommunityStore(store);
  return entry;
}

export function deleteDiaryEntry(user, entryId) {
  const store = loadCommunityStore();
  const before = store.diaryEntries.length;
  store.diaryEntries = store.diaryEntries.filter((entry) => !(entry.id === entryId && entry.userId === user.id));
  saveCommunityStore(store);
  return before !== store.diaryEntries.length;
}

export function toggleFavorite(user, routeId) {
  const store = loadCommunityStore();
  const existing = store.favorites.find((item) => item.userId === user.id && item.routeId === routeId);

  if (existing) {
    store.favorites = store.favorites.filter((item) => !(item.userId === user.id && item.routeId === routeId));
  } else {
    store.favorites.push({
      userId: user.id,
      routeId,
    });
  }

  saveCommunityStore(store);
  return store.favorites.filter((item) => item.userId === user.id).map((item) => item.routeId);
}

export function toggleChecklist(user, key) {
  const store = loadCommunityStore();
  const existing = store.checklist.find((item) => item.userId === user.id && item.key === key);

  if (existing) {
    existing.completed = !existing.completed;
  } else {
    store.checklist.push({
      userId: user.id,
      key,
      completed: true,
    });
  }

  saveCommunityStore(store);

  return Object.fromEntries(
    store.checklist.filter((item) => item.userId === user.id).map((item) => [item.key, item.completed])
  );
}
