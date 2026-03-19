const COUNTRY_DOMAIN_MAP = [
  {
    key: "argentina",
    aliases: ["argentina"],
    domains: [],
  },
  {
    key: "colombia",
    aliases: ["colombia"],
    domains: [],
  },
  {
    key: "mexico",
    aliases: ["mexico", "méxico"],
    domains: [],
  },
  {
    key: "peru",
    aliases: ["peru", "perú"],
    domains: [],
  },
  {
    key: "chile",
    aliases: ["chile"],
    domains: [],
  },
  {
    key: "venezuela",
    aliases: ["venezuela"],
    domains: [],
  },
  {
    key: "ecuador",
    aliases: ["ecuador"],
    domains: [],
  },
  {
    key: "uruguay",
    aliases: ["uruguay"],
    domains: [],
  },
  {
    key: "paraguay",
    aliases: ["paraguay"],
    domains: [],
  },
  {
    key: "bolivia",
    aliases: ["bolivia"],
    domains: [],
  },
  {
    key: "brasil",
    aliases: ["brasil", "brazil"],
    domains: [],
  },
  {
    key: "india",
    aliases: ["india"],
    domains: [],
  },
  {
    key: "canada",
    aliases: ["canada", "canadá"],
    domains: ["canada.ca"],
  },
  {
    key: "estados-unidos",
    aliases: ["estados unidos", "eeuu", "usa", "us", "united states"],
    domains: ["uscis.gov", "travel.state.gov", "state.gov"],
  },
  {
    key: "reino-unido",
    aliases: ["reino unido", "uk", "gran bretaña", "inglaterra", "escocia", "gales", "irlanda del norte"],
    domains: ["gov.uk"],
  },
  {
    key: "australia",
    aliases: ["australia"],
    domains: ["homeaffairs.gov.au", "immi.homeaffairs.gov.au", "studyaustralia.gov.au"],
  },
  {
    key: "nueva-zelanda",
    aliases: ["nueva zelanda", "new zealand"],
    domains: ["immigration.govt.nz", "nzqa.govt.nz"],
  },
  {
    key: "irlanda",
    aliases: ["irlanda", "ireland"],
    domains: ["irishimmigration.ie", "enterprise.gov.ie", "gov.ie"],
  },
  {
    key: "alemania",
    aliases: ["alemania", "germany"],
    domains: ["make-it-in-germany.com", "bamf.de", "auswaertiges-amt.de"],
  },
  {
    key: "espana",
    aliases: ["españa", "espana", "spain"],
    domains: ["exteriores.gob.es", "inclusion.gob.es", "administracion.gob.es"],
  },
  {
    key: "portugal",
    aliases: ["portugal"],
    domains: ["aima.gov.pt", "eportugal.gov.pt", "gov.pt"],
  },
  {
    key: "francia",
    aliases: ["francia", "france"],
    domains: ["france-visas.gouv.fr", "service-public.fr"],
  },
  {
    key: "paises-bajos",
    aliases: ["paises bajos", "países bajos", "holanda", "netherlands"],
    domains: ["ind.nl", "government.nl"],
  },
  {
    key: "italia",
    aliases: ["italia", "italy"],
    domains: ["esteri.it", "lavoro.gov.it", "interno.gov.it"],
  },
  {
    key: "suiza",
    aliases: ["suiza", "switzerland"],
    domains: ["sem.admin.ch", "eda.admin.ch"],
  },
  {
    key: "noruega",
    aliases: ["noruega", "norway"],
    domains: ["udi.no", "regjeringen.no"],
  },
  {
    key: "suecia",
    aliases: ["suecia", "sweden"],
    domains: ["migrationsverket.se", "government.se"],
  },
  {
    key: "dinamarca",
    aliases: ["dinamarca", "denmark"],
    domains: ["nyidanmark.dk", "lifeindenmark.borger.dk"],
  },
  {
    key: "austria",
    aliases: ["austria"],
    domains: ["migration.gv.at", "oesterreich.gv.at"],
  },
  {
    key: "belgica",
    aliases: ["belgica", "bélgica", "belgium"],
    domains: ["dofi.ibz.be", "belgium.be"],
  },
  {
    key: "polonia",
    aliases: ["polonia", "poland"],
    domains: ["gov.pl"],
  },
  {
    key: "republica-checa",
    aliases: ["republica checa", "república checa", "chequia", "czech republic", "czechia"],
    domains: ["mzv.gov.cz", "mvcr.cz"],
  },
  {
    key: "singapur",
    aliases: ["singapur", "singapore"],
    domains: ["mom.gov.sg", "ica.gov.sg"],
  },
  {
    key: "emiratos-arabes-unidos",
    aliases: ["emiratos arabes unidos", "emiratos árabes unidos", "uae", "dubai", "abu dhabi"],
    domains: ["u.ae", "gdrfad.gov.ae", "mohre.gov.ae"],
  },
  {
    key: "japon",
    aliases: ["japon", "japón", "japan"],
    domains: ["moj.go.jp", "mofa.go.jp"],
  },
];

