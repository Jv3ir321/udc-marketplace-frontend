import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { PageTransition } from '@/components/common/PageTransition';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserProfile, Post } from '@/types';
import { formatCampusName } from '@/lib/utils';
import WhatsappIcon from '@/components/ui/whatsapp-icon';
import {
  ArrowLeft,
  MapPin,
  ShieldCheck,
  Star,
  MessageSquare,
  GraduationCap,
  Plus,
  PackageCheck,
  UserCog,
} from 'lucide-react';
import { api } from '@/services/api';
import { EditProfileDialog } from '@/components/profile/EditProfileDialog';

export const UserProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user: currentUser } = useAuth();
  const { getPostsByUser } = useMarketplace();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const response = await api.get(`/user/${id}`);
        setProfile(response.data);
      } catch {
        const localPosts = getPostsByUser(Number(id));
        if (localPosts.length > 0 && localPosts[0].user) {
          setProfile({
            ...localPosts[0].user,
            id: Number(id),
            posts: localPosts,
            postsCount: localPosts.length,
          });
        } else if (currentUser && currentUser.id === Number(id)) {
          setProfile({
            ...currentUser,
            posts: getPostsByUser(currentUser.id),
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [id, currentUser, getPostsByUser]);

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const isOwnProfile = currentUser && Number(id) === currentUser.id;

  if (isLoading) {
    return (
      <PageTransition className="min-h-screen bg-[#f1f3f6] dark:bg-[#0b0e1e] py-12 px-4 sm:px-8 font-aeonik">
        <div className="max-w-5xl mx-auto space-y-6 animate-pulse">
          <div className="h-48 rounded-3xl bg-slate-200 dark:bg-slate-800" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="h-64 rounded-3xl bg-slate-200 dark:bg-slate-800" />
            <div className="h-64 rounded-3xl bg-slate-200 dark:bg-slate-800" />
            <div className="h-64 rounded-3xl bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>
      </PageTransition>
    );
  }

  if (!profile) {
    return (
      <PageTransition className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4 font-aeonik text-[#171a3d] dark:text-white">
        <h2 className="text-3xl font-black uppercase">Estudiante no encontrado</h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          El perfil universitario consultado no existe o no tiene publicaciones activas.
        </p>
        <Button asChild variant="navy" className="rounded-full px-6 text-xs font-bold shadow-xs">
          <Link to="/catalog">
            <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
            Volver al Catálogo
          </Link>
        </Button>
      </PageTransition>
    );
  }

  const displayName = profile.title || profile.name || 'Estudiante UDC';
  const campusLabel = formatCampusName(profile.sede);

  const handleWhatsAppContact = () => {
    if (!profile.cellphone) return;
    const url = `https://wa.me/57${profile.cellphone.replace(/\D/g, '')}?text=${encodeURIComponent(
      `Hola ${displayName}! Vi tus publicaciones en UDC Marketplace. ¿Podemos acordar entrega en ${campusLabel}?`
    )}`;
    window.open(url, '_blank');
  };

  return (
    <PageTransition className="min-h-screen bg-[#f1f3f6] dark:bg-[#0b0e1e] py-8 px-4 sm:px-8 font-aeonik text-[#171a3d] dark:text-slate-100 transition-colors duration-200">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Top Strip */}
        <div className="flex items-center justify-between pb-2">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="text-xs h-9 px-4 rounded-full bg-white dark:bg-[#11162e] shadow-elevation border border-slate-200/80 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 text-[#171a3d] dark:text-white font-aeonik font-bold flex items-center gap-1.5 transition-all"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Volver</span>
          </button>

          {isOwnProfile && (
            <Button
              asChild
              size="sm"
              variant="udc"
              className="h-9 px-4 rounded-full font-bold text-xs shadow-md shadow-[#ec8026]/20"
            >
              <Link to="/my-posts">
                <PackageCheck className="h-3.5 w-3.5 mr-1.5" />
                <span>Mis Publicaciones</span>
              </Link>
            </Button>
          )}
        </div>

        {/* Profile Banner Card */}
        <div className="rounded-3xl bg-white dark:bg-[#11162e] p-6 sm:p-8 space-y-6 border border-slate-200/80 dark:border-white/10 shadow-elevation">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-white/10">
            <div className="flex items-center gap-4 sm:gap-5">
              <Avatar className="h-20 w-20 sm:h-24 sm:w-24 rounded-full border-2 border-[#ec8026]/30 shadow-md bg-[#f4edf9] dark:bg-purple-950/40 shrink-0">
                {profile.picture && (
                  <AvatarImage
                    src={
                      profile.picture.startsWith('http') || profile.picture.startsWith('blob:')
                        ? profile.picture
                        : `${import.meta.env.VITE_API_URL || 'http://localhost:4000'}${profile.picture}`
                    }
                    alt={displayName}
                    className="object-cover"
                  />
                )}
                <AvatarFallback className="text-2xl sm:text-3xl font-bold font-aeonik text-white bg-[#171a3d] dark:bg-[#ec8026]">
                  {getInitials(displayName)}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-1.5 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171a3d] dark:text-white leading-none tracking-tight">
                    {displayName}
                  </h1>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#edf7f5] dark:bg-teal-950/40 text-[#3da898] dark:text-teal-300 shadow-2xs border border-teal-200/40 dark:border-teal-800/30">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>{profile.role || 'Estudiante UDC'}</span>
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-[#ec8026]" />
                  <span>Campus {campusLabel}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-[#44216b] dark:text-purple-400">
                    <GraduationCap className="h-3.5 w-3.5" />
                    <span>Miembro UDC</span>
                  </span>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
              {isOwnProfile ? (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setEditProfileOpen(true)}
                    className="h-10 px-4 rounded-full border border-slate-200 dark:border-white/15 bg-white dark:bg-[#161b38] hover:bg-slate-50 dark:hover:bg-white/10 text-[#171a3d] dark:text-white font-aeonik font-bold text-xs shadow-2xs transition-all flex items-center gap-1.5"
                  >
                    <UserCog className="h-3.5 w-3.5 text-[#ec8026]" />
                    <span>Editar Perfil</span>
                  </Button>

                  <Button
                    asChild
                    size="sm"
                    variant="udc"
                    className="h-10 px-5 rounded-full font-bold text-xs shadow-md shadow-[#ec8026]/20"
                  >
                    <Link to="/catalog?create=true">
                      <Plus className="h-4 w-4 mr-1.5 stroke-[3]" />
                      <span>Publicar Artículo</span>
                    </Link>
                  </Button>
                </>
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
            <div className="rounded-2xl p-4 bg-slate-50 dark:bg-[#161b38] border border-slate-100 dark:border-white/10 space-y-1 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                Artículos Activos
              </span>
              <span className="font-aeonik text-3xl font-black text-[#171a3d] dark:text-white leading-none block">
                {profile.posts?.length || profile.postsCount || 0}
              </span>
            </div>
            <div className="rounded-2xl p-4 bg-[#fdf8eb]/80 dark:bg-amber-950/40 border border-amber-200/50 dark:border-amber-800/30 space-y-1 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                Calificación
              </span>
              <div className="flex items-center gap-1">
                <span className="font-aeonik text-3xl font-black text-[#d97706] dark:text-amber-400 leading-none">
                  {profile.ratingAvg && profile.ratingAvg > 0 ? profile.ratingAvg.toFixed(1) : '5.0'}
                </span>
                <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
              </div>
            </div>
            <div className="rounded-2xl p-4 bg-[#f4edf9]/80 dark:bg-purple-950/40 border border-purple-200/50 dark:border-purple-800/30 space-y-1 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                Reseñas
              </span>
              <div className="flex items-center gap-1">
                <span className="font-aeonik text-3xl font-black text-[#44216b] dark:text-purple-300 leading-none">
                  {profile.ratingCount || profile.receivedValorations?.length || 0}
                </span>
                <MessageSquare className="h-4 w-4 text-[#44216b] dark:text-purple-300" />
              </div>
            </div>
            <div className="rounded-2xl p-4 bg-[#edf7f5]/80 dark:bg-teal-950/40 border border-teal-200/50 dark:border-teal-800/30 space-y-1 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                Estado
              </span>
              <span className="text-xs font-bold text-[#3da898] dark:text-teal-300 block mt-1">
                Verificado UDC
              </span>
            </div>
          </div>
        </div>

        {/* User's Posts Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2">
            <h2 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-[#171a3d] dark:text-white">
              Publicaciones de {displayName}
            </h2>
            <span className="text-xs font-bold px-3.5 py-1.5 rounded-full bg-white dark:bg-[#11162e] border border-slate-200/80 dark:border-white/10 shadow-2xs text-slate-700 dark:text-slate-300">
              {profile.posts?.length || 0} avisos activos
            </span>
          </div>

          {profile.posts && profile.posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {profile.posts.map((post: Post) => (
                <ProductCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl bg-white dark:bg-[#11162e] border border-slate-200/80 dark:border-white/10 p-10 text-center text-xs font-normal text-slate-500 dark:text-slate-400 shadow-elevation">
              Este estudiante no tiene artículos a la venta actualmente.
            </div>
          )}
        </div>

        {/* Edit Profile Dialog */}
        <EditProfileDialog
          open={editProfileOpen}
          onOpenChange={setEditProfileOpen}
        />
      </div>
    </PageTransition>
  );
};
