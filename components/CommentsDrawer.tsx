"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const COMMENTS_API_ROUTE = "/api/comments";
const COMMENT_SESSION_STORAGE_KEY = "web_portfolio_comment_session";

type Comment = {
  id: string;
  name: string;
  content: string;
  timestamp: string;
  sessionId: string;
};

type CommentsApiResponse = {
  ok?: boolean;
  message?: string;
  error?: string;
  comments?: Comment[];
  comment?: Comment;
};

function getCommentSessionId() {
  const storedSessionId = localStorage.getItem(COMMENT_SESSION_STORAGE_KEY);
  if (storedSessionId) {
    return storedSessionId;
  }
  const nextSessionId =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  localStorage.setItem(COMMENT_SESSION_STORAGE_KEY, nextSessionId);
  return nextSessionId;
}

export default function CommentsDrawer({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newCommentName, setNewCommentName] = useState("");
  const [newCommentContent, setNewCommentContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const commentsEndRef = useRef<HTMLDivElement>(null);

  const fetchComments = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(COMMENTS_API_ROUTE);
      const data: CommentsApiResponse = await response.json();
      if (data.ok && data.comments) {
        setComments(data.comments);
      } else {
        console.error("Failed to fetch comments:", data.error || data.message);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchComments();
    }
  }, [isOpen]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentContent.trim() || isSubmitting) return;

    setIsSubmitting(true);
    const sessionId = getCommentSessionId();
    const name = newCommentName.trim() || "Anonymous";

    try {
      const response = await fetch(COMMENTS_API_ROUTE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: "comment", name, content: newCommentContent.trim(), sessionId }),
      });
      const data: CommentsApiResponse = await response.json();

      if (data.ok && data.comment) {
        setComments((prev) => [data.comment!, ...prev]);
        setNewCommentContent("");
        setNewCommentName(""); // Clear name input after submission
        if (commentsEndRef.current) {
          commentsEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        console.error("Failed to post comment:", data.error || data.message);
        alert("Failed to post comment: " + (data.error || data.message));
      }
    } catch (error) {
      console.error("Error posting comment:", error);
      alert("Error posting comment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const timeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " tahun lalu";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " bulan lalu";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " hari lalu";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " jam lalu";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " menit lalu";
    return Math.floor(seconds) + " detik lalu";
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-[100] flex w-full max-w-md flex-col bg-neutral-950/95 backdrop-blur-lg border-l border-white/10 shadow-lg"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-neutral-900/90 sticky top-0">
              <h2 className="text-xl font-bold text-white">Comments ({comments.length})</h2>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-300"
              >
                ✕
              </button>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {isLoading ? (
                // Skeleton Loader
                Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-start space-x-3 animate-pulse">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-neutral-700"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-neutral-700 rounded w-3/4"></div>
                      <div className="h-4 bg-neutral-800 rounded"></div>
                    </div>
                  </div>
                ))
              ) : comments.length === 0 ? (
                <p className="text-center text-neutral-500 mt-8">No comments yet. Be the first to comment!</p>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-amber-500 flex items-center justify-center text-black font-bold text-sm">
                      {comment.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-neutral-400">
                        <span className="font-bold text-white">{comment.name}</span> •{" "}
                        {timeAgo(comment.timestamp)}
                      </p>
                      <p className="text-white mt-1">{comment.content}</p>
                    </div>
                  </div>
                ))
              )}
              <div ref={commentsEndRef} />
            </div>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="p-4 border-t border-white/10 bg-neutral-900/90 sticky bottom-0">
              <input
                type="text"
                placeholder="Your name (optional)"
                value={newCommentName}
                onChange={(e) => setNewCommentName(e.target.value)}
                className="w-full p-2 mb-2 rounded-md bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-blue-500"
              />
              <textarea
                placeholder="Add a comment..."
                value={newCommentContent}
                onChange={(e) => setNewCommentContent(e.target.value)}
                className="w-full p-2 rounded-md bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-blue-500 resize-y min-h-[60px]"
                rows={3}
                required
              ></textarea>
              <button
                type="submit"
                disabled={isSubmitting || !newCommentContent.trim()}
                className="mt-3 w-full px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? "Submitting..." : "Post Comment"}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
