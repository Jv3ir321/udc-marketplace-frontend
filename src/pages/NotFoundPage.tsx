import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { SlushSticker } from '@/components/common/SlushSticker';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 space-y-4 font-aeonik text-[#171a3d]">
      <SlushSticker type="rocket" color="red" size="lg" rotate={-10} />
      <div className="space-y-1">
        <h1 className="text-6xl sm:text-7xl font-lateral uppercase text-[#171a3d] leading-none">
          404 · EXTRAVIADO
        </h1>
        <p className="text-xs text-[#171a3d]/70 font-medium max-w-sm">
          La página que buscas no existe o ha sido movida en UDC Marketplace.
        </p>
      </div>
      <Button asChild size="sm" className="h-10 px-6 text-xs font-bold rounded-[1600px] bg-[#171a3d] hover:bg-[#252a5c] text-[#ffffff] border border-[#171a3d]">
        <Link to="/">
          <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
          Volver al Inicio
        </Link>
      </Button>
    </div>
  );
};
