import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UDC_SEDES, getApiBaseUrl } from '@/lib/utils';
import {
  User as UserIcon,
  Phone,
  Building2,
  Camera,
  ShieldCheck,
  Mail,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import { toast } from 'sonner';

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export const EditProfileDialog: React.FC<EditProfileDialogProps> = ({
  open,
  onOpenChange,
  onSuccess,
}) => {
  const { user, updateUserProfile } = useAuth();

  const [name, setName] = useState('');
  const [sede, setSede] = useState('Claustro San Agustín');
  const [cellphone, setCellphone] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.title || user.name || '');
      setSede(user.sede || 'Claustro San Agustín');
      setCellphone(user.cellphone || '');
      setAvatarPreview(user.picture || '');
      setAvatarFile(null);
    }
  }, [user, open]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('La imagen de perfil no debe superar los 5MB');
      return;
    }

    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      toast.error('Formato no soportado. Usa archivos JPEG, PNG o WEBP');
      return;
    }

    setAvatarFile(file);
    const objectUrl = URL.createObjectURL(file);
    setAvatarPreview(objectUrl);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanName = name.trim();
    if (!cleanName) {
      toast.error('El nombre no puede estar vacío');
      return;
    }

    const cleanPhone = cellphone.trim().replace(/\D/g, '');
    if (cleanPhone && (cleanPhone.length < 7 || cleanPhone.length > 15)) {
      toast.error('Por favor ingresa un número de teléfono/WhatsApp válido (10 dígitos en Colombia)');
      return;
    }

    setIsSaving(true);
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
        onOpenChange(false);
        if (onSuccess) onSuccess();
      }
    } finally {
      setIsSaving(false);
    }
  };

  const getInitials = (n?: string) => {
    if (!n) return 'U';
    return n
      .split(' ')
      .map((part) => part[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const apiBaseUrl = getApiBaseUrl();
  const resolvedAvatarSrc = avatarPreview
    ? avatarPreview.startsWith('http') || avatarPreview.startsWith('blob:')
      ? avatarPreview
      : `${apiBaseUrl}${avatarPreview}`
    : '';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-3xl bg-white dark:bg-[#11162e] border border-slate-200 dark:border-white/10 p-6 sm:p-8 font-aeonik text-[#171a3d] dark:text-white shadow-2xl">
        <DialogHeader className="space-y-1.5 text-center pb-3 border-b border-slate-100 dark:border-white/10">
          <DialogTitle className="text-xl font-extrabold uppercase tracking-tight text-[#171a3d] dark:text-white">
            Editar Perfil Universitario
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500 dark:text-slate-400 font-normal">
            Actualiza tus datos de contacto y foto para compradores y vendedores de la UDC.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {/* Avatar Upload Area */}
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="relative group">
              <Avatar className="h-24 w-24 rounded-full border-2 border-[#ec8026]/30 shadow-md bg-slate-100 dark:bg-[#161b38]">
                {resolvedAvatarSrc && (
                  <AvatarImage
                    src={resolvedAvatarSrc}
                    alt={name || 'Avatar'}
                    className="object-cover"
                  />
                )}
                <AvatarFallback className="text-2xl font-black bg-[#171a3d] dark:bg-[#ec8026] text-white">
                  {getInitials(name)}
                </AvatarFallback>
              </Avatar>

              <label
                htmlFor="avatar-upload-dialog"
                className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-[#ec8026] hover:bg-[#d66e1b] text-white flex items-center justify-center shadow-lg cursor-pointer transition-transform active:scale-95 group-hover:scale-105"
                title="Cambiar foto de perfil"
              >
                <Camera className="h-4 w-4" />
                <input
                  id="avatar-upload-dialog"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
              Haz clic en el icono de cámara para subir una foto (máx. 5MB)
            </p>
          </div>

          {/* Institutional Email (Read-Only) */}
          <div className="space-y-1.5">
            <Label className="text-xs font-bold text-[#171a3d] dark:text-slate-200 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-slate-400" />
                <span>Correo Institucional</span>
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-extrabold flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" /> Verificado
              </span>
            </Label>
            <Input
              type="email"
              value={user?.mail || ''}
              disabled
              className="h-10 text-xs font-aeonik font-bold rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100/80 dark:bg-white/5 text-slate-500 dark:text-slate-400 cursor-not-allowed"
            />
          </div>

          {/* Full Name */}
          <div className="space-y-1.5">
            <Label htmlFor="edit-name" className="text-xs font-bold text-[#171a3d] dark:text-slate-200 flex items-center gap-1.5">
              <UserIcon className="h-3.5 w-3.5 text-[#ec8026]" />
              <span>Nombre Completo *</span>
            </Label>
            <Input
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Laura Castro Mendoza"
              className="h-10 text-xs font-aeonik font-bold rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#161b38] text-[#171a3d] dark:text-white focus-visible:ring-1 focus-visible:ring-[#ec8026]"
              required
            />
          </div>

          {/* Sede / Campus */}
          <div className="space-y-1.5">
            <Label htmlFor="edit-sede" className="text-xs font-bold text-[#171a3d] dark:text-slate-200 flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5 text-[#ec8026]" />
              <span>Sede / Campus *</span>
            </Label>
            <select
              id="edit-sede"
              value={sede}
              onChange={(e) => setSede(e.target.value)}
              className="w-full h-10 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#161b38] px-3 text-xs font-aeonik font-bold text-[#171a3d] dark:text-white focus:outline-none focus:ring-1 focus:ring-[#ec8026] cursor-pointer"
              required
            >
              {UDC_SEDES.map((s) => (
                <option key={s} value={s} className="dark:bg-[#11162e]">
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Cellphone / WhatsApp */}
          <div className="space-y-1.5">
            <Label htmlFor="edit-phone" className="text-xs font-bold text-[#171a3d] dark:text-slate-200 flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-[#3da898]" />
              <span>WhatsApp / Teléfono Móvil *</span>
            </Label>
            <div className="relative">
              <Input
                id="edit-phone"
                value={cellphone}
                onChange={(e) => setCellphone(e.target.value)}
                placeholder="3001234567"
                className="h-10 text-xs font-aeonik font-bold rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#161b38] text-[#171a3d] dark:text-white focus-visible:ring-1 focus-visible:ring-[#3da898]"
                required
              />
            </div>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
              Este número se usará para el botón de contacto de WhatsApp en tus anuncios.
            </p>
          </div>

          <DialogFooter className="pt-3 gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSaving}
              className="rounded-full text-xs font-bold border-slate-200 dark:border-white/10"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="udc"
              disabled={isSaving}
              className="rounded-full text-xs font-bold shadow-md shadow-[#ec8026]/20"
            >
              {isSaving ? (
                <span className="flex items-center gap-1.5">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Guardando cambios...</span>
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Guardar Perfil</span>
                </span>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
