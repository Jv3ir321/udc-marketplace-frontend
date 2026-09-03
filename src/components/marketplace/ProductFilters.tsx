import React from 'react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { UDC_SEDES, CATEGORIAS_PRODUCTO } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  RotateCcw,
  SlidersHorizontal,
  MapPin,
  Tag,
  ArrowUpDown,
} from 'lucide-react';

export const ProductFilters: React.FC = () => {
  const { filters, updateFilter, resetFilters, filteredPosts } = useMarketplace();

  return (
    <div className="bg-[#ffffff] text-[#171a3d] rounded-[20px] p-5 border border-[#171a3d] space-y-6 font-aeonik shadow-sm">
      <div className="flex items-center justify-between pb-3 border-b border-[#171a3d]/20">
        <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-[0.032em]">
          <SlidersHorizontal className="h-3.5 w-3.5 text-[#3da898]" />
          <span>Filtros de Búsqueda</span>
          <span className="text-[11px] px-2 py-0.5 rounded-[1600px] bg-[#f4edf9] text-[#44216b] border border-[#171a3d]">
            {filteredPosts.length}
          </span>
        </div>
        {(filters.sede || filters.category || filters.search || filters.minPrice || filters.maxPrice) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="text-xs h-7 px-2.5 rounded-[1600px] border border-[#171a3d] bg-[#ffffff] hover:bg-[#edf0f7] text-[#171a3d] font-aeonik font-bold"
          >
            <RotateCcw className="h-3 w-3 mr-1 text-[#df4838]" />
            Limpiar
          </Button>
        )}
      </div>

      {/* Campus / Sede Tags (1600px radius pill) */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold uppercase tracking-[0.032em] text-[#171a3d]/70 flex items-center gap-1.5">
          <MapPin className="h-3 w-3 text-[#df4838]" />
          Claustro / Sede UDC
        </label>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => updateFilter('sede', '')}
            className={`text-xs px-3 py-1 rounded-[1600px] transition-all font-aeonik font-bold tracking-[0.032em] ${
              !filters.sede
                ? 'bg-[#ec8026] text-[#ffffff] border border-[#171a3d]'
                : 'bg-[#ffffff] text-[#171a3d] border border-[#171a3d] hover:bg-[#edf0f7]'
            }`}
          >
            Todas
          </button>
          {UDC_SEDES.map((sede) => (
            <button
              key={sede}
              type="button"
              onClick={() => updateFilter('sede', filters.sede === sede ? '' : sede)}
              className={`text-xs px-3 py-1 rounded-[1600px] transition-all font-aeonik font-bold tracking-[0.032em] ${
                filters.sede === sede
                  ? 'bg-[#ec8026] text-[#ffffff] border border-[#171a3d]'
                  : 'bg-[#ffffff] text-[#171a3d] border border-[#171a3d] hover:bg-[#edf0f7]'
              }`}
            >
              {sede}
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold uppercase tracking-[0.032em] text-[#171a3d]/70 flex items-center gap-1.5">
          <Tag className="h-3 w-3 text-[#ec8026]" />
          Categoría
        </label>
        <div className="flex flex-col gap-1.5">
          <button
            type="button"
            onClick={() => updateFilter('category', '')}
            className={`text-left text-xs px-3 py-2 rounded-[1600px] transition-all font-aeonik font-bold tracking-[0.032em] flex items-center justify-between border ${
              !filters.category
                ? 'bg-[#ec8026] text-[#ffffff] border-[#171a3d]'
                : 'bg-[#ffffff] text-[#171a3d] border-[#171a3d] hover:bg-[#edf0f7]'
            }`}
          >
            <span>Todo el Catálogo</span>
          </button>
          {CATEGORIAS_PRODUCTO.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => updateFilter('category', filters.category === cat ? '' : cat)}
              className={`text-left text-xs px-3 py-2 rounded-[1600px] transition-all font-aeonik font-bold tracking-[0.032em] flex items-center justify-between border ${
                filters.category === cat
                  ? 'bg-[#ec8026] text-[#ffffff] border-[#171a3d]'
                  : 'bg-[#ffffff] text-[#171a3d] border-[#171a3d] hover:bg-[#edf0f7]'
              }`}
            >
              <span>{cat}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold uppercase tracking-[0.032em] text-[#171a3d]/70">
          Rango de Precio ($ COP)
        </label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-[10px] text-[#171a3d]/60 block mb-1 font-bold">Mínimo</span>
            <Input
              type="number"
              placeholder="0"
              className="h-9 text-xs font-aeonik font-bold rounded-[1600px] bg-[#ffffff] border border-[#171a3d] text-[#171a3d] focus-visible:ring-0 focus-visible:bg-[#edf0f7]"
              value={filters.minPrice ?? ''}
              onChange={(e) =>
                updateFilter('minPrice', e.target.value ? Number(e.target.value) : undefined)
              }
            />
          </div>
          <div>
            <span className="text-[10px] text-[#171a3d]/60 block mb-1 font-bold">Máximo</span>
            <Input
              type="number"
              placeholder="1000000"
              className="h-9 text-xs font-aeonik font-bold rounded-[1600px] bg-[#ffffff] border border-[#171a3d] text-[#171a3d] focus-visible:ring-0 focus-visible:bg-[#edf0f7]"
              value={filters.maxPrice ?? ''}
              onChange={(e) =>
                updateFilter('maxPrice', e.target.value ? Number(e.target.value) : undefined)
              }
            />
          </div>
        </div>
      </div>

      {/* Sorting */}
      <div className="space-y-2 pt-3 border-t border-[#171a3d]/20">
        <label className="text-xs font-bold uppercase tracking-[0.032em] text-[#171a3d]/70 flex items-center gap-1.5">
          <ArrowUpDown className="h-3 w-3 text-[#171a3d]" />
          Ordenar Por
        </label>
        <select
          className="w-full h-9 rounded-[1600px] border border-[#171a3d] bg-[#ffffff] px-3 text-xs font-aeonik font-bold text-[#171a3d] focus:outline-none cursor-pointer tracking-[0.030em]"
          value={filters.sortBy}
          onChange={(e) => updateFilter('sortBy', e.target.value)}
        >
          <option value="latest">Más reciente primero</option>
          <option value="price-asc">Menor precio primero</option>
          <option value="price-desc">Mayor precio primero</option>
        </select>
      </div>
    </div>
  );
};
