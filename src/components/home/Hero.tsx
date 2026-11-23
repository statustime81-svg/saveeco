import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowRight, Leaf } from "lucide-react";
import personalCareImage from "../../assets/hero-personal-care.png";
import agricultureImage from "../../assets/hero-agriculture.png";
import cropCareImage from "../../assets/hero-crop-care.png";

const AUTOPLAY_DELAY = 5600;
const slides = [
  {
    category: "PERSONAL CARE",
    eyebrow: "NATURAL CARE, ROOTED IN NATURE",
    title: <>Everyday care.<br /><em>Naturally better.</em></>,
    description: "Thoughtful personal care inspired by nature, made for the everyday rituals that matter.",
    image: personalCareImage,
    imageAlt: "Save Eco personal care range with toothpaste, rice water shampoo and herbal soap",
    cta: "Explore Personal Care",
    note: "Gentle everyday essentials",
  },
  {
    category: "AGRI PRODUCTS",
    eyebrow: "GROW WITH CONFIDENCE",
    title: <>Better crop care.<br /><em>Brighter harvests.</em></>,
    description: "Explore practical agricultural products made to support farmers through every growing season.",
    image: agricultureImage,
    imageAlt: "Save Eco agricultural products arranged with fresh green crops",
    cta: "Explore Agri Products",
    note: "Made for growing seasons",
  },
  {
    category: "PEST MANAGEMENT",
    eyebrow: "PROTECT WHAT YOU GROW",
    title: <>A smarter way<br /><em>to care for crops.</em></>,
    description: "Discover crop-care solutions designed around the needs of farms, fields and growing communities.",
    image: cropCareImage,
    imageAlt: "Save Eco crop protection products displayed against a botanical backdrop",
    cta: "Explore Crop Care",
    note: "Support for healthier fields",
  },
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const active = slides[activeIndex];

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setInterval(() => setActiveIndex((i) => (i + 1) % slides.length), AUTOPLAY_DELAY);
    return () => window.clearInterval(timer);
  }, [activeIndex, reducedMotion]);

  const goTo = (index: number) => setActiveIndex((index + slides.length) % slides.length);

  return (
    <section
      id="home"
      className="saveeco-hero-v2"
      aria-roledescription="carousel"
      aria-label="Save Eco featured product categories"
    >
      <div className="saveeco-hero-v2__inner">
        <div className="saveeco-hero-v2__copy" key={`copy-${activeIndex}`}>
          <div className="saveeco-hero-v2__eyebrow"><span><Leaf size={15} /></span>{active.eyebrow}</div>
          <p className="saveeco-hero-v2__overline">SAVE ECO ORGANIC <i>/</i> {active.category}</p>
          <h1 className="saveeco-hero-v2__title">{active.title}</h1>
          <p className="saveeco-hero-v2__description">{active.description}</p>
          <div className="saveeco-hero-v2__actions">
            <a href="#products" className="saveeco-hero-v2__primary">{active.cta}<ArrowRight size={17} /></a>
            <a href="#join" className="saveeco-hero-v2__secondary">Become a Partner<ArrowDownRight size={16} /></a>
          </div>
          <div className="saveeco-hero-v2__trustline"><span><Leaf size={14} /></span>{active.note}<b />Since 2015</div>
        </div>

        <div className="saveeco-hero-v2__visual" aria-live="polite">
          <span className="saveeco-hero-v2__halo" aria-hidden="true" />
          {slides.map((slide, index) => (
            <img
              key={slide.image}
              src={slide.image}
              alt={index === activeIndex ? slide.imageAlt : ""}
              aria-hidden={index !== activeIndex}
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
              className={`saveeco-hero-v2__image ${index === activeIndex ? "is-active" : ""}`}
            />
          ))}
          <span className="saveeco-hero-v2__image-label"><i />{active.category}</span>
        </div>

        <div className="saveeco-hero-v2__controls">
          <span className="saveeco-hero-v2__count">0{activeIndex + 1}<i>/</i>0{slides.length}</span>
          <div className="saveeco-hero-v2__tabs" role="tablist" aria-label="Choose a product category">
            {slides.map((slide, index) => (
              <button key={slide.category} type="button" role="tab" aria-selected={activeIndex === index} aria-label={`Show ${slide.category.toLowerCase()} slide`} onClick={() => goTo(index)} className={`saveeco-hero-v2__tab ${activeIndex === index ? "is-active" : ""}`}>
                <small>0{index + 1}</small>{slide.category}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="saveeco-hero-v2__progress" aria-hidden="true"><span key={activeIndex} style={{ animationDuration: `${AUTOPLAY_DELAY}ms` }} /></div>
    </section>
  );
}
