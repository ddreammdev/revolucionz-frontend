import {useEffect, useState} from 'react';
import {Sun, Moon} from 'lucide-react';

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch (_) {
      /* private browsing */
    }
  }

  return (
    <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme">
      <span className={`theme-toggle-icon${dark ? '' : ' active'}`}>
        <Sun size={16} />
      </span>
      <span className={`theme-toggle-icon${dark ? ' active' : ''}`}>
        <Moon size={16} />
      </span>
    </button>
  );
}
