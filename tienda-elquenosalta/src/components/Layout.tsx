import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useStore } from '../store/StoreContext';
import { CATEGORIES } from '../data/catalog';
import type { Category } from '../lib/types';
import { money } from '../lib/format';
import { BRAND } from '../lib/brand';

export function Layout() {
  const { cartCount, settings } = useStore();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <a href="#contenido" className="skip">Saltar al contenido</a>
      <div className="topbar mono">Envío gratis desde {money(settings.freeShippingFrom)} · Estampado en España · Demo sin pagos reales</div>
      <header className="header">
        <div className="container header-inner">
          <Link to="/" className="brand" aria-label={`${BRAND.name}, ir al inicio`}>
            <img src={BRAND.logo} alt={BRAND.name} height={34} />
          </Link>
          <button className="menu-btn" aria-expanded={open} aria-controls="nav" onClick={() => setOpen((o) => !o)}>
            {open ? 'Cerrar' : 'Menú'}
          </button>
          <nav id="nav" className={`nav ${open ? 'open' : ''}`} aria-label="Principal">
            <NavLink to="/personas" end>Personas</NavLink>
            {(Object.keys(CATEGORIES) as Category[]).map((c) => (
              <NavLink key={c} to={`/personas/${c}`} className="nav-sub">{CATEGORIES[c].name}</NavLink>
            ))}
            <NavLink to="/personalizar" className="nav-accent">Personalizar</NavLink>
          </nav>
          <Link to="/carrito" className="cart-link" aria-label={`Carrito, ${cartCount} productos`}>
            Cesta <span className="badge">{cartCount}</span>
          </Link>
        </div>
      </header>
      <main id="contenido">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <img src={BRAND.logoNegative} alt={BRAND.name} height={36} />
          <p className="footer-claim">{BRAND.claim}. Ropa con diseño propio, estampada en España pedido a pedido.</p>
        </div>
        <div>
          <h3>Tienda</h3>
          <Link to="/personas">Todo Personas</Link>
          <Link to="/personas/camisetas">Camisetas</Link>
          <Link to="/personas/oversize">Oversize</Link>
          <Link to="/personas/sudaderas">Sudaderas</Link>
          <Link to="/personalizar">Personalizar</Link>
        </div>
        <div>
          <h3>Ayuda</h3>
          <Link to="/info/envios">Envíos y devoluciones</Link>
          <Link to="/info/tallas">Guía de tallas</Link>
          <Link to="/info/cuidados">Cuidados de la prenda</Link>
          <Link to="/info/contacto">Contacto</Link>
        </div>
        <div>
          <h3>{BRAND.name}</h3>
          <Link to="/info/sobre">Sobre nosotros</Link>
          <Link to="/info/privacidad">Privacidad y cookies</Link>
          <Link to="/admin">Panel de administración</Link>
        </div>
      </div>
      <div className="container footer-legal mono">© {new Date().getFullYear()} {BRAND.name} · Demo funcional: no se procesan pagos ni se envían pedidos reales.</div>
    </footer>
  );
}
