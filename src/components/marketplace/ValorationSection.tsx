import React, { useState } from 'react';
import { Valoration } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star, MessageSquare, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ValorationSectionProps {
  postId: number;
  valorations: Valoration[];
}

export const ValorationSection: React.FC<ValorationSectionProps> = ({
  postId,
  valorations,
}) => {
  const { isAuthenticated, user } = useAuth();
  const { sendValoration } = useMarketplace();
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setIsSubmitting(true);
    const success = await sendValoration(postId, comment.trim());
    if (success) {
      setComment('');
    }
    setIsSubmitting(false);
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
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          Valoraciones y Reseñas de Estudiantes
        </h3>
        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
          {valorations.length} {valorations.length === 1 ? 'reseña' : 'reseñas'}
        </span>
      </div>

      {/* Submit Form */}
      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/80 space-y-3">
          <div className="flex items-center gap-2">
            <Avatar className="h-7 w-7">
              <AvatarFallback className="text-xs bg-primary/10 text-primary font-bold">
                {getInitials(user?.title || user?.name)}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs font-semibold text-slate-700">
              {user?.title || user?.name} • Deja tu comentario o valoración:
            </span>
          </div>

          <Textarea
            placeholder="¿Compraste este producto o tomaste este servicio? Comparte tu experiencia con el vendedor..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[80px] text-xs bg-white resize-none"
            maxLength={300}
            required
          />

          <div className="flex items-center justify-between">
            <span className="text-[11px] text-muted-foreground">
              {comment.length}/300 caracteres
            </span>
            <Button
              type="submit"
              size="sm"
              variant="udc"
              disabled={isSubmitting || !comment.trim()}
              className="text-xs"
            >
              <Send className="h-3.5 w-3.5 mr-1.5" />
              {isSubmitting ? 'Enviando...' : 'Publicar Valoración'}
            </Button>
          </div>
        </form>
      ) : (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-center">
          <p className="text-xs text-blue-900 font-medium">
            Inicia sesión para dejar una reseña sobre este producto o servicio.
          </p>
          <Button asChild size="sm" variant="outline" className="mt-2 text-xs border-blue-300 text-blue-800">
            <Link to="/login">Iniciar Sesión</Link>
          </Button>
        </div>
      )}

      {/* Valorations List */}
      <div className="space-y-3">
        {valorations.length === 0 ? (
          <div className="text-center py-6 text-slate-400 text-xs">
            Aún no hay valoraciones para este anuncio. ¡Sé el primero en comentar!
          </div>
        ) : (
          valorations.map((v) => (
            <div
              key={v.id}
              className="bg-white rounded-xl p-4 border border-slate-100 shadow-2xs space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-7 w-7">
                    <AvatarFallback className="text-[10px] bg-slate-100 text-slate-700 font-bold">
                      {getInitials(v.user?.title || v.user?.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <span className="text-xs font-bold text-slate-800 block leading-tight">
                      {v.user?.title || v.user?.name || 'Estudiante UDC'}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {v.user?.sede || 'Campus UDC'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-amber-500 text-xs">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-[10px] text-slate-400">Verificado</span>
                </div>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed pl-9">
                {v.valoration}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
