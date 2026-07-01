"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
  opacity: number;
}

interface Rocket {
  x: number;
  y: number;
  targetY: number;
  progress: number;
  duration: number;
  hasExploded: boolean;
  hue: number;
}

interface FireworksProps {
  isActive: boolean;
  duration?: number;
  videoWidth?: number;
  videoHeight?: number;
}

export default function Fireworks({
  isActive,
  duration = 2500,
  videoWidth = 256,
  videoHeight = 180,
}: FireworksProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rocketsRef = useRef<Rocket[]>([]);
  const animationRefRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!isActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    // Set canvas size to match window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Reset state
    particlesRef.current = [];
    rocketsRef.current = [];
    startTimeRef.current = Date.now();

    // Create initial rockets
    const createRockets = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const videoTop = centerY - videoHeight / 2;
      const targetY = videoTop - 80;

      // Left rocket
      rocketsRef.current.push({
        x: centerX - videoWidth / 2 - 60,
        y: canvas.height,
        targetY,
        progress: 0,
        duration: 800,
        hasExploded: false,
        hue: Math.random() * 360,
      });

      // Right rocket
      rocketsRef.current.push({
        x: centerX + videoWidth / 2 + 60,
        y: canvas.height,
        targetY,
        progress: 0,
        duration: 800,
        hasExploded: false,
        hue: Math.random() * 360,
      });
    };

    createRockets();

    // Particle creation function for explosion
    const createExplosion = (x: number, y: number, hue: number, count: number = 50) => {
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count;
        const velocity = 4 + Math.random() * 3;

        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          life: 0,
          maxLife: 1500 + Math.random() * 500,
          size: 2 + Math.random() * 3,
          hue: hue + (Math.random() - 0.5) * 40,
          opacity: 1,
        });
      }
    };

    // Smooth easing function for rocket movement
    const easeOutQuad = (t: number) => 1 - (1 - t) * (1 - t);

    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;

      // Clear canvas with fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw rockets
      rocketsRef.current = rocketsRef.current.filter((rocket) => {
        rocket.progress += 1 / rocket.duration;

        if (rocket.progress >= 1) {
          if (!rocket.hasExploded) {
            createExplosion(rocket.x, rocket.targetY, rocket.hue, 60);
            rocket.hasExploded = true;
          }
          return rocket.progress < 1.5;
        }

        // Move rocket upward with easing
        const easeProgress = easeOutQuad(rocket.progress);
        rocket.y = canvas.height - (canvas.height - rocket.targetY) * easeProgress;

        // Draw rocket trail
        ctx.fillStyle = `hsla(${rocket.hue}, 100%, 50%, 0.8)`;
        ctx.shadowColor = `hsla(${rocket.hue}, 100%, 50%, 0.6)`;
        ctx.shadowBlur = 15;

        // Rocket body
        ctx.fillRect(rocket.x - 2, rocket.y, 4, 8);

        // Rocket glow
        ctx.shadowColor = `hsla(${rocket.hue}, 100%, 50%, 0.3)`;
        ctx.shadowBlur = 20;
        ctx.fillRect(rocket.x - 3, rocket.y - 2, 6, 12);

        ctx.shadowColor = "transparent";

        return true;
      });

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.life += 1;
        const lifeRatio = particle.life / particle.maxLife;

        // Gravity effect
        particle.vy += 0.08;

        // Air resistance
        particle.vx *= 0.98;
        particle.vy *= 0.98;

        particle.x += particle.vx;
        particle.y += particle.vy;

        // Fade out
        particle.opacity = Math.max(0, 1 - lifeRatio * 1.2);

        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = `hsl(${particle.hue}, 100%, 50%)`;
        ctx.shadowColor = `hsla(${particle.hue}, 100%, 60%, 0.8)`;
        ctx.shadowBlur = 8;

        // Circle particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Sparkle effect - small bright dots
        if (Math.random() > 0.7) {
          ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
          ctx.shadowBlur = 3;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 0.4, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();

        return particle.life < particle.maxLife;
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
  }, [isActive, duration, videoWidth, videoHeight]);

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
