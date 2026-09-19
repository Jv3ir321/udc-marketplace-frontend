import React from 'react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { UDC_SEDES, CATEGORIAS_PRODUCTO, formatCOP, formatCampusName, getCategoryMeta } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  RotateCcw,
  SlidersHorizontal,
  MapPin,
  Tag,
  ArrowUpDown,
  X,
  Check,
  DollarSign,
} from 'lucide-react';

export const ProductFilters: React.FC = () => {
  const { filters, updateFilter, resetFilters, filteredPosts } = useMarketplace();

  const hasActiveFilters = Boolean(
    filters.sede ||
    filters.category ||
    filters.search ||
    filters.minPrice !== undefined ||
    filters.maxPrice !== undefined
  );

  return (
    <div className="bg-white dark:bg-[#11162e] text-[#0f172a] dark:text-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 dark:border-white/10 shadow-elevation space-y-6 font-aeonik transition-colors">
      {/* Header with Title and Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-white/10">
        <div className="flex items-center gap-2 font-extrabold text-xs uppercase tracking-[0.04em] text-[#0f172a] dark:text-white">
          <div className="h-7 w-7 rounded-full bg-slate-100 dark:bg-white/10 text-[#ec8026] flex items-center justify-center shadow-xs">
            <SlidersHorizontal className="h-3.5 w-3.5" />
          </div>
          <span>Filtros</span>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-[#0f172a] dark:text-slate-200 font-bold border border-slate-200 dark:border-white/10 shadow-xs">
            {filteredPosts.length}
          </span>
        </div>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="text-xs h-7 px-3 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-aeonik font-bold transition-colors"
          >
            <RotateCcw className="h-3 w-3 mr-1" />
            <span>Limpiar</span>
          </Button>
        )}
      </div>

      {/* Active Filter Chips (if any) */}
      {hasActiveFilters && (
        <div className="space-y-1.5 pt-1">
          <span className="text-[10px] font-bold uppercase tracking-[0.04em] text-slate-500 dark:text-slate-400 block">
            Filtros Aplicados:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {filters.sede && (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold bg-slate-100 dark:bg-[#161b38] text-slate-900 dark:text-slate-200 px-3 py-1 rounded-full shadow-2xs border border-slate-200 dark:border-white/10">
                <span>{formatCampusName(filters.sede)}</span>
                <button
                  type="button"
                  onClick={() => updateFilter('sede', '')}
                  className="hover:opacity-75 focus:outline-none"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {filters.category && (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold bg-slate-100 dark:bg-[#161b38] text-slate-900 dark:text-slate-200 px-3 py-1 rounded-full shadow-2xs border border-slate-200 dark:border-white/10">
                <span>{filters.category}</span>
                <button
                  type="button"
                  onClick={() => updateFilter('category', '')}
                  className="hover:opacity-75 focus:outline-none"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {(filters.minPrice !== undefined || filters.maxPrice !== undefined) && (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold bg-slate-100 dark:bg-[#161b38] text-slate-900 dark:text-slate-200 px-3 py-1 rounded-full shadow-2xs border border-slate-200 dark:border-white/10">
                <span>
                  {filters.minPrice ? formatCOP(filters.minPrice) : '$0'} -{' '}
                  {filters.maxPrice ? formatCOP(filters.maxPrice) : 'Max'}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    updateFilter('minPrice', undefined);
                    updateFilter('maxPrice', undefined);
                  }}
                  className="hover:opacity-75 focus:outline-none"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {filters.search && (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold bg-slate-100 dark:bg-[#161b38] text-slate-900 dark:text-slate-200 px-3 py-1 rounded-full shadow-2xs border border-slate-200 dark:border-white/10">
                <span>"{filters.search}"</span>
                <button
                  type="button"
                  onClick={() => updateFilter('search', '')}
                  className="hover:opacity-75 focus:outline-none"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}

      {/* Campus / Sede Filter */}
      <div className="space-y-2.5">
        <label className="text-xs font-extrabold uppercase tracking-[0.04em] text-[#0f172a] dark:text-white flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-[#ec8026]" />
          <span>Claustro / Sede UDC</span>
        </label>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => updateFilter('sede', '')}
            className={`text-xs px-3.5 py-1.5 rounded-full transition-all font-aeonik font-bold tracking-[0.02em] border shadow-2xs ${
              !filters.sede
                ? 'bg-[#171a3d] dark:bg-white text-white dark:text-[#0b0e1e] border-[#171a3d] dark:border-white shadow-xs'
                : 'bg-white dark:bg-[#161b38] text-slate-700 dark:text-slate-300 border-slate-200 hover:border-slate-300 dark:border-white/10 dark:hover:bg-white/10'
            }`}
          >
            Todas las Sedes
          </button>
          {UDC_SEDES.map((sede) => {
            const isSelected = filters.sede === sede;
            return (
              <button
                key={sede}
                type="button"
                onClick={() => updateFilter('sede', isSelected ? '' : sede)}
                className={`text-xs px-3.5 py-1.5 rounded-full transition-all font-aeonik font-bold tracking-[0.02em] border shadow-2xs ${
                  isSelected
                    ? 'bg-[#171a3d] dark:bg-white text-white dark:text-[#0b0e1e] border-[#171a3d] dark:border-white shadow-xs'
                    : 'bg-white dark:bg-[#161b38] text-slate-700 dark:text-slate-300 border-slate-200 hover:border-slate-300 dark:border-white/10 dark:hover:bg-white/10'
                }`}
              >
                {sede}
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Filter with Color Dots & High Contrast */}
      <div className="space-y-2.5">
        <label className="text-xs font-extrabold uppercase tracking-[0.04em] text-[#0f172a] dark:text-white flex items-center gap-1.5">
          <Tag className="h-3.5 w-3.5 text-[#ec8026]" />
          <span>Categorías</span>
        </label>
        <div className="flex flex-col gap-1.5">
          <button
            type="button"
            onClick={() => updateFilter('category', '')}
            className={`text-left text-xs px-3.5 py-2.5 rounded-2xl transition-all font-aeonik font-bold tracking-[0.02em] flex items-center justify-between border shadow-2xs ${
              !filters.category
                ? 'bg-slate-100 dark:bg-white/15 text-[#0f172a] dark:text-white border-slate-300 dark:border-white/20 font-black shadow-xs'
                : 'bg-white dark:bg-[#161b38] text-slate-700 dark:text-slate-300 border-slate-200 hover:border-slate-300 dark:border-white/10 dark:hover:bg-white/10'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${!filters.category ? 'bg-[#ec8026]' : 'bg-slate-400'}`} />
              <span>Todo el Catálogo</span>
            </div>
            {!filters.category && <Check className="h-3.5 w-3.5 text-[#ec8026]" />}
          </button>
          {CATEGORIAS_PRODUCTO.map((cat) => {
            const isSelected = filters.category === cat;
            const meta = getCategoryMeta(cat);
            return (
              <button
                key={cat}
                type="button"
                onClick={() => updateFilter('category', isSelected ? '' : cat)}
                className={`text-left text-xs px-3.5 py-2.5 rounded-2xl transition-all font-aeonik font-bold tracking-[0.02em] flex items-center justify-between border shadow-2xs ${
                  isSelected
                    ? 'bg-slate-100 dark:bg-white/15 text-[#0f172a] dark:text-white border-slate-300 dark:border-white/20 font-black shadow-xs'
                    : 'bg-white dark:bg-[#161b38] text-slate-700 dark:text-slate-300 border-slate-200 hover:border-slate-300 dark:border-white/10 dark:hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="h-2.5 w-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: meta.color }}
                  />
                  <span>{cat}</span>
                </div>
                {isSelected && <Check className="h-3.5 w-3.5 shrink-0 text-[#ec8026]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-2.5">
        <label className="text-xs font-extrabold uppercase tracking-[0.04em] text-[#0f172a] dark:text-white flex items-center gap-1.5">
          <DollarSign className="h-3.5 w-3.5 text-[#3da898]" />
          <span>Rango de Precio ($ COP)</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block mb-1 font-bold">Mínimo</span>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">$</span>
              <Input
                type="number"
                placeholder="0"
                className="pl-6 h-9 text-xs font-aeonik font-bold rounded-xl bg-slate-50 dark:bg-[#161b38] border border-slate-300/80 dark:border-white/10 text-[#0f172a] dark:text-white focus-visible:ring-2 focus-visible:ring-[#ec8026]/40 focus-visible:bg-white dark:focus-visible:bg-[#1a2042] transition-colors"
                value={filters.minPrice ?? ''}
                onChange={(e) =>
                  updateFilter('minPrice', e.target.value ? Number(e.target.value) : undefined)
                }
              />
            </div>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block mb-1 font-bold">Máximo</span>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">$</span>
              <Input
                type="number"
                placeholder="1000000"
                className="pl-6 h-9 text-xs font-aeonik font-bold rounded-xl bg-slate-50 dark:bg-[#161b38] border border-slate-300/80 dark:border-white/10 text-[#0f172a] dark:text-white focus-visible:ring-2 focus-visible:ring-[#ec8026]/40 focus-visible:bg-white dark:focus-visible:bg-[#1a2042] transition-colors"
                value={filters.maxPrice ?? ''}
                onChange={(e) =>
                  updateFilter('maxPrice', e.target.value ? Number(e.target.value) : undefined)
                }
              />
            </div>
          </div>
        </div>

        {/* Quick Price Range Presets */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          <button
            type="button"
            onClick={() => {
              updateFilter('minPrice', undefined);
              updateFilter('maxPrice', 25000);
            }}
            className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-[#161b38] hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 transition-colors"
          >
            &lt; $25.000
          </button>
          <button
            type="button"
            onClick={() => {
              updateFilter('minPrice', 25000);
              updateFilter('maxPrice', 60000);
            }}
            className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-[#161b38] hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 transition-colors"
          >
            $25k - $60k
          </button>
          <button
            type="button"
            onClick={() => {
              updateFilter('minPrice', 60000);
              updateFilter('maxPrice', undefined);
            }}
            className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-[#161b38] hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 transition-colors"
          >
            &gt; $60.000
          </button>
        </div>
      </div>

      {/* Sorting */}
      <div className="space-y-2 pt-3 border-t border-slate-200/80 dark:border-white/10">
        <label className="text-xs font-extrabold uppercase tracking-[0.04em] text-[#0f172a] dark:text-white flex items-center gap-1.5">
          <ArrowUpDown className="h-3.5 w-3.5 text-[#ec8026]" />
          <span>Ordenar Publicaciones</span>
        </label>
        <select
          className="w-full h-10 rounded-xl bg-slate-50 dark:bg-[#161b38] border border-slate-300/80 dark:border-white/10 px-3.5 text-xs font-aeonik font-bold text-[#0f172a] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ec8026]/40 cursor-pointer tracking-[0.02em] transition-colors shadow-2xs"
          value={filters.sortBy}
          onChange={(e) => updateFilter('sortBy', e.target.value)}
        >
          <option value="latest" className="dark:bg-[#11162e]">Más reciente primero</option>
          <option value="price-asc" className="dark:bg-[#11162e]">Menor precio primero</option>
          <option value="price-desc" className="dark:bg-[#11162e]">Mayor precio primero</option>
        </select>
      </div>
    </div>
  );
};
