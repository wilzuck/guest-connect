import { ScrollToTopButton } from "./ScrollToTopButton";

const meta = {
  title: "Atoms/ScrollToTopButton",
  component: ScrollToTopButton,
};

export default meta;

/**
 * The button only appears after scrolling 500px down and is hidden on mobile.
 * Scroll inside the preview to reveal the fixed button at the bottom-right.
 */
export function Default() {
  return (
    <div>
      <div className="grid h-[1400px] place-items-start rounded-2xl bg-gradient-to-b from-zinc-50 to-zinc-200 p-6 dark:from-zinc-900 dark:to-zinc-950">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Faites défiler vers le bas (≥ 500px) pour faire apparaître le bouton en bas à droite.
        </p>
      </div>
      <ScrollToTopButton />
    </div>
  );
}
