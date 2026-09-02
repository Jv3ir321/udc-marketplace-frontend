import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCOP, getSedeBadgeColor, getBackendImageUrl } from '@/lib/utils';
import { MapPin, MessageCircle, Star, Image as ImageIcon, User as UserIcon } from 'lucide-react';

interface ProductCardProps {
  post: Post;
  dark?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ post, dark = false }) => {
  const images = post.imagenes || (post.postIMGs?.map((img) => img.imageURL) || []);
  const mainImage = images.length > 0 ? getBackendImageUrl(images[0]) : getBackendImageUrl('');
  const valorationsCount = post.valorations?.length || 0;

  const phone = post.user?.cellphone || '3000000000';
  const whatsappUrl = `https://wa.me/57${phone.replace(/\D/g, '')}?text=${encodeURIComponent(
    `Hola! Vi tu publicación en UDC Marketplace: "${post.nombre}". ¿Sigue disponible?`
  )}`;

  return (
    <Card
      className={`group overflow-hidden transition-all duration-300 flex flex-col rounded-3xl ${
        dark
          ? 'bg-stone-900/80 backdrop-blur-md border-white/15 hover:border-orange-400 hover:shadow-xl hover:shadow-orange-500/10 text-white'
          : 'bg-white border-stone-200 hover:border-orange-400/80 hover:shadow-lg hover:shadow-orange-500/5 text-stone-900'
      }`}
    >
      {/* Image Container */}
      <Link to={`/post/${post.id}`} className="relative block aspect-[4/3] overflow-hidden bg-stone-950/40">
        <img
          src={mainImage}
          alt={post.nombre}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80';
          }}
        />

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          <span
            className={`text-[11px] font-bold px-3 py-1 rounded-full border shadow-xs backdrop-blur-md ${getSedeBadgeColor(
              post.sede
            )}`}
          >
            <MapPin className="h-3 w-3 inline mr-1 -mt-0.5" />
            {post.sede}
          </span>
        </div>

        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-stone-950/80 backdrop-blur-md text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
            <ImageIcon className="h-3 w-3" />
            <span>{images.length} fotos</span>
          </div>
        )}

        <div className="absolute top-3 right-3">
          <Badge
            variant="secondary"
            className={`text-[10px] font-semibold shadow-xs border-0 ${
              dark ? 'bg-black/60 backdrop-blur-md text-orange-300' : 'bg-white/95 text-stone-800'
            }`}
          >
            {post.tipoP}
          </Badge>
        </div>
      </Link>

      {/* Content */}
      <CardContent className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Price */}
          <div className="flex items-baseline justify-between mb-2">
            <span
              className={`text-2xl font-black tracking-tight ${
                dark ? 'text-white' : 'text-stone-900'
              }`}
            >
              {formatCOP(post.price)}
            </span>
            {valorationsCount > 0 && (
              <span
                className={`flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                  dark
                    ? 'text-amber-300 bg-amber-500/10 border-amber-500/30'
                    : 'text-amber-700 bg-amber-50 border-amber-200'
                }`}
              >
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                {valorationsCount} {valorationsCount === 1 ? 'reseña' : 'reseñas'}
              </span>
            )}
          </div>

          {/* Title */}
          <Link to={`/post/${post.id}`}>
            <h3
              className={`font-bold text-sm line-clamp-2 hover:text-orange-400 transition-colors leading-snug ${
                dark ? 'text-stone-100' : 'text-foreground'
              }`}
            >
              {post.nombre}
            </h3>
          </Link>

          {/* Description Snippet */}
          <p
            className={`text-xs mt-1.5 line-clamp-2 leading-relaxed ${
              dark ? 'text-stone-400' : 'text-muted-foreground'
            }`}
          >
            {post.desc}
          </p>
        </div>

        {/* Footer info with link to Seller Profile & WhatsApp Button */}
        <div
          className={`mt-5 pt-3.5 flex items-center justify-between gap-2 border-t ${
            dark ? 'border-white/10' : 'border-stone-100'
          }`}
        >
          <Link
            to={`/user/${post.userId}`}
            className="flex items-center gap-2 group/seller truncate hover:opacity-80 transition-opacity"
            title="Ver perfil del estudiante vendedor"
          >
            <div
              className={`h-7 w-7 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 border ${
                dark
                  ? 'bg-orange-500/20 text-orange-300 border-orange-500/30'
                  : 'bg-orange-100 text-orange-700 border-orange-200'
              }`}
            >
              <UserIcon className="h-3.5 w-3.5" />
            </div>
            <div className="text-[11px] truncate">
              <span
                className={`font-bold block truncate transition-colors ${
                  dark
                    ? 'text-stone-200 group-hover/seller:text-orange-400'
                    : 'text-stone-900 group-hover/seller:text-orange-600'
                }`}
              >
                {post.user?.title || post.user?.name || 'Estudiante UDC'}
              </span>
              <span className="text-[10px] text-stone-400 block truncate">
                {post.user?.role || 'Comunidad UDC'}
              </span>
            </div>
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center p-2.5 rounded-2xl bg-emerald-600/90 text-white hover:bg-emerald-500 border border-emerald-500/30 transition-all shadow-md shadow-emerald-950/40 shrink-0"
            title="Contactar al vendedor por WhatsApp"
          >
            <MessageCircle className="h-4 w-4" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
};
