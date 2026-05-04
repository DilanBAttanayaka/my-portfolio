"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const secondaryProjects = [
  {
    id: 1,
    title: "AI Legal Assistant",
    description:
      "AI-powered legal assistant providing intelligent guidance on legal matters and documentation",
    image: "/ailegal.png",
    tags: ["Next.js 14", "Typescript", "Tailwind CSS"],
    hasImage: true,
  },
  {
    id: 2,
    title: "Cafe Finder",
    description:
      "Modern web application for discovering and reviewing coffee shops",
    image: "/projects/cafe-finder/1.png",
    tags: ["Next.js 14", "TypeScript", "Tailwind CSS", "Supabase"],
    hasImage: true,
  },
  {
    id: 3,
    title: "Rocell Stock App",
    description:
      "Mobile app for inventory stock check (integrated with zebra device scanners) for rocell bathware",
    image: "",
    svg: "/svgs/rocell.svg",
    tags: ["React Native", "TypeScript"],
    hasImage: false,
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: "Personal portfolio showcasing projects and skills",
    image: "",
    svg: "/svgs/nextjs.svg",
    tags: ["Next.js 15", "TypeScript", "Tailwind CSS", "GSAP"],
    hasImage: false,
  },
  {
    id: 5,
    title: "Wellness Sri Lanka",
    description:
      "Premium wellness retreat marketplace connecting seekers with authentic Ayurveda and luxury meditation escapes",
    image: "/projects/wellness/1.png",
    svg: "/svgs/wellness.png",
    tags: ["Next.js 15", "Supabase", "Tailwind CSS"],
    hasImage: true,
  },
];

export default function SecondaryProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate project cards on scroll
      projectRefs.current.forEach((project) => {
        if (project) {
          gsap.fromTo(
            project,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: project,
                start: "top 85%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-stone-900 w-full min-h-screen py-20 px-4 z-20 rounded-t-3xl mt-[100vh]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-stone-100 mb-6">
            More Projects
          </h2>
          <p className="text-xl text-stone-300 max-w-3xl mx-auto">
            Additional work showcasing diverse skills and technologies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 01: AI Legal Assistant (Top Left) */}
          {secondaryProjects
            .filter((p) => p.id === 1)
            .map((project) => (
              <div
                key={project.id}
                ref={(el) => {
                  projectRefs.current[0] = el;
                }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="relative w-full aspect-[16/9] mt-4 shadow-lg">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="w-full h-auto"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-stone-900 text-xl mb-2">
                    {project.title}
                  </h3>
                  <p className="text-stone-600 mb-3 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-stone-200 text-stone-700 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}

          {/* 02: Stacked Projects (Top Right) */}
          <div
            ref={(el) => {
              projectRefs.current[1] = el;
            }}
            className="flex flex-col gap-6 h-full"
          >
            {secondaryProjects
              .filter((p) => p.id === 3 || p.id === 4)
              .map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-1"
                >
                  <div className="flex-1 p-5 flex flex-col justify-between min-w-0">
                    <div>
                      <h3 className="font-bold text-stone-900 text-lg mb-2 truncate">
                        {project.title}
                      </h3>
                      <p className="text-stone-600 mb-3 text-xs leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-stone-100 text-stone-600 rounded-full text-[9px] border border-stone-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  {(project as any).svg && (
                    <div className="w-32 bg-stone-100 flex items-center justify-center p-4 border-l border-stone-200 shrink-0">
                      <Image
                        src={(project as any).svg}
                        alt={project.title}
                        width={100}
                        height={100}
                        className="opacity-90 w-auto h-auto max-h-20"
                      />
                    </div>
                  )}
                </div>
              ))}
          </div>

          {/* 03: Cafe Finder (Bottom Left) */}
          {secondaryProjects
            .filter((p) => p.id === 2)
            .map((project) => (
              <div
                key={project.id}
                ref={(el) => {
                  projectRefs.current[3] = el;
                }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="relative w-full aspect-[16/9] mt-4 shadow-lg">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="w-full h-auto"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-stone-900 text-xl mb-2">
                    {project.title}
                  </h3>
                  <p className="text-stone-600 mb-3 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-stone-200 text-stone-700 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}

          {/* 04: Wellness Sri Lanka (Bottom Right) */}
          {secondaryProjects
            .filter((p) => p.id === 5)
            .map((project) => (
              <div
                key={project.id}
                ref={(el) => {
                  projectRefs.current[4] = el;
                }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="relative w-full aspect-[16/9] mt-4 shadow-lg">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="w-full h-auto"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-stone-900 text-xl mb-2">
                    {project.title}
                  </h3>
                  <p className="text-stone-600 mb-3 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-stone-200 text-stone-700 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
