"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "JavaScript", level: 90 },
      { name: "HTML/CSS", level: 95 },
    ],
  },
  {
    title: "Styling & UI",
    skills: [
      { name: "Tailwind CSS", level: 85 },
      { name: "GSAP", level: 75 },
      { name: "CSS Modules", level: 80 },
      { name: "Styled Components", level: 70 },
    ],
  },
  {
    title: "Tools & Others",
    skills: [
      { name: "Git", level: 85 },
      { name: "Figma", level: 70 },
      { name: "Vercel", level: 80 },
      { name: "Netlify", level: 75 },
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement[]>([]);
  const progressBarsRef = useRef<HTMLDivElement[]>([]);

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

      // Animate categories
      categoriesRef.current.forEach((category, index) => {
        gsap.fromTo(
          category,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: category,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Animate progress bars
      progressBarsRef.current.forEach((bar, index) => {
        const level = parseInt(bar.dataset.level || "0");
        gsap.fromTo(
          bar,
          { width: 0 },
          {
            width: `${level}%`,
            duration: 1.5,
            delay: index * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bar.closest(".bg-gray-50"),
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

  const addCategoryToRefs = (el: HTMLDivElement | null) => {
    if (el && !categoriesRef.current.includes(el)) {
      categoriesRef.current.push(el);
    }
  };

  const addProgressBarToRefs = (el: HTMLDivElement | null) => {
    if (el && !progressBarsRef.current.includes(el)) {
      progressBarsRef.current.push(el);
    }
  };

  return (
    <section ref={sectionRef} id="skills" className="py-20 bg-stone-900">
      <div className="container mx-auto px-4">
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Skills & Technologies
          </h2>
          <p className="text-xl text-stone-300 max-w-3xl mx-auto">
            Here are the technologies and tools I work with to bring ideas to
            life.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              ref={addCategoryToRefs}
              className="bg-neutral-800/50 rounded-lg p-6 border border-stone-700/50"
            >
              <h3 className="text-2xl font-semibold text-white mb-6 text-center">
                {category.title}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-stone-300 font-medium">
                        {skill.name}
                      </span>
                      <span className="text-stone-400 text-sm">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-stone-800 rounded-full h-2">
                      <div
                        ref={addProgressBarToRefs}
                        data-level={skill.level}
                        className="bg-stone-600 h-2 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
