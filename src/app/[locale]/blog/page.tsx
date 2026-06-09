import Image from "next/image";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import { MarketingPageLayout } from "@/components/layout/MarketingPageLayout";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { blogPosts } from "@/lib/mock/blog";

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const locale = await getLocale();
  const { page } = await searchParams;
  const pageSize = 8;
  const pageNum = Math.max(1, Number.parseInt(page ?? "1", 10) || 1);
  const totalPages = Math.max(1, Math.ceil(blogPosts.length / pageSize));
  const safePage = Math.min(pageNum, totalPages);
  const start = (safePage - 1) * pageSize;
  const items = blogPosts.slice(start, start + pageSize);

  return (
    <MarketingPageLayout
      eyebrow="Blog"
      title="Guides, bonnes pratiques et adresses"
      description="Conseils concrets pour voyager (et accueillir) avec un niveau de confort premium — sans superflu."
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((post) => (
          <Link key={post.slug} href={`/${locale}/blog/${post.slug}`} className="block">
            <Card className="group h-full overflow-hidden p-0 shadow-none transition hover:bg-zinc-50">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6">
                <div className="flex flex-wrap items-center gap-2">
                  {post.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    {formatDate(post.date)} • {post.readingTime}
                  </span>
                </div>
                <p className="mt-3 text-lg font-semibold tracking-tight">{post.title}</p>
                <p className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-400">{post.excerpt}</p>
                <p className="mt-4 text-sm font-semibold ">Voir l’article</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-10 flex items-center justify-between">
        <p className="text-sm text-zinc-600">
          Page {safePage} / {totalPages}
        </p>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
          <Link
            aria-disabled={safePage <= 1}
            className={[
              "rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold  hover:bg-zinc-50 transition",
              safePage <= 1 ? "pointer-events-none opacity-50" : "",
            ].join(" ")}
            href={`/${locale}/blog?page=${Math.max(1, safePage - 1)}`}
          >
            Précédent
          </Link>
          <Link
            aria-disabled={safePage >= totalPages}
            className={[
              "rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold  hover:bg-zinc-50 transition",
              safePage >= totalPages ? "pointer-events-none opacity-50" : "",
            ].join(" ")}
            href={`/${locale}/blog?page=${Math.min(totalPages, safePage + 1)}`}
          >
            Suivant
          </Link>
        </div>
      </div>
    </MarketingPageLayout>
  );
}

function formatDate(iso: string) {
  // garde une sortie simple et lisible, sans dépendre de l’Intl runtime en build.
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}
