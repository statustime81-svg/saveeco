import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTeamMembers } from "../../hooks/useTeamMembers";

const headingFont = "var(--font-heading, 'Playfair Display', Georgia, serif)";
const accentFont = "'Cormorant Garamond', Georgia, serif";
const bodyFont = "var(--font-body, 'Manrope', Arial, sans-serif)";

export default function TeamPreview() {
  const { data: members = [], isLoading, isError } = useTeamMembers();
  const visibleMembers = members.slice(0, 2);

  return (
    <section
      style={{ fontFamily: bodyFont }}
      className="relative overflow-hidden bg-[#f8f7f0] px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20"
    >
      <div className="mx-auto max-w-[1320px]">
        <header className="mb-7">
          <p className="text-xs font-bold uppercase tracking-[.19em] text-[#36712d]">
            Experienced Team
          </p>
          <h2
            style={{ fontFamily: headingFont }}
            className="mt-2 text-3xl font-semibold tracking-[-.025em] text-[#173b25] sm:text-4xl"
          >
            Meet our{" "}
            <span
              style={{
                fontFamily: accentFont,
                fontStyle: "italic",
                fontWeight: 600,
                color: "#4a8c20",
                letterSpacing: "-.045em",
              }}
            >
              people
            </span>
          </h2>
          <span className="mt-4 block h-[3px] w-14 rounded-full bg-[#78b936]" />
        </header>

        {isLoading && (
          <div className="grid gap-4 md:grid-cols-2">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="h-[185px] animate-pulse rounded-3xl bg-white"
              />
            ))}
          </div>
        )}

        {isError && (
          <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            Team details load nahi ho paaye. Supabase connection check karo.
          </p>
        )}

        {!isLoading && !isError && visibleMembers.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2">
            {visibleMembers.map((member, index) => {
              const initials = member.name
                .split(/\s+/)
                .map((part) => part[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();

              return (
                <article
                  key={member.id}
                  className="group relative flex min-h-[170px] overflow-hidden rounded-3xl border border-[#e8e6da] bg-white shadow-[0_8px_24px_rgba(30,59,34,.06)] transition-all duration-500 hover:-translate-y-1 hover:border-[#c7d9a9] hover:shadow-[0_18px_38px_rgba(30,59,34,.13)] sm:min-h-[205px]"
                >
                  <div className="relative w-[46%] shrink-0 overflow-hidden bg-[#e7efdc]">
                    {member.photo_url ? (
                      <img
                        src={member.photo_url}
                        alt={member.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="grid h-full min-h-[170px] place-items-center bg-gradient-to-br from-[#eaf2de] via-[#f5f5e9] to-[#dcebc9] sm:min-h-[205px]">
                        <span
                          style={{ fontFamily: headingFont }}
                          className="grid size-16 place-items-center rounded-full border border-white/80 bg-white/70 text-xl font-semibold text-[#34742b] shadow-sm sm:size-20 sm:text-2xl"
                        >
                          {initials}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="relative z-10 -ml-7 flex min-w-0 flex-1 flex-col justify-center rounded-l-[2.5rem] bg-white py-5 pl-8 pr-4 sm:-ml-10 sm:rounded-l-[3rem] sm:py-7 sm:pl-12 sm:pr-6">
                    <span className="mb-2 text-[10px] font-bold uppercase tracking-[.18em] text-[#557a3a]">
                      0{index + 1} / Save Eco
                    </span>
                    <h3
                      style={{ fontFamily: headingFont }}
                      className="text-lg font-semibold leading-tight text-[#173b25] sm:text-2xl"
                    >
                      {member.name}
                    </h3>
                    <p className="mt-1.5 text-sm font-medium text-[#697566]">
                      {member.designation}
                    </p>
                    <span className="mt-4 h-[2px] w-8 rounded-full bg-[#83bd3d] transition-all duration-300 group-hover:w-14" />
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {!isLoading && !isError && visibleMembers.length === 0 && (
          <p className="rounded-xl border border-[#e8e6da] bg-white p-5 text-sm text-[#697566]">
            Admin panel me team member add karke “Visible on website” enable
            karo.
          </p>
        )}

        <Link
          to="/about/team"
          className="group mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#28652c] transition-colors hover:text-[#4abd00]"
        >
          View our team
          <ArrowRight
            size={17}
            className="transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>
    </section>
  );
}