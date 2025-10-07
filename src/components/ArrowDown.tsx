"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface ArrowDownProps {
  className?: string;
}

export default function ArrowDown({ className = "" }: ArrowDownProps) {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!pathRef.current) return;

    const path = pathRef.current;
    const length = path.getTotalLength();

    // Set up the starting positions
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
      fillOpacity: 0,
      y: 0,
      opacity: 1,
    });

    // Create timeline for sequential animation
    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 1,
    });

    // Draw the outline
    tl.to(path, {
      strokeDashoffset: 0,
      duration: 2,
      ease: "power2.inOut",
    });

    // Fill the arrow
    tl.to(
      path,
      {
        fillOpacity: 0.03,
        duration: 0.5,
        ease: "power2.inOut",
      },
      "+=0.2"
    );

    // Move arrow down
    tl.to(
      path,
      {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.in",
      },
      "+=0.1"
    );

    // Reset for next loop
    tl.set(path, {
      strokeDashoffset: length,
      fillOpacity: 0,
      y: 0,
      opacity: 1,
    });
  }, []);

  return (
    <svg
      viewBox="0 0 200 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        ref={pathRef}
        d="M20 10 L100 30 L180 10 L180 35 L100 55 L20 35 Z"
        stroke="currentColor"
        strokeWidth="0.1"
        strokeLinecap="square"
        strokeLinejoin="miter"
        fill="currentColor"
      />
    </svg>
  );
}
