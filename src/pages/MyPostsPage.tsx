import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMarketplace } from '@/context/MarketplaceContext';
import { useAuth } from '@/context/AuthContext';
import { Post } from '@/types';
import { EditPostDialog } from '@/components/marketplace/EditPostDialog';
import { PageTransition } from '@/components/common/PageTransition';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { formatCOP, getBackendImageUrl, formatCampusName } from '@/lib/utils';
import {
  Package,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  MapPin,
  AlertTriangle,
  Mail,
  Phone,
  GraduationCap,
  ShieldCheck,
  Star,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export const MyPostsPage: React.FC = () => {
  const { posts, deletePost } = useMarketplace();
  const { user } = useAuth();

  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Filter posts belonging to the logged in user or matching userId/mail
  const myPosts = posts.filter(
    (p) =>
      p.userId === user?.id ||
      p.user?.mail === user?.mail ||
      p.user?.id === user?.id
  );

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const handleDeleteConfirm = async () => {
    if (!postToDelete) return;
    setIsDeleting(true);
    await deletePost(postToDelete.id);
    setIsDeleting(false);
    setPostToDelete(null);
  };

  const displayName = user?.title || user?.name || 'Estudiante UDC';
  const campusLabel = formatCampusName(user?.sede || 'Zaragocilla');

  return (
    <PageTransition className="min-h-screen bg-[#faf8f5] py-10 px-4 sm:px-6 lg:px-8 font-aeonik text-[#171a3d]">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* ========================================================= */}
        {/* 1. USER PROFILE INFORMATION CARD (Prominently at the top) */}
        {/* ========================================================= */}
        <div className="rounded-3xl bg-white shadow-[0_16px_40px_rgba(23,26,61,0.11),0_4px_12px_rgba(23,26,61,0.06)] ring-1 ring-black/[0.04] p-6 sm:p-8 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            {/* Avatar & Personal Identity */}
            <div className="flex items-center gap-4 sm:gap-5">
              <Avatar className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-[#fdf3eb] shadow-inner shrink-0">
                <AvatarFallback className="bg-[#171a3d] text-white font-bold font-aeonik text-2xl sm:text-3xl">
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
                    <span>{user?.role || 'Estudiante UDC'}</span>
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-[#ec8026]" />
                    <span>Campus {campusLabel}</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-[#44216b]">
                    <GraduationCap className="h-3.5 w-3.5" />
                    <span>Cód. {user?.codEst || 'Estudiante'}</span>
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-xs text-slate-600">
                  {user?.mail && (
                    <span className="flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5 text-slate-400" />
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
              {user?.id && (
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="h-10 px-4 rounded-full border-0 bg-slate-100 hover:bg-slate-200 text-[#171a3d] font-aeonik font-bold text-xs shadow-md shadow-slate-900/5 transition-all"
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
                className="h-10 px-5 rounded-full bg-[#ec8026] hover:bg-[#d97018] text-white font-aeonik font-bold text-xs tracking-[0.02em] transition-all shadow-md shadow-[#ec8026]/20 active:scale-95"
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
            <div className="rounded-2xl p-4 bg-slate-50 space-y-1 shadow-sm shadow-slate-900/5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Publicaciones Activas
              </span>
              <span className="font-aeonik text-3xl font-black text-[#171a3d] leading-none block">
                {myPosts.length}
              </span>
            </div>

            <div className="rounded-2xl p-4 bg-[#fdf8eb]/80 space-y-1 shadow-sm shadow-amber-900/5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Calificación
              </span>
              <div className="flex items-center gap-1">
                <span className="font-aeonik text-3xl font-black text-[#d97706] leading-none">
                  5.0
                </span>
                <Star className="h-5 w-5 text-[#f59e0b] fill-[#f59e0b]" />
              </div>
            </div>

            <div className="rounded-2xl p-4 bg-[#f4edf9]/80 space-y-1 shadow-sm shadow-purple-900/5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Intercambios UDC
              </span>
              <span className="font-aeonik text-3xl font-black text-[#44216b] leading-none block">
                {myPosts.length > 0 ? myPosts.length : 1}
              </span>
            </div>

            <div className="rounded-2xl p-4 bg-[#edf7f5]/80 space-y-1 shadow-sm shadow-teal-900/5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Estado Cuenta
              </span>
              <span className="text-xs font-bold text-[#3da898] block mt-1">
                Verificado Activo
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
                <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#171a3d]">
                  Mis Artículos Publicados
                </h2>
                <span className="text-xs font-bold px-3.5 py-1.5 rounded-full bg-white shadow-[0_2px_8px_rgba(23,26,61,0.04)] text-slate-700">
                  {myPosts.length} {myPosts.length === 1 ? 'aviso' : 'avisos'}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-normal mt-0.5">
                Administra, edita el precio o retira tus publicaciones activas en la Universidad de Cartagena
              </p>
            </div>

            <Button
              asChild
              size="sm"
              className="h-9 px-4 rounded-full bg-[#171a3d] hover:bg-[#252a5c] text-white font-aeonik font-bold text-xs tracking-[0.02em] shadow-md shadow-[#171a3d]/15"
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
              {myPosts.map((post) => {
                const images = post.imagenes || (post.postIMGs?.map((img) => img.imageURL) || []);
                const mainImage = images.length > 0 ? getBackendImageUrl(images[0]) : getBackendImageUrl('');

                return (
                  <div
                    key={post.id}
                    className="rounded-3xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgba(23,26,61,0.12)] ring-1 ring-black/[0.04] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5"
                  >
                    <div className="p-4 space-y-3">
                      {/* Image Canvas with Aspect Protection */}
                      <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-100">
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
                          <span className="inline-flex items-center gap-1 bg-white/90 backdrop-blur-md text-[#171a3d] text-[10px] font-bold px-3 py-1 rounded-full shadow-sm">
                            <MapPin className="h-3 w-3 text-[#ec8026]" />
                            {post.sede}
                          </span>
                        </div>
                        <div className="absolute top-2.5 right-2.5">
                          <span className="bg-[#ec8026]/10 text-[#ec8026] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                            {post.tipoP}
                          </span>
                        </div>
                      </div>

                      {/* Content details */}
                      <div className="space-y-1.5 px-0.5">
                        <h3 className="font-extrabold text-base text-[#171a3d] leading-snug line-clamp-1">
                          {post.nombre}
                        </h3>
                        <p className="text-xs text-slate-500 font-normal line-clamp-2 leading-relaxed">
                          {post.desc}
                        </p>
                        <div className="pt-1">
                          <span className="text-lg sm:text-xl font-black text-[#171a3d] tracking-tight">
                            {formatCOP(post.price)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions Strip */}
                    <div className="p-3.5 border-t border-slate-100 flex items-center justify-between gap-2 bg-slate-50/50">
                      <Link
                        to={`/post/${post.id}`}
                        className="h-8 px-3.5 rounded-full bg-white hover:bg-slate-100 text-xs font-bold text-[#171a3d] flex items-center gap-1.5 shadow-sm transition-colors"
                      >
                        <ExternalLink className="h-3 w-3 text-slate-400" />
                        <span>Ver</span>
                      </Link>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setEditingPost(post)}
                          className="h-8 px-3.5 rounded-full bg-white hover:bg-[#edf7f5] text-xs font-bold text-[#3da898] flex items-center gap-1 shadow-sm transition-colors"
                        >
                          <Edit2 className="h-3 w-3 text-[#3da898]" />
                          <span>Editar</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setPostToDelete(post)}
                          title="Eliminar publicación"
                          className="h-8 w-8 rounded-full bg-white hover:bg-rose-50 text-rose-500 flex items-center justify-center shadow-sm transition-colors"
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
            <div className="rounded-3xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] ring-1 ring-black/[0.04] p-12 text-center space-y-4">
              <div className="h-16 w-16 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto text-[#ec8026] shadow-inner">
                <Package className="h-7 w-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold uppercase tracking-tight text-[#171a3d]">
                  No tienes artículos publicados todavía
                </h3>
                <p className="text-xs text-slate-500 font-normal max-w-sm mx-auto leading-relaxed">
                  Publica calculadoras, batas de laboratorio, libros o fotocopias para tus compañeros de facultad de la Universidad de Cartagena.
                </p>
              </div>
              <Button
                asChild
                className="h-10 px-6 rounded-full bg-[#ec8026] hover:bg-[#d97018] text-white font-aeonik font-bold text-xs tracking-[0.02em] shadow-md shadow-[#ec8026]/20"
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
          <DialogContent className="rounded-3xl bg-white border-0 font-aeonik p-6 max-w-sm text-[#171a3d] shadow-2xl">
            <DialogHeader className="space-y-2 text-left">
              <div className="h-12 w-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500 shadow-inner">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <DialogTitle className="text-xl font-bold uppercase tracking-tight text-[#171a3d]">
                ¿Eliminar este artículo?
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500 font-normal leading-relaxed">
                Esta acción retirará la publicación "{postToDelete?.nombre}" de forma permanente del catálogo universitario.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="pt-4 flex items-center justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPostToDelete(null)}
                className="h-9 px-4 rounded-full border-0 bg-slate-100 text-xs font-bold text-slate-700 hover:bg-slate-200"
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
      </div>
    </PageTransition>
  );
};
