"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import Reveal from "@/components/Reveal";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

type Achievement = {
  rank: string;
  title: string;
  year: string;
  image?: string;
};

const achievements: Achievement[] = [
  { rank: "3", title: "Bandung Taekwondo International", year: "2017", image: "/achievements/Bandung Taekwondo International.svg" },
  { rank: "2", title: "Liga Pelajar Taekwondo", year: "2017", image: "/achievements/Liga Pelajar Taekwondo.svg" },
  { rank: "2", title: "Palagan Open Taekwondo", year: "2018", image: "/achievements/Palagan Open Taekwondo.svg" },
  { rank: "1", title: "Al Irsyad Al Syamsiyyah Taekwondo", year: "2018", image: "/achievements/Al Irsyad Al Syamsiyyah  Taekwondo.svg" },
  { rank: "1", title: "Liga Pelajar Taekwondo", year: "2018", image: "/achievements/Liga Pelajar Taekwondo (2).svg" },
  { rank: "3", title: "Menpora Cup Taekwondo", year: "2019", image: "/achievements/Menpora Cup Taekwondo.svg" },
  { rank: "2", title: "Pugnator Badung Sport Tourism International", year: "2019", image: "/achievements/Pugnator Badung Sport Tourism International Open Taekwondo.svg" },
  { rank: "1", title: "Koni Cup", year: "2019", image: "/achievements/Koni Cup.svg" },
  { rank: "3", title: "Online Indonesia International Biho Championship", year: "2021", image: "/achievements/Online Indonesia International Biho Championship.svg" },
  { rank: "1", title: "Speed Kicking", year: "2021", image: "/achievements/Speed Kicking.svg" },
  { rank: "2", title: "Kapolri Cup 3", year: "2022", image: "/achievements/Kapolri Cup 3.svg" },
];

const rankTheme: Record<string, { gradient: string; text: string; label: string }> = {
  "1": { gradient: "linear-gradient(135deg, #FFD700 0%, #E6A800 40%, #CC9500 100%)", text: "text-black", label: "1st" },
  "2": { gradient: "linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 40%, #A8A8A8 100%)", text: "text-black", label: "2nd" },
  "3": { gradient: "linear-gradient(135deg, #D4A06A 0%, #B8845A 40%, #A0653A 100%)", text: "text-white", label: "3rd" },
};

// Menggabungkan menjadi 4 halaman (2 spread) agar tidak terlalu padat di mobile
const pages = [
  achievements.slice(0, 3), // Hal 1
  achievements.slice(3, 6), // Hal 2
  achievements.slice(6, 9), // Hal 3
  achievements.slice(9, 11), // Hal 4
];

