import {useState, useEffect, useCallback} from 'react';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import img1 from '~/assets/carousel/powerz.webp';
import img2 from '~/assets/carousel/eroz.webp';
import img3 from '~/assets/carousel/detoxz.webp';
import img4 from '~/assets/carousel/divaz.webp';

const slides = [
  {src: img1, alt: 'PowerZ'},
  {src: img2, alt: 'Eroz'},
  {src: img3, alt: 'DetoxZ'},
  {src: img4, alt: 'Divaz'},
];

export function Carousel() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((i) => (i + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((i) => (i - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <section className="carousel-section">
      <div className="carousel-viewport">
        <div
          className="carousel-track"
          style={{transform: `translateX(-${current * 100}%)`}}
        >
          {slides.map((slide, i) => (
            <div className="carousel-slide" key={slide.alt}>
              <img src={slide.src} alt={slide.alt} />
            </div>
          ))}
        </div>
        <button
          className="carousel-btn carousel-btn-prev"
          onClick={prev}
          aria-label="Previous"
        >
          <ChevronLeft size={32} />
        </button>
        <button
          className="carousel-btn carousel-btn-next"
          onClick={next}
          aria-label="Next"
        >
          <ChevronRight size={32} />
        </button>
      </div>
      <div className="carousel-dots">
        {slides.map((_, i) => (
          <button
            key={slides[i].alt}
            className={`carousel-dot${i === current ? ' active' : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
