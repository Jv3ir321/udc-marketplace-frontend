import { useNavigate, useLocation } from 'react-router-dom';
import { PageTransition } from '@/components/common/PageTransition';
import { GoogleAuthButton } from '@/components/auth/GoogleAuthButton';
import {
  ShieldCheck,
  GraduationCap,
  CheckCircle2,
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleLoginSuccess = () => {
    navigate(from, { replace: true });
  };

  const campuses = [
    { name: 'San Agustín', desc: 'Sede Central & Humanidades', badge: 'Centro' },
    { name: 'Zaragocilla', desc: 'Ciencias de la Salud & Medicina', badge: 'Salud' },
    { name: 'Piedra de Bolívar', desc: 'Ingenierías & Ciencias Exactas', badge: 'Ingeniería' },
    { name: 'San Pablo', desc: 'Ciencias Económicas & Administrativas', badge: 'Economía' },
  ];

  return (
    <PageTransition className="flex-1 w-full min-h-[calc(100vh-4.5rem)] flex items-center justify-center px-4 py-8 sm:py-12 bg-[#f8f9fc] dark:bg-[#070913] font-aeonik transition-colors duration-300 relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ec8026]/5 dark:bg-[#ec8026]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#171a3d]/5 dark:bg-[#44216b]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        {/* ========================================================= */}
        {/* LEFT COLUMN: Editorial Campus Identity & University Card */}
        {/* ========================================================= */}
        <div className="lg:col-span-7 space-y-8 text-left">
          {/* Top Pill / Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#11162e] border border-slate-200/80 dark:border-white/10 shadow-xs">
            <span className="h-2 w-2 rounded-full bg-[#ec8026] animate-pulse" />
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#171a3d] dark:text-slate-200">
              Portal Oficial de la Comunidad UDC
            </span>
          </div>

          {/* Main Typography Header */}
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#171a3d] dark:text-white tracking-tight leading-[1.08]">
              El mercado exclusivo de la{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ec8026] to-[#df4838]">
                Universidad de Cartagena
              </span>
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl font-normal">
              Conecta directamente con compañeros y docentes de todas las sedes. Publica, encuentra libros, calculadoras, tecnología y servicios sin intermediarios.
            </p>
          </div>

          {/* Virtual Campus Pass Preview Card */}
          <div className="relative rounded-3xl p-6 bg-gradient-to-br from-[#171a3d] to-[#0c0e22] text-white shadow-2xl border border-white/10 overflow-hidden group">
            {/* Background Texture & Watermark */}
            <div className="absolute right-[-20px] bottom-[-20px] opacity-10 pointer-events-none">
              <img
                src="/udc-logo.png"
                alt="UDC Watermark"
                className="w-56 h-56 object-contain filter invert"
              />
            </div>

            <div className="relative z-10 space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-white/10 flex items-center justify-center p-2 border border-white/10">
                    <img src="/udc-logo.png" alt="UDC" className="h-full w-auto object-contain" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-200">
                      Carnet Digital de Acceso
                    </p>
                    <p className="text-[11px] text-slate-400 font-medium">
                      Google Workspace for Education
                    </p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-extrabold uppercase tracking-wider">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Verificado UDC
                </span>
              </div>

              {/* Campus Grid Chips */}
              <div className="space-y-2">
                <p className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                  Sedes Habilitadas
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {campuses.map((c) => (
                    <div
                      key={c.name}
                      className="rounded-2xl p-2.5 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <p className="text-xs font-bold text-white leading-tight truncate">
                        {c.name}
                      </p>
                      <p className="text-[10px] text-[#ec8026] font-semibold mt-0.5">
                        {c.badge}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-white/10">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  Autenticación Institucional Segura
                </span>
                <span className="font-mono text-slate-300">@unicartagena.edu.co</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-4 pt-2 text-left">
            <div className="space-y-0.5">
              <p className="text-xl sm:text-2xl font-black text-[#171a3d] dark:text-white">
                100%
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Comunidad Universitaria
              </p>
            </div>
            <div className="space-y-0.5">
              <p className="text-xl sm:text-2xl font-black text-[#ec8026]">
                $0 COP
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Sin comisiones ni tarifas
              </p>
            </div>
            <div className="space-y-0.5">
              <p className="text-xl sm:text-2xl font-black text-[#3da898]">
                4 Sedes
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Entregas presenciales
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: Dedicated Institutional Access Card        */}
        {/* ========================================================= */}
        <div className="lg:col-span-5">
          <div className="rounded-3xl bg-white dark:bg-[#11162e] border border-slate-200/80 dark:border-white/10 p-7 sm:p-9 space-y-6 shadow-elevation relative">
            {/* Card Header with Logo */}
            <div className="text-center space-y-3 pb-2 border-b border-slate-100 dark:border-white/10">
              <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-[#fdf3eb] dark:bg-[#161b38] border border-[#ec8026]/20 shadow-2xs">
                <img
                  src="/udc-logo.png"
                  alt="Universidad de Cartagena"
                  className="h-10 w-auto object-contain"
                />
              </div>

              <div className="space-y-1">
                <h2 className="text-2xl font-black text-[#171a3d] dark:text-white tracking-tight uppercase">
                  Acceso con Google
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-normal leading-relaxed">
                  Inicia sesión o regístrate con tu correo institucional universitario
                </p>
              </div>
            </div>

            {/* Google OAuth Button Action */}
            <div className="space-y-3">
              <GoogleAuthButton
                variant="login"
                text="Ingresar con Google Institucional"
                onSuccess={handleLoginSuccess}
              />
            </div>

            {/* Authorized Domain Callout */}
            <div className="rounded-2xl p-4 bg-slate-50 dark:bg-[#161b38]/60 border border-slate-200/60 dark:border-white/10 space-y-2 text-left">
              <div className="flex items-center gap-2 text-xs font-bold text-[#171a3d] dark:text-white">
                <GraduationCap className="h-4 w-4 text-[#ec8026]" />
                <span>Dominio Autorizado</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                El acceso está reservado exclusivamente para cuentas de correo con extensión:
              </p>
              <div className="inline-block px-3 py-1 rounded-xl bg-white dark:bg-[#0f1329] border border-slate-200 dark:border-white/10 font-mono text-xs font-bold text-[#ec8026]">
                @unicartagena.edu.co
              </div>
            </div>

            {/* Security Checklist */}
            <div className="space-y-2.5 pt-1 text-xs text-left">
              <div className="flex items-start gap-2 text-slate-500 dark:text-slate-400">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>Registro automático al ingresar por primera vez.</span>
              </div>
              <div className="flex items-start gap-2 text-slate-500 dark:text-slate-400">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>Sin contraseñas adicionales ni registros largos.</span>
              </div>
              <div className="flex items-start gap-2 text-slate-500 dark:text-slate-400">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>Podrás cambiar tu foto y teléfono en tu perfil.</span>
              </div>
            </div>

            {/* Legal / Habeas Data Disclaimer */}
            <div className="pt-4 border-t border-slate-100 dark:border-white/10 text-center">
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Tratamiento de datos personales conforme a la Ley 1581 de 2012</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
