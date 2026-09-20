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
  Coffee,
  Stethoscope,
  Tag,
  ArrowRight,
  Search,
  MapPin,
  ArrowUp,
  ShieldCheck,
  Zap,
  Users,
  CheckCircle2,
  Plus,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CATEGORY_CONFIG } from '@/lib/utils';

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

  const categoryCards = [
    {
      name: 'Libros y Fotocopias',
      icon: <BookOpen className="h-5 w-5 text-orange-600 dark:text-orange-400" />,
      config: CATEGORY_CONFIG['Libros y Fotocopias'],
      desc: 'Guías, libros y apuntes',
    },
    {
      name: 'Calculadoras y Tecnología',
      icon: <Laptop className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />,
      config: CATEGORY_CONFIG['Calculadoras y Tecnología'],
      desc: 'Calculadoras y tablets',
    },
    {
      name: 'Uniformes y Batas',
      icon: <Shirt className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />,
      config: CATEGORY_CONFIG['Uniformes y Batas'],
      desc: 'Batas clínicas y salud',
    },
    {
      name: 'Habitaciones y Alquiler',
      icon: <HomeIcon className="h-5 w-5 text-rose-600 dark:text-rose-400" />,
      config: CATEGORY_CONFIG['Habitaciones y Alquiler'],
      desc: 'Alojamientos cerca a sedes',
    },
    {
      name: 'Servicios y Tutorías',
      icon: <GraduationCap className="h-5 w-5 text-purple-600 dark:text-purple-400" />,
      config: CATEGORY_CONFIG['Servicios y Tutorías'],
      desc: 'Clases y asesorías',
    },
    {
      name: 'Snacks y Alimentación',
      icon: <Coffee className="h-5 w-5 text-amber-600 dark:text-amber-400" />,
      config: CATEGORY_CONFIG['Snacks y Alimentación'],
      desc: 'Postres y snacks',
    },
    {
      name: 'Instrumentos y Salud',
      icon: <Stethoscope className="h-5 w-5 text-teal-600 dark:text-teal-400" />,
      config: CATEGORY_CONFIG['Instrumentos y Salud'],
      desc: 'Tensiómetros y salud',
    },
    {
      name: 'Otros',
      icon: <Tag className="h-5 w-5 text-slate-600 dark:text-slate-400" />,
      config: CATEGORY_CONFIG['Otros'],
      desc: 'Artículos varios',
    },
  ];

  const campusList = [
    {
      name: 'Claustro San Agustín',
      faculties: 'Derecho y Ciencias Económicas · Centro',
      border: 'border-slate-200/90 hover:border-slate-300 bg-white hover:bg-slate-50/70 dark:border-white/10 dark:hover:border-white/20 dark:bg-[#11162e] dark:hover:bg-[#151a36]',
      badge: 'bg-slate-100 text-slate-800 dark:bg-white/10 dark:text-slate-200',
    },
    {
      name: 'Sede Zaragocilla',
      faculties: 'Medicina, Enfermería y Odontología',
      border: 'border-slate-200/90 hover:border-slate-300 bg-white hover:bg-slate-50/70 dark:border-white/10 dark:hover:border-white/20 dark:bg-[#11162e] dark:hover:bg-[#151a36]',
      badge: 'bg-slate-100 text-slate-800 dark:bg-white/10 dark:text-slate-200',
    },
    {
      name: 'Sede Piedra de Bolívar',
      faculties: 'Ingenierías, Arquitectura y Ciencias',
      border: 'border-slate-200/90 hover:border-slate-300 bg-white hover:bg-slate-50/70 dark:border-white/10 dark:hover:border-white/20 dark:bg-[#11162e] dark:hover:bg-[#151a36]',
      badge: 'bg-slate-100 text-slate-800 dark:bg-white/10 dark:text-slate-200',
    },
    {
      name: 'Sede San Pablo',
      faculties: 'Ciencias Sociales y Educación',
      border: 'border-slate-200/90 hover:border-slate-300 bg-white hover:bg-slate-50/70 dark:border-white/10 dark:hover:border-white/20 dark:bg-[#11162e] dark:hover:bg-[#151a36]',
      badge: 'bg-slate-100 text-slate-800 dark:bg-white/10 dark:text-slate-200',
    },
  ];

  const steps = [
    {
      step: '01',
      title: 'Publica en 1 minuto',
      desc: 'Sube fotos, define el precio y selecciona tu sede.',
      icon: <Zap className="h-5 w-5 text-[#ec8026]" />,
      badgeBg: 'bg-orange-50 dark:bg-orange-950/60 text-[#ec8026] border border-orange-200/60',
    },
    {
      step: '02',
      title: 'Conecta por WhatsApp',
      desc: 'Trato directo e inmediato sin comisiones ni intermediarios.',
      icon: <Users className="h-5 w-5 text-[#3da898]" />,
      badgeBg: 'bg-teal-50 dark:bg-teal-950/60 text-[#3da898] border border-teal-200/60',
    },
    {
      step: '03',
      title: 'Entrega en tu Campus',
      desc: 'Encuéntrense en la biblioteca o cafetería de su facultad.',
      icon: <ShieldCheck className="h-5 w-5 text-[#171a3d] dark:text-sky-300" />,
      badgeBg: 'bg-indigo-50 dark:bg-indigo-950/60 text-[#171a3d] dark:text-sky-300 border border-indigo-200/60',
    },
  ];

  return (
    <PageTransition className="min-h-screen flex flex-col bg-[#f1f3f6] dark:bg-[#0b0e1e] text-[#0f172a] dark:text-slate-100 font-aeonik transition-colors duration-200">
      {/* 
        Hero Section Minimalista, con alto contraste y sombras ricas
      */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-white to-[#f1f3f6] dark:from-[#0b0e1e] dark:via-[#10142c] dark:to-[#0b0e1e] py-9 sm:py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-200/90 dark:border-white/10">
        {/* Glow sutil */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-gradient-to-tr from-orange-500/10 via-teal-500/5 to-transparent blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-4xl mx-auto w-full relative z-10 text-center space-y-4">
          {/* Badge institucional */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white dark:bg-[#11162e] border border-slate-300/80 dark:border-white/15 text-xs font-bold text-[#0f172a] dark:text-slate-200 shadow-subtle"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-[#3da898] animate-pulse" />
            <span>Comunidad Universitaria · Universidad de Cartagena</span>
          </motion.div>

          {/* Titular */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0f172a] dark:text-white leading-[1.1] max-w-3xl mx-auto"
          >
            Compra, vende y conecta en tu{' '}
            <span className="text-[#ec8026]">
              Campus UDC
            </span>
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 max-w-xl mx-auto leading-relaxed font-medium"
          >
            Intercambia libros, calculadoras, batas y tutorías mano a mano en tu facultad de forma directa y segura.
          </motion.p>

          {/* Buscador Interactivo Elevado */}
          <motion.form
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, delay: 0.15 }}
            onSubmit={handleHeroSearch}
            className="max-w-xl mx-auto w-full flex items-center bg-white dark:bg-[#11162e] border border-slate-300 dark:border-white/20 p-1.5 rounded-full shadow-elevation hover:shadow-lifted hover:border-slate-400 dark:hover:border-white/30 focus-within:border-[#ec8026] focus-within:ring-2 focus-within:ring-[#ec8026]/20 dark:focus-within:border-[#ec8026] transition-all duration-300"
          >
            <Search className="h-4.5 w-4.5 text-slate-400 dark:text-slate-500 ml-3.5 shrink-0" />
            <Input
              type="text"
              placeholder="¿Qué buscas? (ej. Bata Zaragocilla, Calculadora Casio, Libros...)"
              className="bg-transparent border-0 text-[#171a3d] dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus-visible:ring-0 text-xs sm:text-sm h-10 shadow-none px-3 font-medium"
              value={heroSearch}
              onChange={(e) => setHeroSearch(e.target.value)}
            />
            <Button
              type="submit"
              variant="udc"
              className="rounded-full px-5 h-10 shrink-0 font-extrabold text-xs sm:text-sm shadow-md shadow-[#ec8026]/25"
            >
              Buscar
            </Button>
          </motion.form>

          {/* Botones de acción principales */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-3 pt-1"
          >
            <Button
              asChild
              size="default"
              variant="navy"
              className="rounded-full h-10 px-6 text-xs sm:text-sm font-extrabold shadow-elevation dark:bg-white dark:text-[#0b0e1e] dark:hover:bg-slate-100"
            >
              <Link to="/catalog">
                <ShoppingBag className="h-4 w-4 mr-1.5 shrink-0" />
                <span>Explorar Catálogo</span>
                <ArrowRight className="h-4 w-4 ml-1.5 shrink-0" />
              </Link>
            </Button>
            <Button
              asChild
              size="default"
              variant="outline"
              className="rounded-full h-10 px-6 text-xs sm:text-sm font-extrabold bg-white dark:bg-[#11162e] border-slate-200 hover:border-slate-300 dark:border-white/15 text-[#171a3d] dark:text-white hover:bg-slate-50 dark:hover:bg-white/10 shadow-subtle"
            >
              <Link to="/catalog?create=true">
                <Plus className="h-4 w-4 text-[#ec8026] stroke-[2.5] mr-1.5 shrink-0" />
                <span>Publicar Artículo</span>
              </Link>
            </Button>
          </motion.div>

          {/* 3 Métricas / Puntos de confianza UDC */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-4 max-w-2xl mx-auto border-t border-slate-200/80 dark:border-white/10"
          >
            <div className="flex items-center justify-center gap-2 text-xs text-slate-600 dark:text-slate-300 font-medium">
              <CheckCircle2 className="h-4 w-4 text-[#3da898] shrink-0" />
              <span>100% Comunidad UDC</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-slate-600 dark:text-slate-300 font-medium">
              <CheckCircle2 className="h-4 w-4 text-[#3da898] shrink-0" />
              <span>Entrega en tu propia sede</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-slate-600 dark:text-slate-300 font-medium">
              <CheckCircle2 className="h-4 w-4 text-[#3da898] shrink-0" />
              <span>0% Comisiones ni cobros</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 
        Categorías Principales (Cuadrícula Homogénea Diferenciada)
      */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-9 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2 mb-3.5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-50 dark:bg-orange-950/50 text-[#ec8026] text-[11px] font-bold mb-1 border border-orange-200/60 dark:border-orange-800/40">
              <Sparkles className="h-3 w-3" />
              <span>Categorías</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#0f172a] dark:text-white tracking-tight">
              Explora por Categoría
            </h2>
          </div>
          <Link
            to="/catalog"
            className="text-xs font-bold text-[#ec8026] hover:text-[#d97018] flex items-center gap-1 group transition-colors"
          >
            <span>Ver todo el catálogo</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-2.5 sm:gap-3">
          {categoryCards.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: idx * 0.03 }}
            >
              <Link
                to={`/catalog?category=${encodeURIComponent(cat.name)}`}
                className={`p-3.5 rounded-3xl border transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center justify-center block h-full ${cat.config.cardLight} ${cat.config.cardDark}`}
              >
                <div className={`h-10 w-10 rounded-2xl shadow-xs flex items-center justify-center mb-2 ${cat.config.iconBgLight} ${cat.config.iconBgDark}`}>
                  {cat.icon}
                </div>
                <h3 className="font-extrabold text-xs text-[#0f172a] dark:text-white leading-snug">{cat.name}</h3>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 leading-tight font-medium">{cat.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 
        Publicaciones Recientes (Cuadrícula Homogénea de 3 Columnas)
      */}
      <section className="bg-[#e8ebf0]/70 dark:bg-[#0e1226] py-7 sm:py-9 px-4 sm:px-6 lg:px-8 border-y border-slate-200/90 dark:border-white/10 transition-colors">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-[#161b38] text-[#0f172a] dark:text-slate-200 text-[11px] font-bold mb-1 border border-slate-200/80 dark:border-white/10">
                <ShoppingBag className="h-3 w-3 text-[#ec8026]" />
                <span>Novedades</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0f172a] dark:text-white tracking-tight">
                Publicaciones Recientes
              </h2>
            </div>

            <Button asChild variant="outline" size="sm" className="rounded-full font-bold text-xs border-slate-300 dark:border-white/15 bg-white dark:bg-[#11162e] text-[#0f172a] dark:text-white hover:bg-slate-50 dark:hover:bg-white/10 shadow-subtle">
              <Link to="/catalog">
                Ver Catálogo
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
            <div className="bg-white dark:bg-[#11162e] rounded-3xl border border-slate-200 dark:border-white/10 p-7 text-center space-y-2.5 shadow-elevation">
              <ShoppingBag className="h-9 w-9 text-[#ec8026] mx-auto opacity-70" />
              <h3 className="font-bold text-[#0f172a] dark:text-white text-sm">No hay publicaciones registradas aún</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">Sé el primero de tu facultad en publicar un artículo.</p>
              <Button asChild variant="udc" size="sm" className="rounded-full mt-1.5 shadow-md shadow-[#ec8026]/20">
                <Link to="/catalog?create=true">Publicar Aviso</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* 
        Cómo Funciona (3 Pasos Secuenciales con Elevación y Contraste)
      */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-9 w-full">
        <div className="text-center max-w-xl mx-auto mb-4 sm:mb-6 space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-[#161b38] text-teal-800 dark:text-teal-300 text-[11px] font-bold border border-teal-200/80 dark:border-white/10">
            <ShieldCheck className="h-3 w-3 text-[#3da898]" />
            <span>Intercambio Seguro</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#0f172a] dark:text-white tracking-tight">
            Cómo Funciona UDC Marketplace
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
            Comercio seguro y directo entre estudiantes y profesores de la Universidad
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {steps.map((s, idx) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              className="bg-white dark:bg-[#11162e] rounded-3xl p-5 border border-slate-200/90 dark:border-white/10 shadow-elevation hover:shadow-lifted transition-all duration-300 space-y-2 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div className={`h-10 w-10 rounded-2xl flex items-center justify-center shadow-xs ${s.badgeBg}`}>
                  {s.icon}
                </div>
                <span className="font-black text-2xl sm:text-3xl text-slate-200 dark:text-slate-700/80 select-none">
                  {s.step}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-extrabold text-[#0f172a] dark:text-white">
                {s.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 
        Sedes & Claustros UDC
      */}
      <section className="bg-[#e8ebf0]/70 dark:bg-[#0e1226] py-7 sm:py-9 px-4 sm:px-6 lg:px-8 border-t border-slate-200/90 dark:border-white/10 transition-colors">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="text-center max-w-lg mx-auto space-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-[#0f172a] dark:text-white">
              Presentes en Todos los Campus UDC
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
              Filtra por tu sede y acuerda la entrega personal en tu facultad
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {campusList.map((campus) => (
              <Link
                key={campus.name}
                to={`/catalog?sede=${encodeURIComponent(campus.name)}`}
                className={`p-3.5 rounded-3xl border shadow-subtle hover:shadow-elevation transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between ${campus.border}`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#0f172a] dark:text-white">
                    <MapPin className="h-3.5 w-3.5 text-[#ec8026] shrink-0" />
                    <span>{campus.name}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium leading-tight">
                    {campus.faculties}
                  </p>
                </div>
                <div className="pt-2 flex items-center text-[11px] font-extrabold text-[#ec8026] gap-1">
                  <span>Ver artículos</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 
        Llamado a la Acción (CTA) Final
      */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-10 w-full">
        <div className="rounded-3xl bg-[#171a3d] dark:bg-[#11162e] p-6 sm:p-8 text-white border border-[#171a3d] dark:border-white/15 shadow-lifted text-center space-y-3 relative overflow-hidden">
          <div className="relative z-10 max-w-xl mx-auto space-y-1.5">
            <h2 className="text-xl sm:text-2xl font-black text-white">
              ¿Tienes libros o artículos que ya no usas?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
              Publica tu anuncio gratis en segundos y ayuda a otros compañeros de la Universidad de Cartagena.
            </p>
          </div>

          <div className="relative z-10 pt-1 flex flex-wrap justify-center gap-3">
            <Button
              asChild
              size="default"
              variant="udc"
              className="rounded-full px-6 font-bold text-xs sm:text-sm shadow-lg shadow-[#ec8026]/30"
            >
              <Link to="/catalog?create=true">
                Publicar un Artículo Ahora
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Link>
            </Button>
            <Button
              asChild
              size="default"
              variant="outline"
              className="rounded-full px-5 bg-white/10 text-white border-white/20 hover:bg-white/20 text-xs sm:text-sm font-bold shadow-sm"
            >
              <Link to="/catalog">Explorar Catálogo</Link>
            </Button>
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
            className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-[#171a3d] dark:bg-[#ec8026] text-white shadow-lifted hover:scale-110 active:scale-95 focus:outline-none transition-transform"
            aria-label="Volver arriba"
          >
            <ArrowUp className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </PageTransition>
  );
};
