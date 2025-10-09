"use client";

import { useEffect } from "react";
import { Code, Palette, Smartphone } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ArrowDown from "./ArrowDown";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
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
        "#about-header",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#about",
            start: "top 80%",
            end: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate skills cards
      [0, 1, 2].forEach((index) => {
        gsap.fromTo(
          `#skill-card-${index}`,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "#about",
              start: "20% 80%",
              end: "20% 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Pin skills section for 200vh (100vh expand + 100vh experience)
      ScrollTrigger.create({
        trigger: "#about",
        start: "22% top",
        end: `+=${window.innerHeight * 2}`,
        pin: "#skills-container",
        pinSpacing: true,
      });

      // Expand all cards at once when scrolling starts
      [0, 1, 2].forEach((index) => {
        gsap.to(`#skill-description-${index}`, {
          height: "auto",
          opacity: 1,
          duration: 0.8,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: "#about",
            start: "15% top",
            end: "15% top",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Show tech icons when expanding
      [0, 1, 2].forEach((index) => {
        gsap.to(`#skill-tech-icons-${index}`, {
          height: "auto",
          opacity: 1,
          duration: 0.8,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: "#about",
            start: "15% top",
            end: "15% top",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Scale up icons when expanding
      [0, 1, 2].forEach((index) => {
        gsap.to(`#skill-icon-${index}`, {
          scale: 1.5,
          marginBottom: "2rem",
          duration: 0.6,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: "#about",
            start: "15% top",
            end: "15% top",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Fade out 2nd and 3rd cards
      [1, 2].forEach((index) => {
        gsap.fromTo(
          `#skill-card-${index}`,
          {
            opacity: 1,
            y: 0,
          },
          {
            opacity: 0,
            y: -500,
            duration: 1.5,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: "#about",
              start: "40% top",
              end: "40% top",
              toggleActions: "play none reverse none",
            },
          }
        );
      });

      // Fade in experience card from bottom
      gsap.fromTo(
        "#experience-card",
        { opacity: 0, y: 500 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: "#about",
            start: "40% top",
            end: "40% top",
            toggleActions: "play none reverse none",
          },
        }
      );

      // Animate SVG paths drawing
      const paths = document.querySelectorAll("#experience-icon .draw-path");
      paths.forEach((path, index) => {
        const length = (path as SVGPathElement).getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.6,
          delay: index * 0.1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: "#about",
            start: "40% top",
            end: "40% top",
            toggleActions: "play none reverse none",
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="pt-20 relative">
      <div className="container mx-auto px-4 mt-8">
        <div id="about-header" className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About Me
          </h2>
          <p className="text-xl text-stone-300 max-w-3xl mx-auto">
            I&apos;m a passionate frontend developer with expertise in React and
            Next.js. I love creating intuitive user experiences and building
            scalable web applications.
          </p>
        </div>
        <div id="skills-container" className="h-[100vh]">
          <div className="grid md:grid-cols-3 gap-8 relative">
            {skills.map((skill, index) => (
              <div
                key={skill.title}
                id={`skill-card-${index}`}
                className="text-center p-6 rounded-lg bg-stone-900/50 hover:bg-stone-900/70 transition-colors border border-stone-700/50 overflow-hidden min-h-[500px]"
              >
                <div id={`skill-icon-${index}`} className="my-4">
                  <skill.icon className="w-12 h-12 text-stone-300 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {skill.title}
                </h3>
                <p className="text-stone-400 mb-4">{skill.description}</p>
                <div
                  id={`skill-tech-icons-${index}`}
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
                  id={`skill-description-${index}`}
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

            {/* Experience Card */}
            <div
              id="experience-card"
              className="absolute top-0 md:left-[calc(33.33%+1rem)] right-0 md:right-0 opacity-0 p-8 min-h-[500px] rounded-lg bg-stone-900/50 hover:bg-stone-900/70 transition-colors border border-stone-600/50"
            >
              <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-4">
                <svg
                  id="experience-icon"
                  className="w-16 h-16"
                  viewBox="10 13 20 14"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                >
                  <path
                    className="draw-path"
                    d="M19.5,20.5H15c-0.3,0-0.5-0.2-0.5-0.5s0.2-0.5,0.5-0.5h4.5c0.3,0,0.5,0.2,0.5,0.5S19.8,20.5,19.5,20.5z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    className="draw-path"
                    d="M19.5,18H15c-0.3,0-0.5-0.2-0.5-0.5S14.7,17,15,17h4.5c0.3,0,0.5,0.2,0.5,0.5S19.8,18,19.5,18z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    className="draw-path"
                    d="M27,26H13c-0.8,0-1.5-0.7-1.5-1.5v-9c0-0.8,0.7-1.5,1.5-1.5h14c0.8,0,1.5,0.7,1.5,1.5v9 C28.5,25.3,27.8,26,27,26z M13,15c-0.3,0-0.5,0.2-0.5,0.5v9c0,0.3,0.2,0.5,0.5,0.5h14c0.3,0,0.5-0.2,0.5-0.5v-9 c0-0.3-0.2-0.5-0.5-0.5H13z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    className="draw-path"
                    d="M25,23H15c-0.3,0-0.5-0.2-0.5-0.5S14.7,22,15,22h10c0.3,0,0.5,0.2,0.5,0.5S25.3,23,25,23z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    className="draw-path"
                    d="M25,20.8h-2.6c-0.3,0-0.5-0.2-0.5-0.5v-3c0-0.3,0.2-0.5,0.5-0.5H25c0.3,0,0.5,0.2,0.5,0.5v3 C25.5,20.6,25.3,20.8,25,20.8z M22.9,19.8h1.6v-2h-1.6V19.8z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Work Experience
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <h4 className="text-xl font-semibold text-stone-200">
                    Frontend Developer
                  </h4>
                  <span className="text-stone-400 text-sm">
                    April 2023 – Present
                  </span>
                </div>
                <p className="text-lg text-stone-300 font-medium">
                  PhraseCode (PVT) Ltd.
                </p>
                <ul className="space-y-3 text-stone-300 list-disc list-inside ">
                  <li className="leading-relaxed">
                    One of the founding members contributing to the
                    company&apos;s growth by taking leadership of front-end web
                    development and collaborating closely with the backend
                    engineering team to deliver scalable, high-quality,
                    end-to-end solutions.
                  </li>
                  <li className="leading-relaxed">
                    Developed and maintained responsive web applications using
                    Next.js and React.js.
                  </li>
                  <li className="leading-relaxed">
                    Utilized REST APIs and WebSockets to optimize front-end
                    performance.
                  </li>
                  <li className="leading-relaxed">
                    Hands-on experience in developing cross-platform mobile
                    applications using React Native.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <ArrowDown className="w-64 h-64 text-stone-400" />
          </div>
        </div>
      </div>
      <div className="h-[40px] bg-[#605b4b] rounded-t-3xl"></div>
    </section>
  );
}
