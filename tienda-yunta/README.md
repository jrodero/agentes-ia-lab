# Tienda yunta — demo funcional (línea Personas)

Demo navegable de la tienda online de **yunta** (etapa 4 del proyecto, ver `../docs/marca-ropa-perros/`).
Por decisión del proyecto, esta versión incluye **solo la ropa para personas**. La línea para perros y las colecciones coordinadas se añadirán más adelante.

Hecha con **React 19 + TypeScript + Vite** y CSS propio, sin librerías de UI. **No hay pagos reales**: el checkout crea un pedido de demostración.

Capturas de la demo verificada en `capturas/`.

## Requisitos

- Node.js 20 o superior (probado con Node 22) y npm.

## Puesta en marcha

```bash
cd tienda-yunta
npm install
npm run dev
```

Abre <http://localhost:5173>.

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo con recarga automática |
| `npm run build` | Comprueba los tipos y genera la versión de producción en `dist/` |
| `npm run preview` | Sirve la versión de producción (`dist/`) en local |
| `npm test` | Pruebas unitarias (precios, descuentos, envío, estadísticas y seguridad del SVG) |
| `npm run typecheck` | Solo la comprobación de tipos |

**Panel de administración:** <http://localhost:5173/admin> · código de acceso de la demo: **`yunta2026`**.
Es una barrera de demostración en el navegador, no una autenticación real.

## Qué incluye

| Área | Funcionalidad |
|---|---|
| **Portada** | Logotipo e identidad, banner, presentación de marca, colecciones destacadas (enlazan al catálogo filtrado), productos más vendidos (calculados con los pedidos), categorías, bloque del personalizador, aviso de la línea Cuatro Patas, newsletter funcional y pie |
| **Catálogo Personas** | Camisetas, premium orgánicas, oversize y sudaderas; filtros por talla, color, diseño, precio y stock; orden por destacados, más vendidos o precio. Los filtros se guardan en la URL, así que se pueden compartir |
| **Ficha de producto** | Galería (delantera, trasera y detalle del estampado), color, talla con stock real (tallas agotadas desactivadas, aviso de «últimas unidades»), texto personalizable, cantidad, guía de tallas, material, cuidados, envío y productos relacionados |
| **Personalizador** | Prenda base, color, talla, 6 diseños, texto (máx. 14 caracteres), estampado en pecho o espalda, vista previa en vivo (delante, detrás y detalle), cálculo del precio y añadir a la cesta |
| **Cesta** | Líneas con imagen, cantidades con control de stock, eliminar, subtotal, códigos de descuento, envío (gratis desde 50 €) y total |
| **Checkout** | Formulario validado y pago simulado. Crea el pedido, descuenta el stock y muestra la confirmación |
| **Panel** | Resumen (KPI, ventas diarias de 30 días, ventas por categoría, pedidos por estado, más vendidos, stock bajo, suscriptores y mensajes); Productos (crear, editar, ocultar o publicar); Inventario (stock por color y talla editable); Pedidos (filtro por estado, cambio de estado, detalle con la economía del pedido); Costes y márgenes (margen por producto, costes por pedido editables y punto de equilibrio) |
| **Páginas de ayuda** | Envíos y devoluciones, guía de tallas, cuidados, contacto (formulario que llega al panel), sobre nosotros y privacidad |

**Códigos de descuento de la demo:** `BIENVENIDA10` (10 %, también se entrega al suscribirse a la newsletter) y `DOSPATAS5` (5 € a partir de 40 €).

## Datos y persistencia

- Todo se guarda en el `localStorage` del navegador (clave `yunta-demo-v1`): productos, inventario, pedidos, cesta, ajustes, suscriptores y mensajes.
- Al abrir la demo por primera vez se cargan el catálogo de la colección 01 (9 referencias), un inventario de ejemplo y unos 26 pedidos de los últimos 30 días para que el panel tenga datos.
- **Panel → «Restablecer datos de demo»** vuelve al estado inicial.
- Precios con IVA. Los costes unitarios son los estimados en la etapa 3 (sin IVA): hay que actualizarlos en el panel cuando lleguen los presupuestos reales.

## Imágenes de producto

Las «fotografías» son ilustraciones SVG generadas en `src/components/garmentSvg.ts` con la identidad de la etapa 2: cambian en tiempo real con el color, el diseño y el texto. Cuando haya fotos reales de las muestras, se pueden añadir como imágenes en la galería de la ficha.

## Estructura

```
src/
  App.tsx                 rutas
  main.tsx                arranque
  lib/                    tipos, precios y descuentos, estadísticas, formato y datos de marca (brand.ts)
  data/catalog.ts         catálogo, colores, diseños, guía de tallas y datos de demo
  store/StoreContext.tsx  estado global + persistencia en localStorage
  components/             cabecera y pie, tarjetas, guía de tallas, imágenes SVG de prenda
  pages/                  portada, catálogo, ficha, personalizador, cesta, checkout, confirmación, info, 404
  pages/admin/Admin.tsx   panel de administración
  __tests__/              pruebas unitarias (Vitest)
public/brand, public/fonts  logotipos y tipografías (licencia OFL, ver docs/marca-ropa-perros/marca/fuentes)
```

## Cambiar el nombre de la marca

El nombre, el lema, el hashtag y las rutas del logotipo están en `src/lib/brand.ts`. Los logotipos están en `public/brand/`. Algunos textos de la portada mencionan «yunta» por su significado: habría que revisarlos.

## Limitaciones conocidas (es una demo)

- Sin backend: los datos solo existen en el navegador de cada persona.
- El panel no tiene autenticación real.
- No se envían emails ni se procesan pagos.
- Las condiciones de envío y devolución son de ejemplo: hay que revisarlas legalmente antes de vender.
