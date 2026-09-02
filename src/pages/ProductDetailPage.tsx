import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useMarketplace } from '@/context/MarketplaceContext';
import { ValorationSection } from '@/components/marketplace/ValorationSection';
import { PageTransition } from '@/components/common/PageTransition';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { formatCOP, getBackendImageUrl } from '@/lib/utils';
import {
  ArrowLeft,
  MapPin,
  MessageCircle,
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
  const whatsappUrl = `https://wa.me/57${sellerPhone.replace(/\D/g, '')}?text=${encodeURIComponent(
    `Hola! Vi tu publicación en UDC Marketplace: "${post.nombre}". Quisiera acordar la entrega en el campus ${post.sede}.`
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
    <PageTransition className="min-h-screen bg-[#edf0f7] text-[#171a3d] py-8 px-4 sm:px-8 font-aeonik">
      <div className="max-w-[1440px] mx-auto space-y-6">
        {/* Top Navigation Strip */}
        <div className="flex items-center justify-between border-b border-[#171a3d]/20 pb-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-xs h-9 px-4 rounded-[1600px] border border-[#171a3d] bg-[#ffffff] hover:bg-[#edf0f7] text-[#171a3d] font-aeonik font-bold tracking-[0.032em] flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Volver</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.032em] text-[#171a3d]/60 hidden sm:inline">
              Registro N.° {post.id} · Campus {post.sede}
            </span>
            <button
              type="button"
              onClick={handleShare}
              className="text-xs h-9 px-4 rounded-[1600px] border border-[#171a3d] bg-[#ffffff] hover:bg-[#edf0f7] text-[#171a3d] font-aeonik font-bold tracking-[0.032em] flex items-center gap-1.5 transition-colors"
            >
              <Share2 className="h-3.5 w-3.5 text-[#df4838]" />
              <span>Compartir</span>
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Image Gallery & Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-[24px] bg-[#ffffff] p-4 border border-[#171a3d] space-y-3 shadow-sm">
              {/* Rounded Image Frame */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[18px] border border-[#171a3d] bg-[#f0f2f7]">
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
                  <span className="bg-[#ffffff] text-[#171a3d] font-aeonik font-bold text-xs px-3 py-1 border border-[#171a3d] rounded-[1600px] shadow-sm">
                    <MapPin className="h-3 w-3 mr-1 inline text-[#df4838]" />
                    Campus {post.sede}
                  </span>
                </div>
              </div>

              {/* Thumbnails */}
              {displayImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pt-1">
                  {displayImages.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImgIndex(idx)}
                      className={`relative h-16 w-16 rounded-[14px] overflow-hidden border transition-all shrink-0 ${
                        selectedImgIndex === idx
                          ? 'border-2 border-[#171a3d] ring-2 ring-[#f2b725]'
                          : 'border-[#171a3d]/40 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Miniatura" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Description Card */}
            <div className="rounded-[24px] bg-[#ffffff] border border-[#171a3d] p-6 space-y-4 shadow-sm">
              <h2 className="text-2xl font-lateral uppercase tracking-normal text-[#171a3d] leading-none">
                DESCRIPCIÓN DEL ARTÍCULO
              </h2>
              <p className="text-[#171a3d]/85 whitespace-pre-line leading-relaxed text-sm sm:text-base font-medium">
                {post.desc}
              </p>

              <div className="pt-2 border-t border-[#171a3d]/15 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-bold">
                <div className="flex items-center gap-2 p-2.5 bg-[#f4edf9] border border-[#171a3d] rounded-[1600px] text-[#44216b]">
                  <Tag className="h-3.5 w-3.5 text-[#44216b]" />
                  <span className="truncate">Categoría: {post.tipoP}</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 bg-[#edf7f5] border border-[#171a3d] rounded-[1600px] text-[#3da898]">
                  <Building2 className="h-3.5 w-3.5 text-[#3da898]" />
                  <span className="truncate">Sede: {post.sede}</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 bg-[#fdf8eb] border border-[#171a3d] rounded-[1600px] text-[#171a3d]">
                  <Calendar className="h-3.5 w-3.5 text-[#f2b725]" />
                  <span className="truncate">Trato: Directo</span>
                </div>
              </div>
            </div>

            {/* Valorations Section */}
            <div className="rounded-[24px] bg-[#ffffff] border border-[#171a3d] p-6 shadow-sm">
              <ValorationSection postId={post.id} valorations={post.valorations || []} />
            </div>
          </div>

          {/* Right: Price & Contact Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-[24px] bg-[#ffffff] border border-[#171a3d] p-6 space-y-5 shadow-sm">
              <div className="space-y-1 border-b border-[#171a3d]/20 pb-4">
                <span className="text-[11px] font-bold uppercase tracking-[0.032em] text-[#171a3d]/60 block">
                  PRECIO AL CONTADO
                </span>
                <div className="font-lateral text-4xl sm:text-5xl font-extrabold text-[#171a3d] leading-none">
                  {formatCOP(post.price)}
                </div>
              </div>

              <div className="space-y-2">
                <span className="bg-[#f2b725] text-[#171a3d] text-[11px] font-bold uppercase tracking-[0.032em] px-2.5 py-0.5 rounded-[1600px] border border-[#171a3d] inline-block shadow-sm">
                  {post.tipoP}
                </span>
                <h1 className="text-2xl sm:text-3xl font-aeonik font-bold text-[#171a3d] leading-snug">
                  {post.nombre}
                </h1>
              </div>

              {/* Direct WhatsApp Call to Action */}
              <div className="space-y-2.5 pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-[1600px] bg-[#3da898] hover:bg-[#328e81] text-[#ffffff] font-aeonik font-bold text-sm tracking-[0.032em] transition-transform active:scale-95 border border-[#171a3d] shadow-sm"
                >
                  <MessageCircle className="h-4 w-4 fill-current" />
                  <span>Pactar Entrega por WhatsApp</span>
                </a>

                <p className="text-center text-xs text-[#171a3d]/70 font-medium">
                  Trato directo entre estudiantes UDC · Sin comisiones
                </p>
              </div>

              {/* Safe Trade Notice */}
              <div className="border border-[#171a3d] bg-[#edf0f7] rounded-[20px] p-4 flex items-start gap-3 shadow-sm">
                <ShieldCheck className="h-5 w-5 text-[#3da898] shrink-0 mt-0.5" />
                <div className="text-xs space-y-0.5">
                  <span className="font-bold uppercase tracking-[0.032em] text-[#171a3d] block">
                    Punto de Encuentro Oficial
                  </span>
                  <p className="text-[#171a3d]/80 font-medium leading-relaxed">
                    Recomendamos encontrarse dentro del campus {post.sede} (en biblioteca o cafetería central) para revisar el artículo en persona.
                  </p>
                </div>
              </div>
            </div>

            {/* Seller Info Card */}
            <div className="rounded-[24px] bg-[#ffffff] border border-[#171a3d] p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#171a3d]/20 pb-3">
                <h3 className="text-xl font-lateral uppercase text-[#171a3d] leading-none">
                  VENDEDOR UDC
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-[0.032em] px-2.5 py-0.5 rounded-[1600px] bg-[#f4edf9] border border-[#171a3d] text-[#44216b]">
                  <UserCheck className="h-3 w-3 mr-1 inline" />
                  Estudiante Activo
                </span>
              </div>

              <Link
                to={`/user/${post.userId}`}
                className="flex items-center gap-3 p-3 rounded-[20px] bg-[#edf0f7] border border-[#171a3d] hover:bg-[#e2e6f0] transition-colors group"
              >
                <Avatar className="h-11 w-11 shrink-0 rounded-[1600px] border border-[#171a3d]">
                  <AvatarFallback className="bg-[#171a3d] text-[#ffffff] font-bold text-xs">
                    {getInitials(post.user?.title || post.user?.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h5 className="font-bold text-sm text-[#171a3d] group-hover:underline truncate">
                    {post.user?.title || post.user?.name || 'Estudiante UDC'}
                  </h5>
                  <p className="text-xs text-[#171a3d]/70 font-medium truncate">
                    {post.user?.role || 'Estudiante'} · Campus {post.user?.sede || post.sede}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-[#171a3d] shrink-0" />
              </Link>

              <div className="space-y-2 text-xs font-medium">
                <div className="flex items-center gap-2 p-2.5 bg-[#ffffff] rounded-[1600px] border border-[#171a3d] text-[#171a3d]">
                  <Phone className="h-3.5 w-3.5 text-[#3da898] shrink-0" />
                  <span className="truncate">WhatsApp: <strong>{sellerPhone}</strong></span>
                </div>
                {post.user?.mail && (
                  <div className="flex items-center gap-2 p-2.5 bg-[#ffffff] rounded-[1600px] border border-[#171a3d] text-[#171a3d]">
                    <Mail className="h-3.5 w-3.5 text-[#44216b] shrink-0" />
                    <span className="truncate">Institucional: <strong>{post.user.mail}</strong></span>
                  </div>
                )}
              </div>

              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-full text-xs h-9 rounded-[1600px] border border-[#171a3d] bg-[#ffffff] text-[#171a3d] font-aeonik font-bold hover:bg-[#edf0f7]"
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
