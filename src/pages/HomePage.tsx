import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMarketplace } from '@/context/MarketplaceContext';
import { BentoCard } from '@/components/marketplace/BentoCard';
import { PageTransition } from '@/components/common/PageTransition';
import { SlowSlide } from '@/components/common/SlowSlide';
import { Input } from '@/components/ui/input';
import {
  ArrowRight,
  Search,
  MapPin,
  ArrowUp,
  Plus,
  CheckCircle2,
  BookOpen,
  Building2,
} from 'lucide-react';
import { CATEGORIAS_PRODUCTO, UDC_SEDES, formatCampusName } from '@/lib/utils';

export const HomePage: React.FC = () => {
  const { posts } = useMarketplace();
  const [heroSearch, setHeroSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 350);
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      navigate(`/catalog?q=${encodeURIComponent(heroSearch.trim())}`);
    } else {
      navigate('/catalog');
    }
  };

  const displayPosts = selectedCategory
    ? posts.filter((p) => p.tipoP === selectedCategory).slice(0, 6)
    : posts.slice(0, 6);

  // Bento Box organization with the exact same 4-column rules as the Hero Bento Box
  // Row 1: [Wide: 2 cols] + [Standard: 1 col] + [Standard: 1 col] = 4 cols
  // Row 2: [Standard: 1 col] + [Standard: 1 col] + [Wide: 2 cols] = 4 cols
  const getBentoConfig = (index: number) => {
    const pattern = index % 6;
    switch (pattern) {
      case 0:
        return { variant: 'wide' as const, className: 'col-span-1 sm:col-span-2 lg:col-span-2' };
      case 1:
        return { variant: 'standard' as const, className: 'col-span-1' };
      case 2:
        return { variant: 'standard' as const, className: 'col-span-1' };
      case 3:
        return { variant: 'standard' as const, className: 'col-span-1' };
      case 4:
        return { variant: 'standard' as const, className: 'col-span-1' };
      case 5:
        return { variant: 'wide' as const, className: 'col-span-1 sm:col-span-2 lg:col-span-2' };
      default:
        return { variant: 'standard' as const, className: 'col-span-1' };
    }
  };

  return (
    <PageTransition className="min-h-screen flex flex-col font-aeonik bg-[#faf8f5] text-[#171a3d]">
      {/* ========================================================= */}
      {/* 1. BENTO HERO SECTION: Light Ivory with Warm Orange Scheme */}
      {/* ========================================================= */}
      <section className="relative w-full bg-[#faf8f5] pt-12 pb-16 px-4 sm:px-8 border-b border-[#171a3d]/10">
        <div className="max-w-[1360px] mx-auto space-y-10">
          {/* Top Hero Typography Block */}
          <SlowSlide direction="up" duration={0.8} distance={25}>
            <div className="space-y-4 max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fdf3eb] border border-[#ec8026]/30 text-xs font-bold text-[#ec8026] shadow-sm">
                <span className="h-2 w-2 rounded-full bg-[#ec8026] animate-pulse" />
                <span className="uppercase tracking-[0.06em]">Comunidad Estudiantil UDC</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#171a3d] tracking-tight leading-[1.04] uppercase">
                REVOLUCIÓN EN EL MERCADO DEL{' '}
                <span className="text-[#ec8026] font-black underline decoration-[#ec8026]/40 decoration-wavy">
                  CAMPUS
                </span>
              </h1>

              <p className="text-base sm:text-xl text-[#171a3d]/80 font-medium max-w-2xl leading-relaxed pt-1">
                La plataforma directa e independiente para comprar, vender e intercambiar libros, calculadoras, batas y tecnología entre estudiantes de la Universidad de Cartagena.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-3">
                <Link
                  to="/create"
                  className="h-12 px-7 rounded-full bg-[#ec8026] hover:bg-[#d97018] text-[#ffffff] font-aeonik font-bold text-sm tracking-[0.03em] flex items-center gap-2 transition-all shadow-md shadow-[#ec8026]/20 active:scale-95 uppercase"
                >
                  <Plus className="h-4 w-4 stroke-[3]" />
                  <span>Publicar Aviso Gratis</span>
                </Link>

                <Link
                  to="/catalog"
                  className="h-12 px-6 rounded-full bg-[#171a3d] hover:bg-[#252a5c] text-[#ffffff] font-aeonik font-bold text-sm tracking-[0.03em] flex items-center gap-2 transition-all shadow-md active:scale-95 uppercase"
                >
                  <span>Explorar Catálogo</span>
                  <ArrowRight className="h-4 w-4 text-[#ec8026]" />
                </Link>
              </div>
            </div>
          </SlowSlide>

          {/* Bento Grid Mosaic Lower Section */}
          <SlowSlide direction="up" delay={0.15} duration={0.85} distance={35}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Module 1: Yellow (#F2BA27 / #f2b725) */}
              <div className="rounded-[28px] bg-[#f2b725] p-7 text-[#ffffff] flex flex-col justify-between min-h-[280px] shadow-sm hover:shadow-md transition-shadow">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-[0.05em] text-[#171a3d]/70 block">
                    Comisión por Venta
                  </span>
                  <div className="text-6xl sm:text-7xl font-extrabold tracking-tight text-[#ffffff] leading-none">
                    0%
                  </div>
                </div>
                <div className="space-y-1 pt-6 border-t border-[#ffffff]/25">
                  <h4 className="font-bold text-sm text-[#171a3d] uppercase tracking-wide">
                    Ahorro Total Directo
                  </h4>
                  <p className="text-xs font-medium text-[#171a3d]/85 leading-snug">
                    Sin tarifas ni cobros sorpresa. El 100% del pago acordado queda entre compañeros de facultad.
                  </p>
                </div>
              </div>

              {/* Module 2: Orange (#EB8D2F / #ec8026) with photo */}
              <div className="rounded-[28px] bg-[#ec8026] p-4 text-[#ffffff] flex flex-col justify-between min-h-[280px] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="relative h-44 w-full rounded-[20px] overflow-hidden border border-[#ffffff]/20 bg-[#ffffff]/10">
                  <img
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80"
                    alt="Estudiantes UDC en claustro"
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#171a3d]/85 backdrop-blur-sm text-[10px] font-bold text-[#ffffff] uppercase tracking-[0.04em]">
                      Comunidad
                    </span>
                  </div>
                </div>
                <div className="p-2 pt-3 space-y-0.5">
                  <h4 className="font-bold text-base text-[#ffffff] leading-tight">
                    Entrega Mano a Mano
                  </h4>
                  <p className="text-xs font-medium text-[#ffffff]/85 leading-snug">
                    Pacta el punto de encuentro en la biblioteca o cafetería de tu claustro.
                  </p>
                </div>
              </div>

              {/* Module 3: Red / Coral (#E64E40 / #df4838) */}
              <div className="rounded-[28px] bg-[#df4838] p-7 text-[#ffffff] flex flex-col justify-between min-h-[280px] shadow-sm hover:shadow-md transition-shadow">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-[0.05em] text-[#ffffff]/80 block">
                    Campus Conectados
                  </span>
                  <div className="text-6xl sm:text-7xl font-extrabold tracking-tight text-[#ffffff] leading-none">
                    4
                  </div>
                </div>
                <div className="space-y-1 pt-6 border-t border-[#ffffff]/25">
                  <h4 className="font-bold text-sm text-[#ffffff] uppercase tracking-wide">
                    Sedes Universitarias
                  </h4>
                  <p className="text-xs font-medium text-[#ffffff]/85 leading-snug">
                    San Agustín, Zaragocilla, Piedra de Bolívar y San Pablo en una sola red.
                  </p>
                </div>
              </div>

              {/* Module 4: Dark Blue (#1A1B43 / #171a3d) with aquamarine circular graphic */}
              <div className="rounded-[28px] bg-[#171a3d] p-7 text-[#ffffff] flex flex-col justify-between min-h-[280px] shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-[0.05em] text-[#3da898]">
                    Seguridad
                  </span>
                  <CheckCircle2 className="h-4 w-4 text-[#3da898]" />
                </div>

                {/* Circular Graphic Component */}
                <div className="flex items-center justify-center my-2">
                  <div className="relative flex items-center justify-center">
                    <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#ffffff"
                        strokeOpacity="0.12"
                        strokeWidth="9"
                        fill="none"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#3da898"
                        strokeWidth="9"
                        strokeDasharray="251.2"
                        strokeDashoffset="25.12"
                        strokeLinecap="round"
                        fill="none"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-xl font-black text-[#3da898] leading-none">100%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1 pt-3 border-t border-[#ffffff]/15 text-center sm:text-left">
                  <p className="text-xs font-bold text-[#3da898] leading-snug">
                    Trato directo y presencial
                  </p>
                  <p className="text-[11px] text-[#ffffff]/70 font-medium">
                    Verifica el estado del artículo en persona antes de pagar.
                  </p>
                </div>
              </div>
            </div>
          </SlowSlide>

          {/* Integrated Search Bar inside Hero */}
          <SlowSlide direction="up" delay={0.25} duration={0.85} distance={25}>
            <div className="max-w-2xl mx-auto pt-2">
              <form
                onSubmit={handleHeroSearch}
                className="relative flex items-center bg-[#ffffff] p-2 rounded-full border border-[#171a3d]/20 shadow-sm hover:border-[#44216b]/60 focus-within:border-[#44216b] focus-within:ring-2 focus-within:ring-[#44216b]/15 transition-all"
              >
                <div className="pl-3 text-[#171a3d]/50">
                  <Search className="h-5 w-5" />
                </div>
                <Input
                  type="text"
                  placeholder="¿Qué buscas hoy? (libros de medicina, calculadoras, batas, instrumental...)"
                  className="w-full h-10 pl-3 pr-28 border-0 bg-transparent text-xs sm:text-sm font-aeonik font-medium text-[#171a3d] placeholder:text-[#171a3d]/45 focus-visible:ring-0 focus-visible:border-0"
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                />
                <button
                  type="submit"
                  className="h-10 px-6 rounded-full bg-[#ec8026] hover:bg-[#d97018] text-[#ffffff] text-xs font-aeonik font-bold tracking-[0.03em] transition-all active:scale-95 shadow-sm uppercase"
                >
                  Buscar
                </button>
              </form>
            </div>
          </SlowSlide>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. ARTÍCULOS DESTACADOS: Tablón de Avisos Estudiantil      */}
      {/* ========================================================= */}
      <section className="w-full bg-[#faf8f5] py-16 px-4 sm:px-8 border-b border-[#171a3d]/10">
        <div className="max-w-[1360px] mx-auto space-y-8">
          <SlowSlide direction="up" duration={0.8} distance={30}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#171a3d]/10 pb-4">
              <div>
                <div className="flex items-center gap-2.5 mb-1.5">
                  {/* Glossy 3D Red Pushpin Icon from screenshot */}
                  <span className="relative flex h-4 w-4 items-center justify-center shrink-0">
                    <span className="h-4 w-4 rounded-full bg-gradient-to-tr from-[#df4838] via-[#ef4444] to-[#fca5a5] shadow-[0_2px_4px_rgba(0,0,0,0.25)] border border-white/80" />
                    <span className="absolute top-0.5 left-1 h-1.5 w-1.5 rounded-full bg-white/90" />
                  </span>
                  <span className="text-xs font-aeonik font-bold uppercase tracking-[0.06em] text-[#ec8026]">
                    Tablón de Avisos · Campus UDC
                  </span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-[#171a3d] tracking-tight uppercase">
                  Publicaciones recientes en el tablón
                </h2>
                <p className="text-xs text-[#171a3d]/70 mt-1 font-medium">
                  Últimos avisos colgados por estudiantes de la Universidad de Cartagena
                </p>
              </div>

              <Link
                to="/catalog"
                className="h-9 px-4 rounded-full border border-[#171a3d]/20 bg-[#ffffff] hover:bg-[#fdf3eb] hover:border-[#ec8026]/40 text-xs font-aeonik font-bold tracking-[0.02em] text-[#171a3d] inline-flex items-center gap-2 self-start md:self-auto transition-colors shadow-sm"
              >
                <span>Ver todo el catálogo</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#ec8026]" />
              </Link>
            </div>

            {/* Quick Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 min-w-max mt-6">
              <button
                type="button"
                onClick={() => setSelectedCategory('')}
                className={`h-9 px-4 rounded-full text-xs font-aeonik font-bold tracking-[0.02em] transition-all active:scale-95 ${
                  selectedCategory === ''
                    ? 'bg-[#ec8026] text-[#ffffff] shadow-sm shadow-[#ec8026]/20'
                    : 'bg-[#ffffff] text-[#171a3d]/80 border border-[#171a3d]/15 hover:bg-[#edf0f7]'
                }`}
              >
                Todos los Artículos
              </button>
              {CATEGORIAS_PRODUCTO.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(isSelected ? '' : cat)}
                    className={`h-9 px-4 rounded-full text-xs font-aeonik font-bold tracking-[0.02em] transition-all active:scale-95 ${
                      isSelected
                        ? 'bg-[#ec8026] text-[#ffffff] shadow-sm shadow-[#ec8026]/20'
                        : 'bg-[#ffffff] text-[#171a3d]/80 border border-[#171a3d]/15 hover:bg-[#edf0f7]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </SlowSlide>

          {/* Pegboard Bulletin Board (Tablón de Avisos de Corcho/Madera) */}
          <SlowSlide direction="up" delay={0.2} duration={0.85} distance={35}>
            <div
              className="relative rounded-[28px] sm:rounded-[36px] p-5 sm:p-7 md:p-8 border-[6px] sm:border-[8px] border-[#915f36] shadow-[inset_0_4px_24px_rgba(40,20,5,0.38),0_14px_34px_-6px_rgba(23,26,61,0.18)]"
              style={{
                backgroundColor: '#b98858',
                backgroundImage: `
                  radial-gradient(#6e431e 18%, transparent 20%),
                  radial-gradient(#855528 18%, transparent 20%)
                `,
                backgroundPosition: '0 0, 14px 14px',
                backgroundSize: '28px 28px',
              }}
            >
              {/* Corner Mounting Screws on Board */}
              <div className="absolute top-2.5 left-2.5 h-3 w-3 rounded-full bg-[#4e2c0e] border border-[#d6a575]/40 shadow-inner" />
              <div className="absolute top-2.5 right-2.5 h-3 w-3 rounded-full bg-[#4e2c0e] border border-[#d6a575]/40 shadow-inner" />
              <div className="absolute bottom-2.5 left-2.5 h-3 w-3 rounded-full bg-[#4e2c0e] border border-[#d6a575]/40 shadow-inner" />
              <div className="absolute bottom-2.5 right-2.5 h-3 w-3 rounded-full bg-[#4e2c0e] border border-[#d6a575]/40 shadow-inner" />

              {displayPosts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {displayPosts.map((post, idx) => {
                    const bento = getBentoConfig(idx);
                    return (
                      <div key={post.id} className={`${bento.className} relative pt-2 group/pin`}>
                        {/* Tactile 3D Pushpin on top of each card */}
                        <div
                          className="absolute top-0 left-6 z-20 h-4.5 w-4.5 rounded-full shadow-[0_3px_5px_rgba(0,0,0,0.4)] border border-[#ffffff]/90 flex items-center justify-center transition-transform group-hover/pin:scale-110"
                          style={{
                            width: '18px',
                            height: '18px',
                            background:
                              idx % 3 === 0
                                ? 'radial-gradient(circle at 35% 35%, #ff7666, #df4838 70%, #9e1f13)'
                                : idx % 3 === 1
                                ? 'radial-gradient(circle at 35% 35%, #ffb156, #ec8026 70%, #b35607)'
                                : 'radial-gradient(circle at 35% 35%, #ffe17d, #f2b725 70%, #b8860c)',
                          }}
                        >
                          <div className="h-1.5 w-1.5 rounded-full bg-[#ffffff]/80" />
                        </div>
                        <BentoCard post={post} variant={bento.variant} index={idx} />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-2xl bg-[#faf8f5] p-12 text-center border-2 border-dashed border-[#855528]/40 space-y-3 max-w-md mx-auto my-6 shadow-md relative">
                  {/* Pushpin on empty note */}
                  <div
                    className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-20 rounded-full shadow-md border border-white"
                    style={{
                      width: '20px',
                      height: '20px',
                      background: 'radial-gradient(circle at 35% 35%, #ff7666, #df4838 70%, #9e1f13)',
                    }}
                  />
                  <div className="h-12 w-12 rounded-full bg-[#fdf3eb] text-[#ec8026] flex items-center justify-center mx-auto border border-[#ec8026]/20 shadow-sm">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#171a3d]">
                    No hay avisos colgados en el tablón
                  </h3>
                  <p className="text-xs font-normal text-[#171a3d]/70 max-w-md mx-auto">
                    Sé el primero de tu facultad en colgar un aviso de libro, bata o calculadora en este claustro.
                  </p>
                  <div className="pt-2">
                    <Link
                      to="/create"
                      className="inline-flex items-center gap-2 h-10 px-5 rounded-full bg-[#ec8026] text-[#ffffff] font-aeonik font-bold text-xs hover:bg-[#d97018] transition-transform active:scale-95 shadow-sm"
                    >
                      <Plus className="h-3.5 w-3.5 stroke-[3]" />
                      <span>Colgar Primer Aviso</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </SlowSlide>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. TERTIARY SECTION: Campus Directo & Claustros           */}
      {/* ========================================================= */}
      <section className="w-full bg-[#faf8f5] py-16 px-4 sm:px-8 border-b border-[#171a3d]/10">
        <div className="max-w-[1360px] mx-auto">
          <SlowSlide direction="up" duration={0.85} distance={30}>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fdf3eb] border border-[#ec8026]/20 text-xs font-bold text-[#ec8026] mb-3 shadow-sm">
                <Building2 className="h-3.5 w-3.5 text-[#ec8026]" />
                <span>Intercambio en Sedes UDC</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#171a3d] tracking-tight uppercase">
                Puntos de encuentro en Claustro y Sedes
              </h2>
              <p className="text-xs sm:text-sm text-[#171a3d]/70 mt-2 font-normal">
                Acuerda entregas mano a mano en el Claustro San Agustín o en las sedes Zaragocilla, Piedra de Bolívar y San Pablo.
              </p>
            </div>

            {/* Campus selector pill grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {UDC_SEDES.map((sede) => (
                <Link
                  key={sede}
                  to={`/catalog?sede=${encodeURIComponent(sede)}`}
                  className="p-5 rounded-2xl bg-[#ffffff] border border-[#171a3d]/15 hover:border-[#ec8026]/60 transition-all shadow-sm hover:shadow-md hover:-translate-y-1 group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="h-8 w-8 rounded-full bg-[#fdf3eb] text-[#ec8026] flex items-center justify-center">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <ArrowRight className="h-4 w-4 text-[#171a3d]/40 group-hover:text-[#ec8026] group-hover:translate-x-1 transition-all" />
                  </div>
                  <h4 className="font-bold text-base text-[#171a3d] group-hover:text-[#ec8026] transition-colors">
                    {formatCampusName(sede)}
                  </h4>
                  <p className="text-xs text-[#171a3d]/60 mt-1">
                    Ver publicaciones con entrega en este lugar
                  </p>
                </Link>
              ))}
            </div>
          </SlowSlide>
        </div>
      </section>

      {/* Floating Scroll-to-Top Pill Button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 h-10 w-10 rounded-full bg-[#171a3d] hover:bg-[#ec8026] text-[#ffffff] flex items-center justify-center transition-all shadow-md active:scale-90"
          aria-label="Volver arriba"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}
    </PageTransition>
  );
};
