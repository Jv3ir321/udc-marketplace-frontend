import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useMarketplace } from '@/context/MarketplaceContext';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { ProductFilters } from '@/components/marketplace/ProductFilters';
import { PageTransition } from '@/components/common/PageTransition';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  SearchX,
  SlidersHorizontal,
  Plus,
} from 'lucide-react';
import { CATEGORIAS_PRODUCTO } from '@/lib/utils';
import { SlowSlide } from '@/components/common/SlowSlide';

export const CatalogPage: React.FC = () => {
  const { filteredPosts, isLoading, filters, updateFilter, resetFilters } = useMarketplace();
  const [searchParams] = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Sync URL search params with state on load
  useEffect(() => {
    const sedeParam = searchParams.get('sede');
    const categoryParam = searchParams.get('category');
    const queryParam = searchParams.get('q');

    if (sedeParam) updateFilter('sede', sedeParam);
    if (categoryParam) updateFilter('category', categoryParam);
    if (queryParam) updateFilter('search', queryParam);
  }, [searchParams]);

  return (
    <PageTransition className="min-h-screen bg-[#fbfcfd] text-[#171a3d] flex flex-col font-aeonik">
      {/* Header Catalog Title Banner */}
      <div className="border-b border-[#171a3d]/10 bg-gradient-to-b from-[#ffffff] to-[#f5f7fc] py-10 px-4 sm:px-8">
        <div className="max-w-[1440px] mx-auto space-y-2">
          <SlowSlide direction="up" duration={0.7} distance={20}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fdf3eb] border border-[#ec8026]/30 text-xs font-semibold text-[#ec8026] mb-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ec8026]" />
              <span>Mercado Estudiantil · Claustros de Cartagena</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#171a3d]">
              Catálogo de Artículos Universitarios
            </h1>
            <p className="text-sm sm:text-base text-[#171a3d]/70 max-w-2xl font-normal leading-relaxed">
              Explora calculadoras, libros, batas clínicas, tecnología y apuntes académicos con entrega personal en tu campus.
            </p>
          </SlowSlide>
        </div>
      </div>

      {/* Quick Category Bar */}
      <section className="border-b border-[#171a3d]/10 bg-[#ffffff] py-3 px-4 sm:px-8 overflow-x-auto">
        <div className="max-w-[1440px] mx-auto flex items-center gap-2 min-w-max">
          <button
            type="button"
            onClick={() => updateFilter('category', '')}
            className={`h-9 px-4 rounded-full text-xs font-aeonik font-semibold tracking-[0.02em] transition-all ${
              !filters.category
                ? 'bg-[#ec8026] text-[#ffffff] shadow-sm'
                : 'bg-[#f5f7fc] text-[#171a3d]/80 hover:bg-[#edf0f7]'
            }`}
          >
            Todo el Catálogo
          </button>
          {CATEGORIAS_PRODUCTO.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => updateFilter('category', filters.category === cat ? '' : cat)}
              className={`h-9 px-4 rounded-full text-xs font-aeonik font-semibold tracking-[0.02em] transition-all ${
                filters.category === cat
                  ? 'bg-[#ec8026] text-[#ffffff] shadow-sm'
                  : 'bg-[#f5f7fc] text-[#171a3d]/80 hover:bg-[#edf0f7]'
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
              className="w-full flex items-center justify-center gap-2 h-10 text-xs font-aeonik font-bold rounded-[1600px] border border-[#171a3d] bg-[#ffffff] text-[#171a3d]"
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span>{mobileFiltersOpen ? 'Ocultar Filtros' : 'Filtrar Publicaciones'}</span>
            </Button>
          </div>

          {/* Desktop Sidebar / Mobile Collapsible Panel */}
          <aside className={`lg:col-span-1 ${mobileFiltersOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-24 space-y-4">
              <ProductFilters />
            </div>
          </aside>

          {/* Catalog Listing */}
          <section className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#171a3d]/20">
              <div>
                <h2 className="text-2xl sm:text-3xl font-lateral text-[#171a3d] uppercase leading-none">
                  {filters.category ? filters.category : 'Todas las Secciones'}
                </h2>
                <p className="text-xs font-bold text-[#171a3d]/60 mt-1">
                  {filters.sede ? `Filtrando por Campus ${filters.sede}` : 'Disponible en todos los campus UDC'}
                </p>
              </div>

              <span className="text-xs font-bold text-[#171a3d] px-3 py-1 rounded-[1600px] bg-[#edf0f7] border border-[#171a3d]">
                {filteredPosts.length} {filteredPosts.length === 1 ? 'artículo' : 'artículos'}
              </span>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="rounded-[20px] bg-[#ffffff] p-4 border border-[#171a3d] space-y-3">
                    <Skeleton className="aspect-[4/3] w-full rounded-[16px] bg-[#edf0f7]" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-2/3 rounded-[1600px] bg-[#edf0f7]" />
                      <Skeleton className="h-3 w-1/3 rounded-[1600px] bg-[#edf0f7]" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredPosts.map((post) => (
                  <ProductCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="rounded-[20px] bg-[#edf0f7] p-12 text-center border border-[#171a3d] space-y-4">
                <div className="h-14 w-14 bg-[#ffffff] text-[#171a3d] rounded-[1600px] border border-[#171a3d] flex items-center justify-center mx-auto">
                  <SearchX className="h-7 w-7 text-[#171a3d]" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-lateral uppercase text-[#171a3d]">
                    No se encontraron artículos con este criterio
                  </h3>
                  <p className="text-xs font-medium text-[#171a3d]/70 max-w-md mx-auto">
                    No hay publicaciones que concuerden con los parámetros seleccionados. Intenta restablecer los filtros de sede o categoría.
                  </p>
                </div>
                <div className="pt-2 flex flex-wrap justify-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetFilters}
                    className="text-xs h-9 px-4 rounded-[1600px] border border-[#171a3d] bg-[#ffffff] text-[#171a3d] font-aeonik font-bold hover:bg-[#edf0f7]"
                  >
                    Restablecer Filtros
                  </Button>
                  <Button asChild size="sm" className="text-xs h-9 px-4 rounded-[1600px] bg-[#171a3d] text-[#ffffff] font-aeonik font-bold hover:bg-[#252a5c]">
                    <Link to="/create">
                      <Plus className="h-3.5 w-3.5 mr-1" />
                      Publicar este aviso
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </PageTransition>
  );
};
