import React, { useState, useRef } from 'react';
import { UploadCloud, X } from 'lucide-react';

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
    <div className="space-y-3 font-aeonik">
      <div
        className={`border-2 border-dashed rounded-3xl p-7 text-center transition-all duration-200 cursor-pointer ${
          dragActive
            ? 'border-[#ec8026] bg-[#fdf3eb] dark:bg-[#ec8026]/10'
            : 'border-slate-200 dark:border-white/15 hover:border-[#ec8026]/60 dark:hover:border-[#ec8026]/60 bg-slate-50/80 dark:bg-[#11162e]/60 hover:bg-slate-100/70 dark:hover:bg-[#161b38]/80'
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

        <div className="flex flex-col items-center justify-center gap-2.5">
          <div className="h-12 w-12 rounded-2xl bg-white dark:bg-[#161b38] shadow-md shadow-[#ec8026]/10 dark:shadow-black/30 border border-slate-100 dark:border-white/10 flex items-center justify-center text-[#ec8026]">
            <UploadCloud className="h-6 w-6 stroke-[2.2]" />
          </div>
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-[#171a3d] dark:text-white">
              Haz clic o arrastra fotos del artículo aquí
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              PNG, JPG o WEBP hasta 5MB por foto (Máx. {maxImages} fotos)
            </p>
          </div>
          <span className="h-8 px-4 rounded-full bg-white dark:bg-[#161b38] text-xs font-bold text-[#171a3d] dark:text-white inline-flex items-center shadow-subtle hover:shadow-elevation border border-slate-200/60 dark:border-white/10 transition-all">
            Seleccionar Archivos
          </span>
        </div>
      </div>

      {/* Previews */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 pt-2">
          {images.map((file, idx) => {
            const previewUrl = URL.createObjectURL(file);
            return (
              <div
                key={idx}
                className="relative aspect-square rounded-2xl overflow-hidden shadow-elevation bg-slate-100 dark:bg-[#161b38] border border-slate-200/60 dark:border-white/10 group"
              >
                <img
                  src={previewUrl}
                  alt={`Subida ${idx + 1}`}
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(idx);
                  }}
                  className="absolute top-1.5 right-1.5 h-6 w-6 rounded-full bg-black/70 hover:bg-rose-500 text-white flex items-center justify-center shadow-md transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
