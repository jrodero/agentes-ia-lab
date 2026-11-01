import { useMemo, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/StoreContext';
import { CATEGORIES, DESIGNS } from '../data/catalog';
import { ProductCard } from '../components/ProductCard';
import { GarmentImage } from '../components/GarmentImage';
import { BRAND } from '../lib/brand';
import type { Category, DesignId } from '../lib/types';

const FEATURED: { design: DesignId; bg: string }[] = [
  { design: 'paseo', bg: '#DCE3D3' },
  { design: 'ladoA', bg: '#EDE3D2' },
  { design: 'equipo', bg: '#E4E7EE' },
  { design: 'miYunta', bg: '#F6E7C8' },
];

export function Home() {
  const { products, orders } = useStore();
  const active = products.filter((p) => p.active);

  // Productos populares: los más vendidos según los pedidos guardados.
  const popular = useMemo(() => {
    const sold = new Map<string, number>();
    for (const o of orders) if (o.status !== 'cancelado') for (const it of o.items) sold.set(it.productId, (sold.get(it.productId) ?? 0) + it.qty);
    return [...active].sort((a, b) => (sold.get(b.id) ?? 0) - (sold.get(a.id) ?? 0)).slice(0, 4);
  }, [orders, active]);

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="kicker">Colección 01 · Invierno 2026–27</span>
            <h1>Ropa con diseño propio, <em>hecha para ir juntos.</em></h1>
            <p className="lead">Camisetas, oversize y sudaderas con ilustraciones originales, estampadas en España pedido a pedido y personalizables con el nombre que tú quieras.</p>
            <div className="actions">
              <Link to="/personas" className="btn">Ver la colección</Link>
              <Link to="/personalizar" className="btn btn-ghost">Personalizar una prenda</Link>
            </div>
          </div>
          <div className="hero-art">
            <GarmentImage garment="hoodie" color="tinta" design="equipo" text="Equipo Tofu" placement="pecho" view="front" alt="Sudadera Equipo 02 en color tinta" className="hero-main" />
            <GarmentImage garment="tee" color="mostaza" design="miYunta" text="Tofu" placement="pecho" view="front" alt="Camiseta Mi yunta en color mostaza" className="hero-side" />
          </div>
        </div>
      </section>

      <section className="section container brand-intro">
        <div>
          <span className="kicker">Qué es {BRAND.name}</span>
          <h2>Una yunta son dos que avanzan al mismo paso.</h2>
        </div>
        <div className="intro-points">
          <p><strong>Diseño propio.</strong> Ilustraciones y tipografías creadas para la marca, nada de licencias ni imágenes de banco.</p>
          <p><strong>Estampado en España.</strong> Imprimimos cada pedido con transfer DTF: tiradas cortas, sin stock muerto.</p>
          <p><strong>Personalizable.</strong> Nombre, equipo o tu frase sin coste de prenda adicional en los modelos marcados.</p>
        </div>
      </section>

      <section className="section container" aria-labelledby="colecciones">
        <div className="section-head"><h2 id="colecciones">Colecciones destacadas</h2><Link to="/personas">Ver todo →</Link></div>
        <div className="grid-4">
          {FEATURED.map(({ design, bg }) => {
            const sample = active.find((p) => p.design === design);
            return (
              <Link key={design} to={`/personas?diseno=${design}`} className="collection" style={{ background: bg }}>
                {sample && <GarmentImage garment={sample.garment} color={sample.colors[0]} design={design} text={sample.defaultText ?? ''} placement={sample.placement} view={sample.placement === 'espalda' ? 'back' : 'front'} alt="" />}
                <div><h3>{DESIGNS[design].name}</h3><p>{DESIGNS[design].blurb}</p></div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section container" aria-labelledby="populares">
        <div className="section-head"><h2 id="populares">Lo más vendido</h2><Link to="/personas?orden=populares">Ver más →</Link></div>
        <div className="grid-4">{popular.map((p) => <ProductCard key={p.id} product={p} />)}</div>
      </section>

      <section className="section container" aria-labelledby="categorias">
        <h2 id="categorias">Compra por tipo de prenda</h2>
        <div className="grid-4 cats">
          {(Object.keys(CATEGORIES) as Category[]).map((c) => (
            <Link key={c} to={`/personas/${c}`} className="cat"><h3>{CATEGORIES[c].name}</h3><p>{CATEGORIES[c].blurb}</p><span>Ver {CATEGORIES[c].name.toLowerCase()} →</span></Link>
          ))}
        </div>
      </section>

      <section className="band" aria-labelledby="perso">
        <div className="container band-grid">
          <div>
            <span className="kicker">Personalizador</span>
            <h2 id="perso">Elige prenda, color y diseño. Añade el nombre. Míralo antes de comprar.</h2>
            <p>El precio se calcula al momento: la personalización con texto cuesta 3 € en los modelos que no la incluyen.</p>
            <Link to="/personalizar" className="btn btn-light">Abrir el personalizador</Link>
          </div>
          <GarmentImage garment="tee" color="hueso" design="ladoA" text="Tu nombre" placement="pecho" view="front" alt="Ejemplo de camiseta personalizada Lado A" className="band-art" />
        </div>
      </section>

      <section className="section container soon">
        <span className="kicker">Próximamente</span>
        <h2>La línea Cuatro Patas está en camino.</h2>
        <p>Estamos probando patrones y tallas con perros de verdad antes de lanzar la ropa a juego para ellos. Si quieres enterarte el primero, apúntate a la newsletter.</p>
      </section>

      <Newsletter />
    </>
  );
}

function Newsletter() {
  const { subscribe } = useStore();
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const r = subscribe(email);
    setMsg(r.ok ? { ok: true, text: '¡Listo! Tu código de bienvenida es BIENVENIDA10 (10 % en tu primer pedido).' } : { ok: false, text: r.error });
    if (r.ok) setEmail('');
  };
  return (
    <section className="newsletter" id="newsletter" aria-labelledby="nl">
      <div className="container nl-inner">
        <div><h2 id="nl">Únete a la yunta</h2><p>Novedades, preventas y un 10 % de bienvenida. Un email al mes, como mucho.</p></div>
        <form onSubmit={submit} className="nl-form" noValidate>
          <label htmlFor="nl-email" className="sr-only">Email</label>
          <input id="nl-email" type="email" placeholder="tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <button className="btn" type="submit">Suscribirme</button>
          {msg && <p role="status" className={msg.ok ? 'ok' : 'err'}>{msg.text}</p>}
        </form>
      </div>
    </section>
  );
}
