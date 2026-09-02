import React, { useState, useEffect } from 'react';
import { Post, UpdatePostDTO } from '@/types';
import { useMarketplace } from '@/context/MarketplaceContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { UDC_SEDES, CATEGORIAS_PRODUCTO } from '@/lib/utils';
import { Edit3 } from 'lucide-react';

interface EditPostDialogProps {
  post: Post;
  isOpen?: boolean;
  open?: boolean;
  onClose?: () => void;
  onOpenChange?: (open: boolean) => void;
}

export const EditPostDialog: React.FC<EditPostDialogProps> = ({
  post,
  isOpen,
  open,
  onClose,
  onOpenChange,
}) => {
  const isDialogOpen = open !== undefined ? open : (isOpen ?? false);
  const handleClose = () => {
    if (onOpenChange) onOpenChange(false);
    if (onClose) onClose();
  };

  const { updatePost } = useMarketplace();
  const [formData, setFormData] = useState<UpdatePostDTO>({
    nombre: post.nombre,
    desc: post.desc,
    price: String(post.price),
    sede: post.sede,
    tipoP: post.tipoP,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormData({
      nombre: post.nombre,
      desc: post.desc,
      price: String(post.price),
      sede: post.sede,
      tipoP: post.tipoP,
    });
  }, [post]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const success = await updatePost(post.id, formData);
    setIsSubmitting(false);
    if (success) {
      handleClose();
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={(val) => !val && handleClose()}>
      <DialogContent className="sm:max-w-lg rounded-[24px] bg-[#ffffff] border border-[#171a3d] p-6 font-aeonik text-[#171a3d]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader className="border-b border-[#171a3d]/20 pb-3">
            <DialogTitle className="flex items-center gap-2 font-lateral text-2xl uppercase text-[#171a3d]">
              <Edit3 className="h-5 w-5 text-[#3da898]" />
              Editar Publicación
            </DialogTitle>
            <DialogDescription className="text-xs text-[#171a3d]/70 font-medium">
              Modifica los detalles de tu artículo en UDC Marketplace.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 pt-2">
            <div className="space-y-1.5">
              <Label htmlFor="edit-nombre" className="text-xs font-bold uppercase tracking-[0.032em]">
                Título del Producto *
              </Label>
              <Input
                id="edit-nombre"
                value={formData.nombre}
                onChange={(e) => setFormData((prev) => ({ ...prev, nombre: e.target.value }))}
                className="h-10 text-xs rounded-[1600px] border border-[#000000] bg-[#ffffff] focus-visible:ring-0"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="edit-price" className="text-xs font-bold uppercase tracking-[0.032em]">
                  Precio ($ COP) *
                </Label>
                <Input
                  id="edit-price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                  className="h-10 text-xs font-bold rounded-[1600px] border border-[#000000] bg-[#ffffff] focus-visible:ring-0"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="edit-sede" className="text-xs font-bold uppercase tracking-[0.032em]">
                  Campus / Sede *
                </Label>
                <select
                  id="edit-sede"
                  className="w-full h-10 rounded-[1600px] border border-[#000000] bg-[#ffffff] px-3 text-xs font-bold text-[#000000] focus:outline-none cursor-pointer"
                  value={formData.sede}
                  onChange={(e) => setFormData((prev) => ({ ...prev, sede: e.target.value }))}
                >
                  {UDC_SEDES.map((s) => (
                    <option key={s} value={s}>
                      Campus {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="edit-tipoP" className="text-xs font-bold uppercase tracking-[0.032em]">
                Categoría *
              </Label>
              <select
                id="edit-tipoP"
                className="w-full h-10 rounded-[1600px] border border-[#000000] bg-[#ffffff] px-3 text-xs font-bold text-[#000000] focus:outline-none cursor-pointer"
                value={formData.tipoP}
                onChange={(e) => setFormData((prev) => ({ ...prev, tipoP: e.target.value }))}
              >
                {CATEGORIAS_PRODUCTO.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="edit-desc" className="text-xs font-bold uppercase tracking-[0.032em]">
                Descripción *
              </Label>
              <Textarea
                id="edit-desc"
                value={formData.desc}
                onChange={(e) => setFormData((prev) => ({ ...prev, desc: e.target.value }))}
                rows={3}
                className="text-xs rounded-[20px] border border-[#000000] bg-[#ffffff] p-3 focus-visible:ring-0"
                required
              />
            </div>
          </div>

          <DialogFooter className="pt-3 border-t border-[#171a3d]/20 flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleClose}
              className="h-9 px-4 rounded-[1600px] border border-[#171a3d] bg-[#ffffff] text-xs font-bold text-[#171a3d] hover:bg-[#edf0f7]"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={isSubmitting}
              className="h-9 px-5 rounded-[1600px] bg-[#171a3d] hover:bg-[#252a5c] text-[#ffffff] text-xs font-bold border border-[#171a3d]"
            >
              {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
