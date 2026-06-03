"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import Reveal from "@/components/Reveal";

const projects = [
  {
    title: "Jual Beli Akun PUBGM Marketplace",
    href: "#contact",
    image: "/bento-1.webp",
    type: "Full Stack",
    tags: ["Laravel", "CRUD", "Auth"],
    description:
      "Marketplace web app with authentication, dynamic search, filtering, and responsive UI.",
  },
  {
    title: "Litbangku",
    href: "https://www.instagram.com/litbangku_id?igsh=ZXI1ejI1Mmo3dXp1",
    image: "/bento-2.webp",
    type: "Instagram Program",
    tags: ["Research", "Literacy", "Content"],
    description:
      "Literacy mapping, research-based planning, and community empowerment content.",
  },
  {
    title: "Hand Tracking",
    href: "https://hand-tracking-beige.vercel.app",
    image: "/sequence/00001.jpg",
    type: "Computer Vision",
    tags: ["Camera", "AI", "Web"],
    description:
      "Real-time camera experiment that detects hand movement for interactive AI-based controls.",
  },
  {
    title: "Sleep Detect",
    href: "https://sleep-detect.vercel.app",
    image: "/sequence/00047.jpg",
    type: "AI Experiment",
    tags: ["Python", "Vision", "Web"],
    description:
      "Computer vision project for detecting sleepiness or drowsiness through camera input.",
  },
  {
    title: "Photobooth Bounty",
    href: "https://photobooth-bounty.vercel.app/",
    image: "/sequence/00107.jpg",
    type: "Creative Tool",
    tags: ["Camera", "UI", "Photo"],
    description:
      "Automatic browser-based photobooth experience with themed output and simple capture flow.",
  },
  {
    title: "Seminar Registration",
    href: "https://pendaftaransysfornation.vercel.app/",
    image: "/sequence/00186.jpg",
    type: "Event System",
    tags: ["Form", "Event", "Web"],
    description:
      "Online registration flow for seminar participants, built for fast identity collection.",
  },
  {
    title: "Photobooth Vintage",
    href: "https://photobooth-vintage.vercel.app/",
    image: "/sequence/00245.jpg",
    type: "Creative Tool",
    tags: ["Camera", "Vintage", "UI"],
    description:
      "Retro-styled photobooth with classic framing and nostalgic visual treatment.",
  },
  {
    title: "Voting Pemira 2025",
    href: "https://voting-pemira2025.vercel.app/",
    image: "/sequence/00319.jpg",
    type: "Campus System",
    tags: ["Voting", "Campus", "Web"],
    description:
      "Student election voting platform focused on transparent and accessible participation.",
  },
  {
    title: "Valentine Day",
    href: "https://valentine-day-for-nayla.vercel.app/",
    image: "/sequence/00400.jpg",
    type: "Creative Tool",
    tags: ["Interactive", "Story", "Web"],
    description:
      "Interactive Valentine's Day surprise website with dynamic visual storytelling.",
  },
  {
    title: "Absensi Sederhana",
    href: "https://absensi-brown.vercel.app/",
    image: "/bento-3.webp",
    type: "Absensi",
    tags: ["Form", "Absensi", "Web"],
    description:
      "Simple attendance registration form with a clean and modern interface.",
  },
  {
    title: "Neon Hand Hockey",
    href: "https://gameneonhandhockey-byjovanka.vercel.app/",
    image: "/sequence/00480.jpg",
    type: "Game",
    tags: ["Game", "Neon", "Web"],
    description:
      "Interactive neon-themed hand hockey game with fast-paced gameplay and vibrant visuals.",
  },
];

const DESKTOP_INITIAL_PROJECT_COUNT = 6;
const MOBILE_INITIAL_PROJECT_COUNT = 3;

function isExternalLink(href: string) {
  return href.startsWith("http");
}

export default function BentoGrid() {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const initialProjectCount = isMobile
    ? MOBILE_INITIAL_PROJECT_COUNT
    : DESKTOP_INITIAL_PROJECT_COUNT;
  const visibleProjects = useMemo(
    () =>
      showAllProjects ? projects : projects.slice(0, initialProjectCount),
    [initialProjectCount, showAllProjects],
  );
  const hiddenProjectCount = projects.length - initialProjectCount;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    const updateViewport = () => setIsMobile(mediaQuery.matches);

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);

    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  return (
    <section
      id="projects"
      className="relative z-20 bg-neutral-950 px-4 py-24 sm:px-6 md:px-8 md:py-36"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-10 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between">
            <div className="max-w-4xl">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-amber-500 sm:text-sm">
                Click to open
              </p>
              <h2 className="text-[clamp(2.5rem,10vw,6.5rem)] font-bold leading-none tracking-tight text-white">
                SELECTED <span className="text-amber-500">PROJECTS</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-neutral-400 md:text-right">
              Showing {visibleProjects.length} of {projects.length} polished
              web, AI, and creative builds.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {visibleProjects.map((project, index) => (
            <Reveal key={project.title} delay={index * 0.04} className="h-full">
              <a
                href={project.href}
                target={isExternalLink(project.href) ? "_blank" : undefined}
                rel={
                  isExternalLink(project.href)
                    ? "noopener noreferrer"
                    : undefined
                }
                className="group relative flex h-full min-h-[360px] flex-col overflow-hidden rounded-lg border border-white/10 bg-neutral-900 text-white transition duration-500 hover:-translate-y-1 hover:border-amber-500/70 hover:bg-neutral-800 sm:min-h-[400px]"
              >
                <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-neutral-950">
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover opacity-25 blur-lg scale-110"
                    aria-hidden="true"
                  />
                  <Image
                    src={project.image}
                    alt={`${project.title} preview`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
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
        </div>

        {hiddenProjectCount > 0 && (
          <Reveal>
            <div className="mt-10 flex justify-center md:mt-12">
              <button
                type="button"
                aria-expanded={showAllProjects}
                onClick={() => setShowAllProjects((current) => !current)}
                className="rounded-full border border-white/15 bg-white/[0.03] px-7 py-4 text-sm font-black uppercase tracking-widest text-white transition hover:border-amber-500 hover:bg-amber-500 hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
              >
                {showAllProjects
                  ? "Show Less"
                  : `Show More (${hiddenProjectCount})`}
              </button>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
