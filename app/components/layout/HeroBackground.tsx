import {useRef, useEffect} from 'react';

const COLS = 28;
const GAP = 8;
const BLINK_INTERVAL = 2800;

export function HeroBackground() {
  const outerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const hasMovedRef = useRef(false);

  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;

    let rect = bg.getBoundingClientRect();
    const mouse = {x: -9999, y: -9999};

    const updateLight = () => {
      bg.style.setProperty('--mx', `${mouse.x - rect.left}px`);
      bg.style.setProperty('--my', `${mouse.y - rect.top}px`);
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!hasMovedRef.current) {
        hasMovedRef.current = true;
        bg.style.opacity = '1';
      }
      updateLight();
    };

    const onScroll = () => {
      rect = bg.getBoundingClientRect();
      updateLight();
    };

    window.addEventListener('mousemove', onMove, {passive: true});
    window.addEventListener('scroll', onScroll, {passive: true});
    window.addEventListener('resize', onScroll, {passive: true});

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    const grid = gridRef.current;
    const outer = outerRef.current;
    if (!grid || !outer) return;

    function build(g: HTMLDivElement, o: HTMLDivElement) {
      while (g.firstChild) g.removeChild(g.firstChild);

      const oRect = o.getBoundingClientRect();
      const gridW = oRect.width * 2;
      const gridH = oRect.height * 2;
      const cellW = (gridW - (COLS - 1) * GAP) / COLS;
      if (cellW < GAP) return;
      g.style.gridTemplateColumns = `repeat(${COLS}, 1fr)`;
      g.style.gridAutoRows = `${cellW}px`;
      const rows = Math.ceil((gridH + GAP) / (cellW + GAP));
      const total = COLS * rows;

      for (let i = 0; i < total; i++) {
        const cell = document.createElement('div');
        cell.className = 'hero-grid-cell';
        g.appendChild(cell);
      }
    }

    build(grid, outer);

    const ro = new ResizeObserver(() => build(grid, outer));
    ro.observe(outer);

    return () => {
      ro.disconnect();
      while (grid.firstChild) grid.removeChild(grid.firstChild);
    };
  }, []);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const root = document.documentElement;
    const resolvedPrimary =
      getComputedStyle(root).getPropertyValue('--color-primary-400').trim() ||
      '#3ef0be';

    const id = setInterval(() => {
      const cells = Array.from(grid.querySelectorAll('.hero-grid-cell'));
      if (cells.length === 0) return;

      const available = cells.filter(
        (c) => !(c as HTMLDivElement).dataset.blinking,
      );
      if (available.length === 0) return;

      const count = Math.min(
        Math.floor(Math.random() * 5) + 10,
        available.length,
      );

      for (let i = 0; i < count; i++) {
        const idx = Math.floor(Math.random() * available.length);
        const cell = available.splice(idx, 1)[0] as HTMLDivElement;

        cell.dataset.blinking = 'true';

        cell.style.transition = 'none';
        cell.style.removeProperty('background-color');

        void cell.offsetHeight;

        cell.style.transition = 'background-color 0.5s ease';
        cell.style.backgroundColor = resolvedPrimary;

        setTimeout(() => {
          cell.style.removeProperty('background-color');
          cell.style.transition = 'background-color 2.5s ease-out';
        }, 500);

        setTimeout(() => {
          cell.style.removeProperty('transition');
          delete cell.dataset.blinking;
        }, 3000);
      }
    }, BLINK_INTERVAL);

    return () => clearInterval(id);
  }, []);

  return (
    <div ref={outerRef} className="hero-grid-outer">
      <div ref={bgRef} className="hero-grid-bg" />
      <div className="hero-grid-center">
        <div ref={gridRef} className="hero-grid" />
      </div>
    </div>
  );
}
