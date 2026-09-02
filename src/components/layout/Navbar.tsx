import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
  PlusCircle,
  User,
  LogOut,
  MapPin,
  Menu,
  X,
  Package,
  ShoppingBag,
  Home,
} from 'lucide-react';
import { UDC_SEDES } from '@/lib/utils';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { filters, updateFilter } = useMarketplace();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    if (!name) return 'UD';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo with Official UDC Seal */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <div className="h-11 w-11 rounded-2xl bg-white p-1 flex items-center justify-center shadow-md shadow-orange-500/10 group-hover:scale-105 transition-all border border-orange-200/80 shrink-0">
              <img
                src="/udc-logo.png"
                alt="Logo Universidad de Cartagena"
                className="h-full w-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/favicon.svg';
                }}
              />
            </div>
            <div>
              <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-orange-600 via-orange-700 to-stone-900 bg-clip-text text-transparent">
                UDC Marketplace
              </span>
              <span className="block text-[10px] font-bold tracking-wider text-orange-600 uppercase -mt-0.5">
                Universidad de Cartagena
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-bold">
            <Link
              to="/"
              className={`px-3.5 py-2 rounded-full transition-colors flex items-center gap-1.5 ${
                location.pathname === '/'
                  ? 'bg-orange-50 text-orange-700 font-extrabold'
                  : 'text-stone-700 hover:text-orange-600 hover:bg-stone-100'
              }`}
            >
              <Home className="h-3.5 w-3.5" />
              Inicio
            </Link>
            <Link
              to="/catalog"
              className={`px-3.5 py-2 rounded-full transition-colors flex items-center gap-1.5 ${
                location.pathname === '/catalog'
                  ? 'bg-orange-50 text-orange-700 font-extrabold'
                  : 'text-stone-700 hover:text-orange-600 hover:bg-stone-100'
              }`}
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              Catálogo
            </Link>
          </nav>

          {/* Search Bar - Desktop */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-sm lg:max-w-md items-center relative"
          >
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar en el catálogo..."
                className="w-full pl-10 pr-10 h-10 rounded-full border-orange-200/70 bg-orange-50/40 focus:bg-white focus:border-orange-500 transition-all shadow-2xs text-xs"
                value={navSearch}
                onChange={(e) => setNavSearch(e.target.value)}
              />
              {navSearch && (
                <button
                  type="button"
                  onClick={() => setNavSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground bg-stone-200 hover:bg-stone-300 rounded-full p-1 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          </form>

          {/* Sede Selector Quick Filter */}
          <div className="hidden xl:flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
            <select
              className="bg-transparent font-medium text-foreground text-xs focus:outline-none cursor-pointer hover:text-primary transition-colors pr-2"
              value={filters.sede || 'all'}
              onChange={(e) => {
                const val = e.target.value === 'all' ? '' : e.target.value;
                updateFilter('sede', val);
                navigate(`/catalog${val ? `?sede=${encodeURIComponent(val)}` : ''}`);
              }}
            >
              <option value="all">Todas las Sedes</option>
              {UDC_SEDES.map((sede) => (
                <option key={sede} value={sede}>
                  {sede}
                </option>
              ))}
            </select>
          </div>

          {/* Action Buttons & Profile */}
          <div className="flex items-center gap-3">
            <Button
              asChild
              variant="udc"
              size="sm"
              className="hidden sm:inline-flex rounded-full px-4 font-bold"
            >
              <Link to="/create">
                <PlusCircle className="h-4 w-4 mr-1.5" />
                Publicar Anuncio
              </Link>
            </Button>

            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 rounded-full p-1 hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all">
                    <Avatar className="h-9 w-9 border-2 border-primary/40">
                      <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
                        {getInitials(user.title || user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden xl:inline text-xs font-semibold text-foreground max-w-[120px] truncate">
                      {user.title || user.name}
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 p-2 shadow-lg rounded-2xl border-orange-100">
                  <DropdownMenuLabel className="font-normal p-2">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-bold leading-none text-foreground">
                        {user.title || user.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground truncate">
                        {user.mail}
                      </p>
                      <div className="flex items-center gap-1.5 pt-1.5">
                        <span className="inline-block px-2 py-0.5 text-[10px] font-semibold bg-orange-100 text-orange-900 rounded-full">
                          {user.role || 'Estudiante'}
                        </span>
                        <span className="inline-block px-2 py-0.5 text-[10px] font-medium bg-stone-100 text-stone-700 rounded-full truncate">
                          {user.sede || 'UDC'}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to={`/user/${user.id}`} className="cursor-pointer flex items-center py-2">
                      <User className="mr-2 h-4 w-4 text-orange-600" />
                      <span>Mi Perfil Público</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/my-posts" className="cursor-pointer flex items-center py-2">
                      <Package className="mr-2 h-4 w-4 text-primary" />
                      <span>Mis Publicaciones</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/create" className="cursor-pointer flex items-center py-2 sm:hidden">
                      <PlusCircle className="mr-2 h-4 w-4 text-orange-600" />
                      <span>Nuevo Anuncio</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logout}
                    className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10 py-2"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar Sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button asChild variant="ghost" size="sm" className="text-xs font-semibold">
                  <Link to="/login">
                    <User className="h-3.5 w-3.5 mr-1 text-primary" />
                    Ingresar
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm" className="hidden xs:inline-flex text-xs font-semibold rounded-full border-orange-300 text-orange-700 hover:bg-orange-50">
                  <Link to="/register">Registro</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-stone-600 hover:text-foreground hover:bg-orange-50"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search & Menu Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/70 animate-in slide-in-from-top-2 space-y-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar productos o servicios..."
                className="w-full pl-10 pr-4 h-10 rounded-xl bg-orange-50/50"
                value={navSearch}
                onChange={(e) => setNavSearch(e.target.value)}
              />
            </form>

            <div className="flex flex-col gap-1 text-sm font-semibold">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-orange-50"
              >
                <Home className="h-4 w-4 text-orange-600" />
                <span>Inicio</span>
              </Link>
              <Link
                to="/catalog"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-orange-50"
              >
                <ShoppingBag className="h-4 w-4 text-orange-600" />
                <span>Catálogo Completo</span>
              </Link>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <Button asChild variant="udc" className="w-full justify-center">
                <Link to="/create" onClick={() => setMobileMenuOpen(false)}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Publicar Anuncio
                </Link>
              </Button>
              {isAuthenticated && (
                <>
                  <Button asChild variant="outline" className="w-full justify-center">
                    <Link to={`/user/${user?.id}`} onClick={() => setMobileMenuOpen(false)}>
                      <User className="h-4 w-4 mr-2" />
                      Mi Perfil Público
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-center">
                    <Link to="/my-posts" onClick={() => setMobileMenuOpen(false)}>
                      <Package className="h-4 w-4 mr-2" />
                      Mis Publicaciones
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
