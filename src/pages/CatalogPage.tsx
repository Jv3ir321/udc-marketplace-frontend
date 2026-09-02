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
  BookOpen,
  Laptop,
  Shirt,
  Home as HomeIcon,
  GraduationCap,
  SlidersHorizontal,
} from 'lucide-react';
import { CATEGORIAS_PRODUCTO } from '@/lib/utils';

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

  const categoryIcons: Record<string, React.ReactNode> = {
    'Libros y Fotocopias': <BookOpen className="h-4 w-4 text-orange-600" />,
    'Calculadoras y Tecnología': <Laptop className="h-4 w-4 text-amber-600" />,
    'Uniformes y Batas': <Shirt className="h-4 w-4 text-emerald-600" />,
    'Habitaciones y Alquiler': <HomeIcon className="h-4 w-4 text-rose-600" />,
    'Servicios y Tutorías': <GraduationCap className="h-4 w-4 text-orange-700" />,
  };

  return (
    <PageTransition className="min-h-screen bg-stone-50/50 flex flex-col">
      {/* Header Catalog Title Banner */}
      <div className="bg-gradient-to-r from-stone-950 via-stone-900 to-orange-950 text-white border-b border-orange-500/20 py-8 sm:py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-2.5 relative z-10">
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Explorador de Publicaciones y Artículos
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 max-w-2xl">
            Encuentra libros, batas médicas, calculadoras, alojamientos y servicios ofrecidos por estudiantes de todas las sedes de la Universidad de Cartagena.
          </p>
        </div>
      </div>

      {/* Quick Category Bar */}
      <section className="bg-white border-b border-orange-200/70 py-3 px-4 sm:px-6 lg:px-8 overflow-x-auto shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center gap-2 min-w-max">
          <span className="text-xs font-extrabold text-stone-700 uppercase tracking-wider mr-1">
            Categorías:
          </span>
          <button
            onClick={() => updateFilter('category', '')}
            className={`text-xs px-3.5 py-1.5 rounded-full font-bold transition-all ${
              !filters.category
                ? 'bg-orange-600 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-orange-50 border border-stone-200 shadow-2xs'
            }`}
          >
            Todas
          </button>
          {CATEGORIAS_PRODUCTO.map((cat) => (
            <button
              key={cat}
              onClick={() => updateFilter('category', filters.category === cat ? '' : cat)}
              className={`text-xs px-3.5 py-1.5 rounded-full font-bold transition-all flex items-center gap-1.5 ${
                filters.category === cat
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-orange-50 border border-stone-200 shadow-2xs'
              }`}
            >
              {categoryIcons[cat]}
              <span>{cat}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Main Grid Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Mobile Filter Trigger Button */}
          <div className="lg:hidden flex items-center justify-between bg-white p-3.5 rounded-2xl border border-stone-200 shadow-xs">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="rounded-xl border-orange-200 text-stone-800 text-xs font-bold w-full flex items-center justify-center gap-2"
            >
              <SlidersHorizontal className="h-4 w-4 text-orange-600" />
              <span>{mobileFiltersOpen ? 'Ocultar Filtros' : 'Mostrar Filtros y Búsqueda'}</span>
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
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-stone-200/80 shadow-2xs">
              <div>
                <h2 className="text-sm sm:text-base font-extrabold text-stone-900">
                  {filters.category ? filters.category : 'Todas las Categorías'}
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {filters.sede ? `Filtrando por Campus ${filters.sede}` : 'Todas las sedes universitarias'}
                </p>
              </div>

              <div className="text-xs font-bold text-orange-700 bg-orange-50 px-3 py-1.5 rounded-full border border-orange-200 shrink-0">
                {filteredPosts.length} {filteredPosts.length === 1 ? 'resultado' : 'resultados'}
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="rounded-3xl border bg-white p-4 space-y-3 shadow-xs">
                    <Skeleton className="aspect-[4/3] w-full rounded-2xl" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-6 w-1/3" />
                    <Skeleton className="h-3 w-full" />
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
              <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-12 text-center space-y-4 shadow-xs">
                <div className="h-14 w-14 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto">
                  <SearchX className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">
                    No se encontraron publicaciones
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 max-w-md mx-auto">
                    No hay productos o servicios que coincidan con los filtros seleccionados. Intenta cambiar la sede, categoría o término de búsqueda.
                  </p>
                </div>
                <div className="pt-2 flex flex-wrap justify-center gap-3">
                  <Button variant="outline" size="sm" onClick={resetFilters} className="rounded-full text-xs">
                    Restablecer Filtros
                  </Button>
                  <Button asChild variant="udc" size="sm" className="rounded-full text-xs">
                    <Link to="/create">Publicar este artículo</Link>
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
