import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { DEFAULT_SETTINGS, SEED_PRODUCTS, seedInventory, seedOrders } from '../data/catalog';
import { cartKey, computeTotals, unitPrice, type Totals } from '../lib/pricing';
import type { CartItem, ColorId, Customer, Customization, Inventory, Order, OrderStatus, Product, Settings, Size } from '../lib/types';

const STORAGE_KEY = 'yunta-demo-v1';

export interface Message { id: string; name: string; email: string; text: string; createdAt: string }

interface Data {
  products: Product[];
  inventory: Inventory;
  orders: Order[];
  cart: CartItem[];
  discountCode: string;
  settings: Settings;
  subscribers: string[];
  messages: Message[];
}

function freshData(): Data {
  return {
    products: SEED_PRODUCTS,
    inventory: seedInventory(SEED_PRODUCTS),
    orders: seedOrders(SEED_PRODUCTS),
    cart: [],
    discountCode: '',
    settings: DEFAULT_SETTINGS,
    subscribers: [],
    messages: [],
  };
}

function load(): Data {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...freshData(), ...(JSON.parse(raw) as Partial<Data>) };
  } catch {
    /* datos corruptos: se regeneran */
  }
  return freshData();
}

type Result = { ok: true } | { ok: false; error: string };

interface Store extends Data {
  totals: Totals;
  cartCount: number;
  stockOf: (productId: string, color: ColorId, size: Size) => number;
  addToCart: (p: { productId: string; color: ColorId; size: Size; qty: number; custom?: Customization }) => Result;
  setQty: (key: string, qty: number) => Result;
  removeFromCart: (key: string) => void;
  setDiscountCode: (code: string) => void;
  placeOrder: (customer: Customer) => { ok: true; order: Order } | { ok: false; error: string };
  subscribe: (email: string) => Result;
  sendMessage: (m: Omit<Message, 'id' | 'createdAt'>) => void;
  saveProduct: (p: Product) => void;
  setStock: (productId: string, color: ColorId, size: Size, n: number) => void;
  setOrderStatus: (id: string, status: OrderStatus) => void;
  saveSettings: (s: Settings) => void;
  resetDemo: () => void;
}

