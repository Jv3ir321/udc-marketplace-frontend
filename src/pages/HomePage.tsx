import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMarketplace } from '@/context/MarketplaceContext';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { PageTransition } from '@/components/common/PageTransition';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  ShoppingBag,
  Sparkles,
  BookOpen,
  Laptop,
  Shirt,
  Home as HomeIcon,
  GraduationCap,
  ArrowRight,
  Search,
  MapPin,
  ArrowUp,
} from 'lucide-react';
import { CATEGORIAS_PRODUCTO, UDC_SEDES } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export const HomePage: React.FC = () => {
  const { posts } = useMarketplace();
  const [heroSearch, setHeroSearch] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 300);
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

  const featuredPosts = posts.slice(0, 3);

  const categoryMeta: Record<string, { icon: React.ReactNode; bg: string }> = {
    'Libros y Fotocopias': {
      icon: <BookOpen className="h-5 w-5 text-orange-600" />,
      bg: 'bg-white hover:bg-orange-50/50 border-stone-200 hover:border-orange-300 shadow-xs hover:shadow-md',
    },
    'Calculadoras y Tecnología': {
      icon: <Laptop className="h-5 w-5 text-amber-600" />,
      bg: 'bg-white hover:bg-amber-50/50 border-stone-200 hover:border-amber-300 shadow-xs hover:shadow-md',
    },
    'Uniformes y Batas': {
      icon: <Shirt className="h-5 w-5 text-emerald-600" />,
      bg: 'bg-white hover:bg-emerald-50/50 border-stone-200 hover:border-emerald-300 shadow-xs hover:shadow-md',
    },
    'Habitaciones y Alquiler': {
      icon: <HomeIcon className="h-5 w-5 text-rose-600" />,
      bg: 'bg-white hover:bg-rose-50/50 border-stone-200 hover:border-rose-300 shadow-xs hover:shadow-md',
    },
    'Servicios y Tutorías': {
      icon: <GraduationCap className="h-5 w-5 text-orange-700" />,
      bg: 'bg-white hover:bg-orange-50/60 border-stone-200 hover:border-orange-400 shadow-xs hover:shadow-md',
    },
  };

  return (
    <PageTransition className="min-h-screen flex flex-col bg-background selection:bg-orange-500 selection:text-white">
      {/* 
        Hero Section Original con Estilo Visual Completo (Compactado para reducir scroll)
      */}
      <section className="relative overflow-hidden bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 text-white py-10 sm:py-14 px-4 sm:px-6 lg:px-8 border-b border-orange-500/10">
        {/* Textura sutil y glows originales */}
        <div className="absolute inset-0 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:28px_28px] opacity-15 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full bg-gradient-to-tr from-orange-600/25 via-amber-500/20 to-transparent blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute bottom-4 right-10 w-72 h-72 bg-orange-600/10 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-4xl mx-auto w-full relative z-10 text-center space-y-4 sm:space-y-5">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight max-w-4xl mx-auto leading-tight text-white"
          >
            Compra, vende y conecta en tu{' '}
            <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-300 bg-clip-text text-transparent">
              Campus UDC
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="text-xs sm:text-sm text-stone-300 max-w-lg mx-auto leading-relaxed"
          >
            La plataforma exclusiva para estudiantes de la Universidad de Cartagena. Intercambia libros, batas, calculadoras y tutorías de forma directa.
          </motion.p>

<<<<<<< HEAD
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <Link
                  to="/catalog?create=true"
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

          {/* Bento Grid Mosaic Lower Section: 4 Core Services */}
          <SlowSlide direction="up" delay={0.15} duration={0.85} distance={35}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Service 1: Yellow (#f2b725) - Compra y Venta Académica */}
              <div className="rounded-[28px] bg-[#f2b725] p-6 sm:p-7 text-[#171a3d] flex flex-col justify-between min-h-[300px] shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 group">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-[#171a3d] text-[#ffffff] text-[10px] font-extrabold uppercase tracking-[0.06em]">
                      Catálogo Académico
                    </span>
                    <div className="h-8 w-8 rounded-full bg-[#ffffff]/30 flex items-center justify-center text-[#171a3d]">
                      <BookOpen className="h-4 w-4" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-[#171a3d] leading-tight uppercase tracking-tight">
                      Compra y Venta de Material
                    </h3>
                    <p className="text-xs text-[#171a3d]/85 font-medium leading-relaxed mt-2">
                      Libros de texto universitarios, batas antifluidos, instrumental odontológico, calculadoras científicas y tecnología entre compañeros.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#171a3d]/15">
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-md bg-[#ffffff]/50 text-[10px] font-bold text-[#171a3d]">
                      Libros & Guías
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-[#ffffff]/50 text-[10px] font-bold text-[#171a3d]">
                      Batas & Instrumental
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-[#ffffff]/50 text-[10px] font-bold text-[#171a3d]">
                      Calculadoras
                    </span>
                  </div>
                </div>
              </div>

              {/* Service 2: Orange (#ec8026) - Contacto Inmediato WhatsApp */}
              <div className="rounded-[28px] bg-[#ec8026] p-6 sm:p-7 text-[#ffffff] flex flex-col justify-between min-h-[300px] shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 group">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-[#171a3d] text-[#ffffff] text-[10px] font-extrabold uppercase tracking-[0.06em]">
                      Trato Directo
                    </span>
                    <div className="h-8 w-8 rounded-full bg-[#ffffff]/25 flex items-center justify-center text-[#ffffff]">
                      <WhatsappIcon size={18} />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-[#ffffff] leading-tight uppercase tracking-tight">
                      Contacto por WhatsApp en 1 Clic
                    </h3>
                    <p className="text-xs text-[#ffffff]/90 font-medium leading-relaxed mt-2">
                      Sin pasarelas engorrosas ni formularios lentos. Chatea directamente con el estudiante vendedor para negociar y acordar entrega de inmediato.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#ffffff]/20">
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-md bg-[#ffffff]/20 text-[10px] font-bold text-[#ffffff]">
                      Chat directo
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-[#ffffff]/20 text-[10px] font-bold text-[#ffffff]">
                      Sin intermediarios
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-[#ffffff]/20 text-[10px] font-bold text-[#ffffff]">
                      Respuesta rápida
                    </span>
                  </div>
                </div>
              </div>

              {/* Service 3: Red / Coral (#df4838) - Entregas en Sede Oficial */}
              <div className="rounded-[28px] bg-[#df4838] p-6 sm:p-7 text-[#ffffff] flex flex-col justify-between min-h-[300px] shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 group">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-[#171a3d] text-[#ffffff] text-[10px] font-extrabold uppercase tracking-[0.06em]">
                      Puntos Seguros
                    </span>
                    <div className="h-8 w-8 rounded-full bg-[#ffffff]/25 flex items-center justify-center text-[#ffffff]">
                      <MapPin className="h-4 w-4" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-[#ffffff] leading-tight uppercase tracking-tight">
                      Entregas en Sedes y Claustro
                    </h3>
                    <p className="text-xs text-[#ffffff]/90 font-medium leading-relaxed mt-2">
                      Acuerda puntos de entrega físicos en las bibliotecas o plazoletas de San Agustín, Zaragocilla, Piedra de Bolívar o San Pablo con total tranquilidad.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#ffffff]/20">
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-md bg-[#ffffff]/20 text-[10px] font-bold text-[#ffffff]">
                      San Agustín
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-[#ffffff]/20 text-[10px] font-bold text-[#ffffff]">
                      Zaragocilla
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-[#ffffff]/20 text-[10px] font-bold text-[#ffffff]">
                      Piedra Bolívar
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-[#ffffff]/20 text-[10px] font-bold text-[#ffffff]">
                      San Pablo
                    </span>
                  </div>
                </div>
              </div>

              {/* Service 4: Deep UDC Navy Slate (#171a3d) - Publicación Gratuita 0% Comisiones */}
              <div className="rounded-[28px] bg-[#171a3d] p-6 sm:p-7 text-[#ffffff] flex flex-col justify-between min-h-[300px] shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 group border border-[#ffffff]/10">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-[#ec8026] text-[#ffffff] text-[10px] font-extrabold uppercase tracking-[0.06em]">
                      0% Tarifas
                    </span>
                    <div className="h-8 w-8 rounded-full bg-[#ffffff]/10 flex items-center justify-center text-[#ec8026]">
                      <Sparkles className="h-4 w-4" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-[#ffffff] leading-tight uppercase tracking-tight">
                      Publica Gratis y Sin Comisiones
                    </h3>
                    <p className="text-xs text-[#ffffff]/75 font-medium leading-relaxed mt-2">
                      Sube tus fotos, describe tu aviso en 2 minutos y recibe ofertas. El 100% del dinero acordado es para ti por Nequi, Daviplata o efectivo.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#ffffff]/15">
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-md bg-[#ffffff]/10 text-[10px] font-bold text-[#3da898]">
                      100% Gratuito
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-[#ffffff]/10 text-[10px] font-bold text-[#ffffff]/90">
                      Nequi / Efectivo
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-[#ffffff]/10 text-[10px] font-bold text-[#ffffff]/90">
                      Aviso en 2 min
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </SlowSlide>
=======
          {/* Buscador Interactivo Glassmorphism Original */}
          <motion.form
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, delay: 0.15 }}
            onSubmit={handleHeroSearch}
            className="max-w-2xl mx-auto w-full flex items-center bg-white/10 backdrop-blur-md border border-white/20 p-1.5 sm:p-2 rounded-full shadow-xl focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-500/20 transition-all"
          >
            <Search className="h-4 w-4 sm:h-5 sm:w-5 text-orange-300 ml-3 shrink-0" />
            <Input
              type="text"
              placeholder="¿Qué estás buscando? (ej. Bata Zaragocilla, Calculadora...)"
              className="bg-transparent border-0 text-white placeholder:text-stone-400 focus-visible:ring-0 text-xs sm:text-sm h-9 sm:h-10 shadow-none px-3"
              value={heroSearch}
              onChange={(e) => setHeroSearch(e.target.value)}
            />
            <Button type="submit" variant="udc" className="rounded-full px-5 py-2 shrink-0 font-bold text-xs sm:text-sm shadow-md">
              Buscar
            </Button>
          </motion.form>
>>>>>>> 928337a9d08d81894669807c54b0e47ef9dcdf5b

          {/* Botones de acción compactos */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-3 pt-1"
          >
            <Button asChild size="default" variant="udc" className="rounded-full px-6 shadow-lg shadow-orange-600/30 text-xs sm:text-sm font-bold">
              <Link to="/catalog">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Explorar Catálogo
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Link>
            </Button>
            <Button
              asChild
              size="default"
              variant="outline"
              className="rounded-full px-5 bg-white/5 border-white/20 text-white hover:bg-orange-500/15 hover:border-orange-400 text-xs sm:text-sm font-bold"
            >
              <Link to="/create">Publicar Anuncio</Link>
            </Button>
          </motion.div>
        </div>
      </section>

<<<<<<< HEAD
      {/* ========================================================= */}
      {/* 2. TABLÓN DE ANUNCIOS ESTUDIANTIL COMPLETO                */}
      {/* ========================================================= */}
      <section className="w-full bg-[#faf8f5] py-14 px-4 sm:px-8 border-b border-[#171a3d]/10">
        <div className="max-w-[1360px] mx-auto">
          <SlowSlide direction="up" duration={0.85} distance={30}>
            {/* Tablero Estudiantil en Gris Carbón / Pizarra Sobria */}
            <div
              className="relative rounded-[28px] sm:rounded-[40px] p-6 sm:p-10 md:p-12 border-[6px] sm:border-[8px] border-[#373c47] shadow-[inset_0_4px_35px_rgba(0,0,0,0.55),0_18px_45px_-8px_rgba(23,26,61,0.18)] overflow-hidden"
              style={{
                backgroundColor: '#22262e',
                backgroundImage: `
                  radial-gradient(ellipse at 50% 25%, rgba(68, 76, 92, 0.45), transparent 70%),
                  radial-gradient(circle at 85% 85%, rgba(20, 22, 28, 0.75), transparent 60%),
                  repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.012) 0px, rgba(255, 255, 255, 0.012) 2px, transparent 2px, transparent 8px)
                `,
              }}
            >
              {/* Remaches de fijación metálicos en las esquinas */}
              <div className="absolute top-3.5 left-3.5 h-3.5 w-3.5 rounded-full bg-[#424855] border border-[#ffffff]/25 shadow-inner flex items-center justify-center">
                <div className="h-2 w-0.5 bg-[#1c1e24] rotate-45" />
              </div>
              <div className="absolute top-3.5 right-3.5 h-3.5 w-3.5 rounded-full bg-[#424855] border border-[#ffffff]/25 shadow-inner flex items-center justify-center">
                <div className="h-2 w-0.5 bg-[#1c1e24] -rotate-45" />
              </div>
              <div className="absolute bottom-3.5 left-3.5 h-3.5 w-3.5 rounded-full bg-[#424855] border border-[#ffffff]/25 shadow-inner flex items-center justify-center">
                <div className="h-2 w-0.5 bg-[#1c1e24] -rotate-45" />
              </div>
              <div className="absolute bottom-3.5 right-3.5 h-3.5 w-3.5 rounded-full bg-[#424855] border border-[#ffffff]/25 shadow-inner flex items-center justify-center">
                <div className="h-2 w-0.5 bg-[#1c1e24] rotate-45" />
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
                  <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#ffffff] leading-[1.05] tracking-tight uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
                    Lo que necesitas para tu semestre,{' '}
                    <span className="underline decoration-[#3da898] decoration-[5px] underline-offset-8">
                      en tu propio campus.
                    </span>
                  </h2>

                  {/* Caja de Explicación sobria y traslúcida */}
                  <div className="bg-[#ffffff]/10 backdrop-blur-md rounded-2xl p-5 sm:p-6 text-[#ffffff]/90 text-sm sm:text-base font-normal leading-relaxed border border-[#ffffff]/15 shadow-xl max-w-xl">
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
                        to="/catalog?create=true"
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
=======
      {/* 
        Categorías Populares (Compactas, sin scroll excesivo)
      */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2 mb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-900 text-[10px] font-bold mb-1 border border-orange-200">
              <Sparkles className="h-3 w-3 text-orange-600" />
              <span>Categorías</span>
>>>>>>> 928337a9d08d81894669807c54b0e47ef9dcdf5b
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              Explora por Categoría
            </h2>
          </div>
          <Link
            to="/catalog"
            className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 group"
          >
            <span>Ver catálogo</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
          {CATEGORIAS_PRODUCTO.slice(0, 5).map((cat, idx) => {
            const meta = categoryMeta[cat] || {
              icon: <Sparkles className="h-5 w-5 text-primary" />,
              bg: 'bg-white hover:bg-stone-50 border-stone-200 shadow-xs',
            };
            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: idx * 0.03 }}
              >
                <Link
                  to={`/catalog?category=${encodeURIComponent(cat)}`}
                  className={`p-3.5 rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 flex flex-col items-center text-center justify-center block h-full ${meta.bg}`}
                >
                  <div className="h-10 w-10 rounded-xl bg-orange-50 shadow-xs flex items-center justify-center mb-2 border border-orange-100">
                    {meta.icon}
                  </div>
                  <h3 className="font-bold text-xs text-stone-900 leading-tight">{cat}</h3>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

<<<<<<< HEAD
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
                        to="/catalog?create=true"
                        className="inline-flex items-center gap-2 h-10 px-5 rounded-full bg-[#ec8026] text-[#ffffff] font-aeonik font-bold text-xs hover:bg-[#d97018] transition-transform active:scale-95 shadow-sm"
                      >
                        <Plus className="h-3.5 w-3.5 stroke-[3]" />
                        <span>Colgar Primer Aviso</span>
                      </Link>
                    </div>
                  </div>
                )}
=======
      {/* 
        Publicaciones Recientes (Fila de 3 items en vez de 6 para reducir scroll vertical a la mitad)
      */}
      <section className="bg-stone-100/50 py-8 sm:py-10 px-4 sm:px-6 lg:px-8 border-y border-stone-200/70">
        <div className="max-w-7xl mx-auto space-y-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 text-[10px] font-bold mb-1">
                <ShoppingBag className="h-3 w-3 text-orange-600" />
                <span>Novedades</span>
>>>>>>> 928337a9d08d81894669807c54b0e47ef9dcdf5b
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                Publicaciones Recientes
              </h2>
            </div>

            <Button asChild variant="udc" size="sm" className="rounded-full font-bold text-xs shadow-xs">
              <Link to="/catalog">
                Ver Todas
                <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Link>
            </Button>
          </div>

          {featuredPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredPosts.map((post) => (
                <ProductCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-stone-200 p-8 text-center space-y-3 shadow-xs">
              <ShoppingBag className="h-10 w-10 text-orange-300 mx-auto" />
              <h3 className="font-bold text-stone-900 text-sm">No hay publicaciones recientes</h3>
              <p className="text-xs text-stone-500">Sé el primero de tu facultad en publicar un artículo.</p>
              <Button asChild variant="udc" size="sm" className="rounded-full mt-2">
                <Link to="/create">Publicar Anuncio</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* 
        Sedes UDC Compactas
      */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 w-full">
        <div className="bg-gradient-to-br from-stone-950 via-stone-900 to-orange-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl text-center space-y-4 relative overflow-hidden border border-white/10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/15 blur-3xl pointer-events-none rounded-full" />

          <div className="relative z-10 max-w-lg mx-auto space-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Presentes en Todos los Campus UDC
            </h2>
            <p className="text-xs text-stone-300">
              Encuentra ofertas y entrega de forma directa y segura en tu facultad
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center justify-center gap-1.5 pt-1">
            {UDC_SEDES.map((sede) => (
              <Link
                key={sede}
                to={`/catalog?sede=${encodeURIComponent(sede)}`}
                className="bg-white/10 hover:bg-orange-500/30 border border-white/15 hover:border-orange-400 text-white text-[11px] font-semibold px-3 py-1.5 rounded-full backdrop-blur-md transition-all flex items-center gap-1 shadow-xs hover:scale-105 active:scale-95"
              >
                <MapPin className="h-3 w-3 text-orange-400" />
                <span>{sede}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* Botón flotante para volver arriba */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-orange-600 text-white shadow-xl shadow-orange-600/40 hover:bg-orange-700 transition-all hover:scale-110 active:scale-95 focus:outline-none"
            aria-label="Volver arriba"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </PageTransition>
  );
};
