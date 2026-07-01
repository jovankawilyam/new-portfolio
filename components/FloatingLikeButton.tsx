"use client";

import { useEffect, useRef, useState } from "react";
import PremiumConfetti from "./PremiumConfetti";
import CelebrationVideo from "./CelebrationVideo";

const LIKE_STORAGE_KEY = "web_portfolio_liked";
const LIKE_COUNT_STORAGE_KEY = "web_portfolio_like_count";
const LIKE_SESSION_STORAGE_KEY = "web_portfolio_like_session";
const MAX_LIKES_PER_USER = 10;
const API_ROUTE = "/api/like";

type LikeApiResponse = {
  ok?: boolean;
  message?: string;
  error?: string;
  likes?: number;
  totalLikes?: number;
  total?: number;
  count?: number;
};

function readLikeCount(data: LikeApiResponse): number {
  const value = data.totalLikes ?? data.likes ?? data.total ?? data.count ?? 0;
  return Number.isFinite(value) ? value : 0;
}

function getLikeSessionId() {
  const storedSessionId = localStorage.getItem(LIKE_SESSION_STORAGE_KEY);

  if (storedSessionId) {
    return storedSessionId;
  }

  const nextSessionId =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  localStorage.setItem(LIKE_SESSION_STORAGE_KEY, nextSessionId);

  return nextSessionId;
}

