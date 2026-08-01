"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type SafeImageProps = Omit<ImageProps, "onError" | "alt"> & {
  alt: string;
  /** Shown behind the image; also used if load fails */
  fallbackClassName?: string;
};

/**
 * Never shows the browser broken-image icon — falls back to a soft blur panel.
 */
export function SafeImage({
  alt,
  className,
  fallbackClassName = "bg-[linear-gradient(135deg,#dbeafe_0%,#e5e7eb_45%,#93c5fd_100%)]",
  ...props
}: SafeImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`absolute inset-0 ${fallbackClassName}`}
        role="img"
        aria-label={alt}
      >
        <div
          className="absolute inset-0 backdrop-blur-xl"
          style={{
            background:
              "radial-gradient(circle at 30% 40%, rgba(255,255,255,0.55), transparent 55%), radial-gradient(circle at 70% 70%, rgba(29,78,216,0.25), transparent 50%)",
          }}
          aria-hidden
        />
      </div>
    );
  }

  return (
    <Image
      {...props}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
