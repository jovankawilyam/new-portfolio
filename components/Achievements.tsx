"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Achievement = {
  rank: string;
  title: string;
  year: string;
};

const achievements: Achievement[] = [
  {
    rank: "3",
    title: "Bandung Taekwondo International",
    year: "2017",
  },
  {
    rank: "2",
    title: "Liga Pelajar Taekwondo",
    year: "2017",
  },
  {
    rank: "2",
    title: "Palagan Open Taekwondo",
    year: "2018",
  },
  {
    rank: "1",
    title: "Al Irsyad Al Syamsiyyah Taekwondo",
    year: "2018",
  },
  {
    rank: "1",
    title: "Liga Pelajar Taekwondo",
    year: "2018",
  },
  {
    rank: "3",
    title: "Menpora Cup Taekwondo",
    year: "2019",
  },
  {
    rank: "2",
    title: "Pugnator Badung Sport Tourism International",
    year: "2019",
  },
  {
    rank: "1",
    title: "Koni Cup",
    year: "2019",
  },
  {
    rank: "3",
    title: "Online Indonesia International Biho Championship",
    year: "2021",
  },
  {
    rank: "1",
    title: "Speed Kicking",
    year: "2021",
  },
  {
    rank: "2",
    title: "Kapolri Cup 3",
    year: "2022",
  },
];

gsap.registerPlugin(ScrollTrigger);

export default function Achievements() {
  const sectionRef = useRef<HTMLElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLElement[]>([]);
  const indicatorRefs = useRef<HTMLSpanElement[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const orbit = orbitRef.current;

    if (!section || !orbit) {
      return;
    }

    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean);
      const indicators = indicatorRefs.current.filter(Boolean);
      const totalSteps = achievements.length - 1;

      const setOrbit = (progress: number) => {
        const bounds = orbit.getBoundingClientRect();
        const radiusX = Math.min(bounds.width * 0.42, 430);
        const radiusY = Math.min(bounds.height * 0.34, 245);
        const activeIndex = progress * totalSteps;
        const angleStep = (Math.PI * 2) / achievements.length;

        cards.forEach((card, index) => {
          const distance = index - activeIndex;
          const focus = Math.max(0, 1 - Math.abs(distance));
          const orbitAmount = 1 - focus;

          // The circular path is driven by trigonometry so the cards feel like
          // they are attached to one rotating achievement wheel.
          const angle = distance * angleStep - Math.PI / 2;
          const x = Math.cos(angle) * radiusX * orbitAmount;
          const y = Math.sin(angle) * radiusY * orbitAmount;
          const scale = 0.74 + focus * 0.42;
          const opacity = 0.26 + focus * 0.74;
          const blur = Math.round((1 - focus) * 1.4);

          gsap.set(card, {
            x,
            xPercent: -50,
            y,
            yPercent: -50,
            scale,
            opacity,
            zIndex: Math.round(focus * 100) + achievements.length - index,
            filter: `blur(${blur}px)`,
          });

          card.toggleAttribute("data-active", focus > 0.62);
        });

        indicators.forEach((indicator, index) => {
          const focus = Math.max(0, 1 - Math.abs(index - activeIndex));

          gsap.set(indicator, {
            scale: 0.72 + focus * 0.48,
            opacity: 0.28 + focus * 0.72,
          });
        });
      };

      setOrbit(0);

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${achievements.length * 420}`,
        pin: true,
        scrub: 0.85,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => setOrbit(self.progress),
        onRefresh: (self) => setOrbit(self.progress),
      });

      return () => {
        trigger.kill();
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-20 min-h-screen overflow-hidden border-t border-white/5 bg-neutral-950 px-4 py-10 md:px-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.16),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_28%,transparent_72%,rgba(255,255,255,0.02))]" />

      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl flex-col justify-center">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-5 text-sm font-medium uppercase tracking-[0.32em] text-amber-500">
            Achievements
          </p>
          <h2 className="text-4xl font-bold leading-none tracking-tight text-white md:text-7xl">
            TAEKWONDO <span className="text-amber-500">ORBIT</span>
          </h2>
        </div>

        <div
          ref={orbitRef}
          className="relative mx-auto mt-8 h-[560px] w-full max-w-6xl overflow-hidden [--orbit-center-y:53%] sm:h-[590px] md:mt-10 md:h-[620px] md:[--orbit-center-y:52%]"
        >
          <div className="absolute left-1/2 top-[var(--orbit-center-y)] size-[min(82vw,620px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 shadow-[0_0_90px_rgba(245,158,11,0.08)]" />
          <div className="absolute left-1/2 top-[var(--orbit-center-y)] size-[min(58vw,430px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-500/15" />
          <div className="absolute left-1/2 top-[var(--orbit-center-y)] h-px w-[min(88vw,760px)] -translate-x-1/2 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
          <div className="absolute left-1/2 top-[var(--orbit-center-y)] h-[min(78vw,580px)] w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-white/10 to-transparent" />

          {achievements.map((achievement, index) => (
            <article
              key={`${achievement.title}-${achievement.year}`}
              ref={(node) => {
                if (node) {
                  cardRefs.current[index] = node;
                }
              }}
              className="absolute left-1/2 top-[var(--orbit-center-y)] w-[min(82vw,420px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-neutral-900/88 p-5 text-left text-white shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur transition-colors duration-300 data-[active]:border-amber-400/70 data-[active]:shadow-[0_28px_110px_rgba(245,158,11,0.23)] sm:p-6"
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <div className="grid size-20 shrink-0 place-items-center rounded-full border border-amber-400/40 bg-neutral-950 shadow-[inset_0_0_0_6px_rgba(245,158,11,0.08)]">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-500">
                    Juara
                  </span>
                  <span className="-mt-2 text-4xl font-black leading-none text-white">
                    {achievement.rank}
                  </span>
                </div>

                <div className="rounded-full border border-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-neutral-400">
                  {achievement.year}
                </div>
              </div>

              <h3 className="text-balance text-2xl font-semibold leading-tight text-white sm:text-3xl">
                {achievement.title}
              </h3>
              <p className="mt-3 text-sm uppercase tracking-[0.22em] text-amber-500/80">
                Taekwondo Achievement
              </p>
            </article>
          ))}
        </div>

        <div className="mx-auto -mt-4 flex max-w-[88vw] items-center justify-center gap-2 overflow-hidden">
          {achievements.map((achievement, index) => (
            <span
              key={`${achievement.year}-${achievement.title}`}
              ref={(node) => {
                if (node) {
                  indicatorRefs.current[index] = node;
                }
              }}
              className="size-2 shrink-0 rounded-full bg-amber-500"
              aria-label={`${achievement.title} ${achievement.year}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
