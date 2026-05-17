import {Await, Link} from 'react-router';
import {Suspense, useEffect, useId} from 'react';
import {Search, ShoppingCart, Menu, User, Package, Heart, CreditCard, MapPin, HelpCircle, ChevronRight, LogIn} from 'lucide-react';
import type {
  CartApiQueryFragment,
  FooterQuery,
  HeaderQuery,
} from 'storefrontapi.generated';
import {Aside} from '~/components/ui/Aside';
import {Footer} from '~/components/layout/Footer';
import {Header} from '~/components/layout/Header';
import {SmoothScrollProvider} from '~/lib/smooth-scroll';
import {CartMain} from '~/components/cart/CartMain';
import {
  SEARCH_ENDPOINT,
  SearchFormPredictive,
} from '~/components/search/SearchFormPredictive';
import {SearchResultsPredictive} from '~/components/search/SearchResultsPredictive';

interface PageLayoutProps {
  cart: Promise<CartApiQueryFragment | null>;
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
  children?: React.ReactNode;
}

export function PageLayout({
  cart,
  children = null,
  header,
  isLoggedIn,
  publicStoreDomain,
}: PageLayoutProps) {
  useEffect(() => {
    document.documentElement.classList.add('theme-ready');
  }, []);
  return (
    <SmoothScrollProvider>
      <Aside.Provider>
        <CartAside cart={cart} />
        <SearchAside />
        <MobileMenuAside />
        <AccountAside />
        {header && (
          <Header
            header={header}
            cart={cart}
            isLoggedIn={isLoggedIn}
            publicStoreDomain={publicStoreDomain}
          />
        )}
        <main>{children}</main>
        <Footer />
      </Aside.Provider>
    </SmoothScrollProvider>
  );
}

function CartAside({cart}: {cart: PageLayoutProps['cart']}) {
  return (
    <Aside type="cart" heading={<><ShoppingCart size={18} style={{marginRight: 8}} /> CART</>}>
      <Suspense fallback={<p>Loading cart ...</p>}>
        <Await resolve={cart}>
          {(cart) => {
            return <CartMain cart={cart} layout="aside" />;
          }}
        </Await>
      </Suspense>
    </Aside>
  );
}

function SearchAside() {
  const queriesDatalistId = useId();
  return (
    <Aside type="search" heading={<><Search size={18} style={{marginRight: 8}} /> SEARCH</>}>
      <div className="predictive-search">
        <br />
        <SearchFormPredictive>
          {({fetchResults, goToSearch, inputRef}) => (
            <>
              <input
                name="q"
                onChange={fetchResults}
                onFocus={fetchResults}
                placeholder="Search"
                ref={inputRef}
                type="search"
                list={queriesDatalistId}
              />
              &nbsp;
              <button onClick={goToSearch}>Search</button>
            </>
          )}
        </SearchFormPredictive>

        <SearchResultsPredictive>
          {({items, total, term, state, closeSearch}) => {
            const {articles, collections, pages, products, queries} = items;

            if (state === 'loading' && term.current) {
              return <div>Loading...</div>;
            }

            if (!total) {
              return <SearchResultsPredictive.Empty term={term} />;
            }

            return (
              <>
                <SearchResultsPredictive.Queries
                  queries={queries}
                  queriesDatalistId={queriesDatalistId}
                />
                <SearchResultsPredictive.Products
                  products={products}
                  closeSearch={closeSearch}
                  term={term}
                />
                <SearchResultsPredictive.Collections
                  collections={collections}
                  closeSearch={closeSearch}
                  term={term}
                />
                <SearchResultsPredictive.Pages
                  pages={pages}
                  closeSearch={closeSearch}
                  term={term}
                />
                <SearchResultsPredictive.Articles
                  articles={articles}
                  closeSearch={closeSearch}
                  term={term}
                />
                {term.current && total ? (
                  <Link
                    onClick={closeSearch}
                    to={`${SEARCH_ENDPOINT}?q=${term.current}`}
                  >
                    <p>
                      View all results for <q>{term.current}</q>
                      &nbsp; →
                    </p>
                  </Link>
                ) : null}
              </>
            );
          }}
        </SearchResultsPredictive>
      </div>
    </Aside>
  );
}

