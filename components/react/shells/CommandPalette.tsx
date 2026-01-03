/**
 * CommandPalette - Universal Command Palette Component
 * 
 * Purpose: Quick actions, navigation, and commands (Cmd/Ctrl+K)
 * 
 * Features:
 * - Search commands
 * - Keyboard navigation
 * - Command categories
 * - Recent commands
 * - Custom commands
 */

'use client';

import React from 'react';

export interface Command {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  category?: string;
  keywords?: string[];
  action: () => void;
  shortcut?: string;
}

export interface CommandPaletteProps {
  /** Whether palette is open */
  open: boolean;
  /** Close handler */
  onClose: () => void;
  /** Available commands */
  commands: Command[];
  /** Show search input */
  showSearch?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Max height */
  maxHeight?: string;
}

/**
 * CommandPalette - Universal command palette
 * 
 * Provides a searchable command interface for quick actions.
 * 
 * @example
 * ```tsx
 * <CommandPalette
 *   open={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   commands={[
 *     { id: '1', label: 'Go to Dashboard', action: () => navigate('/dashboard') },
 *     { id: '2', label: 'Create Item', action: () => handleCreate() },
 *   ]}
 * />
 * ```
 */
export const CommandPalette = React.memo(function CommandPalette({
  open,
  onClose,
  commands,
  showSearch = true,
  placeholder = 'Type a command or search...',
  maxHeight = 'max-h-96',
}: CommandPaletteProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);

  // Filter commands based on search
  const filteredCommands = React.useMemo(() => {
    if (!searchQuery.trim()) return commands;

    const query = searchQuery.toLowerCase();
    return commands.filter(cmd => {
      const matchesLabel = cmd.label.toLowerCase().includes(query);
      const matchesDescription = cmd.description?.toLowerCase().includes(query);
      const matchesKeywords = cmd.keywords?.some(kw => kw.toLowerCase().includes(query));
      return matchesLabel || matchesDescription || matchesKeywords;
    });
  }, [commands, searchQuery]);

  // Group commands by category
  const groupedCommands = React.useMemo(() => {
    const groups = new Map<string, Command[]>();
    filteredCommands.forEach(cmd => {
      const category = cmd.category || 'Other';
      if (!groups.has(category)) {
        groups.set(category, []);
      }
      groups.get(category)!.push(cmd);
    });
    return groups;
  }, [filteredCommands]);

  // Reset selection when search changes
  React.useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  // Auto-focus input when open
  React.useEffect(() => {
    if (open && inputRef.current) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Keyboard navigation
  React.useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, filteredCommands.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selectedCommand = filteredCommands[selectedIndex];
        if (selectedCommand) {
          selectedCommand.action();
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose, filteredCommands, selectedIndex]);

  // Scroll selected item into view
  React.useEffect(() => {
    if (listRef.current && selectedIndex >= 0) {
      const selectedElement = listRef.current.children[selectedIndex] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [selectedIndex]);

  // Prevent body scroll when open
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-void/80 backdrop-blur-sm z-[300] flex items-start justify-center pt-32"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="command-palette-title"
    >
      <div
        className="na-card p-4 w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        {showSearch && (
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={placeholder}
            className="na-input w-full mb-4"
            autoFocus
          />
        )}

        {/* Commands List */}
        <div
          ref={listRef}
          className={`space-y-2 overflow-y-auto ${maxHeight}`}
        >
          {Array.from(groupedCommands.entries()).map(([category, categoryCommands]) => (
            <div key={category}>
              {groupedCommands.size > 1 && (
                <div className="na-metadata px-4 py-2 text-clay">
                  {category}
                </div>
              )}
              {categoryCommands.map((cmd, index) => {
                const globalIndex = filteredCommands.indexOf(cmd);
                const isSelected = globalIndex === selectedIndex;

                return (
                  <button
                    key={cmd.id}
                    onClick={() => {
                      cmd.action();
                      onClose();
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      isSelected
                        ? 'bg-paper-2 border-l-2 border-primary text-lux'
                        : 'text-lux-dim hover:bg-paper-2'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {cmd.icon && <span>{cmd.icon}</span>}
                      <div className="flex-1">
                        <div className="na-h6">{cmd.label}</div>
                        {cmd.description && (
                          <div className="na-metadata-small mt-1">{cmd.description}</div>
                        )}
                      </div>
                      {cmd.shortcut && (
                        <kbd className="px-2 py-1 text-xs bg-paper-2 rounded border border-stroke">
                          {cmd.shortcut}
                        </kbd>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
          {filteredCommands.length === 0 && (
            <div className="na-metadata text-center py-8 text-clay">
              No commands found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.open === nextProps.open &&
    prevProps.commands === nextProps.commands &&
    prevProps.showSearch === nextProps.showSearch &&
    prevProps.placeholder === nextProps.placeholder
  );
});

