"use client";

import Reveal from "@/components/Reveal";
export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative z-10 bg-neutral-950 py-24 px-4 md:px-8 border-t border-white/5"
    >
      <Reveal>
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 max-w-3xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-amber-500">
              Contact
            </p>
            <h2 className="text-4xl font-black leading-tight tracking-tighter text-white md:text-7xl">
              Interested in working together or viewing more details?
            </h2>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://wa.me/6281911883609"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-amber-600 px-7 py-4 font-bold text-black transition hover:bg-white"
              >
                Chat WhatsApp
              </a>
              <a
                href="https://github.com/jovankawilyam"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/15 px-7 py-4 font-bold text-white transition hover:border-amber-500 hover:text-amber-500"
              >
                View GitHub
              </a>
            </div>
          </div>

          <div className="flex flex-col-reverse justify-between gap-10 md:flex-row md:items-end">
            <div className="w-full text-center md:w-auto md:text-left">
              <h2 className="text-[26vw] md:text-[15vw] font-black leading-none text-neutral-900 select-none tracking-tighter">
                JOVANKA
              </h2>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-neutral-400 mt-8 md:mt-0 mb-8 font-medium md:justify-end">
              <a
                href="https://www.instagram.com/jovankawilyamm"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-500 transition-colors"
              >
                INSTAGRAM
              </a>
              <a
                href="https://www.linkedin.com/in/jovanka-muzaki-84011337a/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-500 transition-colors"
              >
                LINKEDIN
              </a>
              <a
                href="https://github.com/jovankawilyam"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-500 transition-colors"
              >
                GITHUB
              </a>
              <a
                href="https://wa.me/6281911883609"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-500 transition-colors"
              >
                WHATSAPP
              </a>
            </div>
          </div>
          <div className="flex flex-col-reverse justify-between gap-10 md:flex-row md:items-end">
            <p className="gap-6 text-neutral-200 mt-8 md:mt-0 mb-8 font-medium md:justify-end">
              Built with passion by Jovanka Wilyam | All rights reserved © 2025
            </p>
          </div>
        </div>
      </Reveal>
    </footer>
  );
}
