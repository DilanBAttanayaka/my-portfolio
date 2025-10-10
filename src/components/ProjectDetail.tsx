"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectDetail({ project }: { project: any }) {
  const scrollToSection = (index: any) => {
    const container = document.getElementById("sections-container");
    if (!container) return;

    const containerTop = container.offsetTop;
    const containerHeight = container.offsetHeight;
    const scrollPositions = [0, 0.125, 0.25, 0.375, 0.5];
    const targetScroll =
      containerTop + containerHeight * scrollPositions[index];

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state: only first section visible
      gsap.set("#tech-content", { height: "auto", opacity: 1 });
      gsap.set("#description-content", { height: 0, opacity: 0 });
      gsap.set("#features-content", { height: 0, opacity: 0 });
      gsap.set("#technical-content", { height: 0, opacity: 0 });
      gsap.set("#role-content", { height: 0, opacity: 0 });

      // Pin the content container for 200vh
      ScrollTrigger.create({
        trigger: "#sections-container",
        start: "top top",
        end: `+=${window.innerHeight * 2}`,
        pin: "#sections-content",
        pinSpacing: false,
      });

      // Section 1: Tech -> Description (8%)
      ScrollTrigger.create({
        trigger: "#sections-container",
        start: "10% top",
        end: "20% top",
        markers: true,
        onEnter: () => {
          gsap.to("#tech-content", { height: 0, opacity: 0, duration: 0.5 });
          gsap.to("#description-content", {
            height: "auto",
            opacity: 1,
            duration: 0.5,
          });
        },
        onLeaveBack: () => {
          gsap.to("#tech-content", {
            height: "auto",
            opacity: 1,
            duration: 0.5,
          });
          gsap.to("#description-content", {
            height: 0,
            opacity: 0,
            duration: 0.5,
          });
        },
      });

      // Section 2: Description -> Features (16%)
      ScrollTrigger.create({
        trigger: "#sections-container",
        start: "20% top",
        end: "30% top",

        onEnter: () => {
          gsap.to("#description-content", {
            height: 0,
            opacity: 0,
            duration: 0.5,
          });
          gsap.to("#features-content", {
            height: "auto",
            opacity: 1,
            duration: 0.5,
          });
        },
        onLeaveBack: () => {
          gsap.to("#description-content", {
            height: "auto",
            opacity: 1,
            duration: 0.5,
          });
          gsap.to("#features-content", {
            height: 0,
            opacity: 0,
            duration: 0.5,
          });
        },
      });

      // Section 3: Features -> Technical (24%)
      ScrollTrigger.create({
        trigger: "#sections-container",
        start: "30% top",
        end: "40% top",

        onEnter: () => {
          gsap.to("#features-content", {
            height: 0,
            opacity: 0,
            duration: 0.5,
          });
          gsap.to("#technical-content", {
            height: "auto",
            opacity: 1,
            duration: 0.5,
          });
        },
        onLeaveBack: () => {
          gsap.to("#features-content", {
            height: "auto",
            opacity: 1,
            duration: 0.5,
          });
          gsap.to("#technical-content", {
            height: 0,
            opacity: 0,
            duration: 0.5,
          });
        },
      });

      // Section 4: Technical -> Role (32%)
      ScrollTrigger.create({
        trigger: "#sections-container",
        start: "40% top",
        end: "50% top",

        onEnter: () => {
          gsap.to("#technical-content", {
            height: 0,
            opacity: 0,
            duration: 0.5,
          });
          gsap.to("#role-content", {
            height: "auto",
            opacity: 1,
            duration: 0.5,
          });
        },
        onLeaveBack: () => {
          gsap.to("#technical-content", {
            height: "auto",
            opacity: 1,
            duration: 0.5,
          });
          gsap.to("#role-content", { height: 0, opacity: 0, duration: 0.5 });
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
            className="text-white hover:text-stone-300 transition-colors"
          >
            ← Back to Portfolio
          </Link>
          <h1 className="text-xl font-bold text-white">{project.title}</h1>
          <div className="w-24" />
        </div>
      </header>

      {/* Sections Container */}
      <div id="sections-container" className="h-[200vh] relative pt-[20vh]">
        <div id="sections-content" className="max-w-7xl mx-auto px-6 pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Side - Section Titles */}
            <div className="space-y-4">
              <div
                onClick={() => scrollToSection(0)}
                className="flex items-center gap-4 p-4 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <span className="text-stone-500 font-mono text-sm">01</span>
                <h3 className="text-2xl md:text-3xl font-bold text-white">
                  Tech & Technique
                </h3>
              </div>

              <div
                onClick={() => scrollToSection(1)}
                className="flex items-center gap-4 p-4 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <span className="text-stone-500 font-mono text-sm">02</span>
                <h3 className="text-2xl md:text-3xl font-bold text-white">
                  Description
                </h3>
              </div>

              <div
                onClick={() => scrollToSection(2)}
                className="flex items-center gap-4 p-4 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <span className="text-stone-500 font-mono text-sm">03</span>
                <h3 className="text-2xl md:text-3xl font-bold text-white">
                  Key Features
                </h3>
              </div>

              <div
                onClick={() => scrollToSection(3)}
                className="flex items-center gap-4 p-4 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <span className="text-stone-500 font-mono text-sm">04</span>
                <h3 className="text-2xl md:text-3xl font-bold text-white">
                  Technical Highlights
                </h3>
              </div>

              <div
                onClick={() => scrollToSection(4)}
                className="flex items-center gap-4 p-4 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <span className="text-stone-500 font-mono text-sm">05</span>
                <h3 className="text-2xl md:text-3xl font-bold text-white">
                  My Role
                </h3>
              </div>
            </div>

            {/* Right Side - Section Content */}
            <div className="relative">
              <div className="backdrop-blur-sm rounded-2xl p-6">
                <div
                  id="tech-content"
                  className="text-stone-300 text-lg leading-relaxed whitespace-pre-line overflow-hidden absolute top-0 left-0 w-full p-6"
                >
                  {project.tech}
                </div>

                <div
                  id="description-content"
                  className="text-stone-300 text-lg leading-relaxed whitespace-pre-line overflow-hidden absolute top-0 left-0 w-full p-6"
                >
                  {project.description}
                </div>

                <div
                  id="features-content"
                  className="text-stone-300 text-lg leading-relaxed whitespace-pre-line overflow-hidden absolute top-0 left-0 w-full p-6"
                >
                  {project.features}
                </div>

                <div
                  id="technical-content"
                  className="text-stone-300 text-lg leading-relaxed whitespace-pre-line overflow-hidden absolute top-0 left-0 w-full p-6"
                >
                  {project.technical}
                </div>

                <div
                  id="role-content"
                  className="text-stone-300 text-lg leading-relaxed whitespace-pre-line overflow-hidden absolute top-0 left-0 w-full p-6"
                >
                  {project.role}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* {Footer CTA}
      <div className="bg-stone-800 border-t border-stone-700 py-12">
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
      </div> */}
    </div>
  );
}
