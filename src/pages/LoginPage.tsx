import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { PageTransition } from '@/components/common/PageTransition';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, Mail, ArrowRight } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading } = useAuth();

  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login({ mail, password });
    if (success) {
      navigate(from, { replace: true });
    }
  };

  return (
    <PageTransition className="flex-1 w-full min-h-[calc(100vh-4.5rem)] flex items-center justify-center px-4 py-12 bg-[#faf8f5] font-aeonik">
      <div className="w-full max-w-sm space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex flex-col items-center gap-2.5 group">
            <img
              src="/udc-logo.png"
              alt="Universidad de Cartagena"
              className="h-16 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col items-center">
              <span className="font-aeonik font-black text-2xl text-[#171a3d] leading-none uppercase tracking-tight">
                UDC MARKETPLACE
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#ec8026] mt-0.5">
                Mercado Estudiantil
              </span>
            </div>
          </Link>
        </div>

        {/* Login Card */}
        <div className="rounded-3xl bg-[#ffffff] border border-[#171a3d]/12 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="space-y-1 text-center border-b border-[#171a3d]/10 pb-4">
            <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#171a3d]">
              Iniciar Sesión
            </h1>
            <p className="text-xs text-[#171a3d]/70 font-normal leading-relaxed">
              Ingresa con tu correo y contraseña institucional de la Universidad de Cartagena
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="mail" className="text-xs font-bold text-[#171a3d]">
                Correo Electrónico
              </Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#171a3d]/45 pointer-events-none" />
                <Input
                  id="mail"
                  type="email"
                  placeholder="estudiante@unicartagena.edu.co"
                  value={mail}
                  onChange={(e) => setMail(e.target.value)}
                  className="pl-10 h-10 text-xs font-aeonik font-medium rounded-xl border border-[#171a3d]/15 bg-[#ffffff] text-[#171a3d] placeholder:text-[#171a3d]/40 focus-visible:ring-0 focus-visible:border-[#ec8026] focus-visible:bg-[#fdfbf7] transition-colors"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs font-bold text-[#171a3d]">
                  Contraseña
                </Label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#171a3d]/45 pointer-events-none" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-10 text-xs font-aeonik font-medium rounded-xl border border-[#171a3d]/15 bg-[#ffffff] text-[#171a3d] placeholder:text-[#171a3d]/40 focus-visible:ring-0 focus-visible:border-[#ec8026] focus-visible:bg-[#fdfbf7] transition-colors"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 rounded-full bg-[#ec8026] hover:bg-[#d97018] text-[#ffffff] font-aeonik font-bold text-xs tracking-[0.02em] transition-transform active:scale-95 shadow-sm shadow-[#ec8026]/20 mt-2"
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

          <div className="pt-2 border-t border-[#171a3d]/10 text-center text-xs font-normal text-[#171a3d]/70">
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
