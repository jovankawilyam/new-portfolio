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
      className="relative z-20 overflow-visible bg-neutral-900 px-4 py-28 text-white md:px-8 md:py-32"
    >
      <div className="relative z-10 mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-amber-500">
                Experience
              </p>
              <h2 className="text-4xl font-black leading-none tracking-tight md:text-8xl">
                PRACTICAL <span className="text-amber-500">WORK</span>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-neutral-400 md:text-right">
              Organizational, data, and frontend work arranged as a stacked
              scroll sequence.
            </p>
          </div>
        </Reveal>

        <div className="space-y-8 md:space-y-12">
          {experiences.map((experience, index) => (
            <div
              key={experience.role}
              className="sticky"
              style={{
                top: `calc(5rem + ${index * 1.5}rem)`,
                zIndex: index + 1,
              }}
            >
              <Reveal delay={index * 0.08}>
                <article className="grid min-h-[420px] overflow-hidden rounded-lg border border-white/10 bg-neutral-950 shadow-2xl shadow-black/30 md:grid-cols-[0.8fr_1.2fr]">
                  <div className="flex flex-col justify-between border-b border-white/10 bg-neutral-900 p-6 md:border-b-0 md:border-r md:p-8">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-500">
                        0{index + 1}
                      </span>
                      <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-neutral-400">
                        {experience.period}
                      </span>
                    </div>
                    <p className="mt-12 text-sm font-bold uppercase tracking-[0.35em] text-neutral-500 md:mt-0">
                      Experience
                    </p>
                  </div>

                  <div className="flex flex-col justify-end p-6 md:p-10">
                    <p className="mb-5 text-sm font-bold uppercase tracking-widest text-amber-500">
                      {experience.place}
                    </p>
                    <h3 className="max-w-4xl text-4xl font-black leading-none tracking-tight md:text-6xl">
                      {experience.role}
                    </h3>
                    <p className="mt-8 max-w-3xl text-base leading-relaxed text-neutral-300 md:text-lg">
                      {experience.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
