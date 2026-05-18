import {useRef, useEffect, useState} from 'react';
import {NavLink} from 'react-router';
import {useLenis} from '~/lib/smooth-scroll';
import {Menu, ShoppingCart, User} from 'lucide-react';
import logoSvg from '~/assets/logo-revolucionz.svg';
import {ThemeToggle} from '~/components/ui';
import {useAside} from '~/components/ui/Aside';

export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [hidden, setHidden] = useState(false);
  const {lenis, isReady} = useLenis();
  const {open} = useAside();

  useEffect(() => {
    if (!isReady || !lenis) return;
    
    const VELOCITY_THRESHOLD = 15;

    function onLenisScroll({
      scroll,
      velocity,
      direction,
    }: {
      scroll: number;
      velocity: number;
      direction: number;
    }) {
      if (direction === 1 && scroll > 80 && velocity > VELOCITY_THRESHOLD) {
        setHidden(true);
      } else if (direction === -1) {
        setHidden(false);
      }
    }

    lenis.on('scroll', onLenisScroll);
    return () => lenis.off('scroll', onLenisScroll);
  }, [lenis, isReady]);

  const handleScrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, {immediate: false});
    } else {
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  };

  const handleScrollToProducts = () => {
    const productsSection = document.getElementById('productos');
    if (lenis && productsSection) {
      lenis.scrollTo(productsSection, {immediate: false});
    } else if (productsSection) {
      productsSection.scrollIntoView({behavior: 'smooth'});
    }
  };

  return (
    <header ref={headerRef} className={`header${hidden ? ' header-hidden' : ''}`}>
      <div className="header-inner">
        <NavLink prefetch="intent" to="/" className="header-logo" end>
          <img src={logoSvg} alt="Revolucionz" />
        </NavLink>
        <nav className="header-menu-desktop" role="navigation">
          <button
            className="header-menu-item reset"
            onClick={handleScrollToTop}
          >
            Inicio
          </button>
          <button
            className="header-menu-item reset"
            onClick={handleScrollToProducts}
          >
            Productos
          </button>
        </nav>
        <nav className="header-ctas" role="navigation">
          <button 
            className="header-icon-btn reset" 
            onClick={() => open('cart')}
            aria-label="Abrir carrito"
          >
            <ShoppingCart size={22} strokeWidth={2} />
          </button>
          <button 
            className="header-icon-btn reset" 
            onClick={() => open('account')}
            aria-label="Abrir cuenta"
          >
            <User size={22} strokeWidth={2} />
          </button>
          <ThemeToggle />
          <button 
            className="header-icon-btn reset" 
            onClick={() => open('mobile')}
            aria-label="Abrir menú"
          >
            <Menu size={22} strokeWidth={2} />
          </button>
        </nav>
      </div>
    </header>
  );
}