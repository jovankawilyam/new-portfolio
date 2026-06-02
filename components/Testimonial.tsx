"use client";

import Reveal from "@/components/Reveal";

const experiences = [
  {
    role: "Head of Human Resource Development",
    place: "Himpunan Mahasiswa Sistem Informasi",
    period: "2025 - 2026",
    description:
      "Led student resource development programs across student affairs and community divisions, supporting member growth, collaboration, and organizational impact.",
  },
  {
    role: "Data Analyst",
    place: "Data Science Bootcamp",
    period: "Bootcamp Project",
    description:
      "Analyzed datasets using Python to identify transaction patterns and translate findings into data-driven insights.",
  },
  {
    role: "Front-End Developer",
    place: "Website Jual Beli Akun PUBG",
    period: "Website Project",
    description:
      "Built responsive marketplace interfaces using HTML, CSS, JavaScript, and Laravel with CRUD, authentication, search, and filtering flows.",
  },
];

export default function Testimonial() {
  return (
    <section
      id="experience"
      className="relative z-20 overflow-hidden bg-neutral-900 px-4 py-32 text-white md:px-8"
    >
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <Reveal>
          <p className="mb-4 text-center text-sm font-bold uppercase tracking-[0.35em] text-amber-500">
            Experience
          </p>
          <h2 className="mb-14 text-center text-4xl font-black leading-none tracking-tight md:text-8xl">
            PRACTICAL <span className="text-amber-500">WORK</span>
          </h2>
        </Reveal>

        <div className="grid items-stretch gap-4 md:grid-cols-3">
          {experiences.map((experience, index) => (
            <Reveal key={experience.role} delay={index * 0.1} className="h-full">
              <article className="flex h-full min-h-[360px] flex-col rounded-3xl border border-white/10 bg-neutral-950 p-7 shadow-2xl shadow-black/20">
                <div className="mb-8 flex items-center justify-between gap-4">
                  <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-500">
                    {experience.period}
                  </span>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-neutral-400">
                    Experience
                  </span>
                </div>
                <h3 className="mb-3 text-2xl font-black tracking-tight">
                  {experience.role}
                </h3>
                <p className="mb-6 text-sm font-bold uppercase tracking-widest text-neutral-500">
                  {experience.place}
                </p>
                <p className="mt-auto text-base leading-relaxed text-neutral-300">
                  {experience.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
