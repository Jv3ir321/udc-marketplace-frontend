import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '@/types';
import { formatCOP, getBackendImageUrl, formatCampusName } from '@/lib/utils';
import WhatsappIcon from '@/components/ui/whatsapp-icon';
import { MapPin } from 'lucide-react';

interface ProductCardProps {
  post: Post;
}

export const ProductCard: React.FC<ProductCardProps> = ({ post }) => {
  const images = post.imagenes || (post.postIMGs?.map((img) => img.imageURL) || []);
  const mainImage = images.length > 0 ? getBackendImageUrl(images[0]) : getBackendImageUrl('');

  const phone = post.user?.cellphone || '3000000000';
  const campusLabel = formatCampusName(post.sede);
  const whatsappUrl = `https://wa.me/57${phone.replace(/\D/g, '')}?text=${encodeURIComponent(
    `Hola! Vi tu publicación en UDC Marketplace: "${post.nombre}". ¿Podemos acordar entrega en ${campusLabel}?`
  )}`;

  return (
    <article className="group rounded-3xl bg-white text-[#171a3d] shadow-[0_12px_32px_rgba(23,26,61,0.09),0_2px_6px_rgba(23,26,61,0.04)] hover:shadow-[0_24px_48px_rgba(23,26,61,0.18)] ring-1 ring-black/[0.04] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden font-aeonik">
      <div>
        {/* Product Image Container */}
        <div className="p-3.5 pb-0">
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

            {/* Campus Badge */}
            <div className="absolute top-2.5 left-2.5">
              <span className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-md text-[#171a3d] text-[11px] font-bold px-3 py-1 rounded-full shadow-md shadow-black/5">
                <MapPin className="h-3 w-3 text-[#ec8026]" />
                <span className="truncate max-w-[130px]">{campusLabel}</span>
              </span>
            </div>

            {/* Category Badge */}
            <div className="absolute top-2.5 right-2.5">
              <span className="inline-flex items-center bg-[#fdf3eb] text-[#ec8026] text-[10px] font-extrabold uppercase tracking-[0.04em] px-2.5 py-1 rounded-full shadow-sm">
                {post.tipoP}
              </span>
            </div>
          </Link>
        </div>

        {/* Card Body */}
        <div className="p-4 space-y-2">
          <Link to={`/post/${post.id}`} className="block">
            <h3 className="font-extrabold text-[16px] sm:text-[17px] leading-[1.3] text-[#171a3d] line-clamp-1 group-hover:text-[#ec8026] transition-colors">
              {post.nombre}
            </h3>
          </Link>

          <p className="text-xs text-slate-500 font-normal leading-relaxed line-clamp-2">
            {post.desc}
          </p>

          <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400 pt-0.5">
            <span className="truncate">{post.user?.title || post.user?.name || 'Estudiante UDC'}</span>
            <span>·</span>
            <span className="text-[#ec8026] font-semibold">Comunidad UDC</span>
          </div>
        </div>
      </div>

      {/* Footer Strip */}
      <div className="px-4 pb-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
        <div>
          <span className="block text-[10px] font-bold uppercase tracking-[0.04em] text-slate-400">
            Precio
          </span>
          <span className="text-xl sm:text-2xl font-black text-[#171a3d] leading-none tracking-tight">
            {formatCOP(post.price)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Pactar entrega por WhatsApp"
            className="h-9 w-9 rounded-full bg-[#3da898] hover:bg-[#328e81] flex items-center justify-center text-[#ffffff] transition-transform active:scale-95 shadow-md shadow-[#3da898]/20 group/wa"
          >
            <WhatsappIcon size={16} strokeWidth={2.2} color="#ffffff" />
          </a>
          <Link
            to={`/post/${post.id}`}
            className="h-9 px-4 rounded-full bg-[#ec8026] hover:bg-[#d97018] text-[#ffffff] text-xs font-bold tracking-[0.02em] flex items-center justify-center transition-colors shadow-md shadow-[#ec8026]/20"
          >
            Ver
          </Link>
        </div>
      </div>
    </article>
  );
};
