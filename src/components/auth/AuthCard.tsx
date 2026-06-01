import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils/cn";

type AuthCardProps = {
  title: string;
  subtitle?: string;
  footer?: {
    text: string;
    linkLabel: string;
    href: string;
  };
  className?: string;
  children: React.ReactNode;
};

export function AuthCard({ title, subtitle, footer, className, children }: AuthCardProps) {
  return (
    <Card className={cn("p-7 sm:p-8", className)}>
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-black">{title}</h1>
        {subtitle ? (
          <p className="mt-2 text-sm leading-6 text-zinc-600">{subtitle}</p>
        ) : null}
      </div>

      <div className="mt-7">{children}</div>

      {footer ? (
        <p className="mt-8 text-sm text-zinc-600">
          {footer.text}{" "}
          <Link href={footer.href} className="font-medium text-black hover:underline">
            {footer.linkLabel}
          </Link>
        </p>
      ) : null}
    </Card>
  );
}

