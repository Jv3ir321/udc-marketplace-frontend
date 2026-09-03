import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMarketplace } from '@/context/MarketplaceContext';
import { useAuth } from '@/context/AuthContext';
import { ImageUploader } from '@/components/marketplace/ImageUploader';
import { PageTransition } from '@/components/common/PageTransition';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { UDC_SEDES, CATEGORIAS_PRODUCTO } from '@/lib/utils';
import { ArrowLeft, Plus } from 'lucide-react';
import { toast } from 'sonner';

export const CreatePostPage: React.FC = () => {
  const navigate = useNavigate();
  const { createPost } = useMarketplace();
  const { user } = useAuth();

  const [nombre, setNombre] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [sede, setSede] = useState(user?.sede || 'Zaragocilla');
  const [tipoP, setTipoP] = useState(CATEGORIAS_PRODUCTO[0] as string);
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre.trim()) {
      toast.error('El nombre del producto es obligatorio');
      return;
    }

    if (images.length === 0) {
      toast.error('Debes adjuntar al menos una imagen');
      return;
    }

    setIsSubmitting(true);
    const success = await createPost({
      nombre: nombre.trim(),
      desc: desc.trim(),
      price: price.trim() || '0',
      sede,
      tipoP,
      images,
    });

    setIsSubmitting(false);

    if (success) {
      navigate('/my-posts');
    }
  };

  return (
    <PageTransition className="min-h-screen bg-[#edf0f7] py-10 px-4 sm:px-6 lg:px-8 font-aeonik text-[#171a3d]">
      <div className="max-w-2xl mx-auto space-y-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-xs h-9 px-4 rounded-[1600px] border border-[#171a3d] bg-[#ffffff] hover:bg-[#edf0f7] text-[#171a3d] font-aeonik font-bold tracking-[0.032em] flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Volver</span>
        </button>

        <div className="rounded-[24px] bg-[#ffffff] border border-[#171a3d] p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="border-b border-[#171a3d]/20 pb-4 space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-[0.032em] text-[#ec8026] block">
              MERCADO ESTUDIANTIL UDC
            </span>
            <h1 className="text-3xl sm:text-4xl font-lateral uppercase tracking-normal text-[#171a3d] leading-none">
              PUBLICAR ARTÍCULO
            </h1>
            <p className="text-xs text-[#171a3d]/70 font-medium">
              Vende o permuta libros, calculadoras, batas y apuntes con entrega directa en tu claustro.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Image Uploader */}
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-[0.032em] text-[#171a3d]">
                Fotografías del Artículo *
              </Label>
              <ImageUploader images={images} setImages={setImages} maxImages={5} />
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="nombre" className="text-xs font-bold uppercase tracking-[0.032em] text-[#000000]">
                Título o Nombre del Artículo *
              </Label>
              <Input
                id="nombre"
                placeholder="Ej: Calculadora Casio FX-991LAX, Bata de Laboratorio Talla S..."
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="h-10 text-xs font-aeonik font-medium rounded-[1600px] border border-[#000000] bg-[#ffffff] focus-visible:ring-0 focus-visible:bg-[#e9e9e9]"
                required
              />
            </div>

            {/* Price, Sede, Category */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price" className="text-xs font-bold uppercase tracking-[0.032em] text-[#000000]">
                  Precio ($ COP) *
                </Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="Ej: 50000"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="h-10 text-xs font-aeonik font-bold rounded-[1600px] border border-[#000000] bg-[#ffffff] focus-visible:ring-0 focus-visible:bg-[#e9e9e9]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sede" className="text-xs font-bold uppercase tracking-[0.032em] text-[#000000]">
                  Campus / Sede *
                </Label>
                <select
                  id="sede"
                  className="w-full h-10 rounded-[1600px] border border-[#000000] bg-[#ffffff] px-3 text-xs font-aeonik font-bold text-[#000000] focus:outline-none cursor-pointer"
                  value={sede}
                  onChange={(e) => setSede(e.target.value)}
                  required
                >
                  {UDC_SEDES.map((s) => (
                    <option key={s} value={s}>
                      Campus {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tipoP" className="text-xs font-bold uppercase tracking-[0.032em] text-[#000000]">
                  Categoría *
                </Label>
                <select
                  id="tipoP"
                  className="w-full h-10 rounded-[1600px] border border-[#000000] bg-[#ffffff] px-3 text-xs font-aeonik font-bold text-[#000000] focus:outline-none cursor-pointer"
                  value={tipoP}
                  onChange={(e) => setTipoP(e.target.value)}
                  required
                >
                  {CATEGORIAS_PRODUCTO.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="desc" className="text-xs font-bold uppercase tracking-[0.032em] text-[#000000]">
                Detalles y Estado de Conservación *
              </Label>
              <Textarea
                id="desc"
                placeholder="Indica el estado del producto (ej: nuevo, usado en buen estado), semestre en que se utilizó y lugar sugerido de entrega dentro del campus..."
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="min-h-[120px] text-xs font-aeonik rounded-[20px] border border-[#000000] bg-[#ffffff] p-3 focus-visible:ring-0 focus-visible:bg-[#e9e9e9]"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 rounded-[1600px] bg-[#ec8026] hover:bg-[#d97018] text-[#ffffff] font-aeonik font-bold text-sm tracking-[0.032em] border border-[#171a3d] transition-transform active:scale-95 shadow-sm"
              >
                {isSubmitting ? (
                  <span>Publicando en UDC Marketplace...</span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Plus className="h-4 w-4 stroke-[3]" />
                    Publicar Aviso en el Mercado
                  </span>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </PageTransition>
  );
};
