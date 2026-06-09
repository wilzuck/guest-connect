import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

type SimplePageProps = {
  title: string;
  description?: string;
};

export function SimplePage({ title, description }: SimplePageProps) {
  return (
    <div className="bg-zinc-50">
      <Container className="py-10 sm:py-12">
        <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-sm shadow-black/5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-white/80">
            Page temporaire
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight">{title}</h1>
          {description ? (
            <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600">{description}</p>
          ) : null}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/" variant="primary" size="md">
              Retour à l’accueil
            </ButtonLink>
            <Link href="/signup" className="text-sm font-medium text-zinc-600 hover:text-black">
              Créer un compte
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