export default function Achievements() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pagesContainerRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lenis = useLenis();
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (!lenis || !sectionRef.current || !pagesContainerRef.current) return;

    // Set z-index awal agar halaman tertumpuk dengan benar (yang paling atas = z-index terbesar)
    pageRefs.current.forEach((page, i) => {
      if (page) {
        gsap.set(page, { zIndex: pages.length - i });
      }
    });

    const totalPages = pages.length;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=3000", // Panjang scroll untuk flip
          pin: true,
          scrub: 0.5, // Sedikit delay agar lebih organik
          onUpdate: (self) => {
            // Hitung halaman mana yang sedang terbuka
            const progress = self.progress;
            const index = Math.min(Math.floor(progress * totalPages), totalPages - 1);
            setCurrentPage(index);
          }
        }
      });

      // Animasi flip untuk setiap halaman KECUALI halaman terakhir (karena jadi cover belakang)
      pageRefs.current.slice(0, -1).forEach((page, i) => {
        if (!page) return;
        
        // Agar z-index berubah secara presisi tepat di tengah putaran (-90deg)
        // Kita pecah rotasi jadi dua bagian
        tl.to(page, {
          rotateY: -90,
          ease: "none",
          duration: 0.5,
          onComplete: () => gsap.set(page, { zIndex: i }), // Turunkan z-index setelah separuh jalan
          onReverseComplete: () => gsap.set(page, { zIndex: totalPages - i }) // Naikkan lagi kalau scroll naik
        }, `page-${i}`)
        .to(page, {
          rotateY: -180,
          ease: "none",
          duration: 0.5,
        }, `page-${i}+=0.5`);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [lenis]);

  return (
    <section id="achievements" className="relative z-20 bg-neutral-950 overflow-hidden">
      <div ref={sectionRef} className="h-screen w-full flex flex-col items-center justify-center pt-20 pb-10">
        
        {/* Header */}
        <div className="absolute top-10 md:top-20 left-0 w-full text-center z-30 px-4">
          <Reveal>
            <p className="mb-2 md:mb-4 text-xs font-bold uppercase tracking-[0.3em] text-amber-500">
              Milestones & Awards
            </p>
            <h2 className="text-[clamp(2rem,6vw,4rem)] font-bold leading-none tracking-tight text-white drop-shadow-lg">
              ACHIEVEMENTS
            </h2>
          </Reveal>
        </div>

        {/* 3D Book Container */}
        <div className="relative w-full max-w-[95vw] md:max-w-4xl lg:max-w-5xl h-[60vh] md:h-[65vh] mt-20 perspective-book">
          
          {/* Cover Buku (Hanya Background Belakang) */}
          <div className="absolute inset-0 mx-auto w-full max-w-[95%] md:max-w-full h-full bg-neutral-900 rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/5 flex">
            {/* Spine (Tengah Buku) */}
            <div className="absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 bg-neutral-950/40 z-0"></div>
          </div>

          <div ref={pagesContainerRef} className="absolute inset-0 w-full h-full flex justify-center preserve-3d px-1 md:px-0 py-2 md:py-4">
            
            {/* Sisi Kiri (Base) - Statis, akan di-cover oleh punggung halaman saat membalik */}
            <div className="relative w-1/2 h-full bg-neutral-800 rounded-l-lg border border-white/10 overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='1'%3E%3Cpath d='M20 0L40 20L20 40L0 20Z'/%3E%3C/g%3E%3C/svg%3E")`, backgroundSize: "30px 30px" }} />
              <div className="text-center">
                <TrophyIcon className="mx-auto h-16 w-16 text-amber-500/50 mb-4" />
                <h3 className="text-xl md:text-3xl font-bold text-white/50 tracking-tight">The Beginning</h3>
              </div>
            </div>

            {/* Sisi Kanan (Halaman Interaktif) - Poros Rotasi di Kiri (Origin-Left) */}
            <div className="relative w-1/2 h-full preserve-3d">
              {pages.map((pageItems, i) => (
                <div
                  key={`page-${i}`}
                  ref={(el) => { pageRefs.current[i] = el; }}
                  className="absolute inset-0 w-full h-full origin-left preserve-3d shadow-[-5px_0_15px_rgba(0,0,0,0.5)] rounded-r-lg"
                >
                  {/* Front Face (Halaman yang menampilkan Achievement) */}
                  <div className="absolute inset-0 w-full h-full backface-hidden bg-neutral-800 rounded-r-lg border-y border-r border-white/10 overflow-hidden flex flex-col p-3 md:p-6 page-gradient-front">
                    {/* Header Halaman (opsional) */}
                    <div className="flex justify-between items-center mb-3 md:mb-6 border-b border-white/10 pb-2">
                      <span className="text-xs md:text-sm font-bold text-amber-500 uppercase">Chapter</span>
                      <span className="text-[10px] md:text-xs text-white/40">Page {i + 1}</span>
                    </div>

                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 content-start overflow-y-auto pr-1 custom-scrollbar">
                      {pageItems.map((item) => (
                        <AchievementCard key={item.title} item={item} />
                      ))}
                    </div>
                  </div>

                  {/* Back Face (Bagian punggung halaman yang terlihat saat halaman menumpuk di sisi Kiri) */}
                  <div className="absolute inset-0 w-full h-full backface-hidden bg-neutral-850 rounded-l-lg border-y border-l border-white/10 rotate-y-180 overflow-hidden flex flex-col items-center justify-center p-6 page-gradient-back" style={{ backgroundColor: '#1f1f1f' }}>
                    <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='1'%3E%3Cpath d='M20 0L40 20L20 40L0 20Z'/%3E%3C/g%3E%3C/svg%3E")`, backgroundSize: "30px 30px" }} />
                    <span className="text-[80px] md:text-[150px] font-black text-white/5 leading-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                      {i + 1}
                    </span>
                    <TrophyIcon className="mx-auto h-12 w-12 md:h-20 md:w-20 text-amber-500/80 mb-4 drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]" />
                    <h3 className="text-lg md:text-2xl font-bold text-white mb-2">Milestones</h3>
                    <p className="text-[10px] md:text-xs text-neutral-400 font-medium uppercase tracking-widest text-center">
                      Continuing the journey...
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        </div>

        {/* Page Indicators */}
        <div className="absolute bottom-6 md:bottom-10 left-0 w-full flex justify-center gap-2 z-30">
          {pages.map((_, i) => (
            <div
              key={i}
              className={clsx(
                "h-1.5 rounded-full transition-all duration-300",
                currentPage === i ? "bg-amber-500 w-6" : "bg-white/20 w-1.5"
              )}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

function AchievementCard({ item }: { item: Achievement }) {
  if (item.image) {
    return (
      <div className="relative flex items-center justify-center overflow-hidden rounded-lg h-[120px] md:h-[150px] lg:h-[180px] shadow-md border border-white/5 bg-neutral-900/50 p-2">
        <img src={item.image} alt={item.title} className="h-full w-full object-contain drop-shadow-md" />
      </div>
    );
  }

  const theme = rankTheme[item.rank] ?? rankTheme["3"];

  return (
    <div
      className="relative flex flex-col items-center justify-center overflow-hidden rounded-lg h-[120px] md:h-[150px] lg:h-[180px] shadow-md p-2 md:p-3"
      style={{ background: theme.gradient }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Cpath d='M20 0L40 20L20 40L0 20Z'/%3E%3C/g%3E%3C/svg%3E")`, backgroundSize: "15px 15px" }} />

      <div className="relative z-10 flex flex-col items-center text-center w-full">
        <TrophyIcon className="mb-0.5 h-4 w-4 md:h-6 md:w-6" />
        <span className="text-xl md:text-2xl font-black leading-none">{item.rank}</span>
        <span className={clsx("mt-0.5 text-[7px] md:text-[9px] font-bold uppercase tracking-widest", theme.text === "text-white" ? "text-white/60" : "text-black/60")}>
          {theme.label} Place
        </span>
        <h3 className={clsx("mt-1 line-clamp-2 text-[9px] md:text-xs font-bold leading-tight", theme.text)} title={item.title}>
          {item.title}
        </h3>
        <span className={clsx("mt-1 text-[7px] md:text-[9px] font-semibold tracking-wide", theme.text === "text-white" ? "text-white/50" : "text-black/50")}>
          {item.year}
        </span>
      </div>
    </div>
  );
}

function TrophyIcon({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M14 6h20v14a10 10 0 01-10 10 10 10 0 01-10-10V6z" fill="currentColor" opacity="0.85" />
      <path d="M8 14a5 5 0 010-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M40 14a5 5 0 000-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M17 30h14l-2 4H19l-2-4z" fill="currentColor" opacity="0.75" />
      <rect x="16" y="34" width="16" height="3" rx="1.5" fill="currentColor" opacity="0.55" />
      <path d="M24 16l1.5 2.5 3 .5-2 2 .5 3-3-1.5-3 1.5.5-3-2-2 3-.5z" fill="currentColor" opacity="0.35" />
    </svg>
  );
}
