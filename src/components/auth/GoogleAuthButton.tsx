import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ShieldCheck, Mail, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';

interface GoogleAuthButtonProps {
  onSuccess?: () => void;
  text?: string;
  variant?: 'login' | 'register';
  className?: string;
}

export const GoogleIcon: React.FC<{ className?: string }> = ({ className = 'h-4 w-4' }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

export const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({
  onSuccess,
  text = 'Continuar con Google Institucional',
  variant = 'login',
  className = '',
}) => {
  const { loginWithGoogle, isLoading } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [institutionalEmail, setInstitutionalEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleButtonClick = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const hasGIS = typeof window !== 'undefined' && (window as any).google?.accounts?.oauth2;

    // 1. If Google Identity Services SDK is loaded with a valid Client ID, use Google's native GIS popup
    if (clientId && hasGIS) {
      try {
        const client = (window as any).google.accounts.oauth2.initTokenClient({
          client_id: clientId,
          scope: 'openid email profile',
          hd: 'unicartagena.edu.co',
          callback: async (response: any) => {
            if (response.access_token) {
              setIsAuthenticating(true);
              const ok = await loginWithGoogle({ accessToken: response.access_token });
              setIsAuthenticating(false);
              if (ok && onSuccess) onSuccess();
            }
          },
        });
        client.requestAccessToken({ prompt: 'select_account' });
        return;
      } catch (err) {
        console.warn('Error al invocar Google GIS client:', err);
      }
    }

    // 2. If Client ID is set but GIS SDK not ready, open standard OAuth2 centered popup window
    if (clientId) {
      const redirectUri = `${window.location.origin}/auth/callback`;
      const width = 500;
      const height = 650;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;
      const nonce = Math.random().toString(36).substring(2);

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(
        clientId
      )}&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&response_type=token%20id_token&scope=openid%20email%20profile&hd=unicartagena.edu.co&prompt=select_account&nonce=${nonce}`;

      const popup = window.open(
        authUrl,
        'GoogleAuthPopup',
        `width=${width},height=${height},top=${top},left=${left},status=no,toolbar=no,menubar=no,location=no`
      );

      if (popup) {
        const handleMessage = async (event: MessageEvent) => {
          if (event.origin !== window.location.origin) return;
          if (event.data?.type === 'GOOGLE_OAUTH_RESPONSE') {
            window.removeEventListener('message', handleMessage);
            const { code, accessToken, idToken } = event.data;
            if (accessToken || idToken || code) {
              setIsAuthenticating(true);
              const ok = await loginWithGoogle({ accessToken, idToken, code });
              setIsAuthenticating(false);
              if (ok && onSuccess) onSuccess();
            }
          }
        };

        window.addEventListener('message', handleMessage);
        return;
      }
    }

    // 3. Fallback: If no VITE_GOOGLE_CLIENT_ID is configured in .env, open development simulation modal
    setModalOpen(true);
    setErrorMessage('');
  };

  const handleInstitutionalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanEmail = institutionalEmail.trim().toLowerCase();
    if (!cleanEmail) {
      setErrorMessage('Por favor ingresa tu correo institucional');
      return;
    }

    // STRICT VALIDATION: Must end with @unicartagena.edu.co
    if (!cleanEmail.endsWith('@unicartagena.edu.co')) {
      setErrorMessage('Acceso denegado: El correo debe terminar estrictamente en @unicartagena.edu.co (no se admiten cuentas @gmail.com, @hotmail.com, etc.)');
      return;
    }

    setIsAuthenticating(true);
    const success = await loginWithGoogle({
      email: cleanEmail,
      name: fullName.trim(),
    });
    setIsAuthenticating(false);

    if (success) {
      setModalOpen(false);
      if (onSuccess) onSuccess();
    }
  };

  return (
    <>
      <Button
        type="button"
        variant="outline"
        onClick={handleButtonClick}
        disabled={isLoading || isAuthenticating}
        className={`w-full h-11 rounded-full border border-slate-200 dark:border-white/15 bg-white dark:bg-[#161b38] hover:bg-slate-50 dark:hover:bg-[#1f254e] text-[#171a3d] dark:text-white font-aeonik font-bold text-xs shadow-subtle hover:shadow-elevation transition-all active:scale-95 flex items-center justify-center gap-2.5 ${className}`}
      >
        <GoogleIcon className="h-4 w-4 shrink-0" />
        <span className="truncate">{text}</span>
        <span className="hidden sm:inline-block text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#fdf3eb] dark:bg-[#ec8026]/15 text-[#ec8026] border border-[#ec8026]/20">
          @unicartagena.edu.co
        </span>
      </Button>

      {/* Institutional Google OAuth Authentication Modal */}
      <Dialog open={modalOpen} onOpenChange={(open) => !open && setModalOpen(false)}>
        <DialogContent className="sm:max-w-md rounded-3xl bg-white dark:bg-[#11162e] border border-slate-200 dark:border-white/10 p-6 sm:p-8 font-aeonik text-[#171a3d] dark:text-white shadow-2xl">
          <DialogHeader className="space-y-2 text-center pb-3 border-b border-slate-100 dark:border-white/10">
            <div className="mx-auto h-12 w-12 rounded-2xl bg-[#fdf3eb] dark:bg-[#161b38] flex items-center justify-center border border-[#ec8026]/20 shadow-xs">
              <GoogleIcon className="h-6 w-6" />
            </div>
            <DialogTitle className="text-xl font-extrabold uppercase tracking-tight text-[#171a3d] dark:text-white">
              Google Workspace UDC
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500 dark:text-slate-400 font-normal">
              Acceso institucional con cuenta <strong>@unicartagena.edu.co</strong>.
              <span className="block mt-1 text-[11px] text-[#ec8026] dark:text-[#ec8026]/90 font-medium">
                (Nota: La ventana emergente nativa de Google se abre automáticamente al configurar <code className="bg-slate-100 dark:bg-white/10 px-1 py-0.5 rounded">VITE_GOOGLE_CLIENT_ID</code> en el .env)
              </span>
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleInstitutionalSubmit} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label htmlFor="oauth-mail" className="text-xs font-bold text-[#171a3d] dark:text-slate-200 flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-[#ec8026]" />
                <span>Correo Institucional *</span>
              </Label>
              <div className="relative">
                <Input
                  id="oauth-mail"
                  type="email"
                  placeholder="usuario@unicartagena.edu.co"
                  value={institutionalEmail}
                  onChange={(e) => {
                    setInstitutionalEmail(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  className="h-11 px-3.5 text-xs font-aeonik font-bold rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#161b38] text-[#171a3d] dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-[#ec8026] transition-colors"
                  required
                />
              </div>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                Debe terminar obligatoriamente en <strong className="text-[#ec8026]">@unicartagena.edu.co</strong>
              </p>
            </div>

            {variant === 'register' && (
              <div className="space-y-1.5">
                <Label htmlFor="oauth-name" className="text-xs font-bold text-[#171a3d] dark:text-slate-200">
                  Nombre Completo (Opcional)
                </Label>
                <Input
                  id="oauth-name"
                  placeholder="Ej: Laura Castro"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="h-11 px-3.5 text-xs font-aeonik font-medium rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#161b38] text-[#171a3d] dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-[#ec8026] transition-colors"
                />
              </div>
            )}

            {/* Live Domain Restriction Banner */}
            <div className="rounded-2xl p-3 bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/40 flex items-start gap-2.5 text-xs">
              <ShieldCheck className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div className="text-amber-900 dark:text-amber-200 leading-relaxed font-normal">
                <strong className="font-bold block">Filtro de Seguridad UDC:</strong>
                Solo miembros activos con cuenta <strong>@unicartagena.edu.co</strong> pueden interactuar en el marketplace.
              </div>
            </div>

            {errorMessage && (
              <div className="rounded-2xl p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/50 flex items-start gap-2 text-xs text-rose-600 dark:text-rose-400 font-semibold animate-shake">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <Button
              type="submit"
              variant="udc"
              disabled={isAuthenticating}
              className="w-full h-11 rounded-full font-bold text-xs tracking-wider shadow-md shadow-[#ec8026]/25 mt-2"
            >
              {isAuthenticating ? (
                <span>Validando credenciales institucionales...</span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  <span>Verificar e Ingresar con UDC</span>
                  <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
