import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { PageTransition } from '@/components/common/PageTransition';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Lock, Mail, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <PageTransition className="flex-1 w-full min-h-[calc(100vh-4.5rem)] flex items-center justify-center px-4 py-12 relative overflow-hidden bg-gradient-to-br from-stone-950 via-stone-900 to-orange-950">
      {/* Background Ambient Mesh & Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-600/20 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-600/15 blur-3xl pointer-events-none rounded-full" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="w-full max-w-md space-y-6 relative z-10 my-auto"
      >
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="h-14 w-14 rounded-2xl bg-white/10 backdrop-blur-md p-1.5 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform border border-white/20">
              <img
                src="/udc-logo.png"
                alt="Logo UDC"
                className="h-full w-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/favicon.svg';
                }}
              />
            </div>
            <div className="text-left">
              <span className="font-black text-xl tracking-tight text-white block">
                UDC Marketplace
              </span>
              <span className="text-[11px] font-bold tracking-wider text-orange-400 uppercase">
                Universidad de Cartagena
              </span>
            </div>
          </Link>
        </div>

        <Card className="rounded-3xl border border-white/15 bg-stone-900/85 backdrop-blur-xl shadow-2xl text-white overflow-hidden">
          <CardHeader className="space-y-1.5 pb-4 text-center border-b border-white/10">
            <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-300 text-[11px] font-semibold mx-auto mb-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>Acceso Seguro a la Comunidad UDC</span>
            </div>
            <CardTitle className="text-2xl font-black text-white">
              Iniciar Sesión
            </CardTitle>
            <CardDescription className="text-xs text-stone-300">
              Ingresa con tu correo universitario y contraseña
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="mail" className="text-xs font-bold uppercase tracking-wider text-stone-300">
                  Correo Institucional
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-400/80" />
                  <Input
                    id="mail"
                    type="email"
                    placeholder="usuario@unicartagena.edu.co"
                    className="pl-10 h-11 rounded-xl text-xs bg-white/5 border-white/15 text-white placeholder:text-stone-500 focus-visible:ring-orange-500 focus-visible:border-orange-500"
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-stone-300">
                    Contraseña
                  </Label>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-400/80" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 h-11 rounded-xl text-xs bg-white/5 border-white/15 text-white placeholder:text-stone-500 focus-visible:ring-orange-500 focus-visible:border-orange-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="udc"
                className="w-full h-11 rounded-xl font-bold shadow-xl shadow-orange-600/30 text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Autenticando...' : 'Entrar a Mi Cuenta'}
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </form>

            {/* Quick Demo Helper */}
            <div className="pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={handleDemoFill}
                className="w-full text-center text-[11px] text-orange-300 hover:text-orange-200 font-semibold bg-orange-500/10 hover:bg-orange-500/20 py-2.5 rounded-xl border border-orange-500/20 transition-all flex items-center justify-center gap-1.5"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                <span>Rellenar datos de prueba para testing</span>
              </button>
            </div>
          </CardContent>

          <CardFooter className="bg-black/30 border-t border-white/10 p-4 justify-center text-xs text-stone-300">
            <span>¿Aún no tienes cuenta? </span>
            <Link to="/register" className="ml-1.5 text-orange-400 font-bold hover:underline">
              Regístrate aquí
            </Link>
          </CardFooter>
        </Card>
      </motion.div>
    </PageTransition>
  );
};
