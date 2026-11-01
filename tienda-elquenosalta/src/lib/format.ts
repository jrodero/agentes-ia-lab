const eur = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' });

export const money = (n: number) => eur.format(n);
export const round2 = (n: number) => Math.round(n * 100) / 100;
export const pct = (n: number) => `${(n * 100).toFixed(0)} %`;
export const date = (iso: string) =>
  new Date(iso).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });

/** Escapa texto del usuario antes de insertarlo en un SVG generado como cadena. */
export function escapeXml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);
}

export const IVA = 0.21;
export const sinIva = (n: number) => n / (1 + IVA);
