import { lazy, Suspense, useEffect, type ReactNode } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { SettingsProvider } from '@/context/SettingsContext';
import { CartProvider } from '@/context/CartContext';
import { ToastProvider } from '@/context/ToastContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MiniCart } from '@/components/MiniCart';
import { OrderFloat } from '@/components/layout/OrderFloat';
import { HomePage } from '@/pages/HomePage';
import { ServicesPage } from '@/pages/ServicesPage';
import { CategoryPage } from '@/pages/CategoryPage';
import { ServicePage } from '@/pages/ServicePage';
import { AboutPage } from '@/pages/AboutPage';
import { ReviewsPage } from '@/pages/ReviewsPage';
import { GalleryPage } from '@/pages/GalleryPage';
import { ContactPage } from '@/pages/ContactPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { usePageView } from '@/hooks/usePageView';

const AdminApp = lazy(() => import('@/admin/AdminApp'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

function SiteChrome({ children }: { children: ReactNode }) {
  usePageView();
  return (
    <>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
      <MiniCart />
      <OrderFloat />
    </>
  );
}

function LoadingScreen() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-coal">
      <span className="font-display text-4xl font-extrabold uppercase tracking-tightest text-chalk">
        Re<span className="text-forge-400">build</span>
      </span>
      <span className="h-1 w-24 overflow-hidden bg-white/10">
        <span className="block h-full w-1/2 animate-pulse-bar bg-forge-400" />
      </span>
    </div>
  );
}

const ROUTER_BASENAME = import.meta.env.BASE_URL.replace(/\/$/, '');

export default function App() {
  return (
    <BrowserRouter basename={ROUTER_BASENAME}>
      <SettingsProvider>
        <ToastProvider>
          <CartProvider>
            <ScrollToTop />
            <Suspense fallback={<LoadingScreen />}>
              <Routes>
                <Route path="/" element={<SiteChrome><HomePage /></SiteChrome>} />
                <Route path="/programs" element={<SiteChrome><ServicesPage /></SiteChrome>} />
                <Route path="/discipline/:slug" element={<SiteChrome><CategoryPage /></SiteChrome>} />
                <Route path="/program/:slug" element={<SiteChrome><ServicePage /></SiteChrome>} />
                <Route path="/about" element={<SiteChrome><AboutPage /></SiteChrome>} />
                <Route path="/reviews" element={<SiteChrome><ReviewsPage /></SiteChrome>} />
                <Route path="/gallery" element={<SiteChrome><GalleryPage /></SiteChrome>} />
                <Route path="/contact" element={<SiteChrome><ContactPage /></SiteChrome>} />

                <Route path="/admin/*" element={<AdminApp />} />

                {/* Paths saved from the old site or shared links. */}
                <Route path="/services" element={<Navigate to="/programs" replace />} />
                <Route path="/service/:slug" element={<Navigate to="/programs" replace />} />
                <Route path="/category/:slug" element={<Navigate to="/programs" replace />} />
                <Route path="/shop" element={<Navigate to="/programs" replace />} />

                <Route path="*" element={<SiteChrome><NotFoundPage /></SiteChrome>} />
              </Routes>
            </Suspense>
          </CartProvider>
        </ToastProvider>
      </SettingsProvider>
    </BrowserRouter>
  );
}
