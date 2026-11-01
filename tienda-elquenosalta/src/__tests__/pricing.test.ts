import { describe, expect, it } from 'vitest';
import { computeTotals, findDiscount, unitPrice, TEXT_FEE } from '../lib/pricing';
import { DEFAULT_SETTINGS, SEED_PRODUCTS } from '../data/catalog';
import type { CartItem } from '../lib/types';

const byId = (id: string) => SEED_PRODUCTS.find((p) => p.id === id)!;
const item = (productId: string, qty: number, text = ''): CartItem => ({
  key: `${productId}-${qty}-${text}`, productId, color: byId(productId).colors[0], size: 'M', qty,
  custom: text ? { design: 'texto', text, placement: 'pecho' } : undefined,
});

describe('precio unitario', () => {
  it('suma el recargo de texto solo si el producto no lo incluye', () => {
    expect(unitPrice(byId('YT-P01'), { design: 'texto', text: 'Tofu', placement: 'pecho' })).toBe(24.9 + TEXT_FEE);
    expect(unitPrice(byId('YT-P02'), { design: 'ladoA', text: 'Lucía', placement: 'pecho' })).toBe(32.9);
  });
  it('no cobra recargo si el texto está vacío', () => {
    expect(unitPrice(byId('YT-P01'), { design: 'texto', text: '   ', placement: 'pecho' })).toBe(24.9);
  });
});

describe('totales de la cesta', () => {
  it('cobra envío por debajo del mínimo y lo regala por encima', () => {
    const small = computeTotals([item('YT-P01', 1)], SEED_PRODUCTS, DEFAULT_SETTINGS);
    expect(small).toMatchObject({ subtotal: 24.9, shipping: 4.9, total: 29.8 });
    expect(small.freeShippingRemaining).toBeCloseTo(25.1);
    const big = computeTotals([item('YT-P01', 2), item('YT-P06', 1)], SEED_PRODUCTS, DEFAULT_SETTINGS);
    expect(big).toMatchObject({ subtotal: 72.7, shipping: 0, total: 72.7 });
  });
  it('aplica BIENVENIDA10 y recalcula el umbral de envío tras el descuento', () => {
    const t = computeTotals([item('YT-P01', 2), item('YT-P06', 0)], SEED_PRODUCTS, DEFAULT_SETTINGS, 'bienvenida10');
    expect(t.subtotal).toBe(49.8);
    expect(t.discount).toBe(4.98);
    expect(t.shipping).toBe(4.9);
    expect(t.total).toBe(49.72);
  });
  it('valida el mínimo de DOSPATAS5 y los códigos inexistentes', () => {
    expect(computeTotals([item('YT-P01', 1)], SEED_PRODUCTS, DEFAULT_SETTINGS, 'DOSPATAS5').discountError).toMatch(/mínimo/);
    expect(computeTotals([item('YT-P01', 2)], SEED_PRODUCTS, DEFAULT_SETTINGS, 'DOSPATAS5').discount).toBe(5);
    expect(computeTotals([item('YT-P01', 1)], SEED_PRODUCTS, DEFAULT_SETTINGS, 'GRATIS').discountError).toBe('Código no válido');
    expect(findDiscount(' bienvenida10 ')?.code).toBe('BIENVENIDA10');
  });
  it('una cesta vacía no cobra envío', () => {
    expect(computeTotals([], SEED_PRODUCTS, DEFAULT_SETTINGS).total).toBe(0);
  });
});
