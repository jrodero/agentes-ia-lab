import { round2, sinIva } from './format';
import type { Order, Product, Settings } from './types';

export interface OrderEconomics {
  revenue: number; // total cobrado con IVA
  netRevenue: number; // sin IVA
  cogs: number; // coste de las prendas (sin IVA)
  fulfilment: number; // envío + embalaje + comisión de pago
  contribution: number; // beneficio antes de costes fijos
}

export function orderEconomics(o: Order, s: Settings): OrderEconomics {
  const netRevenue = sinIva(o.total);
  const cogs = o.items.reduce((a, it) => a + it.unitCost * it.qty, 0);
  const fulfilment = s.shippingCost + s.packagingCost + o.total * s.paymentFeePct;
  return { revenue: o.total, netRevenue: round2(netRevenue), cogs: round2(cogs), fulfilment: round2(fulfilment), contribution: round2(netRevenue - cogs - fulfilment) };
}

export interface Summary {
  orders: number;
  units: number;
  revenue: number;
  netRevenue: number;
  cogs: number;
  fulfilment: number;
  contribution: number;
  avgTicket: number;
  grossMarginPct: number; // (ventas netas - coste prendas) / ventas netas
}

export function summarize(orders: Order[], s: Settings): Summary {
  const valid = orders.filter((o) => o.status !== 'cancelado');
  const acc = valid.reduce(
    (a, o) => {
      const e = orderEconomics(o, s);
      a.revenue += e.revenue; a.netRevenue += e.netRevenue; a.cogs += e.cogs; a.fulfilment += e.fulfilment; a.contribution += e.contribution;
      a.units += o.items.reduce((u, it) => u + it.qty, 0);
      return a;
    },
    { revenue: 0, netRevenue: 0, cogs: 0, fulfilment: 0, contribution: 0, units: 0 },
  );
  return {
    orders: valid.length,
    units: acc.units,
    revenue: round2(acc.revenue),
    netRevenue: round2(acc.netRevenue),
    cogs: round2(acc.cogs),
    fulfilment: round2(acc.fulfilment),
    contribution: round2(acc.contribution),
    avgTicket: valid.length ? round2(acc.revenue / valid.length) : 0,
    grossMarginPct: acc.netRevenue ? (acc.netRevenue - acc.cogs) / acc.netRevenue : 0,
  };
}

const localKey = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

/** Ventas con IVA por día de los últimos `days` días (incluido hoy). */
export function salesByDay(orders: Order[], days = 30, now = new Date()): { day: string; total: number }[] {
  const out: { day: string; total: number }[] = [];
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(start);
    d.setDate(start.getDate() - i);
    out.push({ day: localKey(d), total: 0 });
  }
  const idx = new Map(out.map((x, i) => [x.day, i]));
  for (const o of orders) {
    if (o.status === 'cancelado') continue;
    const i = idx.get(localKey(new Date(o.createdAt)));
    if (i !== undefined) out[i].total = round2(out[i].total + o.total);
  }
  return out;
}

export function topProducts(orders: Order[], products: Product[]) {
  const m = new Map<string, { id: string; name: string; units: number; revenue: number; cost: number }>();
  for (const o of orders) {
    if (o.status === 'cancelado') continue;
    for (const it of o.items) {
      const cur = m.get(it.productId) ?? { id: it.productId, name: products.find((p) => p.id === it.productId)?.name ?? it.name, units: 0, revenue: 0, cost: 0 };
      cur.units += it.qty;
      cur.revenue = round2(cur.revenue + it.unitPrice * it.qty);
      cur.cost = round2(cur.cost + it.unitCost * it.qty);
      m.set(it.productId, cur);
    }
  }
  return [...m.values()].sort((a, b) => b.revenue - a.revenue);
}

/** Margen bruto unitario de un producto (precio sin IVA vs coste). */
export function unitMargin(p: Product) {
  const net = sinIva(p.price);
  return { net: round2(net), margin: round2(net - p.cost), pct: net ? (net - p.cost) / net : 0 };
}
