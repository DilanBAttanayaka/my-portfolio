"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CodeBackgroundProps {
  enableParallax?: boolean;
}

export default function CodeBackground({
  enableParallax = false,
}: CodeBackgroundProps) {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enableParallax || !bgRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        y: -500,
        ease: "none",
        scrollTrigger: {
          trigger: bgRef.current?.parentElement,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, [enableParallax]);

  return (
    <>
      {/* Code background */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-[360vh] blur-[2px] -z-10"
        style={{
          backgroundImage: "url('/code.jpg')",
          backgroundRepeat: "repeat-y",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/80 via-stone-900/85 to-neutral-800/80 -z-10" />
    </>
  );
}
