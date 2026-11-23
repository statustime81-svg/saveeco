import Section from "../ui/Section";
import StatCounter from "../ui/StatCounter";

const confirmedStats = [
  { label: "States Network", value: 21, suffix: "+" },
  { label: "Established", value: 2015, suffix: "" },
];

export default function StatsStrip() {
  return (
    <Section background="green" className="py-8 lg:py-10">
      <div className="grid grid-cols-2 gap-6">
        {confirmedStats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-heading text-3xl font-semibold text-primary-dark sm:text-4xl">
              <StatCounter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-2 text-sm font-medium text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}