export default function FloatingLikeButton() {
  const [totalLikes, setTotalLikes] = useState(0);
  const [userLikeCount, setUserLikeCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showFlyingNumber, setShowFlyingNumber] = useState(false);

  // States untuk fitur Buy me a Coffee
  const [isCoffeeOpen, setIsCoffeeOpen] = useState(false);
  const [coffeeStep, setCoffeeStep] = useState<"ask" | "qris">("ask");
  const [showThankYouVideo, setShowThankYouVideo] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);

  const animationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadLikes() {
      const storedLikeCount = localStorage.getItem(LIKE_COUNT_STORAGE_KEY);
      const legacyLiked = localStorage.getItem(LIKE_STORAGE_KEY) === "true";
      const parsedLikeCount = storedLikeCount ? Number(storedLikeCount) : 0;
      const normalizedLikeCount = Number.isFinite(parsedLikeCount)
        ? Math.max(0, Math.min(MAX_LIKES_PER_USER, parsedLikeCount))
        : legacyLiked
          ? 1
          : 0;

      if (isMounted) {
        setUserLikeCount(normalizedLikeCount);
      }

      try {
        const response = await fetch(API_ROUTE, { method: "GET" });
        const raw = await response.text();
        const data = raw ? (JSON.parse(raw) as LikeApiResponse) : ({} as LikeApiResponse);

        if (isMounted) {
          setTotalLikes(readLikeCount(data));
        }
      } catch {
        if (isMounted) {
          setTotalLikes(0);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadLikes();

    return () => {
      isMounted = false;

      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current);
      }
    };
  }, []);

  async function handleLike() {
    if (userLikeCount >= MAX_LIKES_PER_USER || isLoading) {
      return;
    }

    setIsLoading(true);
    setTotalLikes((currentLikes) => currentLikes + 1);
    setShowFlyingNumber(true);
    setUserLikeCount((currentCount) => currentCount + 1);

    if (animationTimerRef.current) {
      clearTimeout(animationTimerRef.current);
    }

    animationTimerRef.current = setTimeout(() => {
      setShowFlyingNumber(false);
      animationTimerRef.current = null;
    }, 1000);

    try {
      const response = await fetch(API_ROUTE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "like",
          page: document.title || "Portfolio",
          pathname: window.location.pathname,
          userAgent: navigator.userAgent,
          referrer: document.referrer,
          sessionId: getLikeSessionId(),
          extra: "",
        }),
      });
      const raw = await response.text();
      const data = raw ? (JSON.parse(raw) as LikeApiResponse) : ({} as LikeApiResponse);

      if (!response.ok || data.ok === false) {
        throw new Error(data.message || data.error || "Failed to save like");
      }

      const nextCount = Math.min(MAX_LIKES_PER_USER, userLikeCount + 1);
      localStorage.setItem(LIKE_STORAGE_KEY, "true");
      localStorage.setItem(LIKE_COUNT_STORAGE_KEY, String(nextCount));
    } catch {
      setTotalLikes((currentLikes) => Math.max(0, currentLikes - 1));
      setUserLikeCount((currentCount) => Math.max(0, currentCount - 1));
      setShowFlyingNumber(false);
    } finally {
      setIsLoading(false);
    }
  }

  const isAtLimit = userLikeCount >= MAX_LIKES_PER_USER;
  const isDisabled = isAtLimit || isLoading;

  return (
    <>
      <div className="fixed bottom-5 right-5 z-50 sm:bottom-7 sm:right-7 flex flex-col gap-3 items-center">
        {/* Buy Me a Coffee Button */}
        <button
          type="button"
          aria-label="Buy me a coffee"
          title="Buy me a coffee"
          onClick={() => {
            setIsCoffeeOpen(true);
            setCoffeeStep("ask");
          }}
          className="group grid h-[52px] w-[52px] place-items-center rounded-full border border-white/15 bg-white/10 text-white text-2xl shadow-2xl backdrop-blur-md transition-all duration-300 sm:h-14 sm:w-14 hover:-translate-y-1 hover:border-amber-300/70 hover:bg-amber-500/20 hover:text-amber-100 active:scale-95"
        >
          <span
            aria-hidden="true"
            className="leading-none transition-transform duration-300 group-hover:scale-110"
          >
            ☕
          </span>
        </button>

        {/* Like Button Wrapper */} 
        <div className="relative">
          {showFlyingNumber ? (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 text-base font-bold text-rose-400 drop-shadow-[0_8px_18px_rgba(244,63,94,0.35)] secret-like-float"
            >
              +1
            </span>
          ) : null}
      
          <button
            type="button"
            aria-label={
              isAtLimit
                ? `Kuota apresiasi habis. Total likes ${totalLikes}`
                : `Kirim apresiasi rahasia. Sisa ${MAX_LIKES_PER_USER - userLikeCount} kali`
            }
            title={isAtLimit ? "Kuota apresiasi habis" : "Kirim apresiasi"}
            disabled={isDisabled}
            onClick={handleLike}
            className={[
              "group grid h-[52px] w-[52px] place-items-center rounded-full border text-2xl shadow-2xl backdrop-blur-md transition-all duration-300 sm:h-14 sm:w-14",
              isAtLimit
                ? "border-rose-400 bg-rose-500 text-white shadow-rose-500/30"
                : "border-white/15 bg-white/10 text-white shadow-black/35 hover:-translate-y-1 hover:border-rose-300/70 hover:bg-rose-500/20 hover:text-rose-100",
              isLoading && !isAtLimit ? "cursor-wait opacity-70" : "",
              isDisabled ? "disabled:cursor-not-allowed" : "active:scale-95",
            ].join(" ")}
          >
            <img
              src="/images/klik-me.png"
              alt="Like"
              aria-hidden="true"
              className={[
                "w-12 h-12 sm:w-9 sm:h-9 object-contain transition-transform duration-300",
                isAtLimit ? "scale-110" : "group-hover:scale-110",
              ].join(" ")}
            />
          </button>
        </div>
      </div>

      {/* Buy Me a Coffee Modal */}
      {isCoffeeOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in-backdrop"
          onClick={() => setIsCoffeeOpen(false)}
        >
          <div
            className="bg-[#121214]/98 border border-white/15 rounded-3xl p-8 max-w-[450px] w-full text-center shadow-3xl coffee-modal-animate"
            onClick={(e) => e.stopPropagation()}
          >
            {coffeeStep === "ask" ? (
              <div className="animate-fade-slide-in">
                <h3 className="bg-gradient-to-r from-amber-200 via-amber-300 to-yellow-400 bg-clip-text text-transparent font-extrabold text-3xl mb-4">
                  Buy me a coffee? 
                </h3>
              
                <div className="flex gap-4 justify-center">
                  <button
                    type="button"
                    onClick={() => setIsCoffeeOpen(false)}
                    className="flex-1 px-5 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold transition-all duration-200 active:scale-95"
                  >
                    No
                  </button>
                  <button
                    type="button"
                    onClick={() => setCoffeeStep("qris")}
                    className="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black font-bold shadow-lg shadow-amber-500/20 transition-all duration-200 active:scale-95"
                  >
                    Yes
                  </button>
                </div>
              </div>
            ) : (
              <div className="animate-fade-slide-in">
                <h3 className="bg-gradient-to-r from-pink-300 to-rose-400 bg-clip-text text-transparent font-extrabold text-3xl mb-4">
                 ↓   Scan Barcode ↓
                </h3>

                <div className="relative mx-auto my-6 w-72 h-72 sm:w-80 sm:h-80 rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-white p-3 animate-qris-reveal">
                  <img
                    src="/images/qris2.jpg"
                    alt="QRIS Donasi"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-white font-semibold">All Payment</div>

                  <button
                    type="button"
                    onClick={() => {
                      setShowThankYouVideo(true);
                      setShowFireworks(true);
                      setIsCoffeeOpen(false);
                    }}
                    className="w-full mt-5 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold shadow-lg shadow-emerald-500/20 transition-all duration-200 active:scale-95"
                  >
                    Done
                  </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Thank You Video Modal */}
      {showThankYouVideo && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center p-4"
          onClick={() => setShowThankYouVideo(false)}
        >
          {/* Premium Confetti Canvas */}
          <PremiumConfetti isActive={showFireworks} duration={3000} intensity="heavy" />

          {/* Celebration Video with Animation */}
          <CelebrationVideo isActive={showFireworks} duration={3000} />

          <div
            className="relative video-animation"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              autoPlay
              muted
              playsInline
              className="w-64 h-auto block"
              onEnded={() => setShowThankYouVideo(false)}
            >
              <source src="/assets/thankyou1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes secret-like-float-up {
          0% {
            opacity: 0;
            transform: translate(-50%, 0) scale(0.85);
          }

          18% {
            opacity: 1;
            transform: translate(-50%, -14px) scale(1);
          }

          100% {
            opacity: 0;
            transform: translate(-50%, -58px) scale(1.1);
          }
        }

        @keyframes coffee-fade-in {
          from {
            opacity: 0;
            transform: scale(0.92) translateY(15px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes fade-in-backdrop {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fade-slide-in {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes qris-reveal {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .secret-like-float {
          animation: secret-like-float-up 1s ease-out forwards;
        }

        .coffee-modal-animate {
          animation: coffee-fade-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .animate-fade-in-backdrop {
          animation: fade-in-backdrop 0.2s ease-out forwards;
        }

        .animate-fade-slide-in {
          animation: fade-slide-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-qris-reveal {
          opacity: 0;
          animation: qris-reveal 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s forwards;
        }

        @keyframes video-zoom-in {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .video-animation {
          animation: video-zoom-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }
      `}</style>
    </>
  );
}

