"use client";

import { useEffect, useRef } from "react";
import { ExternalLink, Github } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
}

const projects: Project[] = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution built with Next.js, featuring user authentication, payment processing, and admin dashboard.",
    image: "/api/placeholder/600/400",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates and drag-and-drop functionality.",
    image: "/api/placeholder/600/400",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    title: "Portfolio Website",
    description:
      "A responsive portfolio website showcasing projects and skills with smooth animations and modern design.",
    image: "/api/placeholder/600/400",
    technologies: ["Next.js", "GSAP", "Tailwind CSS"],
    githubUrl: "#",
    liveUrl: "#",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate project cards
      projectsRef.current.forEach((project, index) => {
        gsap.fromTo(
          project,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: project,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !projectsRef.current.includes(el)) {
      projectsRef.current.push(el);
    }
  };

  const handleProjectHover = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      y: -5,
      duration: 0.3,
      ease: "power2.out",
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    });
  };

  const handleProjectLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      y: 0,
      duration: 0.3,
      ease: "power2.out",
      boxShadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    });
  };

  return (
    <section ref={sectionRef} id="projects" className="py-20 bg-neutral-800">
      <div className="container mx-auto px-4">
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Featured Projects
          </h2>
          <p className="text-xl text-stone-300 max-w-3xl mx-auto">
            Here are some of my recent projects that showcase my skills and
            experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.title}
              ref={addToRefs}
              className="bg-stone-900/50 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-stone-700/50"
              onMouseEnter={handleProjectHover}
              onMouseLeave={handleProjectLeave}
            >
              <div className="h-48 bg-stone-800 flex items-center justify-center">
                <span className="text-stone-400">Project Image</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-stone-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-stone-800/70 text-stone-300 text-sm rounded-full border border-stone-700/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href={project.githubUrl}
                    className="flex items-center gap-2 text-stone-300 hover:text-white transition-colors"
                  >
                    <Github size={20} />
                    Code
                  </a>
                  <a
                    href={project.liveUrl}
                    className="flex items-center gap-2 text-stone-300 hover:text-white transition-colors"
                  >
                    <ExternalLink size={20} />
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
