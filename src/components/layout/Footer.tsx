import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  ArrowUpRight,
} from 'lucide-react';
import { UDC_SEDES } from '@/lib/utils';
import { SlushSticker } from '@/components/common/SlushSticker';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-[#171a3d]/20 bg-[#f4f6fa] text-[#171a3d] font-aeonik">
      {/* Top Banner with Orange & Student Community Accents */}
      <div className="border-b border-[#171a3d]/20 bg-[#ffffff] py-8 px-4 sm:px-8">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <SlushSticker type="grad" color="orange" label="UDC 1827" size="md" rotate={-3} />
            <SlushSticker type="check" color="teal" label="Entrega Segura" size="md" rotate={2} />
            <SlushSticker type="coin" color="orange" label="Sin Comisiones" size="md" rotate={-2} />
            <SlushSticker type="rocket" color="orange" label="Campus Directo" size="md" rotate={4} />
          </div>

          <Link
            to="/create"
            className="h-11 px-6 rounded-[1600px] border border-[#171a3d] bg-[#ec8026] text-[#ffffff] font-aeonik font-bold text-sm tracking-[0.032em] flex items-center gap-2 hover:bg-[#d97018] transition-transform active:scale-95 shadow-sm"
          >
            <span>Publicar en UDC Marketplace</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Colophon */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/udc-logo.png"
                alt="Universidad de Cartagena"
                className="h-12 w-auto object-contain"
              />
              <div>
                <span className="font-lateral text-3xl sm:text-4xl text-[#171a3d] leading-none uppercase block">
                  UDC MARKETPLACE
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#ec8026]">
                  Comunidad Estudiantil UDC
                </span>
              </div>
            </div>
            <p className="text-sm text-[#171a3d]/80 max-w-sm font-medium leading-relaxed">
              Plataforma comunitaria e independiente de compraventa e intercambio para estudiantes de la Universidad de Cartagena. Libros, batas, calculadoras y apuntes mano a mano.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ec8026] border border-[#171a3d] inline-block" />
              <span className="text-xs font-bold uppercase tracking-[0.032em] text-[#171a3d]">
                Iniciativa Independiente · Cartagena de Indias
              </span>
            </div>
          </div>

          {/* Sedes / Claustros */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="font-aeonik font-bold text-xs uppercase tracking-[0.032em] text-[#171a3d]">
              Claustros & Sedes UDC
            </h5>
            <div className="flex flex-col gap-1.5">
              {UDC_SEDES.map((sede) => (
                <Link
                  key={sede}
                  to={`/catalog?sede=${encodeURIComponent(sede)}`}
                  className="text-xs font-medium text-[#171a3d]/80 hover:text-[#ec8026] flex items-center gap-1.5 transition-colors"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ec8026]" />
                  <span>Campus {sede}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Secciones del Catálogo */}
          <div className="md:col-span-2 space-y-3">
            <h5 className="font-aeonik font-bold text-xs uppercase tracking-[0.032em] text-[#171a3d]">
              Categorías
            </h5>
            <div className="flex flex-col gap-1.5 text-xs font-medium text-[#171a3d]/80">
              <Link to="/catalog?category=Calculadoras%20y%20Tecnología" className="hover:text-[#ec8026]">
                Tecnología & Calculadoras
              </Link>
              <Link to="/catalog?category=Libros%20y%20Fotocopias" className="hover:text-[#ec8026]">
                Libros & Guías
              </Link>
              <Link to="/catalog?category=Uniformes%20y%20Batas" className="hover:text-[#ec8026]">
                Batas & Uniformes Clínicos
              </Link>
              <Link to="/catalog?category=Habitaciones%20y%20Alquiler" className="hover:text-[#ec8026]">
                Alojamiento Estudiantil
              </Link>
              <Link to="/catalog?category=Servicios%20y%20Tutorías" className="hover:text-[#ec8026]">
                Tutorías & Asesorías
              </Link>
            </div>
          </div>

          {/* Campus Safe Trade Card */}
          <div className="md:col-span-3">
            <div className="rounded-[20px] bg-[#171a3d] border border-[#171a3d] p-5 text-[#ffffff] space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-[0.032em] text-[#ec8026] block">
                  ENTREGAS SEGURAS
                </span>
                <ShieldCheck className="h-4 w-4 text-[#ec8026]" />
              </div>
              <p className="font-lateral text-2xl uppercase leading-none text-[#ffffff]">
                EN TU CLAUSTRO
              </p>
              <p className="text-[11px] font-medium text-[#ffffff]/80 leading-snug">
                Coordina la entrega personal en las bibliotecas y zonas comunes de los campus UDC. Sin gastos de envío.
              </p>
              <div className="pt-1">
                <Link
                  to="/catalog"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ec8026] hover:underline"
                >
                  <span>Explorar publicaciones</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="mt-12 pt-6 border-t border-[#171a3d]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold tracking-[0.032em] text-[#171a3d]">
          <p>© {new Date().getFullYear()} UDC MARKETPLACE · Plataforma comunitaria no oficial</p>
          <div className="flex items-center gap-4">
            <Link to="/catalog" className="underline hover:text-[#ec8026]">
              Catálogo General
            </Link>
            <span>·</span>
            <Link to="/create" className="underline hover:text-[#ec8026]">
              Crear Aviso
            </Link>
            <span>·</span>
            <span className="text-[#171a3d]/60">Cartagena, Colombia</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

