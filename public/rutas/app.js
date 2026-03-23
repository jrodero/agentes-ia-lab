const routes = [
  {
    id: "australia-working-holiday",
    country: "Australia",
    title: "Working Holiday con foco en trabajo y caja inicial",
    base: "Sydney, Melbourne o tramo regional",
    difficulty: "Alta",
    budgetLabel: "5.500 a 8.500 EUR",
    prepLabel: "6 a 12 semanas",
    englishLabel: "Intermedio en adelante",
    fitTags: ["ahorro", "aventura", "trabajo duro"],
    summary:
      "Ruta intensa para quien quiere moverse rápido, trabajar fuerte y tolerar una llegada cara, competitiva y con bastante fricción al principio.",
    reality: [
      "Hay potencial real para generar caja, pero el aterrizaje suele ser más duro y caro de lo que muestran redes e influencers.",
      "Con inglés flojo todo se vuelve más lento: trabajo, alquiler, trámites y red de apoyo.",
      "El margen entre una buena experiencia y una experiencia caótica depende mucho de la preparación inicial.",
    ],
    guides: [
      {
        title: "Abrir cuenta bancaria sin perder días",
        body:
          "Prioriza una cuenta local apenas llegues y deja resuelto el acceso móvil, la identificación y la descarga de la app del banco antes de empezar a mover dinero.",
      },
      {
        title: "TFN, SIM y CV local",
        body:
          "No esperes a instalarte del todo. Tramita número fiscal, línea móvil y versión local del CV en la primera semana para no atrasarte con trabajo y pagos.",
      },
      {
        title: "Cuarto temporal antes del definitivo",
        body:
          "Entra con alojamiento puente de 7 a 14 días. Eso te da aire para visitar habitaciones, entender zonas y evitar decisiones apresuradas.",
      },
    ],
    checklist: {
      before: [
        "Revisar elegibilidad real de la visa y documentación base",
        "Calcular colchón para llegada, bond, transporte y primeras semanas",
        "Preparar CV local y referencias simples en inglés",
      ],
      week1: [
        "Comprar SIM y activar banca móvil",
        "Solicitar número fiscal y organizar carpeta digital",
        "Resolver alojamiento temporal y mapa de zonas",
      ],
      month1: [
        "Ajustar presupuesto real según alquiler y transporte",
        "Entender red de trabajo casual, hospitality o regional",
        "Armar circuito de comunidad y contactos confiables",
      ],
    },
    experiences: [
      {
        author: "Lucía, 28, Córdoba",
        text:
          "Lo que más me golpeó no fue el trabajo, fue el costo de aterrizar. Cuando ordené alojamiento, banco y transporte, todo empezó a mejorar.",
      },
      {
        author: "Dani, 31, Valencia",
        text:
          "Australia sirve mucho si vienes con energía y caja. Si llegas justo y esperando que todo salga rápido, te come la ansiedad.",
      },
    ],
    scoreProfile: {
      goal: { ahorro: 4, equilibrio: 2, estudiar: 1, reinicio: 2 },
      budget: { alto: 4, medio: 2, ajustado: 0 },
      english: { alto: 4, medio: 2, basico: 0 },
      priority: { ahorro: 4, comunidad: 1, estabilidad: 1, aventura: 4 },
    },
  },
  {
    id: "nueva-zelanda-soft-landing",
    country: "Nueva Zelanda",
    title: "Ruta de aterrizaje más amable con foco en equilibrio",
    base: "Auckland, Queenstown o ciudades medianas",
    difficulty: "Media",
    budgetLabel: "4.500 a 7.000 EUR",
    prepLabel: "5 a 10 semanas",
    englishLabel: "Intermedio útil",
    fitTags: ["equilibrio", "paisaje", "adaptación"],
    summary:
      "Ruta pensada para quien valora un ritmo algo más amable, organización y una experiencia más equilibrada entre trabajo, vida y exploración.",
    reality: [
      "El país suele sentirse más ordenado al llegar, pero sigue exigiendo preparación y dinero de entrada.",
      "No es el destino ideal si solo buscas maximizar ahorro; sí puede serlo si priorizas calidad de experiencia.",
      "Funciona muy bien para usuarios que quieren aventura sin el mismo nivel de ruido que Australia.",
    ],
    guides: [
      {
        title: "Primer aterrizaje sin correr",
        body:
          "Entrar con una ciudad base bien elegida, revisar transporte y entender tu radio de búsqueda de alojamiento marca la diferencia desde el día uno.",
      },
      {
        title: "Trabajo inicial y red",
        body:
          "Llega con referencias, CV simple y disponibilidad clara. La red y la velocidad de respuesta pesan tanto como el perfil.",
      },
      {
        title: "Costes invisibles del primer mes",
        body:
          "Reserva margen para depósito, artículos básicos, movilidad y salidas de prueba de alojamiento antes de comprometerte con algo fijo.",
      },
    ],
    checklist: {
      before: [
        "Definir ciudad base según presupuesto y objetivo real",
        "Armar presupuesto con colchón de llegada",
        "Preparar documentos, CV y resumen de experiencia laboral",
      ],
      week1: [
        "Activar SIM y revisar transporte local",
        "Mapear zonas para alquiler y compra básica",
        "Abrir cuenta y dejar ordenada la carpeta de documentos",
      ],
      month1: [
        "Ajustar expectativas de ingresos y gastos reales",
        "Elegir mejor mix entre trabajo, exploración y descanso",
        "Identificar comunidad o red local para no aislarte",
      ],
    },
    experiences: [
      {
        author: "Marina, 26, Bogotá",
        text:
          "Nueva Zelanda me dio más aire mental. No fue necesariamente más rentable, pero sí más amigable para instalarme y no vivir corriendo.",
      },
      {
        author: "Santi, 30, Rosario",
        text:
          "La clave fue no ir pensando que todo se resolvía en dos días. Cuando asumí que el primer mes era de acomodarme, dejé de frustrarme.",
      },
    ],
    scoreProfile: {
      goal: { ahorro: 2, equilibrio: 4, estudiar: 2, reinicio: 3 },
      budget: { alto: 3, medio: 4, ajustado: 1 },
      english: { alto: 3, medio: 4, basico: 1 },
      priority: { ahorro: 1, comunidad: 3, estabilidad: 3, aventura: 3 },
    },
  },
  {
    id: "espana-soft-landing",
    country: "España",
    title: "Empezar de cero con idioma, comunidad y trámites más visibles",
    base: "Madrid, Valencia, Málaga o ciudades satélite",
    difficulty: "Media",
    budgetLabel: "3.000 a 6.500 EUR",
    prepLabel: "4 a 8 semanas",
    englishLabel: "No imprescindible",
    fitTags: ["idioma", "comunidad", "reinicio"],
    summary:
      "Ruta para quien prioriza idioma, integración y una experiencia menos aislante, entendiendo que los trámites y el alquiler pueden ser duros.",
    reality: [
      "La barrera idiomática baja mucho, pero la burocracia y la vivienda pueden frustrar rápido si no llegas ordenado.",
      "España suele encajar mejor si buscas vida social, idioma y adaptación más natural que si buscas ahorro agresivo.",
      "La experiencia cambia mucho entre tener papeles claros y llegar sin estrategia de trámites.",
    ],
    guides: [
      {
        title: "Burocracia inicial sin volverte loco",
        body:
          "Arma un calendario de citas, documentos y copias. En España el problema no siempre es el trámite, sino la falta de orden y los tiempos.",
      },
      {
        title: "Alojamiento y filtro de zonas",
        body:
          "Conviene separar muy bien alojamiento puente de vivienda más estable. En ciudades grandes, la ansiedad puede empujarte a aceptar cualquier cosa.",
      },
      {
        title: "Primer mes con caja controlada",
        body:
          "Aunque hables el idioma, el desorden de gastos puede comerte rápido. Presupuesta fianza, transporte, compras básicas y margen para imprevistos.",
      },
    ],
    checklist: {
      before: [
        "Ordenar documentos, copias, citas y calendario de trámites",
        "Definir ciudad base según alquiler, red y oportunidad",
        "Llegar con alojamiento temporal real y no improvisado",
      ],
      week1: [
        "Resolver SIM, transporte y mapa barrial",
        "Iniciar trámites según tu situación concreta",
        "Armar circuito de búsqueda de cuarto o piso compartido",
      ],
      month1: [
        "Ajustar gastos reales contra presupuesto inicial",
        "Detectar comunidad y apoyos confiables",
        "Separar urgencias burocráticas de trámites secundarios",
      ],
    },
    experiences: [
      {
        author: "Carla, 34, Santiago de Chile",
        text:
          "Lo más valioso fue llegar con una lista concreta de trámites. Hablar el idioma ayuda, pero sin orden igual te desgastas mucho.",
      },
      {
        author: "Leo, 27, Ciudad de México",
        text:
          "España me dio más sensación de comunidad. Donde más me equivoqué fue en pensar que conseguir habitación iba a ser fácil.",
      },
    ],
    scoreProfile: {
      goal: { ahorro: 1, equilibrio: 3, estudiar: 3, reinicio: 4 },
      budget: { alto: 2, medio: 4, ajustado: 3 },
      english: { alto: 2, medio: 3, basico: 4 },
      priority: { ahorro: 1, comunidad: 4, estabilidad: 4, aventura: 2 },
    },
  },
  {
    id: "australia-study",
    country: "Australia",
    title: "Estudiar en Australia con universidad, VET o cursos de inglés",
    base: "CRICOS · universidades · TAFE/VET · ELICOS",
    difficulty: "Alta",
    budgetLabel: "Visado + OSHC + matrícula variable",
    prepLabel: "Plazo variable",
    englishLabel: "Intermedio o según admisión",
    fitTags: ["estudio", "inglés", "trabajo parcial"],
    summary:
      "Ruta potente para quien quiere estudiar en inglés y ganar tiempo en destino, sabiendo que Australia exige caja seria y que el trabajo parcial no suele pagar toda la experiencia.",
    quickFacts: [
      {
        label: "Visa requerida",
        value: "Student visa (subclass 500) con Confirmation of Enrolment (CoE), seguro OSHC y proveedor CRICOS.",
      },
      {
        label: "Costo estimado del proceso",
        value:
          "El visado, el seguro y la matrícula se pagan por separado. Home Affairs remite al estimador oficial del visado y Study Australia al buscador oficial de tasas por curso.",
      },
      {
        label: "Tiempo de tramitación",
        value: "Variable; Home Affairs publica una guía oficial de processing times en vez de un plazo único.",
      },
      {
        label: "Trabajo permitido",
        value: "Límite general de 48 horas por quincena mientras el curso está en sesión.",
      },
    ],
    highlightsTitle: "Lo más relevante",
    highlights: [
      "La vía oficial incluye universidades, formación técnica/vocacional y English Language Intensive Courses for Overseas Students (ELICOS).",
      "Australia no publica una matrícula media única para todo el país: conviene comparar tasas en el buscador oficial antes de reservar plaza.",
      "Sirve para estudiar y aterrizar con más orden, pero llegar justo de dinero suele tensionar mucho el primer semestre.",
    ],
    reality: [
      "La combinación estudio + trabajo parcial puede ayudar, pero no conviene construir el plan suponiendo que el empleo pagará toda la estancia.",
      "La ciudad y el proveedor cambian muchísimo el coste real de vivienda y transporte.",
      "El idioma pesa de verdad: con inglés flojo, la adaptación académica y laboral se endurece.",
    ],
    pros: [
      "Oferta amplia de universidades, VET y cursos de inglés dentro del circuito oficial.",
      "Permite trabajar dentro del límite legal mientras estudias.",
      "Es una puerta útil para probar encaje real antes de decidir un camino migratorio más largo.",
    ],
    cons: [
      "Es una de las rutas más caras del catálogo.",
      "El visado no convierte el estudio en residencia automática.",
      "Si el presupuesto llega muy justo, el margen de error al aterrizar es pequeño.",
    ],
    officialLinks: [
      {
        label: "Student visa 500",
        url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500",
      },
      {
        label: "Restricciones de trabajo",
        url: "https://immi.homeaffairs.gov.au/visas/working-in-australia/work-rights-and-exploitation/work-restrictions",
      },
      {
        label: "Costes y vida en Australia",
        url: "https://www.studyaustralia.gov.au/en/life-in-australia/living-and-education-costs",
      },
      {
        label: "Buscador oficial de cursos",
        url: "https://search.studyaustralia.gov.au/",
      },
    ],
    sourceNote:
      "El gobierno australiano sí publica reglas y buscadores oficiales, pero no una matrícula promedio única para todos los cursos. Por eso aquí la lectura está planteada como comparación por proveedor.",
  },
  {
    id: "ireland-study",
    country: "Irlanda",
    title: "Irlanda para inglés + estudio con permiso de trabajo",
    base: "ILEP · Stamp 2 · universidad o inglés",
    difficulty: "Media",
    budgetLabel: "Desde EUR 10.300/año en grados",
    prepLabel: "Plazo variable",
    englishLabel: "Inglés útil desde el inicio",
    fitTags: ["inglés", "Europa", "trabajo parcial"],
    summary:
      "Irlanda suele encajar muy bien cuando el objetivo real es mejorar inglés, estudiar en un entorno angloparlante y tener una entrada relativamente clara a Europa.",
    quickFacts: [
      {
        label: "Visa requerida",
        value: "Programa listado en ILEP y permiso de estudiante Stamp 2 para no UE/EEE.",
      },
      {
        label: "Costo estimado del proceso",
        value:
          "Education in Ireland publica para 2025/26 grados desde EUR 10.300 en negocios y desde EUR 14.500 en ingeniería/ciencia; los cursos de inglés no tienen tarifa oficial única y dependen del proveedor.",
      },
      {
        label: "Tiempo de tramitación",
        value: "Variable según oficina o consulado; conviene revisar el estado oficial de visados antes de pagar.",
      },
      {
        label: "Trabajo permitido",
        value: "Hasta 20 horas por semana en periodo lectivo y 40 horas en junio-septiembre y del 15 de diciembre al 15 de enero.",
      },
    ],
    highlightsTitle: "Lo más relevante",
    highlights: [
      "Los cursos de inglés deben estar en ILEP, durar al menos 25 semanas y exigir asistencia mínima del 85%.",
      "Cada permiso de inglés suele concederse por hasta ocho meses y puede renovarse dentro de los límites oficiales.",
      "Es una de las entradas más limpias para quien quiere inglés real, pero Dublín y otras zonas tensionadas castigan mucho si llegas corto de caja.",
    ],
    reality: [
      "La inmersión en inglés es una ventaja fuerte, pero también te obliga a sostenerte mejor desde el día uno.",
      "El trabajo parcial ayuda, aunque no suele cubrir por sí solo matrícula, alquiler y vida diaria.",
      "Si tu objetivo final no es estudiar de verdad, esta ruta se vuelve cara muy rápido.",
    ],
    pros: [
      "Entorno 100% angloparlante para acelerar idioma.",
      "Ruta bastante clara entre cursos de inglés, foundation y educación superior.",
      "Puede ser una puerta útil a Europa sin ciudadanía UE.",
    ],
    cons: [
      "Los alquileres y el coste de vida pesan mucho, sobre todo en Dublín.",
      "Hay que progresar académicamente para sostener bien la ruta.",
      "No conviene entrar solo con la esperanza de financiar todo trabajando.",
    ],
    officialLinks: [
      {
        label: "Planificar estudios en Irlanda",
        url: "https://www.irishimmigration.ie/coming-to-study-in-ireland/what-are-my-study-options/planning-to-study-in-ireland/",
      },
      {
        label: "Fees para no UE",
        url: "https://www.educationinireland.com/en/How-Do-I-Apply-/Tuition-Costs-Scholarships/Fees-for-Non-EU-Students/",
      },
      {
        label: "Portal de estudio oficial",
        url: "https://www.educationinireland.com/",
      },
    ],
    sourceNote:
      "El portal oficial sí publica rangos universitarios 2025/26. Para cursos de inglés, el precio cambia por escuela ILEP y ciudad, así que conviene confirmarlo proveedor por proveedor.",
  },
  {
    id: "canada-study",
    country: "Canadá",
    title: "Canadá para universidad reconocida, becas y estudio formal",
    base: "Study permit · DLI · college o university",
    difficulty: "Alta",
    budgetLabel: "Desde CAN$150 + matrícula",
    prepLabel: "Plazo variable por país",
    englishLabel: "Inglés o francés según programa",
    fitTags: ["universidad", "becas", "PGWP"],
    summary:
      "Canadá sigue siendo una ruta potente para educación formal y reputación académica, pero hoy exige más filtro de coste, colegio elegible y tiempos que hace unos años.",
    quickFacts: [
      {
        label: "Visa requerida",
        value: "Study permit con carta de aceptación de una Designated Learning Institution (DLI).",
      },
      {
        label: "Costo estimado del proceso",
        value:
          "El permiso de estudio tiene tasa federal y la matrícula cambia mucho por provincia y DLI. También conviene sumar biometría, seguro y coste de vida.",
      },
      {
        label: "Tiempo de tramitación",
        value: "IRCC publica tiempos vivos según país de residencia, por lo que no hay un plazo universal único.",
      },
      {
        label: "Trabajo permitido",
        value: "Hasta 24 horas por semana fuera del campus mientras las clases están en sesión, si cumples las condiciones del permiso.",
      },
    ],
    highlightsTitle: "Lo más relevante",
    highlights: [
      "La lista oficial DLI incluye instituciones fuertes como University of Toronto, UBC y McGill, además de colleges públicos y privados.",
      "EduCanada centraliza becas oficiales y recursos para comparar instituciones.",
      "No basta con el nombre del país: hay que mirar si el DLI y el programa encajan con tus objetivos y si abren o no opciones posteriores como PGWP.",
    ],
    reality: [
      "La calidad académica es alta, pero también lo son la matrícula y la vida diaria en ciudades grandes.",
      "Hoy ya no conviene elegir Canadá a ciegas solo por reputación; toca revisar elegibilidad, provincia y salida laboral.",
      "Las becas existen, pero no siempre resuelven el coste total del primer año.",
    ],
    pros: [
      "Oferta académica reconocida internacionalmente.",
      "Becas y recursos oficiales accesibles desde EduCanada.",
      "Ruta muy seria para quien sí quiere una experiencia universitaria o college bien armada.",
    ],
    cons: [
      "El coste total suele ser alto.",
      "Los tiempos dependen mucho del país desde el que aplicas.",
      "No todos los programas abren el mismo camino después de graduarte.",
    ],
    officialLinks: [
      {
        label: "Study permit",
        url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html",
      },
      {
        label: "Lista oficial DLI",
        url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/prepare/designated-learning-institutions-list.html",
      },
      {
        label: "Becas EduCanada",
        url: "https://www.educanada.ca/scholarships-bourses/non_can/index.aspx?lang=eng",
      },
      {
        label: "Trabajo mientras estudias",
        url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/work/while-studying.html",
      },
    ],
  },
  {
    id: "germany-study",
    country: "Alemania",
    title: "Alemania para estudiar con públicas muy accesibles y más exigencia idiomática",
    base: "Visa nacional · universidades públicas · TestDaF/DSH",
    difficulty: "Media",
    budgetLabel: "Bloqueada EUR 11.904 + tasas menores",
    prepLabel: "Plazo variable",
    englishLabel: "Alemán útil o imprescindible",
    fitTags: ["pública", "ingeniería", "Europa"],
    summary:
      "Alemania destaca porque muchas universidades públicas no cobran matrícula como tal, pero eso no la convierte en una ruta simple: idioma, burocracia y prueba de fondos pesan mucho.",
    quickFacts: [
      {
        label: "Visa requerida",
        value: "Visa nacional o permiso de residencia por estudios, según tu situación y país de origen.",
      },
      {
        label: "Costo estimado del proceso",
        value:
          "La matrícula suele ser gratuita en muchas públicas, pero Make it in Germany exige prueba de fondos, normalmente con cuenta bloqueada de EUR 11.904 como referencia 2026, además de tasas y contribución semestral.",
      },
      {
        label: "Tiempo de tramitación",
        value: "Varía por embajada o consulado; conviene iniciar el expediente con bastante margen.",
      },
      {
        label: "Idioma y acceso",
        value: "Muchas carreras en alemán piden DSH, TestDaF o certificados equivalentes; también existen algunos programas en inglés, sobre todo en posgrado.",
      },
    ],
    highlightsTitle: "Lo más relevante",
    highlights: [
      "El atractivo central es la baja matrícula en públicas, no la ausencia de coste total.",
      "DAAD y Make it in Germany son las referencias oficiales más útiles para filtrar admisión y requisitos.",
      "Si tu plan depende de estudiar en alemán, no subestimes el tiempo que lleva llegar con nivel real.",
    ],
    reality: [
      "Es una ruta muy buena para perfiles académicos y técnicos, pero no es cómoda para improvisar.",
      "El idioma sigue siendo un filtro fuerte para vida diaria, trámites y empleabilidad posterior.",
      "La vivienda en ciudades universitarias tensas también puede complicar el aterrizaje.",
    ],
    pros: [
      "Muchas universidades públicas siguen siendo muy accesibles frente a otros destinos.",
      "Alemania tiene reputación fuerte en ingeniería, tecnología y ciencias aplicadas.",
      "Estudiar allí puede ser una muy buena puerta a Europa si llegas bien preparado.",
    ],
    cons: [
      "Alemán real suele ser el cuello de botella.",
      "La burocracia no es ligera.",
      "El coste inicial de fondos bloqueados no es menor aunque la matrícula sea baja.",
    ],
    officialLinks: [
      {
        label: "Study in Germany",
        url: "https://www.make-it-in-germany.com/en/study-vocational-training/studies-in-germany/complete",
      },
      {
        label: "Base DAAD de admisión",
        url: "https://www.daad.de/en/studying-in-germany/requirements/admission-database/",
      },
      {
        label: "TestDaF oficial",
        url: "https://www.testdaf.de/en/",
      },
    ],
  },
  {
    id: "spain-study",
    country: "España",
    title: "España para estudiar con ventaja idiomática y públicas más accesibles",
    base: "Visado de estudios · universidad pública o privada",
    difficulty: "Media",
    budgetLabel: "Tasa consular + matrícula variable",
    prepLabel: "Plazo variable",
    englishLabel: "Español como ventaja",
    fitTags: ["idioma", "Europa", "universidad"],
    summary:
      "España suele tener mucho sentido para latinoamericanos que quieren una entrada por estudio con menos fricción idiomática, entendiendo que vivienda y burocracia siguen siendo dos filtros reales.",
    quickFacts: [
      {
        label: "Visa requerida",
        value: "Visado de estudios con admisión, seguro, fondos y documentación consular.",
      },
      {
        label: "Costo estimado del proceso",
        value:
          "La tasa del visado depende del consulado y la matrícula varía por comunidad, universidad y programa. En públicas suele ser más accesible que en destinos anglosajones, pero conviene confirmar el coste exacto en cada centro.",
      },
      {
        label: "Tiempo de tramitación",
        value: "Variable según consulado y época del año.",
      },
      {
        label: "Ventaja principal",
        value: "El idioma reduce fricción académica, social y administrativa para muchos latinoamericanos.",
      },
    ],
    highlightsTitle: "Lo más relevante",
    highlights: [
      "La gran ventaja comparativa aquí no es solo el precio: también es estudiar y resolver trámites sin barrera idiomática fuerte.",
      "Las universidades públicas pueden ser una opción muy razonable, pero conviene mirar bien ciudad, alquiler y calendario de admisión.",
      "Si eliges Madrid o Barcelona, el presupuesto real se define mucho más por vivienda que por la matrícula.",
    ],
    reality: [
      "Es una ruta amable para entrar a Europa, pero no necesariamente barata si eliges ciudades tensas.",
      "La burocracia consular y universitaria puede requerir más paciencia de la que parece desde fuera.",
      "No toda experiencia de estudiante se traduce luego en residencia o trabajo estable: hay que planear el siguiente paso.",
    ],
    pros: [
      "Idioma a favor para gran parte del mercado hispanohablante.",
      "Universidades públicas y privadas con oferta amplia.",
      "Buena puerta de entrada a Europa para quien quiere estudiar de verdad.",
    ],
    cons: [
      "La vivienda puede desordenar el presupuesto.",
      "Los tiempos y requisitos cambian entre consulados y universidades.",
      "No conviene asumir que estudiar resolverá solo el camino migratorio posterior.",
    ],
    officialLinks: [
      {
        label: "Visado de estudios",
        url: "https://www.exteriores.gob.es/Consulados/buenosaires/es/ServiciosConsulares/Paginas/Consular/Visado-de-estudios.aspx",
      },
      {
        label: "Portal de universidades",
        url: "https://www.universidades.gob.es/",
      },
    ],
  },
  {
    id: "spain-digital-nomad",
    country: "España",
    title: "España con visa nómada digital para teletrabajo internacional",
    base: "Teletrabajo de carácter internacional",
    difficulty: "Media",
    budgetLabel: "200% del SMI + tasas",
    prepLabel: "20 días hábiles + consulado",
    englishLabel: "No imprescindible",
    fitTags: ["remoto", "Europa", "idioma"],
    summary:
      "Si ya facturas fuera y tu ingreso es estable, España puede ser una de las rutas remotas más atractivas de Europa; si todavía estás armando cartera o ingresas justo, suele ser pronto.",
    quickFacts: [
      {
        label: "Visa requerida",
        value: "Visado o autorización de residencia para teletrabajo de carácter internacional.",
      },
      {
        label: "Costo estimado del proceso",
        value:
          "La tasa consular cambia por oficina. El umbral económico oficial está ligado al 200% del SMI; con la referencia publicada desde el 11 de febrero de 2025, muchas guías antiguas de EUR 2.334 al mes quedaron desfasadas frente a la cifra oficial actualizada.",
      },
      {
        label: "Tiempo de tramitación",
        value: "La autorización suele manejar plazo legal corto; el consulado añade tiempos de cita y emisión.",
      },
      {
        label: "Filtro clave",
        value: "Ingresos demostrables, relación laboral o profesional clara y documentación fiscal ordenada.",
      },
    ],
    highlightsTitle: "Lo más relevante",
    highlights: [
      "Es una ruta para quien ya tiene ingresos remotos resueltos, no para quien espera llegar y ver qué sale.",
      "España permite combinar calidad de vida, idioma y base europea si el caso documental está limpio.",
      "Mucho contenido online sigue citando cifras viejas: conviene revisar el umbral oficial justo antes de aplicar.",
    ],
    reality: [
      "Madrid, Barcelona y Valencia pueden romper el presupuesto si eliges mal barrio o llegas sin red.",
      "Fiscalidad, autónomo y residencia exigen orden desde antes de entrar.",
      "No es la mejor vía para freelancers muy iniciales o ingresos inestables.",
    ],
    pros: [
      "Idioma y adaptación más sencillos para hispanohablantes.",
      "Ruta remota con narrativa clara y base europea.",
      "Sirve muy bien si ya vienes facturando de forma seria.",
    ],
    cons: [
      "No es un atajo para perfiles sin facturación sólida.",
      "Las cifras mínimas cambian con el SMI y obligan a revisar siempre la versión vigente.",
      "La vivienda y la parte fiscal pueden complicarse rápido si entras sin estrategia.",
    ],
    officialLinks: [
      {
        label: "Visado de teletrabajo internacional",
        url: "https://www.exteriores.gob.es/Consulados/montevideo/es/ServiciosConsulares/Paginas/Consular/Visado-para-teletrabajo-de-caracter-internacional.aspx",
      },
    ],
    sourceNote:
      "Actualicé la referencia económica a la cifra oficial ligada al SMI vigente desde febrero de 2025. Por eso no dejé fijado el importe antiguo de EUR 2.334/mes que todavía circula en muchos resúmenes.",
  },
  {
    id: "portugal-d8",
    country: "Portugal",
    title: "Portugal con D8 para remoto y base flexible en Lisboa u Oporto",
    base: "Visto D8 / residencia para trabajo remoto",
    difficulty: "Media",
    budgetLabel: "Ingresos de 4 salarios mínimos",
    prepLabel: "Plazo variable",
    englishLabel: "Portugués ayuda, inglés urbano útil",
    fitTags: ["remoto", "Lisboa", "Oporto"],
    summary:
      "Portugal sigue siendo muy atractivo para remoto por calidad de vida y comunidad internacional, aunque ya no conviene imaginarlo como destino barato ni como trámite homogéneo entre consulados.",
    quickFacts: [
      {
        label: "Visa requerida",
        value: "Visto D8 o residencia para actividad profesional prestada de forma remota fuera del territorio nacional.",
      },
      {
        label: "Costo estimado del proceso",
        value:
          "La tasa cambia por consulado y la prueba fuerte es económica: Portugal exige acreditar ingresos medios recientes de al menos 4 salarios mínimos portugueses.",
      },
      {
        label: "Tiempo de tramitación",
        value: "No hay un plazo único fiable publicado para todos los consulados; conviene revisar tu puesto consular y luego AIMA.",
      },
      {
        label: "Comunidad nómada",
        value: "Lisboa y Oporto concentran más ecosistema remoto, coworkings y networking internacional que otras ciudades.",
      },
    ],
    highlightsTitle: "Lo más relevante",
    highlights: [
      "Tiene buen encaje si valoras clima, ritmo de vida y base europea más amable.",
      "La comunidad remota existe de verdad, pero la presión de alquiler en Lisboa y Oporto también.",
      "Antes de elegir ciudad, conviene ordenar ingresos demostrables y plan real de vivienda.",
    ],
    reality: [
      "Portugal ya no es el secreto barato que muchas guías siguen vendiendo.",
      "El proceso puede variar entre consulados y después pasa por AIMA, así que no conviene apurarlo al límite.",
      "Si tu ingreso remoto es irregular, el D8 pierde mucha fuerza.",
    ],
    pros: [
      "Ruta muy bien posicionada para perfiles remotos ya consolidados.",
      "Buena calidad de vida y ambiente internacional en hubs urbanos.",
      "Puede servir tanto para estancia temporal como para residencia más seria.",
    ],
    cons: [
      "Alquiler tensionado en Lisboa y Oporto.",
      "Los tiempos no son iguales en todos los consulados.",
      "La parte documental y de ingresos se revisa con bastante seriedad.",
    ],
    officialLinks: [
      {
        label: "Info oficial Portugal",
        url: "https://www.gov.pt/en",
      },
      {
        label: "AIMA",
        url: "https://aima.gov.pt/pt",
      },
    ],
    sourceNote:
      "La lectura sobre comunidad nómada en Lisboa y Oporto es una inferencia práctica de mercado, no un criterio migratorio oficial. Los requisitos sí están atados a ingresos y revisión documental.",
  },
  {
    id: "germany-freiberufler",
    country: "Alemania",
    title: "Alemania con Freiberufler para freelancers y autónomos de verdad",
    base: "Freelance / self-employment permit",
    difficulty: "Alta",
    budgetLabel: "Tasas locales + solvencia",
    prepLabel: "Plazo variable",
    englishLabel: "Alemán suma mucho",
    fitTags: ["freelance", "facturación", "Europa"],
    summary:
      "La Freiberufler visa puede encajar muy bien para perfiles autónomos serios, pero no es una ruta amable para improvisar portfolio, ingresos o papeles una vez en destino.",
    quickFacts: [
      {
        label: "Visa requerida",
        value: "Permiso de residencia para actividad freelance o self-employment, gestionado ante la autoridad local competente.",
      },
      {
        label: "Costo estimado del proceso",
        value:
          "Tasas administrativas locales, seguro, traducciones y prueba de solvencia. El coste exacto cambia por ciudad y autoridad.",
      },
      {
        label: "Tiempo de tramitación",
        value: "Variable según la ciudad y la disponibilidad de citas.",
      },
      {
        label: "Filtro clave",
        value: "Necesitas actividad profesional real, clientes, ingresos y una narrativa de negocio coherente.",
      },
    ],
    highlightsTitle: "Lo más relevante",
    highlights: [
      "Alemania funciona mejor aquí para freelancers ya operativos que para quien recién está empezando a vender servicios.",
      "La exigencia documental suele incluir prueba de clientes, utilidad económica y cobertura sanitaria.",
      "Berlín y otras ciudades tienen ecosistema internacional, pero la vida diaria sigue premiando mucho el alemán.",
    ],
    reality: [
      "Es una ruta seria, no una visa lifestyle.",
      "La burocracia cambia entre ciudades y puede hacerse lenta o poco predecible.",
      "Sin clientes o facturación clara, el caso pierde fuerza muy rápido.",
    ],
    pros: [
      "Base europea potente para profesionales independientes consolidados.",
      "Mercado interesante para creativos, tech y consultoría especializada.",
      "Puede encajar bien si ya vienes con cartera y orden financiero.",
    ],
    cons: [
      "La autoridad local manda mucho y no todo está estandarizado.",
      "Requiere más documentación que otras rutas remotas vendidas como simples.",
      "El idioma sigue pesando más de lo que muchos esperan.",
    ],
    officialLinks: [
      {
        label: "Service Berlin",
        url: "https://service.berlin.de/dienstleistung/328332/en/",
      },
    ],
  },
  {
    id: "estonia-digital-nomad",
    country: "Estonia",
    title: "Estonia: e-Residency para operar y Digital Nomad Visa para vivir",
    base: "e-Residency + DNV si quieres residir",
    difficulty: "Media",
    budgetLabel: "Tasas separadas",
    prepLabel: "Plazo variable",
    englishLabel: "Alto recomendado",
    fitTags: ["digital", "empresa", "Europa"],
    summary:
      "Estonia es potentísima para operar en digital, pero conviene separar dos cosas que mucha gente mezcla: e-Residency sirve para gestionar empresa; si quieres vivir allí, necesitas una visa o permiso de estancia aparte.",
    quickFacts: [
      {
        label: "Visa requerida",
        value: "e-Residency no es visa. Si quieres residir en Estonia, debes mirar la Digital Nomad Visa u otra vía migratoria válida.",
      },
      {
        label: "Costo estimado del proceso",
        value:
          "El coste se divide entre la solicitud de e-Residency y, si aplica, la visa nómada o permiso de estancia. Revísalo siempre en el portal oficial antes de aplicar.",
      },
      {
        label: "Tiempo de tramitación",
        value: "e-Residency y la parte migratoria tienen plazos distintos; no conviene tratarlos como un único trámite.",
      },
      {
        label: "Advertencia clave",
        value: "e-Residency no te da derecho de entrada, residencia fiscal automática ni permiso para vivir en la UE.",
      },
    ],
    highlightsTitle: "Lo más relevante",
    highlights: [
      "Es uno de los mejores sistemas si tu prioridad es montar o gestionar negocio digital con estructura europea.",
      "Si tu objetivo real es mudarte, la pregunta migratoria no se resuelve con la tarjeta de e-Residency.",
      "Tiene mucho sentido para fundadores o freelancers remotos que valoran procesos digitales y operación internacional.",
    ],
    reality: [
      "Muchísima gente se confunde aquí y compra identidad digital pensando que compró residencia.",
      "La ventaja de Estonia es operativa y administrativa más que de soft landing emocional.",
      "Necesitas tener clara tu residencia real, tu fiscalidad y tu estructura de clientes.",
    ],
    pros: [
      "Infraestructura digital muy madura.",
      "Ideal para operar empresa remota desde casi cualquier lugar.",
      "Muy útil si ya trabajas internacionalmente.",
    ],
    cons: [
      "e-Residency no sustituye visa ni permiso.",
      "Si lo que buscas es vivir allí, el análisis migratorio sigue siendo aparte.",
      "No es la opción más intuitiva para quien solo quiere mudarse y ya.",
    ],
    officialLinks: [
      {
        label: "e-Residency",
        url: "https://www.e-resident.gov.ee/",
      },
      {
        label: "Politsei y fronteras",
        url: "https://www.politsei.ee/en",
      },
    ],
  },
  {
    id: "thailand-ltr",
    country: "Tailandia",
    title: "Tailandia con LTR Visa para remoto de alto nivel",
    base: "Long-Term Resident Visa",
    difficulty: "Alta",
    budgetLabel: "50.000 THB + seguros",
    prepLabel: "20 días laborables",
    englishLabel: "Inglés útil",
    fitTags: ["Asia", "remoto", "alto ingreso"],
    summary:
      "La LTR es una ruta fuerte si ya tienes perfil de ingresos alto o empresa muy consolidada; para la mayoría de nómadas iniciales, el filtro económico la deja fuera.",
    quickFacts: [
      {
        label: "Visa requerida",
        value: "Long-Term Resident (LTR) Visa.",
      },
      {
        label: "Costo estimado del proceso",
        value:
          "La tasa oficial del visado de 10 años es de 50.000 THB por persona, además de seguro o prueba económica según categoría.",
      },
      {
        label: "Tiempo de tramitación",
        value: "El portal oficial habla de notificación del endorsement en unos 20 working days, salvo requerimientos extra.",
      },
      {
        label: "Filtro clave",
        value:
          "Ingresos altos, seguros o depósitos, y cumplimiento estricto de la categoría elegida dentro del programa.",
      },
    ],
    highlightsTitle: "Lo más relevante",
    highlights: [
      "Es una de las rutas más visibles de Asia para estancias largas de perfiles fuertes.",
      "Tailandia la vende como programa premium, no como puerta general para freelancers en fase temprana.",
      "Conviene leer con calma la categoría exacta antes de pensar que por ser remoto ya encajas.",
    ],
    reality: [
      "No es una visa masiva ni sencilla para cualquier trabajador online.",
      "El atractivo lifestyle existe, pero el filtro económico también.",
      "Hay que planear bien seguro, fiscalidad y categoría LTR concreta.",
    ],
    pros: [
      "Base larga y estable en Asia para perfiles de alto potencial.",
      "Programa claro y centralizado en portal oficial.",
      "Puede ser muy buena opción si ya superaste la fase de ingresos volátiles.",
    ],
    cons: [
      "No sirve bien para perfiles junior o ingresos justos.",
      "La exigencia documental es alta.",
      "Mucho contenido online lo vende como más fácil de lo que realmente es.",
    ],
    officialLinks: [
      {
        label: "Portal oficial LTR",
        url: "https://ltr.boi.go.th/",
      },
    ],
  },
  {
    id: "italy-citizenship-descent",
    country: "Italia",
    title: "Ciudadanía italiana por descendencia sin vender humo",
    base: "Cittadinanza iure sanguinis",
    difficulty: "Alta",
    budgetLabel: "EUR 250 + documentación",
    prepLabel: "Plazo largo y variable",
    englishLabel: "No aplica",
    fitTags: ["descendencia", "UE", "documentación"],
    summary:
      "Para latinoamericanos sin ciudadanía UE, Italia puede abrir una vía enorme por descendencia, pero desde 2025 el marco cambió y ya no conviene hablar de iure sanguinis como si siguiera igual que antes.",
    quickFacts: [
      {
        label: "Visa requerida",
        value: "No es visa; es un procedimiento de reconocimiento o adquisición de ciudadanía.",
      },
      {
        label: "Costo estimado del proceso",
        value:
          "La web oficial italiana recoge un contributo de EUR 250, al que debes sumar certificados, apostillas, traducciones y, en su caso, derechos consulares.",
      },
      {
        label: "Tiempo de tramitación",
        value: "Variable y normalmente largo según consulado o comuna.",
      },
      {
        label: "Cambio clave",
        value:
          "La reforma de 2025 endureció la transmisión automática para nacidos en el extranjero con otra ciudadanía, así que ya no basta con repetir guías viejas.",
      },
    ],
    highlightsTitle: "Lo más relevante",
    highlights: [
      "Sigue existiendo la descendencia como vía central, pero hoy está sujeta a excepciones y documentación adicional.",
      "La cadena documental importa mucho: ascendencia, no interrupción de ciudadanía y documentos completos.",
      "Si tu línea familiar es buena, es una de las salidas más potentes del catálogo porque te da derechos UE plenos.",
    ],
    reality: [
      "No es una solución rápida.",
      "Las guías virales anteriores a 2025 ya no alcanzan para evaluar bien el caso.",
      "Conviene revisar la situación exacta de padres, abuelos y residencia previa en Italia si aplica.",
    ],
    pros: [
      "Si encajas, resuelve el problema migratorio de raíz.",
      "Abre libertad de movimiento y trabajo en la UE.",
      "Puede tener más sentido que gastar años en visas temporales si la línea familiar es sólida.",
    ],
    cons: [
      "La reforma reciente volvió muchos casos más complejos.",
      "La carga documental es alta.",
      "Los tiempos pueden ser largos y desiguales.",
    ],
    officialLinks: [
      {
        label: "Cittadinanza italiana",
        url: "https://www.esteri.it/it/servizi-consolari-e-visti/italiani-all-estero/cittadinanza/",
      },
    ],
  },
  {
    id: "spain-citizenship-origin",
    country: "España",
    title: "Nacionalidad española por origen o descendencia en 2026",
    base: "Origen, opción o vínculo familiar concreto",
    difficulty: "Alta",
    budgetLabel: "Documentación y consulado",
    prepLabel: "Plazo largo y variable",
    englishLabel: "No aplica",
    fitTags: ["descendencia", "España", "familia"],
    summary:
      "La nacionalidad española por descendencia sigue existiendo, pero en 2026 ya no conviene mezclarla con la ola de la Ley de Memoria Democrática como si siguiera abierta igual para todos.",
    quickFacts: [
      {
        label: "Visa requerida",
        value: "No es visa; es expediente de nacionalidad o trámite registral/consular según el supuesto.",
      },
      {
        label: "Costo estimado del proceso",
        value:
          "No hay un coste único de entrada: depende del tipo de expediente y de los documentos, traducciones y apostillas necesarios.",
      },
      {
        label: "Tiempo de tramitación",
        value: "Variable y normalmente largo según registro o consulado.",
      },
      {
        label: "Alerta actual",
        value:
          "La vía extraordinaria de la Ley de Memoria Democrática cerró el 22 de octubre de 2025 para nuevas citas ordinarias; en 2026 toca revisar supuestos vigentes por origen u opción caso a caso.",
      },
    ],
    highlightsTitle: "Lo más relevante",
    highlights: [
      "Si tienes vínculo real, puede ser mejor revisar esto antes de lanzarte a visados temporales caros.",
      "No todos los nietos o hijos de españoles encajan igual: el parentesco exacto y la fecha importan.",
      "Hoy es más una vía quirúrgica por perfil familiar que una puerta abierta masiva.",
    ],
    reality: [
      "Mucha información que sigue circulando en redes ya quedó desactualizada tras el cierre del plazo extraordinario.",
      "Necesitas diagnosticar muy bien el parentesco y el supuesto jurídico concreto.",
      "Si no encajas, conviene pasar rápido a estudio, arraigo futuro o rutas laborales reales.",
    ],
    pros: [
      "Si calificas, resuelve el problema de residencia desde la raíz.",
      "Puede evitar años de visados temporales y gasto repetido.",
      "Tiene sentido revisarlo pronto si tu familia realmente encaja.",
    ],
    cons: [
      "Ya no es una solución abierta para todo el mundo como muchos aún creen.",
      "La documentación y los tiempos pueden ser pesados.",
      "No conviene construir un plan entero sobre rumores de grupos o TikTok.",
    ],
    officialLinks: [
      {
        label: "Nacionalidad española",
        url: "https://www.mjusticia.gob.es/es/ciudadania/nacionalidad",
      },
    ],
  },
  {
    id: "spain-arraigo",
    country: "España",
    title: "Arraigo en España: regularización real, no puerta de entrada",
    base: "Circunstancias excepcionales dentro de España",
    difficulty: "Alta",
    budgetLabel: "Tasa 790-052 + documentación",
    prepLabel: "3 meses de resolución",
    englishLabel: "No aplica",
    fitTags: ["arraigo", "regularización", "España"],
    summary:
      "El arraigo es una vía real y muy importante en España, pero conviene ser muy claro: no es la visa con la que entras, sino una autorización que se trabaja desde dentro y con requisitos concretos.",
    quickFacts: [
      {
        label: "Visa requerida",
        value: "No es visa; es autorización de residencia temporal por circunstancias excepcionales.",
      },
      {
        label: "Costo estimado del proceso",
        value:
          "La solicitud exige la tasa 790 código 052, epígrafe 2.3.1, además de la documentación del tipo de arraigo que te corresponda.",
      },
      {
        label: "Tiempo de tramitación",
        value: "Plazo oficial de resolución: tres meses desde la entrada del expediente.",
      },
      {
        label: "Lectura honesta",
        value: "No es una ruta para planear desde fuera como si fuera inmediata; primero hay que encajar en sus requisitos dentro de España.",
      },
    ],
    highlightsTitle: "Lo más relevante",
    highlights: [
      "Tras la reforma reciente, hay varios tipos de arraigo y no todos sirven para el mismo perfil.",
      "Puede ser una salida poderosa para quien ya está en España y sí cumple, pero no reemplaza una estrategia de entrada.",
      "Conviene tratarlo como regularización seria y documentada, no como atajo emocional.",
    ],
    reality: [
      "Es una vía útil, pero exige tiempo, trazabilidad y requisitos concretos.",
      "Muchos usuarios la escuchan demasiado pronto, cuando todavía ni siquiera resolvieron cómo entrar legalmente.",
      "Si tu plan está todavía en fase de origen, normalmente primero conviene mirar estudio, ciudadanía por descendencia o trabajo remoto/laboral.",
    ],
    pros: [
      "Es una opción real para regularizar casos que sí encajan.",
      "Tiene plazo oficial de resolución claro.",
      "Puede convertirse en paso muy serio hacia estabilidad documental en España.",
    ],
    cons: [
      "No sirve como respuesta automática para cualquier persona sin papeles.",
      "No es una visa de entrada.",
      "Los requisitos concretos cambian según el tipo de arraigo y hay que leerlos bien.",
    ],
    officialLinks: [
      {
        label: "Info oficial de arraigo",
        url: "https://www.inclusion.gob.es/web/migraciones/w/autorizacion-de-residencia-temporal-por-circunstancias-excepcionales.-arraigo",
      },
      {
        label: "Hoja informativa sociolaboral",
        url: "https://ciudadaniaexterior.inclusion.gob.es/ca/web/migraciones/w/29.-autorizacion-de-residencia-temporal-por-circunstancias-excepcionales.-arraigo-sociolaboral.",
      },
    ],
  },
  {
    id: "europe-study-entry",
    country: "Europa",
    title: "Entrar a Europa por estudio sin ciudadanía UE",
    base: "España · Irlanda · Alemania como caminos base",
    difficulty: "Media",
    budgetLabel: "Matrícula + fondos + seguro",
    prepLabel: "Plazo variable por consulado",
    englishLabel: "Depende del país",
    fitTags: ["sin UE", "estudio", "puerta de entrada"],
    summary:
      "Para muchos latinoamericanos sin pasaporte UE, la vía de estudios sigue siendo la puerta más replicable a Europa, siempre que haya presupuesto, admisión real y un siguiente paso pensado desde el principio.",
    quickFacts: [
      {
        label: "Visa requerida",
        value: "Visado o permiso de estudios del país concreto elegido.",
      },
      {
        label: "Costo estimado del proceso",
        value:
          "Suma matrícula, seguro, prueba de fondos y coste de vida. El total cambia muchísimo entre Irlanda, Alemania y España.",
      },
      {
        label: "Tiempo de tramitación",
        value: "Variable por consulado y por país.",
      },
      {
        label: "Lectura honesta",
        value: "Es una vía de entrada, no una promesa automática de residencia permanente.",
      },
    ],
    highlightsTitle: "Cómo leer esta vía",
    highlights: [
      "Si no tienes ciudadanía UE, conviene elegir un solo país objetivo y trabajar esa ruta a fondo, no abrir diez pestañas a la vez.",
      "Alemania suele ganar por matrícula; Irlanda por inglés; España por idioma y adaptación para hispanohablantes.",
      "La calidad del plan posterior importa tanto como la admisión inicial.",
    ],
    reality: [
      "La vía de estudios es seria, pero quema dinero si la eliges solo para “entrar como sea”.",
      "Presupuesto, idioma y objetivo posterior mandan mucho más que el entusiasmo.",
      "Cuando está bien armada, suele ser más honesta que perseguir sponsors improbables desde cero.",
    ],
    pros: [
      "Es una de las pocas rutas realmente replicables para perfiles no UE.",
      "Permite construir tiempo, idioma y red en destino.",
      "Sirve para ordenar mejor el siguiente paso migratorio.",
    ],
    cons: [
      "Requiere inversión real.",
      "No todos los países dan las mismas condiciones de trabajo o continuidad.",
      "Si eliges mal programa o ciudad, el coste emocional y económico sube rápido.",
    ],
    officialLinks: [
      {
        label: "España · visado de estudios",
        url: "https://www.exteriores.gob.es/Consulados/buenosaires/es/ServiciosConsulares/Paginas/Consular/Visado-de-estudios.aspx",
      },
      {
        label: "Irlanda · planning to study",
        url: "https://www.irishimmigration.ie/coming-to-study-in-ireland/what-are-my-study-options/planning-to-study-in-ireland/",
      },
      {
        label: "Alemania · study in Germany",
        url: "https://www.make-it-in-germany.com/en/study-vocational-training/studies-in-germany/complete",
      },
    ],
  },
];

