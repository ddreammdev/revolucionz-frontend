import {Link} from 'react-router';
import logoSvg from '~/assets/logo-revolucionz.svg';
import {useLenis} from '~/lib/smooth-scroll';

export function Footer() {
  const lenis = useLenis();
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-logo">
          <img src={logoSvg} alt="Revolucionz" />
        </div>
        <div className="footer-col">
          <span className="footer-col-title">Enlaces</span>
          <Link
            to="/"
            onClick={() => lenis?.scrollTo(0)}
          >
            Inicio
          </Link>
          <button
            className="reset"
            onClick={() => lenis?.scrollTo('#productos')}
          >
            Productos
          </button>
        </div>
        <div className="footer-col">
          <span className="footer-col-title">Redes</span>
          <a
            href="https://facebook.com/revolucionz"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          <a
            href="https://instagram.com/revolucionz"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <a
            href="https://youtube.com/@revolucionz"
            target="_blank"
            rel="noopener noreferrer"
          >
            YouTube
          </a>
        </div>
      </div>
      <p className="footer-copyright">
        &copy; {year} REVOLUCIONZ. Todos los derechos reservados.
      </p>
    </footer>
  );
}
