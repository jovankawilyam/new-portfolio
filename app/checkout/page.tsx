"use client";

import { useSearchParams, useRouter } from "next/navigation";
import CheckoutDemo from "@/components/CheckoutDemo";
import { Suspense } from "react";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const title = searchParams.get("title") || "Selected Game";
  const url = searchParams.get("url");

  const handleComplete = () => {
    if (url) {
      window.location.href = url;
    } else {
      router.push("/");
    }
  };

  return (
    <main className="bg-neutral-950 min-h-screen">
      <CheckoutDemo gameTitle={title} onComplete={handleComplete} />
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-neutral-950 flex items-center justify-center text-white">Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
