import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMarketplace } from '@/context/MarketplaceContext';
import { useAuth } from '@/context/AuthContext';
import { ImageUploader } from '@/components/marketplace/ImageUploader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { UDC_SEDES, CATEGORIAS_PRODUCTO, formatCOP } from '@/lib/utils';
import {
  Plus,
  X,
  ArrowLeft,
  Sparkles,
  MapPin,
  Tag,
  CheckCircle2,
  AlertCircle,
  Banknote,
  FileText,
  Camera,
} from 'lucide-react';
import { toast } from 'sonner';

interface CreatePostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const QUICK_PRICE_PRESETS = [
  { label: 'Gratis / Regalo', value: '0' },
  { label: '$ 10.000', value: '10000' },
  { label: '$ 25.000', value: '25000' },
  { label: '$ 50.000', value: '50000' },
  { label: '$ 100.000', value: '100000' },
];

const QUICK_CONDITION_TAGS = [
  'Como nuevo / Sellado',
  'Excelente estado',
  'Subrayado leve',
  'Incluye accesorios',
  'Entrega en biblioteca / plazoleta',
];

export const CreatePostDialog: React.FC<CreatePostDialogProps> = ({
  open,
  onOpenChange,
  onSuccess,
}) => {
  const { createPost } = useMarketplace();
  const { user } = useAuth();

  const [nombre, setNombre] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [sede, setSede] = useState(user?.sede || 'Claustro San Agustín');
  const [tipoP, setTipoP] = useState(CATEGORIAS_PRODUCTO[0] as string);
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Synchronize defaults on opening
  useEffect(() => {
    if (open) {
      if (user?.sede) {
        setSede(user.sede);
      }
      // Lock body scroll on mobile and desktop while dialog is active
      document.body.style.overflow = 'hidden';
    } else {
      setNombre('');
      setDesc('');
      setPrice('');
      setImages([]);
      setTipoP(CATEGORIAS_PRODUCTO[0] as string);
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open, user]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onOpenChange(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onOpenChange]);

  const handleAddConditionTag = (tag: string) => {
    if (!desc) {
      setDesc(tag);
    } else if (!desc.includes(tag)) {
      setDesc((prev) => `${prev.trim()} · ${tag}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre.trim()) {
      toast.error('El título del artículo es obligatorio');
      return;
    }

    if (images.length === 0) {
      toast.error('Debes adjuntar al menos una fotografía del artículo');
      return;
    }

    setIsSubmitting(true);
    const success = await createPost({
      nombre: nombre.trim(),
      desc: desc.trim() || 'Sin descripción adicional',
      price: price.trim() || '0',
      sede,
      tipoP,
      images,
    });

    setIsSubmitting(false);

    if (success) {
      toast.success('¡Artículo publicado en el catálogo!');
      onOpenChange(false);
      if (onSuccess) onSuccess();
    }
  };

  // Reactive validation state
  const isTitleValid = nombre.trim().length >= 3;
  const isImagesValid = images.length > 0;
  const isPriceValid = price.trim().length > 0 && !isNaN(Number(price));
  const isDescValid = desc.trim().length >= 5;
  const formProgress = [isImagesValid, isTitleValid, isPriceValid, isDescValid].filter(Boolean).length;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center font-aeonik">
          {/* Frosted Backdrop Overlay with Fade Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 bg-[#171a3d]/65 backdrop-blur-md cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal / Fullscreen Container */}
          <motion.div
            initial={{
              opacity: 0,
              y: window.innerWidth < 640 ? '100%' : 24,
              scale: window.innerWidth < 640 ? 1 : 0.94,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: window.innerWidth < 640 ? '100%' : 16,
              scale: window.innerWidth < 640 ? 1 : 0.96,
            }}
            transition={{
              type: 'spring',
              damping: window.innerWidth < 640 ? 30 : 25,
              stiffness: window.innerWidth < 640 ? 300 : 320,
            }}
            className="fixed inset-0 sm:inset-auto sm:relative z-50 w-full h-[100dvh] sm:h-auto sm:max-h-[90vh] sm:max-w-2xl bg-white sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden sm:border sm:border-slate-100"
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-post-title"
          >
            {/* Header: Responsive Top Bar */}
            <div className="shrink-0 bg-white border-b border-slate-100 px-4 sm:px-8 py-3.5 sm:py-5 flex items-center justify-between gap-3 sticky top-0 z-10">
              <div className="flex items-center gap-2.5 sm:gap-3">
                {/* Mobile Back Button */}
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="sm:hidden h-9 w-9 rounded-full bg-slate-100 hover:bg-slate-200 text-[#171a3d] flex items-center justify-center transition-colors active:scale-95"
                  aria-label="Cerrar y volver"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#fdf3eb] text-[#ec8026]">
                      <Sparkles className="h-3 w-3" />
                      <span>Mercado Estudiantil</span>
                    </span>
                    <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {formProgress}/4 requisitos
                    </span>
                  </div>
                  <h2
                    id="create-post-title"
                    className="text-lg sm:text-2xl font-extrabold uppercase tracking-tight text-[#171a3d] leading-tight"
                  >
                    Publicar Artículo
                  </h2>
                </div>
              </div>

              {/* Desktop Close Button */}
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="hidden sm:flex h-9 w-9 rounded-full bg-slate-100 hover:bg-slate-200 text-[#171a3d] items-center justify-center transition-transform active:scale-90"
                aria-label="Cerrar ventana"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form
              id="create-post-form"
              onSubmit={handleSubmit}
              className="flex-1 overflow-y-auto px-4 sm:px-8 py-5 space-y-6"
            >
              {/* 1. Image Uploader with Reactive Count */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <Camera className="h-3.5 w-3.5 text-[#ec8026]" />
                    <span>Fotos del Artículo *</span>
                  </Label>
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      isImagesValid
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {images.length}/5 fotos
                  </span>
                </div>
                <ImageUploader images={images} setImages={setImages} maxImages={5} />
              </div>

              {/* 2. Title & Live Character Counter */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="create-nombre"
                    className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5"
                  >
                    <Tag className="h-3.5 w-3.5 text-[#ec8026]" />
                    <span>Título o Nombre del Artículo *</span>
                  </Label>
                  <span className="text-[10px] font-bold text-slate-400">
                    {nombre.length}/80
                  </span>
                </div>
                <Input
                  id="create-nombre"
                  maxLength={80}
                  placeholder="Ej: Calculadora Casio FX-991LAX, Bata de Laboratorio Talla S..."
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="h-11 px-4 text-xs font-aeonik font-medium rounded-2xl border-0 bg-slate-100/90 focus:bg-white focus:ring-2 focus:ring-[#ec8026]/30 transition-all text-[#171a3d] shadow-sm"
                  required
                />
              </div>

              {/* 3. Price with Live Formatted Currency & Presets */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="create-price"
                    className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5"
                  >
                    <Banknote className="h-3.5 w-3.5 text-[#ec8026]" />
                    <span>Precio ($ COP) *</span>
                  </Label>
                  {price && (
                    <span className="inline-flex items-center gap-1 text-xs font-black text-[#171a3d] bg-[#fdf3eb] px-2.5 py-0.5 rounded-full border border-[#ec8026]/20">
                      {formatCOP(price)}
                    </span>
                  )}
                </div>

                <Input
                  id="create-price"
                  type="number"
                  min="0"
                  placeholder="Ej: 45000 (0 para intercambio/gratis)"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="h-11 px-4 text-xs font-aeonik font-bold rounded-2xl border-0 bg-slate-100/90 focus:bg-white focus:ring-2 focus:ring-[#ec8026]/30 transition-all text-[#171a3d] shadow-sm"
                  required
                />

                {/* Quick Price Preset Chips */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[10px] font-bold text-slate-400 mr-1">Rápido:</span>
                  {QUICK_PRICE_PRESETS.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setPrice(preset.value)}
                      className={`h-7 px-2.5 rounded-full text-[11px] font-bold transition-all active:scale-95 ${
                        price === preset.value
                          ? 'bg-[#ec8026] text-white shadow-sm'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Campus / Sede and Category Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="create-sede"
                    className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5"
                  >
                    <MapPin className="h-3.5 w-3.5 text-[#ec8026]" />
                    <span>Campus / Sede de Entrega *</span>
                  </Label>
                  <select
                    id="create-sede"
                    className="w-full h-11 rounded-2xl border-0 bg-slate-100/90 focus:bg-white focus:ring-2 focus:ring-[#ec8026]/30 px-3.5 text-xs font-aeonik font-bold text-[#171a3d] cursor-pointer transition-all outline-none shadow-sm"
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
                  <Label
                    htmlFor="create-tipoP"
                    className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5"
                  >
                    <Tag className="h-3.5 w-3.5 text-[#ec8026]" />
                    <span>Categoría del Producto *</span>
                  </Label>
                  <select
                    id="create-tipoP"
                    className="w-full h-11 rounded-2xl border-0 bg-slate-100/90 focus:bg-white focus:ring-2 focus:ring-[#ec8026]/30 px-3.5 text-xs font-aeonik font-bold text-[#171a3d] cursor-pointer transition-all outline-none shadow-sm"
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

              {/* 5. Description & Reactive Condition Chips */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="create-desc"
                    className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5"
                  >
                    <FileText className="h-3.5 w-3.5 text-[#ec8026]" />
                    <span>Detalles y Estado de Conservación *</span>
                  </Label>
                  <span className="text-[10px] font-bold text-slate-400">
                    {desc.length}/500
                  </span>
                </div>

                <Textarea
                  id="create-desc"
                  maxLength={500}
                  placeholder="Describe el estado del producto (ej: nuevo, usado 1 semestre, con apuntes útiles) y punto de entrega dentro del campus..."
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="min-h-[100px] text-xs font-aeonik rounded-2xl border-0 bg-slate-100/90 focus:bg-white focus:ring-2 focus:ring-[#ec8026]/30 p-3.5 transition-all text-[#171a3d] leading-relaxed resize-none shadow-sm"
                  required
                />

                {/* Quick Condition Tag Suggestions */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] font-bold text-slate-400 mr-1">Etiquetas:</span>
                  {QUICK_CONDITION_TAGS.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleAddConditionTag(tag)}
                      className="h-6 px-2.5 rounded-full bg-slate-100 hover:bg-[#fdf3eb] hover:text-[#ec8026] text-slate-600 text-[10px] font-bold transition-all active:scale-95 shadow-sm"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reactive Form Completion Badge */}
              <div className="rounded-2xl p-3.5 bg-slate-50 border border-slate-100/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {formProgress === 4 ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-[#ec8026] shrink-0" />
                  )}
                  <span className="text-xs font-bold text-[#171a3d]">
                    {formProgress === 4
                      ? '¡Todo listo para publicar tu aviso!'
                      : `Completa los requisitos (${formProgress}/4 completados)`}
                  </span>
                </div>
                <span className="text-[11px] font-bold text-slate-400">
                  {Math.round((formProgress / 4) * 100)}%
                </span>
              </div>
            </form>

            {/* Footer Action Bar: Sticky on Mobile, Integrated on Desktop */}
            <div className="shrink-0 bg-white/95 backdrop-blur-md border-t border-slate-100 p-4 sm:px-8 sm:py-4 flex items-center justify-between gap-3 sticky bottom-0 z-10">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onOpenChange(false)}
                className="h-11 px-5 rounded-full border-0 bg-slate-100 text-xs font-bold text-slate-700 hover:bg-slate-200 transition-all"
              >
                Cancelar
              </Button>

              <Button
                type="submit"
                form="create-post-form"
                disabled={isSubmitting || !isTitleValid || !isImagesValid}
                className="flex-1 sm:flex-initial h-11 px-7 rounded-full bg-[#ec8026] hover:bg-[#d97018] text-white font-aeonik font-bold text-xs tracking-[0.02em] shadow-lg shadow-[#ec8026]/25 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span>Publicando en UDC Marketplace...</span>
                ) : (
                  <span className="flex items-center justify-center gap-1.5">
                    <Plus className="h-4 w-4 stroke-[3]" />
                    <span>Publicar Aviso</span>
                  </span>
                )}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

