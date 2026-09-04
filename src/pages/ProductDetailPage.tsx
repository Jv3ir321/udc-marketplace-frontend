import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useMarketplace } from '@/context/MarketplaceContext';
import { ValorationSection } from '@/components/marketplace/ValorationSection';
import { PageTransition } from '@/components/common/PageTransition';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { formatCOP, getBackendImageUrl, formatCampusName } from '@/lib/utils';
import WhatsappIcon from '@/components/ui/whatsapp-icon';
import {
  ArrowLeft,
  MapPin,
  Share2,
  Calendar,
  ShieldCheck,
  Building2,
  Phone,
  Mail,
  UserCheck,
  Tag,
  ArrowRight,
} from 'lucide-react';
import { toast } from 'sonner';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPostById } = useMarketplace();
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);

  const post = getPostById(Number(id));

  if (!post) {
    return (
      <PageTransition className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4 font-aeonik">
        <h2 className="text-4xl font-lateral uppercase text-[#000000]">Artículo no encontrado</h2>
        <p className="text-sm font-medium text-[#000000]/70">
          El artículo consultado no existe o fue retirado por el estudiante anunciante.
        </p>
        <Button asChild className="mt-4 rounded-[1600px] border border-[#000000] bg-[#000000] text-[#ffffff] font-aeonik font-bold">
          <Link to="/catalog">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al Catálogo General
          </Link>
        </Button>
      </PageTransition>
    );
  }

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
    <PageTransition className="min-h-screen bg-[#faf8f5] text-[#171a3d] py-8 px-4 sm:px-8 font-aeonik">
      <div className="max-w-[1440px] mx-auto space-y-6">
        {/* Top Navigation Strip */}
        <div className="flex items-center justify-between pb-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-xs h-9 px-4 rounded-full bg-white shadow-[0_2px_8px_rgba(23,26,61,0.04)] hover:shadow-[0_4px_12px_rgba(23,26,61,0.08)] hover:bg-slate-50 text-[#171a3d] font-aeonik font-bold tracking-[0.02em] flex items-center gap-1.5 transition-all"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Volver</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 hidden sm:inline">
              Registro N.° {post.id} · Campus {post.sede}
            </span>
            <button
              type="button"
              onClick={handleShare}
              className="text-xs h-9 px-4 rounded-full bg-white shadow-[0_2px_8px_rgba(23,26,61,0.04)] hover:shadow-[0_4px_12px_rgba(23,26,61,0.08)] hover:bg-slate-50 text-[#171a3d] font-aeonik font-bold tracking-[0.02em] flex items-center gap-1.5 transition-all"
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
            <div className="rounded-3xl bg-white p-5 sm:p-6 shadow-[0_16px_40px_rgba(23,26,61,0.10),0_4px_12px_rgba(23,26,61,0.05)] ring-1 ring-black/[0.04] space-y-4">
              {/* Rounded Image Frame */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-100 shadow-inner">
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
                  <span className="bg-white/95 backdrop-blur-md text-[#171a3d] font-aeonik font-bold text-xs px-3.5 py-1.5 rounded-full shadow-md shadow-black/5">
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
            <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-[0_16px_40px_rgba(23,26,61,0.10),0_4px_12px_rgba(23,26,61,0.05)] ring-1 ring-black/[0.04] space-y-5">
              <h2 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-[#171a3d]">
                Descripción del Artículo
              </h2>
              <p className="text-slate-600 whitespace-pre-line leading-relaxed text-sm sm:text-base font-normal">
                {post.desc}
              </p>

              <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-bold">
                <div className="flex items-center gap-2 p-3 bg-[#f4edf9]/80 rounded-2xl text-[#44216b] shadow-sm shadow-purple-900/5">
                  <Tag className="h-4 w-4 text-[#44216b]" />
                  <span className="truncate">Categoría: {post.tipoP}</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-[#edf7f5]/80 rounded-2xl text-[#3da898] shadow-sm shadow-teal-900/5">
                  <Building2 className="h-4 w-4 text-[#3da898]" />
                  <span className="truncate">Sede: {post.sede}</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-[#fdf8eb]/80 rounded-2xl text-[#b45309] shadow-sm shadow-amber-900/5">
                  <Calendar className="h-4 w-4 text-[#d97706]" />
                  <span className="truncate">Trato: Directo</span>
                </div>
              </div>
            </div>

            {/* Valorations Section */}
            <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-[0_16px_40px_rgba(23,26,61,0.10),0_4px_12px_rgba(23,26,61,0.05)] ring-1 ring-black/[0.04]">
              <ValorationSection postId={post.id} valorations={post.valorations || []} />
            </div>
          </div>

          {/* Right: Price & Contact Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-[0_16px_40px_rgba(23,26,61,0.10),0_4px_12px_rgba(23,26,61,0.05)] ring-1 ring-black/[0.04] space-y-6">
              <div className="space-y-1 pb-4 border-b border-slate-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Precio al Contado
                </span>
                <div className="text-4xl sm:text-5xl font-black text-[#171a3d] tracking-tight">
                  {formatCOP(post.price)}
                </div>
              </div>

              <div className="space-y-2">
                <span className="bg-[#ec8026]/10 text-[#ec8026] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-block shadow-sm">
                  {post.tipoP}
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171a3d] leading-snug">
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

                <p className="text-center text-xs text-slate-500 font-medium">
                  Trato directo entre estudiantes UDC · Sin comisiones
                </p>
              </div>

              {/* Safe Trade Notice */}
              <div className="bg-slate-50/80 rounded-2xl p-4 flex items-start gap-3 shadow-sm shadow-slate-900/5">
                <ShieldCheck className="h-5 w-5 text-[#3da898] shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <span className="font-bold text-[#171a3d] block">
                    Punto de Encuentro Recomendado
                  </span>
                  <p className="text-slate-600 font-normal leading-relaxed">
                    Recomendamos encontrarse dentro de {campusDisplay} (en biblioteca o cafetería central) para revisar el artículo en persona.
                  </p>
                </div>
              </div>
            </div>

            {/* Seller Info Card */}
            <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-[0_16px_40px_rgba(23,26,61,0.10),0_4px_12px_rgba(23,26,61,0.05)] ring-1 ring-black/[0.04] space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-lg font-extrabold uppercase text-[#171a3d]">
                  Vendedor UDC
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#edf7f5] text-[#3da898] shadow-sm">
                  <UserCheck className="h-3 w-3 mr-1 inline" />
                  Estudiante Activo
                </span>
              </div>

              <Link
                to={`/user/${post.userId}`}
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100/80 transition-all group"
              >
                <Avatar className="h-12 w-12 shrink-0 rounded-full shadow-sm">
                  <AvatarFallback className="bg-[#171a3d] text-white font-bold text-xs">
                    {getInitials(post.user?.title || post.user?.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h5 className="font-bold text-sm text-[#171a3d] group-hover:text-[#ec8026] transition-colors truncate">
                    {post.user?.title || post.user?.name || 'Estudiante UDC'}
                  </h5>
                  <p className="text-xs text-slate-500 font-medium truncate">
                    {post.user?.role || 'Estudiante'} · Campus {post.user?.sede || post.sede}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-[#171a3d] group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>

              <div className="space-y-2 text-xs font-medium">
                <div className="flex items-center gap-2.5 p-3 bg-slate-50 rounded-2xl text-[#171a3d]">
                  <Phone className="h-4 w-4 text-[#3da898] shrink-0" />
                  <span className="truncate">WhatsApp: <strong>{sellerPhone}</strong></span>
                </div>
                {post.user?.mail && (
                  <div className="flex items-center gap-2.5 p-3 bg-slate-50 rounded-2xl text-[#171a3d]">
                    <Mail className="h-4 w-4 text-[#44216b] shrink-0" />
                    <span className="truncate">Institucional: <strong>{post.user.mail}</strong></span>
                  </div>
                )}
              </div>

              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-full text-xs h-10 rounded-full border-0 bg-slate-100 hover:bg-slate-200 text-[#171a3d] font-aeonik font-bold transition-all"
              >
                <Link to={`/user/${post.userId}`}>
                  Ver Perfil y Más Artículos
                  <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
