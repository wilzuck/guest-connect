import Image from "next/image";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import { MarketingPageLayout } from "@/components/layout/MarketingPageLayout";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { blogPosts } from "@/lib/mock/blog";

export default async function BlogIndexPage() {
  const locale = await getLocale();

  return (
    <MarketingPageLayout
      eyebrow="Blog"
      title="Guides, bonnes pratiques et adresses"
      description="Conseils concrets pour voyager (et accueillir) avec un niveau de confort premium — sans superflu."
    >
      <div className="grid gap-4 md:grid-cols-12">
        {blogPosts.map((post) => (
          <Link key={post.slug} href={`/${locale}/blog/${post.slug}`} className="md:col-span-6">
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
                  <span className="text-xs text-zinc-500">
                    {formatDate(post.date)} • {post.readingTime}
                  </span>
                </div>
                <p className="mt-3 text-lg font-semibold tracking-tight text-black">{post.title}</p>
                <p className="mt-2 text-sm leading-7 text-zinc-600">{post.excerpt}</p>
                <p className="mt-4 text-sm font-semibold text-black">Lire l’article</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </MarketingPageLayout>
  );
}

function formatDate(iso: string) {
  // garde une sortie simple et lisible, sans dépendre de l’Intl runtime en build.
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

