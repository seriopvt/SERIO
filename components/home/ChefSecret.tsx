import React from "react";
import { RefreshCw } from "lucide-react";

export default function ChefSecret() {
  return (
    <div
      className="
        bg-gradient-to-br from-[#3a2a1a] to-[#2a1e12]
        rounded-[var(--radius-2xl)]
        p-5 text-white relative overflow-hidden
      "
    >
      {/* Refresh icon */}
      <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
        <RefreshCw size={12} className="text-white/60" />
      </div>

      <p className="text-[10px] font-bold uppercase tracking-wider text-orange-300 mb-2">
        Chef&apos;s Secret
      </p>
      <p className="text-[var(--text-sm)] leading-relaxed text-white/90 mb-3">
        &ldquo;Toast your Berbere spice mix slightly in a dry pan before adding
        oil to awaken the flavors and deepen the color.&rdquo;
      </p>
      <button className="text-[12px] font-semibold text-orange-300 hover:text-orange-200 transition-colors cursor-pointer">
        More Tips →
      </button>
    </div>
  );
}
