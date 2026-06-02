"use client";

import Image from "next/image";
import { useState } from "react";
import Reveal from "@/components/Reveal";

const projectLinks = [
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
];

export default function BentoGrid() {
  const [activeProject, setActiveProject] = useState(0);
  const currentProject = projectLinks[activeProject];

  const showProjectSlide = (index: number) => {
    setActiveProject(index);
    document.getElementById("project-slider")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const nextProject = () => {
    setActiveProject((current) => (current + 1) % projectLinks.length);
  };

  const previousProject = () => {
    setActiveProject(
      (current) => (current - 1 + projectLinks.length) % projectLinks.length,
    );
  };

  return (
    <section
      id="projects"
      className="bg-neutral-950 py-48 px-4 md:px-8 relative z-20 rounded-t-3xl border-t border-white/5"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-16 text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-amber-500">
              Click to explore
            </p>
            <h2 className="text-4xl font-bold text-white md:text-8xl tracking-tight leading-none">
              SELECTED <span className="text-amber-500">PROJECTS</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-2 h-auto md:h-[600px]">
          {/* Large Card */}
          <Reveal className="col-span-1 row-span-1 h-full md:col-span-2 md:row-span-2">
            <a
              href="#contact"
              className="group relative block h-[400px] overflow-hidden rounded-3xl bg-neutral-900 text-white transition duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/10 md:h-full"
            >
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent z-10" />
              <div className="absolute right-6 top-6 z-20 rounded-full border border-white/20 bg-black/40 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white backdrop-blur">
                Ask for demo
              </div>
              <div className="absolute bottom-0 left-0 p-8 z-20">
                <div className="mb-4 flex flex-wrap gap-2">
                  {["Laravel", "CRUD", "Auth"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-3xl font-bold mb-3">
                  Jual Beli Akun PUBGM <br />
                  Marketplace
                </h3>
                <p className="mb-5 max-w-md text-neutral-300">
                  Full-stack web-based marketplace using Laravel with CRUD,
                  authentication, dynamic search, filtering, and responsive UI.
                </p>
                <span className="inline-flex items-center gap-2 font-bold text-amber-500">
                  Contact for project details
                  <span className="transition-transform group-hover:translate-x-1">
                    -&gt;
                  </span>
                </span>
              </div>
              <Image
                src="/bento-1.webp"
                alt="Jual Beli Akun PUBGM project preview"
                fill
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </a>
          </Reveal>

          {/* Small Card 1 */}
          <Reveal
            delay={0.1}
            className="col-span-1 h-full"
          >
            <a
              href="https://www.instagram.com/litbangku_id?igsh=ZXI1ejI1Mmo3dXp1"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex h-[300px] flex-col justify-end overflow-hidden rounded-3xl bg-neutral-900 p-8 text-white transition duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/10 md:h-full"
            >
              <span className="relative z-10 mb-3 text-xs font-bold uppercase tracking-widest text-amber-500">
                Instagram Program
              </span>
              <h3 className="text-2xl font-bold mb-2 relative z-10">
                Litbangku
              </h3>
              <p className="text-sm text-neutral-300 relative z-10">
                Initiated literacy mapping, research-based planning, and
                community empowerment content for financial literacy awareness.
              </p>
              <span className="relative z-10 mt-5 font-bold text-amber-500">
                Open page -&gt;
              </span>
              <Image
                src="/bento-2.webp"
                alt="Litbangku project preview"
                fill
                sizes="(min-width: 768px) 25vw, 100vw"
                className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-neutral-900/50 z-0" />
            </a>
          </Reveal>

          {/* Small Card 2 */}
          <Reveal
            delay={0.2}
            className="group relative col-span-1 h-[300px] overflow-hidden rounded-3xl bg-amber-600 p-8 flex flex-col justify-center items-center text-center md:h-full transition duration-500 hover:-translate-y-2 hover:bg-amber-500"
          >
            <h3 className="text-6xl font-black text-black mb-2 tracking-tighter">
              3+
            </h3>
            <p className="text-black/80 font-bold uppercase tracking-widest text-xs">
              Core Focus Areas
            </p>
            <p className="mt-5 max-w-48 text-sm font-semibold leading-relaxed text-black/70">
              Web development, data analytics, and creative leadership.
            </p>
          </Reveal>

          {/* Wide Card */}
          <Reveal
            delay={0.3}
            className="col-span-1 h-full md:col-span-2"
          >
            <button
              type="button"
              onClick={() => showProjectSlide(activeProject)}
              className="group relative flex h-[300px] w-full items-end overflow-hidden rounded-3xl bg-neutral-900 p-8 text-left text-white transition duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/10 md:h-full"
            >
              <div className="relative z-10 max-w-sm">
                <h3 className="text-2xl font-bold mb-2">AI & Web Projects</h3>
                <p className="text-neutral-300">
                  Shipped camera-based experiments, event registration flows,
                  photobooth tools, and digital voting experiences.
                </p>
                <span className="mt-5 inline-flex items-center gap-2 font-bold text-amber-500">
                  See all live demos
                  <span className="transition-transform group-hover:translate-x-1">
                    -&gt;
                  </span>
                </span>
              </div>
              <Image
                src="/bento-3.webp"
                alt="AI and web projects preview"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="absolute inset-0 h-full w-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-r from-neutral-900 to-transparent z-0" />
            </button>
          </Reveal>
        </div>

        <Reveal>
          <div
            id="project-slider"
            className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-neutral-900 text-white"
          >
            <div className="grid min-h-[520px] grid-cols-1 md:grid-cols-2">
              <div className="relative min-h-[320px] overflow-hidden bg-neutral-950 md:min-h-full">
                <Image
                  src={currentProject.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover opacity-25 blur-xl scale-110"
                  aria-hidden="true"
                />
                <Image
                  src={currentProject.image}
                  alt={`${currentProject.title} preview`}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-contain p-6 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-black/20" />
                <div className="absolute left-6 top-6 rounded-full bg-black/50 px-4 py-2 text-xs font-bold uppercase tracking-widest text-amber-300 backdrop-blur">
                  {activeProject + 1} / {projectLinks.length}
                </div>
              </div>

              <div className="flex flex-col justify-between p-6 md:p-10">
                <div>
                  <span className="mb-6 inline-flex rounded-full bg-amber-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-amber-500">
                    {currentProject.type}
                  </span>
                  <h3 className="mb-5 text-4xl font-black tracking-tight md:text-6xl">
                    {currentProject.title}
                  </h3>
                  <p className="max-w-xl text-lg leading-relaxed text-neutral-300">
                    {currentProject.description}
                  </p>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {currentProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 px-3 py-1 text-xs text-neutral-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={previousProject}
                    className="grid h-12 w-12 place-items-center rounded-full border border-white/15 text-white transition hover:border-amber-500 hover:text-amber-500"
                    aria-label="Previous project"
                  >
                    &lt;
                  </button>
                  <button
                    type="button"
                    onClick={nextProject}
                    className="grid h-12 w-12 place-items-center rounded-full border border-white/15 text-white transition hover:border-amber-500 hover:text-amber-500"
                    aria-label="Next project"
                  >
                    &gt;
                  </button>
                  <a
                    href={currentProject.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-amber-600 px-7 py-4 font-bold text-black transition hover:bg-white"
                  >
                    Open Live Demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <div
          id="all-projects"
          className="mt-8 grid grid-cols-1 items-stretch gap-4 md:grid-cols-3"
        >
          {projectLinks.map((project, index) => (
            <Reveal key={project.title} delay={index * 0.05} className="h-full">
              <button
                type="button"
                onClick={() => showProjectSlide(index)}
                className="group relative flex h-full min-h-[430px] w-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-neutral-900 text-left text-white transition duration-500 hover:-translate-y-2 hover:border-amber-500/70 hover:bg-neutral-800"
              >
                <div className="relative h-52 shrink-0 overflow-hidden bg-neutral-950">
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover opacity-25 blur-lg scale-110"
                    aria-hidden="true"
                  />
                  <Image
                    src={project.image}
                    alt={`${project.title} preview`}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-contain p-4 opacity-95 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-neutral-900 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-500">
                      {project.type}
                    </span>
                    <span className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-amber-500 transition-colors group-hover:border-amber-500 group-hover:bg-amber-500 group-hover:text-black">
                      -&gt;
                    </span>
                  </div>
                  <h3 className="mb-3 text-2xl font-bold">{project.title}</h3>
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
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
