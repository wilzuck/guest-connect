import { DestinationCard } from "./DestinationCard";

const meta = {
  title: "Atoms/DestinationCard",
  component: DestinationCard,
};

export default meta;

export function Default() {
  return (
    <div className="max-w-xs">
      <DestinationCard
        locale="fr"
        city="Cotonou"
        country="Bénin"
        exploreLabel="Explorer Cotonou"
        imageUrl="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
      />
    </div>
  );
}

export function Grid() {
  const items = [
    { city: "Dakar", country: "Sénégal", imageUrl: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=1200&q=80" },
    { city: "Marrakech", country: "Maroc", imageUrl: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80" },
    { city: "Cotonou", country: "Bénin", imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80" },
  ];
  return (
    <div className="grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-3">
      {items.map((item) => (
        <DestinationCard
          key={item.city}
          locale="fr"
          city={item.city}
          country={item.country}
          exploreLabel={`Explorer ${item.city}`}
          imageUrl={item.imageUrl}
        />
      ))}
    </div>
  );
}
