"use client";

import {
  motion,
  MotionValue,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";

const FRAME_COUNT = 96;
const FRAME_STEP = 2;

function getFrameSrc(index: number) {
  const sourceIndex = ((index - 1) * FRAME_STEP + 1).toString().padStart(5, "0");
  return `/sequence/${sourceIndex}.jpg`;
}

export default function PortfolioScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | undefined)[]>([]);
  const loadingFramesRef = useRef<Set<number>>(new Set());
  const lastRenderedIndexRef = useRef(1);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const currentIndex = useTransform(scrollYProgress, [0, 1], [1, FRAME_COUNT]);

  const loadFrame = useCallback((index: number) => {
    const safeIndex = Math.min(Math.max(index, 1), FRAME_COUNT);

    if (imagesRef.current[safeIndex] || loadingFramesRef.current.has(safeIndex)) {
      return Promise.resolve(imagesRef.current[safeIndex]);
    }

    loadingFramesRef.current.add(safeIndex);

    return new Promise<HTMLImageElement | undefined>((resolve) => {
      const img = new Image();
      img.decoding = "async";
      img.src = getFrameSrc(safeIndex);

      const finish = (loadedImage?: HTMLImageElement) => {
        loadingFramesRef.current.delete(safeIndex);
        if (loadedImage) {
          imagesRef.current[safeIndex] = loadedImage;
        }

        const loadedCount = imagesRef.current.filter(Boolean).length;
        setLoadingProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
        resolve(loadedImage);
      };

      img.onload = () => finish(img);
      img.onerror = () => finish(undefined);
    });
  }, []);

  const renderFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[index] ?? findNearestLoadedFrame(index);
    if (!img) return;

    lastRenderedIndexRef.current = index;

    // Responsive cover scale (Fill Screen)
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Calculate aspect ratio
    const imgAspect = img.width / img.height;
    const canvasAspect = canvasWidth / canvasHeight;

    let drawWidth, drawHeight, offsetX, offsetY;

    // Cover Logic:
    // If canvas is wider than image (relative to aspect), we fit width and crop height?
    // Wait, cover means:
    // If canvasAspect > imgAspect (Canvas is wider), we need to match Width, and Height depends on aspect.
    // drawWidth = canvasWidth. drawHeight = canvasWidth / imgAspect.
    // If drawHeight < canvasHeight (which it will be if canvas is VERY wide), then we have gaps.
    // So if canvas is wider than image aspect, we must scale by Width to fill width, but does height cover?
    // imgAspect = w/h.
    // If canvasAspect > imgAspect, then canvas is relatively wider.
    // Example: Image 1:1. Canvas 2:1.
    // If we match width, drawHeight = 2/1 = 2. Canvas Height 1. So it covers. Correct.

    if (canvasAspect > imgAspect) {
      // Canvas is wider/flatter than image
      // Match Width
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imgAspect;
      offsetX = 0;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      // Canvas is taller/thinner than from image
      // Match Height
      drawHeight = canvasHeight;
      drawWidth = canvasHeight * imgAspect;
      offsetX = (canvasWidth - drawWidth) / 2;
      offsetY = 0;
    }

    // Optional: Draw background color if needed to fill gaps?
    // Assuming body background handles it, or we draw bg here.
    // ctx.fillStyle = "#000"; // Fallback
    // ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  function findNearestLoadedFrame(index: number) {
    for (let offset = 0; offset < FRAME_COUNT; offset++) {
      const previous = imagesRef.current[index - offset];
      if (previous) return previous;

      const next = imagesRef.current[index + offset];
      if (next) return next;
    }

    return undefined;
  }

  useMotionValueEvent(currentIndex, "change", (latest) => {
    const safeIndex = Math.min(Math.max(Math.floor(latest), 1), FRAME_COUNT);
    requestAnimationFrame(() => renderFrame(safeIndex));

    if (!imagesRef.current[safeIndex]) {
      loadFrame(safeIndex).then(() => renderFrame(safeIndex));
    }
  });

  useEffect(() => {
    let cancelled = false;

    loadFrame(1).then(() => {
      if (cancelled) return;
      renderFrame(1);
      setIsLoading(false);
    });

    let nextFrame = 2;
    let timeoutId: ReturnType<typeof setTimeout>;

    const preloadNext = () => {
      if (cancelled || nextFrame > FRAME_COUNT) return;

      loadFrame(nextFrame).then(() => {
        nextFrame++;
        timeoutId = setTimeout(preloadNext, 45);
      });
    };

    timeoutId = setTimeout(preloadNext, 120);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [loadFrame, renderFrame]);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        // Re-render current frame
        const current = currentIndex.get();
        const safeIndex = Math.min(
          Math.max(Math.floor(current), 1),
          FRAME_COUNT,
        );
        renderFrame(safeIndex);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial size

    return () => window.removeEventListener("resize", handleResize);
  }, [currentIndex, renderFrame]);

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-neutral-950">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          // Set width/height via JS, but styles ensure full size
        />

        {/* Loading Overlay */}
        <div
          className={clsx(
            "pointer-events-none absolute inset-0 flex items-end pb-20 justify-center bg-black transition-opacity duration-300",
            isLoading ? "opacity-100" : "opacity-0",
          )}
        >
          <div className="text-center font-sans">
            <p className="mb-2 text-sm text-neutral-400">
              Preparing Portfolio...
            </p>
            <div className="h-1 w-32 overflow-hidden rounded-full bg-neutral-800">
              <div
                className="h-full bg-amber-600 transition-all duration-300 ease-out"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Text Overlays - Managed here or parent? 
            Prompt said "Overlay text sections that fade in/out".
            We can put them here linked to scroll progress.
        */}
        <ScrollOverlays progress={scrollYProgress} />
      </div>
    </div>
  );
}

