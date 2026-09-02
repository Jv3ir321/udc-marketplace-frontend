import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '@/types';
import { formatCOP, getBackendImageUrl } from '@/lib/utils';
import { MessageCircle, MapPin } from 'lucide-react';

interface ProductCardProps {
  post: Post;
  accentColor?: 'white' | 'lavender' | 'sky' | 'mint';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  post,
  accentColor = 'white',
}) => {
  const images = post.imagenes || (post.postIMGs?.map((img) => img.imageURL) || []);
  const mainImage = images.length > 0 ? getBackendImageUrl(images[0]) : getBackendImageUrl('');

  const phone = post.user?.cellphone || '3000000000';
  const whatsappUrl = `https://wa.me/57${phone.replace(/\D/g, '')}?text=${encodeURIComponent(
    `Hola! Vi tu publicación en UDC Marketplace: "${post.nombre}". ¿Podemos acordar entrega en campus ${post.sede}?`
  )}`;

  const bgClasses = {
    white: 'bg-[#ffffff]',
    lavender: 'bg-[#f4edf9]',
    sky: 'bg-[#edf0f7]',
    mint: 'bg-[#edf7f5]',
  }[accentColor];

  return (
    <article
      className={`group rounded-[20px] ${bgClasses} text-[#171a3d] border border-[#171a3d] transition-transform duration-200 hover:-translate-y-1 flex flex-col justify-between overflow-hidden font-aeonik shadow-sm`}
    >
      <div>
        {/* Rounded Image with 1px border inside container */}
        <div className="p-3 pb-0">
          <Link
            to={`/post/${post.id}`}
            className="relative block aspect-[4/3] w-full overflow-hidden rounded-[16px] border border-[#171a3d] bg-[#f0f2f7]"
          >
            <img
              src={mainImage}
              alt={post.nombre}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80';
              }}
            />

            {/* Sticker Campus Badge */}
            <div className="absolute top-2.5 left-2.5">
              <span className="inline-flex items-center gap-1 bg-[#ffffff] text-[#171a3d] text-[11px] font-bold tracking-[0.030em] px-2.5 py-0.5 border border-[#171a3d] rounded-[1600px] shadow-sm">
                <MapPin className="h-3 w-3 text-[#df4838]" />
                {post.sede}
              </span>
            </div>

            {/* Sticker Category Pill in UDC Yellow */}
            <div className="absolute top-2.5 right-2.5">
              <span className="inline-flex items-center bg-[#f2b725] text-[#171a3d] text-[10px] font-bold uppercase tracking-[0.032em] px-2.5 py-0.5 border border-[#171a3d] rounded-[1600px] shadow-sm">
                {post.tipoP}
              </span>
            </div>
          </Link>
        </div>

        {/* Card Content */}
        <div className="p-4 space-y-2.5">
          <div className="flex items-start justify-between gap-2">
            <Link to={`/post/${post.id}`} className="flex-1">
              <h3 className="font-aeonik font-bold text-[16px] sm:text-[17px] leading-[1.25] text-[#171a3d] line-clamp-2 hover:underline">
                {post.nombre}
              </h3>
            </Link>
            <span className="shrink-0 bg-[#df4838] text-[#ffffff] text-[10px] font-bold uppercase tracking-[0.032em] px-2 py-0.5 rounded-[1600px] border border-[#171a3d]">
              NUEVO
            </span>
          </div>

          <p className="text-[13px] text-[#171a3d]/75 font-medium leading-snug line-clamp-2">
            {post.desc}
          </p>

          <div className="flex items-center gap-2 text-xs font-bold text-[#171a3d]/60 pt-1">
            <span className="truncate">{post.user?.title || post.user?.name || 'Estudiante UDC'}</span>
            <span>·</span>
            <span className="text-[#44216b]">Verificado</span>
          </div>
        </div>
      </div>

      {/* Footer Price & WhatsApp Direct Chat */}
      <div className="px-4 pb-4 pt-2 border-t border-[#171a3d]/15 flex items-center justify-between gap-3">
        <div>
          <span className="block text-[10px] font-bold uppercase tracking-[0.032em] text-[#171a3d]/60">
            PRECIO
          </span>
          <span className="font-lateral text-2xl font-extrabold text-[#171a3d] leading-none tracking-normal">
            {formatCOP(post.price)}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Pactar entrega por WhatsApp"
            className="h-8 w-8 rounded-[1600px] border border-[#171a3d] bg-[#3da898] hover:bg-[#328e81] flex items-center justify-center text-[#ffffff] transition-transform active:scale-90 shrink-0"
          >
            <MessageCircle className="h-4 w-4 fill-current" />
          </a>
          <Link
            to={`/post/${post.id}`}
            className="h-8 px-3 rounded-[1600px] border border-[#171a3d] bg-[#171a3d] hover:bg-[#252a5c] text-[#ffffff] text-xs font-bold tracking-[0.032em] flex items-center justify-center transition-colors"
          >
            Ver
          </Link>
        </div>
      </div>
    </article>
  );
};
