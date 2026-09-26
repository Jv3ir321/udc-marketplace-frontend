import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { PageTransition } from '@/components/common/PageTransition';
import { GoogleAuthButton } from '@/components/auth/GoogleAuthButton';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const redirectParam = searchParams.get('redirect') || searchParams.get('from');
  const from = redirectParam || location.state?.from?.pathname || '/';

  const handleLoginSuccess = () => {
    navigate(from, { replace: true });
  };

  return (
    <PageTransition className="flex-1 w-full min-h-[calc(100vh-4.5rem)] flex items-center justify-center px-4 py-12 bg-[#f8f9fa] dark:bg-[#0b0e1e] font-aeonik transition-colors duration-200">
      <div className="w-full max-w-sm space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2.5">
          <Link to="/" className="inline-flex flex-col items-center gap-2 group">
            <img
              src="/udc-logo.png"
              alt="Universidad de Cartagena"
              className="h-14 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col items-center">
              <span className="font-bold text-xl text-[#171a3d] dark:text-white tracking-tight">
                UDC Marketplace
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">
                Comunidad estudiantil
              </span>
            </div>
          </Link>
        </div>

        {/* Minimalist Login Card */}
        <div className="rounded-2xl bg-white dark:bg-[#11162e] border border-slate-200/80 dark:border-white/10 p-6 sm:p-7 space-y-5 shadow-sm">
          <div className="space-y-1 text-center">
            <h1 className="text-lg font-bold text-[#171a3d] dark:text-white">
              Iniciar Sesión
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
              Accede con tu cuenta institucional de Google para comprar o publicar artículos.
            </p>
          </div>

          {/* Google Button & Domain Note */}
          <div className="space-y-2 pt-1 text-center">
            <GoogleAuthButton
              text="Ingresar con Google"
              onSuccess={handleLoginSuccess}
            />
            <p className="text-[11px] text-slate-400 dark:text-slate-500">
              Requiere correo institucional <span className="font-semibold text-slate-600 dark:text-slate-300">@unicartagena.edu.co</span>
            </p>
          </div>

          {/* Privacy Note */}
          <div className="pt-2 border-t border-slate-100 dark:border-white/10 text-center">
            <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400 dark:text-slate-500">
              <ShieldCheck className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
              <span>Tus datos están protegidos según la Ley 1581 de 2012</span>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#171a3d] dark:text-slate-400 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Volver al inicio</span>
          </Link>
        </div>
      </div>
    </PageTransition>
  );
};
