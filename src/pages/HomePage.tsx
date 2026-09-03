import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMarketplace } from '@/context/MarketplaceContext';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { PageTransition } from '@/components/common/PageTransition';
import { SlowSlide } from '@/components/common/SlowSlide';
import { Input } from '@/components/ui/input';
import {
  ArrowRight,
  Search,
  MapPin,
  ShieldCheck,
  ArrowUp,
  Plus,
  CheckCircle2,
  BookOpen,
  MessageCircle,
  Building2,
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

  return (
    <PageTransition className="min-h-screen flex flex-col font-aeonik bg-[#fbfcfd] text-[#171a3d]">
      {/* ========================================================= */}
      {/* 1. HERO SECTION: Professional, Clean & Trustworthy        */}
      {/* ========================================================= */}
      <section className="relative w-full bg-gradient-to-b from-[#ffffff] via-[#f5f7fc] to-[#ffffff] border-b border-[#171a3d]/10 pt-10 pb-16 sm:pb-24 px-4 sm:px-8">
        <div className="max-w-[1280px] mx-auto text-center relative z-10">
          <SlowSlide direction="up" duration={0.8} distance={24}>
            {/* Crest and Pill Badge */}
            <div className="flex flex-col items-center mb-5">
              <Link to="/" className="inline-flex items-center gap-2 group mb-3">
                <img
                  src="/udc-logo.png"
                  alt="Universidad de Cartagena"
                  className="h-16 sm:h-20 w-auto object-contain transition-transform group-hover:scale-105"
                />
              </Link>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fdf3eb] border border-[#ec8026]/30 text-xs font-semibold text-[#ec8026]">
                <span className="h-2 w-2 rounded-full bg-[#ec8026] animate-pulse" />
                <span>Mercado Estudiantil Independiente · Universidad de Cartagena</span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#171a3d] tracking-tight leading-[1.12] max-w-4xl mx-auto">
              Compra, vende e intercambia en tu{' '}
              <span className="text-[#ec8026] underline decoration-[#ec8026]/30 decoration-wavy">
                campus universitario
              </span>
            </h1>

            {/* Subhead */}
            <p className="text-sm sm:text-lg text-[#171a3d]/75 max-w-2xl mx-auto font-normal leading-relaxed mt-4">
              Conecta de forma directa con compañeros de facultad en San Agustín, Zaragocilla, Piedra de Bolívar y San Pablo. Libros, batas, calculadoras e insumos sin comisiones.
            </p>
          </SlowSlide>

          {/* Search Bar with modern card look */}
          <SlowSlide direction="up" delay={0.15} duration={0.85} distance={28}>
            <div className="max-w-2xl mx-auto mt-8 mb-6">
              <form
                onSubmit={handleHeroSearch}
                className="relative flex items-center bg-[#ffffff] p-1.5 rounded-full border border-[#171a3d]/20 shadow-sm hover:border-[#ec8026]/60 focus-within:border-[#ec8026] focus-within:ring-2 focus-within:ring-[#ec8026]/20 transition-all"
              >
                <div className="pl-4 text-[#171a3d]/50">
                  <Search className="h-5 w-5" />
                </div>
                <Input
                  type="text"
                  placeholder="¿Qué necesitas para este semestre? (calculadoras, batas, libros...)"
                  className="w-full h-11 pl-3 pr-28 border-0 bg-transparent text-sm sm:text-base font-aeonik font-medium text-[#171a3d] placeholder:text-[#171a3d]/45 focus-visible:ring-0 focus-visible:border-0"
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                />
                <button
                  type="submit"
                  className="h-10 px-6 rounded-full bg-[#ec8026] hover:bg-[#d97018] text-[#ffffff] text-xs sm:text-sm font-aeonik font-bold tracking-[0.02em] transition-all active:scale-95 shadow-sm"
                >
                  Buscar
                </button>
              </form>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                to="/catalog"
                className="h-11 px-6 rounded-full border border-[#171a3d]/20 bg-[#ffffff] hover:bg-[#f5f7fc] text-[#171a3d] font-aeonik font-bold text-sm tracking-[0.02em] flex items-center gap-2 transition-all shadow-sm active:scale-95"
              >
                <span>Explorar Catálogo</span>
                <ArrowRight className="h-4 w-4 text-[#ec8026]" />
              </Link>

              <Link
                to="/create"
                className="h-11 px-6 rounded-full bg-[#171a3d] hover:bg-[#252a5c] text-[#ffffff] font-aeonik font-bold text-sm tracking-[0.02em] flex items-center gap-2 transition-all shadow-sm active:scale-95"
              >
                <Plus className="h-4 w-4 text-[#ec8026] stroke-[3]" />
                <span>Publicar un Artículo</span>
              </Link>
            </div>

            {/* Trust Highlights Strip */}
            <div className="mt-10 pt-8 border-t border-[#171a3d]/10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-xs text-[#171a3d]/70 font-medium">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#ec8026]" />
                <span>Trato directo sin comisión</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#3da898]" />
                <span>Entrega mano a mano en campus</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <MessageCircle className="h-4 w-4 text-[#44216b]" />
                <span>Contacto directo por WhatsApp</span>
              </div>
            </div>
          </SlowSlide>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. SECONDARY SECTION: Artículos Destacados (Slow Slide)   */}
      {/* ========================================================= */}
      <section className="w-full bg-[#ffffff] py-16 px-4 sm:px-8 border-b border-[#171a3d]/10">
        <div className="max-w-[1280px] mx-auto space-y-8">
          <SlowSlide direction="up" duration={0.8} distance={30}>
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#171a3d]/10 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#ec8026]" />
                  <span className="text-xs font-aeonik font-bold uppercase tracking-[0.05em] text-[#ec8026]">
                    Catálogo Activo
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171a3d] tracking-tight">
                  Artículos y publicaciones recientes
                </h2>
                <p className="text-xs text-[#171a3d]/65 mt-1 font-medium">
                  Material publicado por estudiantes de las diversas facultades
                </p>
              </div>

              <Link
                to="/catalog"
                className="h-9 px-4 rounded-full border border-[#171a3d]/20 bg-[#ffffff] hover:bg-[#f5f7fc] text-xs font-aeonik font-bold tracking-[0.02em] text-[#171a3d] inline-flex items-center gap-2 self-start md:self-auto transition-colors"
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
                className={`h-9 px-4 rounded-full text-xs font-aeonik font-semibold tracking-[0.02em] transition-all active:scale-95 ${
                  selectedCategory === ''
                    ? 'bg-[#ec8026] text-[#ffffff] shadow-sm'
                    : 'bg-[#f5f7fc] text-[#171a3d]/80 hover:bg-[#edf0f7]'
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
                    className={`h-9 px-4 rounded-full text-xs font-aeonik font-semibold tracking-[0.02em] transition-all active:scale-95 ${
                      isSelected
                        ? 'bg-[#ec8026] text-[#ffffff] shadow-sm'
                        : 'bg-[#f5f7fc] text-[#171a3d]/80 hover:bg-[#edf0f7]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </SlowSlide>

          {/* Product Cards Grid with Slow Slide Transition */}
          <SlowSlide direction="up" delay={0.2} duration={0.9} distance={36}>
            {displayPosts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                {displayPosts.map((post) => (
                  <ProductCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl bg-[#f8fafc] p-12 text-center border border-[#171a3d]/10 space-y-3">
                <div className="h-12 w-12 rounded-full bg-[#fdf3eb] text-[#ec8026] flex items-center justify-center mx-auto">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-[#171a3d]">
                  No hay artículos publicados todavía
                </h3>
                <p className="text-xs font-normal text-[#171a3d]/70 max-w-md mx-auto">
                  Sé el primero de tu facultad en publicar un libro, calculadora, bata o material académico.
                </p>
                <div className="pt-2">
                  <Link
                    to="/create"
                    className="inline-flex items-center gap-2 h-9 px-5 rounded-full bg-[#ec8026] text-[#ffffff] font-aeonik font-bold text-xs hover:bg-[#d97018] transition-transform active:scale-95 shadow-sm"
                  >
                    <Plus className="h-3.5 w-3.5 stroke-[3]" />
                    <span>Publicar Artículo</span>
                  </Link>
                </div>
              </div>
            )}
          </SlowSlide>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. TERTIARY SECTION: Campus Directo (Slow Slide)           */}
      {/* ========================================================= */}
      <section className="w-full bg-[#f5f7fc] py-16 px-4 sm:px-8 border-b border-[#171a3d]/10">
        <div className="max-w-[1280px] mx-auto">
          <SlowSlide direction="up" duration={0.85} distance={32}>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffffff] border border-[#171a3d]/10 text-xs font-semibold text-[#171a3d] mb-3">
                <Building2 className="h-3.5 w-3.5 text-[#ec8026]" />
                <span>Intercambio en Sedes UDC</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#171a3d] tracking-tight">
                ¿Cómo funciona el mercado universitario?
              </h2>
              <p className="text-xs sm:text-sm text-[#171a3d]/70 mt-2 font-normal">
                Diseñado para que los estudiantes acuerden entregas seguras dentro de su mismo claustro.
              </p>
            </div>

            {/* 3 Step Process Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-2xl bg-[#ffffff] p-6 border border-[#171a3d]/10 shadow-sm space-y-3">
                <div className="h-10 w-10 rounded-full bg-[#fdf3eb] text-[#ec8026] flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <h3 className="font-bold text-base text-[#171a3d]">
                  Explora o publica gratis
                </h3>
                <p className="text-xs text-[#171a3d]/70 leading-relaxed font-normal">
                  Filtra por tu claustro universitario o publica en segundos las guías, libros o batas que ya no uses.
                </p>
              </div>

              <div className="rounded-2xl bg-[#ffffff] p-6 border border-[#171a3d]/10 shadow-sm space-y-3">
                <div className="h-10 w-10 rounded-full bg-[#edf7f5] text-[#3da898] flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <h3 className="font-bold text-base text-[#171a3d]">
                  Pacta directo por WhatsApp
                </h3>
                <p className="text-xs text-[#171a3d]/70 leading-relaxed font-normal">
                  Chatea directamente con el vendedor sin intermediarios, pasarelas de pago externas ni comisiones ocultas.
                </p>
              </div>

              <div className="rounded-2xl bg-[#ffffff] p-6 border border-[#171a3d]/10 shadow-sm space-y-3">
                <div className="h-10 w-10 rounded-full bg-[#f4edf9] text-[#44216b] flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <h3 className="font-bold text-base text-[#171a3d]">
                  Entrega en mano en campus
                </h3>
                <p className="text-xs text-[#171a3d]/70 leading-relaxed font-normal">
                  Revisa el estado del producto en persona dentro de bibliotecas o cafeterías centrales antes de pagar.
                </p>
              </div>
            </div>

            {/* Sedes Links */}
            <div className="mt-10 p-6 rounded-2xl bg-[#ffffff] border border-[#171a3d]/10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-[#ec8026] shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-[#171a3d]">
                    Puntos de encuentro sugeridos por claustro
                  </h4>
                  <p className="text-xs text-[#171a3d]/65 font-normal">
                    Filtra publicaciones cercanas a tu facultad:
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {UDC_SEDES.map((sede) => (
                  <Link
                    key={sede}
                    to={`/catalog?sede=${encodeURIComponent(sede)}`}
                    className="h-8 px-3 rounded-full border border-[#171a3d]/15 bg-[#f8fafc] hover:bg-[#ec8026] hover:text-[#ffffff] text-xs font-semibold text-[#171a3d] transition-colors"
                  >
                    Campus {sede}
                  </Link>
                ))}
              </div>
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