function MobileMenuAside() {
  const menuItems = [
    { label: 'Inicio', href: '/', icon: '🏠' },
    { label: 'Productos', href: '/products', icon: '💊' },
    { label: 'Colecciones', href: '/collections', icon: '📦' },
    { label: 'Blog', href: '/blogs', icon: '📖' },
    { label: 'Contacto', href: '/pages/contact', icon: '📞' },
  ];

  const categories = [
    { name: 'Suplementos', items: ['Vitaminas', 'Proteínas', 'Minerales'] },
    { name: 'Nutrición', items: ['Barras', 'Bebidas', 'Polvos'] },
    { name: 'Cuidado Personal', items: ['Piel', 'Cabello', 'Articulaciones'] },
  ];

  return (
    <Aside type="mobile" heading={<><Menu size={18} style={{marginRight: 8}} /> MENU</>}>
      <div className="mobile-menu-content">
        <nav className="mobile-menu-nav">
          {menuItems.map((item) => (
            <Link key={item.label} to={item.href} className="mobile-menu-item">
              <span className="mobile-menu-icon">{item.icon}</span>
              <span className="mobile-menu-label">{item.label}</span>
              <ChevronRight size={16} className="mobile-menu-arrow" />
            </Link>
          ))}
        </nav>

        <div className="mobile-menu-categories">
          <h4 className="mobile-menu-section-title">Categorías</h4>
          {categories.map((category) => (
            <div key={category.name} className="mobile-menu-category">
              <h5>{category.name}</h5>
              <ul>
                {category.items.map((item) => (
                  <li key={item}>
                    <Link to={`/collections/${item.toLowerCase()}`}>{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mobile-menu-promo">
          <div className="mobile-menu-promo-inner">
            <span className="promo-badge">ENVÍO GRÁTIS</span>
            <p>En pedidos superiores a $50</p>
          </div>
        </div>
      </div>
    </Aside>
  );
}

function AccountAside() {
  const accountLinks = [
    { icon: <User size={18} />, label: 'Mi Perfil', href: '/account/profile' },
    { icon: <Package size={18} />, label: 'Mis Pedidos', href: '/account/orders' },
    { icon: <Heart size={18} />, label: 'Lista de Deseos', href: '/account/wishlist' },
    { icon: <MapPin size={18} />, label: 'Direcciones', href: '/account/addresses' },
    { icon: <CreditCard size={18} />, label: 'Métodos de Pago', href: '/account/payment' },
    { icon: <HelpCircle size={18} />, label: 'Ayuda y Soporte', href: '/pages/contact' },
  ];

  const recentOrders = [
    { id: 'ORD-2024-001', date: '15 May 2024', total: '$89.99', status: 'Entregado' },
    { id: 'ORD-2024-002', date: '28 Abr 2024', total: '$124.50', status: 'Entregado' },
  ];

  return (
    <Aside type="account" heading={<><User size={18} style={{marginRight: 8}} /> MI CUENTA</>}>
      <div className="account-aside-content">
        <div className="account-user-section">
          <div className="account-avatar">
            <User size={32} />
          </div>
          <div className="account-user-info">
            <h4>Bienvenido</h4>
            <p>Inicia sesión para más opciones</p>
          </div>
          <button className="btn btn-primary account-login-btn">
            <LogIn size={16} />
            Iniciar Sesión
          </button>
        </div>

        <nav className="account-nav-menu">
          {accountLinks.map((link) => (
            <Link key={link.label} to={link.href} className="account-nav-item">
              <span className="account-nav-icon">{link.icon}</span>
              <span>{link.label}</span>
              <ChevronRight size={16} className="account-nav-arrow" />
            </Link>
          ))}
        </nav>

        <div className="account-recent-orders">
          <h4 className="account-section-title">Pedidos Recientes</h4>
          {recentOrders.map((order) => (
            <Link key={order.id} to={`/account/orders/${order.id}`} className="account-order-item">
              <div className="account-order-info">
                <span className="account-order-id">{order.id}</span>
                <span className="account-order-date">{order.date}</span>
              </div>
              <div className="account-order-meta">
                <span className="account-order-total">{order.total}</span>
                <span className="account-order-status">{order.status}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="account-promo-card">
          <div className="account-promo-inner">
            <h4>🎉 Membresía Premium</h4>
            <p>Obtén descuentos exclusivos y envío prioritario</p>
            <button className="btn btn-primary">Ver Planes</button>
          </div>
        </div>
      </div>
    </Aside>
  );
}
