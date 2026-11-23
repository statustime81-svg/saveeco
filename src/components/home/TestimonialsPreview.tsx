import Section from "../ui/Section";
import TestimonialCard, { type Testimonial } from "./TestimonialCard";

type TestimonialsPreviewProps = {
  testimonials?: Testimonial[];
};

export default function TestimonialsPreview({
  testimonials = [],
}: TestimonialsPreviewProps) {
  if (testimonials.length === 0) return null;

  return (
    <Section
      eyebrow="Stories from our community"
      title="Farmers and partner experiences"
      background="white"
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.name} testimonial={testimonial} />
        ))}
      </div>
    </Section>
  );
}