const exploreTabProfiles = {
  "working-holiday": {
    label: "Tengo WH visa",
    title: "Ruta temporal con foco en trabajo, caja y reentrada donde aplica",
    description:
      "Este tab sirve para quien ya está mirando working holiday o una vía temporal parecida y necesita bajar la emoción a elegibilidad, presupuesto y aterrizaje real.",
    visas: ["Working Holiday", "Segunda visa", "Tercera visa", "Trabajo casual"],
    destinations: ["Australia", "Nueva Zelanda", "Canadá", "Alemania"],
    obstacles: [
      "La edad máxima y la nacionalidad cambian por país.",
      "El inglés y la caja inicial siguen siendo un filtro fuerte.",
      "No conviene confundir visa temporal con residencia automática.",
    ],
    routeIds: ["australia-working-holiday", "nueva-zelanda-soft-landing"],
    nextStep: "Revisar elegibilidad real, cupos y colchón de llegada antes de pagar o viajar.",
  },
  study: {
    label: "Quiero estudiar",
    title: "Entrada por estudio con opción de trabajo y orden migratorio",
    description:
      "Pensado para latinos que necesitan una vía más estructurada para entrar, mejorar idioma y sostenerse mientras estudian o preparan un salto posterior.",
    visas: ["Student Visa", "Cursos de idioma", "Universidad", "Study pathway"],
    destinations: ["Australia", "Irlanda", "Canadá", "Alemania", "España"],
    obstacles: [
      "El coste total no es solo matrícula: hay que sumar vida real y visado.",
      "El idioma exigido cambia según curso o universidad.",
      "Trabajar mientras estudias ayuda, pero no siempre alcanza para sostener todo.",
    ],
    routeIds: ["australia-study", "ireland-study", "canada-study", "germany-study", "spain-study"],
    nextStep: "Separar cursos puente, universidad y objetivo migratorio antes de elegir destino.",
  },
  "eu-passport": {
    label: "Tengo pasaporte EU",
    title: "Europa abierta sin visa, pero no sin estrategia",
    description:
      "Para quien ya tiene ciudadanía europea o está muy cerca de obtenerla. La ventaja es enorme, pero igual conviene ordenar ciudad, alquiler, trabajo e integración.",
    visas: ["Libre circulación UE", "Trabajo sin visa", "Mudanza intra-UE", "Ciudadanía por descendencia"],
    destinations: ["España", "Portugal", "Alemania", "Italia", "Países Bajos"],
    obstacles: [
      "Tener pasaporte UE no te resuelve vivienda, ingresos ni idioma.",
      "La ciudad correcta cambia mucho según presupuesto y red de apoyo.",
      "Conviene diferenciar mudanza legal fácil de inserción real.",
    ],
    routeIds: ["espana-soft-landing"],
    nextStep: "Elegir ciudad y mercado laboral antes de moverte solo por intuición o clima.",
  },
  emigrate: {
    label: "Quiero emigrar",
    title: "Vías más serias para residencia, trabajo calificado o familia",
    description:
      "Esta vista prioriza procesos más largos: skilled visa, residencia permanente, patrocinio o reagrupación familiar. Menos promesa rápida, más estrategia.",
    visas: ["Skilled Visa", "Residencia", "Sponsor", "Reagrupación familiar"],
    destinations: ["Australia", "Canadá", "Alemania", "Nueva Zelanda", "España"],
    obstacles: [
      "Idioma, formación, experiencia y tiempos pesan mucho más aquí.",
      "No todas las profesiones tienen el mismo encaje.",
      "Hay que pensar por etapas: entrada, estabilidad y residencia.",
    ],
    routeIds: ["espana-soft-landing", "nueva-zelanda-soft-landing", "australia-working-holiday"],
    nextStep: "Definir si tu mejor puerta de entrada es estudio, sponsor, skilled o familia.",
  },
  remote: {
    label: "Trabajo remoto",
    title: "Nómada digital y mudanza con ingresos ya resueltos",
    description:
      "Para perfiles que ya facturan online o trabajan para fuera y quieren optimizar residencia, fiscalidad, idioma y calidad de vida sin depender de un trabajo local inmediato.",
    visas: ["Visa nómada digital", "D8 Portugal", "Freiberufler", "LTR"],
    destinations: ["España", "Portugal", "Alemania", "Estonia", "Tailandia"],
    obstacles: [
      "Ingresos demostrables y trazabilidad fiscal suelen ser clave.",
      "No todo destino barato es sostenible a largo plazo.",
      "Hay que mirar sanidad, impuestos y estabilidad, no solo lifestyle.",
    ],
    routeIds: ["spain-digital-nomad", "portugal-d8", "germany-freiberufler", "estonia-digital-nomad", "thailand-ltr"],
    nextStep: "Ordenar ingresos demostrables y documentación antes de mirar ciudades o alquileres.",
  },
  "no-eu": {
    label: "Sin documentos EU",
    title: "Opciones honestas para latinos sin ciudadanía europea",
    description:
      "Este tab baja la conversación a cuatro caminos reales: working holiday donde aplique, ciudadanía por descendencia si existe, arraigo cuando ya estás dentro y estudio como puerta de entrada a Europa.",
    visas: ["Working Holiday", "Ciudadanía por descendencia", "Arraigo", "Student Visa"],
    destinations: ["Australia", "Italia", "España", "Europa"],
    obstacles: [
      "Sin pasaporte UE conviene filtrar rápido lo que de verdad es viable.",
      "La descendencia solo sirve si el vínculo familiar encaja de verdad y hoy hay reglas más duras que antes.",
      "Arraigo no es una puerta de entrada; es una regularización dentro de España.",
    ],
    routeIds: [
      "australia-working-holiday",
      "italy-citizenship-descent",
      "spain-citizenship-origin",
      "spain-arraigo",
      "europe-study-entry",
    ],
    nextStep: "Primero define si tu vía real es edad/WH, familia/descendencia, estudio o un proceso dentro de España. Después recién comparas países.",
  },
};

