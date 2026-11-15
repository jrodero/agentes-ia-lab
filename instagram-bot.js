// Automatización de Instagram para @mequieroir.
// Responde por DM cuando alguien escribe o comenta una palabra clave
// y lleva la conversación hacia la asesoría 1 a 1.
// Usa la API oficial de Instagram (Instagram API with Instagram Login) vía fetch,
// sin dependencias nuevas. Si no hay token configurado, solo registra en consola.

import crypto from "crypto";

const SITE_URL = () => process.env.PUBLIC_SITE_URL || "https://mequieroir.com";
const API_VERSION = () => process.env.INSTAGRAM_API_VERSION || "v23.0";

const NOTA_LEGAL =
  "Esta información es orientativa y no sustituye asesoramiento legal oficial.";

// Palabras clave → respuesta. Se comparan sin tildes y en mayúsculas.
export const KEYWORDS = [
  {
    id: "australia",
    words: ["AUSTRALIA", "AUS", "WHV"],
    reply: () =>
      `¡Hola! Gracias por escribir 🇦🇺\n\nPara Australia, lo primero es saber tu nacionalidad, tu edad y tu objetivo (trabajar, estudiar o quedarte a largo plazo). Según eso, la vía suele ser temporal (por ejemplo, Working Holiday si tu país tiene acuerdo y cumples la edad), por sponsor o de estudio.\n\nSi quieres, revisamos tu caso en una asesoría 1 a 1 de 30 minutos por videollamada (29 €): ${SITE_URL()}/#reserva\n\nO cuéntame aquí tu país de origen y tu edad y te digo si tu caso parece tener opciones.\n\n${NOTA_LEGAL}`,
  },
  {
    id: "nueva-zelanda",
    words: ["NZ", "NUEVA ZELANDA", "NUEVAZELANDA", "NEW ZEALAND"],
    reply: () =>
      `¡Hola! Gracias por escribir 🇳🇿\n\nPara Nueva Zelanda importa mucho tu nacionalidad, tu edad y si buscas una experiencia temporal o algo a largo plazo. Los cupos y fechas cambian, así que conviene revisar tu caso con información oficial actualizada.\n\nPuedes reservar una asesoría 1 a 1 de 30 minutos (29 €): ${SITE_URL()}/#reserva\n\nO dime aquí tu país de origen y tu edad para una primera orientación.\n\n${NOTA_LEGAL}`,
  },
  {
    id: "espana",
    words: ["ESPANA", "SPAIN"],
    reply: () =>
      `¡Hola! Gracias por escribir 🇪🇸\n\nPara España, la vía depende sobre todo de tu nacionalidad, de si quieres estudiar, trabajar o residir, y de tu situación actual. Hay caminos muy distintos y elegir bien desde el principio ahorra tiempo y dinero.\n\nPuedes reservar una asesoría 1 a 1 de 30 minutos (29 €): ${SITE_URL()}/#reserva\n\nO cuéntame aquí tu país de origen y tu objetivo.\n\n${NOTA_LEGAL}`,
  },
  {
    id: "asesoria",
    words: ["ASESORIA", "RESERVAR", "RESERVA", "CITA"],
    reply: () =>
      `¡Genial! La asesoría es 1 a 1, dura 30 minutos, es por videollamada y cuesta 29 €.\n\nEn la sesión analizamos tu perfil, comparamos 2 o 3 caminos realistas y definimos los próximos pasos.\n\nReserva aquí: ${SITE_URL()}/#reserva\n\nNo prometemos visados ni resultados: te ayudamos a decidir con información clara y oficial.`,
  },
  {
    id: "info",
    words: ["INFO", "GUIA", "QUIERO IR", "MEQUIEROIR", "ME QUIERO IR"],
    reply: () =>
      `¡Hola! Gracias por escribir ✈️\n\nPara orientarte, cuéntame:\n1. Tu país de origen\n2. A qué país quieres ir\n3. Tu objetivo (trabajo, estudio, residencia u otro)\n4. Tu edad aproximada\n\nTambién puedes hablar con nuestro asistente en ${SITE_URL()} o reservar una asesoría 1 a 1 de 30 minutos (29 €): ${SITE_URL()}/#reserva`,
  },
];

