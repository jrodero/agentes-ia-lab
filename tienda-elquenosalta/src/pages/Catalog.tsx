import { useMemo } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useStore } from '../store/StoreContext';
import { CATEGORIES, COLORS, DESIGNS } from '../data/catalog';
import { ProductCard } from '../components/ProductCard';
import type { Category, ColorId, DesignId, Product, Size } from '../lib/types';
import { NotFound } from './NotFound';

const ALL_SIZES: Size[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];

export function Catalog() {
  const { categoria } = useParams();
  const { products, orders, stockOf } = useStore();
  const [params, setParams] = useSearchParams();

  const category = categoria as Category | undefined;
  const isValid = !category || category in CATEGORIES;

  const f = {
    talla: params.get('talla') as Size | null,
    color: params.get('color') as ColorId | null,
    diseno: params.get('diseno') as DesignId | null,
    max: Number(params.get('max')) || 0,
    stock: params.get('stock') === '1',
    orden: params.get('orden') ?? 'destacados',
  };

  const set = (key: string, value: string | null) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const sold = useMemo(() => {
    const m = new Map<string, number>();
    for (const o of orders) for (const it of o.items) m.set(it.productId, (m.get(it.productId) ?? 0) + it.qty);
    return m;
  }, [orders]);

  const inStock = (p: Product, size?: Size | null, color?: ColorId | null) =>
    p.preorder || (color ? [color] : p.colors).some((c) => (size ? [size] : p.sizes).some((s) => stockOf(p.id, c, s) > 0));

  const list = useMemo(() => {
    let r = products.filter((p) => p.active && (!category || p.category === category));
    if (f.talla) r = r.filter((p) => p.sizes.includes(f.talla!));
    if (f.color) r = r.filter((p) => p.colors.includes(f.color!));
    if (f.diseno) r = r.filter((p) => p.design === f.diseno);
    if (f.max) r = r.filter((p) => p.price <= f.max);
    if (f.stock) r = r.filter((p) => inStock(p, f.talla, f.color));
    const sorted = [...r];
    if (f.orden === 'precio-asc') sorted.sort((a, b) => a.price - b.price);
    if (f.orden === 'precio-desc') sorted.sort((a, b) => b.price - a.price);
    if (f.orden === 'populares') sorted.sort((a, b) => (sold.get(b.id) ?? 0) - (sold.get(a.id) ?? 0));
    return sorted;
  }, [products, category, f.talla, f.color, f.diseno, f.max, f.stock, f.orden, sold]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!isValid) return <NotFound />;
  const title = category ? CATEGORIES[category].name : 'Ropa para personas';
  const activeFilters = ['talla', 'color', 'diseno', 'max', 'stock'].filter((k) => params.get(k));

  return (
    <div className="container section">
      <nav className="crumbs" aria-label="Migas"><Link to="/">Inicio</Link> / <Link to="/personas">Personas</Link>{category && <> / <span>{title}</span></>}</nav>
      <header className="page-head">
        <h1>{title}</h1>
        <p>{category ? CATEGORIES[category].blurb : 'Camisetas, premium orgánicas, oversize y sudaderas. Todo con diseño propio y estampado en España.'}</p>
        <div className="chips" role="list">
          <Link role="listitem" to={{ pathname: '/personas', search: params.toString() }} className={`chip ${!category ? 'on' : ''}`}>Todo</Link>
          {(Object.keys(CATEGORIES) as Category[]).map((c) => (
            <Link role="listitem" key={c} to={{ pathname: `/personas/${c}`, search: params.toString() }} className={`chip ${category === c ? 'on' : ''}`}>{CATEGORIES[c].name}</Link>
          ))}
        </div>
      </header>

      <div className="catalog">
        <aside className="filters" aria-label="Filtros">
          <fieldset>
            <legend>Talla</legend>
            <div className="opt-row">
              {ALL_SIZES.map((s) => (
                <button key={s} type="button" className={`opt ${f.talla === s ? 'on' : ''}`} aria-pressed={f.talla === s} onClick={() => set('talla', f.talla === s ? null : s)}>{s}</button>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>Color</legend>
            <div className="opt-row">
              {(Object.keys(COLORS) as ColorId[]).map((c) => (
                <button key={c} type="button" className={`color-opt ${f.color === c ? 'on' : ''}`} aria-pressed={f.color === c} title={COLORS[c].name} aria-label={COLORS[c].name} style={{ background: COLORS[c].hex }} onClick={() => set('color', f.color === c ? null : c)} />
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>Diseño</legend>
            <select value={f.diseno ?? ''} onChange={(e) => set('diseno', e.target.value || null)} aria-label="Diseño">
              <option value="">Todos</option>
              {(Object.keys(DESIGNS) as DesignId[]).map((d) => <option key={d} value={d}>{DESIGNS[d].name}</option>)}
            </select>
          </fieldset>
          <fieldset>
            <legend>Precio máximo</legend>
            <select value={f.max || ''} onChange={(e) => set('max', e.target.value || null)} aria-label="Precio máximo">
              <option value="">Sin límite</option><option value="25">Hasta 25 €</option><option value="35">Hasta 35 €</option><option value="50">Hasta 50 €</option>
            </select>
          </fieldset>
          <label className="check"><input type="checkbox" checked={f.stock} onChange={(e) => set('stock', e.target.checked ? '1' : null)} /> Solo con stock</label>
          {activeFilters.length > 0 && <button type="button" className="btn btn-ghost btn-sm" onClick={() => setParams(params.get('orden') ? { orden: params.get('orden')! } : {}, { replace: true })}>Quitar filtros</button>}
        </aside>

        <section aria-live="polite">
          <div className="list-bar">
            <span>{list.length} {list.length === 1 ? 'producto' : 'productos'}</span>
            <label>Ordenar por{' '}
              <select value={f.orden} onChange={(e) => set('orden', e.target.value === 'destacados' ? null : e.target.value)}>
                <option value="destacados">Destacados</option><option value="populares">Más vendidos</option><option value="precio-asc">Precio: menor a mayor</option><option value="precio-desc">Precio: mayor a menor</option>
              </select>
            </label>
          </div>
          {list.length === 0 ? (
            <div className="empty"><p>No hay productos con estos filtros.</p><button className="btn" onClick={() => setParams({}, { replace: true })}>Ver todos</button></div>
          ) : (
            <div className="grid-3">{list.map((p) => <ProductCard key={p.id} product={p} soldOut={!inStock(p)} />)}</div>
          )}
        </section>
      </div>
    </div>
  );
}
