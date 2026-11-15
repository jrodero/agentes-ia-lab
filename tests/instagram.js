import assert from "assert/strict";
import { detectarKeyword, normalizar, procesarWebhook, verificarWebhook } from "../instagram-bot.js";

delete process.env.INSTAGRAM_ACCESS_TOKEN; // nunca llamar a la API real en pruebas

const casos = [
  ["Info", "info"],
  ["quiero ir a AUSTRALIA!!", "australia"],
  ["España 🇪🇸", "espana"],
  ["nueva zelanda", "nueva-zelanda"],
  ["Quiero reservar asesoría", "asesoria"],
  ["australiano", null],
  ["", null],
];

for (const [texto, esperado] of casos) {
  assert.equal(detectarKeyword(texto)?.id ?? null, esperado, `keyword para "${texto}"`);
}
assert.equal(normalizar("Asesoría!"), "ASESORIA");

process.env.INSTAGRAM_VERIFY_TOKEN = "token-prueba";
assert.equal(
  verificarWebhook({ "hub.mode": "subscribe", "hub.verify_token": "token-prueba", "hub.challenge": "123" }),
  "123"
);
assert.equal(verificarWebhook({ "hub.mode": "subscribe", "hub.verify_token": "otro" }), null);

const leads = [];
const acciones = await procesarWebhook(
  {
    object: "instagram",
    entry: [
      {
        id: "999",
        messaging: [
          { sender: { id: "111" }, message: { mid: "m1", text: "INFO" } },
          { sender: { id: "111" }, message: { mid: "m1", text: "INFO" } }, // reintento duplicado
          { sender: { id: "999" }, message: { mid: "m2", text: "INFO", is_echo: true } },
          { sender: { id: "222" }, message: { mid: "m3", text: "hola" } },
        ],
        changes: [
          { field: "comments", value: { id: "c1", text: "España", from: { id: "333", username: "ana" } } },
          { field: "comments", value: { id: "c2", text: "INFO", from: { id: "999", username: "mequieroir" } } },
        ],
      },
    ],
  },
  { onLead: (lead) => leads.push(lead) }
);

assert.deepEqual(
  acciones.map((a) => `${a.tipo}:${a.keyword}`),
  ["dm:info", "comentario:espana"]
);
assert.equal(leads.length, 2);
assert.equal(leads[1].username, "ana");

console.log("✅ tests/instagram.js → palabras clave, verificación y webhook OK");
