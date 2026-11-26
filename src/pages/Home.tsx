import AboutPreview from "../components/home/AboutPreview";
import Certificates from "../components/home/Certificates";
import ContactSection from "../components/home/ContactSection";
import ContactStrip from "../components/home/ContactStrip";
import EnvironmentFacts from "../components/home/EnvironmentFacts";
import FAQ from "../components/home/FAQ";
import JoinPreview from "../components/home/JoinPreview";
import ProductCategories from "../components/home/ProductCategories";
import TeamPreview from "../components/home/TeamPreview";
import TestimonialsPreview from "../components/home/TestimonialsPreview";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import TopBar from "../components/layout/TopBar";
import Hero from "../components/home/Hero";
import CertificationMarquee from "../components/home/CertificationMarquee";

export default function Home() {
  return (
    <>
      <TopBar />
      <Navbar />

      <main>
        <Hero />
        <CertificationMarquee />
        <AboutPreview />
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
       
      </main>

      <Footer />
    </>
  );
}
