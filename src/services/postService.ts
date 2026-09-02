import api from './api';
import { Post, CreatePostDTO, UpdatePostDTO, Valoration } from '@/types';

export const postService = {
  // GET all posts directly from backend
  async getAll(): Promise<Post[]> {
    try {
      const response = await api.get('/post');
      if (response.data && Array.isArray(response.data)) {
        return response.data;
      }
      return [];
    } catch (error) {
      console.error('Error al obtener publicaciones del backend:', error);
      return [];
    }
  },

  async getById(id: number): Promise<Post | null> {
    try {
      const response = await api.get(`/post/${id}`);
      if (response.data && response.data.id) {
        return response.data;
      }
      return null;
    } catch (error) {
      console.error(`Error al obtener la publicación ${id}:`, error);
      return null;
    }
  },

  // POST /post/create with multipart/form-data
  async create(data: CreatePostDTO): Promise<{ message: string; post: Post }> {
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
    return response.data;
  },

  // PUT /post/:id/update
  async update(id: number, data: UpdatePostDTO): Promise<{ message: string; post: Partial<Post> }> {
    const response = await api.put(`/post/${id}/update`, {
      nombre: data.nombre,
      desc: data.desc,
      price: data.price,
      sede: data.sede,
      tipoP: data.tipoP,
    });
    return response.data;
  },

  // DELETE /post/:id/delete
  async delete(id: number): Promise<{ message: string }> {
    const response = await api.delete(`/post/${id}/delete`);
    return response.data;
  },

  // POST /valoration/send
  async sendValoration(postId: number, valorationText: string): Promise<{ message: string; valoration: Valoration }> {
    const response = await api.post('/valoration/send', {
      postId: postId,
      valoration: valorationText,
    });
    return response.data;
  },
};