const routeContext = {
  "australia-working-holiday": {
    visaTracks: ["Working Holiday", "Student Visa", "Skilled a futuro"],
    audience: ["working-holiday", "no-eu", "emigrate"],
    availability: "Suele encajar mejor con latinos jóvenes, con inglés útil y colchón fuerte.",
  },
  "nueva-zelanda-soft-landing": {
    visaTracks: ["Working Holiday", "Student Visa", "Skilled Migrant a futuro"],
    audience: ["working-holiday", "study", "emigrate", "no-eu"],
    availability: "Sirve mucho para quien prioriza adaptación más amable y orden de llegada.",
  },
  "espana-soft-landing": {
    visaTracks: ["Ciudadanía UE", "Nómada digital", "Estudio", "Residencia"],
    audience: ["emigrate", "eu-passport", "study", "remote", "no-eu"],
    availability: "Tiene más sentido para perfiles que valoran idioma, red latina y burocracia visible.",
  },
  "australia-study": {
    visaTracks: ["Student visa 500", "ELICOS", "VET/TAFE", "Higher education"],
    audience: ["study"],
    availability: "Encaja mejor con perfiles que sí quieren estudiar en serio y pueden sostener un aterrizaje caro.",
  },
  "ireland-study": {
    visaTracks: ["Stamp 2", "ILEP", "English language", "Higher education"],
    audience: ["study"],
    availability: "Muy buen fit para quien prioriza inglés y una puerta clara a Europa.",
  },
  "canada-study": {
    visaTracks: ["Study permit", "DLI", "College", "University"],
    audience: ["study", "emigrate"],
    availability: "Funciona mejor si buscas educación formal potente y puedes asumir un presupuesto más alto.",
  },
  "germany-study": {
    visaTracks: ["Student visa", "Public university", "Blocked account", "TestDaF/DSH"],
    audience: ["study", "no-eu"],
    availability: "Gran encaje para perfiles académicos o técnicos dispuestos a preparar idioma y burocracia.",
  },
  "spain-study": {
    visaTracks: ["Visado de estudios", "Universidad pública", "Universidad privada"],
    audience: ["study", "no-eu"],
    availability: "Especialmente útil para latinoamericanos que valoran idioma, adaptación y una entrada europea menos áspera.",
  },
  "spain-digital-nomad": {
    visaTracks: ["Teletrabajo internacional", "Residencia", "Fiscalidad"],
    audience: ["remote", "eu-passport"],
    availability: "Rinde mejor cuando ya tienes ingresos remotos consolidados y papeles bien ordenados.",
  },
  "portugal-d8": {
    visaTracks: ["D8", "Residencia remota", "AIMA"],
    audience: ["remote", "eu-passport"],
    availability: "Tiene sentido para remotos que quieren Europa y pueden demostrar ingresos de forma limpia.",
  },
  "germany-freiberufler": {
    visaTracks: ["Freiberufler", "Self-employment", "Clientes", "Seguro"],
    audience: ["remote", "emigrate"],
    availability: "Encaja mejor con freelancers ya operativos, no con perfiles todavía exploratorios.",
  },
  "estonia-digital-nomad": {
    visaTracks: ["e-Residency", "Digital Nomad Visa", "Empresa digital"],
    audience: ["remote"],
    availability: "Muy útil para perfiles digitales que entienden la diferencia entre identidad digital y residencia migratoria.",
  },
  "thailand-ltr": {
    visaTracks: ["LTR", "Remote worker", "High-potential individual"],
    audience: ["remote"],
    availability: "Solo encaja bien con perfiles de ingreso alto o estructura empresarial fuerte.",
  },
  "italy-citizenship-descent": {
    visaTracks: ["Iure sanguinis", "Consulado", "Comuna"],
    audience: ["no-eu", "eu-passport"],
    availability: "Tiene muchísimo valor si la línea familiar es sólida y documentable.",
  },
  "spain-citizenship-origin": {
    visaTracks: ["Nacionalidad", "Origen", "Opción"],
    audience: ["no-eu", "eu-passport"],
    availability: "Conviene revisarla pronto si realmente hay vínculo familiar, porque puede ahorrar años de rutas temporales.",
  },
  "spain-arraigo": {
    visaTracks: ["Arraigo", "Circunstancias excepcionales", "Regularización"],
    audience: ["no-eu"],
    availability: "No es ruta de salida desde origen: sirve para casos dentro de España que sí cumplen.",
  },
  "europe-study-entry": {
    visaTracks: ["Student visa", "España", "Irlanda", "Alemania"],
    audience: ["no-eu", "study"],
    availability: "Es la puerta más replicable para muchos perfiles no UE cuando hay admisión, fondos y un plan serio.",
  },
};

