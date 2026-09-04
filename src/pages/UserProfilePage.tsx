import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PublicUserProfile } from '@/types';
import { userService } from '@/services/userService';
import { useAuth } from '@/context/AuthContext';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { PageTransition } from '@/components/common/PageTransition';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import {
  MapPin,
  ArrowLeft,
  GraduationCap,
  ShieldCheck,
  Star,
  Plus,
  PackageCheck,
  MessageSquare,
} from 'lucide-react';
import WhatsappIcon from '@/components/ui/whatsapp-icon';
import { formatCampusName } from '@/lib/utils';

export const UserProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [profile, setProfile] = useState<PublicUserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUserProfile() {
      if (!id) return;
      setIsLoading(true);
      try {
        const data = await userService.getUserProfile(Number(id));
        setProfile(data);
      } catch (e) {
        console.error('Error loading user profile', e);
      } finally {
        setIsLoading(false);
      }
    }
    loadUserProfile();
  }, [id]);

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const handleWhatsAppContact = () => {
    if (!profile?.cellphone) return;
    const phone = profile.cellphone.replace(/\D/g, '');
    window.open(
      `https://wa.me/57${phone}?text=${encodeURIComponent(
        `Hola ${profile.title || profile.name}, te escribo por tus publicaciones en UDC Marketplace.`
      )}`,
      '_blank'
    );
  };

  const isOwnProfile = user && profile && Number(user.id) === Number(profile.id);

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto py-12 px-4 space-y-6 font-aeonik">
        <div className="rounded-3xl bg-[#ffffff] border border-[#171a3d]/12 p-8 space-y-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-20 w-20 rounded-full bg-[#edf0f7]" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-6 w-48 rounded-full bg-[#edf0f7]" />
              <Skeleton className="h-4 w-32 rounded-full bg-[#edf0f7]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center space-y-4 font-aeonik">
        <h2 className="text-3xl font-extrabold uppercase tracking-tight text-[#171a3d]">Usuario no encontrado</h2>
        <p className="text-xs text-[#171a3d]/70 font-normal">
          El perfil solicitado no existe o no tiene publicaciones activas en la Universidad de Cartagena.
        </p>
        <Button asChild className="rounded-full bg-[#171a3d] hover:bg-[#252a5c] text-[#ffffff] font-aeonik font-bold text-xs">
          <Link to="/catalog">Volver al Catálogo</Link>
        </Button>
      </div>
    );
  }

  const displayName = profile.title || profile.name || 'Estudiante UDC';
  const campusLabel = formatCampusName(profile.sede || 'Cartagena');

  return (
    <PageTransition className="min-h-screen bg-[#faf8f5] py-10 px-4 sm:px-6 lg:px-8 font-aeonik text-[#171a3d]">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="text-xs h-9 px-4 rounded-full bg-white hover:bg-slate-50 text-[#171a3d] font-aeonik font-bold tracking-[0.02em] flex items-center gap-1.5 transition-all shadow-[0_2px_8px_rgba(23,26,61,0.04)] hover:shadow-[0_4px_12px_rgba(23,26,61,0.08)]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Volver</span>
          </button>

          {isOwnProfile && (
            <Button
              asChild
              size="sm"
              className="h-9 px-4 rounded-full bg-[#ec8026] hover:bg-[#d97018] text-white font-aeonik font-bold text-xs shadow-md shadow-[#ec8026]/20"
            >
              <Link to="/my-posts">
                <PackageCheck className="h-3.5 w-3.5 mr-1.5" />
                <span>Mis Publicaciones</span>
              </Link>
            </Button>
          )}
        </div>

        {/* Profile Banner Card */}
        <div className="rounded-3xl bg-white p-6 sm:p-8 space-y-6 shadow-[0_16px_40px_rgba(23,26,61,0.11),0_4px_12px_rgba(23,26,61,0.06)] ring-1 ring-black/[0.04]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-4 sm:gap-5">
              <Avatar className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-[#f4edf9] shadow-inner shrink-0">
                <AvatarFallback className="text-2xl sm:text-3xl font-bold font-aeonik text-[#171a3d]">
                  {getInitials(displayName)}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-1.5 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171a3d] leading-none tracking-tight">
                    {displayName}
                  </h1>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#edf7f5] text-[#3da898] shadow-sm">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>{profile.role || 'Estudiante UDC'}</span>
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-[#ec8026]" />
                  <span>Campus {campusLabel}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-[#44216b]">
                    <GraduationCap className="h-3.5 w-3.5" />
                    <span>Miembro UDC</span>
                  </span>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
              {isOwnProfile ? (
                <Button
                  asChild
                  size="sm"
                  className="h-10 px-5 rounded-full bg-[#ec8026] hover:bg-[#d97018] text-white text-xs font-bold shadow-md shadow-[#ec8026]/20"
                >
                  <Link to="/catalog?create=true">
                    <Plus className="h-4 w-4 mr-1.5 stroke-[3]" />
                    <span>Publicar Artículo</span>
                  </Link>
                </Button>
              ) : (
                profile.cellphone && (
                  <button
                    type="button"
                    onClick={handleWhatsAppContact}
                    className="h-10 px-5 rounded-full bg-[#3da898] hover:bg-[#328e81] text-white text-xs font-bold tracking-[0.02em] flex items-center gap-2 transition-transform active:scale-95 shadow-md shadow-[#3da898]/20 group/wa"
                  >
                    <WhatsappIcon size={18} strokeWidth={2.2} color="#ffffff" />
                    <span>Contactar por WhatsApp</span>
                  </button>
                )
              )}
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="rounded-2xl p-4 bg-slate-50 space-y-1 shadow-sm shadow-slate-900/5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Artículos Activos
              </span>
              <span className="font-aeonik text-3xl font-black text-[#171a3d] leading-none block">
                {profile.posts?.length || profile.postsCount || 0}
              </span>
            </div>
            <div className="rounded-2xl p-4 bg-[#fdf8eb]/80 space-y-1 shadow-sm shadow-amber-900/5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Calificación
              </span>
              <div className="flex items-center gap-1">
                <span className="font-aeonik text-3xl font-black text-[#d97706] leading-none">
                  {profile.ratingAvg && profile.ratingAvg > 0 ? profile.ratingAvg.toFixed(1) : '5.0'}
                </span>
                <Star className="h-5 w-5 text-[#f59e0b] fill-[#f59e0b]" />
              </div>
            </div>
            <div className="rounded-2xl p-4 bg-[#f4edf9]/80 space-y-1 shadow-sm shadow-purple-900/5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Reseñas
              </span>
              <div className="flex items-center gap-1">
                <span className="font-aeonik text-3xl font-black text-[#44216b] leading-none">
                  {profile.ratingCount || profile.receivedValorations?.length || 0}
                </span>
                <MessageSquare className="h-4 w-4 text-[#44216b]" />
              </div>
            </div>
            <div className="rounded-2xl p-4 bg-[#edf7f5]/80 space-y-1 shadow-sm shadow-teal-900/5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Estado
              </span>
              <span className="text-xs font-bold text-[#3da898] block mt-1">
                Verificado UDC
              </span>
            </div>
          </div>
        </div>

        {/* User's Posts Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2">
            <h2 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-[#171a3d]">
              Publicaciones de {displayName}
            </h2>
            <span className="text-xs font-bold px-3.5 py-1.5 rounded-full bg-white shadow-md shadow-slate-900/8 text-slate-700">
              {profile.posts?.length || 0} avisos activos
            </span>
          </div>

          {profile.posts && profile.posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {profile.posts.map((post) => (
                <ProductCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl bg-white p-10 text-center text-xs font-normal text-slate-500 shadow-[0_12px_32px_rgba(23,26,61,0.09)] ring-1 ring-black/[0.04]">
              Este estudiante no tiene artículos a la venta actualmente.
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};
