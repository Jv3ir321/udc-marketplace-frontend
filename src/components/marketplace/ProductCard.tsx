import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '@/types';
import { formatCOP, getBackendImageUrl, formatCampusName } from '@/lib/utils';
import { MessageCircle, MapPin } from 'lucide-react';

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
    <article className="group rounded-2xl bg-[#ffffff] text-[#171a3d] border border-[#171a3d]/15 hover:border-[#ec8026]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col justify-between overflow-hidden font-aeonik">
      <div>
        {/* Product Image Container */}
        <div className="p-3 pb-0">
          <Link
            to={`/post/${post.id}`}
            className="relative block aspect-[4/3] w-full overflow-hidden rounded-xl border border-[#171a3d]/10 bg-[#f8fafc]"
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

            {/* Campus Badge */}
            <div className="absolute top-2.5 left-2.5">
              <span className="inline-flex items-center gap-1 bg-[#ffffff]/95 backdrop-blur-sm text-[#171a3d] text-xs font-semibold px-2.5 py-0.5 border border-[#171a3d]/15 rounded-full shadow-sm">
                <MapPin className="h-3 w-3 text-[#ec8026]" />
                {campusLabel}
              </span>
            </div>

            {/* Category Badge */}
            <div className="absolute top-2.5 right-2.5">
              <span className="inline-flex items-center bg-[#ec8026] text-[#ffffff] text-[10px] font-bold uppercase tracking-[0.04em] px-2.5 py-0.5 rounded-full shadow-sm">
                {post.tipoP}
              </span>
            </div>
          </Link>
        </div>

        {/* Card Body */}
        <div className="p-4 space-y-2">
          <Link to={`/post/${post.id}`} className="block">
            <h3 className="font-bold text-[16px] sm:text-[17px] leading-[1.3] text-[#171a3d] line-clamp-1 group-hover:text-[#ec8026] transition-colors">
              {post.nombre}
            </h3>
          </Link>

          <p className="text-xs text-[#171a3d]/70 font-normal leading-relaxed line-clamp-2">
            {post.desc}
          </p>

          <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#171a3d]/60 pt-1">
            <span className="truncate">{post.user?.title || post.user?.name || 'Estudiante UDC'}</span>
            <span>·</span>
            <span className="text-[#ec8026] font-semibold">Comunidad UDC</span>
          </div>
        </div>
      </div>

      {/* Footer Strip */}
      <div className="px-4 pb-4 pt-3 border-t border-[#171a3d]/10 flex items-center justify-between gap-3">
        <div>
          <span className="block text-[10px] font-semibold uppercase tracking-[0.03em] text-[#171a3d]/50">
            Precio
          </span>
          <span className="text-xl sm:text-2xl font-extrabold text-[#171a3d] leading-none tracking-tight">
            {formatCOP(post.price)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Pactar entrega por WhatsApp"
            className="h-8 w-8 rounded-full bg-[#3da898] hover:bg-[#328e81] flex items-center justify-center text-[#ffffff] transition-transform active:scale-95 shadow-sm"
          >
            <MessageCircle className="h-4 w-4 fill-current" />
          </a>
          <Link
            to={`/post/${post.id}`}
            className="h-8 px-4 rounded-full bg-[#ec8026] hover:bg-[#d97018] text-[#ffffff] text-xs font-bold tracking-[0.02em] flex items-center justify-center transition-colors shadow-sm"
          >
            Ver
          </Link>
        </div>
      </div>
    </article>
  );
};