const visaRecommendationMap = {
  "working-holiday": {
    title: "Te conviene empezar por Working Holiday o una vía temporal parecida",
    description:
      "Tu perfil encaja mejor con una entrada flexible para trabajar, ordenar caja y decidir después si el país merece una estrategia de más largo plazo.",
  },
  study: {
    title: "Tu mejor puerta de entrada parece estudio",
    description:
      "Cuando el objetivo es abrir camino con más estructura, estudio suele darte más margen para idioma, adaptación y siguiente paso migratorio.",
  },
  "eu-passport": {
    title: "Tu ventaja más fuerte está en la ciudadanía europea",
    description:
      "Antes de mirar visas complejas, conviene exprimir la libertad de movimiento y trabajo dentro de la UE.",
  },
  emigrate: {
    title: "Necesitas mirar residencia, skilled o sponsor con cabeza larga",
    description:
      "Tu caso pide estrategia más seria y por etapas, no solo una entrada rápida o temporal.",
  },
  remote: {
    title: "Tu mejor fit inicial es una visa para trabajo remoto",
    description:
      "Si ya generas ingresos online, el cuello de botella suele estar en demostrar ingresos, fiscalidad y estabilidad, no en conseguir empleo local.",
  },
  "no-eu": {
    title: "Te conviene priorizar opciones honestas sin pasaporte europeo",
    description:
      "Tu encaje pasa por filtrar de forma realista entre estudio, WH si aplica, sponsor o procesos más largos.",
  },
};

