"use client";

import { useEffect, useRef, useState } from "react";

const LIKE_STORAGE_KEY = "web_portfolio_liked";
const LIKE_COUNT_STORAGE_KEY = "web_portfolio_like_count";
const MAX_LIKES_PER_USER = 10;
const API_ROUTE = "/api/like";

type LikeApiResponse = {
  likes?: number;
  totalLikes?: number;
  total?: number;
  count?: number;
};

function readLikeCount(data: LikeApiResponse): number {
  const value = data.totalLikes ?? data.likes ?? data.total ?? data.count ?? 0;
  return Number.isFinite(value) ? value : 0;
}

export default function FloatingLikeButton() {
  const [totalLikes, setTotalLikes] = useState(0);
  const [userLikeCount, setUserLikeCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showFlyingNumber, setShowFlyingNumber] = useState(false);
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
      await fetch(API_ROUTE, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: new URLSearchParams({
          action: "like",
        }).toString(),
      });

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
    <div className="fixed bottom-5 right-5 z-50 sm:bottom-7 sm:right-7">
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
        <span
          aria-hidden="true"
          className={[
            "leading-none transition-transform duration-300",
            isAtLimit ? "scale-110" : "group-hover:scale-110",
          ].join(" ")}
        >
          ♥
        </span>
      </button>

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

        .secret-like-float {
          animation: secret-like-float-up 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
