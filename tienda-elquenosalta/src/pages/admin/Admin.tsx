import { Fragment, useMemo, useState, type FormEvent } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useStore } from '../../store/StoreContext';
import { CATEGORIES, COLORS, DESIGNS, GARMENT_NAMES } from '../../data/catalog';
import { date, money, pct, round2, sinIva } from '../../lib/format';
import { orderEconomics, salesByDay, summarize, topProducts, unitMargin } from '../../lib/stats';
import { LineDescription } from '../../components/LineDescription';
import type { Category, ColorId, DesignId, Garment, OrderStatus, Placement, Product, Settings, Size } from '../../lib/types';

export const ADMIN_CODE = 'yunta2026';
const SESSION_KEY = 'yunta-admin';
const LOW_STOCK = 2;
const ALL_SIZES: Size[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];
const STATUSES: OrderStatus[] = ['pendiente', 'en producción', 'enviado', 'entregado', 'cancelado'];

export function AdminLayout() {
  const [ok, setOk] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1');
  const [code, setCode] = useState('');
  const [err, setErr] = useState('');
  const { resetDemo } = useStore();
  const navigate = useNavigate();

  if (!ok) {
    const submit = (e: FormEvent) => {
      e.preventDefault();
      if (code.trim() === ADMIN_CODE) {
        sessionStorage.setItem(SESSION_KEY, '1');
        setOk(true);
      } else setErr('Código incorrecto.');
    };
    return (
      <div className="container section narrow">
        <h1>Panel de administración</h1>
        <form onSubmit={submit} className="checkout-form">
          <p>Introduce el código de acceso de la demo (está en el README: <code>{ADMIN_CODE}</code>).</p>
          <p className="note">Es una barrera de demostración, no una autenticación real: en producción el panel debe ir detrás de un servidor con usuarios y contraseñas.</p>
          <div className="field"><label htmlFor="adm-code">Código</label><input id="adm-code" type="password" value={code} onChange={(e) => setCode(e.target.value)} /></div>
          {err && <p className="err" role="alert">{err}</p>}
          <button className="btn" type="submit">Entrar</button>
        </form>
      </div>
    );
  }

  return (
    <div className="container section admin">
      <div className="admin-head">
        <h1>Panel de administración</h1>
        <div className="actions">
          <button className="btn btn-ghost btn-sm" onClick={() => { if (confirm('¿Restablecer todos los datos de la demo? Se borran pedidos, cesta y cambios.')) { resetDemo(); navigate('/admin'); } }}>Restablecer datos de demo</button>
          <button className="btn btn-ghost btn-sm" onClick={() => { sessionStorage.removeItem(SESSION_KEY); setOk(false); }}>Salir</button>
        </div>
      </div>
      <nav className="tabs" aria-label="Secciones del panel">
        <NavLink to="/admin" end>Resumen</NavLink>
        <NavLink to="/admin/productos">Productos</NavLink>
        <NavLink to="/admin/inventario">Inventario</NavLink>
        <NavLink to="/admin/pedidos">Pedidos</NavLink>
        <NavLink to="/admin/costes">Costes y márgenes</NavLink>
      </nav>
      <Outlet />
    </div>
  );
}

