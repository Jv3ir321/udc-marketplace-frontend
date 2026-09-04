import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useMarketplace } from '@/context/MarketplaceContext';
import { useAuth } from '@/context/AuthContext';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { BentoCard } from '@/components/marketplace/BentoCard';
import { ProductFilters } from '@/components/marketplace/ProductFilters';
import { CreatePostDialog } from '@/components/marketplace/CreatePostDialog';
import { PageTransition } from '@/components/common/PageTransition';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  SearchX,
  SlidersHorizontal,
  Plus,
  LayoutGrid,
  LayoutTemplate,
} from 'lucide-react';
import { CATEGORIAS_PRODUCTO, formatCampusName } from '@/lib/utils';
import { SlowSlide } from '@/components/common/SlowSlide';

export const CatalogPage: React.FC = () => {
  const { filteredPosts, isLoading, filters, updateFilter, resetFilters } = useMarketplace();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'bento' | 'classic'>('bento');
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

  // Harmonious Bento Box organization: balanced widths without exaggerated vertical heights
  const getBentoConfig = (index: number) => {
    const pattern = index % 6;
    switch (pattern) {
      case 0:
        return { variant: 'wide' as const, className: 'col-span-1 lg:col-span-2' };
      case 1:
        return { variant: 'standard' as const, className: 'col-span-1' };
      case 2:
        return { variant: 'standard' as const, className: 'col-span-1' };
      case 3:
        return { variant: 'wide' as const, className: 'col-span-1 lg:col-span-2' };
      case 4:
        return { variant: 'standard' as const, className: 'col-span-1' };
      case 5:
        return { variant: 'standard' as const, className: 'col-span-1' };
      default:
        return { variant: 'standard' as const, className: 'col-span-1' };
    }
  };

  return (
    <PageTransition className="min-h-screen bg-[#faf8f5] text-[#171a3d] flex flex-col font-aeonik">
      {/* Header Catalog Title Banner */}
      <div className="bg-gradient-to-b from-[#faf8f5] to-[#f4f5f8] py-10 px-4 sm:px-8">
        <div className="max-w-[1440px] mx-auto space-y-3">
          <SlowSlide direction="up" duration={0.6} distance={15}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white shadow-md shadow-black/5 text-xs font-semibold text-[#44216b]">
              <span className="h-2 w-2 rounded-full bg-[#3da898] animate-pulse" />
              <span>Mercado Estudiantil · Claustro San Agustín y Sedes UDC</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#171a3d] uppercase">
              Catálogo de Artículos Universitarios
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl font-normal leading-relaxed">
              Explora calculadoras, libros, batas clínicas, tecnología y apuntes académicos con entrega personal en tu campus.
            </p>
          </SlowSlide>
        </div>
      </div>

      {/* Quick Category Bar */}
      <section className="bg-white/95 backdrop-blur-md py-3.5 px-4 sm:px-8 sticky top-16 z-20 shadow-[0_10px_30px_rgba(23,26,61,0.06)] overflow-x-auto">
        <div className="max-w-[1440px] mx-auto flex items-center gap-2 min-w-max">
          <button
            type="button"
            onClick={() => updateFilter('category', '')}
            className={`h-9 px-4 rounded-full text-xs font-aeonik font-bold tracking-[0.02em] transition-all duration-200 ${
              !filters.category
                ? 'bg-[#171a3d] text-white shadow-md shadow-[#171a3d]/25 scale-[1.02]'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 hover:text-[#171a3d] shadow-sm shadow-slate-900/5'
            }`}
          >
            Todo el Catálogo
          </button>
          {CATEGORIAS_PRODUCTO.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => updateFilter('category', filters.category === cat ? '' : cat)}
              className={`h-9 px-4 rounded-full text-xs font-aeonik font-bold tracking-[0.02em] transition-all duration-200 ${
                filters.category === cat
                  ? 'bg-[#171a3d] text-white shadow-md shadow-[#171a3d]/25 scale-[1.02]'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 hover:text-[#171a3d] shadow-sm shadow-slate-900/5'
              }`}
            >
              <span>{cat}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Main Grid Area */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-8 py-10 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Mobile Filter Trigger Button */}
          <div className="lg:hidden">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="w-full flex items-center justify-center gap-2 h-11 text-xs font-aeonik font-bold rounded-2xl border-0 bg-white text-[#171a3d] shadow-md shadow-slate-900/8 hover:bg-slate-50"
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
          <section className="lg:col-span-3 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171a3d] uppercase tracking-tight">
                  {filters.category ? filters.category : 'Todas las Secciones'}
                </h2>
                <p className="text-xs font-medium text-slate-500 mt-1">
                  {filters.sede
                    ? `Filtrando en: ${formatCampusName(filters.sede)}`
                    : 'Disponible en Claustro San Agustín y Sedes Zaragocilla, Piedra de Bolívar y San Pablo'}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Publish CTA Button */}
                <Button
                  type="button"
                  size="sm"
                  onClick={handleOpenCreate}
                  className="h-9 px-4 rounded-full bg-[#ec8026] hover:bg-[#d97018] text-white font-aeonik font-bold text-xs tracking-[0.02em] shadow-md shadow-[#ec8026]/20 transition-all active:scale-95 flex items-center gap-1.5"
                >
                  <Plus className="h-4 w-4 stroke-[3]" />
                  <span className="hidden sm:inline">Publicar Artículo</span>
                  <span className="sm:hidden">Publicar</span>
                </Button>

                {/* Bento vs Classic view toggle */}
                <div className="flex items-center gap-1 bg-slate-200/80 p-1 rounded-full shadow-inner">
                  <button
                    type="button"
                    onClick={() => setViewMode('bento')}
                    className={`h-7 px-3.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all duration-200 ${
                      viewMode === 'bento'
                        ? 'bg-white text-[#171a3d] shadow-md shadow-slate-900/10'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <LayoutTemplate className="h-3.5 w-3.5 text-[#ec8026]" />
                    <span>Bento Box</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('classic')}
                    className={`h-7 px-3.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all duration-200 ${
                      viewMode === 'classic'
                        ? 'bg-white text-[#171a3d] shadow-md shadow-slate-900/10'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <LayoutGrid className="h-3.5 w-3.5 text-[#3da898]" />
                    <span>Cuadrícula</span>
                  </button>
                </div>

                <span className="text-xs font-bold text-slate-700 px-3.5 py-1.5 rounded-full bg-white shadow-md shadow-slate-900/8">
                  {filteredPosts.length} {filteredPosts.length === 1 ? 'artículo' : 'artículos'}
                </span>
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="rounded-3xl bg-white p-4 shadow-[0_12px_32px_rgba(23,26,61,0.09),0_2px_6px_rgba(23,26,61,0.04)] ring-1 ring-black/[0.04] space-y-3">
                    <Skeleton className="aspect-[4/3] w-full rounded-2xl bg-slate-100" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-2/3 rounded-full bg-slate-100" />
                      <Skeleton className="h-3 w-1/3 rounded-full bg-slate-100" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredPosts.length > 0 ? (
              viewMode === 'bento' ? (
                /* Bento Box Mosaic Grid */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredPosts.map((post, idx) => {
                    const bento = getBentoConfig(idx);
                    return (
                      <div key={post.id} className={bento.className}>
                        <BentoCard post={post} variant={bento.variant} index={idx} />
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Classic Grid View */
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredPosts.map((post) => (
                    <ProductCard key={post.id} post={post} />
                  ))}
                </div>
              )
            ) : (
              <div className="rounded-3xl bg-white p-12 text-center shadow-[0_16px_40px_rgba(23,26,61,0.10)] ring-1 ring-black/[0.04] space-y-5">
                <div className="h-16 w-16 bg-[#faf8f5] text-[#171a3d] rounded-2xl shadow-inner flex items-center justify-center mx-auto">
                  <SearchX className="h-8 w-8 text-[#ec8026]" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-xl font-bold uppercase text-[#171a3d]">
                    No se encontraron artículos con este criterio
                  </h3>
                  <p className="text-xs font-normal text-slate-500 max-w-md mx-auto leading-relaxed">
                    No hay publicaciones que concuerden con los parámetros seleccionados. Intenta restablecer los filtros de sede o categoría.
                  </p>
                </div>
                <div className="pt-2 flex flex-wrap justify-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetFilters}
                    className="text-xs h-9 px-5 rounded-full bg-slate-100 hover:bg-slate-200 border-0 text-slate-800 font-aeonik font-bold shadow-md shadow-slate-900/5"
                  >
                    Restablecer Filtros
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleOpenCreate}
                    className="text-xs h-9 px-5 rounded-full bg-[#ec8026] hover:bg-[#d97018] text-white font-aeonik font-bold shadow-md shadow-[#ec8026]/25 transition-all"
                  >
                    <Plus className="h-3.5 w-3.5 mr-1 stroke-[3]" />
                    Publicar este aviso
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
