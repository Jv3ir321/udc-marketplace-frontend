import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, MapPin } from 'lucide-react';
import { UDC_SEDES } from '@/lib/utils';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 ">
      {/* Safety Banner */}
      <div className="bg-stone-950 border-b border-stone-800/80 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-orange-500/15 text-orange-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Consejo de Seguridad Universitaria</h4>
              <p className="text-xs text-stone-400">
                Realiza tus entregas e intercambios siempre dentro de los campus de la UDC o lugares concurridos.
              </p>
            </div>
          </div>
          <Link
            to="/register"
            className="text-xs text-orange-400 hover:text-orange-300 font-semibold underline underline-offset-2 shrink-0"
          >
            Únete con tu correo institucional →
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-2xl bg-white p-1 flex items-center justify-center shadow-md shadow-orange-500/10 border border-orange-200/80 shrink-0">
                <img
                  src="/udc-logo.png"
                  alt="Logo Universidad de Cartagena"
                  className="h-full w-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/favicon.svg';
                  }}
                />
              </div>
              <span className="font-bold text-lg text-white">UDC Marketplace</span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Plataforma comunitaria para la compra, venta, alquiler e intercambio de bienes y servicios académicos entre estudiantes, profesores y egresados de la Universidad de Cartagena.
            </p>
          </div>

          {/* Sedes */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-orange-400">Sedes Universitarias</h5>
            <ul className="space-y-2 text-xs text-stone-400">
              {UDC_SEDES.slice(0, 5).map((sede) => (
                <li key={sede} className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <MapPin className="h-3 w-3 text-orange-500" />
                  <span>Campus {sede}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-orange-400">Categorías Populares</h5>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><Link to="/" className="hover:text-white transition-colors">Calculadoras & Tecnología</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Batas de Laboratorio & Uniformes</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Libros de Cálculo & Medicina</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Habitaciones & Residencias Estudiantiles</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Tutorías & Clases Particulares</Link></li>
            </ul>
          </div>

          {/* Fast Links */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-orange-400">Acceso Rápido</h5>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><Link to="/login" className="hover:text-white transition-colors">Iniciar Sesión</Link></li>
              <li><Link to="/register" className="hover:text-white transition-colors">Crear Cuenta Estudiantil</Link></li>
              <li><Link to="/create" className="hover:text-white transition-colors">Publicar un Anuncio</Link></li>
              <li><Link to="/my-posts" className="hover:text-white transition-colors">Administrar Mis Anuncios</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} UDC Marketplace - Universidad de Cartagena.</p>
        </div>
      </div>
    </footer>
  );
};
