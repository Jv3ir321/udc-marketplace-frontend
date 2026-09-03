import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Lenis from 'lenis';
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
  const lenisRef = useRef<Lenis | null>(null);
  const navigate = useNavigate();

  // Soft Momentum Scroll (Lenis) for Landing Page
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
      infinite: false,
    });
    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 350);
    };
    lenis.on('scroll', checkScroll);
    window.addEventListener('scroll', checkScroll);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.off('scroll', checkScroll);
      window.removeEventListener('scroll', checkScroll);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollToTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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

        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. TABLÓN DE ANUNCIOS ESTUDIANTIL COMPLETO                */}
      {/* ========================================================= */}
      <section className="w-full bg-[#faf8f5] py-14 px-4 sm:px-8 border-b border-[#171a3d]/10">
        <div className="max-w-[1360px] mx-auto">
          <SlowSlide direction="up" duration={0.85} distance={30}>
            {/* Tablero Verde de Tiza Universitario (Pizarra de Cátedra) */}
            <div
              className="relative rounded-[28px] sm:rounded-[40px] p-6 sm:p-10 md:p-12 pb-10 sm:pb-14 border-[7px] sm:border-[11px] border-[#7a4b22] shadow-[inset_0_4px_40px_rgba(0,0,0,0.65),0_18px_45px_-8px_rgba(23,26,61,0.22)] overflow-hidden"
              style={{
                backgroundColor: '#1b3b2b',
                backgroundImage: `
                  radial-gradient(ellipse at 50% 30%, rgba(45, 90, 68, 0.45), transparent 70%),
                  radial-gradient(circle at 15% 85%, rgba(18, 42, 31, 0.6), transparent 50%),
                  radial-gradient(circle at 85% 20%, rgba(35, 75, 56, 0.35), transparent 50%),
                  repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.012) 0px, rgba(255, 255, 255, 0.012) 2px, transparent 2px, transparent 8px)
                `,
              }}
            >
              {/* Tornillos de latón dorado en las esquinas */}
              <div className="absolute top-3.5 left-3.5 h-3.5 w-3.5 rounded-full bg-[#b8860b] border border-[#fef08a]/60 shadow-inner flex items-center justify-center">
                <div className="h-2 w-0.5 bg-[#422006] rotate-45" />
              </div>
              <div className="absolute top-3.5 right-3.5 h-3.5 w-3.5 rounded-full bg-[#b8860b] border border-[#fef08a]/60 shadow-inner flex items-center justify-center">
                <div className="h-2 w-0.5 bg-[#422006] -rotate-45" />
              </div>
              <div className="absolute bottom-3.5 left-3.5 h-3.5 w-3.5 rounded-full bg-[#b8860b] border border-[#fef08a]/60 shadow-inner flex items-center justify-center">
                <div className="h-2 w-0.5 bg-[#422006] -rotate-45" />
              </div>
              <div className="absolute bottom-3.5 right-3.5 h-3.5 w-3.5 rounded-full bg-[#b8860b] border border-[#fef08a]/60 shadow-inner flex items-center justify-center">
                <div className="h-2 w-0.5 bg-[#422006] rotate-45" />
              </div>

              {/* Repisa para tizas inferior (Detalle realista de pizarra universitaria) */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 hidden sm:flex items-center gap-2.5 px-5 py-1 rounded-t-md bg-[#5c3514] border-t border-x border-[#8b5321] shadow-inner">
                <span className="w-6 h-1.5 rounded-full bg-[#ffffff]/90 shadow-sm" title="Tiza Blanca" />
                <span className="w-5 h-1.5 rounded-full bg-[#fef08a]/90 shadow-sm" title="Tiza Amarilla" />
                <span className="px-2 py-0.5 rounded-sm bg-[#3a200a] border border-[#6d3e18] text-[9px] font-mono text-[#ffffff]/60 font-bold tracking-wider">
                  UDC BORRADOR
                </span>
              </div>

              {/* ----------------------------------------------------------------- */}
              {/* PARTE 1: ENCABEZADO Y NOTAS FIJADAS (Fiel a la captura del usuario) */}
              {/* ----------------------------------------------------------------- */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Columna Izquierda: Titular, Caja de Descripción, Buscador y Sedes */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Tira de papel superior con chincheta dorada */}
                  <div className="relative inline-flex items-center gap-2.5 bg-[#fcfaf5] text-[#171a3d] text-xs font-bold px-4 py-1.5 rounded-sm shadow-md border border-[#171a3d]/15">
                    {/* Chincheta Dorada 3D */}
                    <span className="relative flex h-3.5 w-3.5 items-center justify-center shrink-0">
                      <span className="h-3.5 w-3.5 rounded-full bg-gradient-to-tr from-[#f2b725] via-[#fbbf24] to-[#fef08a] shadow-[0_2px_3px_rgba(0,0,0,0.3)] border border-white" />
                      <span className="absolute top-0.5 left-0.5 h-1 w-1 rounded-full bg-white/90" />
                    </span>
                    <span className="tracking-wide">Tablón de anuncios estudiantil • Universidad de Cartagena</span>
                  </div>

                  {/* Titular Grande con Subrayado Aguamarina */}
                  <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#ffffff] leading-[1.05] tracking-tight uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                    Lo que necesitas para tu semestre,{' '}
                    <span className="underline decoration-[#3da898] decoration-[5px] underline-offset-8">
                      en tu propio campus.
                    </span>
                  </h2>

                  {/* Caja de Explicación en tono pizarra oscura */}
                  <div className="bg-[#0f241a]/85 backdrop-blur-md rounded-2xl p-5 sm:p-6 text-[#ffffff]/95 text-sm sm:text-base font-normal leading-relaxed border border-[#ffffff]/20 shadow-xl max-w-xl">
                    Compra, vende o intercambia libros, batas médicas, calculadoras y tecnología directamente con compañeros de clase en el Claustro San Agustín o en las sedes Zaragocilla, Piedra de Bolívar y San Pablo.
                  </div>

                  {/* Buscador dentro del Tablón */}
                  <form
                    onSubmit={handleHeroSearch}
                    className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-[#ffffff] p-2 rounded-xl border border-[#171a3d]/20 shadow-xl max-w-xl"
                  >
                    <div className="flex items-center flex-1 px-2">
                      <Search className="h-5 w-5 text-[#171a3d]/40 shrink-0 mr-2" />
                      <Input
                        type="text"
                        placeholder="¿Qué estás buscando? (ej. Guyton, bata blanca, Casio...)"
                        className="w-full h-10 border-0 bg-transparent text-xs sm:text-sm font-aeonik font-medium text-[#171a3d] placeholder:text-[#171a3d]/45 focus-visible:ring-0 focus-visible:border-0 p-0 shadow-none"
                        value={heroSearch}
                        onChange={(e) => setHeroSearch(e.target.value)}
                      />
                    </div>
                    <button
                      type="submit"
                      className="h-11 px-6 rounded-lg bg-[#3da898] hover:bg-[#2e8f82] text-[#ffffff] font-aeonik font-bold text-xs sm:text-sm tracking-[0.02em] transition-all active:scale-95 shadow-md flex items-center justify-center gap-2 whitespace-nowrap uppercase"
                    >
                      <span>Buscar en el tablón</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </form>

                  {/* Etiquetas de Sedes al pie del buscador */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="bg-[#171a3d] text-[#ffffff] text-xs font-bold px-3 py-1.5 rounded-md shadow-sm">
                      Sedes:
                    </span>
                    {UDC_SEDES.map((sede) => (
                      <Link
                        key={sede}
                        to={`/catalog?sede=${encodeURIComponent(sede)}`}
                        className="bg-[#fcfaf5] hover:bg-[#ffffff] text-[#171a3d] text-xs font-bold px-3 py-1.5 rounded-md shadow-sm border border-[#171a3d]/15 transition-transform hover:-translate-y-0.5"
                      >
                        {sede}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Columna Derecha: 3 Notas Clavadas en el Corcho */}
                <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pt-2 lg:pt-0">
                  {/* Nota 1: Comunidad universitaria (Chincheta Roja) */}
                  <div className="relative rounded-2xl bg-[#fcfaf5] p-5 shadow-lg border border-[#171a3d]/10 transform sm:-rotate-1 hover:rotate-0 transition-transform duration-300 flex flex-col justify-between min-h-[200px]">
                    {/* Chincheta Roja 3D */}
                    <div
                      className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-20 rounded-full shadow-[0_2px_5px_rgba(0,0,0,0.35)] border border-white"
                      style={{
                        width: '18px',
                        height: '18px',
                        background: 'radial-gradient(circle at 35% 35%, #ff7666, #df4838 70%, #9e1f13)',
                      }}
                    >
                      <div className="h-1 w-1 rounded-full bg-white/80 absolute top-1 left-1" />
                    </div>

                    <div className="space-y-2.5 pt-1">
                      <div className="h-9 w-9 rounded-full bg-[#f0fdf4] text-[#3da898] border border-[#3da898]/20 flex items-center justify-center">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <h4 className="font-extrabold text-base text-[#171a3d] leading-snug">
                        Comunidad universitaria
                      </h4>
                      <p className="text-xs text-[#171a3d]/75 font-medium leading-relaxed">
                        Perfiles vinculados con código estudiantil, sede y reputación con estrellas otorgada por otros compañeros.
                      </p>
                    </div>
                  </div>

                  {/* Nota 2: Entregas en campus (Chincheta Dorada) */}
                  <div className="relative rounded-2xl bg-[#fcfaf5] p-5 shadow-lg border border-[#171a3d]/10 transform sm:rotate-1 hover:rotate-0 transition-transform duration-300 flex flex-col justify-between min-h-[200px]">
                    {/* Chincheta Dorada 3D */}
                    <div
                      className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-20 rounded-full shadow-[0_2px_5px_rgba(0,0,0,0.35)] border border-white"
                      style={{
                        width: '18px',
                        height: '18px',
                        background: 'radial-gradient(circle at 35% 35%, #ffe17d, #f2b725 70%, #b8860c)',
                      }}
                    >
                      <div className="h-1 w-1 rounded-full bg-white/80 absolute top-1 left-1" />
                    </div>

                    <div className="space-y-2.5 pt-1">
                      <div className="h-9 w-9 rounded-full bg-[#f0fdf9] text-[#3da898] border border-[#3da898]/20 flex items-center justify-center">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <h4 className="font-extrabold text-base text-[#171a3d] leading-snug">
                        Entregas en campus
                      </h4>
                      <p className="text-xs text-[#171a3d]/75 font-medium leading-relaxed">
                        Coordina puntos de entrega seguros en las bibliotecas o plazoletas de tu propia sede universitaria.
                      </p>
                    </div>
                  </div>

                  {/* Nota 3: ¿Tienes cosas del semestre pasado? (Cinta adhesiva naranja) */}
                  <div className="sm:col-span-2 relative rounded-2xl bg-[#fcfaf5] p-6 shadow-lg border border-[#171a3d]/10 transform sm:-rotate-0.5 hover:rotate-0 transition-transform duration-300">
                    {/* Cinta adhesiva naranja / Washi tape */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 h-5 w-20 bg-[#ec8026]/90 shadow-sm backdrop-blur-sm border-x border-white/40 transform -rotate-1 rounded-sm" />

                    <div className="flex items-center justify-between gap-2 mb-2 pt-1">
                      <div className="h-8 w-8 rounded-full bg-[#f0fdf9] text-[#3da898] border border-[#3da898]/20 flex items-center justify-center">
                        <Plus className="h-4 w-4 stroke-[3]" />
                      </div>
                      <Link
                        to="/create"
                        className="text-xs font-bold text-[#3da898] hover:text-[#2e8f82] flex items-center gap-1 transition-colors group/link"
                      >
                        <span>Publicar aviso</span>
                        <ArrowRight className="h-3.5 w-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>

                    <h4 className="font-extrabold text-base text-[#171a3d] leading-snug">
                      ¿Tienes cosas del semestre pasado?
                    </h4>
                    <p className="text-xs text-[#171a3d]/75 font-medium leading-relaxed mt-1">
                      Pega tu aviso en la cartelera en menos de 2 minutos y conéctate directamente con compañeros interesados por WhatsApp o correo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SlowSlide>

          {/* ========================================================= */}
          {/* SEPARACIÓN ENTRE LOS 2 TABLONES: Encabezado y Filtros     */}
          {/* ========================================================= */}
          <div className="pt-16 space-y-6">
            <SlowSlide direction="up" duration={0.8} distance={25}>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#171a3d]/10 pb-4">
                <div>
                  <div className="flex items-center gap-2.5 mb-1.5">
                    {/* Glossy 3D Red Pushpin Icon from screenshot */}
                    <span className="relative flex h-4 w-4 items-center justify-center shrink-0">
                      <span className="h-4 w-4 rounded-full bg-gradient-to-tr from-[#df4838] via-[#ef4444] to-[#fca5a5] shadow-[0_2px_4px_rgba(0,0,0,0.25)] border border-white/80" />
                      <span className="absolute top-0.5 left-1 h-1.5 w-1.5 rounded-full bg-white/90" />
                    </span>
                    <span className="text-xs font-aeonik font-bold uppercase tracking-[0.06em] text-[#ec8026]">
                      Avisos Estudiantiles Activos
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-extrabold text-[#171a3d] tracking-tight uppercase">
                    Publicaciones recientes en el tablón
                  </h3>
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

              {/* Filtro Rápido por Categorías */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 min-w-max mt-4">
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

            {/* TABLÓN 2: Segundo Tablero Verde de Tiza con los Avisos Clavados */}
            <SlowSlide direction="up" delay={0.2} duration={0.85} distance={35}>
              <div
                className="relative rounded-[28px] sm:rounded-[36px] p-5 sm:p-7 md:p-8 pb-8 sm:pb-10 border-[7px] sm:border-[11px] border-[#7a4b22] shadow-[inset_0_4px_40px_rgba(0,0,0,0.65),0_18px_45px_-8px_rgba(23,26,61,0.22)] overflow-hidden mt-6"
                style={{
                  backgroundColor: '#1b3b2b',
                  backgroundImage: `
                    radial-gradient(ellipse at 50% 30%, rgba(45, 90, 68, 0.45), transparent 70%),
                    radial-gradient(circle at 15% 85%, rgba(18, 42, 31, 0.6), transparent 50%),
                    radial-gradient(circle at 85% 20%, rgba(35, 75, 56, 0.35), transparent 50%),
                    repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.012) 0px, rgba(255, 255, 255, 0.012) 2px, transparent 2px, transparent 8px)
                  `,
                }}
              >
                {/* Tornillos de latón dorado en Tablero 2 */}
                <div className="absolute top-3 left-3 h-3.5 w-3.5 rounded-full bg-[#b8860b] border border-[#fef08a]/60 shadow-inner flex items-center justify-center">
                  <div className="h-2 w-0.5 bg-[#422006] rotate-45" />
                </div>
                <div className="absolute top-3 right-3 h-3.5 w-3.5 rounded-full bg-[#b8860b] border border-[#fef08a]/60 shadow-inner flex items-center justify-center">
                  <div className="h-2 w-0.5 bg-[#422006] -rotate-45" />
                </div>
                <div className="absolute bottom-3 left-3 h-3.5 w-3.5 rounded-full bg-[#b8860b] border border-[#fef08a]/60 shadow-inner flex items-center justify-center">
                  <div className="h-2 w-0.5 bg-[#422006] -rotate-45" />
                </div>
                <div className="absolute bottom-3 right-3 h-3.5 w-3.5 rounded-full bg-[#b8860b] border border-[#fef08a]/60 shadow-inner flex items-center justify-center">
                  <div className="h-2 w-0.5 bg-[#422006] rotate-45" />
                </div>

                {/* Repisa para tizas inferior en Tablero 2 */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 hidden sm:flex items-center gap-2 px-4 py-0.5 rounded-t-md bg-[#5c3514] border-t border-x border-[#8b5321] shadow-inner">
                  <span className="w-5 h-1.5 rounded-full bg-[#ffffff]/90 shadow-sm" />
                  <span className="w-4 h-1.5 rounded-full bg-[#fef08a]/90 shadow-sm" />
                </div>

                {/* Cuadrícula de Avisos Bento Clavados */}
                {displayPosts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {displayPosts.map((post, idx) => {
                      const bento = getBentoConfig(idx);
                      return (
                        <div key={post.id} className={`${bento.className} relative pt-2 group/pin`}>
                          {/* Chincheta 3D sobre la tarjeta */}
                          <div
                            className="absolute top-0 left-6 z-20 rounded-full shadow-[0_3px_5px_rgba(0,0,0,0.4)] border border-[#ffffff]/90 flex items-center justify-center transition-transform group-hover/pin:scale-110"
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
                  <div className="rounded-2xl bg-[#fcfaf5] p-12 text-center border-2 border-dashed border-[#1b3b2b]/40 space-y-3 max-w-md mx-auto my-6 shadow-md relative">
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
