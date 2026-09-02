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
        className={`border-2 border-dashed rounded-[20px] p-6 text-center transition-all cursor-pointer ${
          dragActive
            ? 'border-[#000000] bg-[#dceeff]'
            : 'border-[#000000]/40 hover:border-[#000000] bg-[#dceeff]/30'
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
          <div className="h-10 w-10 rounded-[1600px] border border-[#000000] bg-[#ffffff] flex items-center justify-center text-[#000000]">
            <UploadCloud className="h-5 w-5 text-[#fb4903]" />
          </div>
          <div>
            <p className="text-xs font-bold text-[#000000]">
              Haz clic o arrastra fotos del artículo aquí
            </p>
            <p className="text-[11px] text-[#000000]/60 font-medium">
              PNG, JPG o WEBP hasta 5MB por foto (Máx. {maxImages} fotos)
            </p>
          </div>
          <span className="h-7 px-3 rounded-[1600px] border border-[#000000] bg-[#ffffff] text-[11px] font-bold text-[#000000] inline-flex items-center">
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
                className="relative aspect-square rounded-[16px] overflow-hidden border border-[#000000] bg-[#ffffff]"
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
                  className="absolute top-1 right-1 h-6 w-6 rounded-[1600px] bg-[#000000] text-[#ffffff] flex items-center justify-center hover:bg-[#fb4903] transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
