export interface User {
  id: number;
  title?: string;
  name?: string;
  mail: string;
  sede: string;
  role: string;
  cellphone: string;
  picture?: string;
  created_at?: string;
}

export interface PostIMG {
  id?: number;
  imageURL: string;
  postId?: number;
  created_at?: string;
}

export interface Valoration {
  id: number;
  valoration: string;
  rating?: number;
  postId: number;
  userId: number;
  user?: User;
  created_at?: string;
}

export interface Post {
  id: number;
  nombre: string;
  desc: string;
  price: string | number;
  sede: string;
  tipoP: string;
  userId: number;
  user?: User;
  postIMGs?: PostIMG[];
  imagenes?: string[];
  valorations?: Valoration[];
  created_at?: string;
  updated_at?: string;
}

export interface PublicUserProfile {
  id: number;
  title: string;
  name?: string;
  mail: string;
  sede: string;
  role: string;
  cellphone: string;
  picture?: string;
  created_at?: string;
  postsCount: number;
  ratingAvg: number;
  ratingCount: number;
  posts: Post[];
  receivedValorations: Valoration[];
}

export interface UserProfile {
  id: number;
  title?: string;
  name?: string;
  mail?: string;
  sede?: string;
  role?: string;
  cellphone?: string;
  picture?: string;
  created_at?: string;
  postsCount?: number;
  ratingAvg?: number;
  ratingCount?: number;
  posts?: Post[];
  receivedValorations?: Valoration[];
}

export interface CreatePostDTO {
  nombre: string;
  desc: string;
  price: string | number;
  sede: string;
  tipoP: string;
  images: File[];
}

export interface UpdatePostDTO {
  nombre: string;
  desc: string;
  price: string | number;
  sede: string;
  tipoP: string;
}

export interface RegisterDTO {
  title: string;
  mail: string;
  password: string;
  sede: string;
  role?: string;
  cellphone: string;
  picture?: string;
}

export interface UpdateProfileDTO {
  name?: string;
  title?: string;
  sede?: string;
  cellphone?: string;
  picture?: string;
  avatar?: File;
}

export interface LoginDTO {
  mail: string;
  password: string;
}

export interface JWTPayload {
  user_id: number;
  username: string;
  exp: number;
}

export interface FilterState {
  search: string;
  sede: string;
  category: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy: 'latest' | 'price-asc' | 'price-desc';
}
