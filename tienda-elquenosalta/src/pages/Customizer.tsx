import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useStore } from '../store/StoreContext';
import { COLORS, CUSTOMIZER_BASES, DESIGNS, GARMENT_NAMES } from '../data/catalog';
import { GarmentImage } from '../components/GarmentImage';
import { SizeGuideDialog } from '../components/SizeGuide';
import { money } from '../lib/format';
import { MAX_TEXT, TEXT_FEE, unitPrice } from '../lib/pricing';
import type { ColorId, DesignId, Placement, Size, View } from '../lib/types';

export function Customizer() {
  const { products, stockOf, addToCart } = useStore();
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const requested = params.get('base');
  const baseIds = [...new Set([...(requested ? [requested] : []), ...CUSTOMIZER_BASES])];
  const bases = baseIds.map((id) => products.find((p) => p.id === id && p.active)).filter((p): p is NonNullable<typeof p> => !!p);

  const [baseId, setBaseId] = useState(bases[0]?.id ?? '');
  const base = bases.find((b) => b.id === baseId) ?? bases[0];
  const [color, setColor] = useState<ColorId>(base?.colors[0] ?? 'blanco');
  const [size, setSize] = useState<Size | null>(null);
  const [design, setDesign] = useState<DesignId>(base?.design ?? 'texto');
  const [text, setText] = useState(base?.defaultText ?? '');
  const [placement, setPlacement] = useState<Placement>(base?.placement ?? 'pecho');
  const [view, setView] = useState<View>('front');
  const [qty, setQty] = useState(1);
  const [guide, setGuide] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  if (!base) return <div className="container section"><p>No hay prendas disponibles para personalizar.</p><Link to="/personas" className="btn">Ver catálogo</Link></div>;

  const chooseBase = (id: string) => {
    const b = bases.find((x) => x.id === id)!;
    setBaseId(id);
    if (!b.colors.includes(color)) setColor(b.colors[0]);
    if (size && !b.sizes.includes(size)) setSize(null);
    setMsg(null);
  };

  const d = DESIGNS[design];
  const cleanText = d.takesText ? text.trim() : '';
  const custom = { design, text: cleanText, placement };
  const price = unitPrice(base, custom);
  const textFee = cleanText && !base.textIncluded ? TEXT_FEE : 0;
  const shownView: View = view === 'detail' ? 'detail' : view;

  const add = () => {
    if (!size) return setMsg({ ok: false, text: 'Elige una talla.' });
    if (d.takesText && !cleanText) return setMsg({ ok: false, text: `Escribe el ${d.textLabel?.toLowerCase()} o elige otro diseño.` });
    const r = addToCart({ productId: base.id, color, size, qty, custom });
    if (!r.ok) return setMsg({ ok: false, text: r.error });
    setMsg({ ok: true, text: 'Tu prenda personalizada está en la cesta.' });
  };

  return (
    <div className="container section">
      <nav className="crumbs" aria-label="Migas"><Link to="/">Inicio</Link> / <span>Personalizar</span></nav>
      <header className="page-head"><h1>Personaliza tu prenda</h1><p>Elige la prenda, el color, la talla y el diseño, y añade tu texto. La vista previa y el precio se actualizan al momento.</p></header>

      <div className="customizer">
        <div className="preview">
          <div className="gallery-main">
            <GarmentImage garment={base.garment} color={color} design={design} text={cleanText || (d.takesText ? d.textLabel ?? '' : '')} placement={placement} view={shownView} alt={`Vista previa: ${GARMENT_NAMES[base.garment]} ${COLORS[color].name} con el diseño ${d.name}`} />
          </div>
          <div className="seg" role="group" aria-label="Vista">
            {(['front', 'back', 'detail'] as View[]).map((v) => (
              <button key={v} type="button" className={view === v ? 'on' : ''} aria-pressed={view === v} onClick={() => setView(v)}>{v === 'front' ? 'Delante' : v === 'back' ? 'Detrás' : 'Detalle'}</button>
            ))}
          </div>
        </div>

        <form className="steps" onSubmit={(e) => { e.preventDefault(); add(); }}>
          <fieldset>
            <legend><span className="step">1</span> Prenda</legend>
            <div className="base-list">
              {bases.map((b) => (
                <label key={b.id} className={`base ${b.id === base.id ? 'on' : ''}`}>
                  <input type="radio" name="base" value={b.id} checked={b.id === base.id} onChange={() => chooseBase(b.id)} />
                  <span>{b.name}</span><small>{money(b.price)}{b.textIncluded ? ' · texto incluido' : ''}{b.preorder ? ' · preventa' : ''}</small>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend><span className="step">2</span> Color: <strong>{COLORS[color].name}</strong></legend>
            <div className="opt-row">
              {base.colors.map((c) => (
                <button key={c} type="button" className={`color-opt lg ${color === c ? 'on' : ''}`} aria-pressed={color === c} aria-label={COLORS[c].name} title={COLORS[c].name} style={{ background: COLORS[c].hex }} onClick={() => setColor(c)} />
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend><span className="step">3</span> Talla {size && <strong>{size}</strong>} <button type="button" className="link" onClick={() => setGuide(true)}>Guía de tallas</button></legend>
            <div className="opt-row">
              {base.sizes.map((s) => {
                const n = stockOf(base.id, color, s);
                return <button key={s} type="button" className={`opt ${size === s ? 'on' : ''}`} aria-pressed={size === s} disabled={n <= 0} onClick={() => setSize(s)}>{s}</button>;
              })}
            </div>
          </fieldset>

          <fieldset>
            <legend><span className="step">4</span> Diseño</legend>
            <div className="design-list">
              {(Object.keys(DESIGNS) as DesignId[]).map((id) => (
                <button key={id} type="button" className={`design ${design === id ? 'on' : ''}`} aria-pressed={design === id} onClick={() => setDesign(id)}>
                  <GarmentImage garment="tee" color={color} design={id} text={DESIGNS[id].takesText ? 'Nombre' : ''} placement="pecho" view="detail" alt="" />
                  <span>{DESIGNS[id].name}</span>
                </button>
              ))}
            </div>
            <p className="note">{d.blurb}</p>
            <div className="seg" role="group" aria-label="Posición del estampado">
              {(['pecho', 'espalda'] as Placement[]).map((p) => (
                <button key={p} type="button" className={placement === p ? 'on' : ''} aria-pressed={placement === p} onClick={() => { setPlacement(p); setView(p === 'espalda' ? 'back' : 'front'); }}>En {p}</button>
              ))}
            </div>
          </fieldset>

          <fieldset disabled={!d.takesText}>
            <legend><span className="step">5</span> Texto</legend>
            <label htmlFor="cz-text" className="sr-only">{d.textLabel ?? 'Texto'}</label>
            <input id="cz-text" value={d.takesText ? text : ''} placeholder={d.takesText ? d.textLabel : 'Este diseño no lleva texto'} maxLength={MAX_TEXT} onChange={(e) => setText(e.target.value)} />
            <small>{d.takesText ? `${text.length}/${MAX_TEXT} caracteres · ${base.textIncluded ? 'incluido en el precio' : `+${TEXT_FEE} € por el texto`}` : 'Elige Lado A, Equipo 02, Mi hincha nº 1 o Texto libre para añadir texto.'}</small>
          </fieldset>

          <div className="price-box" aria-live="polite">
            <div><span>Prenda base</span><span>{money(base.price)}</span></div>
            <div><span>Personalización con texto</span><span>{textFee ? money(textFee) : 'Incluida'}</span></div>
            <div><span>Cantidad</span>
              <span className="qty sm" role="group" aria-label="Cantidad">
                <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Restar una unidad">−</button><span>{qty}</span><button type="button" onClick={() => setQty((q) => Math.min(10, q + 1))} aria-label="Sumar una unidad">+</button>
              </span>
            </div>
            <div className="total"><span>Total</span><strong>{money(price * qty)}</strong></div>
          </div>
          <button className="btn full" type="submit">Añadir a la cesta</button>
          {msg && <p role="status" className={msg.ok ? 'ok' : 'err'}>{msg.text} {msg.ok && <button type="button" className="link" onClick={() => navigate('/carrito')}>Ir a la cesta →</button>}</p>}
        </form>
      </div>
      <SizeGuideDialog garment={base.garment} open={guide} onClose={() => setGuide(false)} />
    </div>
  );
}