const state = {
  user: null,
  posts: [],
  diary: [],
  favorites: [],
  checklist: {},
};

const authOverlay = document.getElementById("auth-overlay");
const authForm = document.getElementById("auth-form");
const authFeedback = document.getElementById("auth-feedback");
const authNameInput = authForm?.elements.namedItem("name");
const authUsernameInput = authForm?.elements.namedItem("username");
const authPasswordInput = authForm?.elements.namedItem("password");
const authConfirmPasswordInput = authForm?.elements.namedItem("confirmPassword");
const forgotPasswordToggle = document.getElementById("forgot-password-toggle");
const forgotPasswordButton = document.getElementById("forgot-password-button");
const resetPasswordButton = document.getElementById("reset-password-button");
const authRecovery = document.getElementById("auth-recovery");
const recoveryTokenOutput = document.getElementById("recovery-token-output");
const passwordToggleButtons = Array.from(authForm?.querySelectorAll("[data-toggle-password]") || []);
const appShell = document.getElementById("app-shell");
const topbarTag = document.getElementById("topbar-tag");
const topbarTitle = document.getElementById("topbar-title");
const userName = document.getElementById("user-name");
const userStage = document.getElementById("user-stage");
const logoutButton = document.getElementById("logout-button");
const welcomeCopy = document.getElementById("welcome-copy");

