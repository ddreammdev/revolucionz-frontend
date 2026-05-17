import {useState, useMemo} from 'react';
import {Link} from 'react-router';
import {Search, SlidersHorizontal} from 'lucide-react';

import {products} from '~/lib/product-data';

const categories = ['Quemadores', 'Salud', 'Vitaminas', 'Pre-Entreno'];

export function ProductCatalog() {
  const [search, setSearch] = useState('');
  const [priceMax, setPriceMax] = useState(45);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchPrice = p.price <= priceMax;
      const matchCat =
        selectedCategories.length === 0 ||
        selectedCategories.includes(p.category);
      return matchSearch && matchPrice && matchCat;
    });
  }, [search, priceMax, selectedCategories]);

  function toggleCategory(cat: string) {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  }

  return (
    <section id="productos" className="catalog">
      <div className="catalog-layout">
        <aside className="catalog-filters">
          <div className="catalog-filters-inner">
            <div className="catalog-filters-header">
              <SlidersHorizontal size={16} />
              <h3>Filtros</h3>
            </div>

            <div className="catalog-filter-group">
              <h4>Precio máximo</h4>
              <div className="catalog-price-range">
                <input
                  type="range"
                  min={20}
                  max={45}
                  step={1}
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                />
                <span className="catalog-price-value">${priceMax}</span>
              </div>
            </div>

            <div className="catalog-filter-group">
              <h4>Categoría</h4>
              {categories.map((cat) => (
                <label key={cat} className="catalog-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        <div className="catalog-main">
          <div className="catalog-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Buscar producto..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {filtered.length === 0 ? (
            <p className="catalog-empty">No se encontraron productos.</p>
          ) : (
            <div className="catalog-grid">
              {filtered.map((p) => (
                <Link key={p.id} to={`/productos/${p.slug}`} className="catalog-card">
                  <img src={p.img} alt={p.name} />
                  <h4>{p.name}</h4>
                  <span className="catalog-price">${p.price.toFixed(2)}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
