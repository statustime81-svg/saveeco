import AboutPreview from "../components/home/AboutPreview";
import Certificates from "../components/home/Certificates";
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

export default function Home() {
  return (
    <>
      <TopBar />
      <Navbar />

      <main>
        <Hero />
        <AboutPreview />
        <ProductCategories />
        <WhyChooseUs />
        <Certificates />
        <EnvironmentFacts />
        <JoinPreview />
        <TestimonialsPreview />
        <TeamPreview />
        <FAQ />
        <ContactStrip />

        <section
          id="gallery"
          className="scroll-mt-24 bg-white px-5 py-14 sm:px-8"
        >
          <div className="mx-auto max-w-site">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              Gallery
            </p>
            <h2 className="mt-3 font-heading text-2xl font-semibold text-ink">
              Save Eco in the community
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-muted">
              Photos and videos from farms, events, training, and products will
              appear in the Gallery.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
