import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/lib/mock/landing";
import { TestimonialsCarousel } from "@/components/testimonials/TestimonialsCarousel";
import { getTranslations } from "next-intl/server";

export async function TestimonialsSection() {
  const t = await getTranslations("homeTestimonials");
  return (
    <section className="bg-zinc-50 dark:bg-black">
      <Container className="py-16 sm:py-20">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

        <div className="mt-10">
          <TestimonialsCarousel 
            items={testimonials}
            dotsPosition="end"
          />
        </div>
      </Container>
    </section>
  );
}
