"use client";

// Highlight Card — from 21st.dev, adapted to JSX and tinted to the Brinexa
// brand palette (purple #6C3FD4 / cyan #00C9A7). Accepts a string or string[]
// for `description`.
import { Card } from "@/components/ui/card";

export default function HighlightCard({ title, description, icon }) {
  const lines = Array.isArray(description) ? description : [description];

  return (
    <div className="group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-rotate-1">
      <Card className="text-white rounded-2xl border border-brand-purple/15 bg-gradient-to-br from-[#0D0D0D] via-[#1A1A2E] to-[#0D0D0D] shadow-2xl relative backdrop-blur-xl overflow-hidden hover:border-brand-purple/40 hover:shadow-card-hover w-[350px] max-w-full">
        {/* ambient layers */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-purple/5 to-brand-cyan/10 opacity-40 group-hover:opacity-70 transition-opacity duration-500"></div>
          <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-gradient-to-tr from-brand-purple/20 to-transparent blur-3xl opacity-40 group-hover:opacity-70 transform group-hover:scale-110 transition-all duration-700"></div>
          <div className="absolute top-10 left-10 w-16 h-16 rounded-full bg-brand-purple/10 blur-xl animate-ping"></div>
          <div className="absolute bottom-16 right-16 w-12 h-12 rounded-full bg-brand-cyan/10 blur-lg animate-ping"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
        </div>

        <div className="p-8 relative z-10 flex flex-col items-center text-center">
          {/* icon with pulsing rings */}
          <div className="relative mb-6">
            <div className="absolute inset-0 rounded-full border-2 border-brand-purple/30 animate-ping"></div>
            <div className="absolute inset-0 rounded-full border border-brand-cyan/20 animate-pulse"></div>
            <div className="p-6 rounded-full backdrop-blur-lg border border-brand-purple/25 bg-gradient-to-br from-black/80 to-brand-navy/60 shadow-2xl transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 hover:shadow-glow-purple">
              <div className="transform group-hover:rotate-180 transition-transform duration-700">
                {icon}
              </div>
            </div>
          </div>

          <h3 className="mb-4 text-2xl font-bold font-heading bg-gradient-to-r from-white via-[#c9b8ff] to-white bg-clip-text text-transparent transform group-hover:scale-105 transition-transform duration-300">
            {title}
          </h3>

          <div className="space-y-1 max-w-sm">
            {lines.map((line, idx) => (
              <p
                key={idx}
                className="text-text-secondary text-sm leading-relaxed transform group-hover:text-gray-200 transition-colors duration-300"
              >
                {line}
              </p>
            ))}
          </div>

          <div className="mt-6 w-1/3 h-0.5 bg-gradient-to-r from-transparent via-brand-cyan to-transparent rounded-full transform group-hover:w-1/2 group-hover:h-1 transition-all duration-500"></div>

          <div className="flex space-x-2 mt-4 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-2 h-2 bg-brand-purple rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-brand-cyan rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
            <div className="w-2 h-2 bg-brand-purple rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          </div>
        </div>

        {/* corner accents */}
        <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-brand-purple/10 to-transparent rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-brand-cyan/10 to-transparent rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </Card>
    </div>
  );
}
