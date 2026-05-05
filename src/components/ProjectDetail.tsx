"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import ArrowDown from "./ArrowDown";
import { useSmoothScroll } from "./SmoothScroll";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectDetail({ project }: { project: any }) {
  const lenis = useSmoothScroll();
  const [activeSection, setActiveSection] = useState(0);
  const [platform, setPlatform] = useState<"web" | "mobile">("web");
  const [expandedFeature, setExpandedFeature] = useState<number | null>(0);
  const chipRef = useRef<HTMLDivElement>(null);

  const toggleFeature = (index: number) => {
    setExpandedFeature((prev) => (prev === index ? null : index));
  };

  const handlePlatformChange = (newPlatform: "web" | "mobile") => {
    if (newPlatform === platform) return;
    const chip = chipRef.current;
    if (chip) {
      const chipWidth = chip.offsetWidth;
      gsap.to(chip, {
        x: newPlatform === "web" ? 0 : chipWidth,
        duration: 0.35,
        ease: "power2.inOut",
      });
    }
    setPlatform(newPlatform);
  };

  const currentData = platform === "mobile" ? project.mobile : project;
  const currentSlug =
    platform === "mobile" ? `${project.slug}-mobile` : project.slug;

  const defaultTechs = [
    { name: "React", icon: "/svgs/react.svg" },
    { name: "Next.js", icon: "/svgs/nextjs.svg" },
    { name: "Tailwind CSS", icon: "/svgs/tailwind.svg" },
    { name: "Redux", icon: "/svgs/redux.svg" },
    { name: "TypeScript", icon: "/svgs/typescript.svg" },
    { name: "PayHere", icon: "/svgs/payhere.png" },
  ];

  const scrollToSection = (index: any) => {
    const container = document.getElementById("sections-container");
    if (!container || !lenis) return;

    const containerTop = container.offsetTop;
    const containerHeight = container.offsetHeight;
    const scrollPositions = [0, 0.25, 0.5, 0.75];
    const targetScroll =
      containerTop + containerHeight * scrollPositions[index];

    lenis.scrollTo(targetScroll, {
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  };

  // Separate effect for platform changes — just resets section states without rebuilding GSAP
  useEffect(() => {
    const sections = [
      "#tech-content",
      "#description-content",
      "#features-content",
      "#role-content",
    ];
    sections.forEach((id, index) => {
      if (index === activeSection) {
        gsap.set(id, { height: "auto", opacity: 1, y: 0 });
      } else {
        gsap.set(id, { height: 0, opacity: 0, y: 100 });
      }
    });
    ScrollTrigger.refresh();
  }, [platform, activeSection]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state: only first section visible
      gsap.set("#tech-content", { height: "auto", opacity: 1, y: 0 });
      gsap.set("#description-content", { height: 0, opacity: 0, y: 100 });
      gsap.set("#features-content", { height: 0, opacity: 0, y: 100 });
      gsap.set("#role-content", { height: 0, opacity: 0, y: 100 });

      // Pin the content container for 200vh
      ScrollTrigger.create({
        trigger: "#sections-container",
        start: "top top",
        end: `+=${window.innerHeight * 2}`,
        pin: "#sections-content",
        pinSpacing: false,
      });

      // Horizontal scroll for images
      const imageTrack = document.querySelector("#image-track");
      if (imageTrack) {
        const images = imageTrack.querySelectorAll(".gallery-image");
        if (images.length > 1) {
          const trackWidth = images.length * window.innerWidth;

          gsap.to(imageTrack, {
            x: -(trackWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
              trigger: "#gallery-section",
              start: "top top",
              end: `+=${window.innerHeight * (images.length - 1 + 1)}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });
        }
      }

      // Section animations (Tech -> Description -> Features -> Role)
      ScrollTrigger.create({
        trigger: "#sections-container",
        start: "15% top",
        end: "30% top",
        onEnter: () => {
          setActiveSection(1);
          gsap.to("#tech-content", {
            height: 0,
            opacity: 0,
            y: -100,
            duration: 0.5,
          });
          gsap.to("#description-content", {
            height: "auto",
            opacity: 1,
            y: 0,
            duration: 0.5,
          });
        },
        onLeaveBack: () => {
          setActiveSection(0);
          gsap.to("#tech-content", {
            height: "auto",
            opacity: 1,
            y: 0,
            duration: 0.5,
          });
          gsap.to("#description-content", {
            height: 0,
            opacity: 0,
            y: 100,
            duration: 0.5,
          });
        },
      });

      ScrollTrigger.create({
        trigger: "#sections-container",
        start: "30% top",
        end: "45% top",
        onEnter: () => {
          setActiveSection(2);
          gsap.to("#description-content", {
            height: 0,
            opacity: 0,
            y: -100,
            duration: 0.5,
          });
          gsap.to("#features-content", {
            height: "auto",
            opacity: 1,
            y: 0,
            duration: 0.5,
          });
        },
        onLeaveBack: () => {
          setActiveSection(1);
          gsap.to("#description-content", {
            height: "auto",
            opacity: 1,
            y: 0,
            duration: 0.5,
          });
          gsap.to("#features-content", {
            height: 0,
            opacity: 0,
            y: 100,
            duration: 0.5,
          });
        },
      });

      ScrollTrigger.create({
        trigger: "#sections-container",
        start: "45% top",
        end: "60% top",
        onEnter: () => {
          setActiveSection(3);
          gsap.to("#features-content", {
            height: 0,
            opacity: 0,
            y: -100,
            duration: 0.5,
          });
          gsap.to("#role-content", {
            height: "auto",
            opacity: 1,
            y: 0,
            duration: 0.5,
          });
        },
        onLeaveBack: () => {
          setActiveSection(2);
          gsap.to("#features-content", {
            height: "auto",
            opacity: 1,
            y: 0,
            duration: 0.5,
          });
          gsap.to("#role-content", {
            height: 0,
            opacity: 0,
            y: 100,
            duration: 0.5,
          });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="h-auto bg-gradient-to-b from-stone-900 via-stone-800 to-stone-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-stone-900/80 backdrop-blur-md border-b border-stone-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-white hover:text-stone-300 transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-3 h-3" /> Back
          </Link>
          <h1 className="text-xl font-bold text-white uppercase">
            {currentData.title}
          </h1>
          <div className="w-24" />
        </div>
      </header>

      {/* Sections Container */}
      <div id="sections-container" className="h-[280vh] relative pt-[20vh]">
        <div id="sections-content" className="max-w-7xl mx-auto px-6 pb-10">
          {/* Platform Toggle */}
          {project.mobile && (
            <div className="flex justify-center mb-12 relative z-[100]">
              <div className="bg-stone-800 p-1 rounded-full border border-stone-700 flex items-center shadow-xl relative min-w-[240px]">
                {/* Animated Background Chip */}
                <div
                  ref={chipRef}
                  style={{
                    position: "absolute",
                    top: "4px",
                    left: "4px",
                    width: "calc(50% - 4px)",
                    height: "calc(100% - 8px)",
                    borderRadius: "9999px",
                    backgroundColor: "#2563eb",
                    boxShadow: "0 2px 8px rgba(37,99,235,0.4)",
                  }}
                />

                <button
                  onClick={() => handlePlatformChange("web")}
                  className={`relative z-10 flex-1 px-6 py-2 rounded-full text-sm font-semibold cursor-pointer transition-colors duration-300 ${
                    platform === "web"
                      ? "text-white"
                      : "text-stone-400 hover:text-stone-200"
                  }`}
                >
                  Web App
                </button>
                <button
                  onClick={() => handlePlatformChange("mobile")}
                  className={`relative z-10 flex-1 px-3 py-3 rounded-full text-sm font-semibold cursor-pointer transition-colors duration-300 ${
                    platform === "mobile"
                      ? "text-white"
                      : "text-stone-400 hover:text-stone-200"
                  }`}
                >
                  Mobile App
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Side - Section Titles */}
            <div className="space-y-4">
              <div
                onClick={() => scrollToSection(0)}
                className="flex items-center gap-4 p-4 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <span className="text-stone-500 font-mono text-sm">01</span>
                <h3
                  className={`text-2xl md:text-3xl font-bold transition-colors ${
                    activeSection === 0 ? "text-blue-500" : "text-white"
                  }`}
                >
                  Tech & Technique
                </h3>
              </div>

              <div
                onClick={() => scrollToSection(1)}
                className="flex items-center gap-4 p-4 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <span className="text-stone-500 font-mono text-sm">02</span>
                <h3
                  className={`text-2xl md:text-3xl font-bold transition-colors ${
                    activeSection === 1 ? "text-blue-500" : "text-white"
                  }`}
                >
                  Description
                </h3>
              </div>

              <div
                onClick={() => scrollToSection(2)}
                className="flex items-center gap-4 p-4 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <span className="text-stone-500 font-mono text-sm">03</span>
                <h3
                  className={`text-2xl md:text-3xl font-bold transition-colors ${
                    activeSection === 2 ? "text-blue-500" : "text-white"
                  }`}
                >
                  Key Features
                </h3>
              </div>

              <div
                onClick={() => scrollToSection(3)}
                className="flex items-center gap-4 p-4 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <span className="text-stone-500 font-mono text-sm">04</span>
                <h3
                  className={`text-2xl md:text-3xl font-bold transition-colors ${
                    activeSection === 3 ? "text-blue-500" : "text-white"
                  }`}
                >
                  My Role
                </h3>
              </div>
            </div>

            {/* Right Side - Section Content */}
            <div className="relative min-h-[420px]">
              {/* ── 01 Tech & Technique ── */}
              <div
                id="tech-content"
                className="overflow-hidden absolute top-0 left-0 w-full"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-400/70 mb-4">
                  Stack Used
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {(currentData.techs || defaultTechs).map(
                    (tech: { name: string; icon: string }, i: number) => (
                      <div
                        key={i}
                        className="group flex items-center gap-3 bg-stone-800/60 hover:bg-stone-800 border border-stone-700/50 hover:border-blue-500/40 rounded-xl px-4 py-3 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
                      >
                        <div className="relative w-7 h-7 flex-shrink-0">
                          <Image
                            src={tech.icon}
                            alt={tech.name}
                            fill
                            className="object-contain group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <span className="text-sm font-medium text-stone-300 group-hover:text-white transition-colors leading-tight">
                          {tech.name}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* ── 02 Description ── */}
              <div
                id="description-content"
                className="overflow-hidden absolute top-0 left-0 w-full"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-400/70 mb-4">
                  Project Overview
                </p>
                <div className="relative pl-5 border-l-2 border-blue-500/60">
                  <p className="text-stone-200 text-lg md:text-xl leading-relaxed font-light">
                    {currentData.description}
                  </p>
                </div>
              </div>

              {/* ── 03 Key Features ── */}
              <div
                id="features-content"
                className="overflow-hidden absolute top-0 left-0 w-full z-10"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-400/70 mb-4">
                  Highlights
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {currentData.features?.map(
                    (
                      feature: { title: string; description: string },
                      index: number,
                    ) => {
                      const isOpen = expandedFeature === index;
                      return (
                        <div
                          key={index}
                          className={`border rounded-xl transition-all duration-300 ${
                            isOpen
                              ? "bg-stone-800/80 border-blue-500/40 shadow-md shadow-blue-500/10"
                              : "bg-stone-800/40 border-stone-700/40 hover:border-stone-600/60"
                          }`}
                        >
                          <button
                            onClick={() => toggleFeature(index)}
                            className="w-full flex items-center gap-3 p-3 text-left group"
                          >
                            <span
                              className={`flex-shrink-0 w-8 h-8 rounded-lg border flex items-center justify-center text-xs font-bold font-mono transition-colors ${
                                isOpen
                                  ? "bg-blue-500/20 border-blue-500/50 text-blue-400"
                                  : "bg-stone-700/50 border-stone-600/50 text-stone-400 group-hover:text-blue-400 group-hover:border-blue-500/30"
                              }`}
                            >
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <h4
                              className={`flex-1 text-sm font-semibold transition-colors ${
                                isOpen
                                  ? "text-blue-300"
                                  : "text-white group-hover:text-stone-200"
                              }`}
                            >
                              {feature.title}
                            </h4>
                            {isOpen ? (
                              <ChevronUp className="w-4 h-4 text-blue-400 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-stone-500 group-hover:text-stone-400 flex-shrink-0 transition-colors" />
                            )}
                          </button>
                          <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${
                              isOpen ? "max-h-48 pb-3" : "max-h-0"
                            }`}
                          >
                            <p className="text-stone-400 text-sm leading-relaxed px-3 pl-14">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      );
                    },
                  )}
                </div>
              </div>

              {/* ── 04 My Role ── */}
              <div
                id="role-content"
                className="overflow-hidden absolute top-0 left-0 w-full"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-400/70 mb-4">
                  My Contribution
                </p>
                <div className="relative bg-gradient-to-br from-stone-800/80 to-stone-900/60 border border-stone-700/50 rounded-2xl p-6 overflow-hidden">
                  {/* Decorative quote mark */}
                  <span className="absolute -top-4 -left-2 text-[8rem] leading-none font-serif text-blue-500/10 select-none pointer-events-none">
                    &ldquo;
                  </span>
                  <p className="relative text-stone-300 text-base leading-relaxed">
                    {currentData.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center fixed top-[75%] left-0 right-0 pointer-events-none">
          <ArrowDown className="w-64 h-64 text-stone-400 " />
        </div>
      </div>

      {/* Image Gallery Section */}
      <div
        id="gallery-section"
        className="bg-stone-800 border-t border-stone-700 h-screen overflow-hidden"
      >
        <div className="h-full flex items-center">
          <div id="image-track" className="flex h-full">
            {(currentData.images || [1]).map((num: number) => (
              <div
                key={`${platform}-${num}`}
                className="gallery-image w-screen h-full flex-shrink-0 flex items-center justify-center px-12"
              >
                {platform === "mobile" ? (
                  /* Portrait phone frame for mobile screenshots */
                  <div
                    className="relative flex-shrink-0"
                    style={{
                      height: "78vh",
                      aspectRatio: "9 / 19",
                    }}
                  >
                    {/* Phone shell */}
                    <div className="absolute inset-0 rounded-[2rem] border-[6px] border-stone-600 bg-black shadow-2xl overflow-hidden">
                      {/* Notch */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-stone-900 rounded-b-xl z-10" />
                      <Image
                        src={`/projects/${currentSlug}/${num}.png`}
                        alt={`${currentData.title} screenshot ${num}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                ) : (
                  /* Landscape frame for web screenshots */
                  <div
                    className="relative flex-shrink-0 rounded-lg overflow-hidden shadow-2xl"
                    style={{
                      height: "70vh",
                      aspectRatio: "16 / 9",
                    }}
                  >
                    <Image
                      src={`/projects/${currentSlug}/${num}.png`}
                      alt={`${currentData.title} screenshot ${num}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-stone-800 border-t border-stone-700 py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold text-white mb-6">
            Interested in working together?
          </h3>
          <Link
            href="/#contact"
            className="inline-block px-8 py-4 bg-white text-stone-900 rounded-lg font-semibold hover:bg-stone-200 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}
