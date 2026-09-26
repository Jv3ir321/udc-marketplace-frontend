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
  'Claustro San Agustín',
  'Sede Zaragocilla',
  'Sede Piedra de Bolívar',
  'Sede San Pablo',
] as const;

export const formatCampusName = (sede?: string): string => {
  if (!sede) return '';
  const s = sede.trim();
  if (s.toLowerCase().includes('agustín') || s.toLowerCase().includes('agustin')) {
    return 'Claustro San Agustín';
  }
  if (s.toLowerCase().startsWith('sede ') || s.toLowerCase().startsWith('claustro ')) {
    return s;
  }
  return `Sede ${s}`;
};

export const CATEGORIAS_PRODUCTO = [
  'Libros y Fotocopias',
  'Calculadoras y Tecnología',
  'Uniformes y Batas',
  'Servicios y Tutorías',
  'Snacks y Alimentación',
  'Instrumentos y Salud',
  'Otros',
] as const;

export interface CategoryMeta {
  name: string;
  shortName: string;
  color: string;
  // Light Mode Badges
  badgeLight: string;
  // Dark Mode Badges
  badgeDark: string;
  // Landing Page Card
  cardLight: string;
  cardDark: string;
  // Icon styling
  iconBgLight: string;
  iconBgDark: string;
  iconColor: string;
  desc: string;
}

export const CATEGORY_CONFIG: Record<string, CategoryMeta> = {
  'Libros y Fotocopias': {
    name: 'Libros y Fotocopias',
    shortName: 'Libros',
    color: '#ea580c',
    badgeLight: 'bg-orange-50 text-orange-800 border-orange-200/80',
    badgeDark: 'dark:bg-orange-950/60 dark:text-orange-300 dark:border-orange-800/50',
    cardLight: 'bg-white hover:bg-slate-50/70 border-slate-200/90 hover:border-slate-300 shadow-elevation hover:shadow-lifted',
    cardDark: 'dark:bg-[#11162e] dark:hover:bg-[#151a36] dark:border-white/10 dark:hover:border-white/20',
    iconBgLight: 'bg-orange-50 text-orange-600 border border-orange-200/60',
    iconBgDark: 'dark:bg-orange-950/80 dark:text-orange-300 dark:border-orange-800/40',
    iconColor: 'text-orange-600 dark:text-orange-400',
    desc: 'Guías, libros de texto y apuntes',
  },
  'Calculadoras y Tecnología': {
    name: 'Calculadoras y Tecnología',
    shortName: 'Tecnología',
    color: '#4f46e5',
    badgeLight: 'bg-indigo-50 text-indigo-800 border-indigo-200/80',
    badgeDark: 'dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800/50',
    cardLight: 'bg-white hover:bg-slate-50/70 border-slate-200/90 hover:border-slate-300 shadow-elevation hover:shadow-lifted',
    cardDark: 'dark:bg-[#11162e] dark:hover:bg-[#151a36] dark:border-white/10 dark:hover:border-white/20',
    iconBgLight: 'bg-indigo-50 text-indigo-600 border border-indigo-200/60',
    iconBgDark: 'dark:bg-indigo-950/80 dark:text-indigo-300 dark:border-indigo-800/40',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
    desc: 'Calculadoras, periféricos y tablets',
  },
  'Uniformes y Batas': {
    name: 'Uniformes y Batas',
    shortName: 'Uniformes',
    color: '#059669',
    badgeLight: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
    badgeDark: 'dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800/50',
    cardLight: 'bg-white hover:bg-slate-50/70 border-slate-200/90 hover:border-slate-300 shadow-elevation hover:shadow-lifted',
    cardDark: 'dark:bg-[#11162e] dark:hover:bg-[#151a36] dark:border-white/10 dark:hover:border-white/20',
    iconBgLight: 'bg-emerald-50 text-emerald-600 border border-emerald-200/60',
    iconBgDark: 'dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-800/40',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    desc: 'Batas de laboratorio y salud',
  },
  'Servicios y Tutorías': {
    name: 'Servicios y Tutorías',
    shortName: 'Tutorías',
    color: '#7c3aed',
    badgeLight: 'bg-purple-50 text-purple-800 border-purple-200/80',
    badgeDark: 'dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800/50',
    cardLight: 'bg-white hover:bg-slate-50/70 border-slate-200/90 hover:border-slate-300 shadow-elevation hover:shadow-lifted',
    cardDark: 'dark:bg-[#11162e] dark:hover:bg-[#151a36] dark:border-white/10 dark:hover:border-white/20',
    iconBgLight: 'bg-purple-50 text-purple-600 border border-purple-200/60',
    iconBgDark: 'dark:bg-purple-950/80 dark:text-purple-300 dark:border-purple-800/40',
    iconColor: 'text-purple-600 dark:text-purple-400',
    desc: 'Clases particulares y asesorías',
  },
  'Snacks y Alimentación': {
    name: 'Snacks y Alimentación',
    shortName: 'Snacks',
    color: '#d97706',
    badgeLight: 'bg-amber-50 text-amber-800 border-amber-200/80',
    badgeDark: 'dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800/50',
    cardLight: 'bg-white hover:bg-slate-50/70 border-slate-200/90 hover:border-slate-300 shadow-elevation hover:shadow-lifted',
    cardDark: 'dark:bg-[#11162e] dark:hover:bg-[#151a36] dark:border-white/10 dark:hover:border-white/20',
    iconBgLight: 'bg-amber-50 text-amber-600 border border-amber-200/60',
    iconBgDark: 'dark:bg-amber-950/80 dark:text-amber-300 dark:border-amber-800/40',
    iconColor: 'text-amber-600 dark:text-amber-400',
    desc: 'Snacks, postres y comida en campus',
  },
  'Instrumentos y Salud': {
    name: 'Instrumentos y Salud',
    shortName: 'Salud',
    color: '#0d9488',
    badgeLight: 'bg-teal-50 text-teal-800 border-teal-200/80',
    badgeDark: 'dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800/50',
    cardLight: 'bg-white hover:bg-slate-50/70 border-slate-200/90 hover:border-slate-300 shadow-elevation hover:shadow-lifted',
    cardDark: 'dark:bg-[#11162e] dark:hover:bg-[#151a36] dark:border-white/10 dark:hover:border-white/20',
    iconBgLight: 'bg-teal-50 text-teal-600 border border-teal-200/60',
    iconBgDark: 'dark:bg-teal-950/80 dark:text-teal-300 dark:border-teal-800/40',
    iconColor: 'text-teal-600 dark:text-teal-400',
    desc: 'Fonendos, tensiómetros e insumos',
  },
  'Otros': {
    name: 'Otros',
    shortName: 'Otros',
    color: '#475569',
    badgeLight: 'bg-slate-100 text-slate-800 border-slate-300/80',
    badgeDark: 'dark:bg-slate-800/80 dark:text-slate-200 dark:border-slate-700/60',
    cardLight: 'bg-white hover:bg-slate-50/70 border-slate-200/90 hover:border-slate-300 shadow-elevation hover:shadow-lifted',
    cardDark: 'dark:bg-[#11162e] dark:hover:bg-[#151a36] dark:border-white/10 dark:hover:border-white/20',
    iconBgLight: 'bg-slate-100 text-slate-600 border border-slate-200/80',
    iconBgDark: 'dark:bg-slate-800 dark:text-slate-300 dark:border-white/10',
    iconColor: 'text-slate-600 dark:text-slate-400',
    desc: 'Accesorios y otros artículos',
  },
};

