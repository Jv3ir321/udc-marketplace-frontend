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
    <PageTransition className="min-h-screen bg-[#faf8f5] py-10 px-4 sm:px-6 lg:px-8 font-aeonik text-[#171a3d]">
      <div className="max-w-2xl mx-auto space-y-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-xs h-9 px-4 rounded-full bg-white hover:bg-slate-50 text-[#171a3d] font-aeonik font-bold tracking-[0.02em] flex items-center gap-1.5 transition-all shadow-[0_2px_8px_rgba(23,26,61,0.04)] hover:shadow-[0_4px_12px_rgba(23,26,61,0.08)]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Volver</span>
        </button>

        <div className="rounded-3xl bg-white shadow-[0_16px_40px_rgba(23,26,61,0.11),0_4px_12px_rgba(23,26,61,0.06)] ring-1 ring-black/[0.04] p-6 sm:p-10 space-y-6">
          <div className="border-b border-slate-100 pb-5 space-y-1.5">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#fdf3eb] text-[#ec8026]">
              Mercado Estudiantil UDC
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#171a3d]">
              Publicar Artículo
            </h1>
            <p className="text-xs text-slate-500 font-normal leading-relaxed">
              Vende o permuta libros, calculadoras, batas y apuntes con entrega directa en tu claustro.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Image Uploader */}
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Fotografías del Artículo *
              </Label>
              <ImageUploader images={images} setImages={setImages} maxImages={5} />
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="nombre" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Título o Nombre del Artículo *
              </Label>
              <Input
                id="nombre"
                placeholder="Ej: Calculadora Casio FX-991LAX, Bata de Laboratorio Talla S..."
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="h-11 px-4 text-xs font-aeonik font-medium rounded-2xl border-0 bg-slate-100/90 focus:bg-white focus:ring-2 focus:ring-[#ec8026]/20 transition-all text-[#171a3d]"
                required
              />
            </div>

            {/* Price, Sede, Category */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Precio ($ COP) *
                </Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="Ej: 50000"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="h-11 px-4 text-xs font-aeonik font-bold rounded-2xl border-0 bg-slate-100/90 focus:bg-white focus:ring-2 focus:ring-[#ec8026]/20 transition-all text-[#171a3d]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sede" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Campus / Sede *
                </Label>
                <select
                  id="sede"
                  className="w-full h-11 rounded-2xl border-0 bg-slate-100/90 focus:bg-white focus:ring-2 focus:ring-[#ec8026]/20 px-3.5 text-xs font-aeonik font-bold text-[#171a3d] cursor-pointer transition-all outline-none"
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
                <Label htmlFor="tipoP" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Categoría *
                </Label>
                <select
                  id="tipoP"
                  className="w-full h-11 rounded-2xl border-0 bg-slate-100/90 focus:bg-white focus:ring-2 focus:ring-[#ec8026]/20 px-3.5 text-xs font-aeonik font-bold text-[#171a3d] cursor-pointer transition-all outline-none"
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
              <Label htmlFor="desc" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Detalles y Estado de Conservación *
              </Label>
              <Textarea
                id="desc"
                placeholder="Indica el estado del producto (ej: nuevo, usado en buen estado), semestre en que se utilizó y lugar sugerido de entrega dentro del campus..."
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="min-h-[130px] text-xs font-aeonik rounded-2xl border-0 bg-slate-100/90 focus:bg-white focus:ring-2 focus:ring-[#ec8026]/20 p-4 transition-all text-[#171a3d] leading-relaxed resize-none"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 rounded-full bg-[#ec8026] hover:bg-[#d97018] text-white font-aeonik font-bold text-sm tracking-[0.02em] shadow-lg shadow-[#ec8026]/25 transition-all active:scale-[0.98]"
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
