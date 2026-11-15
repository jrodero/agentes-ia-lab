# Instagram @mequieroir: automatización y kit de contenido

Este documento tiene dos partes:

1. **Automatización**: cuando alguien comenta o escribe por DM una palabra clave (por ejemplo `INFO` o `AUSTRALIA`), la cuenta responde sola por mensaje privado y lleva a la asesoría.
2. **Kit de contenido**: guiones de reels, textos y llamadas a la acción que activan esa automatización.

---

## 1. Automatización por palabra clave

### Cómo funciona

- Código: `instagram-bot.js`, con las rutas `GET/POST /api/instagram/webhook` en `server.js`.
- Usa la API oficial de Instagram ("Instagram API with Instagram Login") con `fetch`. No añade dependencias.
- Si alguien **comenta** una palabra clave en un post o reel:
  - recibe un DM privado con la información, y
  - debajo de su comentario aparece una respuesta pública corta ("¡Te escribí por DM! 📩").
- Si alguien **escribe un DM** con una palabra clave, recibe la respuesta en el mismo chat.
- Cada contacto queda guardado en `leads.json` con el canal, el ID de Instagram, el usuario (si viene) y la palabra clave.
- Se ignoran los mensajes de la propia cuenta y las entregas repetidas de Meta.
- Sin `INSTAGRAM_ACCESS_TOKEN`, no envía nada: solo lo registra en consola. Así se puede probar sin riesgo.

### Palabras clave incluidas

| Palabra clave | Qué responde |
|---|---|
| `INFO`, `GUIA`, `ME QUIERO IR` | Pide país de origen, destino, objetivo y edad, y enlaza al asistente y a la reserva |
| `AUSTRALIA`, `AUS`, `WHV` | Orientación inicial para Australia y enlace a la reserva |
| `NZ`, `NUEVA ZELANDA` | Orientación inicial para Nueva Zelanda y enlace a la reserva |
| `ESPAÑA`, `SPAIN` | Orientación inicial para España y enlace a la reserva |
| `ASESORIA`, `RESERVAR`, `CITA` | Explica la asesoría (1 a 1, 30 min, videollamada, 29 €) y enlaza a la reserva |

Los textos se editan en el array `KEYWORDS` de `instagram-bot.js`. No distinguen mayúsculas ni tildes.

### Qué necesitas configurar (una sola vez)

1. **Cuenta profesional.** En la app de Instagram: Configuración → Tipo de cuenta → cambiar a cuenta de empresa o de creador.
2. **App de Meta.** En developers.facebook.com, crea una app y añade el producto **Instagram** con la opción "API setup with Instagram login".
3. **Conecta @mequieroir** a la app y genera un **token de acceso** con estos permisos:
   - `instagram_business_basic`
   - `instagram_business_manage_messages`
   - `instagram_business_manage_comments`
4. **Webhook.** En la misma sección de la app:
   - URL de callback: `https://mequieroir.com/api/instagram/webhook`
   - Token de verificación: el texto que elijas (el mismo que pongas en `INSTAGRAM_VERIFY_TOKEN`)
   - Suscríbete a los campos `messages` y `comments`.
5. **Activa los mensajes de herramientas conectadas.** En la app de Instagram: Configuración → Mensajes y respuestas a historias → Herramientas conectadas → permitir acceso a los mensajes.
6. **Variables de entorno en el servidor** (en `.env` o en el panel del hosting, nunca en el repositorio):

```bash
INSTAGRAM_VERIFY_TOKEN=un-texto-secreto-que-tu-eliges
INSTAGRAM_APP_SECRET=el-app-secret-de-tu-app-de-meta
INSTAGRAM_ACCESS_TOKEN=el-token-de-la-cuenta-mequieroir
PUBLIC_SITE_URL=https://mequieroir.com
# Opcional: versión de la API de Graph (por defecto v23.0)
INSTAGRAM_API_VERSION=v23.0
```