const navItems = Array.from(document.querySelectorAll("[data-view]"));
const panels = Array.from(document.querySelectorAll("[data-panel]"));
const jumpViewButtons = Array.from(document.querySelectorAll("[data-jump-view]"));

const fitForm = document.getElementById("fit-form");
const fitResult = document.getElementById("fit-result");
const communityCount = document.getElementById("community-count");
const savedCount = document.getElementById("saved-count");
const diaryCount = document.getElementById("diary-count");
const communityPreview = document.getElementById("community-preview");

const communityFilters = Array.from(document.querySelectorAll("[data-category]"));
const forumList = document.getElementById("forum-list");
const threadDetail = document.getElementById("thread-detail");
const postForm = document.getElementById("post-form");
const postRouteSelect = document.getElementById("post-route-select");

const countryFilters = Array.from(document.querySelectorAll("[data-filter]"));
const exploreTabs = Array.from(document.querySelectorAll("[data-explore-tab]"));
const exploreSpotlight = document.getElementById("explore-spotlight");
const visaMatchForm = document.getElementById("visa-match-form");
const visaMatchResult = document.getElementById("visa-match-result");
const routeList = document.getElementById("route-list");
const routeDetail = document.getElementById("route-detail");

const diaryForm = document.getElementById("diary-form");
const diaryList = document.getElementById("diary-list");
const diaryRouteSelect = document.getElementById("diary-route-select");
const clearDiaryButton = document.getElementById("clear-diary");

const profileName = document.getElementById("profile-name");
const profileSummary = document.getElementById("profile-summary");
const profileStats = document.getElementById("profile-stats");

let selectedCountryFilter = "all";
let selectedCategory = "all";
let selectedExploreTab = "emigrate";
let selectedRouteId = routes[0].id;
let selectedThreadId = null;

function buildUsername(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

async function api(path, options = {}) {
  const response = await fetch(path, {
    method: options.method || "GET",
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(options.headers || {}),
    },
    credentials: "same-origin",
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.error || "No pudimos completar la solicitud.");
    error.status = response.status;
    error.path = path;
    throw error;
  }

  return data;
}

async function getCurrentUserSilently() {
  try {
    const data = await api("/api/auth/me");
    return data.user;
  } catch (error) {
    if (error.status === 401 && error.path === "/api/auth/me") {
      return null;
    }
    throw error;
  }
}

function formatDate(dateString) {
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(dateString));
}

function populateRouteOptions() {
  const options = routes
    .map((route) => `<option value="${route.id}">${route.country} · ${route.title}</option>`)
    .join("");

  postRouteSelect.innerHTML = options;
  diaryRouteSelect.innerHTML = options;
}

function getCurrentExploreProfile() {
  return exploreTabProfiles[selectedExploreTab] || exploreTabProfiles.emigrate;
}

function getPrimaryExploreTabForRoute(routeId) {
  return routeContext[routeId]?.audience?.[0] || "emigrate";
}

function renderExploreSpotlight() {
  if (!exploreSpotlight) return;

  const profile = getCurrentExploreProfile();

  exploreSpotlight.innerHTML = `
    <span class="section-tag">${profile.label}</span>
    <h3>${profile.title}</h3>
    <p>${profile.description}</p>

    <div class="detail-section">
      <h4>Vías a mirar primero</h4>
      <div class="detail-tags">
        ${profile.visas.map((item) => `<span>${item}</span>`).join("")}
      </div>
    </div>

    <div class="detail-section">
      <h4>Destinos base</h4>
      <div class="detail-tags">
        ${profile.destinations.map((item) => `<span>${item}</span>`).join("")}
      </div>
    </div>

    <div class="detail-section">
      <h4>Alertas honestas</h4>
      <ul class="detail-list">
        ${profile.obstacles.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </div>

    <div class="detail-section">
      <h4>Siguiente paso</h4>
      <p>${profile.nextStep}</p>
    </div>
  `;
}

function syncExploreTabs() {
  exploreTabs.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.exploreTab === selectedExploreTab);
  });
}

function setExploreTab(tabId) {
  selectedExploreTab = exploreTabProfiles[tabId] ? tabId : "emigrate";
  syncExploreTabs();
  renderExploreSpotlight();
  renderRouteCards();
  renderRouteDetail();
}

function getVisaRecommendation(formData) {
  const answers = {
    goal: formData.get("goal"),
    euPassport: formData.get("euPassport"),
    ageRange: formData.get("ageRange"),
    englishLevel: formData.get("englishLevel"),
    budgetLevel: formData.get("budgetLevel"),
  };

  let tabId = "no-eu";
  let blocker = "Filtra una vía principal antes de comparar países.";

  if (answers.euPassport === "yes") {
    tabId = "eu-passport";
    blocker = "La ventaja legal es fuerte, pero ciudad, alquiler e ingresos siguen pesando.";
  } else if (answers.goal === "remote") {
    tabId = "remote";
    blocker = "Necesitarás ingresos demostrables y documentación ordenada.";
  } else if (answers.goal === "study") {
    tabId = "study";
    blocker = "Mira el coste total real y no solo la matrícula o el curso.";
  } else if (answers.goal === "working-holiday" && answers.ageRange !== "36+") {
    tabId = "working-holiday";
    blocker = "Edad, nacionalidad, cupos y caja inicial mandan mucho aquí.";
  } else if (answers.goal === "family" || answers.goal === "emigrate") {
    tabId = "emigrate";
    blocker = "Te conviene pensar por etapas: entrada, estabilidad y residencia.";
  }

  if (answers.goal === "working-holiday" && answers.ageRange === "36+") {
    tabId = answers.euPassport === "yes" ? "eu-passport" : "no-eu";
    blocker = "Si ya quedaste fuera de edad para WH, conviene pasar rápido a estudio, sponsor o residencia.";
  }

  const recommendation = visaRecommendationMap[tabId];
  const profile = exploreTabProfiles[tabId];
  const languageNote =
    answers.englishLevel === "basic"
      ? "Con inglés básico conviene priorizar destinos con más red latina o entrar por estudio/idioma."
      : answers.englishLevel === "mid"
        ? "Con inglés intermedio ya puedes mirar opciones más abiertas, pero toca afinar presupuesto y timing."
        : "Con inglés alto se amplían más las vías de estudio, trabajo calificado y sponsor.";
  const budgetNote =
    answers.budgetLevel === "low"
      ? "Con presupuesto ajustado hay que evitar decisiones impulsivas y medir muy bien el coste de entrada."
      : answers.budgetLevel === "mid"
        ? "Con presupuesto medio puedes abrir varias puertas, pero igual conviene priorizar una sola estrategia."
        : "Con presupuesto alto ganas margen para estudio, ciudades más caras o una transición más ordenada.";

  return {
    tabId,
    title: recommendation.title,
    description: recommendation.description,
    countries: profile.destinations.slice(0, 3),
    blocker,
    notes: [languageNote, budgetNote],
  };
}

function renderVisaRecommendation(result) {
  if (!visaMatchResult) return;

  visaMatchResult.innerHTML = `
    <span class="section-tag">Recomendación</span>
    <h3>${result.title}</h3>
    <p>${result.description}</p>
    <div class="detail-tags">
      ${result.countries.map((item) => `<span>${item}</span>`).join("")}
    </div>
    <div class="detail-section">
      <h4>Lo que más pesa ahora</h4>
      <p>${result.blocker}</p>
    </div>
    <div class="detail-section">
      <h4>Lectura rápida</h4>
      <ul class="detail-list">
        ${result.notes.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </div>
  `;
}

function setActiveView(view) {
  navItems.forEach((item) => {
    item.classList.toggle("is-active", item.dataset.view === view);
  });

  panels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.panel === view);
  });

  const labels = {
    dashboard: ["Inicio", "Tu panel de aterrizaje"],
    community: ["Comunidad", "Foro práctico de migrantes y backpackers"],
    routes: ["Explorar", "Opciones migratorias por perfil, visa y etapa"],
    diary: ["Bitácora", "Tu diario personal del camino"],
    profile: ["Perfil", "Tu estado dentro de la comunidad"],
  };

  const [tag, title] = labels[view];
  topbarTag.textContent = tag;
  topbarTitle.textContent = title;
}

function renderAuthState() {
  if (!state.user) {
    authOverlay.classList.remove("is-hidden");
    appShell.classList.add("is-hidden");
    return;
  }

  authOverlay.classList.add("is-hidden");
  appShell.classList.remove("is-hidden");
  userName.textContent = state.user.name;
  userStage.textContent = state.user.stage;
  welcomeCopy.textContent = `${state.user.name}, esta beta te muestra una comunidad cerrada con preguntas reales, rutas base y espacio para guardar tu proceso desde ${state.user.origin}.`;
}

function renderDashboardStats() {
  communityCount.textContent = String(state.posts.length);
  savedCount.textContent = String(state.favorites.length);
  diaryCount.textContent = String(state.diary.length);
}

function renderCommunityPreview() {
  communityPreview.innerHTML = [...state.posts]
    .slice(0, 3)
    .map(
      (post) => `
        <article class="mini-thread">
          <span class="thread-category">${post.category}</span>
          <h4 class="thread-title">${post.title}</h4>
          <p>${post.body.slice(0, 110)}...</p>
        </article>
      `
    )
    .join("");
}

function calculateBestRoute(formData) {
  const values = {
    goal: formData.get("goal"),
    budget: formData.get("budget"),
    english: formData.get("english"),
    priority: formData.get("priority"),
  };

  return routes
    .filter((route) => route.scoreProfile)
    .map((route) => ({
      route,
      total:
        route.scoreProfile.goal[values.goal] +
        route.scoreProfile.budget[values.budget] +
        route.scoreProfile.english[values.english] +
        route.scoreProfile.priority[values.priority],
    }))
    .sort((a, b) => b.total - a.total)[0].route;
}

function getRouteStats(route) {
  if (Array.isArray(route.stats) && route.stats.length) {
    return route.stats;
  }

  return [
    { label: "Dificultad", value: route.difficulty },
    { label: "Presupuesto", value: route.budgetLabel },
    { label: "Preparación", value: route.prepLabel },
    { label: "Idioma / filtro", value: route.englishLabel },
  ];
}

function renderFitResult(route) {
  fitResult.innerHTML = `
    <span class="section-tag">Ruta sugerida</span>
    <h3>${route.country}</h3>
    <p>${route.summary}</p>
    <div class="detail-tags">
      <span>${route.difficulty}</span>
      <span>${route.budgetLabel}</span>
      <span>${route.englishLabel}</span>
    </div>
    <div class="detail-section">
      <h4>Primer enfoque</h4>
      <ul class="detail-list">
        ${route.reality.slice(0, 2).map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </div>
    <button class="primary-btn wide" type="button" id="open-suggested-route">Abrir esta ruta</button>
  `;

  document.getElementById("open-suggested-route").addEventListener("click", () => {
    selectedRouteId = route.id;
    selectedCountryFilter = "all";
    selectedExploreTab = getPrimaryExploreTabForRoute(route.id);
    syncExploreTabs();
    renderExploreSpotlight();
    syncCountryFilters();
    setActiveView("routes");
    renderRouteCards();
    renderRouteDetail();
  });
}

