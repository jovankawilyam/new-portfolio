"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Reveal from "@/components/Reveal";

type Game = {
  title: string;
  href: string;
  image: string;
  type: string;
  tags: string[];
  description: string;
  isMaintenance?: boolean;
};

const photobooth: Game[] = [
  {
    title: "Photobooth IBIK",
    href: "https://photobooth-vintage.vercel.app/",
    image: "/images/vintage.png",
    type: "Creative Tool",
    tags: ["Camera", "Vintage", "UI"],
    description:
      "Retro-styled photobooth with classic framing and nostalgic visual treatment.",
  
  },
  {
    title: "Photobooth Bounty",
    href: "https://photobooth-bounty.vercel.app/",
    image: "/images/bounty.png",
    type: "Creative Tool",
    tags: ["Camera", "UI", "Photo"],
    description:
      "Automatic browser-based photobooth experience with themed output and simple capture flow.",
      
  },
  {
    title: "Photobooth Birthday",
    href: "https://birthday-nayla.vercel.app/",
    image: "/images/photobooth-birthday.png",
    type: "Creative Tool",
    tags: ["Camera", "UI", "Photo"],
    description:
      "Automatic browser-based photobooth experience with themed output and simple capture flow.",
      
  },
];

function isExternalLink(href: string) {
  return href.startsWith("http");
}

export default function PhotoboothGrid() {
  const [maintenanceGame, setMaintenanceGame] = useState<string | null>(null);

  const handleLinkClick = (e: React.MouseEvent, game: Game) => {
    e.preventDefault();

    if (game.isMaintenance) {
      setMaintenanceGame(game.title);
      return;
    }

    // Redirect to a dedicated checkout page in a new tab
    const checkoutUrl = `/checkout?title=${encodeURIComponent(game.title)}&url=${encodeURIComponent(game.href)}`;
    window.open(checkoutUrl, "_blank");
  };

  return (
    <section
      id="photobooth"
      className="relative z-20 bg-neutral-950 px-4 py-24 sm:px-6 md:px-8 md:py-32 border-t border-white/5"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-12 flex flex-col gap-5 md:mb-16 md:flex-row md:items-end md:justify-between">
            <div className="max-w-4xl">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-amber-500 sm:text-sm">
                Capture the moment
              </p>
              <h2 className="text-[clamp(2.5rem,9vw,5.75rem)] font-bold leading-none tracking-tight text-white">
                PHOTO<span className="text-amber-500">BOOTH</span>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-neutral-400">
              Interactive camera tools that capture retro and themed photobooth styles directly in your browser.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8 max-w-5xl mx-auto">
          {photobooth.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.15} className="h-full">
              <a
                href={item.href}
                onClick={(e) => handleLinkClick(e, item)}
                target={isExternalLink(item.href) ? "_blank" : undefined}
                rel={
                  isExternalLink(item.href) ? "noopener noreferrer" : undefined
                }
                className="group relative block rounded-2xl border border-white/10 bg-neutral-900 p-4 transition-all duration-500 hover:-translate-y-2 hover:border-amber-500/50 hover:shadow-[0_15px_30px_rgba(245,158,11,0.05)]"
              >
                {/* Polaroid Film Frame Container */}
                <div className="relative overflow-hidden rounded-lg bg-neutral-950 p-3 pb-12 shadow-inner transition-colors group-hover:bg-neutral-800/50">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-neutral-950">
                    {/* Blurred BG image */}
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="scale-110 object-cover opacity-20 blur-md transition-transform duration-700 group-hover:scale-115"
                      aria-hidden="true"
                    />
                    {/* Actual image */}
                    <Image
                      src={item.image}
                      alt={`${item.title} preview`}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover opacity-90 transition-all duration-700 sepia-[20%] group-hover:scale-105 group-hover:sepia-0"
                    />

                    {item.isMaintenance && (
                      <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 backdrop-blur-[2px]">
                        <div className="rounded-full bg-amber-500 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-black">
                          Under Maintenance
                        </div>
                      </div>
                    )}
                    
                    {/* Camera lens flash effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                  </div>

                  {/* Polaroid handwritten label feel */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-neutral-400">
                    <span className="font-mono text-xs tracking-wider uppercase">{item.type}</span>
                    <span className="font-mono text-xs">{`00${index + 1}`}</span>
                  </div>
                </div>

                {/* Info Content */}
                <div className="mt-5 px-2">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <h3 className="text-xl font-bold leading-tight text-white group-hover:text-amber-500 transition-colors sm:text-2xl">
                      {item.title}
                    </h3>
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 text-amber-500 transition-all duration-300 group-hover:border-amber-500 group-hover:bg-amber-500 group-hover:text-black">
                      {item.isMaintenance ? "!" : "→"}
                    </span>
                  </div>
                  <p className="mb-4 text-sm leading-relaxed text-neutral-400">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/5 bg-white/[0.02] px-2.5 py-0.5 text-xs text-neutral-400 transition-colors group-hover:border-amber-500/20 group-hover:text-amber-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {maintenanceGame && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
            <motion.div
              key="maintenance-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMaintenanceGame(null)}
              className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm"
            />
            <motion.div
              key="maintenance-content"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 p-8 text-center shadow-2xl"
            >
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/10 text-amber-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-8 w-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.83-5.83m-5.83 5.83L3.75 21.75M9 13.5l3.75-3.75m0 0L15 6.75M12.75 9.75l3.75-3.75m0 0L18.75 3m-9.75 6.75c1.242 0 2.25-1.008 2.25-2.25S10.242 4.5 9 4.5 6.75 5.508 6.75 6.75 7.758 9 9 9z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-2xl font-bold text-white">Maintenance</h3>
              <p className="mb-8 text-neutral-400">
                Sorry, <span className="text-amber-500 font-bold">{maintenanceGame}</span> is currently under maintenance for improvements. Please check back later!
              </p>
              <button
                onClick={() => setMaintenanceGame(null)}
                className="w-full rounded-xl bg-white py-4 text-sm font-bold uppercase tracking-widest text-black transition hover:bg-amber-500"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}