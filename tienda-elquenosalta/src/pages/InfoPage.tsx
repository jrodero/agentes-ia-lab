import { useState, type FormEvent, type ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import { EMAIL_RE, useStore } from '../store/StoreContext';
import { SizeTable } from '../components/SizeGuide';
import { BRAND } from '../lib/brand';
import { money } from '../lib/format';
import { NotFound } from './NotFound';

export function InfoPage() {
  const { pagina } = useParams();
  const { settings } = useStore();

  const pages: Record<string, { title: string; body: ReactNode }> = {
    sobre: {
      title: `Sobre ${BRAND.name}`,
      body: (
        <>
          <p className="lead">«El que no salta…» es el grito que nos une en cualquier cancha y en cualquier bar del mundo. Hacemos ropa con diseño propio para la comunidad argentina en España y en Europa, y para quienes saltan siempre acompañados, también por su perro.</p>
          <p>Todos los diseños son originales y no usamos escudos, marcas ni camisetas oficiales. Estampamos cada pedido en España con transfer DTF, así no fabricamos de más ni acumulamos stock que acaba en la basura.</p>
          <p>Ahora mismo vendemos la línea <strong>Dos Patas</strong> (personas). La línea para perros está en fase de pruebas de patrón y tallas.</p>
        </>
      ),
    },
    envios: {
      title: 'Envíos y devoluciones',
      body: (
        <>
          <h2>Envíos</h2>
          <ul>
            <li>Península: {money(settings.shippingPrice)}. Gratis a partir de {money(settings.freeShippingFrom)}.</li>
            <li>Plazo: 3–5 días laborables desde la confirmación.</li>
            <li>Productos en preventa: se fabrican al cerrar el lote, unas 3 semanas.</li>
          </ul>
          <h2>Cambios y devoluciones</h2>
          <ul>
            <li>14 días naturales desde la entrega para prendas no personalizadas, sin usar y con etiqueta.</li>
            <li>Las prendas personalizadas se hacen a medida y no admiten devolución salvo defecto de fabricación.</li>
          </ul>
          <p className="note">Condiciones de demostración: antes de vender hay que revisarlas con asesoría legal.</p>
        </>
      ),
    },
    tallas: {
      title: 'Guía de tallas',
      body: (
        <>
          <p>Mide una prenda tuya que te quede bien, estirada sobre una mesa: ancho de axila a axila y largo desde el hombro.</p>
          <SizeTable garment="tee" />
          <SizeTable garment="over" />
          <SizeTable garment="hoodie" />
          <p className="note">Medidas orientativas (±2 cm), pendientes de confirmar con la ficha técnica de cada proveedor.</p>
        </>
      ),
    },
    cuidados: {
      title: 'Cuidados de la prenda',
      body: (
        <ul>
          <li>Lava del revés a 30 °C con colores parecidos.</li>
          <li>Sin suavizante y sin secadora: alargan la vida del estampado.</li>
          <li>Plancha del revés y nunca directamente sobre el estampado.</li>
          <li>Seca a la sombra; las sudaderas, mejor en horizontal.</li>
        </ul>
      ),
    },
    privacidad: {
      title: 'Privacidad y cookies',
      body: (
        <>
          <p>Esta demo no envía datos a ningún servidor. La cesta, los pedidos, los emails de la newsletter y los mensajes se guardan solo en el almacenamiento local de tu navegador (localStorage).</p>
          <p>Puedes borrarlos desde el <Link to="/admin">panel de administración</Link> («Restablecer datos de demo») o limpiando los datos del sitio en tu navegador.</p>
          <p>No usamos cookies de seguimiento ni de publicidad.</p>
        </>
      ),
    },
    contacto: { title: 'Contacto', body: <ContactForm /> },
  };

  const page = pagina ? pages[pagina] : undefined;
  if (!page) return <NotFound />;
  return (
    <div className="container section narrow prose">
      <nav className="crumbs" aria-label="Migas"><Link to="/">Inicio</Link> / <span>{page.title}</span></nav>
      <h1>{page.title}</h1>
      {page.body}
    </div>
  );
}

function ContactForm() {
  const { sendMessage } = useStore();
  const [f, setF] = useState({ name: '', email: '', text: '' });
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (f.name.trim().length < 2 || !EMAIL_RE.test(f.email.trim()) || f.text.trim().length < 10) {
      return setMsg({ ok: false, text: 'Completa tu nombre, un email válido y un mensaje de al menos 10 caracteres.' });
    }
    sendMessage({ name: f.name.trim(), email: f.email.trim(), text: f.text.trim() });
    setF({ name: '', email: '', text: '' });
    setMsg({ ok: true, text: 'Mensaje enviado. Lo verás en el panel de administración (demo).' });
  };
  return (
    <form className="checkout-form" onSubmit={submit} noValidate>
      <p>¿Dudas con una talla o un pedido personalizado? Escríbenos.</p>
      <div className="field"><label htmlFor="ct-name">Nombre</label><input id="ct-name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></div>
      <div className="field"><label htmlFor="ct-email">Email</label><input id="ct-email" type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></div>
      <div className="field"><label htmlFor="ct-text">Mensaje</label><textarea id="ct-text" rows={5} value={f.text} onChange={(e) => setF({ ...f, text: e.target.value })} /></div>
      <button className="btn" type="submit">Enviar mensaje</button>
      {msg && <p role="status" className={msg.ok ? 'ok' : 'err'}>{msg.text}</p>}
    </form>
  );
}
