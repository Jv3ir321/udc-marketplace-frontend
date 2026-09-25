import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useMarketplace } from '@/context/MarketplaceContext';
import { ValorationSection } from '@/components/marketplace/ValorationSection';
import { PageTransition } from '@/components/common/PageTransition';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { formatCOP, getBackendImageUrl, formatCampusName, getCategoryMeta } from '@/lib/utils';
import WhatsappIcon from '@/components/ui/whatsapp-icon';
import {
  ArrowLeft,
  Share2,
  MapPin,
  ShieldCheck,
  Tag,
  Building2,
  Calendar,
  ExternalLink,
  Phone,
  Mail,
  UserCheck,
  ArrowRight,
  Star,
} from 'lucide-react';
import { toast } from 'sonner';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPostById, isLoading: contextLoading } = useMarketplace();
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);

  const post = id ? getPostById(Number(id)) : undefined;

  if (contextLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-aeonik text-xs font-bold text-slate-500 bg-[#f1f3f6] dark:bg-[#0b0e1e]">
        Cargando publicación...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 space-y-4 font-aeonik text-[#0f172a] dark:text-white bg-[#f1f3f6] dark:bg-[#0b0e1e]">
        <h2 className="text-3xl font-extrabold">Publicación no encontrada</h2>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          El artículo que buscas no existe o fue retirado por su autor.
        </p>
        <Button asChild variant="udc" className="rounded-full font-bold">
          <Link to="/catalog">Volver al Catálogo</Link>
        </Button>
      </div>
    );
  }

  const categoryMeta = getCategoryMeta(post.tipoP);
  const images = post.imagenes || (post.postIMGs?.map((img) => img.imageURL) || []);
  const displayImages = images.length > 0 ? images.map(getBackendImageUrl) : [getBackendImageUrl('')];

  const sellerPhone = post.user?.cellphone || '3000000000';
  const campusDisplay = formatCampusName(post.sede);
  const whatsappUrl = `https://wa.me/57${sellerPhone.replace(/\D/g, '')}?text=${encodeURIComponent(
    `Hola! Vi tu publicación en UDC Marketplace: "${post.nombre}". Quisiera acordar la entrega en ${campusDisplay}.`
  )}`;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.nombre,
        text: `Artículo en UDC Marketplace: ${post.nombre}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Enlace copiado al portapapeles');
    }
  };

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <PageTransition className="min-h-screen bg-[#f1f3f6] dark:bg-[#0b0e1e] text-[#0f172a] dark:text-slate-100 py-8 px-4 sm:px-8 font-aeonik transition-colors duration-200">
      <div className="max-w-[1440px] mx-auto space-y-6">
        {/* Top Navigation Strip */}
        <div className="flex items-center justify-between pb-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-xs h-9 px-4 rounded-full bg-white dark:bg-[#11162e] shadow-subtle border border-slate-200 hover:border-slate-300 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 text-[#0f172a] dark:text-white font-aeonik font-bold tracking-[0.02em] flex items-center gap-1.5 transition-all hover:shadow-elevation"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Volver</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 hidden sm:inline">
              Registro N.° {post.id} · Campus {post.sede}
            </span>
            <button
              type="button"
              onClick={handleShare}
              className="text-xs h-9 px-4 rounded-full bg-white dark:bg-[#11162e] shadow-subtle border border-slate-200 hover:border-slate-300 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 text-[#0f172a] dark:text-white font-aeonik font-bold tracking-[0.02em] flex items-center gap-1.5 transition-all hover:shadow-elevation"
            >
              <Share2 className="h-3.5 w-3.5 text-[#ec8026]" />
              <span>Compartir</span>
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Image Gallery & Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-3xl bg-white dark:bg-[#11162e] p-5 sm:p-6 border border-slate-200/90 dark:border-white/10 shadow-elevation space-y-4">
              {/* Rounded Image Frame */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-900 shadow-inner">
                <img
                  src={displayImages[selectedImgIndex]}
                  alt={post.nombre}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80';
                  }}
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-white/95 dark:bg-[#0b0e1e]/95 backdrop-blur-md text-[#0f172a] dark:text-white font-aeonik font-bold text-xs px-3.5 py-1.5 rounded-full shadow-md shadow-black/10 border border-slate-200/80 dark:border-white/10">
                    <MapPin className="h-3 w-3 mr-1 inline text-[#ec8026]" />
                    {campusDisplay}
                  </span>
                </div>
              </div>

              {/* Thumbnails */}
              {displayImages.length > 1 && (
                <div className="flex gap-2.5 overflow-x-auto pt-1">
                  {displayImages.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImgIndex(idx)}
                      className={`relative h-16 w-16 rounded-xl overflow-hidden transition-all shrink-0 ${
                        selectedImgIndex === idx
                          ? 'ring-2 ring-[#ec8026] shadow-md scale-105'
                          : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Miniatura" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Description Card */}
            <div className="rounded-3xl bg-white dark:bg-[#11162e] p-6 sm:p-8 border border-slate-200/90 dark:border-white/10 shadow-elevation space-y-5">
              <h2 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-[#0f172a] dark:text-white">
                Descripción del Artículo
              </h2>
              <p className="text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed text-sm sm:text-base font-medium">
                {post.desc}
              </p>

              <div className="pt-4 border-t border-slate-200/80 dark:border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-bold">
                <div className={`flex items-center gap-2 p-3 rounded-2xl border shadow-2xs ${categoryMeta.badgeLight} ${categoryMeta.badgeDark}`}>
                  <Tag className="h-4 w-4" />
                  <span className="truncate">Categoría: {post.tipoP}</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-[#edf7f5] dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/40 rounded-2xl text-[#0f766e] dark:text-teal-300 shadow-2xs">
                  <Building2 className="h-4 w-4 text-[#0f766e] dark:text-teal-300" />
                  <span className="truncate">Sede: {post.sede}</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 rounded-2xl text-amber-800 dark:text-amber-300 shadow-2xs">
                  <Calendar className="h-4 w-4 text-amber-700 dark:text-amber-300" />
                  <span className="truncate">Trato: Directo</span>
                </div>
              </div>
            </div>

            {/* Valorations Section */}
            <div className="rounded-3xl bg-white dark:bg-[#11162e] p-6 sm:p-8 border border-slate-200/90 dark:border-white/10 shadow-elevation">
              <ValorationSection postId={post.id} valorations={post.valorations || []} />
            </div>
          </div>

          {/* Right: Price & Contact Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl bg-white dark:bg-[#11162e] p-6 sm:p-8 border border-slate-200/90 dark:border-white/10 shadow-elevation space-y-6">
              <div className="space-y-1 pb-4 border-b border-slate-200/80 dark:border-white/10">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  Precio al Contado
                </span>
                <div className="text-4xl sm:text-5xl font-black text-[#0f172a] dark:text-white tracking-tight">
                  {formatCOP(post.price)}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-xs font-extrabold uppercase tracking-wider px-3.5 py-1.5 rounded-full inline-block shadow-2xs border ${categoryMeta.badgeLight} ${categoryMeta.badgeDark}`}>
                    {post.tipoP}
                  </span>
                  {post.valorations && post.valorations.length > 0 ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 text-amber-800 dark:text-amber-300 text-xs font-bold shadow-2xs">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span>
                        {(
                          post.valorations.reduce((acc, v) => acc + (v.rating || 5), 0) /
                          post.valorations.length
                        ).toFixed(1)}{' '}
                        ({post.valorations.length} {post.valorations.length === 1 ? 'opinión' : 'opiniones'})
                      </span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 text-xs font-medium">
                      <span>Sin valoraciones</span>
                    </span>
                  )}
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] dark:text-white leading-snug">
                  {post.nombre}
                </h1>
              </div>

              {/* Direct WhatsApp Call to Action */}
              <div className="space-y-3 pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-full bg-[#ec8026] hover:bg-[#d97018] text-white font-aeonik font-bold text-sm tracking-[0.02em] shadow-lg shadow-[#ec8026]/25 transition-all active:scale-95 group/wa"
                >
                  <WhatsappIcon size={20} strokeWidth={2.2} color="#ffffff" />
                  <span>Pactar Entrega por WhatsApp</span>
                </a>

                <p className="text-center text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Trato directo entre estudiantes UDC · Sin comisiones
                </p>
              </div>

              {/* Safe Trade Notice */}
              <div className="bg-slate-50/80 dark:bg-[#161b38] rounded-2xl p-4 flex items-start gap-3 shadow-2xs border border-slate-100 dark:border-white/10">
                <ShieldCheck className="h-5 w-5 text-[#3da898] shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <span className="font-bold text-[#171a3d] dark:text-white block">
                    Punto de Encuentro Recomendado
                  </span>
                  <p className="text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
                    Recomendamos encontrarse dentro de {campusDisplay} (en biblioteca o cafetería central) para revisar el artículo en persona.
                  </p>
                </div>
              </div>
            </div>

            {/* Seller Info Card */}
            <div className="rounded-3xl bg-white dark:bg-[#11162e] p-6 sm:p-8 border border-slate-200/90 dark:border-white/10 shadow-elevation space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-white/10">
                <h3 className="text-lg font-extrabold uppercase text-[#0f172a] dark:text-white">
                  Vendedor UDC
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-teal-950/50 text-emerald-800 dark:text-teal-300 border border-emerald-200 dark:border-teal-800/40 shadow-2xs">
                  <UserCheck className="h-3 w-3 mr-1 inline text-emerald-600 dark:text-teal-300" />
                  Estudiante Activo
                </span>
              </div>

              <Link
                to={`/user/${post.userId}`}
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-[#161b38] hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200/70 dark:border-white/10 transition-all group"
              >
                <Avatar className="h-12 w-12 shrink-0 rounded-full shadow-sm">
                  <AvatarFallback className="bg-[#171a3d] dark:bg-[#ec8026] text-white font-bold text-xs">
                    {getInitials(post.user?.title || post.user?.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h5 className="font-extrabold text-sm text-[#0f172a] dark:text-white group-hover:text-[#ec8026] transition-colors truncate">
                    {post.user?.title || post.user?.name || 'Estudiante UDC'}
                  </h5>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold truncate">
                    {post.user?.role || 'Estudiante'} · Campus {post.user?.sede || post.sede}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-[#0f172a] dark:group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>

              <div className="space-y-2 text-xs font-semibold">
                <div className="flex items-center gap-2.5 p-3 bg-slate-50 dark:bg-[#161b38] border border-slate-200/70 dark:border-white/10 rounded-2xl text-[#0f172a] dark:text-slate-200">
                  <Phone className="h-4 w-4 text-[#3da898] shrink-0" />
                  <span className="truncate">WhatsApp: <strong>{sellerPhone}</strong></span>
                </div>
                {post.user?.mail && (
                  <div className="flex items-center gap-2.5 p-3 bg-slate-50 dark:bg-[#161b38] border border-slate-200/70 dark:border-white/10 rounded-2xl text-[#0f172a] dark:text-slate-200">
                    <Mail className="h-4 w-4 text-purple-700 dark:text-purple-400 shrink-0" />
                    <span className="truncate">Institucional: <strong>{post.user.mail}</strong></span>
                  </div>
                )}
              </div>

              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-full text-xs h-10 rounded-full border border-slate-300 dark:border-white/15 bg-white dark:bg-[#161b38] hover:bg-slate-50 dark:hover:bg-white/10 text-[#0f172a] dark:text-white font-aeonik font-bold transition-all shadow-subtle"
              >
                <Link to={`/user/${post.userId}`}>
                  Ver Perfil y Más Artículos
                  <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