function getFilteredPosts() {
  return selectedCategory === "all"
    ? state.posts
    : state.posts.filter((post) => post.category === selectedCategory);
}

function replacePost(updatedPost) {
  state.posts = state.posts.map((post) => (post.id === updatedPost.id ? updatedPost : post));
}

function renderForumList() {
  const posts = getFilteredPosts();

  if (!posts.length) {
    forumList.innerHTML = `<div class="feed-empty">No hay hilos en esta categoría todavía.</div>`;
    threadDetail.innerHTML = `
      <span class="section-tag">Detalle del hilo</span>
      <h3>Aún no hay hilos aquí.</h3>
      <p>Prueba publicar la primera pregunta para abrir esta categoría.</p>
    `;
    return;
  }

  if (!selectedThreadId || !posts.some((post) => post.id === selectedThreadId)) {
    selectedThreadId = posts[0].id;
  }

  forumList.innerHTML = posts
    .map((post) => {
      const route = routes.find((item) => item.id === post.routeId);
      return `
        <article class="thread-card ${post.id === selectedThreadId ? "is-selected" : ""}">
          <div class="thread-head">
            <span class="thread-category">${post.category}</span>
            <span class="thread-meta">${route?.country || "Ruta"} · ${formatDate(post.createdAt)}</span>
          </div>
          <h4 class="thread-title">${post.title}</h4>
          <p>${post.body.slice(0, 180)}${post.body.length > 180 ? "..." : ""}</p>
          <div class="thread-actions">
            <button type="button" data-open-thread="${post.id}">Abrir hilo</button>
            <button type="button">${post.replies.length} respuestas</button>
          </div>
        </article>
      `;
    })
    .join("");

  forumList.querySelectorAll("[data-open-thread]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedThreadId = button.dataset.openThread;
      renderForumList();
      renderThreadDetail();
    });
  });
}

function renderThreadDetail() {
  const post = state.posts.find((item) => item.id === selectedThreadId);

  if (!post) {
    threadDetail.innerHTML = `
      <span class="section-tag">Detalle del hilo</span>
      <h3>Selecciona un hilo para verlo completo.</h3>
      <p>Aquí aparecerán el contenido completo, respuestas y un formulario para seguir la conversación.</p>
    `;
    return;
  }

  const route = routes.find((item) => item.id === post.routeId);

  threadDetail.innerHTML = `
    <span class="section-tag">${post.category}</span>
    <h3>${post.title}</h3>
    <p>${post.body}</p>

    <div class="detail-tags">
      <span>${post.authorName}</span>
      <span>${route?.country || "Ruta"}</span>
      <span>${formatDate(post.createdAt)}</span>
    </div>

    <div class="detail-section">
      <h4>Respuestas</h4>
      <div class="reply-list">
        ${
          post.replies.length
            ? post.replies
                .map(
                  (reply) => `
                    <article class="reply-item">
                      <div class="reply-meta">
                        <strong>${reply.authorName}</strong>
                        <span>${formatDate(reply.createdAt)}</span>
                      </div>
                      <p>${reply.body}</p>
                    </article>
                  `
                )
                .join("")
            : `<div class="feed-empty">Todavía no hay respuestas. Puedes abrir la conversación.</div>`
        }
      </div>
    </div>

    <form class="reply-form" id="reply-form">
      <label>
        Responder como ${state.user?.name || "usuario"}
        <textarea name="reply" maxlength="500" placeholder="Comparte una experiencia, un consejo o una advertencia útil." required></textarea>
      </label>
      <button class="primary-btn" type="submit">Responder hilo</button>
    </form>
  `;

  document.getElementById("reply-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const replyBody = new FormData(event.currentTarget).get("reply").trim();
    if (!replyBody) return;

    try {
      const data = await api(`/api/community/posts/${post.id}/replies`, {
        method: "POST",
        body: { body: replyBody },
      });

      replacePost(data.post);
      renderDashboardStats();
      renderCommunityPreview();
      renderForumList();
      renderThreadDetail();
    } catch (error) {
      alert(error.message);
    }
  });
}

function getFilteredRoutes() {
  const profile = getCurrentExploreProfile();
  const routesByTab = routes.filter((route) => profile.routeIds.includes(route.id));

  return selectedCountryFilter === "all"
    ? routesByTab
    : routesByTab.filter((route) => route.country === selectedCountryFilter);
}

function renderRouteCards() {
  const filteredRoutes = getFilteredRoutes();

  if (!filteredRoutes.length) {
    routeList.innerHTML = `
      <div class="feed-empty">
        No hay rutas visibles para esta combinación todavía. Cambia el país o vuelve a "Todas" para seguir explorando.
      </div>
    `;
    routeDetail.innerHTML = `
      <span class="section-tag">Explorar</span>
      <h3>No encontramos una ruta visible con ese filtro.</h3>
      <p>Prueba con otro país o vuelve al tab sugerido para recuperar una ruta base.</p>
    `;
    return;
  }

  if (!filteredRoutes.some((route) => route.id === selectedRouteId)) {
    selectedRouteId = filteredRoutes[0]?.id || routes[0].id;
  }

  routeList.innerHTML = filteredRoutes
    .map((route) => {
      const favorite = state.favorites.includes(route.id);
      const context = routeContext[route.id];

      return `
        <article class="route-card ${route.id === selectedRouteId ? "is-selected" : ""}">
          <div class="route-top">
            <div>
              <span class="route-tag">${route.country}</span>
              <h3>${route.title}</h3>
              <p class="route-country">${route.base}</p>
            </div>
          </div>

          <p>${route.summary}</p>

          <div class="route-meta">
            <span class="meta-pill">${route.difficulty}</span>
            <span class="meta-pill">${route.budgetLabel}</span>
            <span class="meta-pill">${route.englishLabel}</span>
          </div>

          <div class="detail-tags route-mini-tags">
            ${(context?.visaTracks || []).map((item) => `<span>${item}</span>`).join("")}
          </div>

          <div class="card-actions">
            <button type="button" data-open-route="${route.id}">Abrir ruta</button>
            <button type="button" data-save-route="${route.id}">${favorite ? "Guardada" : "Guardar ruta"}</button>
          </div>
        </article>
      `;
    })
    .join("");

  routeList.querySelectorAll("[data-open-route]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedRouteId = button.dataset.openRoute;
      renderRouteCards();
      renderRouteDetail();
    });
  });

  routeList.querySelectorAll("[data-save-route]").forEach((button) => {
    button.addEventListener("click", async () => {
      try {
        const data = await api(`/api/community/favorites/${button.dataset.saveRoute}/toggle`, {
          method: "POST",
        });
        state.favorites = data.favorites;
        renderDashboardStats();
        renderRouteCards();
        renderProfile();
      } catch (error) {
        alert(error.message);
      }
    });
  });
}

function renderRouteDetail() {
  const visibleRoutes = getFilteredRoutes();

  if (!visibleRoutes.length) {
    routeDetail.innerHTML = `
      <span class="section-tag">Explorar</span>
      <h3>No encontramos una ruta visible con ese filtro.</h3>
      <p>Prueba con otro país o vuelve al tab sugerido para recuperar una ruta base.</p>
    `;
    return;
  }

  if (!visibleRoutes.some((item) => item.id === selectedRouteId)) {
    selectedRouteId = visibleRoutes[0].id;
  }

  const route = routes.find((item) => item.id === selectedRouteId);
  if (!route) return;
  const context = routeContext[route.id];
  const routeStats = getRouteStats(route);
  const fitTags = route.fitTags || [];
  const quickFacts = route.quickFacts || [];
  const highlights = route.highlights || [];
  const reality = route.reality || [];
  const guides = route.guides || [];
  const checklist = route.checklist || null;
  const experiences = route.experiences || [];
  const officialLinks = route.officialLinks || [];
  const pros = route.pros || [];
  const cons = route.cons || [];

  routeDetail.innerHTML = `
    <span class="section-tag">${route.country}</span>
    <h3>${route.title}</h3>
    <p>${route.summary}</p>

    <div class="detail-tags">
      ${fitTags.map((tag) => `<span>${tag}</span>`).join("")}
    </div>

    <div class="stat-strip">
      ${routeStats
        .map(
          (stat) => `
            <div class="stat-box">
              <strong>${stat.value}</strong>
              <span>${stat.label}</span>
            </div>
          `
        )
        .join("")}
    </div>

    ${
      (context?.visaTracks || []).length
        ? `
          <div class="detail-section">
            <h4>Vías que conviene mirar primero</h4>
            <div class="detail-tags">
              ${(context?.visaTracks || []).map((item) => `<span>${item}</span>`).join("")}
            </div>
          </div>
        `
        : ""
    }

    <div class="detail-section">
      <h4>Encaje del perfil</h4>
      <p>${context?.availability || "Úsala como ruta base y después afina visa, tiempos y presupuesto según tu caso."}</p>
    </div>

    ${
      quickFacts.length
        ? `
          <div class="detail-section">
            <h4>Ficha rápida</h4>
            <div class="facts-grid">
              ${quickFacts
                .map(
                  (fact) => `
                    <article class="fact-card">
                      <strong>${fact.label}</strong>
                      <p>${fact.value}</p>
                    </article>
                  `
                )
                .join("")}
            </div>
          </div>
        `
        : ""
    }

    ${
      highlights.length
        ? `
          <div class="detail-section">
            <h4>${route.highlightsTitle || "Puntos clave"}</h4>
            <ul class="detail-list">
              ${highlights.map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </div>
        `
        : ""
    }

    ${
      reality.length
        ? `
          <div class="detail-section">
            <h4>Realidad de la ruta</h4>
            <ul class="detail-list">
              ${reality.map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </div>
        `
        : ""
    }

    ${
      pros.length || cons.length
        ? `
          <div class="detail-section">
            <h4>Pros y contras honestos</h4>
            <div class="pros-cons-grid">
              ${
                pros.length
                  ? `
                    <article class="pros-cons-card">
                      <strong>Pros</strong>
                      <ul>
                        ${pros.map((item) => `<li>${item}</li>`).join("")}
                      </ul>
                    </article>
                  `
                  : ""
              }
              ${
                cons.length
                  ? `
                    <article class="pros-cons-card">
                      <strong>Contras</strong>
                      <ul>
                        ${cons.map((item) => `<li>${item}</li>`).join("")}
                      </ul>
                    </article>
                  `
                  : ""
              }
            </div>
          </div>
        `
        : ""
    }

    ${
      officialLinks.length
        ? `
          <div class="detail-section">
            <h4>Links oficiales</h4>
            <div class="resource-links">
              ${officialLinks
                .map(
                  (link) => `
                    <a class="resource-link" href="${link.url}" target="_blank" rel="noreferrer noopener">
                      <strong>${link.label}</strong>
                      <span>${link.url}</span>
                    </a>
                  `
                )
                .join("")}
            </div>
          </div>
        `
        : ""
    }

    ${
      route.sourceNote
        ? `
          <div class="detail-section">
            <h4>Nota honesta</h4>
            <p>${route.sourceNote}</p>
          </div>
        `
        : ""
    }

    ${
      guides.length
        ? `
          <div class="detail-section">
            <h4>Guías prácticas</h4>
            <div class="guides-grid">
              ${guides
                .map(
                  (guide) => `
                    <article class="guide-card">
                      <h5>${guide.title}</h5>
                      <p>${guide.body}</p>
                    </article>
                  `
                )
                .join("")}
            </div>
          </div>
        `
        : ""
    }

    ${
      checklist
        ? `
          <div class="detail-section">
            <h4>Checklist</h4>
            <div class="checklist-grid">
              ${Object.entries(checklist)
                .map(([phase, items]) => {
                  const key = `${route.id}:${phase}`;
                  const completed = state.checklist[key] === true;
                  const phaseLabel = {
                    before: "Antes de salir",
                    week1: "Primera semana",
                    month1: "Primer mes",
                  }[phase];

                  return `
                    <article class="checklist-card">
                      <h5>${phaseLabel}</h5>
                      <ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>
                      <button class="checklist-toggle ${completed ? "is-complete" : ""}" type="button" data-toggle-checklist="${key}">
                        ${completed ? "Etapa marcada" : "Marcar etapa"}
                      </button>
                    </article>
                  `;
                })
                .join("")}
            </div>
          </div>
        `
        : ""
    }

    ${
      experiences.length
        ? `
          <div class="detail-section">
            <h4>Experiencias compartidas</h4>
            <div class="experiences-grid">
              ${experiences
                .map(
                  (experience) => `
                    <article class="experience-card">
                      <h5>${experience.author}</h5>
                      <p>${experience.text}</p>
                    </article>
                  `
                )
                .join("")}
            </div>
          </div>
        `
        : ""
    }
  `;

  routeDetail.querySelectorAll("[data-toggle-checklist]").forEach((button) => {
    button.addEventListener("click", async () => {
      try {
        const data = await api("/api/community/checklist/toggle", {
          method: "POST",
          body: { key: button.dataset.toggleChecklist },
        });
        state.checklist = data.checklist;
        renderRouteDetail();
        renderProfile();
      } catch (error) {
        alert(error.message);
      }
    });
  });
}

function renderDiary() {
  const entries = [...state.diary].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  if (!entries.length) {
    diaryList.innerHTML = `<div class="feed-empty">Todavía no guardaste entradas. Usa la bitácora para no perder aprendizajes, gastos o trámites.</div>`;
    return;
  }

  diaryList.innerHTML = entries
    .map((entry) => {
      const route = routes.find((item) => item.id === entry.routeId);
      return `
        <article class="diary-entry">
          <div class="entry-head">
            <div>
              <h5>${entry.title}</h5>
              <span class="entry-meta">${route?.country || "Ruta"} · ${entry.mood} · ${formatDate(entry.createdAt)}</span>
            </div>
            <button class="entry-remove" type="button" data-delete-entry="${entry.id}">Eliminar</button>
          </div>
          <p>${entry.body}</p>
        </article>
      `;
    })
    .join("");

  diaryList.querySelectorAll("[data-delete-entry]").forEach((button) => {
    button.addEventListener("click", async () => {
      try {
        await api(`/api/community/diary/${button.dataset.deleteEntry}`, { method: "DELETE" });
        state.diary = state.diary.filter((entry) => entry.id !== button.dataset.deleteEntry);
        renderDiary();
        renderDashboardStats();
        renderProfile();
      } catch (error) {
        alert(error.message);
      }
    });
  });
}

function renderProfile() {
  profileName.textContent = state.user?.name || "Perfil";
  profileSummary.innerHTML = `
    <li>Email: ${state.user?.email || "-"}</li>
    <li>Origen: ${state.user?.origin || "-"}</li>
    <li>Etapa: ${state.user?.stage || "-"}</li>
  `;

  const checklistDone = Object.values(state.checklist).filter(Boolean).length;
  const userPosts = state.posts.filter((post) => post.authorName === state.user?.name).length;

  profileStats.innerHTML = `
    <div class="stat-box">
      <strong>${state.favorites.length}</strong>
      <span>Rutas guardadas</span>
    </div>
    <div class="stat-box">
      <strong>${state.diary.length}</strong>
      <span>Entradas de bitácora</span>
    </div>
    <div class="stat-box">
      <strong>${checklistDone}</strong>
      <span>Etapas marcadas</span>
    </div>
    <div class="stat-box">
      <strong>${userPosts}</strong>
      <span>Hilos publicados</span>
    </div>
  `;
}

function syncCountryFilters() {
  countryFilters.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.filter === selectedCountryFilter);
  });
}

