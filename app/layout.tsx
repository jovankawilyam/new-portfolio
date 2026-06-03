"use client";

import "./globals.css";
import { ReactLenis } from "lenis/react";
import Navbar from "@/components/Navbar";
import FloatingLikeButton from "@/components/FloatingLikeButton";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <ReactLenis root>
        <body className="antialiased bg-neutral-950 text-white font-sans selection:bg-amber-500 selection:text-black overflow-x-hidden leading-none">
          <Navbar />
          {children}
          <FloatingLikeButton />
        </body>
      </ReactLenis>
    </html>
  );
}
