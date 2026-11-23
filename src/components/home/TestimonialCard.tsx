import Card from "../ui/Card";

export type Testimonial = {
  name: string;
  location: string;
  quote: string;
  photoUrl?: string;
};

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export default function TestimonialCard({
  testimonial,
}: TestimonialCardProps) {
  const initials = testimonial.name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Card>
      <p className="leading-7 text-ink">“{testimonial.quote}”</p>

      <div className="mt-6 flex items-center gap-3">
        {testimonial.photoUrl ? (
          <img
            src={testimonial.photoUrl}
            alt={`${testimonial.name} portrait`}
            className="size-12 rounded-full object-cover"
            loading="lazy"
          />
        ) : (
          <span
            className="grid size-12 place-items-center rounded-full bg-primary-light font-semibold text-primary-dark"
            aria-hidden="true"
          >
            {initials}
          </span>
        )}

        <div>
          <p className="font-semibold text-ink">{testimonial.name}</p>
          <p className="text-sm text-muted">{testimonial.location}</p>
        </div>
      </div>
    </Card>
  );
}