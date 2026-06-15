"use client";

import { useState } from "react";
import CheckoutDemo from "@/components/CheckoutDemo";

export default function PortfolioGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Default: Aktif. Bisa dimatikan dengan setting NEXT_PUBLIC_HIDE_PAYMENT=true di .env
  const isPaymentHidden = process.env.NEXT_PUBLIC_HIDE_PAYMENT === "true";

  if (isPaymentHidden || isUnlocked) {
    return <>{children}</>;
  }

  return <CheckoutDemo onComplete={() => setIsUnlocked(true)} />;
}
