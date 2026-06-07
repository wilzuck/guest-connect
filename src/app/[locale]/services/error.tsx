"use client";

import { RouteErrorState } from "@/components/explore/RouteErrorState";

export default function Error(props: { error: Error & { digest?: string }; unstable_retry: () => void }) {
  return <RouteErrorState {...props} />;
}
