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
import { Card, CardContent } from '@/components/ui/card';
import { UDC_SEDES, CATEGORIAS_PRODUCTO } from '@/lib/utils';
import { PlusCircle, Sparkles, ArrowLeft } from 'lucide-react';
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
      toast.error('Debes adjuntar al menos una imagen (requerido por el backend)');
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
    <PageTransition className="min-h-screen bg-orange-50/20 py-8 sm:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="text-xs text-stone-600 hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-1.5" />
          Volver
        </Button>

        <Card className="rounded-3xl border-orange-100 shadow-md overflow-hidden bg-white">
          <div className="bg-gradient-to-r from-orange-950 via-stone-900 to-orange-900 text-white p-6 sm:p-8 border-b border-orange-500/20">
            <div className="flex items-center gap-2 text-orange-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="h-4 w-4" />
              <span>Nuevo Anuncio Universitario</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Publicar en UDC Marketplace
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-xl">
              Vende libros, batas, calculadoras o publica tus servicios para que otros estudiantes de tu campus te contacten directamente.
            </p>
          </div>

          <CardContent className="p-5 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Uploader */}
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  Fotografías del Artículo *
                </Label>
                <ImageUploader images={images} setImages={setImages} maxImages={5} />
              </div>

              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="nombre" className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  Título de la Publicación *
                </Label>
                <Input
                  id="nombre"
                  placeholder="Ej: Calculadora Casio FX-991LAX, Bata blanca antifluido Talla S, Libro Cálculo..."
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="h-11 rounded-xl focus:border-orange-500 text-xs sm:text-sm"
                  required
                />
              </div>

              {/* Price, Sede, Category Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    Precio ($ COP) *
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="Ej: 50000"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="h-11 rounded-xl focus:border-orange-500 text-xs sm:text-sm"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sede" className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    Campus / Sede *
                  </Label>
                  <select
                    id="sede"
                    className="w-full h-11 rounded-xl border border-input bg-background px-3 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                    value={sede}
                    onChange={(e) => setSede(e.target.value)}
                    required
                  >
                    {UDC_SEDES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tipoP" className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    Categoría *
                  </Label>
                  <select
                    id="tipoP"
                    className="w-full h-11 rounded-xl border border-input bg-background px-3 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                    value={tipoP}
                    onChange={(e) => setTipoP(e.target.value)}
                    required
                  >
                    {CATEGORIAS_PRODUCTO.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="desc" className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  Descripción Detallada
                </Label>
                <Textarea
                  id="desc"
                  rows={4}
                  placeholder="Detalla el estado del artículo, tiempo de uso, si incluye accesorios, disponibilidad para entregar en el campus..."
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="rounded-xl resize-none focus:border-orange-500 text-xs sm:text-sm"
                  required
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(-1)}
                  className="rounded-full px-6 text-xs sm:text-sm"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="udc"
                  size="lg"
                  disabled={isSubmitting}
                  className="rounded-full px-8 shadow-md text-xs sm:text-sm"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  {isSubmitting ? 'Publicando en backend...' : 'Publicar Ahora'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
};
