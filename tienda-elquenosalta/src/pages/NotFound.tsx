import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="container section empty-page">
      <span className="kicker">Error 404</span>
      <h1>Esta página se ha ido de paseo</h1>
      <p>No encontramos lo que buscas. Puede que el enlace esté mal escrito o que el producto ya no esté disponible.</p>
      <div className="actions"><Link to="/" className="btn">Ir al inicio</Link><Link to="/personas" className="btn btn-ghost">Ver la colección</Link></div>
    </div>
  );
}