function syncCommunityFilters() {
  communityFilters.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.category === selectedCategory);
  });
}

function renderApp() {
  renderAuthState();
  if (!state.user) return;

  syncExploreTabs();
  renderExploreSpotlight();
  renderDashboardStats();
  renderCommunityPreview();
  renderForumList();
  renderThreadDetail();
  renderRouteCards();
  renderRouteDetail();
  renderDiary();
  renderProfile();
}

if (authNameInput && authUsernameInput) {
  authUsernameInput.value = "";
  authUsernameInput.dataset.userEdited = "false";

  authNameInput.addEventListener("input", () => {
    if (authUsernameInput.dataset.userEdited === "true") return;
    authUsernameInput.value = buildUsername(authNameInput.value);
  });

  authUsernameInput.addEventListener("input", () => {
    authUsernameInput.dataset.userEdited = authUsernameInput.value.trim() ? "true" : "false";
  });
}

passwordToggleButtons.forEach((button) => {
  const input = button.previousElementSibling;

  if (!(input instanceof HTMLInputElement)) return;
  const showLabel = button.getAttribute("aria-label") || "Mostrar contraseña";

  button.addEventListener("click", () => {
    const isVisible = input.type === "text";
    input.type = isVisible ? "password" : "text";
    button.setAttribute("aria-pressed", String(!isVisible));
    button.setAttribute("aria-label", isVisible ? showLabel : "Ocultar contraseña");
  });
});

if (forgotPasswordToggle && authRecovery) {
  forgotPasswordToggle.addEventListener("click", () => {
    authRecovery.classList.toggle("is-hidden");
    if (recoveryTokenOutput) {
      recoveryTokenOutput.textContent = "";
    }
  });
}

if (forgotPasswordButton) {
  forgotPasswordButton.addEventListener("click", async () => {
    authFeedback.textContent = "";
    if (recoveryTokenOutput) {
      recoveryTokenOutput.textContent = "";
    }

    const recoveryEmail = authForm.elements.namedItem("recoveryEmail")?.value.trim();
    if (!recoveryEmail) {
      authFeedback.textContent = "Necesitamos tu email para generar el token.";
      return;
    }

    try {
      const data = await api("/api/auth/forgot-password", {
        method: "POST",
        body: { email: recoveryEmail },
      });

      if (recoveryTokenOutput) {
        recoveryTokenOutput.textContent = `Token temporal: ${data.token}`;
      }
    } catch (error) {
      authFeedback.textContent = error.message;
    }
  });
}

if (resetPasswordButton) {
  resetPasswordButton.addEventListener("click", async () => {
    authFeedback.textContent = "";

    const resetToken = authForm.elements.namedItem("resetToken")?.value.trim();
    const resetPassword = authForm.elements.namedItem("resetPassword")?.value || "";
    const resetPasswordConfirm = authForm.elements.namedItem("resetPasswordConfirm")?.value || "";

    if (!resetToken || !resetPassword) {
      authFeedback.textContent = "Completa el token y la nueva contraseña.";
      return;
    }

    if (resetPassword !== resetPasswordConfirm) {
      authFeedback.textContent = "Las contraseñas no coinciden";
      return;
    }

    try {
      await api("/api/auth/reset-password", {
        method: "POST",
        body: {
          token: resetToken,
          password: resetPassword,
        },
      });

      authFeedback.textContent = "Contraseña actualizada. Ya puedes iniciar sesión.";
      if (recoveryTokenOutput) {
        recoveryTokenOutput.textContent = "";
      }
      authForm.elements.namedItem("resetToken").value = "";
      authForm.elements.namedItem("resetPassword").value = "";
      authForm.elements.namedItem("resetPasswordConfirm").value = "";
    } catch (error) {
      authFeedback.textContent = error.message;
    }
  });
}

async function bootstrap() {
  const [user, data] = await Promise.all([getCurrentUserSilently(), api("/api/community/bootstrap")]);
  state.user = user ?? data.user;
  state.posts = data.posts;
  state.diary = data.diary;
  state.favorites = data.favorites;
  state.checklist = data.checklist;
  renderApp();
}

countryFilters.forEach((button) => {
  button.addEventListener("click", () => {
    selectedCountryFilter = button.dataset.filter;
    syncCountryFilters();
    renderRouteCards();
    renderRouteDetail();
  });
});

exploreTabs.forEach((button) => {
  button.addEventListener("click", () => {
    selectedCountryFilter = "all";
    syncCountryFilters();
    setExploreTab(button.dataset.exploreTab);
  });
});

communityFilters.forEach((button) => {
  button.addEventListener("click", () => {
    selectedCategory = button.dataset.category;
    syncCommunityFilters();
    renderForumList();
    renderThreadDetail();
  });
});

navItems.forEach((item) => {
  item.addEventListener("click", () => setActiveView(item.dataset.view));
});

jumpViewButtons.forEach((button) => {
  button.addEventListener("click", () => setActiveView(button.dataset.jumpView));
});

if (visaMatchForm) {
  visaMatchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const result = getVisaRecommendation(new FormData(visaMatchForm));
    renderVisaRecommendation(result);
    selectedCountryFilter = "all";
    syncCountryFilters();
    setExploreTab(result.tabId);
  });
}

authForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  authFeedback.textContent = "";

  const mode = event.submitter?.value || "register";
  const formData = new FormData(authForm);
  const payload = {
    name: formData.get("name").trim(),
    username: formData.get("username").trim(),
    email: formData.get("email").trim(),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword") || "",
    origin: formData.get("origin").trim(),
    stage: formData.get("stage"),
  };

  try {
    let data;
    if (mode === "register") {
      if (!payload.name || !payload.origin) {
        throw new Error("Para crear una cuenta necesitamos nombre y país de origen.");
      }

      if (payload.password !== payload.confirmPassword) {
        throw new Error("Las contraseñas no coinciden");
      }

      data = await api("/api/auth/register", {
        method: "POST",
        body: {
          name: payload.name,
          username: payload.username,
          email: payload.email,
          password: payload.password,
          origin: payload.origin,
          stage: payload.stage,
        },
      });
    } else {
      data = await api("/api/auth/login", {
        method: "POST",
        body: {
          email: payload.email,
          password: payload.password,
        },
      });
    }

    state.user = data.user;
    state.posts = data.posts;
    state.diary = data.diary;
    state.favorites = data.favorites;
    state.checklist = data.checklist;
    authForm.reset();
    if (authUsernameInput) {
      authUsernameInput.value = "";
      authUsernameInput.dataset.userEdited = "false";
    }
    if (authConfirmPasswordInput) {
      authConfirmPasswordInput.value = "";
    }
    if (authRecovery) {
      authRecovery.classList.add("is-hidden");
    }
    if (recoveryTokenOutput) {
      recoveryTokenOutput.textContent = "";
    }
    renderApp();
  } catch (error) {
    authFeedback.textContent = error.message;
  }
});

logoutButton.addEventListener("click", async () => {
  try {
    await api("/api/auth/logout", { method: "POST" });
  } catch {
    // no-op
  }

  state.user = null;
  state.diary = [];
  state.favorites = [];
  state.checklist = {};
  renderAuthState();
});

fitForm.addEventListener("submit", (event) => {
  event.preventDefault();
  renderFitResult(calculateBestRoute(new FormData(fitForm)));
});

postForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(postForm);

  try {
    const data = await api("/api/community/posts", {
      method: "POST",
      body: {
        category: formData.get("category"),
        routeId: formData.get("route"),
        title: formData.get("title").trim(),
        body: formData.get("body").trim(),
      },
    });

    state.posts.unshift(data.post);
    selectedThreadId = data.post.id;
    postForm.reset();
    populateRouteOptions();
    renderDashboardStats();
    renderCommunityPreview();
    renderForumList();
    renderThreadDetail();
    renderProfile();
  } catch (error) {
    alert(error.message);
  }
});

diaryForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(diaryForm);

  try {
    const data = await api("/api/community/diary", {
      method: "POST",
      body: {
        routeId: formData.get("route"),
        mood: formData.get("mood"),
        title: formData.get("title").trim(),
        body: formData.get("body").trim(),
      },
    });

    state.diary.unshift(data.entry);
    diaryForm.reset();
    populateRouteOptions();
    renderDiary();
    renderDashboardStats();
    renderProfile();
  } catch (error) {
    alert(error.message);
  }
});

clearDiaryButton.addEventListener("click", async () => {
  const ids = state.diary.map((entry) => entry.id);
  for (const id of ids) {
    await api(`/api/community/diary/${id}`, { method: "DELETE" });
  }
  state.diary = [];
  renderDiary();
  renderDashboardStats();
  renderProfile();
});

populateRouteOptions();
syncCountryFilters();
syncCommunityFilters();
setActiveView("dashboard");
bootstrap().catch((error) => {
  authFeedback.textContent = error.message;
  renderAuthState();
});
