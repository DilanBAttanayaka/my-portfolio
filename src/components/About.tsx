"use client";

import { useEffect, useRef } from "react";
import { Code, Palette, Smartphone } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement[]>([]);

  const skills = [
    {
      icon: Code,
      title: "Frontend Development",
      description: "React, Next.js, TypeScript",
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Tailwind CSS, GSAP",
    },
    {
      icon: Smartphone,
      title: "Responsive Design",
      description: "Mobile-first approach",
    },
  ];

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

      // Animate skills cards
      skillsRef.current.forEach((skill, index) => {
        gsap.fromTo(
          skill,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: skill,
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
    if (el && !skillsRef.current.includes(el)) {
      skillsRef.current.push(el);
    }
  };

  return (
    <section ref={sectionRef} id="about" className="py-20 relative h-screen">
      <div className="container mx-auto px-4">
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About Me
          </h2>
          <p className="text-xl text-stone-300 max-w-3xl mx-auto">
            I&apos;m a passionate frontend developer with expertise in React and
            Next.js. I love creating intuitive user experiences and building
            scalable web applications.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {skills.map((skill) => (
            <div
              key={skill.title}
              ref={addToRefs}
              className="text-center p-6 rounded-lg bg-stone-900/50 hover:bg-stone-900/70 transition-colors border border-stone-700/50"
            >
              <skill.icon className="w-12 h-12 text-stone-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                {skill.title}
              </h3>
              <p className="text-stone-400">{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
