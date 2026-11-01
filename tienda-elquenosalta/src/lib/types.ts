export type Category = 'camisetas' | 'premium' | 'oversize' | 'sudaderas';
export type Garment = 'tee' | 'over' | 'hoodie';
export type ColorId = 'blanco' | 'tinta' | 'celeste' | 'sol' | 'cancha';
export type DesignId = 'paseo' | 'ladoA' | 'equipo' | 'hincha' | 'logo' | 'texto';
export type Placement = 'pecho' | 'espalda';
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL';
export type View = 'front' | 'back' | 'detail';

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  garment: Garment;
  design: DesignId;
  placement: Placement;
  description: string;
  material: string;
  weight: number; // g/m²
  fit: string;
  care: string;
  price: number; // € con IVA
  cost: number; // € sin IVA, coste unitario estimado
  colors: ColorId[];
  sizes: Size[];
  /** Si true, el cliente puede escribir un texto (nombre) incluido en el precio */
  textIncluded: boolean;
  defaultText?: string;
  preorder: boolean;
  active: boolean;
  createdAt: string;
}

/** stock[productId][color][size] */
export type Inventory = Record<string, Partial<Record<ColorId, Partial<Record<Size, number>>>>>;

export interface Customization {
  design: DesignId;
  text: string;
  placement: Placement;
}

export interface CartItem {
  key: string;
  productId: string;
  color: ColorId;
  size: Size;
  qty: number;
  custom?: Customization;
}

export interface Customer {
  name: string;
  email: string;
  address: string;
  city: string;
  zip: string;
}

export type OrderStatus = 'pendiente' | 'en producción' | 'enviado' | 'entregado' | 'cancelado';

export interface OrderItem {
  productId: string;
  name: string;
  color: ColorId;
  size: Size;
  qty: number;
  unitPrice: number;
  unitCost: number;
  custom?: Customization;
}

export interface Order {
  id: string;
  createdAt: string;
  customer: Customer;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  discountCode?: string;
  shipping: number;
  total: number;
  status: OrderStatus;
}

export interface Settings {
  shippingPrice: number;
  freeShippingFrom: number;
  shippingCost: number; // lo que nos cuesta enviar (sin IVA)
  paymentFeePct: number; // comisión de la pasarela/marketplace
  packagingCost: number; // por pedido
}
