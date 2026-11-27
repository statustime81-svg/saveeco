import { lazy, Suspense, useLayoutEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import ProtectedRoute from "./routes/ProtectedRoute";
import { queryClient } from "./lib/queryClient";
import InitialLoadingScreen from "./components/ui/InitialLoadingScreen";



const Products = lazy(() => import("./pages/Products"));
const ProductCategory = lazy(() => import("./pages/ProductCategory"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const About = lazy(() => import("./pages/About"));
const Leadership = lazy(() => import("./pages/Leadership"));
const Team = lazy(() => import("./pages/Team"));
const Legal = lazy(() => import("./pages/Legal"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Join = lazy(() => import("./pages/Join"));
const Contact = lazy(() => import("./pages/Contact"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Certificates = lazy(() => import("./pages/Certificates"));
const CertificateDetail = lazy(() => import("./pages/CertificateDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminBanners = lazy(() => import("./pages/admin/Banners"));
const AdminCategories = lazy(() => import("./pages/admin/Categories"));
const AdminProducts = lazy(() => import("./pages/admin/Products"));
const AdminGallery = lazy(() => import("./pages/admin/Gallery"));
const AdminTeam = lazy(() => import("./pages/admin/Team"));
const AdminTestimonials = lazy(() => import("./pages/admin/Testimonials"));
const AdminFAQs = lazy(() => import("./pages/admin/FAQs"));
const AdminCertificates = lazy(() => import("./pages/admin/Certificates"));
const AdminSiteStats = lazy(() => import("./pages/admin/SiteStats"));
const AdminSiteSettings = lazy(() => import("./pages/admin/SiteSettings"));
const AdminEnquiryLeads = lazy(() => import("./pages/admin/EnquiryLeads"));
const AdminPartnerLeads = lazy(() => import("./pages/admin/PartnerLeads"));
const AdminLayout = lazy(() => import("./components/layout/AdminLayout"));

function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <a
          href="#main-content"
          className="fixed left-4 top-3 z-[100] -translate-y-20 rounded-lg bg-white px-4 py-3 text-sm font-bold text-[#173b25] shadow-lg transition-transform focus:translate-y-0"
        >
          Skip to main content
        </a>
        <ScrollToTop />
        <InitialLoadingScreen />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/about" element={<About />} />
            <Route path="/about/leadership" element={<Leadership />} />
            <Route path="/about/team" element={<Team />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />

            <Route path="/products" element={<Products />} />
            <Route path="/products/:category" element={<ProductCategory />} />
            <Route path="/products/:category/:slug" element={<ProductDetail />} />

            <Route path="/join" element={<Join />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/certificates/:id" element={<CertificateDetail />} />

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
              <Route index element={<AdminDashboard />} />
              <Route path="banners" element={<AdminBanners />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="gallery" element={<AdminGallery />} />
              <Route path="team" element={<AdminTeam />} />
              <Route path="testimonials" element={<AdminTestimonials />} />
              <Route path="faqs" element={<AdminFAQs />} />
              <Route path="certificates" element={<AdminCertificates />} />
              <Route path="stats" element={<AdminSiteStats />} />
              <Route path="settings" element={<AdminSiteSettings />} />
              <Route path="enquiries" element={<AdminEnquiryLeads />} />
              <Route path="partners" element={<AdminPartnerLeads />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