const Ctx = createContext<Store | null>(null);
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function StoreProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<Data>(load);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const stockOfIn = (d: Data, productId: string, color: ColorId, size: Size) => {
    const p = d.products.find((x) => x.id === productId);
    if (!p) return 0;
    if (p.preorder) return Infinity;
    return d.inventory[productId]?.[color]?.[size] ?? 0;
  };
  const stockOf = useCallback((productId: string, color: ColorId, size: Size) => stockOfIn(data, productId, color, size), [data]);

  /** Unidades de la misma variante (producto+color+talla) ya en el carrito, excluyendo una línea. */
  const inCart = (d: Data, productId: string, color: ColorId, size: Size, exceptKey?: string) =>
    d.cart.filter((it) => it.productId === productId && it.color === color && it.size === size && it.key !== exceptKey).reduce((a, it) => a + it.qty, 0);

  const addToCart: Store['addToCart'] = ({ productId, color, size, qty, custom }) => {
    const key = cartKey(productId, color, size, custom);
    const existing = data.cart.find((it) => it.key === key);
    const wanted = inCart(data, productId, color, size) + qty;
    const available = stockOfIn(data, productId, color, size);
    if (wanted > available) {
      return { ok: false, error: available === 0 ? 'Esta talla está agotada en ese color.' : `Solo quedan ${available} unidades de esta talla y color.` };
    }
    setData((d) => ({
      ...d,
      cart: existing
        ? d.cart.map((it) => (it.key === key ? { ...it, qty: it.qty + qty } : it))
        : [...d.cart, { key, productId, color, size, qty, custom }],
    }));
    return { ok: true };
  };

  const setQty: Store['setQty'] = (key, qty) => {
    const item = data.cart.find((it) => it.key === key);
    if (!item) return { ok: false, error: 'Producto no encontrado' };
    if (qty < 1) return { ok: false, error: 'La cantidad mínima es 1' };
    const available = stockOfIn(data, item.productId, item.color, item.size) - inCart(data, item.productId, item.color, item.size, key);
    if (qty > available) return { ok: false, error: `Solo quedan ${available} unidades disponibles.` };
    setData((d) => ({ ...d, cart: d.cart.map((it) => (it.key === key ? { ...it, qty } : it)) }));
    return { ok: true };
  };

  const removeFromCart = (key: string) => setData((d) => ({ ...d, cart: d.cart.filter((it) => it.key !== key) }));
  const setDiscountCode = (code: string) => setData((d) => ({ ...d, discountCode: code.trim().toUpperCase() }));

  const totals = useMemo(
    () => computeTotals(data.cart, data.products, data.settings, data.discountCode || undefined),
    [data.cart, data.products, data.settings, data.discountCode],
  );

  const placeOrder: Store['placeOrder'] = (customer) => {
    if (data.cart.length === 0) return { ok: false, error: 'El carrito está vacío.' };
    for (const it of data.cart) {
      if (inCart(data, it.productId, it.color, it.size) > stockOfIn(data, it.productId, it.color, it.size)) {
        return { ok: false, error: 'Algún producto ya no tiene stock suficiente. Revisa el carrito.' };
      }
    }
    const byId = new Map(data.products.map((p) => [p.id, p]));
    const nextNum = 1001 + data.orders.reduce((m, o) => Math.max(m, Number(o.id.replace('YT-', '')) - 1000), 0);
    const order: Order = {
      id: `YT-${nextNum}`,
      createdAt: new Date().toISOString(),
      customer,
      items: data.cart.map((it) => {
        const p = byId.get(it.productId)!;
        return { productId: p.id, name: p.name, color: it.color, size: it.size, qty: it.qty, unitPrice: unitPrice(p, it.custom), unitCost: p.cost, custom: it.custom };
      }),
      subtotal: totals.subtotal,
      discount: totals.discount,
      discountCode: totals.discount > 0 ? data.discountCode : undefined,
      shipping: totals.shipping,
      total: totals.total,
      status: 'pendiente',
    };
    setData((d) => {
      const inventory: Inventory = JSON.parse(JSON.stringify(d.inventory));
      for (const it of d.cart) {
        const p = byId.get(it.productId);
        if (p && !p.preorder) {
          const cur = inventory[it.productId]?.[it.color]?.[it.size] ?? 0;
          inventory[it.productId]![it.color]![it.size] = Math.max(0, cur - it.qty);
        }
      }
      return { ...d, inventory, orders: [order, ...d.orders], cart: [], discountCode: '' };
    });
    return { ok: true, order };
  };

  const subscribe: Store['subscribe'] = (email) => {
    const e = email.trim().toLowerCase();
    if (!EMAIL_RE.test(e)) return { ok: false, error: 'Escribe un email válido.' };
    if (data.subscribers.includes(e)) return { ok: false, error: 'Este email ya está suscrito.' };
    setData((d) => ({ ...d, subscribers: [...d.subscribers, e] }));
    return { ok: true };
  };

  const value: Store = {
    ...data,
    totals,
    cartCount: data.cart.reduce((a, it) => a + it.qty, 0),
    stockOf,
    addToCart,
    setQty,
    removeFromCart,
    setDiscountCode,
    placeOrder,
    subscribe,
    sendMessage: (m) => setData((d) => ({ ...d, messages: [{ ...m, id: crypto.randomUUID(), createdAt: new Date().toISOString() }, ...d.messages] })),
    saveProduct: (p) =>
      setData((d) => {
        const exists = d.products.some((x) => x.id === p.id);
        const inventory = { ...d.inventory };
        if (!exists) inventory[p.id] = Object.fromEntries(p.colors.map((c) => [c, Object.fromEntries(p.sizes.map((s) => [s, 0]))]));
        return { ...d, inventory, products: exists ? d.products.map((x) => (x.id === p.id ? p : x)) : [...d.products, p] };
      }),
    setStock: (productId, color, size, n) =>
      setData((d) => ({
        ...d,
        inventory: { ...d.inventory, [productId]: { ...d.inventory[productId], [color]: { ...d.inventory[productId]?.[color], [size]: Math.max(0, Math.floor(n) || 0) } } },
      })),
    setOrderStatus: (id, status) => setData((d) => ({ ...d, orders: d.orders.map((o) => (o.id === id ? { ...o, status } : o)) })),
    saveSettings: (s) => setData((d) => ({ ...d, settings: s })),
    resetDemo: () => setData(freshData()),
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore(): Store {
  const s = useContext(Ctx);
  if (!s) throw new Error('useStore debe usarse dentro de StoreProvider');
  return s;
}
