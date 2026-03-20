import React from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordToggleProps {
  visible: boolean;
  onToggle: () => void;
}

export default function PasswordToggle({
  visible,
  onToggle,
}: PasswordToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="text-[var(--color-neutral-400)] hover:text-[var(--color-neutral-600)] transition-colors cursor-pointer"
    >
      {visible ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  );
}
