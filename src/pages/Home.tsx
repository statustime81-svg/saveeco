import { lazy, Suspense } from "react";
import AboutPreview from "../components/home/AboutPreview";
const Certificates = lazy(() => import("../components/home/Certificates"));
const ContactSection = lazy(() => import("../components/home/ContactSection"));
const ContactStrip = lazy(() => import("../components/home/ContactStrip"));
const EnvironmentFacts = lazy(() => import("../components/home/EnvironmentFacts"));
const FAQ = lazy(() => import("../components/home/FAQ"));
const JoinPreview = lazy(() => import("../components/home/JoinPreview"));
const ProductCategories = lazy(() => import("../components/home/ProductCategories"));
const TeamPreview = lazy(() => import("../components/home/TeamPreview"));
const TestimonialsPreview = lazy(() => import("../components/home/TestimonialsPreview"));
const WhyChooseUs = lazy(() => import("../components/home/WhyChooseUs"));
const Footer = lazy(() => import("../components/layout/Footer"));
import Navbar from "../components/layout/Navbar";
import TopBar from "../components/layout/TopBar";
import Hero from "../components/home/Hero";
import CertificationMarquee from "../components/home/CertificationMarquee";
import SEOHead from "../lib/seo";

export default function Home() {
  return (
    <>
      <SEOHead
        title="Organic and Agricultural Solutions"
        description="Explore Save Eco Organic personal care, agricultural products, certifications, partnership opportunities, and responsible choices for a greener everyday."
        path="/"
      />
      <TopBar />
      <Navbar />

      <main id="main-content">
        <Hero />
        <CertificationMarquee />
        <AboutPreview />
        <Suspense fallback={null}>
          <ProductCategories />
          <WhyChooseUs />
          <Certificates />
          <EnvironmentFacts />
          <JoinPreview />
          <TeamPreview />
          <FAQ />
          <TestimonialsPreview />
          <ContactStrip />
          <ContactSection />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
}
