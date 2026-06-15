"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import CheckoutDemo from "@/components/CheckoutDemo";

export default function PortfolioGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Default: Aktif. Bisa dimatikan dengan setting NEXT_PUBLIC_HIDE_PAYMENT=true di .env
  const isPaymentHidden = process.env.NEXT_PUBLIC_HIDE_PAYMENT === "true";

  if (isPaymentHidden) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait">
      {!isUnlocked ? (
        <motion.div
          key="gate"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            filter: "brightness(1.5) blur(20px)",
            transition: { 
              duration: 1.2, 
              ease: [0.22, 1, 0.36, 1] 
            }
          }}
          className="w-full h-full"
        >
          <CheckoutDemo onComplete={() => setIsUnlocked(true)} />
        </motion.div>
      ) : (
        <motion.div
          key="portfolio"
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            filter: "blur(0px)",
            transition: { 
              duration: 1.5, 
              ease: [0.22, 1, 0.36, 1],
              delay: 0.1
            }
          }}
          className="w-full h-full"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