// ---------------- Resumen / estadísticas ----------------
export function Dashboard() {
  const { orders, products, settings, inventory, subscribers, messages } = useStore();
  const s = summarize(orders, settings);
  const last30 = orders.filter((o) => Date.now() - new Date(o.createdAt).getTime() < 30 * 86400000);
  const s30 = summarize(last30, settings);
  const days = salesByDay(orders, 30);
  const top = topProducts(orders, products).slice(0, 5);
  const max = Math.max(1, ...days.map((d) => d.total));
  const byStatus = STATUSES.map((st) => ({ st, n: orders.filter((o) => o.status === st).length }));
  const byCat = (Object.keys(CATEGORIES) as Category[]).map((c) => ({
    c,
    total: round2(orders.filter((o) => o.status !== 'cancelado').flatMap((o) => o.items).filter((it) => products.find((p) => p.id === it.productId)?.category === c).reduce((a, it) => a + it.unitPrice * it.qty, 0)),
  }));
  const catMax = Math.max(1, ...byCat.map((x) => x.total));
  const low = products.filter((p) => !p.preorder).flatMap((p) => p.colors.flatMap((c) => p.sizes.map((sz) => ({ p, c, sz, n: inventory[p.id]?.[c]?.[sz] ?? 0 })))).filter((x) => x.n <= LOW_STOCK);

  return (
    <>
      <div className="kpis">
        <Kpi label="Ventas (30 días)" value={money(s30.revenue)} sub={`${s30.orders} pedidos`} />
        <Kpi label="Ticket medio" value={money(s.avgTicket)} sub="IVA incluido" />
        <Kpi label="Margen bruto" value={pct(s.grossMarginPct)} sub="ventas netas − coste de prendas" />
        <Kpi label="Contribución" value={money(s.contribution)} sub="tras envío, embalaje y comisión" />
        <Kpi label="Unidades vendidas" value={String(s.units)} sub={`${s.orders} pedidos en total`} />
        <Kpi label="Pendientes de preparar" value={String(orders.filter((o) => o.status === 'pendiente' || o.status === 'en producción').length)} sub="pendiente + en producción" />
      </div>

      <div className="admin-grid">
        <section className="panel">
          <h2>Ventas por día (últimos 30 días)</h2>
          <svg viewBox="0 0 600 200" className="chart" role="img" aria-label="Gráfico de barras de ventas diarias">
            {days.map((d, i) => {
              const h = (d.total / max) * 160;
              return (
                <g key={d.day}>
                  <rect x={i * 20 + 2} y={180 - h} width={16} height={Math.max(h, 1)} rx={3} fill={d.total ? 'var(--teja)' : '#e6dfd2'}><title>{`${d.day}: ${money(d.total)}`}</title></rect>
                </g>
              );
            })}
            <line x1="0" y1="180" x2="600" y2="180" stroke="#ccc" />
            <text x="0" y="196" fontSize="11" fill="#666">{days[0].day}</text>
            <text x="600" y="196" fontSize="11" fill="#666" textAnchor="end">hoy</text>
          </svg>
        </section>
        <section className="panel">
          <h2>Ventas por categoría</h2>
          {byCat.map((x) => (
            <div key={x.c} className="hbar"><span>{CATEGORIES[x.c].name}</span><div><i style={{ width: `${(x.total / catMax) * 100}%` }} /></div><b>{money(x.total)}</b></div>
          ))}
          <h2 className="mt">Pedidos por estado</h2>
          <div className="status-row">{byStatus.map((x) => <span key={x.st} className={`status st-${x.st.replace(' ', '-')}`}>{x.st}: {x.n}</span>)}</div>
        </section>
        <section className="panel">
          <h2>Productos más vendidos</h2>
          <table className="table"><thead><tr><th>Producto</th><th>Uds.</th><th>Ventas</th></tr></thead>
            <tbody>{top.map((t) => <tr key={t.id}><td>{t.name}</td><td>{t.units}</td><td>{money(t.revenue)}</td></tr>)}</tbody></table>
        </section>
        <section className="panel">
          <h2>Stock bajo ({low.length})</h2>
          {low.length === 0 ? <p>Todo el stock está por encima de {LOW_STOCK} unidades.</p> : (
            <ul className="low">{low.slice(0, 8).map((x) => <li key={`${x.p.id}${x.c}${x.sz}`}>{x.p.name} · {COLORS[x.c].name} · {x.sz}: <b>{x.n}</b></li>)}</ul>
          )}
          <Link to="/admin/inventario" className="link-block">Gestionar inventario →</Link>
        </section>
        <section className="panel">
          <h2>Newsletter ({subscribers.length})</h2>
          {subscribers.length === 0 ? <p>Aún no hay suscriptores. Prueba el formulario de la portada.</p> : <ul className="low">{subscribers.map((e) => <li key={e}>{e}</li>)}</ul>}
        </section>
        <section className="panel">
          <h2>Mensajes de contacto ({messages.length})</h2>
          {messages.length === 0 ? <p>Sin mensajes. El formulario está en <Link to="/info/contacto">Contacto</Link>.</p> : (
            <ul className="low">{messages.map((m) => <li key={m.id}><b>{m.name}</b> ({m.email}) · {date(m.createdAt)}<br />{m.text}</li>)}</ul>
          )}
        </section>
      </div>
    </>
  );
}

function Kpi({ label, value, sub }: { label: string; value: string; sub: string }) {
  return <div className="kpi"><span>{label}</span><strong>{value}</strong><small>{sub}</small></div>;
}

