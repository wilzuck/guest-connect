import { Card } from "./Card";
import { Carousel } from "./Carousel";

const meta = { title: "Atoms/Carousel", component: Carousel };
export default meta;

export function Default() {
  return (
    <Carousel className="max-w-xl">
      {[1, 2, 3, 4].map((item) => (
        <Card key={item} className="min-w-56 p-5">
          <p className="text-sm font-semibold text-black">Carte {item}</p>
          <p className="mt-2 text-sm text-zinc-600">Élément défilable.</p>
        </Card>
      ))}
    </Carousel>
  );
}
