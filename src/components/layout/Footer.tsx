import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, MapPin } from 'lucide-react';
import { UDC_SEDES } from '@/lib/utils';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#080a15] text-[#171a3d] dark:text-slate-100 font-aeonik transition-colors">
      {/* Main Footer Body */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Colophon */}
          <div className="md:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/udc-logo.png"
                alt="Universidad de Cartagena"
                className="h-10 w-auto object-contain drop-shadow-xs"
              />
              <div>
                <span className="font-extrabold text-xl text-[#171a3d] dark:text-white leading-none block tracking-tight">
                  UDC MARKETPLACE
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#ec8026] mt-0.5 block">
                  Comunidad Universitaria UDC
                </span>
              </div>
            </Link>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm font-normal leading-relaxed">
              Plataforma comunitaria de compraventa e intercambio para estudiantes y docentes de la Universidad de Cartagena. Libros, batas, calculadoras y tutorías mano a mano en tu campus.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="h-2 w-2 rounded-full bg-[#3da898] inline-block shadow-xs" />
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                Iniciativa Estudiantil · Cartagena de Indias
              </span>
            </div>
          </div>

          {/* Sedes / Claustros */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#171a3d] dark:text-white">
              Sedes & Claustros
            </h4>
            <div className="flex flex-col gap-2">
              {UDC_SEDES.map((sede) => (
                <Link
                  key={sede}
                  to={`/catalog?sede=${encodeURIComponent(sede)}`}
                  className="text-xs text-slate-600 dark:text-slate-400 hover:text-[#ec8026] dark:hover:text-[#ec8026] flex items-center gap-1.5 transition-colors"
                >
                  <MapPin className="h-3 w-3 text-[#ec8026]" />
                  <span>{sede}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Categorías Clave */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#171a3d] dark:text-white">
              Categorías
            </h4>
            <div className="flex flex-col gap-2 text-xs text-slate-600 dark:text-slate-400">
              <Link to="/catalog?category=Calculadoras%20y%20Tecnología" className="hover:text-[#ec8026] transition-colors">
                Tecnología & Calculadoras
              </Link>
              <Link to="/catalog?category=Libros%20y%20Fotocopias" className="hover:text-[#ec8026] transition-colors">
                Libros & Guías
              </Link>
              <Link to="/catalog?category=Uniformes%20y%20Batas" className="hover:text-[#ec8026] transition-colors">
                Batas & Uniformes
              </Link>
              <Link to="/catalog?category=Snacks%20y%20Alimentación" className="hover:text-[#ec8026] transition-colors">
                Snacks & Comida
              </Link>
              <Link to="/catalog?category=Servicios%20y%20Tutorías" className="hover:text-[#ec8026] transition-colors">
                Tutorías & Asesorías
              </Link>
            </div>
          </div>

          {/* Campus Safe Trade Card */}
          <div className="md:col-span-3">
            <div className="rounded-3xl bg-[#171a3d] dark:bg-[#11162e] border border-transparent dark:border-white/10 p-5 text-white space-y-3 shadow-elevation">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#ec8026]">
                  Entregas Seguras
                </span>
                <ShieldCheck className="h-4 w-4 text-[#3da898]" />
              </div>
              <h5 className="font-extrabold text-lg text-white leading-snug">
                En tu Propio Claustro
              </h5>
              <p className="text-xs text-slate-300 dark:text-slate-300 leading-relaxed font-normal">
                Coordina entregas personales en bibliotecas o cafeterías de tu facultad. Sin gastos de envío ni intermediarios.
              </p>
              <div className="pt-1">
                <Link
                  to="/catalog"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ec8026] hover:underline"
                >
                  <span>Explorar catálogo</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="mt-10 pt-6 border-t border-slate-100 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <p>© {new Date().getFullYear()} UDC Marketplace · Plataforma comunitaria no oficial</p>
          <div className="flex items-center gap-4">
            <Link to="/catalog" className="hover:text-[#ec8026] transition-colors">
              Catálogo General
            </Link>
            <span>·</span>
            <Link to="/catalog?create=true" className="hover:text-[#ec8026] transition-colors">
              Publicar Artículo
            </Link>
            <span>·</span>
            <span>Cartagena, Colombia</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
