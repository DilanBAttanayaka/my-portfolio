"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MaskedText() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
      trigger: "#masked-text-container",
      start: "top top",
      end: "+=200%",
      pin: "#masked-text",
      pinSpacing: false,
    });

    gsap.to("#masked-text h1", {
      backgroundPosition: "center 100%",
      ease: "none",
      scrollTrigger: {
        trigger: "#masked-text",
        start: "top top",
        end: "+=200%",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      id="masked-text-container"
      className="relative w-full h-[100vh] bg-stone-200 overflow-hidden "
    >
      <div
        id="masked-text"
        className="relative flex items-center justify-center w-full h-[100vh]"
      >
        <div className="bg-stone-200 w-full h-full flex items-center justify-center">
          <h1
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl max-w-[900px] font-bold text-transparent text-center px-4"
            style={{
              backgroundImage: `url('/10.jpg')`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundPosition: "center 0%",
              backgroundSize: "cover",
            }}
          >
            Turning ideas into reality.
          </h1>
        </div>
      </div>
    </div>
  );
}
