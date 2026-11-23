import { Award, CalendarDays, Globe2, MapPin, Target } from "lucide-react";
import PublicPageLayout from "../components/layout/PublicPageLayout";
import AboutStoryFeature from "../components/about/AboutStoryFeature";

const timeline = [
  { year: "2015", title: "Company incorporated", icon: CalendarDays },
  { year: "ISO 9001:2015", title: "Quality certification", icon: Award },
  { year: "21 states", title: "Company network across India", icon: MapPin },
];

const missionPoints = [
  "Promote sustainable agriculture and organic farming practices.",
  "Support farmers with education, training and product information.",
  "Encourage entrepreneurship and community development.",
  "Create opportunities for local communities through green initiatives.",
];

const goals = [
  "Support the growth of organic farming.",
  "Help communities access healthier food options.",
  "Contribute to community development and environmental awareness.",
];

export default function About() {
  return (
    <PublicPageLayout>
      <AboutStoryFeature id="about-intro" ctaHref="#our-journey" titleAs="h1" />

      <section id="our-journey" className="scroll-mt-24 bg-white px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto max-w-site">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-[#348b13]">Our journey</p>
          <h2 className="mt-3 font-heading text-3xl font-semibold text-[#143b20] sm:text-4xl">Growing with farmers and communities</h2>
          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {timeline.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.year} className="rounded-2xl border border-[#e3ecd9] bg-[#f8fbf3] p-6 shadow-[0_12px_30px_rgba(28,68,29,.04)]">
                  <span className="grid size-11 place-items-center rounded-full bg-[#eaf5df] text-[#348b13]"><Icon size={21} aria-hidden="true" /></span>
                  <p className="mt-5 font-heading text-2xl font-bold text-[#194326]">{item.year}</p>
                  <p className="mt-1 text-sm leading-6 text-[#596858]">{item.title}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="mission" className="scroll-mt-24 bg-[#f4f8ed] px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto grid max-w-site gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-[#e1ecd6] bg-white p-7 shadow-[0_14px_40px_rgba(28,68,29,.05)] sm:p-9">
            <Globe2 className="text-[#348b13]" size={28} aria-hidden="true" />
            <h2 className="mt-4 font-heading text-2xl font-semibold text-[#143b20]">
              Our Mission
            </h2>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-[#596858]">
              {missionPoints.map((point) => (
                <li key={point} className="flex gap-3">
                  <span className="font-bold text-[#348b13]" aria-hidden="true">
                    ✓
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-3xl border border-[#e1ecd6] bg-white p-7 shadow-[0_14px_40px_rgba(28,68,29,.05)] sm:p-9">
            <Award className="text-[#348b13]" size={28} aria-hidden="true" />
            <h2 className="mt-4 font-heading text-2xl font-semibold text-[#143b20]">
              Our Vision
            </h2>
            <p className="mt-4 leading-7 text-[#596858]">
              Save Eco aims to make organic farming practices more accessible
              and promote quality, sustainability and ethical practices in the
              organic farming sector.
            </p>
          </article>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto max-w-site rounded-3xl bg-[#153f20] p-7 text-white shadow-[0_20px_50px_rgba(17,58,28,.15)] sm:p-10">
          <Target size={30} aria-hidden="true" />
          <h2 className="mt-4 font-heading text-2xl font-semibold">Our Goal</h2>
          <ul className="mt-5 grid gap-4 text-sm leading-6 text-green-50 sm:grid-cols-3">
            {goals.map((goal) => (
              <li key={goal} className="rounded-xl bg-white/10 p-4">
                {goal}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PublicPageLayout>
  );
}
