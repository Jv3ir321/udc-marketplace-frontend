import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { PageTransition } from '@/components/common/PageTransition';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, Mail, ArrowRight, Sparkles } from 'lucide-react';

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

  const handleDemoFill = () => {
    setMail('jcuesta@unicartagena.edu.co');
    setPassword('123456');
  };

  return (
    <PageTransition className="flex-1 w-full min-h-[calc(100vh-4.5rem)] flex items-center justify-center px-4 py-12 bg-[#edf0f7] font-aeonik">
      <div className="w-full max-w-sm space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex flex-col items-center gap-2 group">
            <img
              src="/udc-logo.png"
              alt="Universidad de Cartagena"
              className="h-16 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <span className="font-lateral text-3xl tracking-normal text-[#171a3d] leading-none uppercase">
              UDC MARKETPLACE
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="rounded-[24px] bg-[#ffffff] border border-[#171a3d] p-6 sm:p-7 space-y-5 shadow-sm">
          <div className="space-y-1 text-center border-b border-[#171a3d]/20 pb-4">
            <h1 className="text-3xl font-lateral uppercase tracking-normal text-[#171a3d] leading-none">
              INICIAR SESIÓN
            </h1>
            <p className="text-xs text-[#171a3d]/70 font-medium">
              Ingresa con tus credenciales de la Universidad de Cartagena
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="mail" className="text-xs font-bold uppercase tracking-[0.032em] text-[#171a3d]">
                Correo Electrónico
              </Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#171a3d]/60 pointer-events-none" />
                <Input
                  id="mail"
                  type="email"
                  placeholder="estudiante@unicartagena.edu.co"
                  value={mail}
                  onChange={(e) => setMail(e.target.value)}
                  className="pl-9 h-10 text-xs font-aeonik font-medium rounded-[1600px] border border-[#171a3d] bg-[#ffffff] text-[#171a3d] focus-visible:ring-0 focus-visible:bg-[#edf0f7]"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs font-bold uppercase tracking-[0.032em] text-[#171a3d]">
                Contraseña
              </Label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#171a3d]/60 pointer-events-none" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 h-10 text-xs font-aeonik font-medium rounded-[1600px] border border-[#171a3d] bg-[#ffffff] text-[#171a3d] focus-visible:ring-0 focus-visible:bg-[#edf0f7]"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 rounded-[1600px] bg-[#171a3d] hover:bg-[#252a5c] text-[#ffffff] font-aeonik font-bold text-xs tracking-[0.032em] border border-[#171a3d] transition-transform active:scale-95 mt-2"
            >
              {isLoading ? (
                <span>Comprobando...</span>
              ) : (
                <span className="flex items-center justify-center gap-1.5">
                  <span>Acceder al Mercado</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              )}
            </Button>
          </form>

          {/* Quick Demo Pill */}
          <div className="pt-2 border-t border-[#171a3d]/20">
            <button
              type="button"
              onClick={handleDemoFill}
              className="w-full h-9 rounded-[1600px] border border-[#171a3d] bg-[#f2b725] hover:bg-[#deb11f] text-[#171a3d] text-xs font-aeonik font-bold tracking-[0.032em] flex items-center justify-center gap-1.5 transition-colors"
            >
              <Sparkles className="h-3.5 w-3.5 fill-current" />
              <span>Cargar Usuario Demo (UDC)</span>
            </button>
          </div>

          <div className="pt-2 text-center text-xs font-medium text-[#171a3d]/70">
            ¿No tienes cuenta aún?{' '}
            <Link to="/register" className="font-bold text-[#171a3d] underline hover:text-[#df4838]">
              Regístrate aquí
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