7. **Revisión de Meta.** Mientras la app está en modo desarrollo, solo responde a las cuentas añadidas como testers. Para que responda a cualquier persona, hay que pedir la revisión de la app ("App Review") para los permisos de arriba.

> Los nombres de permisos y pantallas de Meta cambian a menudo. Si algo no coincide, revisa la documentación oficial de Meta for Developers (sección Instagram Platform).

### Límites a tener en cuenta

- Meta solo permite **una respuesta privada por comentario**, y debe enviarse dentro de los 7 días siguientes al comentario.
- Después de que alguien escribe por DM, la cuenta puede responder durante **24 horas**.
- Los tokens caducan. Si los DMs dejan de salir, revisa los logs del servidor (`[instagram] Error ...`) y renueva el token.

---

## 2. Kit de contenido

Formato recomendado: reel vertical de 20–40 segundos, texto grande en pantalla, cierre con una palabra clave para comentar.

### Reel 1: "3 errores antes de emigrar"

- **Hook (0–3 s):** "Si estás pensando en emigrar, no cometas estos 3 errores."
- **Desarrollo:**
  1. Elegir país por lo que dicen en redes, sin mirar tu perfil.
  2. Gastar en trámites antes de confirmar que tu vía encaja contigo.
  3. Fiarte de foros en vez de fuentes oficiales.
- **Cierre:** "Comenta **INFO** y te digo por dónde empezar según tu caso."
- **Texto del post:**
  > Emigrar bien empieza por elegir bien. Antes de gastar tiempo y dinero, revisa si tu camino encaja con tu perfil real.
  > Comenta INFO y te escribimos por privado ✈️
  > Información orientativa, no asesoramiento legal.

### Reel 2: "¿Australia o Nueva Zelanda?"

- **Hook:** "¿Australia o Nueva Zelanda? Depende de 3 cosas."
- **Desarrollo:** tu nacionalidad, tu edad y tu objetivo (experiencia temporal o quedarte a largo plazo). Sin esos datos, cualquier comparación es genérica.
- **Cierre:** "Comenta **AUSTRALIA** o **NZ** y te digo qué mirar primero."

### Reel 3: "España: no hay una sola vía"

- **Hook:** "¿Quieres irte a España? Primero responde esto."
- **Desarrollo:** ¿vas a estudiar, trabajar o residir? ¿Cuál es tu nacionalidad? ¿Dónde vives ahora? Cada respuesta cambia el camino.
- **Cierre:** "Comenta **ESPAÑA** y te paso los primeros pasos."

### Reel 4: "Qué pasa en una asesoría de 30 minutos"

- **Hook:** "Esto es lo que hacemos en 30 minutos."
- **Desarrollo:** analizamos tu perfil → comparamos 2 o 3 caminos realistas → te llevas los próximos pasos claros.
- **Mensaje clave:** "No prometemos visados. Te ayudamos a decidir con información clara."
- **Cierre:** "Comenta **ASESORIA** y te paso el enlace."

### Reel 5: "Mito vs realidad"

- **Formato:** pantalla dividida con "Lo que crees" / "Lo que pasa".
- **Ejemplo:** "Con ahorrar ya está" → "El presupuesto importa, pero tu perfil decide qué vías tienes."
- **Cierre:** "Comenta **INFO** y lo revisamos."

### Hashtags (elige 5–8 por post)

`#emigrar #mequieroir #vivirenelextranjero #emigrarabroad #workingholiday #australia #nuevazelanda #españa #visados #migracion #viajarytrabajar`

### Reglas para todo el contenido

- Español neutro, sin voseo, tono cercano y profesional.
- No dar requisitos, costes ni plazos concretos en los reels: cambian y deben confirmarse en fuentes oficiales.
- No prometer visados ni resultados.
- Incluir cuando corresponda: *"Esta información es orientativa. Para asesoramiento legal oficial, se recomienda consultar fuentes gubernamentales o profesionales certificados."*
- Cada reel termina con **una sola** palabra clave que exista en la automatización.
