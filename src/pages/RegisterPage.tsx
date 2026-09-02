import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { PageTransition } from '@/components/common/PageTransition';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { UDC_SEDES, ROLES_UDC } from '@/lib/utils';
import { Lock, Mail, User, Phone, BadgeCheck, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    mail: '',
    password: '',
    sede: 'Zaragocilla',
    codEst: '',
    role: 'Estudiante',
    cellphone: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await register(formData);
    if (success) {
      navigate('/login');
    }
  };

  return (
    <PageTransition className="flex-1 w-full min-h-[calc(100vh-4.5rem)] flex items-center justify-center px-4 py-12 relative overflow-hidden bg-gradient-to-br from-stone-950 via-stone-900 to-orange-950">
      {/* Background Ambient Mesh & Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-orange-600/20 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-amber-600/15 blur-3xl pointer-events-none rounded-full" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="w-full max-w-lg space-y-6 relative z-10 my-auto"
      >
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
                Registro de Estudiantes
              </span>
            </div>
          </Link>
        </div>

        <Card className="rounded-3xl border border-white/15 bg-stone-900/85 backdrop-blur-xl shadow-2xl text-white overflow-hidden">
          <CardHeader className="space-y-1.5 pb-4 text-center border-b border-white/10">
            <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-300 text-[11px] font-semibold mx-auto mb-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>Comunidad Oficial Universidad de Cartagena</span>
            </div>
            <CardTitle className="text-2xl font-black text-white">
              Crear Cuenta Universitaria
            </CardTitle>
            <CardDescription className="text-xs text-stone-300">
              Completa tus datos para publicar y comprar sin intermediarios
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div className="space-y-1.5">
                <Label htmlFor="title" className="text-xs font-bold uppercase tracking-wider text-stone-300">
                  Nombre Completo *
                </Label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-400/80" />
                  <Input
                    id="title"
                    placeholder="Ej: Laura Sofía Barrios"
                    className="pl-10 h-10 rounded-xl text-xs bg-white/5 border-white/15 text-white placeholder:text-stone-500 focus-visible:ring-orange-500 focus-visible:border-orange-500"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Email & Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="mail" className="text-xs font-bold uppercase tracking-wider text-stone-300">
                    Correo Institucional *
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-400/80" />
                    <Input
                      id="mail"
                      type="email"
                      placeholder="usuario@unicartagena.edu.co"
                      className="pl-10 h-10 rounded-xl text-xs bg-white/5 border-white/15 text-white placeholder:text-stone-500 focus-visible:ring-orange-500 focus-visible:border-orange-500"
                      value={formData.mail}
                      onChange={(e) => handleChange('mail', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-stone-300">
                    Contraseña *
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-400/80" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 h-10 rounded-xl text-xs bg-white/5 border-white/15 text-white placeholder:text-stone-500 focus-visible:ring-orange-500 focus-visible:border-orange-500"
                      value={formData.password}
                      onChange={(e) => handleChange('password', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Sede & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="sede" className="text-xs font-bold uppercase tracking-wider text-stone-300">
                    Campus / Sede *
                  </Label>
                  <select
                    id="sede"
                    className="w-full h-10 rounded-xl border border-white/15 bg-stone-900/90 text-white px-3 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-orange-500"
                    value={formData.sede}
                    onChange={(e) => handleChange('sede', e.target.value)}
                    required
                  >
                    {UDC_SEDES.map((s) => (
                      <option key={s} value={s} className="bg-stone-900 text-white">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="role" className="text-xs font-bold uppercase tracking-wider text-stone-300">
                    Rol Universitario *
                  </Label>
                  <select
                    id="role"
                    className="w-full h-10 rounded-xl border border-white/15 bg-stone-900/90 text-white px-3 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-orange-500"
                    value={formData.role}
                    onChange={(e) => handleChange('role', e.target.value)}
                    required
                  >
                    {ROLES_UDC.map((r) => (
                      <option key={r} value={r} className="bg-stone-900 text-white">
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* CodEst & Cellphone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="codEst" className="text-xs font-bold uppercase tracking-wider text-stone-300">
                    Código Estudiantil *
                  </Label>
                  <div className="relative">
                    <BadgeCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-400/80" />
                    <Input
                      id="codEst"
                      placeholder="Ej: 0222010045"
                      className="pl-10 h-10 rounded-xl text-xs font-mono bg-white/5 border-white/15 text-white placeholder:text-stone-500 focus-visible:ring-orange-500 focus-visible:border-orange-500"
                      value={formData.codEst}
                      onChange={(e) => handleChange('codEst', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="cellphone" className="text-xs font-bold uppercase tracking-wider text-stone-300">
                    Número Celular (WhatsApp) *
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-400/80" />
                    <Input
                      id="cellphone"
                      type="tel"
                      placeholder="Ej: 3001234567"
                      className="pl-10 h-10 rounded-xl text-xs bg-white/5 border-white/15 text-white placeholder:text-stone-500 focus-visible:ring-orange-500 focus-visible:border-orange-500"
                      value={formData.cellphone}
                      onChange={(e) => handleChange('cellphone', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                variant="udc"
                className="w-full h-11 rounded-xl font-bold shadow-xl shadow-orange-600/30 text-white mt-2"
                disabled={isLoading}
              >
                {isLoading ? 'Registrando en base de datos...' : 'Crear Mi Cuenta Estudiantil'}
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </form>
          </CardContent>

          <CardFooter className="bg-black/30 border-t border-white/10 p-4 justify-center text-xs text-stone-300">
            <span>¿Ya tienes una cuenta? </span>
            <Link to="/login" className="ml-1.5 text-orange-400 font-bold hover:underline">
              Inicia sesión aquí
            </Link>
          </CardFooter>
        </Card>
      </motion.div>
    </PageTransition>
  );
};
