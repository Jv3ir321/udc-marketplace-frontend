import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '@/types';
import { formatCOP, getBackendImageUrl, formatCampusName } from '@/lib/utils';
import { MessageCircle, MapPin, ArrowRight } from 'lucide-react';

interface BentoCardProps {
  post: Post;
  variant?: 'tall' | 'wide' | 'standard';
  index?: number;
}

export const BentoCard: React.FC<BentoCardProps> = ({
  post,
  variant = 'standard',
  index = 0,
}) => {
  const images = post.imagenes || (post.postIMGs?.map((img) => img.imageURL) || []);
  const mainImage = images.length > 0 ? getBackendImageUrl(images[0]) : getBackendImageUrl('');

  const phone = post.user?.cellphone || '3000000000';
  const campusLabel = formatCampusName(post.sede);
  const whatsappUrl = `https://wa.me/57${phone.replace(/\D/g, '')}?text=${encodeURIComponent(
    `Hola! Vi tu publicación en UDC Marketplace: "${post.nombre}". ¿Podemos acordar entrega en ${campusLabel}?`
  )}`;

  // Accent color themes matching the Bento Box palette
  const accents = [
    { border: 'hover:border-[#ec8026]', badge: 'bg-[#ec8026]', text: 'text-[#ec8026]', bg: 'bg-[#faf8f5]' },
    { border: 'hover:border-[#f2b725]', badge: 'bg-[#f2b725]', text: 'text-[#f2b725]', bg: 'bg-[#fcfbf7]' },
    { border: 'hover:border-[#3da898]', badge: 'bg-[#3da898]', text: 'text-[#3da898]', bg: 'bg-[#f5fbf9]' },
    { border: 'hover:border-[#df4838]', badge: 'bg-[#df4838]', text: 'text-[#df4838]', bg: 'bg-[#fdf7f6]' },
    { border: 'hover:border-[#44216b]', badge: 'bg-[#44216b]', text: 'text-[#44216b]', bg: 'bg-[#f9f6fc]' },
  ];
  const accent = accents[index % accents.length];

  // =========================================================================
  // 1. TALL BENTO CARD (Inspired by the full-height vertical card in reference)
  // =========================================================================
  if (variant === 'tall') {
    return (
      <article className={`group rounded-[28px] bg-[#ffffff] border border-[#171a3d]/15 ${accent.border} transition-all duration-300 hover:shadow-lg flex flex-col justify-between overflow-hidden font-aeonik h-full p-4`}>
        <div className="space-y-3">
          {/* Tall Image */}
          <Link
            to={`/post/${post.id}`}
            className="relative block h-72 sm:h-80 w-full overflow-hidden rounded-[20px] bg-[#f5f7fc] border border-[#171a3d]/10"
          >
            <img
              src={mainImage}
              alt={post.nombre}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80';
              }}
            />
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
              <span className="inline-flex items-center gap-1 bg-[#ffffff]/95 backdrop-blur-sm text-[#171a3d] text-xs font-bold px-3 py-1 border border-[#171a3d]/15 rounded-full shadow-sm">
                <MapPin className="h-3 w-3 text-[#ec8026]" />
                {campusLabel}
              </span>
            </div>
            <div className="absolute top-3 right-3">
              <span className={`inline-flex items-center ${accent.badge} text-[#ffffff] text-[10px] font-bold uppercase tracking-[0.04em] px-2.5 py-0.5 rounded-full shadow-sm`}>
                {post.tipoP}
              </span>
            </div>
          </Link>

          {/* Details */}
          <div className="p-1 space-y-2">
            <Link to={`/post/${post.id}`}>
              <h3 className="font-extrabold text-lg sm:text-xl text-[#171a3d] leading-snug group-hover:text-[#ec8026] transition-colors line-clamp-2">
                {post.nombre}
              </h3>
            </Link>
            <p className="text-xs text-[#171a3d]/70 font-normal leading-relaxed line-clamp-3">
              {post.desc}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 mt-3 border-t border-[#171a3d]/10 flex items-center justify-between gap-2">
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-[0.03em] text-[#171a3d]/50">
              Precio al contado
            </span>
            <span className="text-2xl font-black text-[#171a3d] tracking-tight">
              {formatCOP(post.price)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Pactar entrega por WhatsApp"
              className="h-9 w-9 rounded-full bg-[#3da898] hover:bg-[#328e81] text-[#ffffff] flex items-center justify-center transition-transform active:scale-95 shadow-sm"
            >
              <MessageCircle className="h-4 w-4 fill-current" />
            </a>
            <Link
              to={`/post/${post.id}`}
              className="h-9 px-4 rounded-full bg-[#171a3d] hover:bg-[#252a5c] text-[#ffffff] text-xs font-bold flex items-center gap-1 transition-colors shadow-sm"
            >
              <span>Ver</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  // =========================================================================
  // 2. WIDE BENTO CARD (Horizontal 2-col layout in bento row)
  // =========================================================================
  if (variant === 'wide') {
    return (
      <article className={`group rounded-[28px] bg-[#ffffff] border border-[#171a3d]/15 ${accent.border} transition-all duration-300 hover:shadow-lg flex flex-col sm:flex-row overflow-hidden font-aeonik h-full p-4 gap-4`}>
        {/* Left Image (approx 45%) */}
        <Link
          to={`/post/${post.id}`}
          className="relative block w-full sm:w-[45%] aspect-[4/3] sm:aspect-auto sm:min-h-[210px] overflow-hidden rounded-[20px] bg-[#f5f7fc] border border-[#171a3d]/10 shrink-0"
        >
          <img
            src={mainImage}
            alt={post.nombre}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80';
            }}
          />
          <div className="absolute top-2.5 left-2.5">
            <span className="inline-flex items-center gap-1 bg-[#ffffff]/95 backdrop-blur-sm text-[#171a3d] text-[11px] font-bold px-2.5 py-0.5 border border-[#171a3d]/15 rounded-full shadow-sm">
              <MapPin className="h-3 w-3 text-[#ec8026]" />
              {campusLabel}
            </span>
          </div>
        </Link>

        {/* Right Content */}
        <div className="flex-1 flex flex-col justify-between py-1">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className={`inline-flex items-center ${accent.badge} text-[#ffffff] text-[10px] font-bold uppercase tracking-[0.04em] px-2.5 py-0.5 rounded-full`}>
                {post.tipoP}
              </span>
              <span className="text-[11px] font-medium text-[#171a3d]/60">
                {post.user?.title || post.user?.name || 'Estudiante UDC'}
              </span>
            </div>

            <Link to={`/post/${post.id}`}>
              <h3 className="font-extrabold text-base sm:text-lg text-[#171a3d] leading-snug group-hover:text-[#ec8026] transition-colors line-clamp-2">
                {post.nombre}
              </h3>
            </Link>

            <p className="text-xs text-[#171a3d]/70 font-normal leading-relaxed line-clamp-2">
              {post.desc}
            </p>
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-[#171a3d]/10 flex items-center justify-between gap-2 mt-2">
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-[0.03em] text-[#171a3d]/50">
                Precio
              </span>
              <span className="text-xl sm:text-2xl font-black text-[#171a3d] tracking-tight">
                {formatCOP(post.price)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Pactar por WhatsApp"
                className="h-8 w-8 rounded-full bg-[#3da898] hover:bg-[#328e81] text-[#ffffff] flex items-center justify-center transition-transform active:scale-95 shadow-sm"
              >
                <MessageCircle className="h-4 w-4 fill-current" />
              </a>
              <Link
                to={`/post/${post.id}`}
                className="h-8 px-4 rounded-full bg-[#171a3d] hover:bg-[#252a5c] text-[#ffffff] text-xs font-bold flex items-center gap-1 transition-colors shadow-sm"
              >
                <span>Ver</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // =========================================================================
  // 3. STANDARD BENTO CARD (Clean square / 4:3 module)
  // =========================================================================
  return (
    <article className={`group rounded-[28px] bg-[#ffffff] border border-[#171a3d]/15 ${accent.border} transition-all duration-300 hover:shadow-lg flex flex-col justify-between overflow-hidden font-aeonik h-full p-4`}>
      <div className="space-y-3">
        {/* Image */}
        <Link
          to={`/post/${post.id}`}
          className="relative block aspect-[4/3] w-full overflow-hidden rounded-[20px] bg-[#f5f7fc] border border-[#171a3d]/10"
        >
          <img
            src={mainImage}
            alt={post.nombre}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80';
            }}
          />
          <div className="absolute top-2.5 left-2.5">
            <span className="inline-flex items-center gap-1 bg-[#ffffff]/95 backdrop-blur-sm text-[#171a3d] text-[11px] font-bold px-2.5 py-0.5 border border-[#171a3d]/15 rounded-full shadow-sm">
              <MapPin className="h-3 w-3 text-[#ec8026]" />
              {campusLabel}
            </span>
          </div>
          <div className="absolute top-2.5 right-2.5">
            <span className={`inline-flex items-center ${accent.badge} text-[#ffffff] text-[10px] font-bold uppercase tracking-[0.04em] px-2 py-0.5 rounded-full shadow-sm`}>
              {post.tipoP}
            </span>
          </div>
        </Link>

        {/* Content */}
        <div className="p-1 space-y-1.5">
          <Link to={`/post/${post.id}`}>
            <h3 className="font-extrabold text-base text-[#171a3d] leading-snug group-hover:text-[#ec8026] transition-colors line-clamp-1">
              {post.nombre}
            </h3>
          </Link>
          <p className="text-xs text-[#171a3d]/70 font-normal leading-relaxed line-clamp-2">
            {post.desc}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 mt-2 border-t border-[#171a3d]/10 flex items-center justify-between gap-2">
        <div>
          <span className="block text-[10px] font-bold uppercase tracking-[0.03em] text-[#171a3d]/50">
            Precio
          </span>
          <span className="text-xl font-black text-[#171a3d] tracking-tight">
            {formatCOP(post.price)}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Pactar por WhatsApp"
            className="h-8 w-8 rounded-full bg-[#3da898] hover:bg-[#328e81] text-[#ffffff] flex items-center justify-center transition-transform active:scale-95 shadow-sm"
          >
            <MessageCircle className="h-4 w-4 fill-current" />
          </a>
          <Link
            to={`/post/${post.id}`}
            className="h-8 px-3.5 rounded-full bg-[#171a3d] hover:bg-[#252a5c] text-[#ffffff] text-xs font-bold flex items-center transition-colors shadow-sm"
          >
            Ver
          </Link>
        </div>
      </div>
    </article>
  );
};
