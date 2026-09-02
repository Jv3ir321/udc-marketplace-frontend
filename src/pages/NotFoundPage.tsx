import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingBag, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 space-y-4">
      <div className="h-20 w-20 rounded-3xl bg-blue-100 text-primary flex items-center justify-center">
        <ShoppingBag className="h-10 w-10" />
      </div>
      <h1 className="text-4xl font-extrabold text-foreground">404</h1>
      <p className="text-sm text-muted-foreground max-w-sm">
        La página que buscas no existe en el Marketplace de la Universidad de Cartagena.
      </p>
      <Button asChild variant="udc" className="rounded-full">
        <Link to="/">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver al Inicio
        </Link>
      </Button>
    </div>
  );
};
