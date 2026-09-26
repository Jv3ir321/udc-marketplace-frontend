import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '@/types';
import { formatCOP, getBackendImageUrl, formatCampusName, getCategoryMeta } from '@/lib/utils';
import WhatsappIcon from '@/components/ui/whatsapp-icon';
import { MapPin } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface ProductCardProps {
  post: Post;
}

export const ProductCard: React.FC<ProductCardProps> = ({ post }) => {
  const { isAuthenticated } = useAuth();
  const images = post.imagenes || (post.postIMGs?.map((img) => img.imageURL) || []);
  const mainImage = images.length > 0 ? getBackendImageUrl(images[0]) : getBackendImageUrl('');

  const phone = post.user?.cellphone || '3000000000';
  const campusLabel = formatCampusName(post.sede);
  const categoryMeta = getCategoryMeta(post.tipoP);
  const whatsappUrl = `https://wa.me/57${phone.replace(/\D/g, '')}?text=${encodeURIComponent(
    `Hola! Vi tu publicación en UDC Marketplace: "${post.nombre}". ¿Podemos acordar entrega en ${campusLabel}?`
  )}`;

  return (
    <article className="group rounded-3xl bg-white dark:bg-[#11162e] text-[#0f172a] dark:text-white border border-slate-200/90 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 shadow-elevation hover:shadow-lifted transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden font-aeonik">
      <div>
        {/* Product Image Container */}
        <div className="p-3.5 pb-0">
          <Link
            to={`/post/${post.id}`}
            className="relative block aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gradient-to-tr from-slate-100 via-slate-50 to-slate-100 dark:from-slate-900 dark:to-[#161b38] shadow-inner"
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

            {/* Campus Badge with Glass and Shadow */}
            <div className="absolute top-2.5 left-2.5">
              <span className="inline-flex items-center gap-1.5 bg-white/95 dark:bg-[#0b0e1e]/95 backdrop-blur-md text-[#0f172a] dark:text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md shadow-black/10 border border-slate-200/80 dark:border-white/10">
                <MapPin className="h-3 w-3 text-[#ec8026]" />
                <span className="truncate max-w-[130px]">{campusLabel}</span>
              </span>
            </div>

            {/* Distinctive Category Badge */}
            <div className="absolute top-2.5 right-2.5">
              <span
                className={`inline-flex items-center text-[10px] font-extrabold uppercase tracking-[0.04em] px-2.5 py-1 rounded-full shadow-sm border backdrop-blur-xs ${categoryMeta.badgeLight} ${categoryMeta.badgeDark}`}
              >
                {post.tipoP || 'Artículo'}
              </span>
            </div>
          </Link>
        </div>

        {/* Card Body with High Contrast */}
        <div className="p-4 space-y-2">
          <Link to={`/post/${post.id}`} className="block">
            <h3 className="font-extrabold text-[16px] sm:text-[17px] leading-[1.3] text-[#0f172a] dark:text-white line-clamp-1 group-hover:text-[#ec8026] dark:group-hover:text-[#ec8026] transition-colors">
              {post.nombre}
            </h3>
          </Link>

          <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed line-clamp-2">
            {post.desc}
          </p>

          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400 pt-0.5">
            <span className="truncate text-slate-700 dark:text-slate-300">
              {isAuthenticated ? (post.user?.title || post.user?.name || 'Estudiante UDC') : 'Vendedor UDC'}
            </span>
            <span>·</span>
            <span className="text-[#ec8026] font-bold">Comunidad UDC</span>
          </div>
        </div>
      </div>

      {/* Footer Strip */}
      <div className="px-4 pb-4 pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between gap-3 bg-slate-50/50 dark:bg-transparent">
        <div>
          <span className="block text-[10px] font-bold uppercase tracking-[0.04em] text-slate-500 dark:text-slate-400">
            Precio
          </span>
          <span className="text-xl sm:text-2xl font-black text-[#0f172a] dark:text-white leading-none tracking-tight">
            {formatCOP(post.price)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Pactar entrega por WhatsApp"
              className="h-9 w-9 rounded-full bg-[#3da898] hover:bg-[#328e81] flex items-center justify-center text-white transition-transform active:scale-95 shadow-md shadow-[#3da898]/30 group/wa"
            >
              <WhatsappIcon size={16} strokeWidth={2.2} color="#ffffff" />
            </a>
          ) : (
            <Link
              to={`/login?redirect=${encodeURIComponent(`/post/${post.id}`)}`}
              title="Inicia sesión para pactar entrega por WhatsApp"
              className="h-9 w-9 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 flex items-center justify-center text-slate-500 dark:text-slate-400 transition-transform active:scale-95 border border-slate-200/80 dark:border-white/10"
            >
              <WhatsappIcon size={16} strokeWidth={2.2} color="currentColor" />
            </Link>
          )}
          <Link
            to={`/post/${post.id}`}
            className="h-9 px-4 rounded-full bg-[#ec8026] hover:bg-[#d97018] text-white text-xs font-bold tracking-[0.02em] flex items-center justify-center transition-colors shadow-md shadow-[#ec8026]/30 active:scale-95"
          >
            Ver
          </Link>
        </div>
      </div>
    </article>
  );
};
