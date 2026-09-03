import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMarketplace } from '@/context/MarketplaceContext';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { PageTransition } from '@/components/common/PageTransition';
import { SlushRibbon } from '@/components/common/SlushRibbon';
import { SlushSticker } from '@/components/common/SlushSticker';
import { Input } from '@/components/ui/input';
import {
  ArrowRight,
  Search,
  MapPin,
  ShieldCheck,
  ArrowUp,
  Plus,
  CheckCircle2,
} from 'lucide-react';
import { CATEGORIAS_PRODUCTO, UDC_SEDES } from '@/lib/utils';

export const HomePage: React.FC = () => {
  const { posts } = useMarketplace();
  const [heroSearch, setHeroSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 400);
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

  return (
    <PageTransition className="min-h-screen flex flex-col font-aeonik">
      {/* ========================================================= */}
      {/* 1. HERO SECTION: Community Identity & Orange Accents       */}
      {/* ========================================================= */}
      <section className="relative w-full bg-[#edf0f7] overflow-hidden pt-10 pb-20 sm:pb-28 px-4 sm:px-8 border-b border-[#171a3d]/20">
        {/* Signature 3D Inflatable Ribbon in Warm UDC Orange */}
        <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center opacity-85">
          <SlushRibbon variant="wave" color="orange" className="w-[140%] max-w-none transform -translate-y-6" />
        </div>

        {/* Floating Illustrated Stickers around the display headline */}
        <div className="max-w-[1440px] mx-auto relative z-10">
          {/* Top floating sticker row */}
          <div className="flex items-center justify-between pointer-events-none mb-6">
            <div className="pointer-events-auto transform -rotate-3 hover:rotate-0 transition-transform">
              <SlushSticker type="grad" color="orange" label="UDC 1827" size="md" />
            </div>

            <div className="pointer-events-auto transform rotate-3 hover:rotate-0 transition-transform">
              <SlushSticker type="coin" color="orange" label="0% COMISIÓN" size="md" />
            </div>
          </div>

          {/* Institutional Crest Logo + Enormous Crushed Lateral 800 Display Headline */}
          <div className="text-center space-y-3 my-2">
            <Link to="/" className="inline-block group">
              <img
                src="/udc-logo.png"
                alt="Universidad de Cartagena"
                className="h-20 sm:h-24 w-auto mx-auto object-contain transition-transform group-hover:scale-105"
              />
              <span className="inline-flex items-center gap-1.5 font-aeonik text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.08em] text-[#ec8026] mt-2 px-3 py-0.5 rounded-[1600px] bg-[#ffffff] border border-[#171a3d]">
                <span>Iniciativa Estudiantil Independiente</span>
              </span>
            </Link>

            <div className="inline-block relative">
              <h1 className="font-lateral text-[65px] sm:text-[110px] md:text-[150px] lg:text-[180px] text-[#171a3d] uppercase tracking-normal leading-[0.76] select-none">
                UDC MARKETPLACE
              </h1>

              {/* Overlapping stickers pinned directly on type */}
              <div className="absolute -top-4 -right-2 sm:right-6 pointer-events-auto transform rotate-12">
                <SlushSticker type="star" color="orange" size="md" label="CAMPUS" />
              </div>
              <div className="absolute -bottom-6 -left-2 sm:left-8 pointer-events-auto transform -rotate-12">
                <SlushSticker type="check" color="teal" size="md" label="100% ENTRE ESTUDIANTES" />
              </div>
            </div>

            {/* Tagline Subhead */}
            <p className="text-base sm:text-xl text-[#171a3d]/85 max-w-2xl mx-auto font-medium tracking-[-0.010em] pt-4 leading-snug">
              La plataforma comunitaria e independiente de intercambio y compraventa entre todos los claustros y facultades de Cartagena.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mt-8 mb-6">
            <form onSubmit={handleHeroSearch} className="relative flex items-center">
              <Input
                type="text"
                placeholder="Busca calculadoras, batas, libros, instrumental médico..."
                className="w-full h-14 pl-12 pr-32 rounded-[1600px] border border-[#171a3d] bg-[#ffffff] text-sm sm:text-base font-aeonik font-bold text-[#171a3d] placeholder:text-[#171a3d]/45 focus-visible:ring-0 focus-visible:bg-[#ffffff]"
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
              />
              <Search className="absolute left-4 h-5 w-5 text-[#171a3d]/60 pointer-events-none" />
              <button
                type="submit"
                className="absolute right-2 h-10 px-5 rounded-[1600px] bg-[#ec8026] hover:bg-[#d97018] text-[#ffffff] text-xs sm:text-sm font-aeonik font-bold tracking-[0.032em] transition-transform active:scale-95 shadow-sm"
              >
                Buscar
              </button>
            </form>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/catalog"
              className="h-12 px-6 rounded-[1600px] border border-[#171a3d] bg-[#ffffff] hover:bg-[#edf0f7] text-[#171a3d] font-aeonik font-bold text-sm tracking-[0.032em] flex items-center gap-2 transition-transform active:scale-95"
            >
              <span>Explorar Catálogo Completo</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              to="/create"
              className="h-12 px-6 rounded-[1600px] border border-[#171a3d] bg-[#ec8026] hover:bg-[#d97018] text-[#ffffff] font-aeonik font-bold text-sm tracking-[0.032em] flex items-center gap-2 transition-transform active:scale-95 shadow-sm"
            >
              <Plus className="h-4 w-4 stroke-[3]" />
              <span>Publicar Artículo Gratis</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. SECONDARY SECTION: Full-bleed #ffffff (Paper White)    */}
      {/* ========================================================= */}
      <section className="w-full bg-[#ffffff] py-16 px-4 sm:px-8 border-b border-[#171a3d]/20">
        <div className="max-w-[1440px] mx-auto space-y-8">
          {/* Section Header with Lateral Display Title */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#171a3d]/20 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ec8026] border border-[#171a3d]" />
                <span className="text-xs font-aeonik font-bold uppercase tracking-[0.032em] text-[#171a3d]">
                  MERCADO ESTUDIANTIL · UDC
                </span>
              </div>
              <h2 className="font-lateral text-4xl sm:text-6xl text-[#171a3d] uppercase leading-[0.80]">
                ARTÍCULOS DESTACADOS
              </h2>
            </div>

            <Link
              to="/catalog"
              className="h-9 px-4 rounded-[1600px] border border-[#171a3d] bg-[#ffffff] hover:bg-[#edf0f7] text-xs font-aeonik font-bold tracking-[0.032em] text-[#171a3d] inline-flex items-center gap-2 self-start md:self-auto"
            >
              <span>Ver todos los {posts.length} anuncios</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Quick Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 min-w-max">
            <button
              type="button"
              onClick={() => setSelectedCategory('')}
              className={`h-9 px-4 rounded-[1600px] border border-[#171a3d] text-xs font-aeonik font-bold tracking-[0.032em] transition-transform active:scale-95 ${
                selectedCategory === ''
                  ? 'bg-[#ec8026] text-[#ffffff]'
                  : 'bg-[#ffffff] text-[#171a3d] hover:bg-[#edf0f7]'
              }`}
            >
              Todos los Artículos
            </button>
            {CATEGORIAS_PRODUCTO.map((cat, idx) => {
              const bgStyles = [
                'hover:bg-[#ec8026] hover:text-[#ffffff]',
                'hover:bg-[#3da898] hover:text-[#ffffff]',
                'hover:bg-[#44216b] hover:text-[#ffffff]',
                'hover:bg-[#f2b725] hover:text-[#171a3d]',
                'hover:bg-[#df4838] hover:text-[#ffffff]',
              ];
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(isSelected ? '' : cat)}
                  className={`h-9 px-4 rounded-[1600px] border border-[#171a3d] text-xs font-aeonik font-bold tracking-[0.032em] transition-all active:scale-95 ${
                    isSelected
                      ? 'bg-[#ec8026] text-[#ffffff]'
                      : `bg-[#ffffff] text-[#171a3d] ${bgStyles[idx % bgStyles.length]}`
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Product Cards Grid */}
          {displayPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
              {displayPosts.map((post, idx) => {
                const colors: ('white' | 'lavender' | 'sky' | 'mint')[] = ['white', 'sky', 'lavender', 'white', 'mint', 'white'];
                return (
                  <ProductCard
                    key={post.id}
                    post={post}
                    accentColor={colors[idx % colors.length]}
                  />
                );
              })}
            </div>
          ) : (
            <div className="rounded-[20px] bg-[#edf0f7] p-10 text-center border border-[#171a3d] space-y-3">
              <p className="text-base font-aeonik font-bold text-[#171a3d]">
                No hay artículos publicados todavía
              </p>
              <p className="text-xs font-medium text-[#171a3d]/70 max-w-md mx-auto">
                Sé el primero en publicar un libro, calculadora, bata o material académico.
              </p>
              <div className="pt-2">
                <Link
                  to="/create"
                  className="inline-flex items-center gap-2 h-9 px-4 rounded-[1600px] bg-[#ec8026] text-[#ffffff] font-aeonik font-bold text-xs hover:bg-[#d97018] transition-transform active:scale-95 shadow-sm"
                >
                  <Plus className="h-3.5 w-3.5 stroke-[3]" />
                  <span>Publicar Artículo</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. TERTIARY SECTION: Campus Directo & Claustros UDC        */}
      {/* ========================================================= */}
      <section className="relative w-full bg-[#edf0f7] py-20 px-4 sm:px-8 border-b border-[#171a3d]/20 overflow-hidden">
        {/* Signature 3D Ribbon Arcing in Orange */}
        <div className="absolute -top-10 left-0 right-0 pointer-events-none z-0 opacity-80">
          <SlushRibbon variant="arc" color="orange" className="w-full max-w-5xl mx-auto" />
        </div>

        <div className="max-w-[1440px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Headline with Pinned Stickers */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <SlushSticker type="check" color="orange" label="CLAUSTROS UDC" size="sm" rotate={-2} />
                <SlushSticker type="zap" color="yellow" label="SIN INTERMEDIARIOS" size="sm" rotate={3} />
              </div>

              <h2 className="font-lateral text-[60px] sm:text-[90px] md:text-[110px] text-[#171a3d] uppercase leading-[0.76] tracking-normal">
                CAMPUS DIRECTO
              </h2>

              <p className="text-base sm:text-xl text-[#171a3d]/85 max-w-xl font-medium tracking-[-0.010em] leading-relaxed">
                Intercambia libros de medicina en Zaragocilla, calculadoras en Piedra de Bolívar o batas en San Agustín. Todo en tu claustro, mano a mano.
              </p>

              <div className="pt-2 flex flex-wrap gap-2">
                {UDC_SEDES.map((sede) => (
                  <Link
                    key={sede}
                    to={`/catalog?sede=${encodeURIComponent(sede)}`}
                    className="h-8 px-3 rounded-[1600px] border border-[#171a3d] bg-[#ffffff] hover:bg-[#ec8026] hover:text-[#ffffff] text-xs font-aeonik font-bold tracking-[0.032em] text-[#171a3d] flex items-center gap-1.5 transition-colors"
                  >
                    <MapPin className="h-3 w-3 text-[#ec8026]" />
                    <span>Campus {sede}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right: Campus Information & Safe Trade Cards */}
            <div className="lg:col-span-5 space-y-4">
              {/* Direct Hand-off Card in UDC Navy & Orange */}
              <div className="rounded-[20px] bg-[#171a3d] border border-[#171a3d] p-6 text-[#ffffff] space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-[0.032em] text-[#ec8026] block">
                    100% ESTUDIANTIL · SIN INTERMEDIARIOS
                  </span>
                  <CheckCircle2 className="h-5 w-5 text-[#3da898]" />
                </div>
                <h3 className="font-lateral text-3xl uppercase leading-none text-[#ffffff]">
                  TRATO DIRECTO EN CAMPUS
                </h3>
                <p className="text-xs font-medium text-[#ffffff]/85 leading-relaxed">
                  Pacta el punto de encuentro por WhatsApp con tu compañero de facultad. Revisa el estado del artículo en persona antes de pagar, sin envíos costosos ni comisiones ocultas.
                </p>
                <div className="flex items-center gap-2 pt-1 text-[11px] font-bold text-[#ec8026]">
                  <span>Entrega mano a mano acordada directamente entre estudiantes</span>
                </div>
              </div>

              {/* Campus Safe Hand-off Card */}
              <div className="rounded-[20px] bg-[#ffffff] border border-[#171a3d] p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-aeonik font-bold text-base text-[#171a3d] uppercase tracking-[0.032em]">
                    PUNTOS DE ENCUENTRO RECOMENDADOS
                  </h4>
                  <ShieldCheck className="h-5 w-5 text-[#ec8026]" />
                </div>
                <p className="text-xs text-[#171a3d]/80 font-medium leading-relaxed">
                  Para máxima seguridad, recomendamos realizar el pago y entrega en las bibliotecas centrales o cafeterías de cada campus de la Universidad de Cartagena.
                </p>
                <div className="flex items-center gap-2 pt-1 text-[11px] font-bold text-[#171a3d]">
                  <span className="h-2 w-2 rounded-full bg-[#ec8026] border border-[#171a3d]" />
                  <span>San Agustín · Zaragocilla · Piedra de Bolívar · San Pablo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Scroll-to-Top Pill Button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 h-11 w-11 rounded-[1600px] border border-[#171a3d] bg-[#ffffff] hover:bg-[#171a3d] hover:text-[#ffffff] text-[#171a3d] flex items-center justify-center transition-all active:scale-90"
          aria-label="Volver arriba"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </PageTransition>
  );
};
