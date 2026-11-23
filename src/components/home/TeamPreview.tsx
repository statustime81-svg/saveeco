import { ArrowRight } from "lucide-react";
import Card from "../ui/Card";
import Section from "../ui/Section";

const members = [
  { name: "Mrs Rajani Bala", designation: "CMD" },
  { name: "Mr. U.K. Verma", designation: "AGM" },
];

export default function TeamPreview() {
  return (
    <Section
      eyebrow="Experienced Team"
      title="Meet our people"
      background="cream"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {members.map((member) => {
          const initials = member.name
            .split(/\s+/)
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();

          return (
            <Card key={member.name} className="flex items-center gap-5">
              <div
                className="grid size-16 shrink-0 place-items-center rounded-full bg-primary-light font-heading text-lg font-semibold text-primary-dark"
                aria-hidden="true"
              >
                {initials}
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold text-ink">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm text-muted">{member.designation}</p>
              </div>
            </Card>
          );
        })}
      </div>

      <a
        href="/about/team"
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark"
      >
        View our team <ArrowRight size={16} aria-hidden="true" />
      </a>
    </Section>
  );
}