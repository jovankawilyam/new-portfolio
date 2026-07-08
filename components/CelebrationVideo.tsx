"use client";

import { useEffect, useState } from "react";

interface CelebrationVideoProps {
  isActive: boolean;
  duration?: number;
}

export default function CelebrationVideo({
  isActive,
  duration = 3000,
}: CelebrationVideoProps) {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (isActive) {
      const showTimer = setTimeout(() => setShowVideo(true), 0);
      const hideTimer = setTimeout(() => setShowVideo(false), duration);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [isActive, duration]);

  if (!showVideo) return null;

  return (
    <div
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[107] pointer-events-none"
      style={{
        animation: "celebration-video-appear 0.5s ease-out forwards",
      }}
    >
      {/* Video Container dengan glow effect */}
      <div className="relative">
        <div
          className="absolute inset-0 rounded-3xl blur-2xl pointer-events-none"
          style={{
            background: "linear-gradient(135deg, rgba(236, 72, 153, 0.5), rgba(168, 85, 247, 0.3))",
            animation: "celebration-video-glow 2s ease-in-out infinite",
          }}
        />

        {/* Video dengan border gradient */}
        <video
          autoPlay
          muted
          playsInline
          loop={false}
          className="relative w-80 h-auto rounded-3xl shadow-2xl border-4 object-cover"
          style={{
            borderColor: "rgba(236, 72, 153, 0.6)",
            boxShadow: `
              0 25px 50px rgba(0, 0, 0, 0.5),
              0 0 60px rgba(236, 72, 153, 0.4),
              inset 0 0 30px rgba(168, 85, 247, 0.15)
            `,
          }}
        >
          <source src="/assets/thankyou1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <style jsx>{`
        @keyframes celebration-video-appear {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.3) rotate(-15deg);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
          }
        }

        @keyframes celebration-video-glow {
          0%,
          100% {
            box-shadow: 0 0 40px rgba(236, 72, 153, 0.4),
              0 0 80px rgba(168, 85, 247, 0.2);
          }
          50% {
            box-shadow: 0 0 60px rgba(236, 72, 153, 0.7),
              0 0 120px rgba(168, 85, 247, 0.4);
          }
        }
      `}</style>
    </div>
  );
}
