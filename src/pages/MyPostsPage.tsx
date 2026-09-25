import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import { PageTransition } from '@/components/common/PageTransition';
import { EditPostDialog } from '@/components/marketplace/EditPostDialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Post } from '@/types';
import { formatCOP, getBackendImageUrl, formatCampusName, getCategoryMeta } from '@/lib/utils';
import {
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  MapPin,
  Mail,
  Phone,
  ShieldCheck,
  Star,
  GraduationCap,
  Package,
  AlertTriangle,
  UserCog,
  MessageSquare,
} from 'lucide-react';
import { toast } from 'sonner';
import { EditProfileDialog } from '@/components/profile/EditProfileDialog';

export const MyPostsPage: React.FC = () => {
  const { user } = useAuth();
  const { getPostsByUser, deletePost } = useMarketplace();
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const myPosts = user?.id ? getPostsByUser(user.id) : [];
  const myValorations = myPosts.flatMap((p) => p.valorations || []);
  const myRatingCount = myValorations.length;
  const myRatingAvg = myRatingCount > 0
    ? myValorations.reduce((acc, v) => acc + (v.rating || 5), 0) / myRatingCount
    : 0;

  const handleDeleteConfirm = async () => {
    if (!postToDelete) return;
    setIsDeleting(true);
    const success = await deletePost(postToDelete.id);
    if (success) {
      toast.success('Publicación eliminada correctamente');
      setPostToDelete(null);
    }
    setIsDeleting(false);
  };

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const displayName = user?.title || user?.name || 'Estudiante UDC';
  const campusLabel = formatCampusName(user?.sede);

  return (
    <PageTransition className="min-h-screen bg-[#f1f3f6] dark:bg-[#0b0e1e] py-10 px-4 sm:px-6 lg:px-8 font-aeonik text-[#171a3d] dark:text-slate-100 transition-colors duration-200">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* ========================================================= */}
        {/* 1. USER PROFILE INFORMATION CARD (Prominently at the top) */}
        {/* ========================================================= */}
        <div className="rounded-3xl bg-white dark:bg-[#11162e] border border-slate-200/80 dark:border-white/10 shadow-elevation p-6 sm:p-8 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-white/10">
            {/* Avatar & Personal Identity */}
            <div className="flex items-center gap-4 sm:gap-5">
              <Avatar className="h-20 w-20 sm:h-24 sm:w-24 rounded-full border-2 border-[#ec8026]/30 shadow-md bg-[#fdf3eb] dark:bg-orange-950/40 shrink-0">
                {user?.picture && (
                  <AvatarImage
                    src={getBackendImageUrl(user.picture)}
                    alt={displayName}
                    className="object-cover"
                  />
                )}
                <AvatarFallback className="bg-[#171a3d] dark:bg-[#ec8026] text-white font-bold font-aeonik text-2xl sm:text-3xl">
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
                    <span>{user?.role || 'Estudiante UDC'}</span>
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-[#ec8026]" />
                    <span>Campus {campusLabel}</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-[#44216b] dark:text-purple-400">
                    <GraduationCap className="h-3.5 w-3.5" />
                    <span>Miembro UDC</span>
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-xs text-slate-600 dark:text-slate-300">
                  {user?.mail && (
                    <span className="flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
                      <span className="font-medium truncate">{user.mail}</span>
                    </span>
                  )}
                  {user?.cellphone && (
                    <span className="flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5 text-[#3da898]" />
                      <span className="font-medium">{user.cellphone}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Profile Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
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

              {user?.id && (
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="h-10 px-4 rounded-full border border-slate-200 dark:border-white/15 bg-slate-100 dark:bg-[#161b38] hover:bg-slate-200 dark:hover:bg-white/10 text-[#171a3d] dark:text-white font-aeonik font-bold text-xs shadow-2xs transition-all"
                >
                  <Link to={`/user/${user.id}`}>
                    <span>Ver Perfil Público</span>
                    <ExternalLink className="h-3.5 w-3.5 ml-1.5 text-slate-400" />
                  </Link>
                </Button>
              )}

              <Button
                asChild
                size="sm"
                variant="udc"
                className="h-10 px-5 rounded-full font-aeonik font-bold text-xs tracking-wider transition-all shadow-md shadow-[#ec8026]/20 active:scale-95"
              >
                <Link to="/catalog?create=true">
                  <Plus className="h-4 w-4 mr-1.5 stroke-[3]" />
                  <span>Publicar Nuevo Artículo</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Key Profile Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="rounded-2xl p-4 bg-slate-50 dark:bg-[#161b38] border border-slate-100 dark:border-white/10 space-y-1 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                Publicaciones Activas
              </span>
              <span className="font-aeonik text-3xl font-black text-[#171a3d] dark:text-white leading-none block">
                {myPosts.length}
              </span>
            </div>

            <div className="rounded-2xl p-4 bg-[#fdf8eb]/80 dark:bg-amber-950/40 border border-amber-200/50 dark:border-amber-800/30 space-y-1 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                Calificación
              </span>
              {myRatingCount > 0 ? (
                <div className="flex items-center gap-1">
                  <span className="font-aeonik text-3xl font-black text-[#d97706] dark:text-amber-400 leading-none">
                    {myRatingAvg.toFixed(1)}
                  </span>
                  <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                </div>
              ) : (
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="text-xs font-bold text-slate-400 dark:text-slate-500">
                    Sin valoraciones
                  </span>
                </div>
              )}
            </div>

            <div className="rounded-2xl p-4 bg-[#f4edf9]/80 dark:bg-purple-950/40 border border-purple-200/50 dark:border-purple-800/30 space-y-1 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                Reseñas Recibidas
              </span>
              <div className="flex items-center gap-1.5">
                <span className="font-aeonik text-3xl font-black text-[#44216b] dark:text-purple-300 leading-none">
                  {myRatingCount}
                </span>
                <MessageSquare className="h-4 w-4 text-[#44216b] dark:text-purple-300" />
              </div>
            </div>

            <div className="rounded-2xl p-4 bg-[#edf7f5]/80 dark:bg-teal-950/40 border border-teal-200/50 dark:border-teal-800/30 space-y-1 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                Campus Principal
              </span>
              <span className="text-xs font-bold text-[#0f766e] dark:text-teal-300 block truncate mt-1">
                {campusLabel}
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. MIS PUBLICACIONES SECTION (Directly below Profile Info) */}
        {/* ========================================================= */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-2">
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#171a3d] dark:text-white">
                  Mis Artículos Publicados
                </h2>
                <span className="text-xs font-bold px-3.5 py-1.5 rounded-full bg-white dark:bg-[#11162e] border border-slate-200/80 dark:border-white/10 shadow-2xs text-slate-700 dark:text-slate-300">
                  {myPosts.length} {myPosts.length === 1 ? 'aviso' : 'avisos'}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-normal mt-0.5">
                Administra, edita el precio o retira tus publicaciones activas en la Universidad de Cartagena
              </p>
            </div>

            <Button
              asChild
              size="sm"
              variant="navy"
              className="h-9 px-4 rounded-full font-aeonik font-bold text-xs tracking-wider shadow-elevation dark:bg-white dark:text-[#0b0e1e] dark:hover:bg-slate-100"
            >
              <Link to="/catalog?create=true">
                <Plus className="h-3.5 w-3.5 mr-1" />
                <span>Nuevo Aviso</span>
              </Link>
            </Button>
          </div>

          {/* List of Posts */}
          {myPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myPosts.map((post: Post) => {
                const images = post.imagenes || (post.postIMGs?.map((img) => img.imageURL) || []);
                const mainImage = images.length > 0 ? getBackendImageUrl(images[0]) : getBackendImageUrl('');

                return (
                  <div
                    key={post.id}
                    className="rounded-3xl bg-white dark:bg-[#11162e] border border-slate-200/80 dark:border-white/10 shadow-elevation hover:shadow-lifted overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5"
                  >
                    <div className="p-4 space-y-3">
                      {/* Image Canvas with Aspect Protection */}
                      <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 shadow-inner">
                        <img
                          src={mainImage}
                          alt={post.nombre}
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80';
                          }}
                        />
                        <div className="absolute top-2.5 left-2.5">
                          <span className="inline-flex items-center gap-1 bg-white/90 dark:bg-[#0b0e1e]/90 backdrop-blur-md text-[#171a3d] dark:text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm border border-slate-200/50 dark:border-white/10">
                            <MapPin className="h-3 w-3 text-[#ec8026]" />
                            {post.sede}
                          </span>
                        </div>
                        <div className="absolute top-2.5 right-2.5">
                          {(() => {
                            const categoryMeta = getCategoryMeta(post.tipoP);
                            return (
                              <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-2xs border backdrop-blur-xs ${categoryMeta.badgeLight} ${categoryMeta.badgeDark}`}>
                                {post.tipoP}
                              </span>
                            );
                          })()}
                        </div>
                      </div>

                      {/* Content details */}
                      <div className="space-y-1.5 px-0.5">
                        <h3 className="font-extrabold text-base text-[#0f172a] dark:text-white leading-snug line-clamp-1">
                          {post.nombre}
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400 font-medium line-clamp-2 leading-relaxed">
                          {post.desc}
                        </p>
                        <div className="pt-1">
                          <span className="text-lg sm:text-xl font-black text-[#0f172a] dark:text-white tracking-tight">
                            {formatCOP(post.price)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions Strip */}
                    <div className="p-3.5 border-t border-slate-100 dark:border-white/10 flex items-center justify-between gap-2 bg-slate-50/50 dark:bg-[#161b38]/50">
                      <Link
                        to={`/post/${post.id}`}
                        className="h-8 px-3.5 rounded-full bg-white dark:bg-[#11162e] hover:bg-slate-100 dark:hover:bg-white/10 text-xs font-bold text-[#171a3d] dark:text-white flex items-center gap-1.5 shadow-2xs border border-slate-200 dark:border-white/10 transition-colors"
                      >
                        <ExternalLink className="h-3 w-3 text-slate-400" />
                        <span>Ver</span>
                      </Link>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setEditingPost(post)}
                          className="h-8 px-3.5 rounded-full bg-white dark:bg-[#11162e] hover:bg-[#edf7f5] dark:hover:bg-teal-950/40 text-xs font-bold text-[#3da898] dark:text-teal-300 flex items-center gap-1 shadow-2xs border border-slate-200 dark:border-white/10 transition-colors"
                        >
                          <Edit2 className="h-3 w-3 text-[#3da898]" />
                          <span>Editar</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setPostToDelete(post)}
                          title="Eliminar publicación"
                          className="h-8 w-8 rounded-full bg-white dark:bg-[#11162e] hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-500 flex items-center justify-center shadow-2xs border border-slate-200 dark:border-white/10 transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-3xl bg-white dark:bg-[#11162e] border border-slate-200/80 dark:border-white/10 shadow-elevation p-12 text-center space-y-4">
              <div className="h-16 w-16 rounded-2xl bg-slate-50 dark:bg-[#161b38] flex items-center justify-center mx-auto text-[#ec8026] shadow-inner">
                <Package className="h-7 w-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold uppercase tracking-tight text-[#171a3d] dark:text-white">
                  No tienes artículos publicados todavía
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-normal max-w-sm mx-auto leading-relaxed">
                  Publica calculadoras, batas de laboratorio, libros o fotocopias para tus compañeros de facultad de la Universidad de Cartagena.
                </p>
              </div>
              <Button
                asChild
                variant="udc"
                className="h-10 px-6 rounded-full font-aeonik font-bold text-xs tracking-wider shadow-md shadow-[#ec8026]/20"
              >
                <Link to="/catalog?create=true">
                  <Plus className="h-4 w-4 mr-1.5 stroke-[3]" />
                  <span>Publicar Primer Artículo</span>
                </Link>
              </Button>
            </div>
          )}
        </div>

        {/* Edit Dialog */}
        {editingPost && (
          <EditPostDialog
            post={editingPost}
            open={!!editingPost}
            onOpenChange={(open) => !open && setEditingPost(null)}
          />
        )}

        {/* Delete Confirm Dialog */}
        <Dialog open={!!postToDelete} onOpenChange={(open) => !open && setPostToDelete(null)}>
          <DialogContent className="rounded-3xl bg-white dark:bg-[#11162e] border border-slate-200 dark:border-white/15 font-aeonik p-6 max-w-sm text-[#171a3d] dark:text-white shadow-2xl">
            <DialogHeader className="space-y-2 text-left">
              <div className="h-12 w-12 rounded-2xl bg-rose-50 dark:bg-rose-950/40 flex items-center justify-center text-rose-500 shadow-inner">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <DialogTitle className="text-xl font-bold uppercase tracking-tight text-[#171a3d] dark:text-white">
                ¿Eliminar este artículo?
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500 dark:text-slate-400 font-normal leading-relaxed">
                Esta acción retirará la publicación "{postToDelete?.nombre}" de forma permanente del catálogo universitario.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="pt-4 flex items-center justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPostToDelete(null)}
                className="h-9 px-4 rounded-full border border-slate-200 dark:border-white/15 bg-slate-100 dark:bg-[#161b38] text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-white/10"
              >
                Cancelar
              </Button>
              <Button
                size="sm"
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="h-9 px-4 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold shadow-md shadow-rose-500/20"
              >
                {isDeleting ? 'Eliminando...' : 'Sí, Eliminar'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Profile Dialog */}
        <EditProfileDialog
          open={editProfileOpen}
          onOpenChange={setEditProfileOpen}
        />
      </div>
    </PageTransition>
  );
};
