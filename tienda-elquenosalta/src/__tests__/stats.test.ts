import { describe, expect, it } from 'vitest';
import { orderEconomics, salesByDay, summarize, unitMargin } from '../lib/stats';
import { DEFAULT_SETTINGS, SEED_PRODUCTS, seedOrders } from '../data/catalog';
import type { Order } from '../lib/types';

const order = (total: number, cost: number, status: Order['status'] = 'entregado', createdAt = new Date().toISOString()): Order => ({
  id: 'YT-1', createdAt, status, subtotal: total, discount: 0, shipping: 0, total,
  customer: { name: 'A', email: 'a@b.es', address: 'x', city: 'y', zip: '28001' },
  items: [{ productId: 'YT-P01', name: 'x', color: 'hueso', size: 'M', qty: 1, unitPrice: total, unitCost: cost }],
});

describe('estadísticas', () => {
  it('calcula la contribución de un pedido', () => {
    const e = orderEconomics(order(60.5, 10), DEFAULT_SETTINGS);
    expect(e.netRevenue).toBe(50);
    expect(e.fulfilment).toBeCloseTo(4 + 0.6 + 60.5 * 0.03, 2);
    expect(e.contribution).toBeCloseTo(50 - 10 - e.fulfilment, 2);
  });
  it('excluye los pedidos cancelados del resumen', () => {
    const s = summarize([order(60.5, 10), order(121, 20, 'cancelado')], DEFAULT_SETTINGS);
    expect(s.orders).toBe(1);
    expect(s.revenue).toBe(60.5);
    expect(s.grossMarginPct).toBeCloseTo(0.8);
  });
  it('agrupa las ventas por día y coloca hoy al final', () => {
    const days = salesByDay([order(30, 5), order(20, 5)], 7);
    expect(days).toHaveLength(7);
    expect(days[6].total).toBe(50);
  });
  it('los márgenes del catálogo coinciden con la etapa 3', () => {
    const p01 = unitMargin(SEED_PRODUCTS.find((p) => p.id === 'YT-P01')!);
    expect(p01.net).toBe(20.58);
    expect(p01.pct).toBeGreaterThan(0.7);
  });
  it('los pedidos de demo son coherentes', () => {
    const orders = seedOrders(SEED_PRODUCTS);
    expect(orders.length).toBeGreaterThan(20);
    for (const o of orders) expect(o.total).toBeCloseTo(o.subtotal - o.discount + o.shipping, 2);
  });
});
