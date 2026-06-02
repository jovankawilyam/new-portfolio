"use client";

import { motion } from "motion/react";

const achievements = [
  "Juara 3 Bandung Taekwondo International - 2017",
  "Juara 2 Liga Pelajar Taekwondo - 2017",
  "Juara 2 Palagan Open Taekwondo - 2018",
  "Juara 1 Al Irsyad Al Syamsiyyah Taekwondo - 2018",
  "Juara 1 Liga Pelajar Taekwondo - 2018",
  "Juara 3 Menpora Cup Taekwondo - 2019",
  "Juara 2 Pugnator Badung Sport Tourism International - 2019",
  "Juara 1 Koni Cup - 2019",
  "Juara 3 Online Indonesia International Biho Championship - 2021",
  "Juara 1 Speed Kicking - 2021",
  "Juara 2 Kapolri Cup 3 - 2022",
];

export default function Achievements() {
  return (
    <section className="relative z-20 bg-neutral-950 px-4 py-28 md:px-8 border-t border-white/5">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-12%" }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <p className="mb-6 text-center font-medium uppercase tracking-widest text-amber-500">
            Achievements
          </p>
          <h2 className="mb-12 text-center text-4xl font-bold leading-none tracking-tight text-white md:text-7xl">
            TAEKWONDO <span className="text-amber-500">TRACK RECORD</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-10%" }}
              transition={{
                duration: 0.55,
                delay: index * 0.035,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              className="rounded-2xl border border-white/10 bg-neutral-900 px-5 py-4 text-neutral-300 transition hover:border-amber-500/70 hover:text-white"
            >
              {achievement}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
