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
    title: "Portfolio Website",
    description: "Personal portfolio showcasing projects and skills",
    image: "/portfolio.png",
    tags: ["Next.js 15", "TypeScript", "Tailwind CSS", "GSAP"],
    hasImage: true,
  },
  {
    id: 3,
    title: "Navinne Hospital Management System",
    description:
      "Full staff, Patient, and inventory management including POS for pharmacy",
    image: "",
    svg: "/svgs/navinne.png",
    tags: ["Next.js 13", "TypeScript", "MUI", "Redux"],
    hasImage: false,
  },
  {
    id: 4,
    title: "Rocell Stock App",
    description:
      "Mobile app for inventory stock check (integrated with zebra device scanners) for rocell bathware",
    image: "",
    svg: "/svgs/rocell.svg",
    tags: ["React Native", "TypeScript"],
    hasImage: false,
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
            }
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
          {secondaryProjects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => {
                projectRefs.current[index] = el;
              }}
              className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ${
                project.hasImage || project.svg ? "overflow-hidden" : "p-6"
              }`}
            >
              {project.hasImage ? (
                <div className="relative w-full aspect-[16/8] mt-4 shadow-lg">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className=" w-full h-auto"
                  />
                </div>
              ) : project.svg ? (
                <div className="flex justify-center items-center w-full h-32 bg-stone-200 shadow-lg">
                  <Image
                    src={project.svg}
                    alt={`${project.title} logo`}
                    width={200}
                    height={200}
                    className="opacity-80 h-24 w-24"
                  />
                </div>
              ) : null}
              <div className={project.hasImage || project.svg ? "p-4" : ""}>
                <h3
                  className={`font-bold text-stone-900 mb-2 ${
                    project.hasImage || project.svg ? "text-xl" : "text-lg"
                  }`}
                >
                  {project.title}
                </h3>
                <p className="text-stone-600 mb-3 text-sm">
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
