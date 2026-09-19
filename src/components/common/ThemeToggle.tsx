import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const ThemeToggle: React.FC = () => {
  const [theme, setThemeState] = useState<'light' | 'dark' | 'system'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'light' | 'dark' | 'system') || 'system';
    }
    return 'system';
  });

  const [isDarkState, setIsDarkState] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      const isDark =
        theme === 'dark' || (theme === 'system' && mediaQuery.matches);
      setIsDarkState(isDark);
      if (isDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    applyTheme();
    localStorage.setItem('theme', theme);

    const listener = () => {
      if (theme === 'system') {
        applyTheme();
      }
    };

    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, [theme]);

  const toggleDirect = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="flex items-center gap-1">
      {/* 1-Click Direct Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleDirect}
        title={isDarkState ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        aria-label="Cambiar tema de color"
        className="h-9 w-9 rounded-full border border-slate-200 dark:border-white/15 bg-white dark:bg-[#11162e] text-[#171a3d] dark:text-amber-300 hover:bg-slate-50 dark:hover:bg-[#1a2042] shadow-2xs transition-all active:scale-95 relative overflow-hidden shrink-0"
      >
        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0 text-amber-500" />
        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100 text-sky-300" />
      </Button>

      {/* Dropdown Options */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="sr-only"
            aria-label="Opciones avanzadas de tema"
          >
            Opciones de tema
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[130px] rounded-2xl bg-white dark:bg-[#11162e] border border-slate-200 dark:border-white/15 shadow-lg p-1 font-aeonik text-xs">
          <DropdownMenuItem
            onClick={() => setThemeState('light')}
            className={`cursor-pointer rounded-xl px-2.5 py-1.5 font-bold ${
              theme === 'light' ? 'bg-[#fdf3eb] text-[#ec8026] dark:bg-orange-950/40' : 'text-[#171a3d] dark:text-slate-200'
            }`}
          >
            ☀️ Claro
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setThemeState('dark')}
            className={`cursor-pointer rounded-xl px-2.5 py-1.5 font-bold ${
              theme === 'dark' ? 'bg-[#fdf3eb] text-[#ec8026] dark:bg-orange-950/40' : 'text-[#171a3d] dark:text-slate-200'
            }`}
          >
            🌙 Oscuro
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setThemeState('system')}
            className={`cursor-pointer rounded-xl px-2.5 py-1.5 font-bold ${
              theme === 'system' ? 'bg-[#fdf3eb] text-[#ec8026] dark:bg-orange-950/40' : 'text-[#171a3d] dark:text-slate-200'
            }`}
          >
            💻 Sistema
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
