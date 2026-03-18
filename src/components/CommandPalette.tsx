import { useEffect, useMemo, useRef, useState } from 'react';

export interface PaletteCommand {
  id: string;
  title: string;
  description: string;
  action: () => void;
}

interface CommandPaletteProps {
  open: boolean;
  commands: PaletteCommand[];
  onClose: () => void;
}

export function CommandPalette({ open, commands, onClose }: CommandPaletteProps): JSX.Element | null {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredCommands = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return commands;

    return commands.filter(
      (command) =>
        command.title.toLowerCase().includes(normalizedQuery) ||
        command.description.toLowerCase().includes(normalizedQuery),
    );
  }, [commands, query]);

  useEffect(() => {
    if (!open) return;
    setQuery('');
    setActiveIndex(0);
    window.setTimeout(() => inputRef.current?.focus(), 0);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setActiveIndex((current) => (filteredCommands.length ? (current + 1) % filteredCommands.length : 0));
        return;
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setActiveIndex((current) =>
          filteredCommands.length ? (current - 1 + filteredCommands.length) % filteredCommands.length : 0,
        );
        return;
      }

      if (event.key === 'Enter') {
        event.preventDefault();
        const command = filteredCommands[activeIndex];
        if (!command) return;
        command.action();
        onClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeIndex, filteredCommands, onClose, open]);

  if (!open) return null;

  return (
    <div className="palette-overlay" onClick={onClose}>
      <div className="palette-panel" onClick={(event) => event.stopPropagation()}>
        <div className="palette-header">
          <span>Command Palette</span>
          <kbd>Esc</kbd>
        </div>
        <input
          ref={inputRef}
          className="palette-input"
          type="text"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveIndex(0);
          }}
          placeholder="Search commands..."
          aria-label="Search commands"
        />
        <div className="palette-list" role="listbox" aria-label="Available commands">
          {filteredCommands.length ? (
            filteredCommands.map((command, index) => (
              <button
                key={command.id}
                type="button"
                className={`palette-item ${index === activeIndex ? 'active' : ''}`}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => {
                  command.action();
                  onClose();
                }}
              >
                <strong>{command.title}</strong>
                <span>{command.description}</span>
              </button>
            ))
          ) : (
            <p className="palette-empty">No command matches this search.</p>
          )}
        </div>
      </div>
    </div>
  );
}
