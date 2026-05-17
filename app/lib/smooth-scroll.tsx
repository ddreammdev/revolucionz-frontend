import {createContext, useContext, useEffect, useState} from 'react';
import Lenis from 'lenis';

interface LenisContextValue {
  lenis: Lenis | null;
  isReady: boolean;
}

const LenisContext = createContext<LenisContextValue>({lenis: null, isReady: false});

export function SmoothScrollProvider({children}: {children: React.ReactNode}) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const instance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      smooth: true,
    });

    function raf(time: number) {
      instance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    setLenis(instance);
    setIsReady(true);

    return () => {
      instance.destroy();
      setLenis(null);
      setIsReady(false);
    };
  }, []);

  return (
    <LenisContext.Provider value={{lenis, isReady}}>
      {children}
    </LenisContext.Provider>
  );
}

export function useLenis() {
  return useContext(LenisContext);
}
