import {Carousel} from '~/components/ui';
import {ProductCatalog} from '~/components/product';
import {HeroBackground} from '~/components/layout';
import {useLenis} from '~/lib/smooth-scroll';
import {Header} from '~/components/layout';
import {Footer} from '~/components/layout';

export function meta() {
  return [
    {title: 'RevolucionZ | Suplementos'},
    {name: 'description', content: 'Suplementos de alta calidad para potenciar tu rendimiento y alcanzar tus metas fitness.'},
  ];
}

export default function Homepage() {
  return (
    <div>
      <Header />
      <Hero />
      <div className="page-container">
        <Carousel />
        <ProductCatalog />
      </div>
      <Footer />
    </div>
  );
}

function Hero() {
  const {lenis} = useLenis();
  
  const handleScrollToProducts = () => {
    const productsSection = document.getElementById('productos');
    if (lenis && productsSection) {
      lenis.scrollTo(productsSection, {immediate: false});
    } else if (productsSection) {
      productsSection.scrollIntoView({behavior: 'smooth'});
    }
  };
  
  return (
    <section className="hero">
      <HeroBackground />
      <div className="hero-content">
        <h1 className="hero-title">REVOLUCIONA<br />TU ENTRENAMIENTO</h1>
        <p className="hero-desc">
          Suplementos de alta calidad para potenciar tu rendimiento y alcanzar tus metas fitness.
        </p>
        <button
          className="hero-btn"
          onClick={handleScrollToProducts}
        >
          EXPLORAR PRODUCTOS
        </button>
      </div>
    </section>
  );
}