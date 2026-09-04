import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '@/types';
import { formatCOP, getBackendImageUrl, formatCampusName } from '@/lib/utils';
import WhatsappIcon from '@/components/ui/whatsapp-icon';
import { MapPin, ArrowRight } from 'lucide-react';

interface BentoCardProps {
  post: Post;
  variant?: 'wide' | 'standard';
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

  // Accent theme for category badges and subtle glow
  const accents = [
    { badge: 'bg-[#ec8026]', lightBg: 'bg-[#fdf3eb]', text: 'text-[#ec8026]' },
    { badge: 'bg-[#44216b]', lightBg: 'bg-[#f4edf9]', text: 'text-[#44216b]' },
    { badge: 'bg-[#3da898]', lightBg: 'bg-[#edf7f5]', text: 'text-[#3da898]' },
    { badge: 'bg-[#df4838]', lightBg: 'bg-[#fdedeb]', text: 'text-[#df4838]' },
    { badge: 'bg-[#f2b725]', lightBg: 'bg-[#fdf8eb]', text: 'text-[#f2b725]' },
  ];
  const accent = accents[index % accents.length];

  // =========================================================================
  // 1. WIDE BENTO CARD (Elevated, Soft, Modern Card)
  // =========================================================================
  if (variant === 'wide') {
    return (
      <article className="group rounded-3xl bg-white shadow-[0_12px_32px_rgba(23,26,61,0.09),0_2px_6px_rgba(23,26,61,0.04)] hover:shadow-[0_24px_48px_rgba(23,26,61,0.18)] ring-1 ring-black/[0.04] transition-all duration-300 hover:-translate-y-1.5 flex flex-col sm:flex-row overflow-hidden font-aeonik h-full p-3.5 sm:p-4 gap-4">
        {/* Left: Protected Proportional Image Canvas */}
        <Link
          to={`/post/${post.id}`}
          className="relative block w-full sm:w-[44%] aspect-[4/3] sm:aspect-auto sm:self-stretch min-h-[175px] overflow-hidden rounded-2xl bg-gradient-to-tr from-slate-100 via-slate-50 to-amber-50/20 shrink-0 shadow-inner"
        >
          <img
            src={mainImage}
            alt={post.nombre}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80';
            }}
          />
          {/* Glass Campus Badge */}
          <div className="absolute top-2.5 left-2.5">
            <span className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-md text-[#171a3d] text-[11px] font-bold px-3 py-1 rounded-full shadow-md shadow-black/5">
              <MapPin className="h-3 w-3 text-[#ec8026]" />
              <span className="truncate max-w-[130px]">{campusLabel}</span>
            </span>
          </div>
        </Link>

        {/* Right: Content Details */}
        <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span
                className={`inline-flex items-center ${accent.lightBg} ${accent.text} text-[11px] font-extrabold uppercase tracking-[0.04em] px-2.5 py-0.5 rounded-full shadow-sm`}
              >
                {post.tipoP}
              </span>
              <span className="text-[11px] font-medium text-slate-400 truncate">
                {post.user?.title || post.user?.name || 'Estudiante UDC'}
              </span>
            </div>

            <Link to={`/post/${post.id}`} className="block">
              <h3 className="font-extrabold text-[16px] sm:text-[17px] text-[#171a3d] leading-snug group-hover:text-[#ec8026] transition-colors line-clamp-2">
                {post.nombre}
              </h3>
            </Link>

            <p className="text-xs text-slate-500 font-normal leading-relaxed line-clamp-2">
              {post.desc}
            </p>
          </div>

          {/* Price & Action Row */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-3">
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-[0.04em] text-slate-400">
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
                className="h-9 w-9 rounded-full bg-[#3da898] hover:bg-[#328e81] text-[#ffffff] flex items-center justify-center transition-transform active:scale-95 shadow-md shadow-[#3da898]/20 group/wa"
              >
                <WhatsappIcon size={16} strokeWidth={2.2} color="#ffffff" />
              </a>
              <Link
                to={`/post/${post.id}`}
                className="h-9 px-4 rounded-full bg-[#171a3d] hover:bg-[#252a5c] text-[#ffffff] text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md shadow-[#171a3d]/20"
              >
                <span>Ver</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // =========================================================================
  // 2. STANDARD BENTO CARD (Elevated, Soft, Modern Card)
  // =========================================================================
  return (
    <article className="group rounded-3xl bg-white shadow-[0_12px_32px_rgba(23,26,61,0.09),0_2px_6px_rgba(23,26,61,0.04)] hover:shadow-[0_24px_48px_rgba(23,26,61,0.18)] ring-1 ring-black/[0.04] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden font-aeonik h-full p-3.5 sm:p-4">
      <div className="space-y-3">
        {/* Image Frame with Protected Aspect Ratio */}
        <Link
          to={`/post/${post.id}`}
          className="relative block aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gradient-to-tr from-slate-100 via-slate-50 to-amber-50/20 shadow-inner"
        >
          <img
            src={mainImage}
            alt={post.nombre}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80';
            }}
          />
          {/* Glass Campus Badge */}
          <div className="absolute top-2.5 left-2.5">
            <span className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-md text-[#171a3d] text-[11px] font-bold px-3 py-1 rounded-full shadow-md shadow-black/5">
              <MapPin className="h-3 w-3 text-[#ec8026]" />
              <span className="truncate max-w-[140px]">{campusLabel}</span>
            </span>
          </div>
        </Link>

        {/* Content Details */}
        <div className="space-y-1.5 px-0.5">
          <div className="flex items-center justify-between gap-2">
            <span
              className={`inline-flex items-center ${accent.lightBg} ${accent.text} text-[10px] font-extrabold uppercase tracking-[0.04em] px-2.5 py-0.5 rounded-full`}
            >
              {post.tipoP}
            </span>
            <span className="text-[11px] font-medium text-slate-400 truncate">
              {post.user?.title || post.user?.name || 'Estudiante UDC'}
            </span>
          </div>

          <Link to={`/post/${post.id}`} className="block">
            <h3 className="font-extrabold text-[15px] sm:text-[16px] text-[#171a3d] leading-snug group-hover:text-[#ec8026] transition-colors line-clamp-1">
              {post.nombre}
            </h3>
          </Link>

          <p className="text-xs text-slate-500 font-normal leading-relaxed line-clamp-2">
            {post.desc}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <div>
          <span className="block text-[10px] font-bold uppercase tracking-[0.04em] text-slate-400">
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
            className="h-9 w-9 rounded-full bg-[#3da898] hover:bg-[#328e81] text-[#ffffff] flex items-center justify-center transition-transform active:scale-95 shadow-sm group/wa"
          >
            <WhatsappIcon size={16} strokeWidth={2.2} color="#ffffff" />
          </a>
          <Link
            to={`/post/${post.id}`}
            className="h-9 px-4 rounded-full bg-[#171a3d] hover:bg-[#252a5c] text-[#ffffff] text-xs font-bold flex items-center transition-colors shadow-sm"
          >
            Ver
          </Link>
        </div>
      </div>
    </article>
  );
};
