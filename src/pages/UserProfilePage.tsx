import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PublicUserProfile } from '@/types';
import { userService } from '@/services/userService';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { PageTransition } from '@/components/common/PageTransition';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import {
  MapPin,
  Mail,
  Phone,
  Calendar,
  Star,
  Package,
  MessageSquare,
  ShieldCheck,
  ArrowLeft,
  GraduationCap,
  MessageCircle,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

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
    if (!name) return 'UD';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const handleWhatsAppContact = () => {
    if (!profile?.cellphone) return;
    const cleanNumber = profile.cellphone.replace(/\D/g, '');
    const fullNumber = cleanNumber.startsWith('57') ? cleanNumber : `57${cleanNumber}`;
    const text = encodeURIComponent(
      `¡Hola ${profile.title || profile.name}! Vi tu perfil en el Marketplace de la Universidad de Cartagena.`
    );
    window.open(`https://wa.me/${fullNumber}?text=${text}`, '_blank');
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <Skeleton className="h-48 w-full rounded-3xl" />
        <div className="flex gap-6 items-center">
          <Skeleton className="h-24 w-24 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <PageTransition className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-black text-foreground">Usuario no encontrado</h2>
        <p className="text-sm text-muted-foreground">
          El estudiante o vendedor que buscas no existe o ha sido desactivado.
        </p>
        <Button asChild variant="udc" className="rounded-full">
          <Link to="/catalog">Volver al Catálogo</Link>
        </Button>
      </PageTransition>
    );
  }

  return (
    <PageTransition className="min-h-screen bg-stone-50/50 pb-16">
      {/* Top Navigation Breadcrumb */}
      <div className="bg-white border-b border-border/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <Link
            to="/catalog"
            className="inline-flex items-center text-xs font-semibold text-stone-600 hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
            Explorar todas las publicaciones
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 sm:space-y-10">
        {/* Profile Card Header */}
        <div className="bg-white rounded-3xl border border-orange-200/70 shadow-xl shadow-stone-900/10 overflow-hidden">
          {/* Header Banner */}
          <div className="h-36 sm:h-52 bg-gradient-to-r from-stone-900 via-orange-950 to-orange-900 relative p-5 sm:p-8 flex items-end">
            <div className="absolute top-4 sm:top-6 right-4 sm:right-6 flex items-center gap-1.5 bg-black/40 backdrop-blur-md border border-white/20 text-white text-[11px] sm:text-xs px-3.5 py-1.5 rounded-full font-semibold">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Estudiante Verificado UDC</span>
            </div>
          </div>

          {/* User Info Bar */}
          <div className="px-6 sm:px-10 lg:px-12 pb-8 sm:pb-10 pt-2 sm:pt-3 relative">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5 sm:gap-6">
                <Avatar className="-mt-14 sm:-mt-20 md:-mt-24 h-28 w-28 sm:h-36 sm:w-36 border-4 border-white shadow-xl ring-2 ring-orange-500/20 bg-orange-100 shrink-0 z-10">
                  <AvatarFallback className="bg-gradient-to-br from-orange-500 to-amber-600 text-white font-black text-2xl sm:text-4xl">
                    {getInitials(profile.title || profile.name)}
                  </AvatarFallback>
                </Avatar>

                <div className="space-y-2 pt-2 sm:pt-0 sm:pb-2">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 tracking-tight">
                    {profile.title || profile.name}
                  </h1>

                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground pt-0.5">
                    <Badge variant="udc" className="rounded-full px-3 py-1 text-[11px] font-semibold">
                      <GraduationCap className="h-3.5 w-3.5 mr-1" />
                      {profile.role || 'Estudiante'}
                    </Badge>
                    <Badge variant="secondary" className="bg-orange-50 text-orange-800 border-orange-200 px-3 py-1 text-[11px] font-semibold">
                      <MapPin className="h-3.5 w-3.5 mr-1 text-orange-600" />
                      Campus {profile.sede || 'Zaragocilla'}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 w-full sm:w-auto pt-2 sm:pt-0">
                <Button
                  onClick={handleWhatsAppContact}
                  className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl px-6 py-2.5 text-xs sm:text-sm shadow-md shadow-emerald-600/20"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat WhatsApp
                </Button>
                <Button asChild variant="outline" className="rounded-2xl border-orange-200 hover:bg-orange-50 px-5 py-2.5 text-xs sm:text-sm shadow-2xs font-semibold">
                  <a href={`mailto:${profile.mail}`}>
                    <Mail className="h-4 w-4 mr-1.5 text-orange-600" />
                    Correo
                  </a>
                </Button>
              </div>
            </div>

            {/* Profile Metrics & Details Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 pt-8 sm:pt-10 mt-8 sm:mt-10 border-t border-stone-100 text-center">
              <div className="bg-orange-50/50 rounded-2xl p-4 sm:p-5 border border-orange-100/60 shadow-2xs">
                <div className="text-xl sm:text-2xl font-black text-orange-600 flex items-center justify-center gap-1.5">
                  <Package className="h-5 w-5 text-orange-500" />
                  {profile.postsCount}
                </div>
                <p className="text-[10px] sm:text-[11px] font-bold text-stone-600 uppercase tracking-wider mt-1">
                  Publicaciones
                </p>
              </div>

              <div className="bg-amber-50/50 rounded-2xl p-4 sm:p-5 border border-amber-100/60 shadow-2xs">
                <div className="text-xl sm:text-2xl font-black text-amber-600 flex items-center justify-center gap-1.5">
                  <Star className="h-5 w-5 fill-amber-400 text-amber-500" />
                  {profile.ratingAvg.toFixed(1)}
                </div>
                <p className="text-[10px] sm:text-[11px] font-bold text-stone-600 uppercase tracking-wider mt-1">
                  Calificación ({profile.ratingCount})
                </p>
              </div>

              <div className="bg-stone-50 rounded-2xl p-4 sm:p-5 border border-stone-200/60 shadow-2xs">
                <div className="text-xs sm:text-sm font-bold text-stone-800 flex items-center justify-center gap-1.5 h-7 sm:h-8 truncate">
                  <Phone className="h-4 w-4 text-primary shrink-0" />
                  <span className="truncate">{profile.cellphone || 'Verificado'}</span>
                </div>
                <p className="text-[10px] sm:text-[11px] font-bold text-stone-600 uppercase tracking-wider mt-1">
                  Contacto Directo
                </p>
              </div>

              <div className="bg-stone-50 rounded-2xl p-4 sm:p-5 border border-stone-200/60 shadow-2xs">
                <div className="text-xs font-bold text-stone-800 flex items-center justify-center gap-1.5 h-7 sm:h-8">
                  <Calendar className="h-4 w-4 text-orange-600" />
                  <span>{formatDate(profile.created_at || new Date().toISOString())}</span>
                </div>
                <p className="text-[10px] sm:text-[11px] font-bold text-stone-600 uppercase tracking-wider mt-1">
                  Miembro Desde
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs: Publications & Reviews */}
        <Tabs defaultValue="posts" className="space-y-6">
          <TabsList className="bg-white p-1.5 rounded-2xl border border-stone-200 shadow-2xs w-full sm:w-auto flex">
            <TabsTrigger value="posts" className="rounded-xl px-4 sm:px-6 font-bold text-xs flex-1 sm:flex-none">
              <Package className="h-3.5 w-3.5 mr-1.5" />
              Publicaciones ({profile.posts.length})
            </TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-xl px-4 sm:px-6 font-bold text-xs flex-1 sm:flex-none">
              <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
              Opiniones ({profile.receivedValorations.length})
            </TabsTrigger>
          </TabsList>

          {/* Tab 1: Posts */}
          <TabsContent value="posts" className="space-y-6">
            {profile.posts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {profile.posts.map((post) => (
                  <ProductCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-12 text-center space-y-3">
                <Package className="h-10 w-10 text-stone-300 mx-auto" />
                <h3 className="text-sm sm:text-base font-bold text-stone-800">
                  Sin publicaciones activas por el momento
                </h3>
                <p className="text-xs text-muted-foreground">
                  Este usuario no tiene artículos a la venta actualmente.
                </p>
              </div>
            )}
          </TabsContent>

          {/* Tab 2: Reviews */}
          <TabsContent value="reviews" className="space-y-4">
            {profile.receivedValorations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profile.receivedValorations.map((val, idx) => (
                  <div
                    key={val.id || idx}
                    className="bg-white rounded-2xl border border-orange-100 p-4 sm:p-5 space-y-3 shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Avatar className="h-8 w-8 border border-orange-200">
                          <AvatarFallback className="bg-orange-100 text-orange-800 text-xs font-bold">
                            {getInitials(val.user?.title || val.user?.name || 'Estudiante')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="text-xs font-bold text-stone-900">
                            {val.user?.title || val.user?.name || 'Comprador Verificado'}
                          </h4>
                          <p className="text-[10px] text-muted-foreground">
                            {val.user?.sede ? `Campus ${val.user.sede}` : 'Comunidad UDC'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center text-amber-500">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className="h-3 w-3 fill-amber-400" />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-stone-700 leading-relaxed bg-orange-50/30 p-3 rounded-xl border border-orange-100/40">
                      "{val.valoration}"
                    </p>

                    {val.created_at && (
                      <p className="text-[10px] text-muted-foreground text-right">
                        {formatDate(val.created_at)}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-12 text-center space-y-3">
                <MessageSquare className="h-10 w-10 text-stone-300 mx-auto" />
                <h3 className="text-sm sm:text-base font-bold text-stone-800">
                  Aún no tiene opiniones registradas
                </h3>
                <p className="text-xs text-muted-foreground">
                  Sé el primero en valorar un artículo adquirido de este vendedor.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};
