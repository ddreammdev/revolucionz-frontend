import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import React, { useEffect, useId } from "react";
import { Search, ShoppingCart, Menu, User, Package, Heart, CreditCard, MapPin, HelpCircle, ChevronRight, LogIn, Home, Pill, Package2, BookOpen, Phone, FlaskConical, Coffee, Sparkles } from "lucide-react";
import { Link } from "react-router";

import type { Route } from "./+types/root";
import { SmoothScrollProvider } from "./lib/smooth-scroll";
import { Aside } from "~/components/ui";
import "./app.css";

export function links(): Route.LinkDescriptors {
  return [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Roboto:wght@300;400;500;700&display=swap",
    },
    { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
  ];
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <style dangerouslySetInnerHTML={{__html: `
          html, body {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          *, *::before, *::after {
            box-sizing: border-box;
          }
          html.lenis, html.lenis body {
            height: auto;
          }
          .lenis.lenis-smooth {
            scroll-behavior: auto !important;
          }
          .lenis.lenis-smooth [data-lenis-prevent] {
            overscroll-behavior: contain;
          }
          .lenis.lenis-stopped {
            overflow: hidden;
          }
          .lenis.lenis-scrolling iframe {
            pointer-events: none;
          }
        `}} />
        <title>Revolución Z</title>
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  useEffect(() => {
    document.documentElement.classList.add('theme-ready');
  }, []);

  return (
    <SmoothScrollProvider>
      <Aside.Provider>
        <SearchAside />
        <CartAside />
        <MobileMenuAside />
        <AccountAside />
        <Outlet />
      </Aside.Provider>
    </SmoothScrollProvider>
  );
}

function CartAside() {
  return (
    <Aside type="cart" heading={<><ShoppingCart size={22} /> CARRITO</>}>
      <div className="cart-empty-state">
        <ShoppingCart size={48} strokeWidth={1} />
        <p>Tu carrito está vacío</p>
        <Link to="/" className="btn btn-primary">Ver Productos</Link>
      </div>
    </Aside>
  );
}

function SearchAside() {
  const queriesDatalistId = useId();
  return (
    <Aside type="search" heading={<><Search size={18} style={{marginRight: 8}} /> BUSCAR</>}>
      <div className="predictive-search">
        <div className="predictive-search-form">
          <input
            name="q"
            placeholder="Buscar productos..."
            type="search"
            list={queriesDatalistId}
          />
        </div>
        <div className="search-suggestions">
          <p className="search-empty-msg">Escribe para buscar productos</p>
        </div>
      </div>
    </Aside>
  );
}

function MobileMenuAside() {
  const navItems = [
    { label: 'Inicio', href: '/', icon: <Home size={22} /> },
    { label: 'Productos', href: '/products', icon: <Pill size={22} /> },
    { label: 'Colecciones', href: '/collections', icon: <Package2 size={22} /> },
    { label: 'Suplementos', href: '/collections/suplementos', icon: <FlaskConical size={22} /> },
    { label: 'Nutrición', href: '/collections/nutricion', icon: <Coffee size={22} /> },
    { label: 'Cuidado Personal', href: '/collections/cuidado-personal', icon: <Sparkles size={22} /> },
    { label: 'Blog', href: '/blogs', icon: <BookOpen size={22} /> },
    { label: 'Contacto', href: '/pages/contact', icon: <Phone size={22} /> },
  ];

  return (
    <Aside type="mobile" heading={<><Menu size={22} /> MENU</>}>
      <div className="mobile-menu-content">
        <nav className="mobile-menu-nav">
          {navItems.map((item) => (
            <Link key={item.label} to={item.href} className="mobile-menu-item">
              <span className="mobile-menu-icon">{item.icon}</span>
              <span className="mobile-menu-label">{item.label}</span>
              <ChevronRight size={22} className="mobile-menu-arrow" />
            </Link>
          ))}
        </nav>
      </div>
    </Aside>
  );
}

function AccountAside() {
  const accountLinks = [
    { icon: <User size={22} />, label: 'Mi Perfil', href: '/account/profile' },
    { icon: <Package size={22} />, label: 'Mis Pedidos', href: '/account/orders' },
    { icon: <Heart size={22} />, label: 'Lista de Deseos', href: '/account/wishlist' },
    { icon: <MapPin size={22} />, label: 'Direcciones', href: '/account/addresses' },
    { icon: <CreditCard size={22} />, label: 'Métodos de Pago', href: '/account/payment' },
    { icon: <HelpCircle size={22} />, label: 'Ayuda y Soporte', href: '/pages/contact' },
  ];

  return (
    <Aside type="account" heading={<><User size={22} /> MI CUENTA</>}>
      <div className="account-aside-content">
        <div className="account-user-section">
          <div className="account-avatar">
            <User size={32} />
          </div>
          <div className="account-user-info">
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
              <ChevronRight size={22} className="account-nav-arrow" />
            </Link>
          ))}
        </nav>
      </div>
    </Aside>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main style={{padding: '4rem 2rem', maxWidth: '1280px', margin: '0 auto'}}>
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre style={{width: '100%', padding: '1rem', overflow: 'auto'}}>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