// ---------------- Productos ----------------
const blank = (): Product => ({
  id: '', slug: '', name: '', category: 'camisetas', garment: 'tee', design: 'logo', placement: 'pecho', description: '', material: '100 % algodón', weight: 150,
  fit: 'Corte clásico', care: 'Lavar del revés a 30 °C.', price: 24.9, cost: 5.5, colors: ['hueso'], sizes: ['S', 'M', 'L', 'XL'], textIncluded: false, preorder: false, active: true,
  createdAt: new Date().toISOString().slice(0, 10),
});

export function ProductsAdmin() {
  const { products, saveProduct } = useStore();
  const [editing, setEditing] = useState<Product | null>(null);
  const [isNew, setIsNew] = useState(false);

  return (
    <>
      <div className="list-bar"><span>{products.length} productos</span><button className="btn btn-sm" onClick={() => { setEditing(blank()); setIsNew(true); }}>Nuevo producto</button></div>
      {editing && <ProductForm initial={editing} isNew={isNew} existingIds={products.map((p) => p.id)} onCancel={() => setEditing(null)} onSave={(p) => { saveProduct(p); setEditing(null); }} />}
      <div className="table-wrap">
        <table className="table">
          <thead><tr><th>Ref.</th><th>Producto</th><th>Categoría</th><th>Precio</th><th>Coste</th><th>Margen</th><th>Estado</th><th></th></tr></thead>
          <tbody>
            {products.map((p) => {
              const m = unitMargin(p);
              return (
                <tr key={p.id}>
                  <td className="mono">{p.id}</td>
                  <td>{p.active ? <Link to={`/producto/${p.slug}`}>{p.name}</Link> : p.name}</td>
                  <td>{CATEGORIES[p.category].name}</td>
                  <td>{money(p.price)}</td>
                  <td>{money(p.cost)}</td>
                  <td>{pct(m.pct)}</td>
                  <td>{p.active ? (p.preorder ? 'Preventa' : 'Activo') : 'Oculto'}</td>
                  <td className="nowrap">
                    <button className="link" onClick={() => { setEditing(p); setIsNew(false); }}>Editar</button>{' · '}
                    <button className="link" onClick={() => saveProduct({ ...p, active: !p.active })}>{p.active ? 'Ocultar' : 'Publicar'}</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

function ProductForm({ initial, isNew, existingIds, onSave, onCancel }: { initial: Product; isNew: boolean; existingIds: string[]; onSave: (p: Product) => void; onCancel: () => void }) {
  const [p, setP] = useState<Product>(initial);
  const [err, setErr] = useState('');
  const up = <K extends keyof Product>(k: K, v: Product[K]) => setP((x) => ({ ...x, [k]: v }));
  const toggle = <T,>(arr: T[], v: T) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const id = p.id.trim().toUpperCase();
    if (!/^[A-Z0-9-]{3,}$/.test(id)) return setErr('La referencia debe tener al menos 3 caracteres (letras, números o guiones).');
    if (isNew && existingIds.includes(id)) return setErr('Ya existe un producto con esa referencia.');
    if (p.name.trim().length < 3) return setErr('Escribe el nombre del producto.');
    if (!(p.price > 0) || !(p.cost >= 0)) return setErr('Revisa el precio y el coste.');
    if (p.colors.length === 0 || p.sizes.length === 0) return setErr('Elige al menos un color y una talla.');
    const slug = p.slug.trim() || p.name.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    onSave({ ...p, id, slug, price: round2(p.price), cost: round2(p.cost), sizes: ALL_SIZES.filter((s) => p.sizes.includes(s)) });
  };
  return (
    <form className="panel product-form" onSubmit={submit}>
      <h2>{isNew ? 'Nuevo producto' : `Editar ${initial.id}`}</h2>
      <div className="form-grid">
        <div className="field"><label htmlFor="pf-id">Referencia</label><input id="pf-id" value={p.id} disabled={!isNew} onChange={(e) => up('id', e.target.value)} /></div>
        <div className="field span2"><label htmlFor="pf-name">Nombre</label><input id="pf-name" value={p.name} onChange={(e) => up('name', e.target.value)} /></div>
        <div className="field"><label htmlFor="pf-cat">Categoría</label><select id="pf-cat" value={p.category} onChange={(e) => up('category', e.target.value as Category)}>{(Object.keys(CATEGORIES) as Category[]).map((c) => <option key={c} value={c}>{CATEGORIES[c].name}</option>)}</select></div>
        <div className="field"><label htmlFor="pf-gar">Prenda</label><select id="pf-gar" value={p.garment} onChange={(e) => up('garment', e.target.value as Garment)}>{(Object.keys(GARMENT_NAMES) as Garment[]).map((g) => <option key={g} value={g}>{GARMENT_NAMES[g]}</option>)}</select></div>
        <div className="field"><label htmlFor="pf-des">Diseño</label><select id="pf-des" value={p.design} onChange={(e) => up('design', e.target.value as DesignId)}>{(Object.keys(DESIGNS) as DesignId[]).map((d) => <option key={d} value={d}>{DESIGNS[d].name}</option>)}</select></div>
        <div className="field"><label htmlFor="pf-pla">Estampado en</label><select id="pf-pla" value={p.placement} onChange={(e) => up('placement', e.target.value as Placement)}><option value="pecho">Pecho</option><option value="espalda">Espalda</option></select></div>
        <div className="field"><label htmlFor="pf-price">Precio (€, IVA incl.)</label><input id="pf-price" type="number" step="0.01" min="0" value={p.price} onChange={(e) => up('price', Number(e.target.value))} /></div>
        <div className="field"><label htmlFor="pf-cost">Coste unitario (€, sin IVA)</label><input id="pf-cost" type="number" step="0.01" min="0" value={p.cost} onChange={(e) => up('cost', Number(e.target.value))} /></div>
        <div className="field"><label htmlFor="pf-text">Texto por defecto</label><input id="pf-text" value={p.defaultText ?? ''} onChange={(e) => up('defaultText', e.target.value || undefined)} /></div>
        <div className="field span3"><label htmlFor="pf-desc">Descripción</label><textarea id="pf-desc" rows={2} value={p.description} onChange={(e) => up('description', e.target.value)} /></div>
        <div className="field span2"><label htmlFor="pf-mat">Material</label><input id="pf-mat" value={p.material} onChange={(e) => up('material', e.target.value)} /></div>
        <div className="field"><label htmlFor="pf-w">Gramaje (g/m²)</label><input id="pf-w" type="number" value={p.weight} onChange={(e) => up('weight', Number(e.target.value))} /></div>
      </div>
      <fieldset><legend>Colores</legend><div className="opt-row">{(Object.keys(COLORS) as ColorId[]).map((c) => <label key={c} className="check"><input type="checkbox" checked={p.colors.includes(c)} onChange={() => up('colors', toggle(p.colors, c))} /> {COLORS[c].name}</label>)}</div></fieldset>
      <fieldset><legend>Tallas</legend><div className="opt-row">{ALL_SIZES.map((s) => <label key={s} className="check"><input type="checkbox" checked={p.sizes.includes(s)} onChange={() => up('sizes', toggle(p.sizes, s))} /> {s}</label>)}</div></fieldset>
      <div className="opt-row">
        <label className="check"><input type="checkbox" checked={p.textIncluded} onChange={(e) => up('textIncluded', e.target.checked)} /> Texto incluido en el precio</label>
        <label className="check"><input type="checkbox" checked={p.preorder} onChange={(e) => up('preorder', e.target.checked)} /> Preventa (sin control de stock)</label>
        <label className="check"><input type="checkbox" checked={p.active} onChange={(e) => up('active', e.target.checked)} /> Publicado</label>
      </div>
      <p className="note">Margen con estos datos: {pct(unitMargin(p).pct)} ({money(unitMargin(p).margin)} por unidad).</p>
      {err && <p className="err" role="alert">{err}</p>}
      <div className="actions"><button className="btn" type="submit">Guardar</button><button className="btn btn-ghost" type="button" onClick={onCancel}>Cancelar</button></div>
    </form>
  );
}

// ---------------- Inventario ----------------
export function InventoryAdmin() {
  const { products, inventory, setStock } = useStore();
  const stockable = products.filter((p) => !p.preorder);
  const [id, setId] = useState(stockable[0]?.id ?? '');
  const p = stockable.find((x) => x.id === id) ?? stockable[0];
  const totalUnits = (pid: string) => Object.values(inventory[pid] ?? {}).reduce((a, sizes) => a + Object.values(sizes ?? {}).reduce((b, n) => b + (n ?? 0), 0), 0);

  return (
    <>
      <p>Stock de prendas lisas listas para estampar, por color y talla. Las sudaderas en preventa no llevan control de stock: se compran al cerrar el lote.</p>
      <div className="inv-list">
        {stockable.map((x) => (
          <button key={x.id} className={`inv-item ${p?.id === x.id ? 'on' : ''}`} onClick={() => setId(x.id)} aria-pressed={p?.id === x.id}>
            <span className="mono">{x.id}</span> {x.name} <b>{totalUnits(x.id)} uds.</b>
          </button>
        ))}
      </div>
      {p && (
        <div className="panel">
          <h2>{p.name}</h2>
          <div className="table-wrap">
            <table className="table inv">
              <thead><tr><th>Color</th>{p.sizes.map((s) => <th key={s}>{s}</th>)}</tr></thead>
              <tbody>
                {p.colors.map((c) => (
                  <tr key={c}>
                    <td><span className="swatch" style={{ background: COLORS[c].hex }} /> {COLORS[c].name}</td>
                    {p.sizes.map((s) => {
                      const n = inventory[p.id]?.[c]?.[s] ?? 0;
                      return (
                        <td key={s} className={n <= LOW_STOCK ? 'low-cell' : ''}>
                          <input type="number" min={0} aria-label={`Stock ${COLORS[c].name} ${s}`} value={n} onChange={(e) => setStock(p.id, c, s, Number(e.target.value))} />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="note">Las celdas resaltadas tienen {LOW_STOCK} unidades o menos. Los cambios se guardan al momento.</p>
        </div>
      )}
    </>
  );
}

// ---------------- Pedidos ----------------
export function OrdersAdmin() {
  const { orders, products, settings, setOrderStatus } = useStore();
  const [filter, setFilter] = useState<OrderStatus | ''>('');
  const [open, setOpen] = useState<string | null>(null);
  const list = filter ? orders.filter((o) => o.status === filter) : orders;
  return (
    <>
      <div className="list-bar">
        <span>{list.length} pedidos</span>
        <label>Estado{' '}<select value={filter} onChange={(e) => setFilter(e.target.value as OrderStatus | '')}><option value="">Todos</option>{STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}</select></label>
      </div>
      <div className="table-wrap">
        <table className="table">
          <thead><tr><th>Pedido</th><th>Fecha</th><th>Cliente</th><th>Uds.</th><th>Total</th><th>Contribución</th><th>Estado</th><th></th></tr></thead>
          <tbody>
            {list.map((o) => {
              const e = orderEconomics(o, settings);
              return (
                <Fragment key={o.id}>
                  <tr>
                    <td className="mono">{o.id}</td>
                    <td>{date(o.createdAt)}</td>
                    <td>{o.customer.name}<br /><small>{o.customer.city}</small></td>
                    <td>{o.items.reduce((a, it) => a + it.qty, 0)}</td>
                    <td>{money(o.total)}</td>
                    <td className={e.contribution < 0 ? 'err' : ''}>{money(e.contribution)}</td>
                    <td>
                      <select aria-label={`Estado del pedido ${o.id}`} value={o.status} onChange={(ev) => setOrderStatus(o.id, ev.target.value as OrderStatus)} className={`status st-${o.status.replace(' ', '-')}`}>
                        {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td><button className="link" aria-expanded={open === o.id} onClick={() => setOpen(open === o.id ? null : o.id)}>{open === o.id ? 'Cerrar' : 'Detalle'}</button></td>
                  </tr>
                  {open === o.id && (
                    <tr className="detail-row">
                      <td colSpan={8}>
                        <div className="order-detail">
                          <div>
                            <h3>Productos</h3>
                            <ul>{o.items.map((it, i) => <li key={i}><b>{it.qty} × {it.name}</b> — {money(it.unitPrice * it.qty)}<LineDescription color={it.color} size={it.size} custom={it.custom} productDesign={products.find((p) => p.id === it.productId)?.design ?? 'texto'} /></li>)}</ul>
                          </div>
                          <div>
                            <h3>Envío</h3>
                            <p>{o.customer.name}<br />{o.customer.email}<br />{o.customer.address}<br />{o.customer.zip} {o.customer.city}</p>
                          </div>
                          <div>
                            <h3>Economía del pedido</h3>
                            <p>Cobrado: {money(o.total)}{o.discountCode ? ` (código ${o.discountCode}, −${money(o.discount)})` : ''}<br />Venta neta sin IVA: {money(e.netRevenue)}<br />Coste de prendas: −{money(e.cogs)}<br />Envío, embalaje y comisión: −{money(e.fulfilment)}<br /><b>Contribución: {money(e.contribution)}</b></p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

// ---------------- Costes y márgenes ----------------
export function CostsAdmin() {
  const { products, orders, settings, saveSettings } = useStore();
  const [form, setForm] = useState<Settings>(settings);
  const [saved, setSaved] = useState(false);
  const [investment, setInvestment] = useState(1000);
  const s = summarize(orders, settings);
  const avgContribution = s.orders ? s.contribution / s.orders : 0;
  const breakEven = avgContribution > 0 ? Math.ceil(investment / avgContribution) : null;
  const rows = useMemo(() => products.map((p) => ({ p, m: unitMargin(p) })).sort((a, b) => b.m.pct - a.m.pct), [products]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    saveSettings({ ...form, paymentFeePct: Math.max(0, form.paymentFeePct) });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };
  const num = (k: keyof Settings, label: string, step = '0.01', factor = 1) => (
    <div className="field"><label htmlFor={`st-${k}`}>{label}</label><input id={`st-${k}`} type="number" step={step} min="0" value={round2(form[k] * factor)} onChange={(e) => setForm({ ...form, [k]: Number(e.target.value) / factor })} /></div>
  );

  return (
    <>
      <div className="kpis">
        <Kpi label="Ventas netas (sin IVA)" value={money(s.netRevenue)} sub={`${s.orders} pedidos`} />
        <Kpi label="Coste de prendas" value={money(s.cogs)} sub="prenda lisa + DTF + etiqueta" />
        <Kpi label="Logística y pagos" value={money(s.fulfilment)} sub="envío + embalaje + comisión" />
        <Kpi label="Contribución media" value={money(avgContribution)} sub="por pedido" />
      </div>
      <div className="admin-grid">
        <section className="panel">
          <h2>Margen por producto</h2>
          <div className="table-wrap">
            <table className="table">
              <thead><tr><th>Producto</th><th>PVP</th><th>Sin IVA</th><th>Coste</th><th>Margen</th></tr></thead>
              <tbody>{rows.map(({ p, m }) => <tr key={p.id}><td>{p.name}</td><td>{money(p.price)}</td><td>{money(m.net)}</td><td>{money(p.cost)}</td><td className={m.pct < 0.5 ? 'warn' : ''}>{pct(m.pct)} · {money(m.margin)}</td></tr>)}</tbody>
            </table>
          </div>
          <p className="note">Costes estimados en la etapa 3 (sin IVA). Edítalos en Productos cuando tengas los presupuestos reales.</p>
        </section>
        <section className="panel">
          <h2>Costes por pedido</h2>
          <form onSubmit={submit} className="form-grid">
            {num('shippingCost', 'Coste real del envío (€)')}
            {num('packagingCost', 'Embalaje por pedido (€)')}
            {num('paymentFeePct', 'Comisión de pago (%)', '0.1', 100)}
            {num('shippingPrice', 'Envío cobrado al cliente (€)')}
            {num('freeShippingFrom', 'Envío gratis desde (€)', '1')}
            <div className="field"><button className="btn" type="submit">Guardar</button>{saved && <span className="ok small" role="status"> Guardado</span>}</div>
          </form>
          <h2 className="mt">Punto de equilibrio</h2>
          <div className="field"><label htmlFor="inv">Inversión inicial a recuperar (€)</label><input id="inv" type="number" min="0" value={investment} onChange={(e) => setInvestment(Number(e.target.value))} /></div>
          <p>{breakEven ? <>Con la contribución media actual ({money(avgContribution)} por pedido) se recuperan {money(investment)} con unos <b>{breakEven} pedidos</b>.</> : 'Aún no hay pedidos con contribución positiva para calcularlo.'}</p>
          <p className="note">Venta neta = total cobrado / 1,21. No incluye costes fijos (cuota de autónomo, web, publicidad).</p>
          <p className="note">Precio medio neto de los productos activos: {money(round2(sinIva(products.filter((p) => p.active).reduce((a, p) => a + p.price, 0) / Math.max(1, products.filter((p) => p.active).length))))}.</p>
        </section>
      </div>
    </>
  );
}
