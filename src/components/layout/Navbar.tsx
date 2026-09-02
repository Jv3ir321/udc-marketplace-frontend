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
  User,
  LogOut,
  MapPin,
  Menu,
  X,
  Package,
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
    <>
      {/* Full-bleed Marquee Banner (Official UDC Identity) */}
      <div className="w-full bg-[#171a3d] text-[#ffffff] overflow-hidden select-none border-b border-[#171a3d]">
        <div className="animate-slush-marquee py-2 flex items-center whitespace-nowrap text-[12px] font-aeonik font-bold uppercase tracking-[0.032em]">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-6 px-6">
              <span className="tracking-wider">UNIVERSIDAD DE CARTAGENA · FUNDADA EN 1827</span>
              <span className="text-[#f2b725]">★</span>
              <span>UDC MARKETPLACE · MERCADO ESTUDIANTIL OFICIAL</span>
              <span className="text-[#3da898]">●</span>
              <span>CAMPUS SAN AGUSTÍN · PIEDRA DE BOLÍVAR · ZARAGOCILLA · SAN PABLO</span>
              <span className="text-[#df4838]">▲</span>
              <span>100% SIN COMISIONES DIRECTO ENTRE ESTUDIANTES</span>
              <span className="text-[#ec8026]">◆</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Nav Bar */}
      <header className="sticky top-0 z-40 w-full bg-[#ffffff] border-b border-[#171a3d]/20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-3">
          {/* Left: Official UDC Logo & UDC Marketplace Title */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-3 group transition-transform active:scale-95"
            >
              <img
                src="/udc-logo.png"
                alt="Universidad de Cartagena - Escudo Oficial"
                className="h-10 sm:h-12 w-auto object-contain shrink-0"
              />
              <div className="flex flex-col">
                <span className="font-lateral text-2xl sm:text-3xl text-[#171a3d] leading-[0.82] uppercase tracking-normal">
                  UDC MARKETPLACE
                </span>
                <span className="font-aeonik text-[10px] sm:text-[11px] font-bold tracking-[0.032em] text-[#171a3d]/70 uppercase">
                  Universidad de Cartagena · 1827
                </span>
              </div>
            </Link>

            {/* Pill Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1.5 ml-4">
              <Link
                to="/"
                className={`h-9 px-4 rounded-[1600px] border border-[#171a3d] text-[13px] font-aeonik font-bold tracking-[0.032em] flex items-center transition-colors ${
                  location.pathname === '/'
                    ? 'bg-[#171a3d] text-[#ffffff]'
                    : 'bg-[#ffffff] text-[#171a3d] hover:bg-[#edf0f7]'
                }`}
              >
                Inicio
              </Link>
              <Link
                to="/catalog"
                className={`h-9 px-4 rounded-[1600px] border border-[#171a3d] text-[13px] font-aeonik font-bold tracking-[0.032em] flex items-center transition-colors ${
                  location.pathname === '/catalog'
                    ? 'bg-[#171a3d] text-[#ffffff]'
                    : 'bg-[#ffffff] text-[#171a3d] hover:bg-[#edf0f7]'
                }`}
              >
                Explorar Catálogo
              </Link>
            </nav>

            {/* Campus selector pill */}
            <div className="hidden xl:flex items-center gap-1.5 h-9 px-3 rounded-[1600px] border border-[#171a3d] bg-[#ffffff] text-xs font-aeonik font-bold text-[#171a3d]">
              <MapPin className="h-3.5 w-3.5 text-[#df4838] shrink-0" />
              <select
                className="bg-transparent font-aeonik font-bold text-xs text-[#171a3d] focus:outline-none cursor-pointer tracking-[0.030em]"
                value={filters.sede || 'all'}
                onChange={(e) => {
                  const val = e.target.value === 'all' ? '' : e.target.value;
                  updateFilter('sede', val);
                  navigate(`/catalog${val ? `?sede=${encodeURIComponent(val)}` : ''}`);
                }}
              >
                <option value="all">Todos los Campus</option>
                {UDC_SEDES.map((sede) => (
                  <option key={sede} value={sede}>
                    Campus {sede}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Center Search Input */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden sm:flex items-center relative w-48 md:w-64 lg:w-72"
          >
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#171a3d]/60" />
              <Input
                type="text"
                placeholder="Buscar artículos o libros..."
                className="w-full pl-9 pr-8 h-9 text-xs font-aeonik font-medium rounded-[1600px] bg-[#ffffff] border border-[#171a3d] text-[#171a3d] placeholder:text-[#171a3d]/50 focus-visible:bg-[#edf0f7] focus-visible:ring-0 focus-visible:border-[#171a3d] transition-colors"
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
            {/* Filled CTA Button ('Publicar') */}
            <Button
              asChild
              size="sm"
              className="h-9 px-4 rounded-[1600px] bg-[#171a3d] hover:bg-[#252a5c] text-[#ffffff] font-aeonik font-bold text-[13px] tracking-[0.032em] border border-[#171a3d] transition-transform active:scale-95"
            >
              <Link to="/create">
                <Plus className="h-4 w-4 mr-1 stroke-[3]" />
                Publicar
              </Link>
            </Button>

            {/* Quick Action circular button */}
            <Link
              to="/catalog"
              title="Ver todo"
              className="h-9 w-9 rounded-[1600px] border border-[#171a3d] bg-[#ffffff] hover:bg-[#edf0f7] flex items-center justify-center text-[#171a3d] transition-colors"
            >
              <Sparkles className="h-4 w-4 text-[#f2b725] fill-[#f2b725]" />
            </Link>

            {/* User Profile / Auth State */}
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="h-9 w-9 rounded-[1600px] border border-[#171a3d] bg-[#ffffff] flex items-center justify-center overflow-hidden focus:outline-none hover:bg-[#edf0f7]">
                    <Avatar className="h-8 w-8 rounded-[1600px]">
                      <AvatarFallback className="bg-[#44216b] text-[#ffffff] text-xs font-aeonik font-bold">
                        {getInitials(user.title || user.name)}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 p-2 bg-[#ffffff] border border-[#171a3d] rounded-[20px] shadow-none space-y-1"
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
                      to={`/user/${user.id}`}
                      className="cursor-pointer font-aeonik text-xs font-medium rounded-[1600px] px-2.5 py-1.5 hover:bg-[#edf0f7]"
                    >
                      <User className="mr-2 h-3.5 w-3.5 text-[#171a3d]" />
                      <span>Mi Perfil Estudiantil</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/my-posts"
                      className="cursor-pointer font-aeonik text-xs font-medium rounded-[1600px] px-2.5 py-1.5 hover:bg-[#edf0f7]"
                    >
                      <Package className="mr-2 h-3.5 w-3.5 text-[#171a3d]" />
                      <span>Mis Artículos Publicados</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-[#171a3d]/15" />
                  <DropdownMenuItem
                    onClick={logout}
                    className="cursor-pointer font-aeonik text-xs font-bold text-[#df4838] hover:bg-[#df4838]/10 rounded-[1600px] px-2.5 py-1.5"
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
                  variant="ghost"
                  size="sm"
                  className="h-9 px-3 rounded-[1600px] border border-[#171a3d] bg-[#ffffff] hover:bg-[#edf0f7] text-[#171a3d] text-xs font-aeonik font-bold tracking-[0.032em]"
                >
                  <Link to="/login">Entrar</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="hidden xs:inline-flex h-9 px-3 rounded-[1600px] border border-[#171a3d] bg-[#f2b725] hover:bg-[#e0a61a] text-[#171a3d] text-xs font-aeonik font-bold tracking-[0.032em]"
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
                className="h-10 px-4 rounded-[1600px] border border-[#171a3d] bg-[#171a3d] text-[#ffffff] flex items-center justify-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Publicar Artículo
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
