"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import ArrowDown from "./ArrowDown";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const shape1Ref = useRef<SVGPathElement>(null);
  const shape2Ref = useRef<SVGPathElement>(null);
  const shape4Ref = useRef<SVGCircleElement>(null);
  const movableBlobRef = useRef<SVGCircleElement>(null);
  const shapeContainerRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Tech icons data with positions from 260° to 40° (bottom arc wrapping through 0°)
  const techIcons = [
    { name: "HTML", angle: 30 - 8, svg: "/svgs/html.svg" },
    { name: "CSS", angle: 47 - 8, svg: "/svgs/css.svg" },
    { name: "JavaScript", angle: 64 - 8, svg: "/svgs/javascript.svg" },
    { name: "TypeScript", angle: 81 - 8, svg: "/svgs/typescript.svg" },
    { name: "Next.js", angle: 98 - 8, svg: "/svgs/nextjs.svg" },
    { name: "React", angle: 115 - 8, svg: "/svgs/react.svg" },
    { name: "Redux", angle: 133 - 8, svg: "/svgs/redux.svg" },
    { name: "Tailwind", angle: 150 - 8, svg: "/svgs/tailwind.svg" },
  ];

  const getIconPosition = (angle: number) => {
    // Convert angle to radians, subtract 90 to make 0° point up
    const radian = ((angle - 90) * Math.PI) / 180;
    const x = 37 * Math.cos(radian); // 38% is the radius
    const y = 37 * Math.sin(radian);
    return { x, y };
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state
      gsap.set(contentRef.current, { opacity: 0, y: 20 });

      // Animate content
      gsap.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      });

      // Mouse interaction for background shapes
      const handleBackgroundShapesMove = (e: MouseEvent) => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const deltaX = (e.clientX - centerX) / window.innerWidth;
        const deltaY = (e.clientY - centerY) / window.innerHeight;

        // Shape 1 - moves opposite to mouse (parallax effect)
        if (shape1Ref.current) {
          gsap.to(shape1Ref.current, {
            x: deltaX * 40,
            y: deltaY * 40,
            duration: 1,
            ease: "power2.out",
          });
        }

        // Shape 2 - moves with mouse but slower
        if (shape2Ref.current) {
          gsap.to(shape2Ref.current, {
            x: deltaX * 50,
            y: deltaY * 50,
            duration: 1.2,
            ease: "power2.out",
          });
        }
      };

      window.addEventListener("mousemove", handleBackgroundShapesMove);

      // Mouse interaction for movable blob and icons
      const handleMouseMove = (e: MouseEvent) => {
        if (!shapeContainerRef.current) return;

        const rect = shapeContainerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - centerX) / rect.width;
        const deltaY = (e.clientY - centerY) / rect.height;

        const moveX = deltaX * 20;
        const moveY = deltaY * 20;

        // Move smaller blob based on mouse position
        if (movableBlobRef.current) {
          gsap.to(movableBlobRef.current, {
            x: moveX,
            y: moveY,
            rotation: deltaX * 5,
            scale: 1 + Math.abs(deltaX) * 0.05,
            duration: 0.8,
            ease: "power2.out",
          });
        }

        // Move each icon individually toward the cursor based on distance
        const screenWidth = window.innerWidth;
        const baseScale = screenWidth < 768 ? 0.8 : 1; // Smaller on mobile
        const scaleMultiplier = screenWidth < 768 ? 0.08 : 0.1; // Less growth on mobile

        iconRefs.current.forEach((iconEl) => {
          if (!iconEl) return;

          const iconRect = iconEl.getBoundingClientRect();
          const iconCenterX = iconRect.left + iconRect.width / 2;
          const iconCenterY = iconRect.top + iconRect.height / 2;

          const distX = e.clientX - iconCenterX;
          const distY = e.clientY - iconCenterY;
          const distance = Math.sqrt(distX * distX + distY * distY);

          // Icons move toward cursor based on proximity
          const force = Math.max(0, 300 - distance);
          const moveIconX = (distX / distance) * force * 0.25;
          const moveIconY = (distY / distance) * force * 0.1;

          gsap.to(iconEl, {
            x: moveIconX,
            y: moveIconY,
            scale: baseScale + (force / 200) * scaleMultiplier,
            duration: 0.6,
            ease: "power2.out",
          });
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mousemove", handleBackgroundShapesMove);
      };
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleButtonHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const handleButtonLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, { scale: 1, duration: 0.2, ease: "power2.out" });
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      scale: 0.95,
      duration: 0.1,
      ease: "power2.out",
    });
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="min-h-screen flex items-center relative"
    >
      {/* Animated SVG shapes */}
      <svg
        className="absolute inset-0 w-full h-full -z-10 opacity-10"
        viewBox="0 0 1000 1000"
      >
        <defs>
          <linearGradient
            id="shapeGradient1"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#78716c" />
            <stop offset="100%" stopColor="#a8a29e" />
          </linearGradient>
          <linearGradient
            id="shapeGradient2"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#a8a29e" />
            <stop offset="100%" stopColor="#d6d3d1" />
          </linearGradient>
        </defs>

        {/* Shape 1 - Top right blob */}
        <path
          ref={shape1Ref}
          d="M700,150 C750,100 850,100 900,150 C950,200 950,300 900,350 C850,400 750,400 700,350 C650,300 650,200 700,150 Z"
          fill="url(#shapeGradient1)"
          opacity="0.3"
          style={{ filter: "blur(2px)" }}
        />

        {/* Shape 2 - Bottom right */}
        <path
          ref={shape2Ref}
          d="M750,700 Q800,650 850,700 Q900,750 850,800 Q800,850 750,800 Q700,750 750,700 Z"
          fill="url(#shapeGradient2)"
          opacity="0.4"
          style={{ filter: "blur(4px)" }}
        />
      </svg>
      <div className="container mx-auto px-4 w-full">
        <div className="grid items-center gap-10 md:gap-12 md:grid-cols-2">
          {/* Left: Text content */}
          <div ref={contentRef} className="text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-blue-400/80 mb-4">
              Hello, I&apos;m Dilan
            </h1>
            <h2 className="text-xl md:text-2xl font-semibold text-stone-300 mb-4">
              Frontend Developer
            </h2>
            <p className="text-base md:text-lg text-gray-300 mb-8 max-w-xl">
              With over 3 years of experience, I specialize in creating fast,
              responsive, and accessible web applications.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                className="bg-stone-700 text-white px-6 py-3 rounded-lg hover:bg-stone-600 transition-colors"
                onMouseEnter={handleButtonHover}
                onMouseLeave={handleButtonLeave}
                onMouseDown={handleButtonClick}
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="border border-stone-600 text-stone-300 px-6 py-3 rounded-lg hover:bg-stone-700 hover:text-white transition-colors"
                onMouseEnter={handleButtonHover}
                onMouseLeave={handleButtonLeave}
                onMouseDown={handleButtonClick}
              >
                Get In Touch
              </a>
            </div>
          </div>
          <div className="absolute bottom-[5%] left-[25%] -translate-x-1/2">
            <ArrowDown className="w-64 text-stone-300" />
          </div>

          {/* Right: Portrait with animated shape */}
          <div
            ref={shapeContainerRef}
            className="relative flex items-end justify-center h-[66vh] overflow-visible"
          >
            <div className="relative w-[200%] md:w-[950px] aspect-square translate-y-[23%] -translate-x-[25%] overflow-visible">
              {/* Interactive organic shape background */}
              <svg
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%]"
                viewBox="-100 -100 200 200"
                preserveAspectRatio="xMidYMid meet"
                style={{ overflow: "visible" }}
              >
                <defs>
                  <linearGradient
                    id="portraitShapeGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#78716c" />
                    <stop offset="100%" stopColor="#57534e" />
                  </linearGradient>
                  <linearGradient
                    id="movableBlobGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#57534e" />
                    <stop offset="100%" stopColor="#44403c" />
                  </linearGradient>
                </defs>
                {/* Smaller movable blob - behind and to the left */}
                <circle
                  ref={movableBlobRef}
                  cx="-40"
                  cy="10"
                  r="45"
                  fill="url(#movableBlobGradient)"
                  className="opacity-15 cursor-pointer"
                  style={{ transformOrigin: "center", filter: "blur(0.5px)" }}
                />
                {/* Main static blob */}
                <circle
                  ref={shape4Ref}
                  cx="0"
                  cy="0"
                  r="60"
                  fill="url(#portraitShapeGradient)"
                  className="opacity-20"
                  style={{ transformOrigin: "center", filter: "blur(0.2px)" }}
                />
              </svg>

              {/* Tech icons positioned along the shape */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%]">
                {techIcons.map((tech, index) => {
                  const pos = getIconPosition(tech.angle);
                  return (
                    <div
                      key={tech.name}
                      ref={(el) => {
                        iconRefs.current[index] = el;
                      }}
                      className={`absolute opacity-80 cursor-pointer ${
                        [
                          "TypeScript",
                          "JavaScript",
                          "Redux",
                          "Next.js",
                        ].includes(tech.name)
                          ? "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9"
                          : "w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12"
                      }`}
                      style={{
                        left: `${53 + pos.x}%`,
                        top: `${49 + pos.y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                      title={tech.name}
                    >
                      <Image
                        src={tech.svg}
                        alt={tech.name}
                        fill
                        className="object-contain pointer-events-none"
                      />
                    </div>
                  );
                })}
              </div>

              {/* Image */}
              <div className="absolute left-1/2 top-[43%] -translate-x-1/2 -translate-y-1/2 aspect-square w-[65%]">
                <Image
                  src="/me.png"
                  alt="Portrait"
                  width={864}
                  height={1184}
                  sizes="(max-width: 768px) 45vw, 600px"
                  priority
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
