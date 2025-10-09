"use client";

import { useEffect, useRef } from "react";
import { Code, Palette, Smartphone } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ArrowDown from "./ArrowDown";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement[]>([]);
  const skillsContainerRef = useRef<HTMLDivElement>(null);
  const descriptionRefs = useRef<HTMLDivElement[]>([]);
  const iconRefs = useRef<HTMLDivElement[]>([]);
  const techIconRefs = useRef<HTMLDivElement[]>([]);

  const skills = [
    {
      icon: Code,
      title: "Frontend Development",
      description: "React, Next.js, TypeScript",
      techIcons: [
        { src: "/svgs/typescript.svg", name: "TypeScript" },
        { src: "/svgs/react.svg", name: "React" },
        { src: "/svgs/nextjs.svg", name: "Next.js" },
        { src: "/svgs/redux.svg", name: "Redux" },
      ],
      detailedDescription:
        "Building modern, performant web applications using React and Next.js. Expert in TypeScript for type-safe code, state management with Redux, and creating reusable component libraries. Focused on clean code architecture and best practices.",
    },
    {
      icon: Palette,
      title: "UI & Styles",
      description: "CSS,Tailwind, Radix-ui, MUI, GSAP",
      techIcons: [
        { src: "/svgs/css.svg", name: "CSS" },
        { src: "/svgs/tailwind.svg", name: "Tailwind CSS" },
        { src: "/svgs/radixui.svg", name: "Radix-ui" },
        { src: "/svgs/materialui.svg", name: "Material-ui" },
      ],
      detailedDescription:
        "Crafting beautiful, intuitive user interfaces with Tailwind CSS. Creating smooth, engaging animations with GSAP and Framer Motion. Strong understanding of design principles, color theory, and user experience optimization.",
    },
    {
      icon: Smartphone,
      title: "Responsive Design",
      description: "Mobile-first approach",
      techIcons: [
        { src: "/svgs/mobile.svg", name: "Mobile" },
        { src: "/svgs/rightarrow.svg", name: "Right" },
        { src: "/svgs/screen.svg", name: "Screen" },
      ],
      detailedDescription:
        "Designing and developing responsive applications that work seamlessly across all devices. Mobile-first methodology ensuring optimal performance on smartphones, tablets, and desktops. Focus on accessibility and cross-browser compatibility.",
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

      // Pin skills section for extra 100vh
      ScrollTrigger.create({
        trigger: skillsContainerRef.current,
        start: "top top",
        end: `+=${window.innerHeight * 0.4}`,
        pin: true,
        pinSpacing: true,
      });

      // Expand all cards at once when scrolling starts
      descriptionRefs.current.forEach((desc) => {
        gsap.to(desc, {
          height: "auto",
          opacity: 1,
          duration: 0.8,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: skillsContainerRef.current,
            start: "top top",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Show tech icons when expanding
      techIconRefs.current.forEach((techIcon) => {
        gsap.to(techIcon, {
          height: "auto",
          opacity: 1,
          duration: 0.8,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: skillsContainerRef.current,
            start: "top top",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Scale up icons when expanding
      iconRefs.current.forEach((icon) => {
        gsap.to(icon, {
          scale: 1.5,
          marginBottom: "2rem",
          duration: 0.6,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: skillsContainerRef.current,
            start: "top top",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !skillsRef.current.includes(el)) {
      skillsRef.current.push(el);
    }
  };

  const addToDescRefs = (el: HTMLDivElement | null) => {
    if (el && !descriptionRefs.current.includes(el)) {
      descriptionRefs.current.push(el);
    }
  };

  const addToIconRefs = (el: HTMLDivElement | null) => {
    if (el && !iconRefs.current.includes(el)) {
      iconRefs.current.push(el);
    }
  };

  const addToTechIconRefs = (el: HTMLDivElement | null) => {
    if (el && !techIconRefs.current.includes(el)) {
      techIconRefs.current.push(el);
    }
  };

  return (
    <section ref={sectionRef} id="about" className="pt-20 relative">
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
        <div ref={skillsContainerRef} className="h-screen pt-20">
          <div className="grid md:grid-cols-3 gap-8  ">
            {skills.map((skill) => (
              <div
                key={skill.title}
                ref={addToRefs}
                className="text-center p-6 rounded-lg bg-stone-900/50 hover:bg-stone-900/70 transition-colors border border-stone-700/50 overflow-hidden"
              >
                <div ref={addToIconRefs} className="mb-4">
                  <skill.icon className="w-12 h-12 text-stone-300 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {skill.title}
                </h3>
                <p className="text-stone-400 mb-4">{skill.description}</p>
                <div
                  ref={addToTechIconRefs}
                  className="h-0 opacity-0 overflow-hidden flex justify-center gap-3 mb-4"
                >
                  {skill.techIcons.map((techIcon) => (
                    <div
                      key={techIcon.name}
                      className="relative w-8 h-8 opacity-70 hover:opacity-100 transition-opacity"
                      title={techIcon.name}
                    >
                      <Image
                        src={techIcon.src}
                        alt={techIcon.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ))}
                </div>
                <div
                  ref={addToDescRefs}
                  className="h-0 opacity-0 overflow-hidden"
                >
                  <div className="pt-4 border-t border-stone-700/50">
                    <p className="text-stone-300 text-base md:text-lg leading-relaxed">
                      {skill.detailedDescription}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-12">
            <ArrowDown className="w-64 h-64 text-stone-400" />
          </div>
        </div>
      </div>
      <div className="h-[40px] bg-[#605b4b] rounded-t-3xl"></div>
    </section>
  );
}
