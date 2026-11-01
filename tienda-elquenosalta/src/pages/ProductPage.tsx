import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useStore } from '../store/StoreContext';
import { CATEGORIES, COLORS, DESIGNS } from '../data/catalog';
import { GarmentImage } from '../components/GarmentImage';
import { SizeGuideDialog } from '../components/SizeGuide';
import { ProductCard } from '../components/ProductCard';
import { money } from '../lib/format';
import { MAX_TEXT, TEXT_FEE, unitPrice } from '../lib/pricing';
import type { ColorId, Size, View } from '../lib/types';
import { NotFound } from './NotFound';

export function ProductPage() {
  const { slug } = useParams();
  const { products, stockOf, addToCart } = useStore();
  const navigate = useNavigate();
  const product = products.find((p) => p.slug === slug && p.active);

  const [color, setColor] = useState<ColorId | null>(null);
  const [size, setSize] = useState<Size | null>(null);
  const [qty, setQty] = useState(1);
  const [text, setText] = useState<string | null>(null);
  const [view, setView] = useState<View | null>(null);
  const [guide, setGuide] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  if (!product) return <NotFound />;

  const c = color ?? product.colors[0];
  const design = DESIGNS[product.design];
  const t = text ?? product.defaultText ?? '';
  const v: View = view ?? (product.placement === 'espalda' ? 'back' : 'front');
  const custom = design.takesText ? { design: product.design, text: t.trim(), placement: product.placement } : undefined;
  const price = unitPrice(product, custom);
  const stock = size ? stockOf(product.id, c, size) : null;
  const related = products.filter((p) => p.active && p.id !== product.id && (p.category === product.category || p.design === product.design)).slice(0, 4);

  const add = (goToCart: boolean) => {
    if (!size) return setMsg({ ok: false, text: 'Elige una talla.' });
    if (design.takesText && !t.trim()) return setMsg({ ok: false, text: `Escribe el ${design.textLabel?.toLowerCase()}.` });
    const r = addToCart({ productId: product.id, color: c, size, qty, custom });
    if (!r.ok) return setMsg({ ok: false, text: r.error });
    setMsg({ ok: true, text: 'Añadido a la cesta.' });
    if (goToCart) navigate('/carrito');
  };

  const views: { id: View; label: string }[] = [
    { id: 'front', label: 'Delantera' },
    { id: 'back', label: 'Trasera' },
    { id: 'detail', label: 'Detalle del estampado' },
  ];

  return (
    <div className="container section">
      <nav className="crumbs" aria-label="Migas"><Link to="/">Inicio</Link> / <Link to="/personas">Personas</Link> / <Link to={`/personas/${product.category}`}>{CATEGORIES[product.category].name}</Link> / <span>{product.name}</span></nav>
      <div className="pdp">
        <div className="gallery">
          <div className="gallery-main">
            <GarmentImage garment={product.garment} color={c} design={product.design} text={t} placement={product.placement} view={v} alt={`${product.name}, vista ${views.find((x) => x.id === v)!.label.toLowerCase()}, color ${COLORS[c].name}`} />
          </div>
          <div className="thumbs" role="group" aria-label="Vistas del producto">
            {views.map((x) => (
              <button key={x.id} type="button" className={`thumb ${v === x.id ? 'on' : ''}`} aria-pressed={v === x.id} onClick={() => setView(x.id)} aria-label={x.label}>
                <GarmentImage garment={product.garment} color={c} design={product.design} text={t} placement={product.placement} view={x.id} alt="" />
              </button>
            ))}
          </div>
          <p className="note">Imágenes ilustradas de la prenda real. Las fotos de producto se añadirán con las muestras.</p>
        </div>

        <div className="pdp-info">
          <span className="kicker">{product.id} · {CATEGORIES[product.category].name}</span>
          <h1>{product.name}</h1>
          <p className="price">{money(price)} <small>IVA incluido</small></p>
          {product.preorder && <p className="pill">Preventa · se fabrica bajo pedido, envío en unas 3 semanas</p>}
          <p>{product.description}</p>

          <fieldset>
            <legend>Color: <strong>{COLORS[c].name}</strong></legend>
            <div className="opt-row">
              {product.colors.map((x) => (
                <button key={x} type="button" className={`color-opt lg ${c === x ? 'on' : ''}`} aria-pressed={c === x} aria-label={COLORS[x].name} title={COLORS[x].name} style={{ background: COLORS[x].hex }} onClick={() => { setColor(x); setMsg(null); }} />
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend>Talla {size && <strong>{size}</strong>} <button type="button" className="link" onClick={() => setGuide(true)}>Guía de tallas</button></legend>
            <div className="opt-row">
              {product.sizes.map((s) => {
                const n = stockOf(product.id, c, s);
                return (
                  <button key={s} type="button" className={`opt ${size === s ? 'on' : ''}`} aria-pressed={size === s} disabled={n <= 0} onClick={() => { setSize(s); setMsg(null); }} title={n <= 0 ? 'Agotada' : undefined}>
                    {s}
                  </button>
                );
              })}
            </div>
            {stock !== null && Number.isFinite(stock) && stock <= 3 && stock > 0 && <p className="warn">¡Solo quedan {stock}!</p>}
          </fieldset>

          {design.takesText && (
            <div className="field">
              <label htmlFor="pdp-text">{design.textLabel} <small>(máx. {MAX_TEXT} caracteres{product.textIncluded ? ', incluido en el precio' : `, +${TEXT_FEE} €`})</small></label>
              <input id="pdp-text" value={t} maxLength={MAX_TEXT} onChange={(e) => setText(e.target.value)} />
            </div>
          )}

          <div className="buy-row">
            <div className="qty" role="group" aria-label="Cantidad">
              <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Restar una unidad">−</button>
              <span aria-live="polite">{qty}</span>
              <button type="button" onClick={() => setQty((q) => Math.min(10, q + 1))} aria-label="Sumar una unidad">+</button>
            </div>
            <button className="btn grow" onClick={() => add(false)}>Añadir a la cesta · {money(price * qty)}</button>
          </div>
          <button className="btn btn-ghost full" onClick={() => add(true)}>Comprar ahora</button>
          {msg && <p role="status" className={msg.ok ? 'ok' : 'err'}>{msg.text} {msg.ok && <Link to="/carrito">Ver cesta →</Link>}</p>}

          <Link to={`/personalizar?base=${product.id}`} className="link-block">¿Quieres otro diseño o tu propio texto? Abre esta prenda en el personalizador →</Link>

          <details open>
            <summary>Material y ajuste</summary>
            <ul><li>{product.material}, {product.weight} g/m²</li><li>{product.fit}</li><li>Estampado DTF en {product.placement}, hecho en España</li></ul>
          </details>
          <details>
            <summary>Cuidados</summary>
            <p>{product.care}</p>
          </details>
          <details>
            <summary>Envíos y devoluciones</summary>
            <p>Envío en 3–5 días laborables (preventas: unas 3 semanas). Las prendas personalizadas no admiten devolución salvo defecto. <Link to="/info/envios">Más información</Link></p>
          </details>
        </div>
      </div>

      {related.length > 0 && (
        <section className="section">
          <h2>También te puede gustar</h2>
          <div className="grid-4">{related.map((p) => <ProductCard key={p.id} product={p} />)}</div>
        </section>
      )}
      <SizeGuideDialog garment={product.garment} open={guide} onClose={() => setGuide(false)} />
    </div>
  );
}
