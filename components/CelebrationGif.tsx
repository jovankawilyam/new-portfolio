"use client";

import { useEffect, useState } from "react";

interface CelebrationGifProps {
  isActive: boolean;
  duration?: number;
}

export default function CelebrationGif({
  isActive,
  duration = 3000,
}: CelebrationGifProps) {
  const [showGif, setShowGif] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (isActive) {
      setShowGif(true);
      setShowMessage(true);

      const timer = setTimeout(() => {
        setShowGif(false);
        setShowMessage(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isActive, duration]);

  if (!showGif) return null;

  return (
    <>
      {/* Celebration GIF Animation */}
      <div
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[108] pointer-events-none transition-all duration-300 ${
          showGif ? "opacity-100 scale-100" : "opacity-0 scale-75"
        }`}
      >
        {/* Floating Hearts around GIF */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute text-4xl opacity-0 animate-celebration-heart"
              style={{
                "--delay": `${i * 0.2}s`,
                top: ["-20px", "-20px", "50%", "50%", "100%", "100%"][i],
                left: [
                  "calc(50% - 80px)",
                  "calc(50% + 80px)",
                  "-40px",
                  "calc(100% + 40px)",
                  "calc(50% - 30px)",
                  "calc(50% + 30px)",
                ][i],
              } as React.CSSProperties & { "--delay": string }}
            >
              ❤️
            </div>
          ))}
        </div>

        {/* Celebration GIF Container */}
        <div className="relative inline-block">
          {/* GIF Placeholder - dengan gradient border yang bergerak */}
          <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 p-1 backdrop-blur-sm">
            {/* Inner GIF border glow */}
            <div className="w-full h-full rounded-2xl bg-black/40 border-2 border-pink-400/40 overflow-hidden backdrop-blur-md flex items-center justify-center animate-celebration-glow">
              {/* GIF Image - Placeholder */}
              <div className="w-full h-full bg-gradient-to-br from-pink-400/30 via-purple-400/20 to-pink-300/30 flex items-center justify-center text-6xl animate-pulse">
                {/* You can replace this with actual GIF URL */}
                <img
                  src="/assets/celebration.gif"
                  alt="celebration"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback emoji if GIF not found
                    (e.currentTarget.style.display = "none");
                  }}
                />
                <span className="absolute text-8xl pointer-events-none">🎉</span>
              </div>
            </div>
          </div>

          {/* Sparkles around GIF */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute text-2xl opacity-0 animate-celebration-sparkle"
                style={{
                  "--delay": `${i * 0.15}s`,
                  top: ["0%", "15%", "50%", "50%", "85%", "100%", "25%", "75%"][i],
                  left: [
                    "50%",
                    "calc(100% + 30px)",
                    "calc(100% + 50px)",
                    "-50px",
                    "calc(100% + 30px)",
                    "50%",
                    "-30px",
                    "calc(100% + 30px)",
                  ][i],
                } as React.CSSProperties & { "--delay": string }}
              >
                ✨
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Celebration Message */}
      <div
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 translate-y-48 z-[109] pointer-events-none transition-all duration-300 ${
          showMessage ? "opacity-100 scale-100" : "opacity-0 scale-75"
        }`}
      >
        <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-bold text-xl text-center shadow-2xl border border-white/20 backdrop-blur-sm">
          🎊 Thank You So Much! 🎊
        </div>
      </div>

      <style jsx>{`
        @keyframes celebration-heart-float {
          0% {
            opacity: 0;
            transform: scale(0) translateY(0);
          }
          50% {
            opacity: 1;
            transform: scale(1.2) translateY(-30px) rotateZ(10deg);
          }
          100% {
            opacity: 0;
            transform: scale(0.8) translateY(-80px) rotateZ(-10deg);
          }
        }

        @keyframes celebration-sparkle {
          0% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
          }
          100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
          }
        }

        @keyframes celebration-glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(236, 72, 153, 0.4),
              0 0 40px rgba(168, 85, 247, 0.2);
          }
          50% {
            box-shadow: 0 0 40px rgba(236, 72, 153, 0.8),
              0 0 80px rgba(168, 85, 247, 0.5);
          }
        }

        .animate-celebration-heart {
          animation: celebration-heart-float 2s ease-out forwards
            var(--delay, 0s);
        }

        .animate-celebration-sparkle {
          animation: celebration-sparkle 1.5s ease-in-out infinite
            var(--delay, 0s);
        }

        .animate-celebration-glow {
          animation: celebration-glow 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
