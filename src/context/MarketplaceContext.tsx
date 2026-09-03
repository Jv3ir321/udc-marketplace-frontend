import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Post, CreatePostDTO, UpdatePostDTO, FilterState } from '@/types';
import { postService } from '@/services/postService';
import { toast } from 'sonner';

interface MarketplaceContextType {
  posts: Post[];
  filteredPosts: Post[];
  isLoading: boolean;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  updateFilter: (key: keyof FilterState, value: any) => void;
  resetFilters: () => void;
  refreshPosts: () => Promise<void>;
  createPost: (data: CreatePostDTO) => Promise<boolean>;
  updatePost: (id: number, data: UpdatePostDTO) => Promise<boolean>;
  deletePost: (id: number) => Promise<boolean>;
  sendValoration: (postId: number, text: string) => Promise<boolean>;
  getPostById: (id: number) => Post | undefined;
}

const initialFilters: FilterState = {
  search: '',
  sede: '',
  category: '',
  minPrice: undefined,
  maxPrice: undefined,
  sortBy: 'latest',
};

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

export const MarketplaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const refreshPosts = async () => {
    setIsLoading(true);
    try {
      const data = await postService.getAll();
      setPosts(data);
    } catch (error) {
      console.error('Error al cargar publicaciones del backend', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshPosts();
  }, []);

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const createPost = async (data: CreatePostDTO): Promise<boolean> => {
    try {
      const res = await postService.create(data);
      toast.success(res.message || '¡Publicación creada exitosamente!');
      await refreshPosts();
      return true;
    } catch (error: any) {
      const msg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        'Error al crear la publicación';
      toast.error(msg);
      return false;
    }
  };

  const updatePost = async (id: number, data: UpdatePostDTO): Promise<boolean> => {
    try {
      const res = await postService.update(id, data);
      toast.success(res.message || 'Publicación actualizada correctamente');
      await refreshPosts();
      return true;
    } catch (error: any) {
      const msg = error.response?.data?.error || error.response?.data?.message || 'Error al actualizar';
      toast.error(msg);
      return false;
    }
  };

  const deletePost = async (id: number): Promise<boolean> => {
    try {
      const res = await postService.delete(id);
      toast.success(res.message || 'Publicación eliminada');
      await refreshPosts();
      return true;
    } catch (error: any) {
      const msg = error.response?.data?.error || 'Error al eliminar la publicación';
      toast.error(msg);
      return false;
    }
  };

  const sendValoration = async (postId: number, text: string): Promise<boolean> => {
    try {
      await postService.sendValoration(postId, text);
      toast.success('¡Valoración publicada!');
      await refreshPosts();
      return true;
    } catch (error: any) {
      const msg = error.response?.data?.error || 'Error al enviar la valoración';
      toast.error(msg);
      return false;
    }
  };

  const getPostById = (id: number) => {
    return posts.find((p) => p.id === id);
  };

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Search text match
      if (filters.search.trim()) {
        const query = filters.search.toLowerCase();
        const matchesName = post.nombre?.toLowerCase().includes(query);
        const matchesDesc = post.desc?.toLowerCase().includes(query);
        const matchesSede = post.sede?.toLowerCase().includes(query);
        const matchesTipo = post.tipoP?.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesSede && !matchesTipo) {
          return false;
        }
      }

      // Sede filter
      if (filters.sede && filters.sede !== 'all') {
        const pSede = (post.sede || '').toLowerCase();
        const fSede = filters.sede.toLowerCase();
        const baseP = pSede.replace(/^(claustro|sede)\s*(de\s*)?/i, '').trim();
        const baseF = fSede.replace(/^(claustro|sede)\s*(de\s*)?/i, '').trim();
        if (pSede !== fSede && !pSede.includes(baseF) && !fSede.includes(baseP)) {
          return false;
        }
      }

      // Category filter
      if (filters.category && filters.category !== 'all') {
        if (post.tipoP?.toLowerCase() !== filters.category.toLowerCase()) {
          return false;
        }
      }

      // Price filter
      const priceNum = parseFloat(String(post.price || '0').replace(/[^0-9.-]+/g, '')) || 0;
      if (filters.minPrice !== undefined && priceNum < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice !== undefined && priceNum > filters.maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') {
        const pA = parseFloat(String(a.price || '0').replace(/[^0-9.-]+/g, '')) || 0;
        const pB = parseFloat(String(b.price || '0').replace(/[^0-9.-]+/g, '')) || 0;
        return pA - pB;
      }
      if (filters.sortBy === 'price-desc') {
        const pA = parseFloat(String(a.price || '0').replace(/[^0-9.-]+/g, '')) || 0;
        const pB = parseFloat(String(b.price || '0').replace(/[^0-9.-]+/g, '')) || 0;
        return pB - pA;
      }
      // Latest default
      return (new Date(b.created_at || '').getTime() || b.id) - (new Date(a.created_at || '').getTime() || a.id);
    });
  }, [posts, filters]);

  return (
    <MarketplaceContext.Provider
      value={{
        posts,
        filteredPosts,
        isLoading,
        filters,
        setFilters,
        updateFilter,
        resetFilters,
        refreshPosts,
        createPost,
        updatePost,
        deletePost,
        sendValoration,
        getPostById,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
};

export function useMarketplace() {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace debe usarse dentro de un MarketplaceProvider');
  }
  return context;
}
