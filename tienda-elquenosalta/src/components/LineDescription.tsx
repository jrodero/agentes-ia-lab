import { COLORS, DESIGNS } from '../data/catalog';
import type { ColorId, Customization, DesignId, Size } from '../lib/types';

/** Descripción breve de una línea de pedido o de la cesta (color, talla y personalización). */
export function LineDescription({ color, size, custom, productDesign }: { color: ColorId; size: Size; custom?: Customization; productDesign: DesignId }) {
  return (
    <ul className="line-desc">
      <li>Color: {COLORS[color].name}</li>
      <li>Talla: {size}</li>
      {custom && custom.design !== productDesign && <li>Diseño: {DESIGNS[custom.design].name} ({custom.placement})</li>}
      {custom?.text && <li>Texto: «{custom.text}»</li>}
    </ul>
  );
}
