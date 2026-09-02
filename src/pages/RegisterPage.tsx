import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { PageTransition } from '@/components/common/PageTransition';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UDC_SEDES, ROLES_UDC } from '@/lib/utils';
import { Lock, Mail, User, Phone, ArrowRight } from 'lucide-react';

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
    <PageTransition className="flex-1 w-full min-h-[calc(100vh-4.5rem)] flex items-center justify-center px-4 py-12 bg-[#edf0f7] font-aeonik">
      <div className="w-full max-w-md space-y-6">
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

        <div className="rounded-[24px] bg-[#ffffff] border border-[#171a3d] p-6 sm:p-8 space-y-5 shadow-sm">
          <div className="space-y-1 text-center border-b border-[#171a3d]/20 pb-4">
            <h1 className="text-3xl font-lateral uppercase tracking-normal text-[#171a3d] leading-none">
              CREAR CUENTA
            </h1>
            <p className="text-xs text-[#171a3d]/70 font-medium">
              Únete a la comunidad de compraventa de la Universidad de Cartagena
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="title" className="text-xs font-bold uppercase tracking-[0.032em] text-[#000000]">
                Nombre Completo *
              </Label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#000000]/60 pointer-events-none" />
                <Input
                  id="title"
                  placeholder="Carlos Mendoza"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className="pl-9 h-10 text-xs font-aeonik font-medium rounded-[1600px] border border-[#000000] bg-[#ffffff] text-[#000000] focus-visible:ring-0 focus-visible:bg-[#e9e9e9]"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="mail" className="text-xs font-bold uppercase tracking-[0.032em] text-[#000000]">
                Correo Electrónico *
              </Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#000000]/60 pointer-events-none" />
                <Input
                  id="mail"
                  type="email"
                  placeholder="cmendoza@unicartagena.edu.co"
                  value={formData.mail}
                  onChange={(e) => handleChange('mail', e.target.value)}
                  className="pl-9 h-10 text-xs font-aeonik font-medium rounded-[1600px] border border-[#000000] bg-[#ffffff] text-[#000000] focus-visible:ring-0 focus-visible:bg-[#e9e9e9]"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs font-bold uppercase tracking-[0.032em] text-[#000000]">
                Contraseña *
              </Label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#000000]/60 pointer-events-none" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  className="pl-9 h-10 text-xs font-aeonik font-medium rounded-[1600px] border border-[#000000] bg-[#ffffff] text-[#000000] focus-visible:ring-0 focus-visible:bg-[#e9e9e9]"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="sede" className="text-xs font-bold uppercase tracking-[0.032em] text-[#000000]">
                  Sede / Campus *
                </Label>
                <select
                  id="sede"
                  className="w-full h-10 rounded-[1600px] border border-[#000000] bg-[#ffffff] px-3 text-xs font-aeonik font-bold text-[#000000] focus:outline-none cursor-pointer"
                  value={formData.sede}
                  onChange={(e) => handleChange('sede', e.target.value)}
                  required
                >
                  {UDC_SEDES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="role" className="text-xs font-bold uppercase tracking-[0.032em] text-[#000000]">
                  Rol *
                </Label>
                <select
                  id="role"
                  className="w-full h-10 rounded-[1600px] border border-[#000000] bg-[#ffffff] px-3 text-xs font-aeonik font-bold text-[#000000] focus:outline-none cursor-pointer"
                  value={formData.role}
                  onChange={(e) => handleChange('role', e.target.value)}
                  required
                >
                  {ROLES_UDC.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="codEst" className="text-xs font-bold uppercase tracking-[0.032em] text-[#000000]">
                  Código Estudiantil
                </Label>
                <Input
                  id="codEst"
                  placeholder="Ej: 022191004"
                  value={formData.codEst}
                  onChange={(e) => handleChange('codEst', e.target.value)}
                  className="h-10 text-xs font-aeonik font-medium rounded-[1600px] border border-[#000000] bg-[#ffffff] text-[#000000]"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="cellphone" className="text-xs font-bold uppercase tracking-[0.032em] text-[#000000]">
                  WhatsApp / Celular
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#000000]/60 pointer-events-none" />
                  <Input
                    id="cellphone"
                    placeholder="3001234567"
                    value={formData.cellphone}
                    onChange={(e) => handleChange('cellphone', e.target.value)}
                    className="pl-9 h-10 text-xs font-aeonik font-medium rounded-[1600px] border border-[#171a3d] bg-[#ffffff] text-[#171a3d]"
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 rounded-[1600px] bg-[#171a3d] hover:bg-[#252a5c] text-[#ffffff] font-aeonik font-bold text-xs tracking-[0.032em] border border-[#171a3d] transition-transform active:scale-95 mt-3"
            >
              {isLoading ? (
                <span>Creando perfil...</span>
              ) : (
                <span className="flex items-center justify-center gap-1.5">
                  <span>Registrarme en UDC Marketplace</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              )}
            </Button>
          </form>

          <div className="pt-2 text-center text-xs font-medium text-[#171a3d]/70">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="font-bold text-[#171a3d] underline hover:text-[#df4838]">
              Inicia sesión
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
