"use client";

import { useEffect, useRef } from "react";

interface AnimatedCelebrationGifProps {
  isActive: boolean;
  duration?: number;
}

export default function AnimatedCelebrationGif({
  isActive,
  duration = 3000,
}: AnimatedCelebrationGifProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRefRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!isActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    // Set canvas size
    canvas.width = 320;
    canvas.height = 320;

    startTimeRef.current = Date.now();

    const elements = [
      { emoji: "🎉", color: "#FF6B6B" },
      { emoji: "🎊", color: "#FF69B4" },
      { emoji: "✨", color: "#FFD700" },
      { emoji: "🎈", color: "#A855F7" },
      { emoji: "🎁", color: "#FF1493" },
    ];

    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const progress = elapsed / duration;

      // Background with radial gradient for more premium feel
      const bgGradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width
      );
      bgGradient.addColorStop(0, `rgba(236, 72, 153, ${0.2 * (1 - progress)})`);
      bgGradient.addColorStop(0.5, `rgba(168, 85, 247, ${0.1 * (1 - progress)})`);
      bgGradient.addColorStop(1, `rgba(236, 72, 153, ${0.05 * (1 - progress)})`);
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw outer ring of celebrating emojis
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);

      // Rotating ring - faster and smoother
      ctx.rotate((elapsed / 4000) * Math.PI * 2);

      for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2;
        const distance = 90;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        ctx.save();
        ctx.translate(x, y);

        // Bounce animation
        const bounce = Math.sin(elapsed / 500 + i) * 15;
        ctx.translate(0, bounce);

        // Scale animation for more dynamic feel
        const scale = 1 + Math.sin(elapsed / 800 + i) * 0.3;
        ctx.scale(scale, scale);

        ctx.globalAlpha = Math.max(0, 1 - progress);

        // Add shadow glow effect
        ctx.shadowColor = elements[i].color;
        ctx.shadowBlur = 20;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        ctx.font = `bold 48px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(elements[i].emoji, 0, 0);

        ctx.restore();
      }

      // Inner beating heart - more prominent
      ctx.save();
      ctx.translate(0, 0);

      // Main heart scale with more dramatic pulse
      const heartScale = 1 + Math.sin(elapsed / 300) * 0.25;
      ctx.scale(heartScale, heartScale);

      // Intense glow
      const glowIntensity = 0.5 + Math.sin(elapsed / 400) * 0.5;
      ctx.shadowColor = "#FF69B4";
      ctx.shadowBlur = 30 * glowIntensity;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.globalAlpha = Math.max(0, 1 - progress);

      ctx.font = `bold 120px Arial`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("❤️", 0, 0);

      ctx.restore();

      // Sparkles rotating around
      for (let i = 0; i < 8; i++) {
        ctx.save();

        const angle = (i / 8) * Math.PI * 2 + elapsed / 2000;
        const distance = 140 + Math.sin(elapsed / 1000 + i) * 30;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        ctx.translate(x, y);
        ctx.rotate(angle + elapsed / 1000);

        ctx.globalAlpha = (Math.sin(elapsed / 300 + i) + 1) / 2 * (1 - progress);

        ctx.font = `24px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("✨", 0, 0);

        ctx.restore();
      }

      // Falling confetti-like particles
      for (let i = 0; i < 15; i++) {
        const x = Math.sin(i * 0.5 + elapsed / 800) * canvas.width + canvas.width / 2;
        const y = ((elapsed / 20 + i * 20) % (canvas.height + 50)) - 25;

        ctx.save();
        ctx.globalAlpha = Math.max(0, 1 - progress) * 0.6;
        ctx.font = `${16 + (i % 3) * 4}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const randomEmoji = elements[i % elements.length].emoji;
        ctx.fillText(randomEmoji, x, y);

        ctx.restore();
      }

      ctx.restore();

      // Continue animation
      if (elapsed < duration) {
        animationRefRef.current = requestAnimationFrame(animate);
      }
    };

    animationRefRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRefRef.current) {
        cancelAnimationFrame(animationRefRef.current);
      }
    };
  }, [isActive, duration]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-3xl shadow-2xl z-[107] pointer-events-none border-4"
      style={{
        background: "rgba(20, 20, 30, 0.85)",
        backdropFilter: "blur(12px)",
        borderColor: "rgba(236, 72, 153, 0.5)",
        boxShadow: `
          0 25px 50px rgba(0, 0, 0, 0.5),
          0 0 60px rgba(236, 72, 153, 0.4),
          inset 0 0 30px rgba(168, 85, 247, 0.2)
        `,
      }}
    />
  );
}
