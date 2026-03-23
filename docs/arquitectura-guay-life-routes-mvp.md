# Arquitectura técnica

## Guay Life Routes MVP

Fecha: 21 de marzo de 2026  
Estado: propuesta inicial  
Objetivo: definir una arquitectura simple, escalable y coherente con el MVP descrito en el PRD

Documento relacionado:

- [`PRD Guay Life Routes MVP`](/Users/juanrodero/agentes-ia-lab/docs/prd-guay-life-routes-mvp.md)

---

## 1. Principios

La arquitectura del MVP debe cumplir estas reglas:

- empezar simple
- ser web-first
- funcionar bien en móvil
- permitir iterar rápido
- no depender de demasiada infraestructura
- poder crecer sin rehacer todo

Conclusión práctica:

### El MVP debe lanzarse primero como web app responsive

No como app nativa.

Más adelante puede evolucionar a:

- PWA
- app móvil con React Native o similar

---

## 2. Decisión de arquitectura

### Opción recomendada

Separar el producto en:

- frontend web app
- backend API
- base de datos relacional
- almacenamiento de contenido y assets

### Stack recomendado

#### Frontend

- `Next.js`
- `React`
- `TypeScript`
- CSS modular o sistema simple de estilos

#### Backend

- `Node.js`
- `Express` para APIs o migración gradual hacia `Next.js Route Handlers`

#### Base de datos

- `PostgreSQL`

#### ORM o acceso a datos

- `Prisma`

#### Autenticación

- magic link por email
- login social opcional más adelante

#### Almacenamiento

- `Supabase Storage` o `S3` para imágenes y assets

#### Analytics

- `PostHog` o analytics simple

#### CMS o administración de contenido

- panel interno simple o tablas administradas manualmente en fase 1

---

## 3. Por qué no usar solo el stack actual del repo

El stack actual del repo sirve para:

- landing
- chat
- APIs pequeñas

Pero para el nuevo producto harían falta:

- autenticación
- estados persistentes
- perfiles de usuario
- diario personal
- guardado de rutas
- contenido estructurado

Eso vuelve muy limitada una solución basada solo en HTML plano dentro de `public/`.

### Recomendación realista

Mantener el repo actual como base conceptual y reutilizar Node/OpenAI si hace falta, pero construir la app nueva con una base más cómoda para producto:

- `Next.js + PostgreSQL`

---

## 4. Enfoque de implementación

### Fase técnica 1

Web app monolítica moderna:

- frontend y backend en el mismo proyecto
- base de datos única
- despliegue simple

Esto reduce complejidad operativa.

### Fase técnica 2

Separar servicios si el producto crece:

- servicio de contenido
- servicio de usuarios
- servicio de diario
- servicio de recomendaciones

Para el MVP no hace falta microservicios.

---

## 5. Módulos funcionales

### 5.1 Auth

Responsabilidad:

- registro
- login
- sesión
- recuperación

Requisito MVP:

- email + magic link

### 5.2 Rutas y destinos

Responsabilidad:

- listar rutas
- mostrar fichas
- filtrar por país, objetivo o dificultad

### 5.3 Plan personal

Responsabilidad:

- guardar rutas favoritas
- crear un plan por usuario
- mostrar progreso básico

### 5.4 Checklists

Responsabilidad:

- checklist por etapa
- items marcables
- progreso persistente

### 5.5 Diario

Responsabilidad:

- crear, editar y eliminar entradas
- asociar entradas a país, ciudad o ruta
- manejar privacidad

### 5.6 Experiencias reales

Responsabilidad:

- mostrar experiencias estructuradas
- permitir carga manual o moderada
- filtrar por país, ciudad y tipo de viaje

### 5.7 Contenido práctico

Responsabilidad:

- guías
- pasos
- recursos
- advertencias

---

## 6. Modelo de datos inicial

### Tabla `users`

- id
- email
- name
- home_country
- current_country
- created_at

### Tabla `destinations`

- id
- country_code
- city_name
- slug
- title
- summary
- active

### Tabla `routes`

- id
- destination_id
- slug
- title
- route_type
- difficulty
- estimated_budget_min
- estimated_budget_max
- prep_time_weeks
- summary
- who_its_for
- warnings
- active

### Tabla `guide_sections`

- id
- route_id
- section_type
- title
- body
- sort_order

`section_type` puede ser:

- overview
- reality
- checklist_departure
- checklist_arrival
- checklist_90_days
- practical_guide

### Tabla `checklist_items`

- id
- route_id
- phase
- title
- description
- sort_order

### Tabla `user_route_plans`

- id
- user_id
- route_id
- status
- started_at

`status` puede ser:

- saved
- planning
- arrived
- completed

### Tabla `user_checklist_progress`

- id
- user_id
- checklist_item_id
- completed_at

