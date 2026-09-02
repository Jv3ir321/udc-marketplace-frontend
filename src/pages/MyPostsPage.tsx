import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMarketplace } from '@/context/MarketplaceContext';
import { useAuth } from '@/context/AuthContext';
import { Post } from '@/types';
import { EditPostDialog } from '@/components/marketplace/EditPostDialog';
import { PageTransition } from '@/components/common/PageTransition';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCOP, getSedeBadgeColor, getBackendImageUrl } from '@/lib/utils';
import {
  Package,
  PlusCircle,
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
    <PageTransition className="min-h-screen bg-stone-50/50 py-8 sm:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-3xl border border-stone-200/80 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <Package className="h-6 w-6 text-orange-600" />
              <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                Mis Publicaciones
              </h1>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Administra, edita o elimina los anuncios que has publicado en el marketplace.
            </p>
          </div>

          <Button asChild variant="udc" className="rounded-full shadow-md text-xs sm:text-sm">
            <Link to="/create">
              <PlusCircle className="h-4 w-4 mr-1.5" />
              Publicar Nuevo Anuncio
            </Link>
          </Button>
        </div>

        {/* Listings */}
        {myPosts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-stone-200/80 p-8 sm:p-12 text-center space-y-4">
            <div className="h-16 w-16 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mx-auto">
              <Package className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">
                Aún no tienes publicaciones activas
              </h3>
              <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
                ¿Tienes libros, una calculadora, una bata o servicios para ofrecer a tus compañeros?
              </p>
            </div>
            <Button asChild variant="udc" className="rounded-full text-xs">
              <Link to="/create">
                <PlusCircle className="h-4 w-4 mr-2" />
                Crear Mi Primer Anuncio
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myPosts.map((post) => {
              const images = post.imagenes || (post.postIMGs?.map((img) => img.imageURL) || []);
              const mainImg = images.length > 0 ? getBackendImageUrl(images[0]) : getBackendImageUrl('');

              return (
                <Card key={post.id} className="rounded-3xl border-stone-200/80 overflow-hidden bg-white flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
                  <div>
                    {/* Top Image */}
                    <div className="relative aspect-[16/9] overflow-hidden bg-stone-100">
                      <img
                        src={mainImg}
                        alt={post.nombre}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80';
                        }}
                      />
                      <span
                        className={`absolute top-2.5 left-2.5 text-[10px] font-semibold px-2 py-0.5 rounded-full border backdrop-blur-md ${getSedeBadgeColor(
                          post.sede
                        )}`}
                      >
                        <MapPin className="h-2.5 w-2.5 inline mr-1 -mt-0.5" />
                        {post.sede}
                      </span>
                    </div>

                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-black text-stone-900">
                          {formatCOP(post.price)}
                        </span>
                        <Badge variant="outline" className="text-[10px]">
                          {post.tipoP}
                        </Badge>
                      </div>

                      <h3 className="font-bold text-sm text-foreground line-clamp-1">
                        {post.nombre}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {post.desc}
                      </p>
                    </CardContent>
                  </div>

                  {/* Actions Footer */}
                  <div className="p-4 pt-0 border-t border-stone-100 flex items-center justify-between gap-2 mt-4">
                    <Button asChild variant="ghost" size="sm" className="text-xs h-8 px-2 text-stone-600">
                      <Link to={`/post/${post.id}`}>
                        <ExternalLink className="h-3.5 w-3.5 mr-1" />
                        Ver Detalle
                      </Link>
                    </Button>

                    <div className="flex items-center gap-1.5">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingPost(post)}
                        className="text-xs h-8 px-2.5 text-orange-700 border-orange-200 hover:bg-orange-50"
                      >
                        <Edit2 className="h-3.5 w-3.5 mr-1" />
                        Editar
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setPostToDelete(post)}
                        className="text-xs h-8 px-2 text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* Edit Dialog */}
        {editingPost && (
          <EditPostDialog
            post={editingPost}
            isOpen={!!editingPost}
            onClose={() => setEditingPost(null)}
          />
        )}

        {/* Delete Confirmation Modal */}
        {postToDelete && (
          <Dialog open={!!postToDelete} onOpenChange={() => setPostToDelete(null)}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <div className="h-12 w-12 rounded-full bg-red-100 text-destructive flex items-center justify-center mb-2">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <DialogTitle>¿Eliminar esta publicación?</DialogTitle>
                <DialogDescription>
                  Estás a punto de eliminar <strong>"{postToDelete.nombre}"</strong>. Esta acción llamará al endpoint de eliminación del backend y no se puede deshacer.
                </DialogDescription>
              </DialogHeader>

              <DialogFooter className="gap-2 sm:gap-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPostToDelete(null)}
                >
                  Cancelar
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDeleteConfirm}
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Eliminando...' : 'Sí, Eliminar Publicación'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </PageTransition>
  );
};
