import { Suspense } from "react";
import AmbassadorDetailPage from "../_components/amb-details/amb-details";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <AmbassadorDetailPage />
    </Suspense>
  );
}
