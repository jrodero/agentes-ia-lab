import 'dotenv/config';
import OpenAI from "openai";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
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
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const sessions = {};

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

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
