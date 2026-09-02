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
    <div className="space-y-6 font-aeonik">
      <div className="flex items-center justify-between border-b border-[#000000]/20 pb-3">
        <h3 className="text-xl font-lateral uppercase text-[#000000] flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-[#5c4ade]" />
          Valoraciones y Preguntas
        </h3>
        <span className="text-xs font-bold text-[#000000] bg-[#e9ccff] px-3 py-0.5 rounded-[1600px] border border-[#000000]">
          {valorations.length} {valorations.length === 1 ? 'comentario' : 'comentarios'}
        </span>
      </div>

      {/* Submit Form */}
      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex items-start gap-3">
            <Avatar className="h-9 w-9 rounded-[1600px] border border-[#000000]">
              <AvatarFallback className="bg-[#ffd731] text-[#000000] text-xs font-bold">
                {getInitials(user?.title || user?.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <Textarea
                placeholder="Pregunta sobre la edición, detalles o propone un punto de entrega en el campus..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="text-xs rounded-[20px] border border-[#000000] bg-[#ffffff] p-3 focus-visible:ring-0 min-h-[70px]"
                rows={2}
              />
              <div className="flex justify-end">
                <Button
                  type="submit"
                  size="sm"
                  disabled={isSubmitting || !comment.trim()}
                  className="h-9 px-5 rounded-[1600px] bg-[#000000] hover:bg-[#222222] text-[#ffffff] font-aeonik font-bold text-xs tracking-[0.032em] border border-[#000000]"
                >
                  <Send className="h-3.5 w-3.5 mr-1.5" />
                  Publicar Comentario
                </Button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="rounded-[20px] bg-[#dceeff]/50 border border-[#000000] p-4 text-center space-y-2">
          <p className="text-xs font-medium text-[#000000]/80">
            Debes iniciar sesión con tu cuenta estudiantil para enviar preguntas o valorar el artículo.
          </p>
          <Button asChild size="sm" className="h-8 px-4 rounded-[1600px] bg-[#000000] text-[#ffffff] text-xs font-bold border border-[#000000]">
            <Link to="/login">Iniciar Sesión</Link>
          </Button>
        </div>
      )}

      {/* List of comments */}
      <div className="space-y-3 pt-2">
        {valorations.length > 0 ? (
          valorations.map((val) => (
            <div
              key={val.id}
              className="p-4 rounded-[20px] bg-[#ffffff] border border-[#000000] space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Avatar className="h-7 w-7 rounded-[1600px] border border-[#000000]">
                    <AvatarFallback className="bg-[#e9ccff] text-[#000000] text-[10px] font-bold">
                      {getInitials(val.user?.title || val.user?.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <span className="text-xs font-bold text-[#000000] block leading-none">
                      {val.user?.title || val.user?.name || 'Estudiante UDC'}
                    </span>
                    <span className="text-[10px] text-[#000000]/60 font-medium">
                      Campus {val.user?.sede || 'Cartagena'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 text-[#ffd731]">
                  <Star className="h-3.5 w-3.5 fill-[#ffd731] text-[#000000]" />
                  <span className="text-xs font-bold text-[#000000]">5.0</span>
                </div>
              </div>
              <p className="text-xs text-[#000000]/85 font-medium pl-9 leading-relaxed">
                {val.valoration}
              </p>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-xs text-[#000000]/60 font-medium">
            No hay comentarios aún. ¡Sé el primero en consultar por este artículo!
          </div>
        )}
      </div>
    </div>
  );
};
