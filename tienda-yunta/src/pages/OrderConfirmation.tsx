import { Link, useParams } from 'react-router-dom';
import { useStore } from '../store/StoreContext';
import { LineDescription } from '../components/LineDescription';
import { money, date } from '../lib/format';
import { BRAND } from '../lib/brand';
import { NotFound } from './NotFound';

export function OrderConfirmation() {
  const { id } = useParams();
  const { orders, products } = useStore();
  const order = orders.find((o) => o.id === id);
  if (!order) return <NotFound />;
  const hasPreorder = order.items.some((it) => products.find((p) => p.id === it.productId)?.preorder);

  return (
    <div className="container section narrow">
      <span className="kicker">Pedido {order.id} · {date(order.createdAt)}</span>
      <h1>¡Gracias, {order.customer.name.split(' ')[0]}!</h1>
      <p className="lead">Hemos recibido tu pedido de demostración. En una tienda real te llegaría la confirmación a <strong>{order.customer.email}</strong>.</p>
      {hasPreorder && <p className="pill">Incluye productos en preventa: se envían cuando se cierra el lote (unas 3 semanas).</p>}
      <ul className="order-lines">
        {order.items.map((it, i) => {
          const p = products.find((x) => x.id === it.productId);
          return (
            <li key={i}>
              <div><strong>{it.qty} × {it.name}</strong><LineDescription color={it.color} size={it.size} custom={it.custom} productDesign={p?.design ?? it.custom?.design ?? 'texto'} /></div>
              <span>{money(it.unitPrice * it.qty)}</span>
            </li>
          );
        })}
      </ul>
      <div className="summary flat">
        <div className="row"><span>Subtotal</span><span>{money(order.subtotal)}</span></div>
        {order.discount > 0 && <div className="row ok"><span>Descuento ({order.discountCode})</span><span>−{money(order.discount)}</span></div>}
        <div className="row"><span>Envío</span><span>{order.shipping === 0 ? 'Gratis' : money(order.shipping)}</span></div>
        <div className="row total"><span>Total</span><strong>{money(order.total)}</strong></div>
      </div>
      <p>Envío a: {order.customer.address}, {order.customer.zip} {order.customer.city}</p>
      <p>Comparte vuestra foto con <strong>{BRAND.hashtag}</strong>.</p>
      <div className="actions"><Link to="/personas" className="btn">Seguir comprando</Link><Link to="/admin/pedidos" className="btn btn-ghost">Ver el pedido en el panel</Link></div>
    </div>
  );
}
