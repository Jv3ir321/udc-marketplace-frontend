import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { PageTransition } from '@/components/common/PageTransition';
import { GoogleAuthButton } from '@/components/auth/GoogleAuthButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading } = useAuth();

  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  const from = location.state?.from?.pathname || '/';

  const handleLoginSuccess = () => {
    navigate(from, { replace: true });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login({ mail, password });
    if (success) {
      handleLoginSuccess();
    }
  };

  return (
    <PageTransition className="flex-1 w-full min-h-[calc(100vh-4.5rem)] flex items-center justify-center px-4 py-12 bg-[#f1f3f6] dark:bg-[#0b0e1e] font-aeonik transition-colors duration-200">
      <div className="w-full max-w-sm space-y-6">
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
                Mercado Universitario
              </span>
            </div>
          </Link>
        </div>

        {/* Login Card */}
        <div className="rounded-3xl bg-white dark:bg-[#11162e] border border-slate-200/80 dark:border-white/10 p-6 sm:p-8 space-y-5 shadow-lifted">
          <div className="space-y-1 text-center border-b border-slate-100 dark:border-white/10 pb-4">
            <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#171a3d] dark:text-white">
              Iniciar Sesión
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-normal leading-relaxed">
              Ingresa con tu correo institucional de la Universidad de Cartagena
            </p>
          </div>

          {/* 1-Click Institutional Google OAuth */}
          <div className="space-y-3">
            <GoogleAuthButton
              variant="login"
              text="Ingresar con Google UDC"
              onSuccess={handleLoginSuccess}
            />

            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-200 dark:border-white/10 w-full" />
              <span className="bg-white dark:bg-[#11162e] px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 shrink-0">
                o con contraseña
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="mail" className="text-xs font-bold text-[#171a3d] dark:text-slate-200">
                Correo Electrónico
              </Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
                <Input
                  id="mail"
                  type="email"
                  placeholder="estudiante@unicartagena.edu.co"
                  value={mail}
                  onChange={(e) => setMail(e.target.value)}
                  className="pl-10 h-10 text-xs font-aeonik font-medium rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#161b38] text-[#171a3d] dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-[#ec8026] focus-visible:bg-white dark:focus-visible:bg-[#1a2042] transition-colors"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs font-bold text-[#171a3d] dark:text-slate-200">
                  Contraseña
                </Label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-10 text-xs font-aeonik font-medium rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#161b38] text-[#171a3d] dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-[#ec8026] focus-visible:bg-white dark:focus-visible:bg-[#1a2042] transition-colors"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="udc"
              disabled={isLoading}
              className="w-full h-11 rounded-full font-bold text-xs tracking-wider shadow-md shadow-[#ec8026]/25 mt-2"
            >
              {isLoading ? (
                <span>Comprobando acceso...</span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span>Acceder al Mercado</span>
                  <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </form>

          {/* Habeas Data notice */}
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500 font-medium text-center">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>Protección de datos conforme a la Ley 1581 de 2012</span>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-white/10 text-center text-xs font-normal text-slate-500 dark:text-slate-400">
            ¿No tienes cuenta aún?{' '}
            <Link to="/register" className="font-bold text-[#ec8026] hover:underline">
              Regístrate aquí
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