const COUNTRY_ROUTE_GUIDANCE = {
  australia: {
    focus: [
      "entrada rápida o temporal vinculada a estudio o experiencia reciente",
      "sponsor o empleador para rutas patrocinadas",
      "residencia por puntos o skilled migration cuando el perfil lo permita",
    ],
  },
  "nueva-zelanda": {
    focus: [
      "entrada temporal por estudio u opciones iniciales de trabajo",
      "sponsor o empleador acreditado",
      "residencia por skilled pathways cuando el perfil tenga buen encaje",
    ],
  },
  espana: {
    focus: [
      "entrada inicial vinculada a estudio o residencia temporal",
      "trabajo con oferta o patrocinio cuando aplique",
      "residencia a medio plazo si el perfil y la vía elegida lo permiten",
    ],
  },
  canada: {
    focus: [
      "entrada temporal o inicial según objetivo y presupuesto",
      "sponsor o empleador si existe oferta real",
      "residencia por puntos o programas permanentes cuando el perfil encaje",
    ],
  },
  "estados-unidos": {
    focus: [
      "entradas iniciales muy condicionadas por el perfil y el objetivo real",
      "sponsor o empleador como vía clave para trabajo",
      "residencia o permanencia solo en escenarios muy concretos y no como expectativa simple",
    ],
  },
  "reino-unido": {
    focus: [
      "entrada temporal o estudio cuando tenga sentido",
      "sponsor o empleador como ruta principal para trabajo",
      "residencia a medio plazo solo si la vía inicial realmente lo permite",
    ],
  },
  alemania: {
    focus: [
      "entrada inicial por búsqueda cualificada, estudio o ruta temporal según perfil",
      "empleador o contrato cuando sea clave",
      "residencia a medio plazo si el perfil profesional lo sostiene",
    ],
  },
  portugal: {
    focus: [
      "entrada inicial según objetivo y presupuesto",
      "trabajo con oferta o actividad concreta si aplica",
      "residencia con lógica de permanencia si el caso está bien armado",
    ],
  },
};

const ORIGIN_MARKERS = [
  "soy de",
  "vengo de",
  "mi pais es",
  "mi país es",
  "naci en",
  "nací en",
  "tengo nacionalidad",
  "actualmente vivo en",
  "actualmente resido en",
  "resido en",
  "vivo en",
];

const DESTINATION_MARKERS = [
  "quiero ir a",
  "quiero emigrar a",
  "quiero mudarme a",
  "quiero vivir en",
  "quiero trabajar en",
  "quiero estudiar en",
  "mi destino es",
  "estoy pensando en",
  "me interesa",
  "estoy mirando",
  "quiero aplicar a",
  "quiero aplicar en",
];

function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getUserText(history) {
  return history
    .filter((item) => item.role === "user")
    .map((item) => item.content)
    .join(" \n ");
}

function includesAlias(text, alias) {
  return new RegExp(`(^|\\s)${alias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(\\s|$)`, "i").test(text);
}

function findCountryInText(text) {
  const normalized = normalizeText(text);

  for (const country of COUNTRY_DOMAIN_MAP) {
    for (const alias of country.aliases) {
      if (includesAlias(normalized, normalizeText(alias))) {
        return country;
      }
    }
  }

  return null;
}

