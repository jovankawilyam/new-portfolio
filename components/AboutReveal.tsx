"use client";

import {
  motion,
  MotionValue,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

function ScrollRevealText({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  const element = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateViewport = () => setIsMobile(mediaQuery.matches);

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);

    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  const { scrollYProgress } = useScroll({
    target: element,
    offset: isMobile ? ["start 0.82", "end 0.42"] : ["start 0.9", "start 0.25"],
  });

  const characters = children.split("");

  return (
    <p ref={element} className={clsx("flex flex-wrap", className)}>
      {characters.map((char, i) => {
        const start = i / characters.length;
        const end = start + 1 / characters.length;
        // Map range of specific character to opacity
        // But simple approach: useTransform on index logic is complex per char.
        // Alternative: Just stagger reveal based on view?
        // Request said "based on user scroll progress turn to white progressively".
        // So we need opacity mapped to scrollYProgress.
        return (
          <Char key={i} range={[start, end]} progress={scrollYProgress}>
            {char}
          </Char>
        );
      })}
    </p>
  );
}

function Char({
  children,
  range,
  progress,
}: {
  children: string;
  range: [number, number];
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, range, [0.3, 1]);
  return (
    <motion.span style={{ opacity }} className="transition-colors duration-200">
      {children === " " ? "\u00A0" : children}
    </motion.span>
  );
}

import Reveal from "@/components/Reveal";

const skills = [
  { name: "HTML", detail: "Semantic markup" },
  { name: "CSS", detail: "Responsive styling" },
  { name: "JavaScript", detail: "Interactive UI" },
  { name: "TypeScript", detail: "Typed frontend" },
  { name: "React", detail: "Component apps" },
  { name: "Laravel", detail: "Web backend" },
  { name: "Python", detail: "Data analysis" },
  { name: "Power BI", detail: "Dashboard insight" },
  { name: "Tableau", detail: "Data visualization" },
  { name: "REST API", detail: "Service integration" },
];

export default function AboutReveal() {
  const leftSkills = skills.slice(0, 5);
  const rightSkills = skills.slice(5);

  return (
    <section
      id="about"
      className="min-h-screen relative z-1 bg-neutral-950 flex items-center justify-center py-28 px-4"
    >
      <div className="max-w-6xl text-center md:text-left">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-amber-500 font-medium mb-8 uppercase tracking-widest"
        >
          About Me
        </motion.p>
        <div className="space-y-16">
          <Reveal>
            <h3 className="max-w-5xl text-4xl md:text-7xl font-black leading-[0.95] tracking-tight text-white">
              I combine analytical thinking and creativity to build{" "}
              <span className="text-amber-500">meaningful digital solutions</span>.
            </h3>
          </Reveal>
          <ScrollRevealText className="max-w-4xl text-xl font-medium leading-relaxed text-white md:text-3xl md:leading-relaxed">
            Hi, I am Jovanka Wilyam Muzaki, an active Information Systems
            student at Institut Bisnis dan Informatika Kesatuan Bogor. I have
            hands-on experience as a Front-End Developer in a website project
            and as a Data Analyst during a Data Science Bootcamp, with strong
            adaptability, leadership, and team collaboration through my role in
            Himpunan Mahasiswa Sistem Informasi.
          </ScrollRevealText>
          <div className="grid gap-4 md:grid-cols-2 md:gap-6">
            <div className="space-y-3">
              {leftSkills.map((skill) => (
                <SkillCard
                  key={skill.name}
                  {...skill}
                  direction="left"
                />
              ))}
            </div>
            <div className="space-y-3">
              {rightSkills.map((skill) => (
                <SkillCard
                  key={skill.name}
                  {...skill}
                  direction="right"
                />
              ))}
            </div>
          </div>



          <Reveal>
            <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <a
                href="https://personal-portofolio-jovanka.vercel.app/CV_Jovanka%20Wilyam_IBI%20Kesatuan.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-amber-600 px-7 py-4 text-sm font-black uppercase tracking-widest text-black transition hover:bg-white"
              >
                Download CV
              </a>
              <a
                href="#projects"
                className="rounded-full border border-white/15 px-7 py-4 text-sm font-black uppercase tracking-widest text-white transition hover:border-amber-500 hover:text-amber-500"
              >
                View Projects
              </a>
              <a
                href="#games"
                className="rounded-full border border-white/15 px-7 py-4 text-sm font-black uppercase tracking-widest text-white transition hover:border-amber-500 hover:text-amber-500"
              >
                View Games
              </a>
              <a
                href="#photobooth"
                className="rounded-full border border-white/15 px-7 py-4 text-sm font-black uppercase tracking-widest text-white transition hover:border-amber-500 hover:text-amber-500"
              >
                View Photobooth
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function SkillCard({
  name,
  detail,
  direction,
}: {
  name: string;
  detail: string;
  direction: "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.96", "start 0.54"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.28, 1], [0, 0.9, 1]);
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [direction === "left" ? -120 : 120, 0],
  );
  const blur = useTransform(scrollYProgress, [0, 1], ["blur(10px)", "blur(0px)"]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, x, filter: blur }}
      className="group flex origin-center transform-gpu items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-left transition hover:-translate-y-1 hover:border-amber-500/70 hover:bg-amber-500/10"
    >
      <span className="text-lg font-black tracking-tight text-white">{name}</span>
      <span className="text-sm font-medium text-neutral-400 transition group-hover:text-amber-200">
        {detail}
      </span>
    </motion.div>
  );
}
