"use client";

import React, { useState, useEffect } from "react";
import { Cookie, X, ShieldCheck } from "lucide-react";

const COOKIE_KEY = "cookie_consent_accepted";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem(COOKIE_KEY);
    if (!accepted) {
      // Small delay so it doesn't flash on first render
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  function accept() {
    localStorage.setItem(COOKIE_KEY, "true");
    setVisible(false);
  }

  function dismiss() {
    // Dismiss without full acceptance (session only)
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] w-[calc(100%-2rem)] max-w-2xl"
    >
      <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-2xl bg-slate-900/95 border border-white/10 backdrop-blur-xl shadow-2xl shadow-black/60 px-5 py-4">
        {/* Gradient accent border */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#088395]/10 via-[#09637E]/10 to-[#7AB2B2]/10 pointer-events-none" />

        {/* Icon */}
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#088395]/20 to-[#09637E]/20 border border-[#088395]/20">
          <Cookie className="w-5 h-5 text-[#088395]" />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white mb-0.5">
            This site uses cookies
          </p>
          <p className="text-xs text-gray-400 leading-relaxed">
            We use cookies to enhance your browsing experience and analyze site
            traffic. By clicking &ldquo;Accept&rdquo;, you consent to our use of
            cookies.{" "}
            <a
              href="#"
              className="text-[#088395] hover:text-[#7AB2B2] underline underline-offset-2"
            >
              Learn more
            </a>
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={accept}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-[#088395] to-[#09637E] text-white text-xs font-semibold hover:shadow-lg hover:shadow-[#09637E]/20 transition-all duration-200"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Accept
          </button>
          <button
            onClick={dismiss}
            aria-label="Dismiss"
            className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-all duration-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
