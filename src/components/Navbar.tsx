import { useState } from 'react';
import type { NavItem, SectionId } from '../types/content';

interface NavbarProps {
  items: NavItem[];
  activeSection: SectionId;
}

export function Navbar({ items, activeSection }: NavbarProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = (): void => setIsOpen(false);

  return (
    <header className="site-header">
      <a href="#home" className="brand-mark" onClick={closeMenu}>
        PK
      </a>

      <div className="palette-hint" aria-hidden="true">
        <span>Press</span>
        <kbd>⌘ / Ctrl + K</kbd>
      </div>

      <button
        type="button"
        className="menu-toggle"
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span />
        <span />
      </button>

      <nav className={`site-nav ${isOpen ? 'open' : ''}`}>
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={closeMenu}
            className={activeSection === item.id ? 'active' : ''}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
