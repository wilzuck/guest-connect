import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { getBlogPost } from "@/lib/mock/blog";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const locale = await getLocale();
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return notFound();

  return (
    <div className="bg-white">
      <section className="border-b border-black/5 bg-white">
        <Container className="py-10 max-w-2xl sm:py-14">
          <Link href={`/${locale}/blog`} className="text-sm font-semibold text-zinc-600 hover:text-black transition">
            ← Retour au blog
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
            <span className="text-xs text-zinc-500">
              {formatDate(post.date)} • {post.readingTime}
            </span>
          </div>

          <h1 className="mt-4 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-black sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-zinc-600 sm:text-lg">{post.excerpt}</p>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-12  max-w-2xl sm:py-14 ">
          <Card className="overflow-hidden p-0 shadow-none">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 72vw"
                priority
              />
            </div>
          </Card>

          <article className="prose prose-zinc mt-10 max-w-none">
            {post.content.map((p, idx) => (
              <p key={idx} className="text-sm leading-7 text-zinc-700 sm:text-base">
                {p}
              </p>
            ))}
          </article>

          <div className="mt-10 rounded-3xl border border-black/10 bg-white p-6">
            <p className="text-sm font-semibold text-black">À retenir</p>
            <p className="mt-2 text-sm leading-7 text-zinc-600">
              Un bon séjour commence par une annonce claire. Si un point est flou (photo, conditions, services), posez
              une question avant de réserver.
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

