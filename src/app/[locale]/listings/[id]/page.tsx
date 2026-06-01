import ListingPage from "@/app/listings/[id]/page";

export default function Page(props: Parameters<typeof ListingPage>[0]) {
  return <ListingPage {...props} />;
}

