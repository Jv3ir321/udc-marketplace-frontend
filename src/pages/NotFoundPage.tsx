import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Compass } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 space-y-4 font-aeonik text-[#171a3d] dark:text-[#e2e8f0] transition-colors duration-300">
      <div className="h-16 w-16 rounded-3xl bg-slate-100 dark:bg-[#161b38] flex items-center justify-center border border-slate-200/60 dark:border-white/10 text-[#ec8026] shadow-subtle">
        <Compass className="h-8 w-8" />
      </div>
      <div className="space-y-1">
        <h1 className="text-4xl sm:text-5xl font-black uppercase text-[#171a3d] dark:text-white tracking-tight">
          404 · Página no encontrada
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal max-w-sm">
          La sección o publicación que buscas no existe o fue retirada de UDC Marketplace.
        </p>
      </div>
      <Button asChild size="default" variant="navy" className="rounded-full px-6 text-xs font-bold shadow-subtle hover:shadow-elevation">
        <Link to="/">
          <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
          Volver al Inicio
        </Link>
      </Button>
    </div>
  );
};
