import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PublicUserProfile } from '@/types';
import { userService } from '@/services/userService';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { PageTransition } from '@/components/common/PageTransition';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import {
  MapPin,
  ArrowLeft,
  MessageCircle,
} from 'lucide-react';

export const UserProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
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
        `Hola ${profile.title}, te escribo por tus publicaciones en UDC Marketplace.`
      )}`,
      '_blank'
    );
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto py-12 px-4 space-y-6 font-aeonik">
        <div className="rounded-[24px] bg-[#ffffff] border border-[#171a3d] p-8 space-y-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-20 w-20 rounded-[1600px] bg-[#edf0f7]" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-6 w-48 rounded-[1600px] bg-[#edf0f7]" />
              <Skeleton className="h-4 w-32 rounded-[1600px] bg-[#edf0f7]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center space-y-4 font-aeonik">
        <h2 className="text-3xl font-lateral uppercase text-[#171a3d]">Usuario no encontrado</h2>
        <p className="text-xs text-[#171a3d]/70 font-medium">
          El perfil solicitado no existe o no tiene publicaciones activas.
        </p>
        <Button asChild className="rounded-[1600px] bg-[#171a3d] text-[#ffffff] font-aeonik font-bold border border-[#171a3d]">
          <Link to="/catalog">Volver al Catálogo</Link>
        </Button>
      </div>
    );
  }

  return (
    <PageTransition className="min-h-screen bg-[#edf0f7] py-10 px-4 sm:px-6 lg:px-8 font-aeonik text-[#171a3d]">
      <div className="max-w-5xl mx-auto space-y-6">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="text-xs h-9 px-4 rounded-[1600px] border border-[#171a3d] bg-[#ffffff] hover:bg-[#edf0f7] text-[#171a3d] font-aeonik font-bold tracking-[0.032em] flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Volver</span>
        </button>

        {/* Profile Banner Card */}
        <div className="rounded-[24px] bg-[#ffffff] border border-[#171a3d] p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-[#171a3d]/20">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20 rounded-[1600px] border border-[#171a3d] bg-[#f4edf9]">
                <AvatarFallback className="text-2xl font-bold font-aeonik text-[#171a3d]">
                  {getInitials(profile.title || profile.name)}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#171a3d] leading-none">
                    {profile.title || profile.name}
                  </h1>
                  <span className="text-[10px] font-bold uppercase tracking-[0.032em] px-2.5 py-0.5 rounded-[1600px] bg-[#3da898] text-[#ffffff] border border-[#171a3d]">
                    {profile.role || 'Estudiante'}
                  </span>
                </div>
                <p className="text-xs text-[#171a3d]/70 font-medium flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-[#df4838]" />
                  <span>Campus {profile.sede || 'Cartagena'}</span>
                  <span>·</span>
                  <span>Miembro UDC</span>
                </p>
              </div>
            </div>

            {profile.cellphone && (
              <button
                type="button"
                onClick={handleWhatsAppContact}
                className="h-10 px-5 rounded-[1600px] border border-[#171a3d] bg-[#3da898] hover:bg-[#328e81] text-[#ffffff] text-xs font-bold tracking-[0.032em] flex items-center gap-2 transition-transform active:scale-95 shadow-sm"
              >
                <MessageCircle className="h-4 w-4 fill-current" />
                <span>Contactar por WhatsApp</span>
              </button>
            )}
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-[16px] border border-[#171a3d] p-3.5 bg-[#edf0f7] space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-[0.032em] text-[#171a3d]/60 block">
                Artículos
              </span>
              <span className="font-lateral text-3xl font-bold text-[#171a3d] leading-none">
                {profile.posts?.length || profile.postsCount || 0}
              </span>
            </div>
            <div className="rounded-[16px] border border-[#171a3d] p-3.5 bg-[#fdf8eb] space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-[0.032em] text-[#171a3d]/60 block">
                Calificación
              </span>
              <span className="font-lateral text-3xl font-bold text-[#f2b725] leading-none">
                {profile.ratingAvg && profile.ratingAvg > 0 ? profile.ratingAvg.toFixed(1) : '5.0'}★
              </span>
            </div>
            <div className="rounded-[16px] border border-[#171a3d] p-3.5 bg-[#f4edf9] space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-[0.032em] text-[#171a3d]/60 block">
                Reseñas
              </span>
              <span className="font-lateral text-3xl font-bold text-[#44216b] leading-none">
                {profile.ratingCount || profile.receivedValorations?.length || 0}
              </span>
            </div>
            <div className="rounded-[16px] border border-[#171a3d] p-3.5 bg-[#edf7f5] space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-[0.032em] text-[#171a3d]/60 block">
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
          <div className="flex items-center justify-between border-b border-[#171a3d]/20 pb-3">
            <h2 className="text-2xl font-lateral uppercase text-[#171a3d]">
              PUBLICACIONES DE {profile.title || profile.name}
            </h2>
            <span className="text-xs font-bold px-3 py-1 rounded-[1600px] bg-[#ffffff] border border-[#000000]">
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
            <div className="rounded-[20px] bg-[#ffffff] border border-[#000000] p-8 text-center text-xs font-medium text-[#000000]/70">
              Este estudiante no tiene artículos a la venta actualmente.
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};
