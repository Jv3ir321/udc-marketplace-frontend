import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCOP(amount: string | number): string {
  const num = typeof amount === 'string' ? parseFloat(amount.replace(/[^0-9.-]+/g, '')) : amount;
  if (isNaN(num)) {
    return typeof amount === 'string' && amount ? amount : '$ 0';
  }
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(num);
}

export function formatDate(dateString?: string): string {
  if (!dateString) return 'Reciente';
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-CO', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  } catch {
    return 'Reciente';
  }
}

export const UDC_SEDES = [
  'Zaragocilla',
  'San Agustín',
  'Piedra de Bolívar',
  'San Pablo',
  'Ceres Turbaco',
  'Ceres Magangué',
  'Ceres Carmen de Bolívar',
  'Otra / Virtual',
] as const;

export const CATEGORIAS_PRODUCTO = [
  'Libros y Fotocopias',
  'Calculadoras y Tecnología',
  'Uniformes y Batas',
  'Servicios y Tutorías',
  'Habitaciones y Alquiler',
  'Snacks y Alimentación',
  'Instrumentos y Salud',
  'Otros',
] as const;

export const ROLES_UDC = [
  'Estudiante',
  'Docente',
  'Egresado',
  'Administrativo',
] as const;

export function getSedeBadgeColor(sede: string): string {
  switch (sede?.toLowerCase()) {
    case 'zaragocilla':
      return 'bg-emerald-50 text-emerald-800 border-emerald-200';
    case 'san agustín':
    case 'san agustin':
      return 'bg-orange-100 text-orange-900 border-orange-200';
    case 'piedra de bolívar':
    case 'piedra de bolivar':
      return 'bg-amber-100 text-amber-900 border-amber-200';
    case 'san pablo':
      return 'bg-rose-100 text-rose-900 border-rose-200';
    default:
      return 'bg-stone-100 text-stone-800 border-stone-200';
  }
}

export function getBackendImageUrl(url?: string): string {
  if (!url || typeof url !== 'string' || url.trim() === '') {
    return 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80';
  }
  
  // If it's already a full URL, blob URL, or data URL, return directly
  if (
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('blob:') ||
    url.startsWith('data:')
  ) {
    return url;
  }

  // Prepend backend URL (default http://localhost:4000)
  const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:4000';
  const cleanUrl = url.startsWith('/') ? url : `/${url}`;
  return `${apiBase}${cleanUrl}`;
}
