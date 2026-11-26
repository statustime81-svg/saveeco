import { useTeamMembers } from "../hooks/useTeamMembers";
import PublicPageLayout from "../components/layout/PublicPageLayout";

export default function Team() {
  const { data: members = [], isLoading, isError } = useTeamMembers();
  const team = members.filter(
    (member) => member.group_type === "team" || member.group_type === "leadership",
  );

  return (
    <PublicPageLayout>
      <section className="bg-primary-light px-5 py-14 sm:px-8">
        <div className="mx-auto max-w-site">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            Experienced Team
          </p>
          <h1 className="mt-3 font-heading text-4xl font-semibold text-ink">
            Meet our people
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-site px-5 py-12 sm:px-8">
        {isLoading && <p className="text-sm text-muted">Loading team profiles...</p>}

        {isError && (
          <p className="rounded-lg bg-red-50 p-4 text-sm text-danger">
            Team profiles could not be loaded.
          </p>
        )}

        {!isLoading && !isError && team.length === 0 && (
          <p className="rounded-xl bg-cream p-6 text-sm leading-6 text-muted">
            Team profiles will appear here after approved names and photos are
            published by the company.
          </p>
        )}

        {team.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => {
              const socialLinks = Object.entries(member.social ?? {}).filter(
                (entry): entry is [string, string] =>
                  typeof entry[1] === "string" && entry[1].trim().length > 0,
              );

              return (
                <article
                  key={member.id}
                  className="overflow-hidden rounded-2xl border border-gray-100 bg-white"
                >
                  {member.photo_url ? (
                    <img
                      src={member.photo_url}
                      alt={member.name}
                      className="aspect-[4/3] w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="grid aspect-[4/3] place-items-center bg-primary-light font-heading text-5xl font-semibold text-primary">
                      {member.name.slice(0, 1).toUpperCase()}
                    </div>
                  )}

                  <div className="p-5">
                    <h2 className="font-heading text-lg font-semibold text-ink">
                      {member.name}
                    </h2>
                    <p className="mt-1 text-sm text-primary">{member.designation}</p>

                    {socialLinks.map(([network, url]) => (
                      <a
                        key={network}
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 mr-4 inline-block text-sm font-medium capitalize text-primary hover:text-primary-dark"
                      >
                        {network}
                      </a>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </PublicPageLayout>
  );
}
