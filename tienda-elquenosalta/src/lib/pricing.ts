import { round2 } from './format';
import type { CartItem, Customization, Product, Settings } from './types';

export const TEXT_FEE = 3; // € por añadir texto en productos que no lo incluyen
export const MAX_TEXT = 14;

export interface DiscountCode {
  code: string;
  label: string;
  kind: 'percent' | 'fixed';
  value: number;
  minSubtotal: number;
}

export const DISCOUNTS: DiscountCode[] = [
  { code: 'BIENVENIDA10', label: '10 % de bienvenida (newsletter)', kind: 'percent', value: 10, minSubtotal: 0 },
  { code: 'DOSPATAS5', label: '5 € de descuento a partir de 40 €', kind: 'fixed', value: 5, minSubtotal: 40 },
];

export function findDiscount(code: string): DiscountCode | undefined {
  return DISCOUNTS.find((d) => d.code === code.trim().toUpperCase());
}

/** Precio unitario con IVA de un producto con (o sin) personalización. */
export function unitPrice(product: Product, custom?: Customization): number {
  const hasText = !!custom && custom.text.trim().length > 0;
  const fee = hasText && !product.textIncluded ? TEXT_FEE : 0;
  return round2(product.price + fee);
}

export interface Totals {
  subtotal: number;
  discount: number;
  discountError?: string;
  shipping: number;
  total: number;
  freeShippingRemaining: number;
}

export function computeTotals(
  items: CartItem[],
  products: Product[],
  settings: Settings,
  code?: string,
): Totals {
  const byId = new Map(products.map((p) => [p.id, p]));
  const subtotal = round2(
    items.reduce((acc, it) => {
      const p = byId.get(it.productId);
      return p ? acc + unitPrice(p, it.custom) * it.qty : acc;
    }, 0),
  );

  let discount = 0;
  let discountError: string | undefined;
  if (code) {
    const d = findDiscount(code);
    if (!d) discountError = 'Código no válido';
    else if (subtotal < d.minSubtotal) discountError = `Este código requiere un pedido mínimo de ${d.minSubtotal} €`;
    else discount = round2(d.kind === 'percent' ? (subtotal * d.value) / 100 : Math.min(d.value, subtotal));
  }

  const afterDiscount = round2(subtotal - discount);
  const shipping = items.length === 0 || afterDiscount >= settings.freeShippingFrom ? 0 : settings.shippingPrice;
  return {
    subtotal,
    discount,
    discountError,
    shipping,
    total: round2(afterDiscount + shipping),
    freeShippingRemaining: items.length === 0 ? settings.freeShippingFrom : Math.max(0, round2(settings.freeShippingFrom - afterDiscount)),
  };
}

export function cartKey(productId: string, color: string, size: string, custom?: Customization): string {
  const c = custom ? `|${custom.design}|${custom.placement}|${custom.text.trim()}` : '';
  return `${productId}|${color}|${size}${c}`;
}
