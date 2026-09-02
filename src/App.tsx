import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/context/AuthContext';
import { MarketplaceProvider } from '@/context/MarketplaceContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HomePage } from '@/pages/HomePage';
import { CatalogPage } from '@/pages/CatalogPage';
import { ProductDetailPage } from '@/pages/ProductDetailPage';
import { UserProfilePage } from '@/pages/UserProfilePage';
import { CreatePostPage } from '@/pages/CreatePostPage';
import { MyPostsPage } from '@/pages/MyPostsPage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MarketplaceProvider>
          <div className="flex flex-col min-h-screen bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
            <Toaster
              position="top-right"
              richColors
              closeButton
              theme="light"
            />
            <Navbar />
            <div className="flex-1 flex flex-col">
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/catalog" element={<CatalogPage />} />
                <Route path="/post/:id" element={<ProductDetailPage />} />
                <Route path="/user/:id" element={<UserProfilePage />} />
                <Route path="/profile/:id" element={<UserProfilePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Protected authenticated routes */}
                <Route
                  path="/create"
                  element={
                    <ProtectedRoute>
                      <CreatePostPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/my-posts"
                  element={
                    <ProtectedRoute>
                      <MyPostsPage />
                    </ProtectedRoute>
                  }
                />

                {/* 404 fallback */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </MarketplaceProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
