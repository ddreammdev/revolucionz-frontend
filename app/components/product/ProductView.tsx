import {useState} from 'react';
import {Link} from 'react-router';
import {ChevronLeft, ChevronRight, Star, Home} from 'lucide-react';
import type {Product} from '~/lib/product-data';

interface ProductViewProps {
  product: Product;
}

export function ProductView({product}: ProductViewProps) {
  const [quantity, setQuantity] = useState(1);

  function decrease() {
    setQuantity((q) => Math.max(1, q - 1));
  }

  function increase() {
    setQuantity((q) => q + 1);
  }

  return (
    <div className="product-view">
      <header className="product-view-header">
        <Link to="/" className="product-view-back">
          <Home size={18} />
          Inicio
        </Link>
      </header>

      <div className="product-view-layout">
        <div className="product-view-info">
          <h1 className="product-view-name">{product.name}</h1>
          <p className="product-view-price">${product.price.toFixed(2)}</p>

          <div className="product-view-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={18}
                className={
                  star <= product.rating
                    ? 'product-view-star filled'
                    : 'product-view-star'
                }
              />
            ))}
            <span className="product-view-rating-text">
              <Star size={14} className="product-view-star-empty" />
              {product.ratingCount} valoraciones
            </span>
          </div>

          <div className="product-view-quantity">
            <button
              className="product-view-qty-btn"
              disabled={quantity <= 1}
              onClick={decrease}
            >
              <ChevronLeft size={20} />
            </button>
            <span className="product-view-qty-value">{quantity}</span>
            <button className="product-view-qty-btn" onClick={increase}>
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="product-view-details">
            <p className="product-view-description">{product.description}</p>

            <div className="product-view-benefits">
              <h3>Beneficios</h3>
              <ul>
                {product.benefits.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>

            <div className="product-view-meta">
              <div className="product-view-meta-item">
                <span className="product-view-meta-label">Formato</span>
                <span className="product-view-meta-value">{product.format}</span>
              </div>
              <div className="product-view-meta-item">
                <span className="product-view-meta-label">Categoría</span>
                <span className="product-view-meta-value">{product.category}</span>
              </div>
              <div className="product-view-meta-item">
                <span className="product-view-meta-label">Cómo usar</span>
                <span className="product-view-meta-value">{product.howToUse}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="product-view-image">
          <img src={product.img} alt={product.name} />
        </div>
      </div>
    </div>
  );
}
