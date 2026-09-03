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
  Plus,
  LogOut,
  MapPin,
  Menu,
  X,
  Sparkles,
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
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#faf8f5]/95 backdrop-blur-md border-b border-[#171a3d]/10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-3">
        {/* Left: UDC Logo & UDC Marketplace Title */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-3 group transition-transform active:scale-95"
          >
            <img
              src="/udc-logo.png"
              alt="Universidad de Cartagena - Marketplace Estudiantil"
              className="h-10 sm:h-11 w-auto object-contain shrink-0"
            />
            <div className="flex flex-col">
              <span className="font-aeonik font-black text-xl sm:text-2xl text-[#171a3d] leading-[1.0] uppercase tracking-tight">
                UDC MARKETPLACE
              </span>
              <span className="font-aeonik text-[10px] sm:text-[11px] font-bold tracking-[0.04em] text-[#ec8026] uppercase">
                Mercado Estudiantil
              </span>
            </div>
          </Link>

          {/* Pill Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 ml-4">
            <Link
              to="/"
              className={`h-9 px-4 rounded-full text-[13px] font-aeonik font-bold tracking-[0.02em] flex items-center transition-colors ${
                location.pathname === '/'
                  ? 'bg-[#171a3d] text-[#ffffff]'
                  : 'bg-[#ffffff] text-[#171a3d] border border-[#171a3d]/15 hover:bg-[#edf0f7]'
              }`}
            >
              Inicio
            </Link>
            <Link
              to="/catalog"
              className={`h-9 px-4 rounded-full text-[13px] font-aeonik font-bold tracking-[0.02em] flex items-center transition-colors ${
                location.pathname === '/catalog'
                  ? 'bg-[#171a3d] text-[#ffffff]'
                  : 'bg-[#ffffff] text-[#171a3d] border border-[#171a3d]/15 hover:bg-[#edf0f7]'
              }`}
            >
              Explorar Catálogo
            </Link>
          </nav>

          {/* Campus selector pill */}
          <div className="hidden xl:flex items-center gap-1.5 h-9 px-3 rounded-full border border-[#171a3d]/15 bg-[#ffffff] text-xs font-aeonik font-bold text-[#171a3d]">
            <MapPin className="h-3.5 w-3.5 text-[#ec8026] shrink-0" />
            <select
              className="bg-transparent font-aeonik font-bold text-xs text-[#171a3d] focus:outline-none cursor-pointer tracking-[0.030em]"
              value={filters.sede || 'all'}
              onChange={(e) => {
                const val = e.target.value === 'all' ? '' : e.target.value;
                updateFilter('sede', val);
                navigate(`/catalog${val ? `?sede=${encodeURIComponent(val)}` : ''}`);
              }}
            >
              <option value="all">Claustro y Sedes</option>
              {UDC_SEDES.map((sede) => (
                <option key={sede} value={sede}>
                  {sede}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Center Search Pill */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-xs mx-3">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#171a3d]/60" />
            <Input
              type="text"
              placeholder="Buscar artículos o libros..."
              className="w-full pl-9 pr-8 h-9 text-xs font-aeonik font-medium rounded-full bg-[#ffffff] border border-[#171a3d]/15 text-[#171a3d] placeholder:text-[#171a3d]/50 focus-visible:bg-[#edf0f7] focus-visible:ring-0 focus-visible:border-[#171a3d] transition-colors"
              value={navSearch}
              onChange={(e) => setNavSearch(e.target.value)}
            />
            {navSearch && (
              <button
                type="button"
                onClick={() => setNavSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#171a3d]/60 hover:text-[#171a3d]"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </form>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Filled CTA Button in Vibrant Orange (#ec8026) */}
          <Button
            asChild
            size="sm"
            className="h-9 px-4 rounded-full bg-[#ec8026] hover:bg-[#d97018] text-[#ffffff] font-aeonik font-bold text-[13px] tracking-[0.02em] transition-transform active:scale-95 shadow-sm shadow-[#ec8026]/20"
          >
            <Link to="/create">
              <Plus className="h-4 w-4 mr-1 stroke-[3]" />
              Publicar
            </Link>
          </Button>

          {/* Quick Action circular button in Dark Navy (#171a3d) */}
          <Link
            to="/catalog"
            title="Ver catálogo"
            className="h-9 w-9 rounded-full bg-[#171a3d] hover:bg-[#252a5c] flex items-center justify-center text-[#ffffff] transition-colors shadow-sm"
          >
            <Sparkles className="h-4 w-4 text-[#ec8026] fill-[#ec8026]" />
          </Link>

          {/* User Profile / Auth State */}
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="h-9 w-9 rounded-full border border-[#171a3d]/20 bg-[#ffffff] flex items-center justify-center overflow-hidden focus:outline-none hover:bg-[#edf0f7]">
                  <Avatar className="h-8 w-8 rounded-full">
                    <AvatarFallback className="bg-[#44216b] text-[#ffffff] text-xs font-aeonik font-bold">
                      {getInitials(user.title || user.name)}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 p-2 bg-[#ffffff] border border-[#171a3d]/20 rounded-2xl shadow-md space-y-1"
              >
                <DropdownMenuLabel className="font-aeonik px-2 py-1.5">
                  <div className="flex flex-col">
                    <p className="text-sm font-bold text-[#171a3d] leading-none">
                      {user.title || user.name}
                    </p>
                    <p className="text-xs text-[#171a3d]/60 truncate mt-1">
                      {user.mail}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-[#171a3d]/15" />
                <DropdownMenuItem asChild>
                  <Link
                    to="/my-posts"
                    className="cursor-pointer font-aeonik text-xs font-bold text-[#171a3d] hover:bg-[#edf0f7] rounded-full px-2.5 py-1.5"
                  >
                    Mis Publicaciones
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-[#171a3d]/15" />
                <DropdownMenuItem
                  onClick={logout}
                  className="cursor-pointer font-aeonik text-xs font-bold text-[#df4838] hover:bg-[#df4838]/10 rounded-full px-2.5 py-1.5"
                >
                  <LogOut className="mr-2 h-3.5 w-3.5" />
                  <span>Cerrar Sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-1.5">
              {/* Dark Navy Pill Button */}
              <Button
                asChild
                size="sm"
                className="h-9 px-4 rounded-full bg-[#171a3d] hover:bg-[#252a5c] text-[#ffffff] text-xs font-aeonik font-bold tracking-[0.02em] shadow-sm"
              >
                <Link to="/login">Entrar</Link>
              </Button>
              {/* Deep Purple Pill Button */}
              <Button
                asChild
                size="sm"
                className="hidden xs:inline-flex h-9 px-4 rounded-full bg-[#44216b] hover:bg-[#341853] text-[#ffffff] text-xs font-aeonik font-bold tracking-[0.02em] shadow-sm"
              >
                <Link to="/register">Registro</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu Trigger */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden h-9 w-9 rounded-[1600px] border border-[#171a3d] bg-[#ffffff] text-[#171a3d] hover:bg-[#edf0f7]"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4 text-[#171a3d]" />}
          </Button>
        </div>
      </div>

      {/* Mobile Dropdown Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#171a3d] bg-[#edf0f7] px-4 py-4 space-y-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#171a3d]/60" />
            <Input
              type="text"
              placeholder="Buscar en el catálogo..."
              className="w-full pl-9 pr-3 h-10 text-xs font-aeonik font-medium rounded-[1600px] bg-[#ffffff] border border-[#171a3d] text-[#171a3d]"
              value={navSearch}
              onChange={(e) => setNavSearch(e.target.value)}
            />
          </form>

          <div className="flex flex-col gap-2 pt-1 font-aeonik font-bold text-sm">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="h-10 px-4 rounded-[1600px] border border-[#171a3d] bg-[#ffffff] flex items-center text-[#171a3d]"
            >
              Inicio
            </Link>
            <Link
              to="/catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="h-10 px-4 rounded-[1600px] border border-[#171a3d] bg-[#ffffff] flex items-center text-[#171a3d]"
            >
              Explorar Catálogo Completo
            </Link>
            <Link
              to="/create"
              onClick={() => setMobileMenuOpen(false)}
              className="h-10 px-4 rounded-[1600px] border border-[#171a3d] bg-[#ec8026] text-[#ffffff] flex items-center justify-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Publicar Artículo
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
