"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";

const projects = [
  {
    title: "Jual Beli Akun PUBGM Marketplace",
    href: "#contact",
    image: "/images/pubg.png",
    type: "Full Stack",
    tags: ["Laravel", "CRUD", "Auth"],
    description:
      "Marketplace web app with authentication, dynamic search, filtering, and responsive UI.",
  },
  {
    title: "Litbangku",
    href: "https://www.instagram.com/litbangku_id?igsh=ZXI1ejI1Mmo3dXp1",
    image: "/images/litbangku.JPG",
    type: "Instagram Program",
    tags: ["Research", "Literacy", "Content"],
    description:
      "Literacy mapping, research-based planning, and community empowerment content.",
  },
  {
    title: "Hand Tracking",
    href: "https://hand-tracking-beige.vercel.app",
    image: "/images/handtracking1.png",
    type: "Computer Vision",
    tags: ["Camera", "AI", "Web"],
    description:
      "Real-time camera experiment that detects hand movement for interactive AI-based controls.",
  },
  {
    title: "Sleep Detect",
    href: "https://sleep-detect.vercel.app",
    image: "/images/sleepdetected.png",
    type: "AI Experiment",
    tags: ["Python", "Vision", "Web"],
    description:
      "Computer vision project for detecting sleepiness or drowsiness through camera input.",
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
    title: "Seminar Registration",
    href: "https://pendaftaransysfornation.vercel.app/",
    image: "/images/pendaftaran.png",
    type: "Event System",
    tags: ["Form", "Event", "Web"],
    description:
      "Online registration flow for seminar participants, built for fast identity collection.",
  },
  {
    title: "Photobooth Vintage",
    href: "https://photobooth-vintage.vercel.app/",
    image: "/images/vintage.png",
    type: "Creative Tool",
    tags: ["Camera", "Vintage", "UI"],
    description:
      "Retro-styled photobooth with classic framing and nostalgic visual treatment.",
  },
  {
    title: "Voting Pemira 2025",
    href: "https://voting-pemira2025.vercel.app/",
    image: "/images/pemilihan.png",
    type: "Campus System",
    tags: ["Voting", "Campus", "Web"],
    description:
      "Student election voting platform focused on transparent and accessible participation.",
  },
  {
    title: "Valentine Day",
    href: "https://valentine-day-for-nayla.vercel.app/",
    image: "/images/valentine.png",
    type: "Creative Tool",
    tags: ["Interactive", "Story", "Web"],
    description:
      "Interactive Valentine's Day surprise website with dynamic visual storytelling.",
  },
  {
    title: "Absensi Sederhana",
    href: "https://absensi-brown.vercel.app/",
    image: "/images/absensi.png",
    type: "Absensi",
    tags: ["Form", "Absensi", "Web"],
    description:
      "Simple attendance registration form with a clean and modern interface.",
  },
];

function isExternalLink(href: string) {
  return href.startsWith("http");
}

