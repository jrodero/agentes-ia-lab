# agentes-ia-lab

Guay Life combina una landing de asesoría migratoria con un asistente conversacional y una beta web de comunidad/rutas para migrantes y backpackers.

## Arranque rápido

```bash
npm install
npm start
```

El servidor queda disponible en `http://localhost:4000` por defecto.

## Rutas principales

- `/` landing principal con asistente y reserva
- `/rutas/` beta web con login local, comunidad, rutas, checklist y bitácora

## Pruebas

```bash
npm test
```

La prueba levanta el servidor con archivos temporales aislados y valida salud, autenticación, comunidad, favoritos, checklist, bitácora y recuperación de contraseña.
