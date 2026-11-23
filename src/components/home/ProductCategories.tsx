import { ArrowRight, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import farmerPhoto from "../../assets/about-farmer.png";
import personalCarePhoto from "../../assets/hero-personal-care.png";

const cards = {
  veterinary:
    "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1100&q=85",
  wellness:
    "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=85",
};

export default function ProductCategories() {
  return (
    <section
      id="products"
      className="overflow-hidden bg-[#f8fbf2] px-5 py-14 sm:px-8 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-[1320px]">
        <header className="mb-9 text-center sm:mb-12">
          <div className="mb-5 flex items-center justify-center gap-5">
            <span className="hidden h-px w-20 bg-[#9bad7d] sm:block" />

            <div>
              <Leaf
                size={25}
                className="mx-auto mb-1 text-[#4abd00]"
                aria-hidden="true"
              />
              <p className="font-heading text-xl font-bold leading-none text-[#143b20] sm:text-2xl">
                Save Eco Organic
              </p>
              <p className="mt-2 text-[.55rem] font-bold uppercase tracking-[.28em] text-[#647650]">
                Natural · Safe · Sustainable
              </p>
            </div>

            <span className="hidden h-px w-20 bg-[#9bad7d] sm:block" />
          </div>

          <h2 className="font-heading text-[clamp(2.2rem,4.2vw,3.8rem)] font-semibold leading-tight tracking-[-.035em] text-[#143b20]">
            Explore product categories
          </h2>

          <span className="mx-auto mt-3 block h-[3px] w-24 -rotate-2 rounded-full bg-[#4abd00]" />
        </header>

        <div className="grid gap-5 lg:grid-cols-[.95fr_1.4fr] lg:grid-rows-[270px_300px]">
          {/* Agricultural: large feature card */}
          <Link
            to="/products/agri"
            className="group relative flex min-h-[560px] flex-col overflow-hidden rounded-[1.65rem] border border-[#193a25] bg-[#fbfaf3] p-3 transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(20,59,32,.14)] lg:row-span-2"
          >
            <div className="relative h-[290px] overflow-hidden rounded-[1.2rem] sm:h-[330px]">
              <img
                src={farmerPhoto}
                alt="Indian farmer in a green field"
                className="h-full w-full object-cover object-[center_38%] transition duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <span className="absolute bottom-0 left-5 translate-y-1/2 -skew-x-12 rounded-md bg-[#4abd00] px-4 py-1 font-heading text-2xl font-bold text-[#143b20]">
                <span className="inline-block skew-x-12">01</span>
              </span>
            </div>

            <div className="flex flex-1 flex-col px-4 pb-4 pt-6 sm:px-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-heading text-3xl font-semibold leading-[.98] tracking-[-.025em] text-[#143b20] sm:text-4xl">
                  Agricultural
                  <br />
                  Products
                </h3>
                <span className="grid size-11 shrink-0 place-items-center rounded-full border border-[#4abd00] text-[#28721e] transition group-hover:bg-[#4abd00] group-hover:text-[#143b20]">
                  <ArrowRight size={21} aria-hidden="true" />
                </span>
              </div>

              <p className="mt-4 max-w-md text-sm leading-6 text-[#455747]">
                Organic inputs for healthier crops, richer soil and sustainable
                farming.
              </p>

              <span className="mt-auto flex items-center gap-2 pt-5 text-sm font-bold text-[#28721e]">
                Explore Agricultural Products
                <ArrowRight
                  size={17}
                  className="transition group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 left-0 h-2 w-full bg-gradient-to-r from-[#d8e9b8] via-[#4abd00]/45 to-transparent"
            />
          </Link>

          {/* Veterinary: wide horizontal card */}
          <Link
            to="/products/veterinary"
            className="group grid min-h-[270px] overflow-hidden rounded-[1.65rem] border border-[#193a25] bg-[#fbfaf3] p-3 transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(20,59,32,.14)] sm:grid-cols-[.82fr_1.18fr]"
          >
            <div className="flex flex-col justify-center px-4 py-4 sm:px-5">
              <span className="mb-2 w-fit -skew-x-12 rounded-md bg-[#4abd00] px-3 py-1 font-heading text-xl font-bold text-[#143b20]">
                <span className="inline-block skew-x-12">02</span>
              </span>

              <div className="flex items-center gap-3">
                <h3 className="font-heading text-3xl font-semibold leading-none text-[#143b20] sm:text-[2.35rem]">
                  Veterinary
                </h3>
                <ArrowRight
                  size={21}
                  className="shrink-0 text-[#28721e] transition group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </div>

              <p className="mt-3 max-w-[260px] text-sm leading-5 text-[#455747]">
                Organic, safe and effective care for healthier, more productive
                livestock.
              </p>
            </div>

            <div className="relative mt-3 min-h-[190px] overflow-hidden rounded-[1.2rem] sm:mt-0">
              <img
                src={cards.veterinary}
                alt="Cattle in a green field"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          </Link>

          {/* Wellness and Personal Care */}
          <div className="grid gap-5 sm:grid-cols-2">
            <Link
              to="/products/wellness"
              className="group overflow-hidden rounded-[1.65rem] border border-[#193a25] bg-[#fbfaf3] p-3 transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(20,59,32,.14)]"
            >
              <div className="relative h-[165px] overflow-hidden rounded-[1.2rem]">
                <img
                  src={cards.wellness}
                  alt="Herbal wellness ingredients"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute bottom-2 left-3 -skew-x-12 rounded-md bg-[#4abd00] px-3 py-1 font-heading text-lg font-bold text-[#143b20]">
                  <span className="inline-block skew-x-12">03</span>
                </span>
              </div>

              <div className="px-2 pb-2 pt-3">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-heading text-2xl font-semibold leading-none text-[#143b20] sm:text-[1.8rem]">
                    Wellness
                  </h3>
                  <ArrowRight
                    size={20}
                    className="text-[#28721e] transition group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-2 text-xs leading-5 text-[#455747]">
                  Nature-powered herbal solutions for everyday health and
                  immunity.
                </p>
              </div>
            </Link>

            <Link
              to="/products/personal-care"
              className="group overflow-hidden rounded-[1.65rem] border border-[#193a25] bg-[#fbfaf3] p-3 transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(20,59,32,.14)]"
            >
              <div className="relative h-[165px] overflow-hidden rounded-[1.2rem]">
                <img
                  src={personalCarePhoto}
                  alt="Save Eco personal care products"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute bottom-2 left-3 -skew-x-12 rounded-md bg-[#4abd00] px-3 py-1 font-heading text-lg font-bold text-[#143b20]">
                  <span className="inline-block skew-x-12">04</span>
                </span>
              </div>

              <div className="px-2 pb-2 pt-3">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-heading text-2xl font-semibold leading-none text-[#143b20] sm:text-[1.8rem]">
                    Personal Care
                  </h3>
                  <ArrowRight
                    size={20}
                    className="text-[#28721e] transition group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-2 text-xs leading-5 text-[#455747]">
                  Gentle, nature-inspired care for healthy skin and hair.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}