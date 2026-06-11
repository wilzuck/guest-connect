import { Container } from "@/components/ui/Container";

function SkeletonBlock({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-2xl bg-zinc-100 dark:bg-zinc-800 ${className}`} />;
}

export function HomeLoadingSkeleton() {
  return (
    <div >
      <section className="min-h-155 border-b border-black/5 dark:border-zinc-800">
        <Container className="grid gap-8 py-10 lg:grid-cols-12 lg:items-center lg:py-16">
          <div className="lg:col-span-6">
            <SkeletonBlock className="h-3 w-28 rounded-full" />
            <SkeletonBlock className="mt-6 h-14 w-full max-w-xl" />
            <SkeletonBlock className="mt-3 h-14 w-10/12 max-w-lg" />
            <SkeletonBlock className="mt-6 h-5 w-full max-w-md rounded-full" />
            <SkeletonBlock className="mt-3 h-5 w-9/12 max-w-sm rounded-full" />
            <SkeletonBlock className="mt-8 h-16 w-full max-w-2xl" />
          </div>
          <div className="lg:col-span-6">
            <SkeletonBlock className="aspect-[4/3] w-full rounded-4xl" />
          </div>
        </Container>
      </section>

      <Container className="py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="overflow-hidden rounded-2xl border border-black/10 bg-white dark:border-zinc-800 dark:bg-zinc-950">
              <SkeletonBlock className="aspect-4 rounded-none" />
              <div className="space-y-3 p-4">
                <SkeletonBlock className="h-4 w-3/4 rounded-full" />
                <SkeletonBlock className="h-4 w-1/2 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export function DashboardLoadingSkeleton() {
  return (
    <div className="bg-zinc-50 dark:bg-black">
      <Container className="py-8 sm:py-10">
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="hidden rounded-3xl border border-black/10 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950 lg:block">
            <SkeletonBlock className="h-10 w-40" />
            <div className="mt-6 grid gap-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonBlock key={index} className="h-11 rounded-xl" />
              ))}
            </div>
          </aside>

          <section>
            <SkeletonBlock className="h-9 w-56" />
            <SkeletonBlock className="mt-3 h-4 w-full max-w-xl rounded-full" />
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <SkeletonBlock key={index} className="h-36" />
              ))}
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <SkeletonBlock key={index} className="h-32" />
              ))}
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}

export function AdminLoadingSkeleton() {
  return (
    <div className="grid min-[calc(100dvh-4rem)]  grid-cols-1 bg-white dark:bg-black lg:grid-cols-[256px_minmax(0,1fr)]">
      <aside className="hidden border-r border-black/5 bg-[#F7F7F8] p-3 dark:border-zinc-800 dark:bg-zinc-950 lg:block">
        <SkeletonBlock className="h-10 rounded-lg bg-zinc-200" />
        <div className="mt-6 grid gap-2">
          {Array.from({ length: 10 }).map((_, index) => (
            <SkeletonBlock key={index} className="h-10 rounded-lg bg-zinc-200" />
          ))}
        </div>
      </aside>

      <section className="min-w-0">
        <header className="flex h-16 items-center justify-between border-b border-black/5 px-4 dark:border-zinc-800 lg:px-6">
          <SkeletonBlock className="h-6 w-32 rounded-full" />
          <SkeletonBlock className="h-10 w-28 rounded-lg" />
        </header>
        <div className="grid gap-4 px-4 pt-3 lg:px-6 xl:grid-cols-[1fr_auto_1fr] xl:items-center">
          <div>
            <SkeletonBlock className="h-7 w-48 rounded-full" />
            <SkeletonBlock className="mt-3 h-4 w-64 rounded-full" />
          </div>
          <SkeletonBlock className="h-10 w-full max-w-80 rounded-lg xl:justify-self-center" />
          <SkeletonBlock className="hidden h-10 w-28 rounded-lg xl:block xl:justify-self-end" />
        </div>
        <div className="mt-4 border-y border-black/5 dark:border-zinc-800">
          <SkeletonBlock className="h-11 rounded-none" />
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className="grid grid-cols-[1.5fr_1fr_1fr_120px] gap-3 border-t border-[#EFEFF2] px-4 py-3 dark:border-zinc-800">
              <SkeletonBlock className="h-4 rounded-full" />
              <SkeletonBlock className="h-4 rounded-full" />
              <SkeletonBlock className="h-4 rounded-full" />
              <SkeletonBlock className="h-8 rounded-lg" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export function AdminContentLoadingSkeleton() {
  return (
    <section className="min-w-0 bg-white dark:bg-black">
      <div className="grid gap-4 px-4 pt-3 lg:px-6 xl:grid-cols-[1fr_auto_1fr] xl:items-center">
        <div>
          <SkeletonBlock className="h-7 w-48 rounded-full" />
          <SkeletonBlock className="mt-3 h-4 w-64 rounded-full" />
        </div>
        <SkeletonBlock className="h-10 w-full max-w-80 rounded-lg xl:justify-self-center" />
        <SkeletonBlock className="hidden h-10 w-28 rounded-lg xl:block xl:justify-self-end" />
      </div>
      <div className="mt-4 border-y border-black/5  dark:border-black/10 dark:border-zinc-800">
        <SkeletonBlock className="h-11 rounded-none" />
        {Array.from({ length: 9 }).map((_, index) => (
          <div key={index} className="grid grid-cols-[1.5fr_1fr_1fr_120px] gap-3 border-t border-[#EFEFF2] px-4 py-3 dark:border-zinc-800">
            <SkeletonBlock className="h-4 rounded-full" />
            <SkeletonBlock className="h-4 rounded-full" />
            <SkeletonBlock className="h-4 rounded-full" />
            <SkeletonBlock className="h-8 rounded-lg" />
          </div>
        ))}
      </div>
    </section>
  );
}
