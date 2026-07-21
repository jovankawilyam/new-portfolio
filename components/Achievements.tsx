"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import Reveal from "@/components/Reveal";

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

const rankTheme: Record<
  string,
  { gradient: string; text: string; label: string }
> = {
  "1": {
    gradient:
      "linear-gradient(135deg, #FFD700 0%, #E6A800 40%, #CC9500 100%)",
    text: "text-black",
    label: "1st",
  },
  "2": {
    gradient:
      "linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 40%, #A8A8A8 100%)",
    text: "text-black",
    label: "2nd",
  },
  "3": {
    gradient:
      "linear-gradient(135deg, #D4A06A 0%, #B8845A 40%, #A0653A 100%)",
    text: "text-white",
    label: "3rd",
  },
};

const row1 = achievements.slice(0, 4);
const row2 = achievements.slice(4, 8);
const row3 = achievements.slice(8, 11);

export default function Achievements() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const section = sectionRef.current;
    const wrapper = wrapperRef.current;
    if (!section || !wrapper) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrapper,
        {
          y: -700,
          rotateX: 15,
          rotateZ: 20,
          opacity: 0.15,
          scale: 0.95,
        },
        {
          y: 0,
          rotateX: 0,
          rotateZ: 0,
          opacity: 1,
          scale: 1,
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "top 20%",
            scrub: 2,
          },
          ease: "none",
        },
      );
    });

    ScrollTrigger.refresh();

    return () => {
      lenis.off("scroll", onScroll);
      ctx.revert();
    };
  }, [lenis]);

  return (
    <section
      ref={sectionRef}
      id="achievements"
      className="relative z-20 overflow-hidden bg-neutral-950"
      style={{ height: "200vh" }}
    >
      <div className="sticky top-0 flex min-h-svh flex-col justify-center overflow-hidden px-4 py-20 sm:py-28 md:px-8 md:py-36 [perspective:1000px] [transform-style:preserve-3d]">
        <div className="mx-auto w-full max-w-7xl">
          <Reveal>
            <div className="mb-12 text-left md:text-center">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-amber-500">
                Milestones & Awards
              </p>
              <h2 className="text-[clamp(2.5rem,7vw,5rem)] font-bold leading-none tracking-tight text-white">
                ACHIEVEMENTS
              </h2>
            </div>
          </Reveal>

          <div
            ref={wrapperRef}
            className="space-y-4 sm:space-y-5 lg:space-y-6"
            style={{
              opacity: 0.15,
              transform:
                "translateY(-700px) rotateX(15deg) rotateZ(20deg) scale(0.95)",
            }}
          >
            <AchievementRow items={row1} reversed />
            <AchievementRow items={row2} />
            <AchievementRow items={row3} reversed />
          </div>
        </div>
      </div>
    </section>
  );
}

function AchievementRow({
  items,
  reversed = false,
}: {
  items: Achievement[];
  reversed?: boolean;
}) {
  return (
    <div
      className={`flex gap-3 sm:gap-4 lg:gap-5 overflow-x-auto ${reversed ? "flex-row-reverse" : "flex-row"}`}
    >
      {items.map((item) => (
        <AchievementCard key={item.title} item={item} />
      ))}
    </div>
  );
}

function TrophyIcon({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <path
        d="M14 6h20v14a10 10 0 01-10 10 10 10 0 01-10-10V6z"
        fill="currentColor"
        opacity="0.85"
      />
      <path
        d="M8 14a5 5 0 010-10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M40 14a5 5 0 000-10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M17 30h14l-2 4H19l-2-4z"
        fill="currentColor"
        opacity="0.75"
      />
      <rect
        x="16"
        y="34"
        width="16"
        height="3"
        rx="1.5"
        fill="currentColor"
        opacity="0.55"
      />
      <path
        d="M24 16l1.5 2.5 3 .5-2 2 .5 3-3-1.5-3 1.5.5-3-2-2 3-.5z"
        fill="currentColor"
        opacity="0.35"
      />
    </svg>
  );
}

function AchievementCard({ item }: { item: Achievement }) {
  if (item.image) {
    return (
      <div className="relative min-w-[160px] flex-1 overflow-hidden rounded-2xl h-[200px] sm:h-[260px] lg:h-[310px]">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
      </div>
    );
  }

  const theme = rankTheme[item.rank] ?? rankTheme["3"];

  return (
    <div
      className="group relative flex min-w-[160px] flex-1 flex-col items-center justify-center overflow-hidden rounded-2xl h-[200px] sm:h-[260px] lg:h-[310px]"
      style={{ background: theme.gradient }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-500 group-hover:opacity-70"
        style={{
          background:
            "radial-gradient(ellipse at 30% 15%, rgba(255,255,255,0.35) 0%, transparent 60%)",
        }}
      />

      <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Cpath d='M20 0L40 20L20 40L0 20Z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center px-3 text-center sm:px-4">
        <TrophyIcon className="mb-1 h-7 w-7 sm:mb-2 sm:h-9 sm:w-9 lg:h-10 lg:w-10" />

        <span className="text-3xl font-black leading-none sm:text-4xl lg:text-5xl">
          {item.rank}
        </span>

        <span
          className={`mt-0.5 text-[10px] font-bold uppercase tracking-widest sm:text-xs ${theme.text}/60`}
        >
          {theme.label} Place
        </span>

        <h3
          className={`mt-1.5 line-clamp-2 text-xs font-bold leading-tight sm:text-sm lg:text-base ${theme.text}`}
          title={item.title}
        >
          {item.title}
        </h3>

        <div className="mt-2 flex items-center gap-1.5 sm:mt-3 sm:gap-2">
          <div
            className={`h-px w-6 sm:w-8 ${theme.text === "text-white" ? "bg-white/30" : "bg-black/30"}`}
          />
          <div
            className={`size-1 rounded-full sm:size-1.5 ${theme.text === "text-white" ? "bg-white/40" : "bg-black/40"}`}
          />
          <div
            className={`h-px w-6 sm:w-8 ${theme.text === "text-white" ? "bg-white/30" : "bg-black/30"}`}
          />
        </div>

        <span
          className={`mt-1.5 text-[10px] font-semibold tracking-wide sm:text-xs ${theme.text}/50`}
        >
          {item.year}
        </span>
      </div>
    </div>
  );
}
