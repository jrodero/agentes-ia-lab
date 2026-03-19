import 'dotenv/config';
import OpenAI from "openai";
import readline from "readline";
import {
  saludoInicial,
  crearSesion,
  crearEstadoLead,
  crearHistorialInicial,
  extraerContacto,
  contactoCompleto,
  obtenerConversacionUtil,
} from "./bot-core.js";
import { cargarLeads, guardarLead } from "./leads.js";
import { buildMigrationResponseRequest, formatMigrationReply } from "./migration-agent.js";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let sesion = crearSesion();

function resetearChat() {
  sesion = {
    estadoLead: crearEstadoLead(),
    historial: crearHistorialInicial(),
  };

  console.log("\n🔄 Conversación reiniciada.\n");
  console.log("Bot:", saludoInicial, "\n");
}

async function preguntar() {
  rl.question("Cliente: ", async (mensaje) => {
    const limpio = mensaje.trim().toLowerCase();

    if (limpio === "salir") {
      console.log("\nBot: listo, cerramos.\n");
      rl.close();
      return;
    }

    if (limpio === "reset") {
      resetearChat();
      preguntar();
      return;
    }

    if (limpio === "ver lead") {
      console.log("\nEstado actual del lead:\n", sesion.estadoLead, "\n");
      preguntar();
      return;
    }

    if (limpio === "ver leads") {
      console.log("\nLeads guardados:\n", cargarLeads(), "\n");
      preguntar();
      return;
    }

    extraerContacto(sesion.estadoLead, mensaje);

    sesion.historial.push({
      role: "user",
      content: mensaje,
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

      console.log("\nBot:", texto, "\n");

      sesion.historial.push({
        role: "assistant",
        content: texto,
      });

      if (contactoCompleto(sesion.estadoLead)) {
        guardarLead({
          fecha: new Date().toISOString(),
          nombre: sesion.estadoLead.nombre,
          email: sesion.estadoLead.email,
          whatsapp: sesion.estadoLead.whatsapp,
          interesAsesoria: sesion.estadoLead.interesAsesoria,
          conversacion: obtenerConversacionUtil(sesion.historial),
        });

        console.log(
          "Bot: Perfecto. Tu contacto ya ha quedado registrado. Se pondrán en contacto contigo para coordinar la asesoría personalizada.\n"
        );

        sesion.estadoLead = crearEstadoLead();
      }
    } catch (error) {
      console.log("\nError:", error.message, "\n");
    }

    preguntar();
  });
}

console.log("\nBot de Guay Life listo.\n");
console.log("Comandos: salir | reset | ver lead | ver leads\n");
console.log("Bot:", saludoInicial, "\n");

preguntar();