### Tabla `diary_entries`

- id
- user_id
- route_id nullable
- destination_id nullable
- title
- body
- entry_date
- visibility
- mood nullable
- created_at
- updated_at

`visibility` por defecto:

- private

### Tabla `experience_reports`

- id
- author_name_or_alias
- origin_country
- destination_id
- route_type
- budget_range
- difficulty_score
- housing_score
- work_score
- community_score
- quality_of_life_score
- summary
- surprises
- recommendations
- approved
- created_at

---

## 7. API inicial

### Auth

- `POST /api/auth/request-magic-link`
- `POST /api/auth/verify`
- `POST /api/auth/logout`

### Rutas

- `GET /api/routes`
- `GET /api/routes/:slug`

### Destinos

- `GET /api/destinations`
- `GET /api/destinations/:slug`

### Plan personal

- `POST /api/me/routes/:routeId/save`
- `POST /api/me/routes/:routeId/start`
- `GET /api/me/plans`

### Checklists

- `GET /api/routes/:routeId/checklist`
- `POST /api/me/checklist/:itemId/toggle`

### Diario

- `GET /api/me/diary`
- `POST /api/me/diary`
- `PATCH /api/me/diary/:id`
- `DELETE /api/me/diary/:id`

### Experiencias

- `GET /api/experiences`
- `POST /api/experiences`

Para el MVP, la publicación puede quedar moderada manualmente.

---

## 8. Estructura de frontend sugerida

### Rutas principales

- `/`
- `/routes`
- `/routes/[slug]`
- `/destinations/[slug]`
- `/my-plan`
- `/diary`
- `/login`
- `/onboarding`

### Componentes clave

- cards de rutas
- badge de dificultad
- progress tracker
- checklist
- editor simple de diario
- ficha de experiencia
- filtros

---

## 9. Onboarding recomendado

El onboarding debe ser corto.

Campos mínimos:

- país de origen
- presupuesto aproximado
- nivel de inglés
- tipo de objetivo
- países de interés

Uso:

- personalizar sugerencias
- ordenar contenido
- mejorar activación

---

## 10. Administración de contenido

Para el MVP, no hace falta un CMS complejo.

Opciones simples:

- seed de contenido en base de datos
- panel admin mínimo protegido
- gestión manual por tablas

Recomendación:

Empezar con una carga inicial curada por ti.

Así controlas:

- tono
- calidad
- foco
- consistencia

---

## 11. Búsqueda y recomendación

### MVP

La recomendación puede ser simple y basada en reglas:

- presupuesto
- tipo de viaje
- idioma
- país de interés

No hace falta IA desde el día uno.

### Más adelante

Se puede añadir:

- sugeridor de rutas
- resumen inteligente de experiencias
- búsqueda semántica

Pero no es requisito inicial.

---

## 12. Seguridad y privacidad

Puntos importantes:

- el diario debe ser privado por defecto
- datos personales mínimos
- consentimiento claro si una experiencia se vuelve pública
- protección básica contra spam

Medidas MVP:

- sesiones seguras
- rate limiting
- validación de input
- sanitización de texto
- logs de errores

---

## 13. Infraestructura y despliegue

### Opción simple recomendada

- app en `Vercel` o similar
- base de datos `Postgres` gestionada
- storage gestionado

### Alternativa

Si quieres mantener todo más cercano al stack actual:

- `Railway` o `Render`
- `Postgres`
- Node app única

La decisión depende de si el frontend se construye en Next.js o se mantiene separado.

---

## 14. Estrategia de evolución

### MVP

- contenido curado
- sin comunidad abierta
- sin geolocalización compleja
- sin mensajería

### V1.5

- PWA
- offline parcial para guías
- más países y ciudades
- más personalización

### V2

- mapas por ciudad
- capas de comunidad y aterrizaje
- perfiles públicos opcionales
- experiencias verificadas
- funciones sociales controladas

---

## 15. Arquitectura visual simplificada

```text
Cliente web / móvil responsive
        |
        v
Frontend Next.js
        |
        v
App server / API layer
        |
  -------------------------
  |           |           |
  v           v           v
Postgres   Storage    Analytics
  |
  v
Contenido, usuarios, planes,
checklists, diario, experiencias
```

---

## 16. Decisiones que recomiendo tomar ya

1. Confirmar que el MVP será web-first.
2. Confirmar que el diario entra desde la primera versión.
3. Confirmar que no habrá comunidad abierta al principio.
4. Confirmar que el foco inicial será Australia, Nueva Zelanda y España.
5. Confirmar si construimos sobre `Next.js + Postgres` o si prefieres una primera versión aún más liviana.

---

## 17. Próximo entregable recomendado

Después de esta arquitectura, lo más útil sería crear:

- sitemap
- user flows
- wireframes
- backlog priorizado

