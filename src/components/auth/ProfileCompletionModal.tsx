import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UDC_SEDES } from '@/lib/utils';
import WhatsappIcon from '@/components/ui/whatsapp-icon';
import {
  Sparkles,
  Building2,
  User as UserIcon,
  ShieldCheck,
  Camera,
  ArrowRight,
  Loader2,
} from 'lucide-react';
import { toast } from 'sonner';

export const ProfileCompletionModal: React.FC = () => {
  const { user, isAuthenticated, updateUserProfile } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [sede, setSede] = useState('Claustro San Agustín');
  const [cellphone, setCellphone] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const [habeasDataAccepted, setHabeasDataAccepted] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Trigger modal when user is logged in but doesn't have a phone number
  useEffect(() => {
    if (isAuthenticated && user) {
      const hasNoPhone = !user.cellphone || user.cellphone.trim() === '';
      if (hasNoPhone) {
        setName(user.title || user.name || '');
        setSede(user.sede || 'Claustro San Agustín');
        setCellphone('');
        setAvatarPreview(user.picture || '');
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    } else {
      setIsOpen(false);
    }
  }, [isAuthenticated, user]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('La imagen no debe superar los 5MB');
      return;
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      toast.error('Formato no soportado. Usa JPEG, PNG o WEBP');
      return;
    }

    setAvatarFile(file);
    const objectUrl = URL.createObjectURL(file);
    setAvatarPreview(objectUrl);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!habeasDataAccepted) {
      toast.error('Debes autorizar el tratamiento de datos para contacto en el Marketplace');
      return;
    }

    const cleanName = name.trim();
    if (!cleanName) {
      toast.error('Por favor ingresa tu nombre completo');
      return;
    }

    const cleanPhone = cellphone.trim().replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 7 || cleanPhone.length > 15) {
      toast.error('Por favor ingresa un número de WhatsApp/celular válido (10 dígitos en Colombia)');
      return;
    }

    setIsSubmitting(true);
    try {
      let success = false;
      if (avatarFile) {
        const formData = new FormData();
        formData.append('name', cleanName);
        formData.append('title', cleanName);
        formData.append('sede', sede);
        formData.append('cellphone', cleanPhone);
        formData.append('avatar', avatarFile);

        success = await updateUserProfile(formData);
      } else {
        success = await updateUserProfile({
          name: cleanName,
          title: cleanName,
          sede: sede,
          cellphone: cleanPhone,
        });
      }

      if (success) {
        toast.success('¡Perfil universitario completado con éxito! Bienvenido al marketplace.');
        setIsOpen(false);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInitials = (n?: string) => {
    if (!n) return 'U';
    return n
      .split(' ')
      .map((p) => p[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  if (!isOpen) return null;

  const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
  const resolvedAvatarSrc = avatarPreview
    ? avatarPreview.startsWith('http') || avatarPreview.startsWith('blob:')
      ? avatarPreview
      : `${apiBaseUrl}${avatarPreview}`
    : '';

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        className="sm:max-w-lg rounded-3xl bg-white dark:bg-[#11162e] border-2 border-[#ec8026]/30 dark:border-white/10 p-6 sm:p-8 font-aeonik text-[#171a3d] dark:text-white shadow-2xl animate-scale-up"
      >
        <DialogHeader className="space-y-2 text-center pb-3 border-b border-slate-100 dark:border-white/10">
          <div className="mx-auto h-12 w-12 rounded-2xl bg-[#fdf3eb] dark:bg-[#161b38] flex items-center justify-center border border-[#ec8026]/20 shadow-xs">
            <Sparkles className="h-6 w-6 text-[#ec8026]" />
          </div>
          <DialogTitle className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#171a3d] dark:text-white">
            Completa tu Perfil Universitario
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500 dark:text-slate-400 font-normal leading-relaxed">
            Para que otros estudiantes puedan contactarte directamente por WhatsApp para concretar compras o entregas en la UDC, ingresa tu número de contacto.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {/* Avatar Preview / Customizer */}
          <div className="flex items-center justify-center gap-4 p-3 rounded-2xl bg-slate-50 dark:bg-[#161b38] border border-slate-200/80 dark:border-white/10">
            <div className="relative group shrink-0">
              <Avatar className="h-16 w-16 rounded-full border-2 border-[#ec8026]/40 shadow-xs">
                {resolvedAvatarSrc && (
                  <AvatarImage
                    src={resolvedAvatarSrc}
                    alt={name || 'Avatar'}
                    className="object-cover"
                  />
                )}
                <AvatarFallback className="text-xl font-bold bg-[#171a3d] dark:bg-[#ec8026] text-white">
                  {getInitials(name)}
                </AvatarFallback>
              </Avatar>

              <label
                htmlFor="profile-onboarding-avatar"
                className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-[#ec8026] text-white flex items-center justify-center shadow cursor-pointer transition-transform hover:scale-110"
                title="Cambiar foto"
              >
                <Camera className="h-3 w-3" />
                <input
                  id="profile-onboarding-avatar"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            <div className="text-left space-y-0.5">
              <span className="text-xs font-bold text-[#171a3d] dark:text-white block">
                Foto de Perfil
              </span>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-tight">
                Puedes conservar tu foto de Google o hacer clic en la cámara para subir una foto personalizada.
              </p>
            </div>
          </div>

          {/* Full Name */}
          <div className="space-y-1.5">
            <Label htmlFor="onboarding-name" className="text-xs font-bold text-[#171a3d] dark:text-slate-200 flex items-center gap-1.5">
              <UserIcon className="h-3.5 w-3.5 text-[#ec8026]" />
              <span>Nombre Completo *</span>
            </Label>
            <Input
              id="onboarding-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Daniel Castillo"
              className="h-11 text-xs font-aeonik font-bold rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#161b38] text-[#171a3d] dark:text-white focus-visible:ring-1 focus-visible:ring-[#ec8026]"
              required
            />
          </div>

          {/* Sede / Campus */}
          <div className="space-y-1.5">
            <Label htmlFor="onboarding-sede" className="text-xs font-bold text-[#171a3d] dark:text-slate-200 flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5 text-[#ec8026]" />
              <span>Sede Principal de Estudio *</span>
            </Label>
            <select
              id="onboarding-sede"
              value={sede}
              onChange={(e) => setSede(e.target.value)}
              className="w-full h-11 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#161b38] px-3 text-xs font-aeonik font-bold text-[#171a3d] dark:text-white focus:outline-none focus:ring-1 focus:ring-[#ec8026] cursor-pointer"
              required
            >
              {UDC_SEDES.map((s) => (
                <option key={s} value={s} className="dark:bg-[#11162e]">
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* WhatsApp / Celular */}
          <div className="space-y-1.5">
            <Label htmlFor="onboarding-phone" className="text-xs font-bold text-[#171a3d] dark:text-slate-200 flex items-center gap-1.5">
              <WhatsappIcon size={14} color="#3da898" strokeWidth={2.2} />
              <span>Número de WhatsApp / Celular *</span>
            </Label>
            <div className="relative">
              <Input
                id="onboarding-phone"
                value={cellphone}
                onChange={(e) => setCellphone(e.target.value)}
                placeholder="Ej: 3001234567"
                className="h-11 text-xs font-aeonik font-bold rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#161b38] text-[#171a3d] dark:text-white focus-visible:ring-1 focus-visible:ring-[#3da898]"
                required
              />
            </div>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
              Obligatorio para que los compradores puedan acordar entregas contigo en el campus.
            </p>
          </div>

          {/* Habeas Data Checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600 dark:text-slate-300 select-none">
              <input
                type="checkbox"
                checked={habeasDataAccepted}
                onChange={(e) => setHabeasDataAccepted(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#ec8026] focus:ring-[#ec8026] cursor-pointer shrink-0"
                required
              />
              <span className="leading-snug text-[11px]">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 inline mr-1" />
                Autorizo el tratamiento de mis datos de contacto de acuerdo con la <strong>Ley 1581 de 2012 (Habeas Data)</strong> para interacción en UDC Marketplace.
              </span>
            </label>
          </div>

          <Button
            type="submit"
            variant="udc"
            disabled={isSubmitting || !habeasDataAccepted}
            className="w-full h-11 rounded-full font-bold text-xs tracking-wider shadow-md shadow-[#ec8026]/25 mt-3"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Guardando datos universitarios...</span>
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span>Comenzar a explorar UDC Marketplace</span>
                <ArrowRight className="h-4 w-4" />
              </span>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
