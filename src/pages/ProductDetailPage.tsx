import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useMarketplace } from '@/context/MarketplaceContext';
import { ValorationSection } from '@/components/marketplace/ValorationSection';
import { PageTransition } from '@/components/common/PageTransition';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { formatCOP, getSedeBadgeColor, getBackendImageUrl } from '@/lib/utils';
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
  User,
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
      <PageTransition className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Publicación no encontrada</h2>
        <p className="text-sm text-muted-foreground">
          El artículo que buscas no existe o ha sido eliminado por el vendedor.
        </p>
        <Button asChild variant="outline" className="mt-4 rounded-full">
          <Link to="/catalog">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al Catálogo
          </Link>
        </Button>
      </PageTransition>
    );
  }

  const images = post.imagenes || (post.postIMGs?.map((img) => img.imageURL) || []);
  const displayImages = images.length > 0 ? images.map(getBackendImageUrl) : [getBackendImageUrl('')];

  const sellerPhone = post.user?.cellphone || '3000000000';
  const whatsappUrl = `https://wa.me/57${sellerPhone.replace(/\D/g, '')}?text=${encodeURIComponent(
    `Hola! Vi tu publicación en UDC Marketplace: "${post.nombre}". ¿Aún está disponible? Quisiera más detalles.`
  )}`;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.nombre,
        text: `Mira este artículo en UDC Marketplace: ${post.nombre}`,
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
    <PageTransition className="min-h-screen bg-orange-50/20 py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-5 sm:space-y-6">
        {/* Breadcrumb / Back button */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="text-xs font-medium text-stone-600 hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-1.5" />
            Volver
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="text-xs rounded-full border-orange-200 text-orange-800 hover:bg-orange-50"
          >
            <Share2 className="h-3.5 w-3.5 mr-1.5 text-primary" />
            Compartir Anuncio
          </Button>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* Left: Image Gallery & Description */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-white border border-stone-200 shadow-md">
              <img
                src={displayImages[selectedImgIndex]}
                alt={post.nombre}
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80';
                }}
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full border shadow-sm backdrop-blur-md ${getSedeBadgeColor(
                    post.sede
                  )}`}
                >
                  <MapPin className="h-3.5 w-3.5 inline mr-1 -mt-0.5" />
                  Campus {post.sede}
                </span>
              </div>
            </div>

            {/* Thumbnails */}
            {displayImages.length > 1 && (
              <div className="flex gap-2.5 sm:gap-3 overflow-x-auto pb-2">
                {displayImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImgIndex(idx)}
                    className={`relative h-16 w-16 sm:h-20 sm:w-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImgIndex === idx
                        ? 'border-primary shadow-sm scale-95'
                        : 'border-stone-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumb" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Description Card */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-orange-100 shadow-xs space-y-4">
              <h3 className="font-bold text-base text-foreground">Descripción del Producto o Servicio</h3>
              <p className="text-xs sm:text-sm text-stone-600 whitespace-pre-line leading-relaxed">
                {post.desc}
              </p>

              <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-stone-500">
                <div className="flex items-center gap-1.5">
                  <Tag className="h-3.5 w-3.5 text-primary" />
                  <span>Tipo: <strong className="text-stone-800">{post.tipoP}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5 text-primary" />
                  <span>Sede: <strong className="text-stone-800">{post.sede}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-primary" />
                  <span>Publicado recientemente</span>
                </div>
              </div>
            </div>

            {/* Valorations */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-orange-100 shadow-xs">
              <ValorationSection
                postId={post.id}
                valorations={post.valorations || []}
              />
            </div>
          </div>

          {/* Right: Seller & Action Column */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6">
            {/* Price & Action Card */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-orange-100 shadow-md space-y-5">
              <div>
                <span className="text-xs font-bold text-orange-600 uppercase tracking-wider block mb-1">
                  Precio Sugerido
                </span>
                <span className="text-3xl sm:text-4xl font-black text-stone-950 tracking-tight">
                  {formatCOP(post.price)}
                </span>
              </div>

              <h1 className="text-lg sm:text-xl font-bold text-foreground leading-snug">
                {post.nombre}
              </h1>

              {/* Direct WhatsApp Call to Action */}
              <div className="space-y-2.5 pt-1">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3.5 sm:py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
                >
                  <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                  Contactar al Vendedor por WhatsApp
                </a>

                <p className="text-center text-[10px] sm:text-[11px] text-stone-400">
                  Respuesta directa al celular del estudiante vendedor.
                </p>
              </div>

              {/* Safe Trade Badge */}
              <div className="bg-orange-50/70 border border-orange-200/80 rounded-2xl p-3.5 sm:p-4 flex items-start gap-3">
                <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <span className="font-bold text-orange-950 block">Intercambio Seguro en el Campus</span>
                  <p className="text-stone-600 leading-relaxed text-[11px] sm:text-xs">
                    Reúnete en las cafeterías, bibliotecas o plazoletas de la sede {post.sede} para revisar el producto antes de pagar.
                  </p>
                </div>
              </div>
            </div>

            {/* Seller Information Card with Profile Link */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-orange-100 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <h4 className="font-bold text-xs sm:text-sm text-foreground">Información del Vendedor</h4>
                <Badge variant="secondary" className="text-[10px] bg-emerald-50 text-emerald-800 border-emerald-200 font-semibold">
                  <UserCheck className="h-3 w-3 mr-1 inline" />
                  Estudiante UDC
                </Badge>
              </div>

              <Link
                to={`/user/${post.userId}`}
                className="flex items-center gap-3 p-2 -mx-2 rounded-2xl hover:bg-orange-50/70 transition-colors group"
                title="Ver perfil completo del vendedor"
              >
                <Avatar className="h-11 w-11 sm:h-12 sm:w-12 border-2 border-primary/30 group-hover:scale-105 transition-transform shrink-0">
                  <AvatarFallback className="bg-orange-600 text-white font-bold text-xs sm:text-sm">
                    {getInitials(post.user?.title || post.user?.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h5 className="font-bold text-xs sm:text-sm text-stone-900 group-hover:text-orange-600 truncate transition-colors">
                      {post.user?.title || post.user?.name || 'Estudiante UDC'}
                    </h5>
                    <User className="h-3 w-3 text-orange-600 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-[11px] sm:text-xs text-muted-foreground truncate">
                    {post.user?.role || 'Estudiante'} • Sede {post.user?.sede || post.sede}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-orange-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0" />
              </Link>

              <div className="space-y-2 pt-1 text-xs text-stone-600">
                <div className="flex items-center gap-2 p-2.5 bg-orange-50/50 rounded-xl border border-orange-100">
                  <Phone className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">Celular: <strong>{sellerPhone}</strong></span>
                </div>
                {post.user?.mail && (
                  <div className="flex items-center gap-2 p-2.5 bg-orange-50/50 rounded-xl border border-orange-100">
                    <Mail className="h-3.5 w-3.5 text-orange-600 shrink-0" />
                    <span className="truncate">Correo: <strong>{post.user.mail}</strong></span>
                  </div>
                )}
              </div>

              <Button asChild variant="outline" size="sm" className="w-full rounded-xl border-orange-200 text-orange-700 hover:bg-orange-50 font-bold text-xs">
                <Link to={`/user/${post.userId}`}>
                  Ver Perfil del Vendedor
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
