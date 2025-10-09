"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const secondaryProjects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with payment integration",
    image: "/project1.png",
    tags: ["React", "Node.js", "Stripe"],
  },
  {
    id: 2,
    title: "Analytics Dashboard",
    description: "Real-time data visualization and reporting tool",
    image: "/project2.png",
    tags: ["Next.js", "D3.js", "PostgreSQL"],
  },
  {
    id: 3,
    title: "Social Media App",
    description: "Mobile-first social networking platform",
    image: "/project3.png",
    tags: ["React Native", "Firebase", "Redux"],
  },
  {
    id: 4,
    title: "Task Management",
    description: "Collaborative project management tool",
    image: "/project4.png",
    tags: ["TypeScript", "Express", "MongoDB"],
  },
];

export default function SecondaryProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate project cards on scroll
      projectRefs.current.forEach((project, index) => {
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {secondaryProjects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => {
                projectRefs.current[index] = el;
              }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="relative w-full h-64">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-stone-900 mb-3">
                  {project.title}
                </h3>
                <p className="text-stone-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-stone-200 text-stone-700 rounded-full text-sm"
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