export function getCategoryMeta(name?: string): CategoryMeta {
  if (!name) return CATEGORY_CONFIG['Otros'];
  const found = Object.entries(CATEGORY_CONFIG).find(([k]) =>
    k.toLowerCase().trim() === name.toLowerCase().trim()
  );
  if (found) return found[1];
  return {
    name: name,
    shortName: name,
    color: '#475569',
    badgeLight: 'bg-slate-100 text-slate-800 border-slate-300/80',
    badgeDark: 'dark:bg-slate-800/80 dark:text-slate-200 dark:border-slate-700/60',
    cardLight: 'bg-white hover:bg-slate-50/70 border-slate-200/90 hover:border-slate-300 shadow-elevation hover:shadow-lifted',
    cardDark: 'dark:bg-[#11162e] dark:hover:bg-[#151a36] dark:border-white/10 dark:hover:border-white/20',
    iconBgLight: 'bg-slate-100 text-slate-600 border border-slate-200/80',
    iconBgDark: 'dark:bg-slate-800 dark:text-slate-300 dark:border-white/10',
    iconColor: 'text-slate-600 dark:text-slate-400',
    desc: 'Publicación general UDC',
  };
}

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

  // Prepend backend URL
  const apiBase = getApiBaseUrl();
  const cleanUrl = url.startsWith('/') ? url : `/${url}`;
  return `${apiBase}${cleanUrl}`;
}

export function getApiBaseUrl(): string {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  if (
    typeof window !== 'undefined' &&
    window.location.hostname !== 'localhost' &&
    window.location.hostname !== '127.0.0.1'
  ) {
    return 'https://api.udcmarketplace.lat';
  }
  return 'http://localhost:4000';
}
