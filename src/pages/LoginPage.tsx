import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { PageTransition } from '@/components/common/PageTransition';
import { GoogleAuthButton } from '@/components/auth/GoogleAuthButton';
import { ShieldCheck, Sparkles, GraduationCap, CheckCircle2, LockKeyhole } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleLoginSuccess = () => {
    navigate(from, { replace: true });
  };

  return (
    <PageTransition className="flex-1 w-full min-h-[calc(100vh-4.5rem)] flex items-center justify-center px-4 py-12 bg-[#f1f3f6] dark:bg-[#0b0e1e] font-aeonik transition-colors duration-200">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex flex-col items-center gap-2.5 group">
            <img
              src="/udc-logo.png"
              alt="Universidad de Cartagena"
              className="h-16 w-auto object-contain transition-transform group-hover:scale-105 drop-shadow-xs"
            />
            <div className="flex flex-col items-center">
              <span className="font-aeonik font-black text-2xl text-[#171a3d] dark:text-white leading-none uppercase tracking-tight">
                UDC MARKETPLACE
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#ec8026] mt-0.5">
                Mercado Universitario Oficial
              </span>
            </div>
          </Link>
        </div>

        {/* Exclusive OAuth Login Card */}
        <div className="rounded-3xl bg-white dark:bg-[#11162e] border border-slate-200/80 dark:border-white/10 p-6 sm:p-8 space-y-6 shadow-lifted">
          <div className="space-y-2 text-center pb-2">
            <div className="mx-auto h-12 w-12 rounded-2xl bg-[#fdf3eb] dark:bg-[#161b38] flex items-center justify-center border border-[#ec8026]/20 shadow-xs">
              <Sparkles className="h-6 w-6 text-[#ec8026]" />
            </div>
            <h1 className="text-2xl font-black uppercase tracking-tight text-[#171a3d] dark:text-white">
              Acceso Institucional
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-normal leading-relaxed">
              Ingresa de forma segura con tu cuenta de correo institucional de la <strong>Universidad de Cartagena</strong>
            </p>
          </div>

          {/* Primary Action: Google Institutional OAuth Button */}
          <div className="space-y-3 pt-1">
            <GoogleAuthButton
              variant="login"
              text="Ingresar con Google UDC"
              onSuccess={handleLoginSuccess}
            />
          </div>

          {/* Security & Verification Badges */}
          <div className="space-y-2.5 pt-2 border-t border-slate-100 dark:border-white/10 text-xs">
            <div className="flex items-start gap-2.5 text-slate-600 dark:text-slate-300">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Acceso Verificado:</strong> Exclusivo para cuentas activas con dominio <code className="text-[#ec8026] font-bold">@unicartagena.edu.co</code>.
              </span>
            </div>
            <div className="flex items-start gap-2.5 text-slate-600 dark:text-slate-300">
              <GraduationCap className="h-4 w-4 text-[#44216b] dark:text-purple-400 shrink-0 mt-0.5" />
              <span>
                <strong>Registro Automático:</strong> Tu cuenta se crea al instante en tu primer inicio de sesión.
              </span>
            </div>
            <div className="flex items-start gap-2.5 text-slate-600 dark:text-slate-300">
              <LockKeyhole className="h-4 w-4 text-[#ec8026] shrink-0 mt-0.5" />
              <span>
                <strong>Sin Contraseñas Extra:</strong> Autenticación directa a través de Google Workspace universitario.
              </span>
            </div>
          </div>

          {/* Habeas Data Legal Disclaimer */}
          <div className="pt-2 border-t border-slate-100 dark:border-white/10 flex items-center justify-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500 font-medium text-center">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>Tratamiento de datos conforme a la Ley 1581 de 2012 (Habeas Data)</span>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
