import type { Category, ColorId, DesignId, Garment, Inventory, Order, OrderStatus, Product, Settings, Size } from '../lib/types';
import { round2 } from '../lib/format';

export const COLORS: Record<ColorId, { name: string; hex: string; dark: boolean }> = {
  blanco: { name: 'Blanco', hex: '#F6F3EC', dark: false },
  tinta: { name: 'Azul noche', hex: '#1F2A44', dark: true },
  celeste: { name: 'Celeste', hex: '#6CACE4', dark: false },
  sol: { name: 'Sol', hex: '#F2B33D', dark: false },
  cancha: { name: 'Verde cancha', hex: '#2F6B45', dark: true },
};

export const CATEGORIES: Record<Category, { name: string; blurb: string }> = {
  camisetas: { name: 'Camisetas', blurb: 'Algodón 100 %, corte clásico y estampado DTF hecho en España.' },
  premium: { name: 'Premium orgánicas', blurb: 'Algodón orgánico de mayor gramaje y tacto más suave.' },
  oversize: { name: 'Oversize', blurb: 'Algodón pesado, hombro caído y estampado grande en la espalda.' },
  sudaderas: { name: 'Sudaderas', blurb: 'Felpa con capucha y bolsillo canguro. Se fabrican en preventa.' },
};

export const DESIGNS: Record<DesignId, { name: string; blurb: string; takesText: boolean; textLabel?: string }> = {
  paseo: { name: 'Paseo de domingo', blurb: 'Ilustración de línea: tú, tu perro y un corazón en la correa.', takesText: false },
  ladoA: { name: 'Lado A', blurb: 'Como un disco: tú eres la cara A. Lleva tu nombre debajo.', takesText: true, textLabel: 'Nombre' },
  equipo: { name: 'Equipo 02', blurb: 'Estilo universitario: tú eres el 02, el de las dos patas.', takesText: true, textLabel: 'Nombre del equipo' },
  hincha: { name: 'Mi hincha nº 1', blurb: '«mi hincha nº 1» con el nombre de quien te acompaña a todos los partidos.', takesText: true, textLabel: 'Nombre' },
  logo: { name: 'El que no salta', blurb: 'El grito de la marca con la persona y el perro saltando.', takesText: false },
  texto: { name: 'Texto libre', blurb: 'Tu propia frase en tipografía Fraunces.', takesText: true, textLabel: 'Tu texto' },
};

export const GARMENT_NAMES: Record<Garment, string> = { tee: 'Camiseta', over: 'Camiseta oversize', hoodie: 'Sudadera con capucha' };

/** Medidas orientativas de prenda plana (cm). Se confirmarán con la ficha del proveedor. */
export const SIZE_GUIDE: Record<Garment, { size: Size; ancho: number; largo: number }[]> = {
  tee: [
    { size: 'XS', ancho: 46, largo: 67 }, { size: 'S', ancho: 49, largo: 70 }, { size: 'M', ancho: 52, largo: 72 },
    { size: 'L', ancho: 55, largo: 74 }, { size: 'XL', ancho: 58, largo: 76 }, { size: 'XXL', ancho: 61, largo: 78 }, { size: '3XL', ancho: 64, largo: 80 },
  ],
  over: [
    { size: 'XS', ancho: 55, largo: 68 }, { size: 'S', ancho: 58, largo: 70 }, { size: 'M', ancho: 61, largo: 72 },
    { size: 'L', ancho: 64, largo: 74 }, { size: 'XL', ancho: 67, largo: 76 }, { size: 'XXL', ancho: 70, largo: 78 },
  ],
  hoodie: [
    { size: 'XS', ancho: 50, largo: 64 }, { size: 'S', ancho: 53, largo: 67 }, { size: 'M', ancho: 56, largo: 70 },
    { size: 'L', ancho: 59, largo: 72 }, { size: 'XL', ancho: 62, largo: 74 }, { size: 'XXL', ancho: 65, largo: 76 },
  ],
};