export function normalizar(texto = "") {
  return String(texto)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toUpperCase()
    .replace(/[^A-Z0-9 ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Devuelve la primera regla cuya palabra clave aparece como palabra completa.
export function detectarKeyword(texto) {
  const limpio = ` ${normalizar(texto)} `;
  if (!limpio.trim()) return null;
  return (
    KEYWORDS.find((regla) => regla.words.some((word) => limpio.includes(` ${word} `))) || null
  );
}

// Verificación de suscripción (GET) que hace Meta al configurar el webhook.
export function verificarWebhook(query = {}) {
  const verifyToken = process.env.INSTAGRAM_VERIFY_TOKEN;
  if (
    verifyToken &&
    query["hub.mode"] === "subscribe" &&
    query["hub.verify_token"] === verifyToken
  ) {
    return query["hub.challenge"] ?? "";
  }
  return null;
}

// Comprueba la cabecera X-Hub-Signature-256 con el App Secret.
export function firmaValida(rawBody, signatureHeader) {
  const secret = process.env.INSTAGRAM_APP_SECRET;
  if (!secret || !rawBody || !signatureHeader?.startsWith("sha256=")) return false;
  const esperada = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  const recibida = signatureHeader.slice("sha256=".length);
  if (recibida.length !== esperada.length) return false;
  return crypto.timingSafeEqual(Buffer.from(recibida, "hex"), Buffer.from(esperada, "hex"));
}

async function llamarGraph(pathname, body) {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) {
    console.log(`[instagram] Sin INSTAGRAM_ACCESS_TOKEN: no se envía ${pathname}`);
    return { skipped: true };
  }

  const response = await fetch(`https://graph.instagram.com/${API_VERSION()}/${pathname}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const detalle = await response.text();
    throw new Error(`Graph API ${response.status}: ${detalle.slice(0, 300)}`);
  }
  return response.json();
}

// DM normal a un usuario que nos escribió (ventana de 24 h).
export function enviarDM(recipientId, texto) {
  return llamarGraph("me/messages", { recipient: { id: recipientId }, message: { text: texto } });
}

// Respuesta privada por DM a un comentario.
export function responderComentarioPorDM(commentId, texto) {
  return llamarGraph("me/messages", { recipient: { comment_id: commentId }, message: { text: texto } });
}

// Respuesta pública corta bajo el comentario.
export function responderComentarioPublico(commentId, texto) {
  return llamarGraph(`${commentId}/replies`, { message: texto });
}

const RESPUESTAS_PUBLICAS = [
  "¡Te escribí por DM! 📩",
  "¡Listo, revisa tus mensajes! ✈️",
  "¡Te mandé la info por privado! 🙌",
];

// Evita responder dos veces al mismo evento si Meta reintenta la entrega.
const procesados = new Set();
function yaProcesado(id) {
  if (!id) return false;
  if (procesados.has(id)) return true;
  procesados.add(id);
  if (procesados.size > 5000) procesados.delete(procesados.values().next().value);
  return false;
}

// Procesa el cuerpo del webhook. Devuelve la lista de acciones decididas
// (útil para pruebas y logs). onLead se llama con cada contacto interesado.
export async function procesarWebhook(payload, { onLead } = {}) {
  const acciones = [];
  if (payload?.object !== "instagram") return acciones;

  for (const entry of payload.entry || []) {
    const cuentaPropia = String(entry.id || "");

    for (const evento of entry.messaging || []) {
      const mensaje = evento.message;
      if (!mensaje || mensaje.is_echo || !mensaje.text) continue;
      const senderId = String(evento.sender?.id || "");
      if (!senderId || senderId === cuentaPropia || yaProcesado(mensaje.mid)) continue;

      const regla = detectarKeyword(mensaje.text);
      if (!regla) continue;

      acciones.push({ tipo: "dm", keyword: regla.id, senderId });
      onLead?.({ canal: "instagram-dm", instagramId: senderId, keyword: regla.id, texto: mensaje.text });
      try {
        await enviarDM(senderId, regla.reply());
      } catch (error) {
        console.error("[instagram] Error enviando DM:", error.message);
      }
    }

    for (const cambio of entry.changes || []) {
      if (cambio.field !== "comments") continue;
      const comentario = cambio.value || {};
      const autorId = String(comentario.from?.id || "");
      if (!comentario.id || !autorId || autorId === cuentaPropia || yaProcesado(comentario.id)) continue;

      const regla = detectarKeyword(comentario.text);
      if (!regla) continue;

      acciones.push({ tipo: "comentario", keyword: regla.id, commentId: comentario.id });
      onLead?.({
        canal: "instagram-comentario",
        instagramId: autorId,
        username: comentario.from?.username,
        keyword: regla.id,
        texto: comentario.text,
      });
      try {
        await responderComentarioPorDM(comentario.id, regla.reply());
        const publica = RESPUESTAS_PUBLICAS[Math.floor(Math.random() * RESPUESTAS_PUBLICAS.length)];
        await responderComentarioPublico(comentario.id, publica);
      } catch (error) {
        console.error("[instagram] Error respondiendo comentario:", error.message);
      }
    }
  }

  return acciones;
}