function findCountryAfterMarkers(text, markers) {
  const normalized = normalizeText(text);

  for (const marker of markers) {
    const normalizedMarker = normalizeText(marker);
    const index = normalized.indexOf(normalizedMarker);
    if (index === -1) continue;

    const slice = normalized.slice(index + normalizedMarker.length).trim();
    const shortSlice = slice.split(/\b(?:y|pero|aunque|para|quiero|me interesa|objetivo)\b/)[0].trim();
    const match = findCountryInText(shortSlice) || findCountryInText(slice);

    if (match) {
      return match;
    }
  }

  return null;
}

function detectOriginCountry(text) {
  return findCountryAfterMarkers(text, ORIGIN_MARKERS);
}

function detectDestinationCountry(text) {
  const byMarker = findCountryAfterMarkers(text, DESTINATION_MARKERS);
  if (byMarker) {
    return byMarker;
  }

  const mentionedCountries = COUNTRY_DOMAIN_MAP.filter((country) =>
    country.aliases.some((alias) => includesAlias(normalizeText(text), normalizeText(alias)))
  );

  if (mentionedCountries.length === 1) {
    return mentionedCountries[0];
  }

  return null;
}

function detectObjective(text) {
  const normalized = normalizeText(text);
  const wantsStudy =
    /\bestudiar\b|\bestudio\b|\bmaster\b|\bm[aá]ster\b|\bcarrera\b|\buniversidad\b|\bcurso\b/.test(normalized);
  const wantsWork =
    /\btrabajar\b|\btrabajo\b|\bempleo\b|\bempleador\b|\bsponsor\b|\boferta laboral\b/.test(normalized);
  const wantsResidence =
    /\bresidencia\b|\bresidir\b|\bpermanente\b|\bvivir\b/.test(normalized);
  const wantsTourism = /\bturismo\b|\bturista\b|\bvisita\b/.test(normalized);

  if ((wantsStudy && wantsWork) || (wantsStudy && wantsResidence) || (wantsWork && wantsResidence)) {
    return "mixto";
  }

  if (wantsWork) return "trabajo";
  if (wantsStudy) return "estudio";
  if (wantsResidence) return "residencia";
  if (wantsTourism) return "turismo";

  return null;
}

function detectAge(text) {
  const normalized = normalizeText(text);
  const match = normalized.match(/\b([1-6][0-9])\s+anos\b/);
  return match ? Number(match[1]) : null;
}

function detectEnglish(text) {
  const normalized = normalizeText(text);
  return (
    /\bingles\b|\benglish\b|\bb1\b|\bb2\b|\bc1\b|\bc2\b|\bintermedio\b|\bavanzado\b|\bfluido\b/.test(normalized)
  );
}

function detectBudget(text) {
  const normalized = normalizeText(text);
  return (
    /\bpresupuesto\b|\bahorro\b|\bahorrado\b|\btengo\b.*\beuros\b|\btengo\b.*\bdolares\b|\b\d{3,}\b.*\beuros\b|\b\d{3,}\b.*\bdolares\b/.test(normalized)
  );
}

function detectOccupation(text) {
  const normalized = normalizeText(text);
  return (
    /\btrabajo en\b|\bme dedico a\b|\bocupacion\b|\bprofesion\b/.test(normalized) ||
    /\bsoy\s+(?!de\b)[a-z\s]{3,40}\b/.test(normalized)
  );
}

function detectExperience(text) {
  const normalized = normalizeText(text);
  return /\b\d+\s+anos de experiencia\b|\b\d+\s+anos trabajando\b|\bexperiencia\b/.test(normalized);
}

function detectStudies(text) {
  const normalized = normalizeText(text);
  return /\bestudios\b|\bformacion\b|\bformación\b|\bcarrera\b|\btitulo\b|\btítulo\b|\btecnico\b|\btécnico\b|\bmaster\b|\bm[aá]ster\b/.test(normalized);
}

function detectDuration(text) {
  const normalized = normalizeText(text);
  return /\bmeses\b|\banos\b|\baños\b|\btemporal\b|\bpermanente\b|\bpor uno\b|\bpor dos\b/.test(normalized);
}

function buildProfileSnapshot(text) {
  return {
    age: detectAge(text),
    english: detectEnglish(text),
    budget: detectBudget(text),
    occupation: detectOccupation(text),
    experience: detectExperience(text),
    studies: detectStudies(text),
    duration: detectDuration(text),
  };
}

