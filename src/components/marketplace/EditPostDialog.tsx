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
      <DialogContent className="sm:max-w-lg rounded-3xl bg-white dark:bg-[#11162e] border border-slate-100 dark:border-white/10 p-6 sm:p-8 font-aeonik text-[#171a3d] dark:text-[#e2e8f0] shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader className="border-b border-slate-100 dark:border-white/10 pb-3">
            <DialogTitle className="flex items-center gap-2 text-xl font-extrabold uppercase tracking-tight text-[#171a3d] dark:text-white">
              <Edit3 className="h-5 w-5 text-[#3da898]" />
              Editar Publicación
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500 dark:text-slate-400 font-normal">
              Modifica los detalles de tu artículo en UDC Marketplace.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3.5 pt-1">
            <div className="space-y-1.5">
              <Label htmlFor="edit-nombre" className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Título del Producto *
              </Label>
              <Input
                id="edit-nombre"
                value={formData.nombre}
                onChange={(e) => setFormData((prev) => ({ ...prev, nombre: e.target.value }))}
                className="h-10 text-xs rounded-2xl border border-slate-200/50 dark:border-white/10 bg-slate-100/90 dark:bg-[#161b38] focus:bg-white dark:focus:bg-[#1c2246] focus:ring-2 focus:ring-[#3da898]/30 transition-all text-[#171a3d] dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-subtle"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="edit-price" className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Precio ($ COP) *
                </Label>
                <Input
                  id="edit-price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                  className="h-10 text-xs font-bold rounded-2xl border border-slate-200/50 dark:border-white/10 bg-slate-100/90 dark:bg-[#161b38] focus:bg-white dark:focus:bg-[#1c2246] focus:ring-2 focus:ring-[#3da898]/30 transition-all text-[#171a3d] dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-subtle"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="edit-sede" className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Campus / Sede *
                </Label>
                <select
                  id="edit-sede"
                  className="w-full h-10 rounded-2xl border border-slate-200/50 dark:border-white/10 bg-slate-100/90 dark:bg-[#161b38] focus:bg-white dark:focus:bg-[#1c2246] focus:ring-2 focus:ring-[#3da898]/30 px-3 text-xs font-bold text-[#171a3d] dark:text-white cursor-pointer transition-all outline-none shadow-subtle"
                  value={formData.sede}
                  onChange={(e) => setFormData((prev) => ({ ...prev, sede: e.target.value }))}
                >
                  {UDC_SEDES.map((s) => (
                    <option key={s} value={s} className="bg-white dark:bg-[#161b38] text-[#171a3d] dark:text-white">
                      Campus {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="edit-tipoP" className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Categoría *
              </Label>
              <select
                id="edit-tipoP"
                className="w-full h-10 rounded-2xl border border-slate-200/50 dark:border-white/10 bg-slate-100/90 dark:bg-[#161b38] focus:bg-white dark:focus:bg-[#1c2246] focus:ring-2 focus:ring-[#3da898]/30 px-3 text-xs font-bold text-[#171a3d] dark:text-white cursor-pointer transition-all outline-none shadow-subtle"
                value={formData.tipoP}
                onChange={(e) => setFormData((prev) => ({ ...prev, tipoP: e.target.value }))}
              >
                {CATEGORIAS_PRODUCTO.map((c) => (
                  <option key={c} value={c} className="bg-white dark:bg-[#161b38] text-[#171a3d] dark:text-white">
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="edit-desc" className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Descripción *
              </Label>
              <Textarea
                id="edit-desc"
                value={formData.desc}
                onChange={(e) => setFormData((prev) => ({ ...prev, desc: e.target.value }))}
                rows={3}
                className="text-xs rounded-2xl border border-slate-200/50 dark:border-white/10 bg-slate-100/90 dark:bg-[#161b38] focus:bg-white dark:focus:bg-[#1c2246] focus:ring-2 focus:ring-[#3da898]/30 p-3.5 transition-all text-[#171a3d] dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 leading-relaxed resize-none shadow-subtle"
                required
              />
            </div>
          </div>

          <DialogFooter className="pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleClose}
              className="h-9 px-4 rounded-full border border-slate-200/60 dark:border-white/10 bg-slate-100 dark:bg-[#161b38] text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-[#1c2246]"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={isSubmitting}
              className="h-9 px-5 rounded-full bg-[#ec8026] hover:bg-[#d97018] text-white text-xs font-bold shadow-md shadow-[#ec8026]/20 transition-all active:scale-95"
            >
              {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
