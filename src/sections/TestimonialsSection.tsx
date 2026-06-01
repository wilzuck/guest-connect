import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/lib/mock/landing";
import { TestimonialsCarousel } from "@/components/testimonials/TestimonialsCarousel";

export function TestimonialsSection() {
  return (
    <section className="bg-zinc-50">
      <Container className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="Avis"
          title="Adoré par les voyageurs. Approuvé par les hôtes."
          description="Une expérience premium se construit avec des signaux de confiance et de vrais retours."
        />

        <div className="mt-10">
          <TestimonialsCarousel items={testimonials} />
        </div>
      </Container>
    </section>
  );
}