function ScrollOverlays({ progress }: { progress: MotionValue<number> }) {
  // Opacity transforms for different sections
  // 0-25%: Title
  // 25-50%: Left Slogan
  // 50-75%: Right Slogan
  // 75-100%: CTA

  const opacityTitle = useTransform(progress, [0, 0.1, 0.2], [1, 1, 0]);
  const yTitle = useTransform(progress, [0, 0.2], [0, -50]);

  const opacitySlogan1 = useTransform(
    progress,
    [0.15, 0.25, 0.35, 0.45],
    [0, 1, 1, 0],
  );
  const ySlogan1 = useTransform(progress, [0.15, 0.45], [50, -50]);

  const opacitySlogan2 = useTransform(
    progress,
    [0.45, 0.55, 0.65, 0.75],
    [0, 1, 1, 0],
  );
  const ySlogan2 = useTransform(progress, [0.45, 0.75], [50, -50]);

  const opacityCTA = useTransform(progress, [0.75, 0.85, 1], [0, 1, 1]);
  const scaleCTA = useTransform(progress, [0.75, 1], [0.9, 1]);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-center">
      {/* Title */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          style={{ opacity: opacityTitle, y: yTitle }}
          className="text-center"
        >
          <h1 className="text-6xl font-black tracking-tighter text-white md:text-9xl">
            JOVANKA
          </h1>
          <p className="mt-4 text-xl font-light tracking-widest text-amber-500 uppercase">
            Frontend Developer & Data Analyst
          </p>
        </motion.div>
      </div>

      {/* Slogan Left */}
      <div className="absolute inset-0 flex items-center justify-start px-8 md:px-24">
        <motion.div
          style={{ opacity: opacitySlogan1, y: ySlogan1 }}
          className="max-w-xl text-left"
        >
          <h2 className="text-4xl font-semibold leading-tighter text-neutral-200 md:text-6xl">
            Information Systems student <br />
            <span className="text-amber-500">at IBIK Bogor</span>
          </h2>
        </motion.div>
      </div>

      {/* Slogan Right */}
      <div className="absolute inset-0 flex items-center justify-end px-8 md:px-24">
        <motion.div
          style={{ opacity: opacitySlogan2, y: ySlogan2 }}
          className="max-w-xl text-right"
        >
          <h2 className="text-4xl font-semibold leading-tighter text-neutral-200 md:text-6xl">
            Exploring <br />
            <span className="text-amber-500">web development and data science</span>
          </h2>
        </motion.div>
      </div>

      {/* CTA */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          style={{ opacity: opacityCTA, scale: scaleCTA }}
          className="text-center pointer-events-auto"
        >
          <h2 className="mb-8 text-5xl font-bold tracking-tighter text-white">
            Explore My Work
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="#projects"
              className="group relative inline-flex overflow-hidden rounded-full bg-amber-600 px-8 py-4 text-lg font-bold text-black transition-transform hover:scale-105 active:scale-95"
            >
              <span className="relative z-10">VIEW PROJECTS</span>
              <div className="absolute inset-0 z-0 scale-x-0 bg-white transition-transform duration-300 group-hover:scale-x-100 origin-left" />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
