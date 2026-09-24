import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useMarketplace } from '@/context/MarketplaceContext';
import { useAuth } from '@/context/AuthContext';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { ProductFilters } from '@/components/marketplace/ProductFilters';
import { CreatePostDialog } from '@/components/marketplace/CreatePostDialog';
import { PageTransition } from '@/components/common/PageTransition';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  SearchX,
  SlidersHorizontal,
  Plus,
  MapPin,
} from 'lucide-react';
import { formatCampusName } from '@/lib/utils';
import { motion } from 'framer-motion';

export const CatalogPage: React.FC = () => {
  const { filteredPosts, isLoading, filters, updateFilter, resetFilters } = useMarketplace();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  // Sync URL search params with state on load
  useEffect(() => {
    const sedeParam = searchParams.get('sede');
    const categoryParam = searchParams.get('category');
    const queryParam = searchParams.get('q');
    const isCreate = searchParams.get('create') === 'true' || searchParams.get('publish') === 'true';

    if (sedeParam) updateFilter('sede', sedeParam);
    if (categoryParam) updateFilter('category', categoryParam);
    if (queryParam) updateFilter('search', queryParam);

    if (isCreate) {
      if (isAuthenticated) {
        setCreateDialogOpen(true);
      } else {
        navigate('/login?from=/catalog?create=true');
      }
    }
  }, [searchParams, isAuthenticated, navigate]);

  const handleCreateOpenChange = (open: boolean) => {
    setCreateDialogOpen(open);
    if (!open) {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('create');
      newParams.delete('publish');
      setSearchParams(newParams, { replace: true });
    }
  };

  const handleOpenCreate = () => {
    if (isAuthenticated) {
      setCreateDialogOpen(true);
    } else {
      navigate('/login?from=/catalog?create=true');
    }
  };

  return (
    <PageTransition className="min-h-screen bg-[#f1f3f6] dark:bg-[#0b0e1e] text-[#0f172a] dark:text-slate-100 flex flex-col font-aeonik transition-colors duration-200">
      {/* Header Catalog Title Banner */}
      <section className="bg-white dark:bg-[#0e1226] border-b border-slate-200/90 dark:border-white/10 py-8 sm:py-10 px-4 sm:px-8 shadow-xs">
        <div className="max-w-[1440px] mx-auto space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-[#161b38] text-[11px] font-bold text-[#0f172a] dark:text-slate-200 border border-slate-200 dark:border-white/10 shadow-2xs">
            <span className="h-2 w-2 rounded-full bg-[#3da898]" />
            <span>Mercado Universitario · Universidad de Cartagena</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#0f172a] dark:text-white">
                Catálogo de Artículos y Servicios
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl font-medium leading-relaxed mt-1">
                Encuentra libros, batas, calculadoras, tecnología y tutorías con entrega en mano en tu campus.
              </p>
            </div>
            <Button
              type="button"
              onClick={handleOpenCreate}
              variant="udc"
              className="rounded-full px-5 h-10 font-extrabold text-xs sm:text-sm self-start md:self-auto shadow-md shadow-[#ec8026]/25 active:scale-95 flex items-center gap-1.5"
            >
              <Plus className="h-4.5 w-4.5 stroke-[2.5]" />
              <span>Publicar Artículo</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Grid Area */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Mobile Filter Trigger Button */}
          <div className="lg:hidden">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="w-full flex items-center justify-center gap-2 h-10 text-xs font-bold rounded-2xl bg-white dark:bg-[#11162e] border border-slate-200 dark:border-white/10 text-[#171a3d] dark:text-white shadow-xs hover:bg-slate-50 dark:hover:bg-white/10"
            >
              <SlidersHorizontal className="h-4 w-4 text-[#ec8026]" />
              <span>{mobileFiltersOpen ? 'Ocultar Filtros' : 'Filtrar Publicaciones'}</span>
            </Button>
          </div>

          {/* Desktop Sidebar / Mobile Collapsible Panel */}
          <aside className={`lg:col-span-1 ${mobileFiltersOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-32 space-y-4">
              <ProductFilters />
            </div>
          </aside>

          {/* Catalog Listing */}
          <section className="lg:col-span-3 space-y-5">
            {/* Results summary strip */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 gap-2 border-b border-slate-200/80 dark:border-white/10">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-[#171a3d] dark:text-white tracking-tight">
                  {filters.category ? filters.category : 'Todas las Publicaciones'}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1">
                  {filters.sede ? (
                    <>
                      <MapPin className="h-3 w-3 text-[#ec8026]" />
                      <span>Filtrado en {formatCampusName(filters.sede)}</span>
                    </>
                  ) : (
                    <span>Mostrando artículos de todos los campus UDC</span>
                  )}
                </p>
              </div>

              <span className="text-xs font-bold text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full bg-slate-100 dark:bg-[#161b38] border border-slate-200/60 dark:border-white/10 self-start sm:self-auto shadow-2xs">
                {filteredPosts.length} {filteredPosts.length === 1 ? 'publicación' : 'publicaciones'}
              </span>
            </div>

            {/* Product Grid / Loading / Empty */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="rounded-3xl bg-white dark:bg-[#11162e] p-4 border border-slate-200/80 dark:border-white/10 shadow-elevation space-y-3">
                    <Skeleton className="aspect-[4/3] w-full rounded-2xl bg-slate-100 dark:bg-slate-800" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-2/3 rounded-full bg-slate-100 dark:bg-slate-800" />
                      <Skeleton className="h-3 w-1/3 rounded-full bg-slate-100 dark:bg-slate-800" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredPosts.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
              >
                {filteredPosts.map((post) => (
                  <ProductCard key={post.id} post={post} />
                ))}
              </motion.div>
            ) : (
              <div className="rounded-3xl bg-white dark:bg-[#11162e] p-10 sm:p-12 text-center border border-slate-200/80 dark:border-white/10 shadow-elevation space-y-4">
                <div className="h-14 w-14 bg-slate-50 dark:bg-[#161b38] text-[#ec8026] rounded-2xl flex items-center justify-center mx-auto border border-slate-100 dark:border-white/10 shadow-2xs">
                  <SearchX className="h-7 w-7" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-[#171a3d] dark:text-white">
                    No se encontraron artículos con estos filtros
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                    Intenta cambiar o restablecer los filtros de sede, categoría o precio para ver más resultados.
                  </p>
                </div>
                <div className="pt-2 flex flex-wrap justify-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetFilters}
                    className="text-xs h-9 px-4 rounded-full border-slate-200 dark:border-white/15 bg-white dark:bg-[#161b38] text-[#171a3d] dark:text-white hover:bg-slate-50 dark:hover:bg-white/10"
                  >
                    Restablecer Filtros
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="udc"
                    onClick={handleOpenCreate}
                    className="text-xs h-9 px-4 rounded-full shadow-md shadow-[#ec8026]/20"
                  >
                    <Plus className="h-3.5 w-3.5 mr-1 stroke-[3]" />
                    Publicar un artículo
                  </Button>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Create Post Popup Dialog with Catalog background */}
      <CreatePostDialog
        open={createDialogOpen}
        onOpenChange={handleCreateOpenChange}
      />
    </PageTransition>
  );
};
