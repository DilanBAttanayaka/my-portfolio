"use client";

import { useEffect, useState } from "react";
import { Code, Palette, Smartphone } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ArrowDown from "./ArrowDown";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const [hoveredTech, setHoveredTech] = useState<{
    cardIndex: number;
    techIndex: number;
  } | null>(null);

  const skills = [
    {
      icon: Code,
      title: "Full-Stack Development",
      description: "Next.js, Node, Express, Prisma",
      techIcons: [
        {
          src: "/svgs/nextjs.svg",
          name: "Next.js",
          description:
            "Expertise in Server-side rendering (SSR), Static Site Generation (SSG), and the App Router for high-performance React applications.",
        },
        {
          src: "/svgs/react.svg",
          name: "React",
          description:
            "Proficient in building reusable components, custom hooks, and managing complex application logic with React 18/19.",
        },
        {
          src: "/svgs/nodejs.svg",
          name: "Node.js & Express",
          description:
            "Building fast, secure, and robust RESTful APIs and middleware architecture with Express.js.",
        },
        {
          src: "/svgs/postgresql.svg",
          name: "PostgreSQL & SQLite",
          description:
            "Designing relational databases, normalization, and handling data storage across SQLite and Postgres.",
        },
        {
          src: "/svgs/prisma.svg",
          name: "Prisma ORM",
          description:
            "Using type-safe database schemas, migrations, and relationships to fetch and manipulate database records easily.",
        },
      ],
      detailedDescription:
        "Architecting robust modern web applications end-to-end. Experienced in building responsive user interfaces combined with clean, efficient Node/Express backends, schema design, and seamless database migrations using Prisma.",
    },
    {
      icon: Palette,
      title: "UI & Styles",
      description: "CSS,Tailwind, Radix-ui, MUI, GSAP",
      techIcons: [
        {
          src: "/svgs/css.svg",
          name: "CSS",
          description:
            "Mastering CSS3 features like Grid, Flexbox, and Custom Properties for highly customized and pixel-perfect layouts.",
        },
        {
          src: "/svgs/tailwind.svg",
          name: "Tailwind CSS",
          description:
            "Rapidly crafting modern UIs with utility-first classes while maintaining a clean and scalable design system.",
        },
        {
          src: "/svgs/radixui.svg",
          name: "Radix-ui",
          description:
            "Building accessible, unstyled UI components that form the foundation of high-quality React design systems.",
        },
        {
          src: "/svgs/materialui.svg",
          name: "Material-ui",
          description:
            "Implementing complex, enterprise-ready interfaces using comprehensive Material Design component libraries.",
        },
      ],
      detailedDescription:
        "Crafting beautiful, intuitive user interfaces with Tailwind CSS. Creating smooth, engaging animations with GSAP and Framer Motion. Strong understanding of design principles, color theory, and user experience optimization.",
    },
    {
      icon: Smartphone,
      title: "Responsive Design",
      description: "Mobile-first approach",
      techIcons: [
        {
          src: "/svgs/mobile.svg",
          name: "Mobile",
          description:
            "Designing with a mobile-first mindset to ensure core functionality is prioritized for handheld device users.",
        },
        {
          src: "/svgs/rightarrow.svg",
          name: "Right",
          description:
            "Ensuring fluid layouts that adapt gracefully across all horizontal and vertical viewport changes.",
        },
        {
          src: "/svgs/screen.svg",
          name: "Screen",
          description:
            "Optimizing complex desktop layouts for large monitors, ensuring readability and efficient use of space.",
        },
      ],
      detailedDescription:
        "Designing and developing responsive applications that work seamlessly across all devices. Mobile-first methodology ensuring optimal performance on smartphones, tablets, and desktops. Focus on accessibility and cross-browser compatibility.",
    },
  ];

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Desktop Animations
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
        },
      );

      // Animate bio
      gsap.fromTo(
        "#about-bio",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#about",
            start: "top 75%",
            end: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
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
              trigger: "#trigger",
              start: "20% 80%",
              end: "20% 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      // Pin skills section for 200vh (100vh expand + 100vh experience)
      ScrollTrigger.create({
        trigger: "#trigger",
        start: "top top",
        end: `+=${window.innerHeight * 1.5}`,
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
            trigger: "#trigger",
            start: "top top",
            end: "top top",
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
            trigger: "#trigger",
            start: "5% top",
            end: "5% top",
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
            trigger: "#trigger",
            start: "12% top",
            end: "12% top",
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
              trigger: "#trigger",
              start: "30% top",
              end: "30% top",
              toggleActions: "play none reverse none",
            },
          },
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
            trigger: "#trigger",
            start: "30% top",
            end: "30% top",
            toggleActions: "play none reverse none",
          },
        },
      );

      // Animate SVG paths
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
            trigger: "#trigger",
            start: "25% top",
            toggleActions: "play none reverse none",
          },
        });
      });
    });

    mm.add("(max-width: 767px)", () => {
      // Mobile Animations
      // Simple entry for header and bio
      gsap.fromTo(
        "#about-header, #about-bio",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: "#about",
            start: "top 85%",
          },
        },
      );

      // Skills cards simple entry
      [0, 1, 2].forEach((index) => {
        gsap.fromTo(
          `#skill-card-${index}`,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: `#skill-card-${index}`,
              start: "top 90%",
            },
          },
        );

        // Auto-expand on mobile without pinning
        gsap.set(
          [`#skill-description-${index}`, `#skill-tech-icons-${index}`],
          {
            height: "auto",
            opacity: 1,
          },
        );
      });

      // Experience card simple entry
      gsap.fromTo(
        "#experience-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: "#experience-card",
            start: "top 90%",
          },
        },
      );

      // Still draw the icon paths on mobile
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
            trigger: "#experience-card",
            start: "top 80%",
          },
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="about" className="pt-20 relative">
      <div className="container mx-auto px-4 mt-8">
        <div id="about-header" className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About Me
          </h2>
          <p className="text-xl text-stone-300 max-w-3xl mx-auto">
            I&apos;m a passionate full-stack developer with a strong frontend
            focus. I build high-fidelity interfaces paired with modern, robust
            backends.
          </p>
          {/* Bio section */}
          <div
            id="about-bio"
            className="mt-16 grid md:grid-cols-2 gap-10 items-center opacity-0"
          >
            {/* Left — personal paragraph */}
            <div className="relative pl-5 border-l-2 border-blue-500/50">
              <p className="text-stone-300 text-lg leading-relaxed text-left">
                I&apos;m a full-stack developer with a frontend focus, dedicated
                to building applications that feel as good as they look. I
                joined{" "}
                <span className="text-white font-medium">PhraseCode</span> early
                as their{" "}
                <span className="text-white font-medium">
                  first dedicated frontend developer,
                </span>{" "}
                taking full ownership of the frontend from the ground up. I
                believe great frontend work lives at the intersection of{" "}
                <span className="text-white font-medium">
                  clean code and thoughtful design
                </span>{" "}
                — and that&apos;s the space I thrive in.
              </p>
            </div>

            {/* Right — quick-fact pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { value: "3+", label: "Years of Experience" },
                { value: "8+", label: "Production Projects" },
                { value: "2023", label: "Joined PhraseCode" },
                { value: "Full‑stack", label: "Frontend-Heavy Focus" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-stone-800/60 border border-stone-700/50 rounded-xl px-5 py-4 hover:border-blue-500/30 hover:bg-stone-800 transition-all duration-300 group"
                >
                  <p className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
                    {stat.value}
                  </p>
                  <p className="text-stone-400 text-sm mt-1 leading-snug">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div id="trigger" className="pt-10">
          <div id="skills-container" className="h-auto md:h-[100vh]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {skills.map((skill, index) => (
                <div
                  key={skill.title}
                  id={`skill-card-${index}`}
                  className="text-center p-6 rounded-lg bg-stone-900/50 hover:bg-stone-900/70 transition-colors border border-stone-700/50 overflow-hidden"
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
                    {skill.techIcons.map((techIcon, techIdx) => (
                      <div
                        key={techIcon.name}
                        className={`relative w-8 h-8 opacity-70 hover:opacity-100 transition-all duration-300 cursor-pointer hover:scale-110 ${
                          hoveredTech?.cardIndex === index &&
                          hoveredTech?.techIndex === techIdx
                            ? "opacity-100 scale-110"
                            : ""
                        }`}
                        title={techIcon.name}
                        onMouseEnter={() =>
                          setHoveredTech({
                            cardIndex: index,
                            techIndex: techIdx,
                          })
                        }
                        onMouseLeave={() => setHoveredTech(null)}
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
                    <div className="pt-4 border-t border-stone-700/50 relative min-h-[100px]">
                      <div
                        className={`transition-all duration-300 ease-in-out ${
                          hoveredTech?.cardIndex === index
                            ? "opacity-0 scale-95"
                            : "opacity-100 scale-100"
                        }`}
                      >
                        <p className="text-stone-300 text-base md:text-lg leading-relaxed">
                          {skill.detailedDescription}
                        </p>
                      </div>
                      {skill.techIcons.map((techIcon, techIdx) => (
                        <div
                          key={techIdx}
                          className={`absolute inset-0 pt-4 transition-all duration-300 ease-in-out flex flex-col items-center justify-center ${
                            hoveredTech?.cardIndex === index &&
                            hoveredTech?.techIndex === techIdx
                              ? "opacity-100 scale-100"
                              : "opacity-0 scale-95 pointer-events-none"
                          }`}
                        >
                          <p className="text-blue-400 font-semibold text-sm uppercase tracking-wider mb-1">
                            {techIcon.name}
                          </p>
                          <p className="text-stone-200 text-base md:text-lg leading-relaxed text-center">
                            {(techIcon as any).description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {/* Experience Card */}
              <div
                id="experience-card"
                className="relative md:absolute top-0 md:left-[calc(33.33%+1rem)] right-0 md:right-0 opacity-0 p-6 md:p-8 min-h-[430px] rounded-lg bg-stone-900/50 hover:bg-stone-900/70 transition-colors border border-stone-600/50"
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
                      Full-Stack / Frontend Developer
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
                      One of the founding members contributing significantly to
                      company growth by leading development of user interfaces
                      and web APIs, collaborating closely with engineering teams
                      to design schemas and deliver scalable, high-quality,
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
            <div className="flex justify-center mt-12 md:mt-0">
              <ArrowDown className="w-32 h-32 md:w-64 md:h-64 text-stone-400" />
            </div>
          </div>
        </div>
      </div>
      <div className="h-[40px] bg-[#605b4b] rounded-t-3xl"></div>
    </section>
  );
}
