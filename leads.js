import fs from "fs";

export const LEADS_FILE = "leads.json";

export function cargarLeads() {
  try {
    if (!fs.existsSync(LEADS_FILE)) return [];
    const data = fs.readFileSync(LEADS_FILE, "utf-8");
    return JSON.parse(data || "[]");
  } catch (error) {
    console.error("Error leyendo leads.json:", error.message);
    return [];
  }
}

export function guardarLead(lead) {
  try {
    const leads = cargarLeads();
    leads.push(lead);
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
    console.log("✅ Lead guardado en leads.json");
  } catch (error) {
    console.error("Error guardando lead:", error.message);
  }
}
