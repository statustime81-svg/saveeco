import PublicPageLayout from "../components/layout/PublicPageLayout";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTeamMembers } from "../hooks/useTeamMembers";

export default function Leadership() {
  const { data: members = [], isLoading, isError } = useTeamMembers();
  const leaders = members.filter((member) => member.group_type === "leadership");
  const location = useLocation();

  useEffect(() => {
    if (isLoading || !location.hash) return;
    const targetId = decodeURIComponent(location.hash.slice(1));
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [isLoading, location.hash, leaders.length]);

  return (
    <PublicPageLayout>
      <section className="bg-primary-light px-5 py-14 sm:px-8">
        <div className="mx-auto max-w-site">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            Leadership
          </p>
          <h1 className="mt-3 font-heading text-4xl font-semibold text-ink">
            Messages from our leadership
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-site space-y-6 px-5 py-12 sm:px-8">
        {isLoading && <p className="text-sm text-muted">Loading leadership profiles...</p>}

        {isError && (
          <p className="rounded-lg bg-red-50 p-4 text-sm text-danger">
            Leadership profiles could not be loaded.
          </p>
        )}

        {!isLoading && !isError && leaders.length === 0 && (
          <p className="rounded-xl bg-cream p-6 text-sm leading-6 text-muted">
            Leadership profiles will appear here once the company publishes
            their approved messages and photos.
          </p>
        )}

        {leaders.map((leader) => (
          <article
            key={leader.id}
            id={leader.designation.toLowerCase().includes("cmd")
              ? "cmd-message"
              : /\bmd\b|managing director/.test(leader.designation.toLowerCase())
                ? "md-message"
                : leader.designation.toLowerCase().includes("director")
                  ? "director-message"
                  : undefined}
            className="scroll-mt-32 grid gap-6 rounded-2xl border border-gray-100 p-6 md:grid-cols-[220px_1fr]"
          >
            {leader.photo_url ? (
              <img
                src={leader.photo_url}
                alt={leader.name}
                className="aspect-square w-full rounded-xl object-cover"
                loading="lazy"
              />
            ) : (
              <div
                className="grid aspect-square place-items-center rounded-xl bg-primary-light font-heading text-4xl font-semibold text-primary"
                aria-hidden="true"
              >
                {leader.name.slice(0, 1).toUpperCase()}
              </div>
            )}

            <div>
              <p className="text-sm font-semibold text-primary">
                {leader.designation}
              </p>
              <h2 className="mt-2 font-heading text-2xl font-semibold text-ink">
                {leader.name}
              </h2>
              {leader.message && (
                <p className="mt-4 whitespace-pre-line leading-7 text-muted">
                  {leader.message}
                </p>
              )}
            </div>
          </article>
        ))}
      </section>
    </PublicPageLayout>
  );
}
