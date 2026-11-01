// Genera las "fotografías" ilustradas de producto como SVG (mismo estilo que los mockups de la etapa 2 y 3).
// Todo texto del usuario pasa por escapeXml antes de entrar en el SVG.
import { COLORS } from '../data/catalog';
import { escapeXml } from '../lib/format';
import type { ColorId, DesignId, Garment, Placement, View } from '../lib/types';

const T = { tinta: '#1F2A44', hueso: '#F4EDE1', teja: '#C85A35', salvia: '#8FA67E', mostaza: '#E0A93B' };

const darken = (hex: string, k = 0.82) =>
  '#' + hex.slice(1).match(/../g)!.map((h) => Math.round(parseInt(h, 16) * k).toString(16).padStart(2, '0')).join('');

export const isoPaths = (fg: string, ac: string) => `
  <path d="M30 40 C 33 56, 44 62, 50 66 C 56 62, 67 56, 70 40" fill="none" stroke="${fg}" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M50 66 L50 88" fill="none" stroke="${fg}" stroke-width="11" stroke-linecap="round"/>
  <circle cx="27" cy="22" r="10.5" fill="${fg}"/><circle cx="73" cy="22" r="10.5" fill="${ac}"/>
  <path d="M79.5 12.5 C 90 11.5, 94 25, 90.5 38 C 89 42.5, 83.5 42, 83.2 37.5 L 83.5 25 Z" fill="${ac}"/>`;

const SHAPES: Record<Garment, { body: string; neckFront: (c: string) => string; neckBack: (c: string) => string; extras: (c: string, view: View) => string; chest: [number, number]; back: [number, number] }> = {
  tee: {
    body: 'M200 80 Q300 112 400 80 L520 135 L478 250 L428 228 L432 540 Q300 556 168 540 L172 228 L122 250 L80 135 Z',
    neckFront: (c) => `<path d="M228 86 Q300 128 372 86" fill="none" stroke="${darken(c, 0.7)}" stroke-width="7" stroke-linecap="round"/>`,
    neckBack: (c) => `<path d="M236 84 Q300 100 364 84" fill="none" stroke="${darken(c, 0.7)}" stroke-width="7" stroke-linecap="round"/>`,
    extras: (c) => stitch('M175 522 Q300 538 425 522', c) + stitch('M93 142 L133 240', c) + stitch('M507 142 L467 240', c),
    chest: [300, 250], back: [300, 270],
  },
  over: {
    body: 'M185 70 Q300 104 415 70 L555 150 L520 300 L452 280 L452 552 Q300 566 148 552 L148 280 L80 300 L45 150 Z',
    neckFront: (c) => `<path d="M220 76 Q300 120 380 76" fill="none" stroke="${darken(c, 0.7)}" stroke-width="8" stroke-linecap="round"/>`,
    neckBack: (c) => `<path d="M226 74 Q300 92 374 74" fill="none" stroke="${darken(c, 0.7)}" stroke-width="8" stroke-linecap="round"/>`,
    extras: (c) => stitch('M151 535 Q300 549 449 535', c) + stitch('M60 158 L93 290', c) + stitch('M540 158 L507 290', c),
    chest: [300, 240], back: [300, 300],
  },
  hoodie: {
    body: 'M205 98 L240 70 Q300 50 360 70 L395 98 L505 148 Q540 300 540 470 L548 520 L488 526 L470 300 L452 270 L452 548 Q300 562 148 548 L148 270 L130 300 L112 526 L52 520 L60 470 Q60 300 95 148 Z',
    neckFront: (c) => `<path d="M228 98 Q300 175 372 98 Q352 60 300 56 Q248 60 228 98 Z" fill="${darken(c, 0.78)}"/><path d="M285 140 L280 210 M315 140 L320 210" stroke="${T.hueso}" stroke-width="4" stroke-linecap="round" opacity=".85"/>`,
    neckBack: (c) => `<path d="M215 100 Q300 30 385 100 Q380 190 300 205 Q220 190 215 100 Z" fill="${darken(c, 0.9)}" stroke="${darken(c, 0.75)}" stroke-width="2"/>`,
    extras: (c, view) => (view === 'front' ? `<path d="M215 420 L385 420 L405 510 L195 510 Z" fill="none" stroke="${darken(c, 0.75)}" stroke-width="3"/>` : '') + `<path d="M148 520 L452 520 L452 548 Q300 562 148 548 Z" fill="${darken(c, 0.92)}"/>`,
    chest: [300, 265], back: [300, 320],
  },
};

const stitch = (d: string, c: string) => `<path d="${d}" fill="none" stroke="${darken(c, 0.72)}" stroke-width="1.4" stroke-dasharray="5 4" opacity=".8"/>`;

