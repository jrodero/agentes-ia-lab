import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EMAIL_RE, useStore } from '../store/StoreContext';
import { money } from '../lib/format';
import type { Customer } from '../lib/types';

const EMPTY: Customer = { name: '', email: '', address: '', city: '', zip: '' };

export function Checkout() {
  const { cart, totals, placeOrder } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState<Customer>(EMPTY);
  const [accept, setAccept] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof Customer | 'accept' | 'general', string>>>({});

  if (cart.length === 0) {
    return <div className="container section empty-page"><h1>No hay nada que tramitar</h1><Link to="/personas" className="btn">Ver la colección</Link></div>;
  }

  const set = (k: keyof Customer) => (e: ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const err: typeof errors = {};
    if (form.name.trim().length < 2) err.name = 'Escribe tu nombre.';
    if (!EMAIL_RE.test(form.email.trim())) err.email = 'Escribe un email válido.';
    if (form.address.trim().length < 5) err.address = 'Escribe la dirección completa.';
    if (form.city.trim().length < 2) err.city = 'Escribe la ciudad.';
    if (!/^\d{5}$/.test(form.zip.trim())) err.zip = 'El código postal debe tener 5 cifras.';
    if (!accept) err.accept = 'Debes aceptar las condiciones de la demo.';
    setErrors(err);
    if (Object.keys(err).length) return;
    const r = placeOrder({ name: form.name.trim(), email: form.email.trim(), address: form.address.trim(), city: form.city.trim(), zip: form.zip.trim() });
    if (!r.ok) return setErrors({ general: r.error });
    navigate(`/pedido/${r.order.id}`);
  };

  const field = (k: keyof Customer, label: string, type = 'text', auto?: string) => (
    <div className="field">
      <label htmlFor={`co-${k}`}>{label}</label>
      <input id={`co-${k}`} type={type} autoComplete={auto} value={form[k]} onChange={set(k)} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `co-${k}-err` : undefined} />
      {errors[k] && <span id={`co-${k}-err`} className="err small">{errors[k]}</span>}
    </div>
  );

  return (
    <div className="container section">
      <nav className="crumbs" aria-label="Migas"><Link to="/carrito">Cesta</Link> / <span>Datos de envío</span></nav>
      <h1>Datos de envío</h1>
      <div className="cart">
        <form className="checkout-form" onSubmit={submit} noValidate>
          {field('name', 'Nombre y apellidos', 'text', 'name')}
          {field('email', 'Email', 'email', 'email')}
          {field('address', 'Dirección', 'text', 'street-address')}
          <div className="two">{field('city', 'Ciudad', 'text', 'address-level2')}{field('zip', 'Código postal', 'text', 'postal-code')}</div>
          <div className="demo-pay">
            <strong>Pago simulado</strong>
            <p>Esta es una demo: no se piden datos de tarjeta ni se cobra nada. Al confirmar se crea el pedido en el panel de administración y se descuenta el stock.</p>
          </div>
          <label className="check"><input type="checkbox" checked={accept} onChange={(e) => setAccept(e.target.checked)} /> Entiendo que es un pedido de demostración y acepto la <Link to="/info/privacidad">política de privacidad</Link>.</label>
          {errors.accept && <span className="err small">{errors.accept}</span>}
          {errors.general && <p className="err" role="alert">{errors.general}</p>}
          <button className="btn full" type="submit">Confirmar pedido · {money(totals.total)}</button>
        </form>
        <aside className="summary">
          <h2>Tu pedido</h2>
          <div className="row"><span>Productos ({cart.reduce((a, i) => a + i.qty, 0)})</span><span>{money(totals.subtotal)}</span></div>
          {totals.discount > 0 && <div className="row ok"><span>Descuento</span><span>−{money(totals.discount)}</span></div>}
          <div className="row"><span>Envío</span><span>{totals.shipping === 0 ? 'Gratis' : money(totals.shipping)}</span></div>
          <div className="row total"><span>Total</span><strong>{money(totals.total)}</strong></div>
          <Link to="/carrito" className="link-block center">Volver a la cesta</Link>
        </aside>
      </div>
    </div>
  );
}
