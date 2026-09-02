import React from 'react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { UDC_SEDES, CATEGORIAS_PRODUCTO } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
    <div className="bg-white rounded-3xl p-5 border border-orange-100 shadow-xs space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-stone-100">
        <div className="flex items-center gap-2 font-bold text-stone-800 text-sm">
          <SlidersHorizontal className="h-4 w-4 text-primary" />
          <span>Filtros de Búsqueda</span>
          <Badge variant="secondary" className="text-xs bg-orange-50 text-orange-950 font-semibold ml-1">
            {filteredPosts.length} {filteredPosts.length === 1 ? 'resultado' : 'resultados'}
          </Badge>
        </div>
        {(filters.sede || filters.category || filters.search || filters.minPrice || filters.maxPrice) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="text-xs text-muted-foreground hover:text-destructive h-8 px-2"
          >
            <RotateCcw className="h-3.5 w-3.5 mr-1" />
            Limpiar
          </Button>
        )}
      </div>

      {/* Campus / Sede Chips */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-primary" />
          Campus Universitario
        </label>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => updateFilter('sede', '')}
            className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
              !filters.sede
                ? 'bg-orange-600 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-orange-50'
            }`}
          >
            Todas
          </button>
          {UDC_SEDES.map((sede) => (
            <button
              key={sede}
              type="button"
              onClick={() => updateFilter('sede', filters.sede === sede ? '' : sede)}
              className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
                filters.sede === sede
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-orange-50'
              }`}
            >
              {sede}
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
          <Tag className="h-3.5 w-3.5 text-primary" />
          Categoría
        </label>
        <div className="grid grid-cols-1 gap-1">
          <button
            type="button"
            onClick={() => updateFilter('category', '')}
            className={`text-left text-xs px-3 py-2 rounded-xl font-medium transition-all flex items-center justify-between ${
              !filters.category
                ? 'bg-orange-50 text-orange-950 font-bold'
                : 'text-stone-600 hover:bg-orange-50/50'
            }`}
          >
            <span>Todas las categorías</span>
          </button>
          {CATEGORIAS_PRODUCTO.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => updateFilter('category', filters.category === cat ? '' : cat)}
              className={`text-left text-xs px-3 py-2 rounded-xl font-medium transition-all flex items-center justify-between ${
                filters.category === cat
                  ? 'bg-orange-50 text-orange-950 font-bold'
                  : 'text-stone-600 hover:bg-orange-50/50'
              }`}
            >
              <span>{cat}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold uppercase tracking-wider text-stone-600">
          Rango de Precio ($ COP)
        </label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-[10px] text-muted-foreground block mb-1">Mínimo</span>
            <Input
              type="number"
              placeholder="0"
              className="h-8 text-xs rounded-lg"
              value={filters.minPrice ?? ''}
              onChange={(e) =>
                updateFilter('minPrice', e.target.value ? Number(e.target.value) : undefined)
              }
            />
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground block mb-1">Máximo</span>
            <Input
              type="number"
              placeholder="1000000"
              className="h-8 text-xs rounded-lg"
              value={filters.maxPrice ?? ''}
              onChange={(e) =>
                updateFilter('maxPrice', e.target.value ? Number(e.target.value) : undefined)
              }
            />
          </div>
        </div>
      </div>

      {/* Sorting */}
      <div className="space-y-2.5 pt-2 border-t border-stone-100">
        <label className="text-xs font-bold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
          <ArrowUpDown className="h-3.5 w-3.5 text-primary" />
          Ordenar por
        </label>
        <select
          className="w-full h-9 rounded-xl border border-input bg-background px-3 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary"
          value={filters.sortBy}
          onChange={(e) => updateFilter('sortBy', e.target.value)}
        >
          <option value="latest">Más recientes primero</option>
          <option value="price-asc">Menor precio primero</option>
          <option value="price-desc">Mayor precio primero</option>
        </select>
      </div>
    </div>
  );
};
