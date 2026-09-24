import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Search,
  Plus,
  LogOut,
  MapPin,
  Menu,
  X,
  User,
  UserCog,
} from 'lucide-react';
import { UDC_SEDES, getBackendImageUrl } from '@/lib/utils';
import { EditProfileDialog } from '@/components/profile/EditProfileDialog';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { filters, updateFilter } = useMarketplace();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [navSearch, setNavSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (navSearch.trim()) {
      navigate(`/catalog?q=${encodeURIComponent(navSearch.trim())}`);
    } else {
      navigate('/catalog');
    }
  };

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/85 dark:bg-[#0b0e1e]/90 backdrop-blur-md border-b border-slate-200/80 dark:border-white/10 shadow-xs dark:shadow-black/40 transition-colors duration-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-3">
        {/* Left: UDC Logo & UDC Marketplace Title */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-3 group transition-transform active:scale-95"
          >
            <img
              src="/udc-logo.png"
              alt="Universidad de Cartagena"
              className="h-9 sm:h-10 w-auto object-contain shrink-0 drop-shadow-xs"
            />
            <div className="flex flex-col">
              <span className="font-aeonik font-black text-lg sm:text-xl text-[#171a3d] dark:text-white leading-none tracking-tight">
                UDC MARKETPLACE
              </span>
              <span className="font-aeonik text-[10px] sm:text-[11px] font-bold tracking-wider text-[#ec8026] uppercase mt-0.5">
                Mercado Universitario
              </span>
            </div>
          </Link>

          {/* Pill Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 ml-2">
            <Link
              to="/"
              className={`h-8 px-4 rounded-full text-xs font-bold flex items-center transition-all ${
                location.pathname === '/'
                  ? 'bg-[#171a3d] dark:bg-white text-white dark:text-[#0b0e1e] shadow-xs'
                  : 'bg-transparent text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10'
              }`}
            >
              Inicio
            </Link>
            <Link
              to="/catalog"
              className={`h-8 px-4 rounded-full text-xs font-bold flex items-center transition-all ${
                location.pathname === '/catalog'
                  ? 'bg-[#171a3d] dark:bg-white text-white dark:text-[#0b0e1e] shadow-xs'
                  : 'bg-transparent text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10'
              }`}
            >
              Catálogo
            </Link>
          </nav>

          {/* Campus selector pill */}
          <div className="hidden xl:flex items-center gap-1.5 h-8 px-3 rounded-full border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-[#11162e] text-xs font-semibold text-[#171a3d] dark:text-slate-200 shadow-2xs">
            <MapPin className="h-3.5 w-3.5 text-[#ec8026] shrink-0" />
            <select
              className="bg-transparent font-bold text-xs text-[#171a3d] dark:text-slate-200 focus:outline-none cursor-pointer"
              value={filters.sede || 'all'}
              onChange={(e) => {
                const val = e.target.value === 'all' ? '' : e.target.value;
                updateFilter('sede', val);
                navigate(`/catalog${val ? `?sede=${encodeURIComponent(val)}` : ''}`);
              }}
            >
              <option value="all" className="dark:bg-[#11162e] dark:text-white">Todos los Campus UDC</option>
              {UDC_SEDES.map((sede) => (
                <option key={sede} value={sede} className="dark:bg-[#11162e] dark:text-white">
                  {sede}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Center Search Pill */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-xs mx-3">
          <div className="relative w-full flex items-center">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
            <Input
              type="text"
              placeholder="Buscar libros, calculadoras..."
              className="w-full !pl-10 !pr-9 h-9 text-xs font-medium rounded-full bg-slate-100 dark:bg-[#11162e] border border-slate-200 hover:border-slate-300 dark:border-white/15 text-[#171a3d] dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus-visible:bg-white dark:focus-visible:bg-[#161b38] focus-visible:border-[#ec8026] focus-visible:ring-1 focus-visible:ring-[#ec8026]/20 transition-all shadow-2xs"
              value={navSearch}
              onChange={(e) => setNavSearch(e.target.value)}
            />
            {navSearch && (
              <button
                type="button"
                onClick={() => setNavSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white p-0.5"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </form>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Theme Switcher Toggle */}
          <ThemeToggle />

          {/* Filled CTA Button in UDC Orange (#ec8026) */}
          <Button
            asChild
            size="sm"
            variant="udc"
            className="h-9 px-3.5 rounded-full font-bold text-xs shadow-sm shadow-[#ec8026]/20 active:scale-95 flex items-center gap-1.5 shrink-0"
          >
            <Link to="/catalog?create=true">
              <Plus className="h-4 w-4 stroke-[2.5]" />
              <span>Publicar</span>
            </Link>
          </Button>

          {/* User Profile / Auth State */}
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="h-9 w-9 rounded-full border border-slate-200 hover:border-slate-300 dark:border-white/15 dark:hover:border-white/30 bg-white dark:bg-[#11162e] flex items-center justify-center p-0.5 focus:outline-none transition-all shadow-2xs hover:shadow-subtle active:scale-95 shrink-0">
                  <Avatar className="h-8 w-8 rounded-full">
                    {user.picture && (
                      <AvatarImage
                        src={getBackendImageUrl(user.picture)}
                        alt={user.title || user.name || 'Avatar'}
                        className="object-cover"
                      />
                    )}
                    <AvatarFallback className="bg-[#171a3d] dark:bg-[#ec8026] text-white text-xs font-bold">
                      {getInitials(user.title || user.name)}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 p-2 bg-white dark:bg-[#11162e] border border-slate-200 dark:border-white/15 rounded-2xl shadow-xl space-y-1 font-aeonik"
              >
                <DropdownMenuLabel className="px-2 py-1.5">
                  <div className="flex flex-col">
                    <p className="text-sm font-bold text-[#171a3d] dark:text-white leading-none">
                      {user.title || user.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-1">
                      {user.mail}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-100 dark:bg-white/10" />
                <DropdownMenuItem asChild>
                  <Link
                    to="/my-posts"
                    className="cursor-pointer text-xs font-bold text-[#171a3d] dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/10 rounded-xl px-2.5 py-1.5"
                  >
                    Mis Publicaciones
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setEditProfileOpen(true)}
                  className="cursor-pointer text-xs font-bold text-[#171a3d] dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/10 rounded-xl px-2.5 py-1.5 flex items-center gap-2"
                >
                  <UserCog className="h-3.5 w-3.5 text-[#ec8026]" />
                  <span>Editar Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-slate-100 dark:bg-white/10" />
                <DropdownMenuItem
                  onClick={logout}
                  className="cursor-pointer text-xs font-bold text-[#df4838] hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl px-2.5 py-1.5"
                >
                  <LogOut className="mr-2 h-3.5 w-3.5" />
                  <span>Cerrar Sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-1.5">
              <Button
                asChild
                size="sm"
                variant="outline"
                className="h-9 px-4 rounded-full text-xs font-bold border-slate-200 hover:border-slate-300 dark:border-white/15 bg-white dark:bg-[#11162e] text-[#171a3d] dark:text-white hover:bg-slate-50 dark:hover:bg-white/10 shadow-2xs flex items-center gap-2 shrink-0"
              >
                <Link to="/login">
                  <User className="h-3.5 w-3.5 text-[#ec8026]" />
                  <span>Ingresar con UDC</span>
                </Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu Trigger */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden h-9 w-9 rounded-full border border-slate-200 dark:border-white/15 bg-white dark:bg-[#11162e] text-[#171a3d] dark:text-white hover:bg-slate-50 dark:hover:bg-white/10 shadow-2xs flex items-center justify-center shrink-0"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Dropdown Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#0b0e1e] px-4 py-4 space-y-3 shadow-xl">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            <Input
              type="text"
              placeholder="Buscar en el catálogo..."
              className="w-full !pl-10 !pr-4 h-10 text-xs font-medium rounded-full bg-slate-100 dark:bg-[#11162e] border border-slate-200 dark:border-white/15 text-[#171a3d] dark:text-white"
              value={navSearch}
              onChange={(e) => setNavSearch(e.target.value)}
            />
          </form>

          <div className="flex flex-col gap-1.5 pt-1 text-sm font-bold">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="h-9 px-4 rounded-xl hover:bg-slate-50 dark:hover:bg-white/10 flex items-center text-[#171a3d] dark:text-white"
            >
              Inicio
            </Link>
            <Link
              to="/catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="h-9 px-4 rounded-xl hover:bg-slate-50 dark:hover:bg-white/10 flex items-center text-[#171a3d] dark:text-white"
            >
              Explorar Catálogo
            </Link>
            <Link
              to="/catalog?create=true"
              onClick={() => setMobileMenuOpen(false)}
              className="h-9 px-4 rounded-xl bg-[#ec8026] text-white flex items-center justify-center gap-2 mt-1 shadow-md shadow-[#ec8026]/20"
            >
              <Plus className="h-4 w-4 stroke-[3]" />
              Publicar Artículo
            </Link>
          </div>
        </div>
      )}

      {/* Edit Profile Dialog */}
      <EditProfileDialog
        open={editProfileOpen}
        onOpenChange={setEditProfileOpen}
      />
    </header>
  );
};
