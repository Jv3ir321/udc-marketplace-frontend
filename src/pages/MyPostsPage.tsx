import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMarketplace } from '@/context/MarketplaceContext';
import { useAuth } from '@/context/AuthContext';
import { Post } from '@/types';
import { EditPostDialog } from '@/components/marketplace/EditPostDialog';
import { PageTransition } from '@/components/common/PageTransition';
import { Button } from '@/components/ui/button';
import { formatCOP, getBackendImageUrl } from '@/lib/utils';
import {
  Package,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  MapPin,
  AlertTriangle,
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

  const handleDeleteConfirm = async () => {
    if (!postToDelete) return;
    setIsDeleting(true);
    await deletePost(postToDelete.id);
    setIsDeleting(false);
    setPostToDelete(null);
  };

  return (
    <PageTransition className="min-h-screen bg-[#edf0f7] py-10 px-4 sm:px-6 lg:px-8 font-aeonik text-[#171a3d]">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#171a3d]/20 pb-5">
          <div className="space-y-1">
            <h1 className="text-4xl font-lateral uppercase tracking-normal text-[#171a3d] leading-none">
              MIS ARTÍCULOS PUBLICADOS
            </h1>
            <p className="text-xs text-[#171a3d]/70 font-medium">
              Administra, edita el precio o retira tus publicaciones en la Universidad de Cartagena
            </p>
          </div>

          <Button
            asChild
            className="h-10 px-5 rounded-[1600px] bg-[#ec8026] hover:bg-[#d97018] text-[#ffffff] font-aeonik font-bold text-xs tracking-[0.032em] border border-[#171a3d] transition-transform active:scale-95 shadow-sm"
          >
            <Link to="/create">
              <Plus className="h-4 w-4 mr-1.5 stroke-[3]" />
              Publicar Nuevo Artículo
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
                  className="rounded-[20px] bg-[#ffffff] border border-[#171a3d] overflow-hidden flex flex-col justify-between shadow-sm"
                >
                  <div className="p-3">
                    <div className="relative aspect-[4/3] w-full rounded-[16px] overflow-hidden border border-[#171a3d] bg-[#f0f2f7]">
                      <img
                        src={mainImage}
                        alt={post.nombre}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80';
                        }}
                      />
                      <div className="absolute top-2 left-2">
                        <span className="bg-[#ffffff] text-[#171a3d] text-[10px] font-bold tracking-[0.030em] px-2.5 py-0.5 border border-[#171a3d] rounded-[1600px]">
                          <MapPin className="h-3 w-3 inline mr-1 text-[#ec8026]" />
                          {post.sede}
                        </span>
                      </div>
                      <div className="absolute top-2 right-2">
                        <span className="bg-[#ec8026] text-[#ffffff] text-[10px] font-bold uppercase tracking-[0.032em] px-2.5 py-0.5 border border-[#171a3d] rounded-[1600px]">
                          {post.tipoP}
                        </span>
                      </div>
                    </div>

                    <div className="p-2 pt-3 space-y-2">
                      <h3 className="font-bold text-base text-[#171a3d] leading-snug line-clamp-1">
                        {post.nombre}
                      </h3>
                      <p className="text-xs text-[#171a3d]/70 font-medium line-clamp-2">
                        {post.desc}
                      </p>
                      <div className="pt-1">
                        <span className="font-lateral text-2xl font-bold text-[#171a3d] leading-none">
                          {formatCOP(post.price)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Strip */}
                  <div className="p-3 border-t border-[#171a3d]/20 flex items-center justify-between gap-2 bg-[#edf0f7]">
                    <Link
                      to={`/post/${post.id}`}
                      className="h-8 px-3 rounded-[1600px] border border-[#171a3d] bg-[#ffffff] hover:bg-[#edf0f7] text-xs font-bold text-[#171a3d] flex items-center gap-1.5"
                    >
                      <ExternalLink className="h-3 w-3" />
                      <span>Ver</span>
                    </Link>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setEditingPost(post)}
                        className="h-8 px-3 rounded-[1600px] border border-[#171a3d] bg-[#ffffff] hover:bg-[#edf0f7] text-xs font-bold text-[#171a3d] flex items-center gap-1"
                      >
                        <Edit2 className="h-3 w-3 text-[#3da898]" />
                        <span>Editar</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPostToDelete(post)}
                        className="h-8 px-2.5 rounded-[1600px] border border-[#171a3d] bg-[#ffffff] hover:bg-[#df4838]/10 text-xs font-bold text-[#df4838] flex items-center justify-center"
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
          <div className="rounded-[24px] bg-[#ffffff] border border-[#171a3d] p-12 text-center space-y-4 shadow-sm">
            <div className="h-14 w-14 rounded-[1600px] border border-[#171a3d] bg-[#edf0f7] flex items-center justify-center mx-auto text-[#171a3d]">
              <Package className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-lateral uppercase text-[#171a3d]">
                No tienes artículos publicados todavía
              </h3>
              <p className="text-xs text-[#171a3d]/70 font-medium max-w-sm mx-auto">
                Publica calculadoras, batas de laboratorio, libros o fotocopias para tus compañeros de facultad.
              </p>
            </div>
            <Button
              asChild
              className="h-10 px-6 rounded-[1600px] bg-[#ec8026] text-[#ffffff] font-aeonik font-bold text-xs tracking-[0.032em] border border-[#171a3d] hover:bg-[#d97018] shadow-sm"
            >
              <Link to="/create">
                <Plus className="h-4 w-4 mr-1.5 stroke-[3]" />
                Publicar Primer Artículo
              </Link>
            </Button>
          </div>
        )}

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
          <DialogContent className="rounded-[24px] bg-[#ffffff] border border-[#171a3d] font-aeonik p-6 max-w-sm text-[#171a3d]">
            <DialogHeader className="space-y-2 text-left">
              <div className="h-10 w-10 rounded-[1600px] border border-[#171a3d] bg-[#df4838]/10 flex items-center justify-center text-[#df4838]">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <DialogTitle className="text-xl font-lateral uppercase text-[#171a3d]">
                ¿Eliminar este artículo?
              </DialogTitle>
              <DialogDescription className="text-xs text-[#171a3d]/70 font-medium">
                Esta acción retirará la publicación "{postToDelete?.nombre}" de forma permanente del catálogo.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="pt-4 flex items-center justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPostToDelete(null)}
                className="h-9 px-4 rounded-[1600px] border border-[#171a3d] bg-[#ffffff] text-xs font-bold text-[#171a3d] hover:bg-[#edf0f7]"
              >
                Cancelar
              </Button>
              <Button
                size="sm"
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="h-9 px-4 rounded-[1600px] bg-[#df4838] hover:bg-[#c93b2c] text-[#ffffff] text-xs font-bold border border-[#171a3d]"
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
