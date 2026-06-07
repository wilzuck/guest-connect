
import { cn } from "@/lib/utils/cn";

type DividerProps = {
  className?: string;
  vertical?: boolean;
};

export default function Divider({
  className,
  vertical = true,
}: DividerProps) {
  return (
    <div
      className={cn(
        vertical
          ? "h-10 w-px bg-black/5"
          : "h-px w-full bg-black/5",
        className
      )}
    />
  );
}

{/*type DividerProps = {
  className?: string;
};

function Divider({ className = "" }: DividerProps) {
  return <div className={`w-px shrink-0 bg-black/5 h-10 ${className}`} />;
}

export default Divider;
*/}