export default function BentoGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxHorizontalTravel, setMaxHorizontalTravel] = useState(0);
  const [scrollSectionHeight, setScrollSectionHeight] = useState("520vh");
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -maxHorizontalTravel],
  );

  useLayoutEffect(() => {
    function measureProjectTrack() {
      const viewport = viewportRef.current;
      const track = trackRef.current;

      if (!viewport || !track) {
        return;
      }

      const travel = Math.max(track.scrollWidth - viewport.clientWidth, 0);
      setMaxHorizontalTravel(travel);
      setScrollSectionHeight(
        `${Math.max(window.innerHeight + travel, window.innerHeight * 1.8)}px`,
      );
    }

    measureProjectTrack();

    const resizeObserver = new ResizeObserver(measureProjectTrack);
    if (viewportRef.current) resizeObserver.observe(viewportRef.current);
    if (trackRef.current) resizeObserver.observe(trackRef.current);

    window.addEventListener("resize", measureProjectTrack);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measureProjectTrack);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      style={{ height: scrollSectionHeight }}
      className="relative z-20 bg-neutral-950"
    >
      <div className="sticky top-0 mx-auto flex h-svh min-h-0 max-w-7xl flex-col justify-start overflow-hidden px-4 py-7 sm:px-6 sm:py-10 md:px-8 md:py-12 lg:py-10 xl:py-12 [@media_(max-height:820px)]:py-8">
        <Reveal>
          <div className="mb-4 flex flex-col gap-3 md:mb-7 md:flex-row md:items-end md:justify-between md:gap-5 [@media_(max-height:820px)]:mb-5">
            <div className="max-w-4xl">
              <h2 className="text-[clamp(2rem,8vw,5.75rem)] font-bold leading-none tracking-tight text-white sm:text-[clamp(2.5rem,8vw,5.75rem)] [@media_(max-height:820px)]:text-[clamp(2.25rem,6vw,4.25rem)]">
                SELECTED <span className="text-amber-500">PROJECTS</span>
              </h2>
            </div>
            <div className="flex items-center justify-end">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.24em] text-amber-500 sm:text-sm sm:tracking-[0.3em]">Scroll down to slide</h2>
            </div>
          </div>
        </Reveal>

        <div ref={viewportRef} className="relative min-h-0 flex-1 overflow-hidden">
          <div className="pointer-events-none absolute bottom-6 right-0 top-0 z-10 hidden w-24 bg-linear-to-l from-neutral-950 to-transparent lg:block" />
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex w-max gap-4 pb-4 will-change-transform lg:gap-5"
          >
            {projects.map((project, index) => (
              <Reveal
                key={project.title}
                delay={index * 0.035}
                className="h-[min(520px,calc(100svh-205px))] min-h-[420px] w-[86vw] max-w-[420px] shrink-0 sm:h-[min(900px,calc(100svh-300px))] sm:min-h-[420px] sm:w-[430px] sm:max-w-[460px] lg:h-[min(900px,calc(100svh-285px))] lg:min-h-[430px] lg:w-[460px] [@media_(max-height:700px)]:h-[calc(100svh-185px)] [@media_(max-height:700px)]:min-h-[380px] [@media_(max-height:820px)]:lg:h-[min(450px,calc(100svh-285px))]"
              >
                <a
                  href={project.href}
                  target={isExternalLink(project.href) ? "_blank" : undefined}
                  rel={
                    isExternalLink(project.href)
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="group relative flex h-full min-h-0 flex-col overflow-hidden rounded-lg border border-white/10 bg-neutral-900 text-white transition duration-500 hover:-translate-y-1 hover:border-amber-500/70 hover:bg-neutral-800"
                >
                  <div className="relative aspect-[16/8] shrink-0 overflow-hidden bg-neutral-950 sm:aspect-[16/10] [@media_(max-height:700px)]:aspect-[16/7] [@media_(max-height:820px)]:lg:aspect-[16/7]">
                    <Image
                      src={project.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 460px, (min-width: 640px) 430px, 82vw"
                      className="scale-110 object-cover opacity-25 blur-lg"
                      aria-hidden="true"
                    />
                    <Image
                      src={project.image}
                      alt={`${project.title} preview`}
                      fill
                      sizes="(min-width: 1024px) 460px, (min-width: 640px) 430px, 82vw"
                      className="object-contain p-4 opacity-95 transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-neutral-900 to-transparent" />
                  </div>

                  <div className="flex min-h-0 flex-1 flex-col p-4 sm:p-6 [@media_(max-height:820px)]:lg:p-4">
                    <div className="mb-3 flex items-center justify-between gap-3 sm:mb-5 [@media_(max-height:820px)]:lg:mb-3">
                      <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
                        {project.type}
                      </span>
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 text-amber-500 transition-colors group-hover:border-amber-500 group-hover:bg-amber-500 group-hover:text-black">
                        &gt;
                      </span>
                    </div>

                    <h3 className="mb-2 text-xl font-bold leading-tight sm:mb-3 sm:text-2xl [@media_(max-height:820px)]:lg:mb-2 [@media_(max-height:820px)]:lg:text-xl">
                      {project.title}
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed text-neutral-400 sm:mb-6 [@media_(max-height:700px)]:line-clamp-3 [@media_(max-height:820px)]:lg:mb-4 [@media_(max-height:820px)]:lg:line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 px-3 py-1 text-xs text-neutral-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
