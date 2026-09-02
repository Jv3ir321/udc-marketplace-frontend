import React, { useState } from 'react';
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
  isOpen: boolean;
  onClose: () => void;
}

export const EditPostDialog: React.FC<EditPostDialogProps> = ({
  post,
  isOpen,
  onClose,
}) => {
  const { updatePost } = useMarketplace();
  const [formData, setFormData] = useState<UpdatePostDTO>({
    nombre: post.nombre,
    desc: post.desc,
    price: post.price,
    sede: post.sede,
    tipoP: post.tipoP,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const success = await updatePost(post.id, formData);
    setIsSubmitting(false);
    if (success) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit3 className="h-5 w-5 text-primary" />
              Editar Publicación
            </DialogTitle>
            <DialogDescription>
              Modifica los detalles de tu anuncio en UDC Marketplace.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-1.5">
              <Label htmlFor="nombre" className="text-xs">Título del Anuncio</Label>
              <Input
                id="nombre"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                required
                className="text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="price" className="text-xs">Precio ($ COP)</Label>
                <Input
                  id="price"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                  className="text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="sede" className="text-xs">Campus / Sede</Label>
                <select
                  id="sede"
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                  value={formData.sede}
                  onChange={(e) => setFormData({ ...formData, sede: e.target.value })}
                  required
                >
                  {UDC_SEDES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="tipoP" className="text-xs">Categoría / Tipo de Publicación</Label>
              <select
                id="tipoP"
                className="w-full h-10 rounded-md border border-input bg-background px-3 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                value={formData.tipoP}
                onChange={(e) => setFormData({ ...formData, tipoP: e.target.value })}
                required
              >
                {CATEGORIAS_PRODUCTO.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="desc" className="text-xs">Descripción Detallada</Label>
              <Textarea
                id="desc"
                rows={4}
                value={formData.desc}
                onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                className="text-xs"
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" size="sm" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="udc" size="sm" disabled={isSubmitting}>
              {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
