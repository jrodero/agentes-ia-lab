import { Link } from 'react-router-dom';
import type { Product } from '../lib/types';
import { COLORS, CATEGORIES } from '../data/catalog';
import { money } from '../lib/format';
import { GarmentImage } from './GarmentImage';

export function ProductCard({ product, soldOut }: { product: Product; soldOut?: boolean }) {
  const color = product.colors[0];
  return (
    <article className="card">
      <Link to={`/producto/${product.slug}`} className="card-link">
        <div className="card-img">
          <GarmentImage garment={product.garment} color={color} design={product.design} text={product.defaultText ?? ''} placement={product.placement} view={product.placement === 'espalda' ? 'back' : 'front'} alt={`${product.name} en color ${COLORS[color].name}`} />
          {product.preorder && <span className="tag">Preventa</span>}
          {soldOut && <span className="tag tag-dark">Agotado</span>}
        </div>
        <div className="card-body">
          <span className="kicker">{CATEGORIES[product.category].name}</span>
          <h3>{product.name}</h3>
          <div className="card-foot">
            <span className="swatches" aria-label={`Colores: ${product.colors.map((c) => COLORS[c].name).join(', ')}`}>
              {product.colors.map((c) => <span key={c} className="swatch" style={{ background: COLORS[c].hex }} />)}
            </span>
            <strong>{money(product.price)}</strong>
          </div>
        </div>
      </Link>
    </article>
  );
}
