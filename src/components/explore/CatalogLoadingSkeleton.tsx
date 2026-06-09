import { Container } from "@/components/ui/Container";

export function CatalogLoadingSkeleton() {
  return (
    <div className="bg-white">
      <section className="border-b border-black/5 bg-white">
        <Container className="py-10 sm:py-14">
          <div className="h-3 w-32 animate-pulse rounded-full bg-zinc-100" />
          <div className="mt-5 h-10 w-full max-w-xl animate-pulse rounded-2xl bg-zinc-100 sm:h-12" />
          <div className="mt-4 h-4 w-full max-w-2xl animate-pulse rounded-full bg-zinc-100" />
          <div className="mt-3 h-4 w-9/12 max-w-lg animate-pulse rounded-full bg-zinc-100" />
          <div className="mt-8 h-16 animate-pulse rounded-2xl bg-zinc-100" />
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-12 sm:py-14">
          <div className="flex gap-2 overflow-hidden">
            <div className="h-10 w-24 shrink-0 animate-pulse rounded-full bg-zinc-100" />
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-10 w-32 shrink-0 animate-pulse rounded-full bg-zinc-100" />
            ))}
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="overflow-hidden rounded-2xl border border-black/10 bg-white">
                <div className="aspect-[4/3] animate-pulse bg-zinc-100" />
                <div className="space-y-3 p-4">
                  <div className="h-4 w-3/4 animate-pulse rounded-full bg-zinc-100" />
                  <div className="h-4 w-1/2 animate-pulse rounded-full bg-zinc-100" />
                  <div className="h-4 w-full animate-pulse rounded-full bg-zinc-100" />
                  <div className="h-9 w-36 animate-pulse rounded-full bg-zinc-100" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