const CARE_TEE = 'Lavar del revés a 30 °C. No usar secadora ni suavizante. No planchar sobre el estampado.';
const CARE_HOODIE = 'Lavar del revés a 30 °C con colores similares. Secar en horizontal. No planchar sobre el estampado.';
const BASIC: Size[] = ['S', 'M', 'L', 'XL', 'XXL', '3XL'];
const FULL: Size[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

/** Catálogo de la colección 01, línea Dos Patas (etapa 3). Costes unitarios sin IVA estimados en la etapa 3. */
export const SEED_PRODUCTS: Product[] = [
  {
    id: 'YT-P01', slug: 'camiseta-paseo-de-domingo', name: 'Camiseta «Paseo de domingo»', category: 'camisetas', garment: 'tee', design: 'paseo', placement: 'pecho',
    description: 'Nuestra ilustración de línea en el pecho: el paseo del domingo antes del partido. Corte clásico y algodón de toda la vida.',
    material: '100 % algodón, punto liso', weight: 145, fit: 'Corte clásico, talla habitual', care: CARE_TEE,
    price: 24.9, cost: 5.53, colors: ['blanco', 'celeste', 'sol'], sizes: BASIC, textIncluded: false, preorder: false, active: true, createdAt: '2026-11-01',
  },
  {
    id: 'YT-P05', slug: 'camiseta-mi-hincha', name: 'Camiseta «Mi hincha nº 1» personalizada', category: 'camisetas', garment: 'tee', design: 'hincha', placement: 'pecho',
    description: '«mi hincha nº 1» en Fraunces cursiva y debajo el nombre de tu perro (o de quien tú quieras). El nombre está incluido en el precio.',
    material: '100 % algodón, punto liso', weight: 145, fit: 'Corte clásico, talla habitual', care: CARE_TEE,
    price: 27.9, cost: 5.93, colors: ['sol', 'blanco', 'celeste'], sizes: BASIC, textIncluded: true, defaultText: 'Tofu', preorder: false, active: true, createdAt: '2026-11-01',
  },
  {
    id: 'YT-P06', slug: 'camiseta-el-que-no-salta', name: 'Camiseta «El que no salta»', category: 'camisetas', garment: 'tee', design: 'logo', placement: 'pecho',
    description: 'El grito de la marca en el pecho: la persona y el perro saltando. La básica para ver los partidos.',
    material: '100 % algodón, punto liso', weight: 145, fit: 'Corte clásico, talla habitual', care: CARE_TEE,
    price: 22.9, cost: 4.93, colors: ['blanco', 'tinta', 'cancha'], sizes: BASIC, textIncluded: false, preorder: false, active: true, createdAt: '2026-11-01',
  },
  {
    id: 'YT-P02', slug: 'camiseta-premium-lado-a', name: 'Camiseta premium «Lado A»', category: 'premium', garment: 'tee', design: 'ladoA', placement: 'pecho',
    description: 'Algodón orgánico de mayor gramaje con el diseño «Lado A» y tu nombre debajo. Su pareja es la «Lado B».',
    material: '100 % algodón orgánico, punto liso', weight: 180, fit: 'Corte recto unisex', care: CARE_TEE,
    price: 32.9, cost: 9.27, colors: ['tinta', 'blanco'], sizes: FULL, textIncluded: true, defaultText: 'Lucía', preorder: false, active: true, createdAt: '2026-11-01',
  },
  {
    id: 'YT-P07', slug: 'camiseta-premium-texto-libre', name: 'Camiseta premium con tu frase', category: 'premium', garment: 'tee', design: 'texto', placement: 'pecho',
    description: 'Escribe tu frase (hasta 14 caracteres) y la estampamos en tipografía Fraunces sobre algodón orgánico.',
    material: '100 % algodón orgánico, punto liso', weight: 180, fit: 'Corte recto unisex', care: CARE_TEE,
    price: 32.9, cost: 9.37, colors: ['blanco', 'tinta', 'celeste'], sizes: FULL, textIncluded: true, defaultText: 'Dos patas', preorder: false, active: true, createdAt: '2026-11-01',
  },
  {
    id: 'YT-P03', slug: 'oversize-paseo-de-domingo', name: 'Oversize «Paseo de domingo»', category: 'oversize', garment: 'over', design: 'paseo', placement: 'espalda',
    description: 'Algodón pesado, hombro caído y la ilustración en grande en la espalda. En el pecho, el isotipo pequeño.',
    material: '100 % algodón, punto pesado', weight: 220, fit: 'Oversize: si prefieres un fit menos amplio, elige una talla menos', care: CARE_TEE,
    price: 34.9, cost: 12.22, colors: ['celeste', 'blanco', 'tinta'], sizes: FULL, textIncluded: false, preorder: false, active: true, createdAt: '2026-11-01',
  },
  {
    id: 'YT-P08', slug: 'oversize-equipo-02', name: 'Oversize «Equipo 02»', category: 'oversize', garment: 'over', design: 'equipo', placement: 'espalda',
    description: 'Dorsal estilo universitario en la espalda con el nombre de tu equipo. Tú eres el 02.',
    material: '100 % algodón, punto pesado', weight: 220, fit: 'Oversize: si prefieres un fit menos amplio, elige una talla menos', care: CARE_TEE,
    price: 36.9, cost: 12.32, colors: ['tinta', 'blanco'], sizes: FULL, textIncluded: true, defaultText: 'Equipo Tofu', preorder: false, active: true, createdAt: '2026-11-01',
  },
  {
    id: 'YT-P04', slug: 'sudadera-equipo-02', name: 'Sudadera «Equipo 02»', category: 'sudaderas', garment: 'hoodie', design: 'equipo', placement: 'pecho',
    description: 'Sudadera con capucha y el dorsal 02 en el pecho. Nombre del equipo personalizable. Se fabrica en preventa: envío en unas 3 semanas.',
    material: 'Felpa algodón/poliéster', weight: 280, fit: 'Corte regular con capucha y bolsillo canguro', care: CARE_HOODIE,
    price: 49.9, cost: 14.15, colors: ['tinta', 'celeste'], sizes: FULL, textIncluded: true, defaultText: 'Equipo Tofu', preorder: true, active: true, createdAt: '2026-11-01',
  },
  {
    id: 'YT-P09', slug: 'sudadera-paseo-de-domingo', name: 'Sudadera «Paseo de domingo»', category: 'sudaderas', garment: 'hoodie', design: 'paseo', placement: 'pecho',
    description: 'La ilustración del paseo en una sudadera para los días de frío. Se fabrica en preventa: envío en unas 3 semanas.',
    material: 'Felpa algodón/poliéster', weight: 280, fit: 'Corte regular con capucha y bolsillo canguro', care: CARE_HOODIE,
    price: 49.9, cost: 14.15, colors: ['blanco', 'tinta', 'sol'], sizes: FULL, textIncluded: false, preorder: true, active: true, createdAt: '2026-11-01',
  },
];

/** Productos base que se pueden usar en el personalizador. */
export const CUSTOMIZER_BASES = ['YT-P01', 'YT-P02', 'YT-P03', 'YT-P04'];

export const DEFAULT_SETTINGS: Settings = {
  shippingPrice: 4.9,
  freeShippingFrom: 50,
  shippingCost: 4.0,
  paymentFeePct: 0.03,
  packagingCost: 0.6,
};

// Generador pseudoaleatorio determinista para que los datos de demo sean siempre los mismos.
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

export function seedInventory(products: Product[]): Inventory {
  const r = rng(42);
  const inv: Inventory = {};
  for (const p of products) {
    inv[p.id] = {};
    for (const c of p.colors) {
      inv[p.id][c] = {};
      for (const s of p.sizes) {
        // Tallas centrales con más stock; algunas agotadas para mostrar el estado.
        const central = ['M', 'L'].includes(s) ? 6 : 2;
        const n = Math.floor(r() * 6) + central - (r() < 0.12 ? 99 : 0);
        inv[p.id][c]![s] = Math.max(0, n);
      }
    }
  }
  return inv;
}

const NAMES = ['Lucía M.', 'Javier R.', 'Marta G.', 'Pablo S.', 'Irene L.', 'Sergio P.', 'Nerea C.', 'Álvaro D.', 'Paula T.', 'Hugo F.', 'Carmen V.', 'Diego N.'];
const CITIES = ['Madrid', 'Valencia', 'Sevilla', 'Bilbao', 'Zaragoza', 'Málaga', 'Barcelona', 'Granada'];
const PETS = ['Tofu', 'Lola', 'Coco', 'Rocky', 'Nala', 'Bruno', 'Kira', 'Toby'];

export function seedOrders(products: Product[], now = new Date()): Order[] {
  const r = rng(7);
  const orders: Order[] = [];
  const statuses: OrderStatus[] = ['entregado', 'entregado', 'entregado', 'enviado', 'en producción', 'pendiente'];
  for (let i = 0; i < 26; i++) {
    const daysAgo = Math.floor(r() * 30);
    const created = new Date(now.getTime() - daysAgo * 86400000 - Math.floor(r() * 36000000));
    const nItems = r() < 0.65 ? 1 : 2;
    const items = Array.from({ length: nItems }, () => {
      const p = products[Math.floor(r() * products.length)];
      const color = p.colors[Math.floor(r() * p.colors.length)];
      const size = p.sizes[1 + Math.floor(r() * 3)];
      const text = p.textIncluded ? PETS[Math.floor(r() * PETS.length)] : '';
      return {
        productId: p.id, name: p.name, color, size, qty: r() < 0.85 ? 1 : 2, unitPrice: p.price, unitCost: p.cost,
        custom: text ? { design: p.design, text, placement: p.placement } : undefined,
      };
    });
    const subtotal = round2(items.reduce((a, it) => a + it.unitPrice * it.qty, 0));
    const useCode = r() < 0.25;
    const discount = useCode ? round2(subtotal * 0.1) : 0;
    const shipping = subtotal - discount >= DEFAULT_SETTINGS.freeShippingFrom ? 0 : DEFAULT_SETTINGS.shippingPrice;
    const name = NAMES[Math.floor(r() * NAMES.length)];
    orders.push({
      id: `YT-${String(1001 + i)}`,
      createdAt: created.toISOString(),
      customer: { name, email: `${name.split(' ')[0].toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')}@ejemplo.com`, address: 'Calle de ejemplo, 1', city: CITIES[Math.floor(r() * CITIES.length)], zip: '28001' },
      items, subtotal, discount, discountCode: useCode ? 'BIENVENIDA10' : undefined, shipping, total: round2(subtotal - discount + shipping),
      status: daysAgo < 2 ? 'pendiente' : daysAgo < 5 ? statuses[3 + Math.floor(r() * 3)] : statuses[Math.floor(r() * 3)],
    });
  }
  return orders.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
