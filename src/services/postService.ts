import api from './api';
import { Post, CreatePostDTO, UpdatePostDTO, Valoration } from '@/types';
import { INITIAL_POSTS } from './mockData';

const LOCAL_STORAGE_KEY = 'udc_marketplace_posts_v4';

// Clear legacy mock data keys if present
try {
  localStorage.removeItem('udc_marketplace_posts');
  localStorage.removeItem('udc_marketplace_posts_v2');
  localStorage.removeItem('udc_marketplace_posts_v3');
} catch {
  // ignore
}

function getLocalPosts(): Post[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw !== null) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Error al leer posts de almacenamiento local:', e);
  }
  // Initialize with empty posts
  saveLocalPosts(INITIAL_POSTS);
  return INITIAL_POSTS;
}

function saveLocalPosts(posts: Post[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(posts));
  } catch (e) {
    console.warn('Error al guardar posts en almacenamiento local:', e);
  }
}

export const postService = {
  // GET all posts directly from backend with local fallback
  async getAll(): Promise<Post[]> {
    try {
      const response = await api.get('/post');
      if (response.data && Array.isArray(response.data)) {
        saveLocalPosts(response.data);
        return response.data;
      }
    } catch (error) {
      console.warn('Backend /post no disponible, usando catálogo local:', error);
    }
    return getLocalPosts();
  },

  async getById(id: number): Promise<Post | null> {
    try {
      const response = await api.get(`/post/${id}`);
      if (response.data && response.data.id) {
        return response.data;
      }
    } catch (error) {
      console.warn(`Backend /post/${id} no disponible, buscando en catálogo local:`, error);
    }
    const local = getLocalPosts();
    return local.find((p) => p.id === Number(id)) || null;
  },

  // POST /post/create with multipart/form-data & local fallback
  async create(data: CreatePostDTO): Promise<{ message: string; post: Post }> {
    try {
      const formData = new FormData();
      formData.append('nombre', data.nombre);
      formData.append('desc', data.desc);
      formData.append('price', data.price);
      formData.append('sede', data.sede);
      formData.append('tipoP', data.tipoP);

      data.images.forEach((image) => {
        formData.append('images', image);
      });

      const response = await api.post('/post/create', formData);
      if (response.data && response.data.post) {
        return response.data;
      }
    } catch (backendError) {
      console.warn('Backend creación no disponible, guardando localmente:', backendError);
    }

    // Local fallback creation
    const local = getLocalPosts();
    const currentUser = JSON.parse(localStorage.getItem('udc_current_user') || '{}');
    const newId = local.length > 0 ? Math.max(...local.map((p) => p.id)) + 1 : 1;

    const imageUrls = await Promise.all(
      data.images.map((img) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(typeof reader.result === 'string' ? reader.result : URL.createObjectURL(img));
          };
          reader.onerror = () => {
            resolve(URL.createObjectURL(img));
          };
          reader.readAsDataURL(img);
        });
      })
    );

    const newPost: Post = {
      id: newId,
      nombre: data.nombre,
      desc: data.desc,
      price: data.price,
      sede: data.sede,
      tipoP: data.tipoP,
      userId: currentUser.id || 7,
      user: {
        id: currentUser.id || 7,
        title: currentUser.title || currentUser.name || 'Estudiante UDC',
        mail: currentUser.mail || 'estudiante@unicartagena.edu.co',
        codEst: currentUser.codEst || '022190001',
        sede: data.sede,
        role: currentUser.role || 'Estudiante',
        cellphone: currentUser.cellphone || '3001234567',
      },
      imagenes:
        imageUrls.length > 0
          ? imageUrls
          : ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80'],
      valorations: [],
      created_at: new Date().toISOString(),
    };

    const updated = [newPost, ...local];
    saveLocalPosts(updated);
    return {
      message: '¡Publicación creada exitosamente!',
      post: newPost,
    };
  },

  // PUT /post/:id/update
  async update(id: number, data: UpdatePostDTO): Promise<{ message: string; post: Partial<Post> }> {
    try {
      const response = await api.put(`/post/${id}/update`, {
        nombre: data.nombre,
        desc: data.desc,
        price: data.price,
        sede: data.sede,
        tipoP: data.tipoP,
      });
      if (response.data) {
        return response.data;
      }
    } catch (e) {
      console.warn('Backend update no disponible, actualizando localmente:', e);
    }

    const local = getLocalPosts();
    const updated = local.map((p) => {
      if (p.id === Number(id)) {
        return {
          ...p,
          nombre: data.nombre,
          desc: data.desc,
          price: data.price,
          sede: data.sede,
          tipoP: data.tipoP,
        };
      }
      return p;
    });
    saveLocalPosts(updated);
    return {
      message: 'Publicación actualizada correctamente',
      post: { ...data, id },
    };
  },

  // DELETE /post/:id/delete
  async delete(id: number): Promise<{ message: string }> {
    try {
      const response = await api.delete(`/post/${id}/delete`);
      if (response.data) {
        return response.data;
      }
    } catch (e) {
      console.warn('Backend delete no disponible, eliminando localmente:', e);
    }

    const local = getLocalPosts();
    const updated = local.filter((p) => p.id !== Number(id));
    saveLocalPosts(updated);
    return { message: 'Publicación eliminada correctamente' };
  },

  // POST /valoration/send
  async sendValoration(postId: number, valorationText: string): Promise<{ message: string; valoration: Valoration }> {
    try {
      const response = await api.post('/valoration/send', {
        postId: postId,
        valoration: valorationText,
      });
      if (response.data) {
        return response.data;
      }
    } catch (e) {
      console.warn('Backend valoración no disponible, guardando localmente:', e);
    }

    const local = getLocalPosts();
    const currentUser = JSON.parse(localStorage.getItem('udc_current_user') || '{}');
    const newValoration: Valoration = {
      id: Date.now(),
      valoration: valorationText,
      postId: Number(postId),
      userId: currentUser.id || 1,
      user: {
        id: currentUser.id || 1,
        title: currentUser.title || currentUser.name || 'Estudiante UDC',
        mail: currentUser.mail || 'estudiante@unicartagena.edu.co',
        codEst: currentUser.codEst || '02220100',
        sede: currentUser.sede || 'UDC',
        role: currentUser.role || 'Estudiante',
        cellphone: currentUser.cellphone || '3000000000',
      },
      created_at: new Date().toISOString(),
    };

    const updated = local.map((p) => {
      if (p.id === Number(postId)) {
        return {
          ...p,
          valorations: [...(p.valorations || []), newValoration],
        };
      }
      return p;
    });
    saveLocalPosts(updated);
    return {
      message: '¡Valoración enviada exitosamente!',
      valoration: newValoration,
    };
  },
};
