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
  ShieldCheck,
  Zap,
  Users,
  BookOpen,
  Laptop,
  Shirt,
  Home as HomeIcon,
  GraduationCap,
  ArrowRight,
  Search,
  MapPin,
  ArrowUp,
  ChevronDown,
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
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

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

  const featuredPosts = posts.slice(0, 6);

  const categoryMeta: Record<string, { icon: React.ReactNode; desc: string; bg: string }> = {
    'Libros y Fotocopias': {
      icon: <BookOpen className="h-6 w-6 text-orange-600" />,
      desc: 'Textos guía, guías impresas, apuntes y literatura',
      bg: 'bg-white hover:bg-orange-50/50 border-stone-200/90 hover:border-orange-300 shadow-xs hover:shadow-md',
    },
    'Calculadoras y Tecnología': {
      icon: <Laptop className="h-6 w-6 text-amber-600" />,
      desc: 'Calculadoras científicas, tablets, laptops y accesorios',
      bg: 'bg-white hover:bg-amber-50/50 border-stone-200/90 hover:border-amber-300 shadow-xs hover:shadow-md',
    },
    'Uniformes y Batas': {
      icon: <Shirt className="h-6 w-6 text-emerald-600" />,
      desc: 'Batas de laboratorio, trajes clínicos y uniformes',
      bg: 'bg-white hover:bg-emerald-50/50 border-stone-200/90 hover:border-emerald-300 shadow-xs hover:shadow-md',
    },
    'Habitaciones y Alquiler': {
      icon: <HomeIcon className="h-6 w-6 text-rose-600" />,
      desc: 'Alojamiento estudiantil cerca de los campus',
      bg: 'bg-white hover:bg-rose-50/50 border-stone-200/90 hover:border-rose-300 shadow-xs hover:shadow-md',
    },
    'Servicios y Tutorías': {
      icon: <GraduationCap className="h-6 w-6 text-orange-700" />,
      desc: 'Clases particulares, asesorías y nivelaciones',
      bg: 'bg-white hover:bg-orange-50/60 border-stone-200/90 hover:border-orange-400 shadow-xs hover:shadow-md',
    },
  };

  return (
    <PageTransition className="min-h-screen flex flex-col bg-background selection:bg-orange-500 selection:text-white">
      {/* 
        Hero Section with Dynamic Viewport Adaptation & Ambient Atmospheric Glow
      */}
      <section className="relative overflow-hidden bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 text-white min-h-[calc(100vh-4rem)] lg:min-h-[calc(100dvh-4rem)] flex flex-col justify-between px-4 sm:px-6 lg:px-8 border-b border-orange-500/10">
        {/* Subtle dot matrix texture */}
        <div className="absolute inset-0 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:28px_28px] opacity-15 pointer-events-none" />
        {/* Ambient radial glow orbs that adapt dynamically */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full bg-gradient-to-tr from-orange-600/25 via-amber-500/20 to-transparent blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute bottom-10 right-10 w-72 sm:w-96 h-72 sm:h-96 bg-orange-600/10 blur-[120px] pointer-events-none rounded-full" />

        {/* Main Hero Content Area */}
        <div className="flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full relative z-10 text-center space-y-5 sm:space-y-6 py-8 sm:py-12">
        
        <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-4xl mx-auto leading-[1.15] text-white"
          >
            Compra, vende y conecta en tu{' '}
            <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-300 bg-clip-text text-transparent">
              Campus UDC
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-xs sm:text-base text-stone-300 max-w-2xl mx-auto leading-relaxed"
          >
            La plataforma exclusiva para estudiantes y docentes de la Universidad de Cartagena. Intercambia libros, calculadoras, batas médicas y tutorías de forma directa y segura.
          </motion.p>

          {/* Hero Interactive Search Bar */}
          <motion.form
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            onSubmit={handleHeroSearch}
            className="max-w-2xl mx-auto w-full flex items-center bg-white/10 backdrop-blur-md border border-white/20 p-1.5 sm:p-2 rounded-full shadow-2xl focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-500/20 transition-all"
          >
            <Search className="h-4 w-4 sm:h-5 sm:w-5 text-orange-300 ml-3 shrink-0" />
            <Input
              type="text"
              placeholder="¿Qué estás buscando? (ej. Bata Zaragocilla, Calculadora...)"
              className="bg-transparent border-0 text-white placeholder:text-stone-400 focus-visible:ring-0 text-xs sm:text-sm h-10 shadow-none px-3"
              value={heroSearch}
              onChange={(e) => setHeroSearch(e.target.value)}
            />
            <Button type="submit" variant="udc" className="rounded-full px-5 py-2 shrink-0 font-bold text-xs sm:text-sm shadow-md">
              Buscar
            </Button>
          </motion.form>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-1"
          >
            <Button asChild size="lg" variant="udc" className="rounded-full px-7 sm:px-8 shadow-xl shadow-orange-600/30 text-xs sm:text-sm font-bold">
              <Link to="/catalog">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Explorar Catálogo
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full px-6 sm:px-7 bg-white/5 border-white/20 text-white hover:bg-orange-500/15 hover:border-orange-400 text-xs sm:text-sm font-bold"
            >
              <Link to="/create">Publicar un Anuncio</Link>
            </Button>
          </motion.div>
        </div>

        {/* Bottom Hero Area: Value Props & Scroll Indicator */}
        <div className="relative z-10 max-w-7xl mx-auto w-full pb-4 sm:pb-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto text-left">
            <div className="bg-stone-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-3.5 sm:p-4 flex items-center gap-3.5 shadow-sm hover:border-orange-500/30 transition-all">
              <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white">100% Universitario</h4>
                <p className="text-[11px] text-stone-400">Comunidad verificada UDC</p>
              </div>
            </div>

            <div className="bg-stone-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-3.5 sm:p-4 flex items-center gap-3.5 shadow-sm hover:border-amber-500/30 transition-all">
              <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white">Trato Directo</h4>
                <p className="text-[11px] text-stone-400">Sin comisiones por WhatsApp</p>
              </div>
            </div>

            <div className="bg-stone-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-3.5 sm:p-4 flex items-center gap-3.5 shadow-sm hover:border-orange-500/30 transition-all">
              <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-2xl bg-orange-600/20 text-orange-300 flex items-center justify-center shrink-0">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white">Todas las Sedes</h4>
                <p className="text-[11px] text-stone-400">Zaragocilla, Bolívar, San Agustín...</p>
              </div>
            </div>
          </div>

          {/* Soft Scroll Indicator at the bottom */}
          <div className="pt-2 text-center">
            <button
              onClick={() => scrollToSection('categorias')}
              className="inline-flex flex-col items-center text-stone-400 hover:text-orange-400 transition-colors text-[11px] font-medium animate-bounce"
            >
              <span>Desliza para explorar</span>
              <ChevronDown className="h-4 w-4 mt-0.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Featured Categories Section */}
      <section id="categorias" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-900 text-[11px] font-bold mb-1.5 border border-orange-200">
              <Sparkles className="h-3.5 w-3.5 text-orange-600" />
              <span>Categorías Populares</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              Explora por Categoría
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              Encuentra lo que necesitas para tu semestre académico
            </p>
          </div>
          <Link
            to="/catalog"
            className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 group"
          >
            <span>Ver catálogo completo</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {CATEGORIAS_PRODUCTO.map((cat, idx) => {
            const meta = categoryMeta[cat] || {
              icon: <Sparkles className="h-6 w-6 text-primary" />,
              desc: 'Artículos y publicaciones universitarias',
              bg: 'bg-white hover:bg-stone-50 border-stone-200 shadow-xs',
            };
            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <Link
                  to={`/catalog?category=${encodeURIComponent(cat)}`}
                  className={`p-5 sm:p-6 rounded-3xl border transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between block h-full ${meta.bg}`}
                >
                  <div className="h-11 w-11 rounded-2xl bg-orange-50/80 shadow-xs flex items-center justify-center mb-3.5 border border-orange-100">
                    {meta.icon}
                  </div>
                  <div>
                    <h3 className="font-black text-sm sm:text-base text-stone-900 mb-1">{cat}</h3>
                    <p className="text-xs text-stone-600 leading-relaxed">{meta.desc}</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Featured Recent Products Highlight */}
      <section className="bg-stone-100/50 py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-y border-stone-200/70">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-[11px] font-bold mb-1.5">
                <ShoppingBag className="h-3.5 w-3.5 text-orange-600" />
                <span>Novedades en el Campus</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                Publicaciones Recientes
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                Artículos publicados por estudiantes de la Universidad de Cartagena
              </p>
            </div>

            <Button asChild variant="udc" className="rounded-full font-bold text-xs shadow-md">
              <Link to="/catalog">
                Ver Catálogo Completo
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Link>
            </Button>
          </div>

          {featuredPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
                <ProductCard key={post.id} post={post} dark={false} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-stone-200 p-10 text-center space-y-3 shadow-xs">
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

      {/* How it Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-[11px] font-bold">
            <Zap className="h-3.5 w-3.5 text-orange-600" />
            <span>Fácil y Rápido</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            ¿Cómo Funciona UDC Marketplace?
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            Diseñado para conectar estudiantes de forma transparente, directa y sin intermediarios
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-center">
          <div className="bg-white p-7 rounded-3xl border border-stone-200/80 shadow-xs space-y-3 hover:border-orange-300 transition-colors">
            <div className="h-12 w-12 rounded-2xl bg-orange-500/10 text-orange-600 font-black text-lg flex items-center justify-center mx-auto">
              1
            </div>
            <h3 className="font-black text-base text-stone-900">Encuentra o Publica</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Explora el catálogo o publica tus libros, batas o calculadoras con fotos y descripción en segundos.
            </p>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-stone-200/80 shadow-xs space-y-3 hover:border-amber-300 transition-colors">
            <div className="h-12 w-12 rounded-2xl bg-amber-500/10 text-amber-600 font-black text-lg flex items-center justify-center mx-auto">
              2
            </div>
            <h3 className="font-black text-base text-stone-900">Conecta por WhatsApp</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Haz clic en "Contactar Vendedor" para abrir un chat directo y acordar el precio y la entrega.
            </p>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-stone-200/80 shadow-xs space-y-3 hover:border-emerald-300 transition-colors">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 text-emerald-600 font-black text-lg flex items-center justify-center mx-auto">
              3
            </div>
            <h3 className="font-black text-base text-stone-900">Entrega en tu Campus</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Encuéntrense en Zaragocilla, San Agustín, Piedra de Bolívar o tu sede preferida de forma segura.
            </p>
          </div>
        </div>
      </section>

      {/* University Campuses Floating Card Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
        <div className="bg-gradient-to-br from-stone-950 via-stone-900 to-orange-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl text-center space-y-6 relative overflow-hidden border border-white/10">
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-600/15 blur-3xl pointer-events-none rounded-full" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Presentes en Todos los Campus de la UDC
            </h2>
            <p className="text-xs sm:text-sm text-stone-300">
              Filtra por tu sede y encuentra ofertas cercanas a tus facultades
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center justify-center gap-2.5 pt-2">
            {UDC_SEDES.map((sede) => (
              <Link
                key={sede}
                to={`/catalog?sede=${encodeURIComponent(sede)}`}
                className="bg-white/10 hover:bg-orange-500/30 border border-white/15 hover:border-orange-400 text-white text-xs font-semibold px-4 py-2 rounded-full backdrop-blur-md transition-all flex items-center gap-1.5 shadow-xs hover:scale-105 active:scale-95"
              >
                <MapPin className="h-3.5 w-3.5 text-orange-400" />
                <span>{sede}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Scroll to Top Button */}
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
