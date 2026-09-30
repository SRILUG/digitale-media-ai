import type { ReactNode } from "react";

interface MediaFrameProps {
  aspectRatio: "aspect-[16/9]" | "aspect-[4/5]" | "aspect-[21/9]" | "aspect-[3/2]";
  className?: string;
  children: ReactNode;
}

export function MediaFrame({ aspectRatio, className = "", children }: MediaFrameProps) {
  return (
    <div className={`relative overflow-hidden bg-[#111622] ${aspectRatio} ${className}`}>
      {children}
    </div>
  );
}
