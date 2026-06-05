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

  function scrollProjectTrack(direction: "back" | "forward") {
    window.scrollBy({
      top: direction === "forward" ? 520 : -520,
      behavior: "smooth",
    });
  }

  return (
    <section
      ref={sectionRef}
      id="projects"
      style={{ height: scrollSectionHeight }}
      className="relative z-20 bg-neutral-950"
    >
      <div className="sticky top-0 mx-auto flex min-h-screen max-w-7xl flex-col justify-center overflow-hidden px-4 py-20 sm:px-6 md:px-8">
        <Reveal>
          <div className="mb-8 flex flex-col gap-5 md:mb-10 md:flex-row md:items-end md:justify-between">
            <div className="max-w-4xl">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-amber-500 sm:text-sm">
                Scroll down to slide
              </p>
              <h2 className="text-[clamp(2.5rem,10vw,6.5rem)] font-bold leading-none tracking-tight text-white">
                SELECTED <span className="text-amber-500">PROJECTS</span>
              </h2>
            </div>
            <div className="flex items-end justify-between gap-5 md:flex-col md:items-end">
              <p className="max-w-sm text-sm leading-relaxed text-neutral-400 md:text-right">
                {projects.length} selected web, AI, and creative builds arranged
                in a sideways scroll sequence.
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="Previous projects"
                  onClick={() => scrollProjectTrack("back")}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/[0.04] text-sm font-black text-white transition hover:border-amber-500 hover:bg-amber-500 hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                >
                  &lt;-
                </button>
                <button
                  type="button"
                  aria-label="Next projects"
                  onClick={() => scrollProjectTrack("forward")}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/[0.04] text-sm font-black text-white transition hover:border-amber-500 hover:bg-amber-500 hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                >
                  -&gt;
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        <div ref={viewportRef} className="relative overflow-hidden">
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
                className="h-full w-[82vw] max-w-[460px] shrink-0 sm:w-[430px] lg:w-[460px]"
              >
                <a
                  href={project.href}
                  target={isExternalLink(project.href) ? "_blank" : undefined}
                  rel={
                    isExternalLink(project.href)
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="group relative flex h-full min-h-[380px] flex-col overflow-hidden rounded-lg border border-white/10 bg-neutral-900 text-white transition duration-500 hover:-translate-y-1 hover:border-amber-500/70 hover:bg-neutral-800 sm:min-h-[430px]"
                >
                  <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-neutral-950">
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

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="mb-5 flex items-center justify-between gap-3">
                      <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
                        {project.type}
                      </span>
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 text-amber-500 transition-colors group-hover:border-amber-500 group-hover:bg-amber-500 group-hover:text-black">
                        -&gt;
                      </span>
                    </div>

                    <h3 className="mb-3 text-2xl font-bold leading-tight">
                      {project.title}
                    </h3>
                    <p className="mb-6 flex-1 text-sm leading-relaxed text-neutral-400">
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