function designArt(design: DesignId, fg: string, ac: string, rawText: string): { svg: string; w: number; h: number } {
  const text = escapeXml(rawText);
  switch (design) {
    case 'paseo':
      return { w: 380, h: 280, svg: `<g fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="40" cy="40" r="20" fill="${fg}"/><path d="M40 72 L40 146" stroke="${fg}" stroke-width="18"/><path d="M40 146 L24 210 M40 146 L58 210 M42 92 L75 120" stroke="${fg}" stroke-width="11"/><path d="M75 120 C 120 60, 150 200, 185 135 C 200 105, 225 120, 230 150" stroke="${ac}" stroke-width="5"/><path d="M118 108 C 106 86, 82 96, 96 114 L118 136 L140 114 C 154 96, 130 86, 118 108 Z" fill="${ac}" stroke="none"/><circle cx="252" cy="148" r="18" fill="${fg}"/><path d="M262 134 C 276 134, 279 152, 273 164 C 270 170, 263 168, 264 160 Z" fill="${ac}" stroke="none"/><path d="M234 166 Q240 190 290 188 L330 186 Q348 184 352 168 M300 188 L296 214 M335 186 L340 214 M246 184 L244 214 M268 188 L270 214 M352 168 Q366 150 360 136" stroke="${fg}" stroke-width="10"/><text x="190" y="270" font-family="Fraunces" font-size="34" font-style="italic" fill="${fg}" stroke="none" text-anchor="middle">paseo de domingo</text></g>` };
    case 'ladoA':
      return { w: 200, h: 150, svg: `<g font-family="Space Mono" fill="${fg}"><rect x="0" y="0" width="200" height="120" rx="14" fill="none" stroke="${fg}" stroke-width="4"/><text x="18" y="38" font-size="15" font-weight="700" letter-spacing="2">LADO</text><text x="18" y="98" font-size="62" font-weight="700" font-family="Fraunces">A</text><circle cx="120" cy="72" r="20" fill="none" stroke="${fg}" stroke-width="4"/><circle cx="168" cy="72" r="20" fill="none" stroke="${ac}" stroke-width="4"/><path d="M120 92 L168 92" stroke="${fg}" stroke-width="4"/><text x="100" y="142" font-size="14" text-anchor="middle" letter-spacing="3">${text.toUpperCase()}</text></g>` };
    case 'equipo':
      return { w: 240, h: 260, svg: `<g fill="${fg}" text-anchor="middle"><path id="arcEq" d="M10 110 Q120 30 230 110" fill="none"/><text font-family="Fraunces" font-weight="700" font-size="${text.length > 12 ? 24 : 30}" letter-spacing="3"><textPath href="#arcEq" startOffset="50%">${text.toUpperCase()}</textPath></text><text x="126" y="221" font-family="Fraunces" font-weight="700" font-size="120" fill="none" stroke="${fg}" stroke-width="4">02</text><text x="120" y="215" font-family="Fraunces" font-weight="700" font-size="120" fill="${ac}">02</text><text x="120" y="250" font-family="Space Mono" font-size="13" letter-spacing="3">DOS PATAS</text></g>` };
    case 'miYunta':
      return { w: 260, h: 140, svg: `<g text-anchor="middle"><text x="130" y="70" font-family="Fraunces" font-weight="400" font-size="54" fill="${fg}" font-style="italic">mi yunta</text><text x="130" y="122" font-family="Space Mono" font-size="20" letter-spacing="5" fill="${ac}">♥ ${text.toUpperCase()} ♥</text></g>` };
    case 'logo':
      return { w: 120, h: 150, svg: `<g transform="translate(10 0)">${isoPaths(fg, ac)}</g><text x="60" y="140" text-anchor="middle" font-family="Fraunces" font-weight="600" font-size="34" fill="${fg}">yunta</text>` };
    case 'texto': {
      const size = text.length > 10 ? 40 : 54;
      return { w: 300, h: 110, svg: `<g text-anchor="middle"><text x="150" y="62" font-family="Fraunces" font-weight="600" font-size="${size}" fill="${fg}">${text || 'Tu texto'}</text><g transform="translate(138 76) scale(.24)">${isoPaths(fg, ac)}</g></g>` };
    }
  }
}

export interface GarmentSvgProps {
  garment: Garment;
  color: ColorId;
  design: DesignId;
  text: string;
  placement: Placement;
  view: View;
}

/** Ancho máximo del estampado en unidades del lienzo (600 = ancho de la imagen). */
const MAX_PRINT: Record<Garment, number> = { tee: 210, over: 250, hoodie: 200 };

export function garmentSvg({ garment, color, design, text, placement, view }: GarmentSvgProps): string {
  const S = SHAPES[garment];
  const base = COLORS[color].hex;
  const dark = COLORS[color].dark;
  const fg = dark ? T.hueso : T.tinta;
  const ac = dark ? T.mostaza : color === 'mostaza' || color === 'teja' ? T.tinta : T.teja;
  const art = designArt(design, fg, ac, text);

  const showMain = (view === 'back') === (placement === 'espalda') || view === 'detail';
  const scale = Math.min(MAX_PRINT[garment] / art.w, 1.15);
  const [cx, cy] = placement === 'espalda' ? S.back : S.chest;
  const main = `<g transform="translate(${cx - (art.w * scale) / 2} ${cy - (art.h * scale) / 2}) scale(${scale})">${art.svg}</g>`;
  // Si el diseño va en la espalda, en el pecho se pone el isotipo pequeño.
  const smallChest = placement === 'espalda' && view === 'front' ? `<g transform="translate(330 150) scale(.42)">${isoPaths(fg, ac)}</g>` : '';
  const neck = view === 'back' ? S.neckBack(base) : S.neckFront(base);

  const garmentLayer = `<path d="${S.body}" fill="${base}" stroke="${darken(base)}" stroke-width="2"/><path d="${S.body}" fill="url(#shade)"/><path d="${S.body}" fill="#000" filter="url(#grain)" opacity=".14"/>${neck}${S.extras(base, view)}${showMain ? main : ''}${smallChest}`;

  // Vista detalle: recorte ampliado de la zona de estampado.
  const vb = view === 'detail' ? `${cx - 150} ${cy - 150} 300 300` : '0 0 600 600';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" role="img"><defs>
<linearGradient id="shade" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".18"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".14"/></linearGradient>
<filter id="grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="4" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.1 0.75" result="a"/><feComposite in="a" in2="SourceAlpha" operator="in"/></filter>
<filter id="soft" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#1F2A44" flood-opacity=".18"/></filter>
</defs>${view === 'detail' ? '' : '<ellipse cx="300" cy="566" rx="200" ry="14" fill="#000" opacity=".07"/>'}<g filter="url(#soft)">${garmentLayer}</g></svg>`;
}