function countProfileSignals(snapshot) {
  return Object.values(snapshot).filter(Boolean).length;
}

function buildContextSystemMessage({ origin, destination, objective, profileSnapshot }) {
  const routeGuidance = destination ? COUNTRY_ROUTE_GUIDANCE[destination.key] : null;
  const missingFields = [];

  if (!profileSnapshot.age) missingFields.push("edad aproximada");
  if (!profileSnapshot.english) missingFields.push("nivel de inglés");
  if (!profileSnapshot.budget) missingFields.push("presupuesto estimado");

  const lines = [
    "Contexto estructurado del caso:",
    `- país de origen detectado: ${origin ? origin.key : "no confirmado"}`,
    `- país de destino detectado: ${destination ? destination.key : "no confirmado"}`,
    `- objetivo detectado: ${objective || "no confirmado"}`,
  ];

  if (missingFields.length) {
    lines.push(`- datos de perfil que siguen siendo importantes: ${missingFields.join(", ")}`);
  }

  if (routeGuidance) {
    lines.push("- familias de vía a priorizar para este destino:");
    routeGuidance.focus.forEach((item) => {
      lines.push(`  - ${item}`);
    });
  }

  lines.push("- si aún falta perfil relevante, pregunta antes de orientar.");
  lines.push("- si orientas, prioriza 2 o 3 caminos reales como máximo y evita listas largas.");

  return lines.join("\n");
}

function buildAugmentedInput(history, contextMessage) {
  if (!contextMessage) {
    return history;
  }

  const [firstMessage, ...rest] = history;

  if (!firstMessage || firstMessage.role !== "system") {
    return [{ role: "system", content: contextMessage }, ...history];
  }

  return [firstMessage, { role: "system", content: contextMessage }, ...rest];
}

function dedupeSources(sources) {
  const seen = new Set();

  return sources.filter((source) => {
    if (!source.url || seen.has(source.url)) {
      return false;
    }

    seen.add(source.url);
    return true;
  });
}

export function buildMigrationResponseRequest(history, options = {}) {
  const userText = getUserText(history);
  const origin = detectOriginCountry(userText);
  const destination = detectDestinationCountry(userText);
  const objective = detectObjective(userText);
  const profileSnapshot = buildProfileSnapshot(userText);
  const profileDepth = countProfileSignals(profileSnapshot);
  const enableOfficialSearch = options.enableOfficialSearch === true;
  const contextMessage = buildContextSystemMessage({
    origin,
    destination,
    objective,
    profileSnapshot,
  });

  const request = {
    model: "gpt-5",
    reasoning: { effort: "low" },
    input: buildAugmentedInput(history, contextMessage),
  };

  if (
    enableOfficialSearch &&
    origin &&
    destination &&
    objective &&
    profileDepth >= 2 &&
    destination.domains.length
  ) {
    request.tools = [
      {
        type: "web_search",
        filters: {
          allowed_domains: destination.domains,
        },
      },
    ];
    request.tool_choice = "auto";
    request.include = ["web_search_call.action.sources"];
  }

  return request;
}

export function formatMigrationReply(response, options = {}) {
  const baseText = (response.output_text || "No pude responder bien.").trim();
  const includeSources = options.includeSources === true;
  const sources = [];

  for (const item of response.output || []) {
    if (item.type === "message") {
      for (const content of item.content || []) {
        for (const annotation of content.annotations || []) {
          if (annotation.type === "url_citation" && annotation.url) {
            sources.push({
              title: annotation.title || annotation.url,
              url: annotation.url,
            });
          }
        }
      }
    }

    if (item.type === "web_search_call") {
      for (const source of item.action?.sources || []) {
        if (source.url) {
          sources.push({
            title: source.title || source.url,
            url: source.url,
          });
        }
      }
    }
  }

  const officialSources = dedupeSources(sources).slice(0, 4);

  if (!includeSources || !officialSources.length) {
    return baseText;
  }

  const sourceLines = officialSources.map((source) => `- ${source.title}: ${source.url}`);

  return `${baseText}\n\nFuentes oficiales consultadas:\n${sourceLines.join("\n")}`;
}
