import React, { useState, useRef } from 'react';
import { UploadCloud, X, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageUploaderProps {
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
  maxImages?: number;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  images,
  setImages,
  maxImages = 5,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const validFiles: File[] = [];
    const maxSizeBytes = 5 * 1024 * 1024; // 5MB

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith('image/')) {
        if (file.size <= maxSizeBytes) {
          validFiles.push(file);
        }
      }
    }

    setImages((prev) => {
      const combined = [...prev, ...validFiles];
      return combined.slice(0, maxImages);
    });
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <div
        className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer ${
          dragActive
            ? 'border-primary bg-primary/5'
            : 'border-slate-300 hover:border-primary/60 bg-slate-50/50'
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        <div className="flex flex-col items-center justify-center gap-2">
          <div className="h-12 w-12 rounded-full bg-blue-100 text-primary flex items-center justify-center shadow-xs">
            <UploadCloud className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              Haz clic o arrastra fotos de tu producto aquí
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              PNG, JPG o WEBP (Máx. {maxImages} fotos, hasta 5MB c/u)
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2 text-xs rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
          >
            <ImageIcon className="h-3.5 w-3.5 mr-1.5 text-primary" />
            Seleccionar desde tu dispositivo
          </Button>
        </div>
      </div>

      {/* Previews Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 pt-2">
          {images.map((file, index) => {
            const previewUrl = URL.createObjectURL(file);
            return (
              <div
                key={index}
                className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 group bg-slate-100 shadow-2xs"
              >
                <img
                  src={previewUrl}
                  alt={`Preview ${index + 1}`}
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-destructive text-white p-1 rounded-full opacity-90 hover:opacity-100 shadow-sm transition-opacity"
                  title="Eliminar foto"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
                {index === 0 && (
                  <span className="absolute bottom-1 left-1 bg-blue-900/80 text-white text-[9px] font-semibold px-1.5 py-0.5 rounded">
                    Principal
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}

      {images.length === 0 && (
        <div className="flex items-center gap-1.5 text-xs text-amber-600">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          <span>El backend requiere al menos una imagen para crear la publicación.</span>
        </div>
      )}
    </div>
  );
};
