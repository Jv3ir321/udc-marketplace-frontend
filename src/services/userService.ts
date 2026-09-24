import api from './api';
import { PublicUserProfile, Post, Valoration, User, UpdateProfileDTO } from '@/types';
import { postService } from './postService';

export const userService = {
  async getUserProfile(id: number): Promise<PublicUserProfile | null> {
    try {
      const response = await api.get(`/user/${id}`);
      if (response.data) {
        return response.data;
      }
    } catch (err) {
      console.warn(`Could not fetch user ${id} from backend, fallback to local data`, err);
    }

    // Local Fallback synthesis
    const allPosts: Post[] = await postService.getAll();
    const userPosts = allPosts.filter((p) => p.userId === id);
    
    // Find user details from post or local storage
    const firstPost = userPosts[0];
    const currentUser = JSON.parse(localStorage.getItem('udc_current_user') || '{}');
    
    const isCurrentUser = currentUser.id === id;
    const baseUser = isCurrentUser ? currentUser : (firstPost?.user || {
      id: id,
      title: 'Estudiante UDC',
      name: 'Estudiante UDC',
      mail: `estudiante${id}@unicartagena.edu.co`,
      sede: firstPost?.sede || 'Claustro San Agustín',
      role: 'Estudiante',
      cellphone: '3001234567',
      picture: '',
    });

    const receivedValorations: Valoration[] = [];
    userPosts.forEach((p) => {
      if (p.valorations) {
        receivedValorations.push(...p.valorations);
      }
    });

    return {
      id: baseUser.id || id,
      title: baseUser.title || baseUser.name || 'Estudiante UDC',
      name: baseUser.name || baseUser.title,
      mail: baseUser.mail || `estudiante${id}@unicartagena.edu.co`,
      sede: baseUser.sede || firstPost?.sede || 'Claustro San Agustín',
      role: baseUser.role || 'Estudiante',
      cellphone: baseUser.cellphone || '',
      picture: baseUser.picture || '',
      created_at: baseUser.created_at || new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
      postsCount: userPosts.length,
      ratingAvg: 4.9,
      ratingCount: receivedValorations.length > 0 ? receivedValorations.length : 3,
      posts: userPosts,
      receivedValorations: receivedValorations,
    };
  },

  async updateProfile(data: UpdateProfileDTO | FormData): Promise<User> {
    let response;
    if (data instanceof FormData) {
      response = await api.put('/user/profile', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } else {
      response = await api.put('/user/profile', data);
    }

    const updatedUser = response.data?.user || response.data;
    if (updatedUser) {
      localStorage.setItem('udc_current_user', JSON.stringify(updatedUser));
      if (updatedUser.sede) localStorage.setItem('udc_user_sede', updatedUser.sede);
      if (updatedUser.cellphone) localStorage.setItem('udc_user_phone', updatedUser.cellphone);
      if (updatedUser.picture) localStorage.setItem('udc_user_picture', updatedUser.picture);
    }
    return updatedUser;
  },
};
