// Borra del calendario principal solo los eventos creados al importar plan.ics
// Matchea por iCalUID terminado en "@plan.claude" - no toca nada más.
//
// Cómo usar:
// 1. Entra a https://script.google.com → "Nuevo proyecto"
// 2. Borra el contenido de Code.gs y pega este archivo entero
// 3. En el panel izquierdo, click en "Servicios" (+) → busca "Calendar API" → Añadir
// 4. Guardar (Ctrl+S) → click Ejecutar (▶) sobre "borrarEventosPlan"
// 5. Pide autorización: aceptar (es tu cuenta, tu calendario)
// 6. Vuelve a Ejecutar. Mira la pestaña "Registro de ejecuciones" - dice cuántos borró.
//
// Si querés probar primero sin borrar, ejecuta "contarEventosPlan" antes.

function borrarEventosPlan() {
  const calendarioId = 'primary';
  const desde = new Date('2026-05-01').toISOString();
  const hasta = new Date('2027-12-31').toISOString();
  let token = null;
  let borrados = 0;

  do {
    const r = Calendar.Events.list(calendarioId, {
      timeMin: desde,
      timeMax: hasta,
      pageToken: token,
      maxResults: 250,
      singleEvents: false
    });
    for (const e of (r.items || [])) {
      if (e.iCalUID && e.iCalUID.endsWith('@plan.claude')) {
        Calendar.Events.remove(calendarioId, e.id);
        borrados++;
      }
    }
    token = r.nextPageToken;
  } while (token);

  Logger.log('Eventos borrados: ' + borrados);
}

function contarEventosPlan() {
  const calendarioId = 'primary';
  const desde = new Date('2026-05-01').toISOString();
  const hasta = new Date('2027-12-31').toISOString();
  let token = null;
  const encontrados = [];

  do {
    const r = Calendar.Events.list(calendarioId, {
      timeMin: desde,
      timeMax: hasta,
      pageToken: token,
      maxResults: 250,
      singleEvents: false
    });
    for (const e of (r.items || [])) {
      if (e.iCalUID && e.iCalUID.endsWith('@plan.claude')) {
        encontrados.push(e.summary);
      }
    }
    token = r.nextPageToken;
  } while (token);

  Logger.log('Encontrados ' + encontrados.length + ' eventos:');
  encontrados.forEach(t => Logger.log('  - ' + t));
}
