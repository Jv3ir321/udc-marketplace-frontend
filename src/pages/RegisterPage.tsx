import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { PageTransition } from '@/components/common/PageTransition';
import { GoogleAuthButton } from '@/components/auth/GoogleAuthButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UDC_SEDES, ROLES_UDC } from '@/lib/utils';
import { Lock, Mail, User, Phone, ArrowRight, Building2, GraduationCap, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    mail: '',
    password: '',
    sede: 'Zaragocilla',
    role: 'Estudiante',
    cellphone: '',
  });

  const [habeasDataAccepted, setHabeasDataAccepted] = useState(true);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleOAuthSuccess = () => {
    navigate('/');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!habeasDataAccepted) {
      toast.error('Debes aceptar la autorización de tratamiento de datos personales (Habeas Data)');
      return;
    }

    const cleanMail = formData.mail.trim().toLowerCase();
    if (!cleanMail.endsWith('@unicartagena.edu.co')) {
      toast.error('Acceso exclusivo: el correo debe ser institucional (@unicartagena.edu.co)');
      return;
    }

    const success = await register(formData);
    if (success) {
      navigate('/login');
    }
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
                Mercado Universitario
              </span>
            </div>
          </Link>
        </div>

        {/* Register Card */}
        <div className="rounded-3xl bg-white dark:bg-[#11162e] border border-slate-200/80 dark:border-white/10 p-6 sm:p-8 space-y-5 shadow-lifted">
          <div className="space-y-1 text-center border-b border-slate-100 dark:border-white/10 pb-4">
            <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#171a3d] dark:text-white">
              Crear Cuenta
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-normal leading-relaxed">
              Únete a la comunidad de compraventa de la Universidad de Cartagena
            </p>
          </div>

          {/* 1-Click Institutional Google OAuth Option */}
          <div className="space-y-3">
            <GoogleAuthButton
              variant="register"
              text="Registro Rápido con Google UDC"
              onSuccess={handleOAuthSuccess}
            />

            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-200 dark:border-white/10 w-full" />
              <span className="bg-white dark:bg-[#11162e] px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 shrink-0">
                o completa el formulario
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="title" className="text-xs font-bold text-[#171a3d] dark:text-slate-200">
                Nombre Completo *
              </Label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
                <Input
                  id="title"
                  placeholder="Carlos Mendoza"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className="pl-10 h-10 text-xs font-aeonik font-medium rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#161b38] text-[#171a3d] dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-[#ec8026] focus-visible:bg-white dark:focus-visible:bg-[#1a2042] transition-colors"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="mail" className="text-xs font-bold text-[#171a3d] dark:text-slate-200">
                Correo Electrónico Institucional *
              </Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
                <Input
                  id="mail"
                  type="email"
                  placeholder="cmendoza@unicartagena.edu.co"
                  value={formData.mail}
                  onChange={(e) => handleChange('mail', e.target.value)}
                  className="pl-10 h-10 text-xs font-aeonik font-medium rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#161b38] text-[#171a3d] dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-[#ec8026] focus-visible:bg-white dark:focus-visible:bg-[#1a2042] transition-colors"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs font-bold text-[#171a3d] dark:text-slate-200">
                Contraseña *
              </Label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  className="pl-10 h-10 text-xs font-aeonik font-medium rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#161b38] text-[#171a3d] dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-[#ec8026] focus-visible:bg-white dark:focus-visible:bg-[#1a2042] transition-colors"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="sede" className="text-xs font-bold text-[#171a3d] dark:text-slate-200 flex items-center gap-1">
                  <Building2 className="h-3 w-3 text-[#ec8026]" />
                  <span>Sede / Campus *</span>
                </Label>
                <select
                  id="sede"
                  className="w-full h-10 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#161b38] px-3 text-xs font-aeonik font-bold text-[#171a3d] dark:text-white focus:outline-none focus:ring-1 focus:ring-[#ec8026] cursor-pointer transition-colors"
                  value={formData.sede}
                  onChange={(e) => handleChange('sede', e.target.value)}
                  required
                >
                  {UDC_SEDES.map((s) => (
                    <option key={s} value={s} className="dark:bg-[#11162e]">
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="role" className="text-xs font-bold text-[#171a3d] dark:text-slate-200 flex items-center gap-1">
                  <GraduationCap className="h-3 w-3 text-[#44216b] dark:text-purple-400" />
                  <span>Rol *</span>
                </Label>
                <select
                  id="role"
                  className="w-full h-10 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#161b38] px-3 text-xs font-aeonik font-bold text-[#171a3d] dark:text-white focus:outline-none focus:ring-1 focus:ring-[#ec8026] cursor-pointer transition-colors"
                  value={formData.role}
                  onChange={(e) => handleChange('role', e.target.value)}
                  required
                >
                  {ROLES_UDC.map((r) => (
                    <option key={r} value={r} className="dark:bg-[#11162e]">
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="cellphone" className="text-xs font-bold text-[#171a3d] dark:text-slate-200 flex items-center gap-1">
                <Phone className="h-3 w-3 text-[#3da898]" />
                <span>WhatsApp / Celular (Opcional)</span>
              </Label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
                <Input
                  id="cellphone"
                  placeholder="Ej: 3001234567"
                  value={formData.cellphone}
                  onChange={(e) => handleChange('cellphone', e.target.value)}
                  className="pl-10 h-10 text-xs font-aeonik font-medium rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#161b38] text-[#171a3d] dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-[#ec8026] focus-visible:bg-white dark:focus-visible:bg-[#1a2042] transition-colors"
                />
              </div>
            </div>

            {/* Habeas Data Consent Checkbox */}
            <div className="pt-2 pb-1">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600 dark:text-slate-300 select-none">
                <input
                  type="checkbox"
                  checked={habeasDataAccepted}
                  onChange={(e) => setHabeasDataAccepted(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#ec8026] focus:ring-[#ec8026] cursor-pointer shrink-0"
                  required
                />
                <span className="leading-snug">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 inline mr-1" />
                  Autorizo el tratamiento de mis datos personales de acuerdo con la <strong>Ley 1581 de 2012 (Habeas Data)</strong> para fines de contacto en el mercado universitario UDC.
                </span>
              </label>
            </div>

            <Button
              type="submit"
              variant="udc"
              disabled={isLoading || !habeasDataAccepted}
              className="w-full h-11 rounded-full font-bold text-xs tracking-wider shadow-md shadow-[#ec8026]/25 mt-1"
            >
              {isLoading ? (
                <span>Creando perfil...</span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span>Registrarme en UDC Marketplace</span>
                  <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </form>

          <div className="pt-2 border-t border-slate-100 dark:border-white/10 text-center text-xs font-normal text-slate-500 dark:text-slate-400">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="font-bold text-[#ec8026] hover:underline">
              Inicia sesión
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
