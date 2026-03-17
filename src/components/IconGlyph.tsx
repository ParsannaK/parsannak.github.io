import type { SocialIcon } from '../types/content';

interface IconGlyphProps {
  icon: SocialIcon;
}

export function IconGlyph({ icon }: IconGlyphProps): JSX.Element {
  if (icon === 'github') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.05c-3.34.73-4.04-1.43-4.04-1.43-.55-1.38-1.34-1.75-1.34-1.75-1.1-.74.08-.73.08-.73 1.21.09 1.85 1.24 1.85 1.24 1.08 1.84 2.84 1.31 3.54 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.31-5.47-5.9 0-1.3.47-2.36 1.24-3.19-.13-.3-.54-1.53.12-3.18 0 0 1-.32 3.3 1.22a11.5 11.5 0 0 1 6 0c2.3-1.54 3.3-1.22 3.3-1.22.66 1.65.25 2.88.12 3.18.77.83 1.24 1.89 1.24 3.19 0 4.6-2.8 5.6-5.48 5.9.43.37.82 1.08.82 2.18v3.23c0 .32.22.69.82.58A12 12 0 0 0 12 .5Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (icon === 'linkedin') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM2.75 9h4.46v12H2.75V9Zm7.02 0h4.27v1.64h.06c.59-1.12 2.04-2.3 4.2-2.3 4.49 0 5.32 2.95 5.32 6.78V21h-4.45v-5.15c0-1.23-.02-2.81-1.71-2.81-1.72 0-1.99 1.34-1.99 2.72V21H9.77V9Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M3.5 5.5h17A1.5 1.5 0 0 1 22 7v10a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 17V7a1.5 1.5 0 0 1 1.5-1.5Zm0 1.8v.28L12 13.1l8.5-5.53V7.3h-17Zm17 9.4V9.7L12.4 15a.75.75 0 0 1-.8 0L3.5 9.7v7h17Z"
        fill="currentColor"
      />
    </svg>
  );
}
