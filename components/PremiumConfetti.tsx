"use client";

import { useEffect, useRef } from "react";

interface Confetto {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  life: number;
  maxLife: number;
  size: number;
  shape: "circle" | "square" | "heart" | "star";
  color: string;
  opacity: number;
}

interface PremiumConfettiProps {
  isActive: boolean;
  duration?: number;
  intensity?: "normal" | "heavy" | "extreme";
}

export default function PremiumConfetti({
  isActive,
  duration = 3000,
  intensity = "heavy",
}: PremiumConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const confettiRef = useRef<Confetto[]>([]);
  const animationRefRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const confettiCount = {
    normal: 50,
    heavy: 150,
    extreme: 300,
  };

  const particleCount = confettiCount[intensity];

  useEffect(() => {
    if (!isActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    // Set canvas size to match window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Reset state
    confettiRef.current = [];
    startTimeRef.current = Date.now();

    const colors = [
      "#ff69b4", // Hot Pink
      "#a855f7", // Purple
      "#ffd700", // Gold
      "#ff1493", // Deep Pink
      "#ff6b6b", // Red
      "#ff8c00", // Orange
      "#00ced1", // Dark Turquoise
      "#39ff14", // Neon Green
      "#87ceeb", // Sky Blue
      "#da70d6", // Light Purple
    ];

    // Create confetti particles
    const createConfetti = () => {
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
        const velocity = 5 + Math.random() * 10;
        const size = 5 + Math.random() * 12;
        const shape = ["circle", "square", "heart", "star"][
          Math.floor(Math.random() * 4)
        ] as Confetto["shape"];

        confettiRef.current.push({
          x: canvas.width / 2,
          y: canvas.height / 2,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity - 5,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.3,
          life: 0,
          maxLife: duration,
          size,
          shape,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: 1,
        });
      }
    };

    createConfetti();

    // Draw confetti function
    const drawConfetto = (confetto: Confetto) => {
      ctx.save();
      ctx.globalAlpha = confetto.opacity;
      ctx.translate(confetto.x, confetto.y);
      ctx.rotate(confetto.rotation);

      switch (confetto.shape) {
        case "circle":
          ctx.fillStyle = confetto.color;
          ctx.beginPath();
          ctx.arc(0, 0, confetto.size / 2, 0, Math.PI * 2);
          ctx.fill();
          // Glow
          ctx.strokeStyle = confetto.color;
          ctx.globalAlpha = confetto.opacity * 0.5;
          ctx.lineWidth = 2;
          ctx.stroke();
          break;

        case "square":
          ctx.fillStyle = confetto.color;
          ctx.fillRect(
            -confetto.size / 2,
            -confetto.size / 2,
            confetto.size,
            confetto.size
          );
          // Border glow
          ctx.strokeStyle = confetto.color;
          ctx.globalAlpha = confetto.opacity * 0.5;
          ctx.lineWidth = 1;
          ctx.strokeRect(
            -confetto.size / 2,
            -confetto.size / 2,
            confetto.size,
            confetto.size
          );
          break;

        case "heart":
          ctx.fillStyle = confetto.color;
          const s = confetto.size / 2;
          ctx.beginPath();
          ctx.moveTo(0, -s);
          ctx.bezierCurveTo(-s, -s * 1.5, -s * 1.5, -s * 0.5, -s * 0.5, s * 0.3);
          ctx.bezierCurveTo(-s * 0.5, s, 0, s, 0, s);
          ctx.bezierCurveTo(0, s, s * 0.5, s, s * 0.5, s * 0.3);
          ctx.bezierCurveTo(s * 1.5, -s * 0.5, s, -s * 1.5, 0, -s);
          ctx.fill();
          break;

        case "star":
          ctx.fillStyle = confetto.color;
          const points = 5;
          const outerRadius = confetto.size / 2;
          const innerRadius = confetto.size / 5;
          ctx.beginPath();
          for (let i = 0; i < points * 2; i++) {
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const angle = (i * Math.PI) / points;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.fill();
          break;
      }

      ctx.restore();
    };

    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;

      // Clear canvas with fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add glow background effect
      if (elapsed < duration * 0.5) {
        ctx.fillStyle = `rgba(255, 105, 180, ${0.02 * (1 - elapsed / (duration * 0.5))})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Update and draw confetti
      confettiRef.current = confettiRef.current.filter((confetto) => {
        confetto.life += 16;
        const lifeRatio = confetto.life / confetto.maxLife;

        // Gravity effect
        confetto.vy += 0.15;

        // Air resistance
        confetto.vx *= 0.995;
        confetto.vy *= 0.995;

        // Rotation
        confetto.rotation += confetto.rotationSpeed;

        // Position
        confetto.x += confetto.vx;
        confetto.y += confetto.vy;

        // Fade out
        confetto.opacity = Math.max(0, 1 - lifeRatio * 1.3);

        // Wind effect
        confetto.vx += (Math.random() - 0.5) * 0.2;

        drawConfetto(confetto);

        return confetto.life < confetto.maxLife;
      });

      // Continue animation until duration expires
      if (elapsed < duration) {
        animationRefRef.current = requestAnimationFrame(animate);
      }
    };

    animationRefRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (animationRefRef.current) {
        cancelAnimationFrame(animationRefRef.current);
      }
    };
  }, [isActive, duration, intensity, particleCount]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[105]"
      style={{
        background: "transparent",
      }}
    />
  );
}
