import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

type MarketingPageLayoutProps = {
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
};

export function MarketingPageLayout({
  eyebrow,
  title,
  description,
  children,
}: MarketingPageLayoutProps) {
  return (
    <div >
      <section className="border-b border-zinc-200 dark:border-zinc-800">
        <Container className="py-10 sm:py-14">
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        </Container>
      </section>
      <section >
        <Container className="py-12 sm:py-14">{children}</Container>
      </section>
    </div>
  );
}

