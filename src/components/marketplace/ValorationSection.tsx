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
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setIsSubmitting(true);
    const success = await sendValoration(postId, comment.trim(), rating);
    if (success) {
      setComment('');
      setRating(5);
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
    <div className="space-y-6 font-aeonik text-[#171a3d] dark:text-[#e2e8f0]">
      <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-white/10 pb-3">
        <h3 className="text-lg font-bold text-[#171a3d] dark:text-white flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-[#ec8026]" />
          <span>Preguntas y Valoraciones</span>
        </h3>
        <span className="text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-[#161b38] px-3 py-0.5 rounded-full border border-slate-200/50 dark:border-white/10">
          {valorations.length} {valorations.length === 1 ? 'comentario' : 'comentarios'}
        </span>
      </div>

      {/* Submit Form */}
      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex items-start gap-3">
            <Avatar className="h-9 w-9 rounded-full border border-slate-200 dark:border-white/10 shrink-0">
              <AvatarFallback className="bg-[#171a3d] text-white text-xs font-bold">
                {getInitials(user?.title || user?.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                  Calificación:
                </span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-0.5 hover:scale-110 transition-transform text-amber-400"
                      aria-label={`Calificar con ${star} estrellas`}
                    >
                      <Star
                        className={`h-4 w-4 ${
                          star <= rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300 dark:text-slate-600'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">
                    {rating}.0
                  </span>
                </div>
              </div>

              <Textarea
                placeholder="Pregunta sobre detalles del artículo o propone un punto de entrega en tu sede..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="text-xs rounded-2xl border border-slate-200/70 dark:border-white/10 bg-white dark:bg-[#161b38] text-[#171a3d] dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 p-3 focus-visible:ring-1 focus-visible:ring-[#ec8026] min-h-[70px] shadow-subtle"
                rows={2}
              />
              <div className="flex justify-end">
                <Button
                  type="submit"
                  size="sm"
                  variant="udc"
                  disabled={isSubmitting || !comment.trim()}
                  className="rounded-full px-5 text-xs font-bold shadow-subtle hover:shadow-elevation"
                >
                  <Send className="h-3.5 w-3.5 mr-1.5" />
                  Enviar Valoración
                </Button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="rounded-2xl bg-slate-50 dark:bg-[#161b38]/60 border border-slate-200/70 dark:border-white/10 p-4 text-center space-y-2">
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Inicia sesión con tu cuenta institucional para hacer preguntas o acordar entregas.
          </p>
          <Button asChild size="sm" variant="outline" className="rounded-full px-4 text-xs font-bold border-slate-200 dark:border-white/10 bg-white dark:bg-[#11162e] text-[#171a3d] dark:text-white">
            <Link to="/login">Iniciar Sesión</Link>
          </Button>
        </div>
      )}

      {/* List of comments */}
      <div className="space-y-3 pt-2">
        {valorations.length > 0 ? (
          valorations.map((val) => {
            const displayRating = val.rating && val.rating >= 1 && val.rating <= 5 ? val.rating : 5;
            return (
              <div
                key={val.id}
                className="p-4 rounded-2xl bg-white dark:bg-[#11162e] border border-slate-200/70 dark:border-white/10 shadow-subtle space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Avatar className="h-7 w-7 rounded-full border border-slate-200 dark:border-white/10">
                      <AvatarFallback className="bg-slate-100 dark:bg-[#161b38] text-[#171a3d] dark:text-white text-[10px] font-bold">
                        {getInitials(val.user?.title || val.user?.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <span className="text-xs font-bold text-[#171a3d] dark:text-white block leading-none">
                        {val.user?.title || val.user?.name || 'Estudiante UDC'}
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                        Campus {val.user?.sede || 'Cartagena'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5 text-amber-500">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{displayRating}.0</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 pl-9 leading-relaxed">
                  {val.valoration}
                </p>
              </div>
            );
          })
        ) : (
          <div className="text-center py-6 text-xs text-slate-400 dark:text-slate-500 font-medium">
            No hay preguntas aún. ¡Sé el primero en consultar por este artículo!
          </div>
        )}
      </div>
    </div>
  );
};
