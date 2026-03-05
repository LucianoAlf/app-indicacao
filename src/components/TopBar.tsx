import { Settings, Moon, Sun } from 'lucide-react';
import { Theme } from '../types';

interface TopBarProps {
  title: string;
  subtitle: string;
  onToggleTheme: () => void;
  onOpenAdmin?: () => void;
  theme: Theme;
}

export default function TopBar({ title, subtitle, onToggleTheme, onOpenAdmin, theme }: TopBarProps) {
  return (
    <div className="top-bar">
      <div>
        <div className="screen-title-small">{subtitle}</div>
        <div className="top-bar-title">{title}</div>
      </div>
      <div className="top-bar-actions">
        {onOpenAdmin && (
          <button className="icon-btn" onClick={onOpenAdmin} title="Painel Admin">
            <Settings size={18} />
          </button>
        )}
        <button className="icon-btn" onClick={onToggleTheme}>
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </div>
  );
}
