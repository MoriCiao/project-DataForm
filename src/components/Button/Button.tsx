import React from "react";

type ButtoProps = {
  label: string;
  type: "button" | "submit" | "reset";
  className?: string | null;
  onClick: () => void;
  disable?: boolean;
};

export default function Button({
  label,
  type,
  className,
  onClick,
  disable = false,
}: ButtoProps) {
  return (
    <button
      type={type}
      className={`relative rounded-md border px-4 text-white transition-all duration-500 hover:z-10 hover:bg-black/50 hover:text-sky-500 ${disable ? "cursor-not-allowed" : "cursor-pointer"} ${className}`}
      onClick={onClick}
      disabled={disable}
    >
      {label}
    </button>
  );
}
