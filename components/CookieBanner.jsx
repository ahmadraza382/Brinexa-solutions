"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookie_consent");
    if (!accepted) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie_consent", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between gap-4 bg-[#1A1A2E]/95 backdrop-blur border-t border-[#2E2E4A] px-4 py-3 md:px-8 md:py-4">
      <p className="text-[#AAAAAA] text-sm max-w-2xl">
        We use cookies to improve your experience. By continuing to browse, you
        agree to our{" "}
        <a href="/privacy" className="text-[#00C9A7] hover:underline">
          Privacy Policy
        </a>
        .
      </p>
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={accept}
          className="rounded-full bg-[#6C3FD4] hover:bg-[#5a33b0] text-white text-sm font-medium px-5 py-2 transition-colors"
        >
          Accept
        </button>
        <button
          onClick={accept}
          aria-label="Dismiss"
          className="text-[#888] hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
