import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/StoreContext';
import { GarmentImage } from '../components/GarmentImage';
import { LineDescription } from '../components/LineDescription';
import { money } from '../lib/format';
import { DISCOUNTS, unitPrice } from '../lib/pricing';

export function Cart() {
  const { cart, products, totals, setQty, removeFromCart, discountCode, setDiscountCode, settings } = useStore();
  const navigate = useNavigate();
  const [code, setCode] = useState(discountCode);
  const [lineError, setLineError] = useState<Record<string, string>>({});

  const changeQty = (key: string, qty: number) => {
    const r = setQty(key, qty);
    setLineError((e) => ({ ...e, [key]: r.ok ? '' : r.error }));
  };

  const applyCode = (e: FormEvent) => {
    e.preventDefault();
    setDiscountCode(code);
  };

  if (cart.length === 0) {
    return (
      <div className="container section empty-page">
        <h1>Tu cesta está vacía</h1>
        <p>Echa un vistazo a la colección o crea una prenda a tu medida.</p>
        <div className="actions"><Link to="/personas" className="btn">Ver la colección</Link><Link to="/personalizar" className="btn btn-ghost">Personalizar</Link></div>
      </div>
    );
  }

  return (
    <div className="container section">
      <h1>Tu cesta</h1>
      <div className="cart">
        <ul className="cart-lines">
          {cart.map((it) => {
            const p = products.find((x) => x.id === it.productId);
            if (!p) return null;
            const price = unitPrice(p, it.custom);
            return (
              <li key={it.key} className="cart-line">
                <Link to={`/producto/${p.slug}`} className="cart-img" aria-label={p.name}>
                  <GarmentImage garment={p.garment} color={it.color} design={it.custom?.design ?? p.design} text={it.custom?.text ?? ''} placement={it.custom?.placement ?? p.placement} view={(it.custom?.placement ?? p.placement) === 'espalda' ? 'back' : 'front'} alt="" />
                </Link>
                <div className="cart-info">
                  <Link to={`/producto/${p.slug}`}><strong>{p.name}</strong></Link>
                  <LineDescription color={it.color} size={it.size} custom={it.custom} productDesign={p.design} />
                  {p.preorder && <span className="pill sm">Preventa</span>}
                  <span className="mono small">{money(price)} / ud.</span>
                </div>
                <div className="cart-actions">
                  <div className="qty" role="group" aria-label={`Cantidad de ${p.name}`}>
                    <button type="button" onClick={() => changeQty(it.key, it.qty - 1)} disabled={it.qty <= 1} aria-label="Restar una unidad">−</button>
                    <span>{it.qty}</span>
                    <button type="button" onClick={() => changeQty(it.key, it.qty + 1)} aria-label="Sumar una unidad">+</button>
                  </div>
                  <strong>{money(price * it.qty)}</strong>
                  <button type="button" className="link" onClick={() => removeFromCart(it.key)}>Eliminar</button>
                  {lineError[it.key] && <p className="err small" role="alert">{lineError[it.key]}</p>}
                </div>
              </li>
            );
          })}
        </ul>

        <aside className="summary" aria-label="Resumen del pedido">
          <h2>Resumen</h2>
          <div className="row"><span>Subtotal</span><span>{money(totals.subtotal)}</span></div>
          <form className="code-form" onSubmit={applyCode}>
            <label htmlFor="code">Código de descuento</label>
            <div className="inline">
              <input id="code" value={code} onChange={(e) => setCode(e.target.value)} placeholder="BIENVENIDA10" />
              <button className="btn btn-sm" type="submit">Aplicar</button>
            </div>
            {discountCode && totals.discountError && <p className="err small" role="alert">{totals.discountError}</p>}
            {discountCode && !totals.discountError && <p className="ok small">Código {discountCode} aplicado. <button type="button" className="link" onClick={() => { setDiscountCode(''); setCode(''); }}>Quitar</button></p>}
            <p className="note">Códigos de demo: {DISCOUNTS.map((d) => d.code).join(' · ')}</p>
          </form>
          {totals.discount > 0 && <div className="row ok"><span>Descuento</span><span>−{money(totals.discount)}</span></div>}
          <div className="row"><span>Envío</span><span>{totals.shipping === 0 ? 'Gratis' : money(totals.shipping)}</span></div>
          {totals.freeShippingRemaining > 0 && <p className="note">Te faltan {money(totals.freeShippingRemaining)} para el envío gratis (desde {money(settings.freeShippingFrom)}).</p>}
          <div className="row total"><span>Total</span><strong>{money(totals.total)}</strong></div>
          <p className="note">IVA incluido.</p>
          <button className="btn full" onClick={() => navigate('/checkout')}>Tramitar pedido</button>
          <Link to="/personas" className="link-block center">Seguir comprando</Link>
        </aside>
      </div>
    </div>
  );
}
