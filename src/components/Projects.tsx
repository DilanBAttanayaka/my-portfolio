"use client";

import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import MaskedText from "./MaskedText";

gsap.registerPlugin(ScrollTrigger);

const workContent = {
  projects: [
    {
      number: "01",
      title: "Bean Empire",
      slug: "bean-empire",
      description:
        "Full-stack e-commerce platform for premium coffee business in Sri Lanka",
      buttonText: "View Details",
      image: { alt: "Bean Empire E-commerce Platform" },
    },
    {
      number: "02",
      title: "Cafe Finder",
      slug: "cafe-finder",
      description:
        "Modern web application for discovering and reviewing coffee shops",
      buttonText: "View Details",
      image: { alt: "Cafe Finder Application" },
    },
    {
      number: "03",
      title: "AI Content Writer",
      slug: "ai-content-writer",
      description:
        "AI-powered SEO content generation and optimization platform",
      buttonText: "View Details",
      image: { alt: "AI Content Writer Platform" },
    },
    {
      number: "04",
      title: "Twost",
      slug: "twost",
      description: "Food delivery order management system for restaurants",
      buttonText: "View Details",
      image: { alt: "Twost Order Management System" },
    },
  ],
};

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement[]>([]);
  const [isClient, setIsClient] = useState(false);
  const starRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useLayoutEffect(() => {
    if (!isClient) return;

    const initGSAP = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        // Set initial states for all images except the first one
        gsap.set(["#image-2", "#image-3", "#image-4"], {
          clipPath: "inset(100% 0 0 0)",
        });

        // Main timeline for pinning
        gsap.timeline({
          scrollTrigger: {
            trigger: "#work-container",
            start: "top top",
            end: "+=300%",
            pin: true,
            scrub: 1,
          },
        });

        // Pin the image container for the full duration
        gsap.timeline({
          scrollTrigger: {
            trigger: "#work-section",
            start: "top top",
            end: "+=300%",
            pin: "#work-image",
            pinSpacing: false,
            scrub: 1,
          },
        });

        // Color transitions
        gsap
          .timeline({
            scrollTrigger: {
              trigger: "#work-content",
              start: "18% center",
              end: "28% center",
              scrub: 1,
            },
          })
          .to("#work-content", {
            backgroundColor: "#0c2f25",
            duration: 1,
          });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: "#work-content",
              start: "43% center",
              end: "53% center",
              scrub: 1,
            },
          })
          .to("#work-content", {
            backgroundColor: "#11122f",
            duration: 1,
          });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: "#work-content",
              start: "68% center",
              end: "78% center",
              scrub: 1,
            },
          })
          .to("#work-content", {
            backgroundColor: "#1c1917",
            duration: 1,
          });

        // Image transitions
        gsap
          .timeline({
            scrollTrigger: {
              trigger: "#work-content",
              start: "18% center",
              end: "28% center",
              scrub: 1,
            },
          })
          .to("#image-2", {
            clipPath: "inset(0% 0 0 0)",
            duration: 1,
            ease: "none",
          });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: "#work-content",
              start: "43% center",
              end: "53% center",
              scrub: 1,
            },
          })
          .to("#image-3", {
            clipPath: "inset(0% 0 0 0)",
            duration: 1,
            ease: "none",
          });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: "#work-content",
              start: "68% center",
              end: "78% center",
              scrub: 1,
            },
          })
          .to("#image-4", {
            clipPath: "inset(0% 0 0 0)",
            duration: 1,
            ease: "none",
          });

        // Continuous star rotation
        starRefs.current.forEach((star) => {
          if (star) {
            gsap.to(star, {
              rotation: 360,
              duration: 3,
              repeat: -1,
              ease: "linear",
            });
          }
        });
      });

      return () => ctx.revert();
    };

    initGSAP();
  }, [isClient]);

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

  return (
    <section ref={sectionRef} id="projects" className="bg-[#605b4b] pt-10">
      <div className="relative">
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Featured Projects
          </h2>
          <p className="text-xl text-stone-300 max-w-3xl mx-auto">
            Here are some of my recent projects that showcase my skills and
            experience.
          </p>
        </div>

        {/* Work Section with Scroll Animation */}
        <div
          id="work-section"
          className="relative h-[400vh] mt-16 overflow-hidden z-20 rounded-b-3xl"
        >
          {/* Fixed background container */}
          <div className="absolute top-0 left-0 right-0 h-screen z-0">
            <div
              id="work-container"
              style={{ backgroundColor: "#605b4b" }}
              className="h-screen transition-colors duration-500"
            />
          </div>
          <div
            id="work-image"
            className="absolute top-0 w-full sm:w-[50%] h-screen right-0 z-[20] flex justify-center items-center"
          >
            <div className="aspect-[2573/1699] w-[424px] sm:w-[494px] md:w-[636px] h-[280px] sm:h-[326px] md:h-[420px] overflow-hidden rounded-[48px] shadow-xl relative mx-auto sm:mr-[5%] md:mr-[20%]">
              <Image
                src="/project1.png"
                alt={workContent.projects[0].image.alt}
                width={680}
                height={449}
                className="object-cover w-full h-full absolute top-0 left-0"
                id="image-1"
                priority
              />
              <Image
                src="/project2.png"
                alt={workContent.projects[1].image.alt}
                width={680}
                height={449}
                className="object-cover w-full h-full absolute top-0 left-0"
                id="image-2"
                priority
              />
              <Image
                src="/project3.png"
                alt={workContent.projects[2].image.alt}
                width={680}
                height={449}
                className="object-cover w-full h-full absolute top-0 left-0"
                id="image-3"
                priority
              />
              <Image
                src="/project4.png"
                alt={workContent.projects[3].image.alt}
                width={680}
                height={449}
                className="object-cover w-full h-full absolute top-0 left-0"
                id="image-4"
                priority
              />
            </div>
          </div>

          {/* Scrolling content */}
          <div
            id="work-content"
            className="absolute top-0 left-0 right-0 h-[400vh]"
          ></div>
          <div
            id="work-content-old"
            className="absolute flex flex-col justify-center items-center sm:block top-0 left-0 sm:pl-10 right-0 h-[400vh] z-20 bg-black/40 sm:bg-transparent"
          >
            {workContent.projects.map((project, index) => (
              <div
                key={index}
                className="flex items-center h-screen w-full sm:w-[50%] justify-center z-100"
              >
                <div className="flex flex-col gap-4 items-start max-w-md">
                  <div className="flex gap-2 items-center justify-center">
                    <div
                      ref={(el) => {
                        if (el && !starRefs.current.includes(el)) {
                          starRefs.current[index] = el;
                        }
                      }}
                      className="relative w-6 h-6"
                    >
                      <Image
                        src="/svgs/star.svg"
                        alt="Star"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className="text-white text-md">
                      {project.number} Project
                    </p>
                  </div>
                  <h2 className="md:text-5xl text-3xl font-bold text-white">
                    {project.title}
                  </h2>
                  <p className="text-white/80 text-lg lg:text-xl">
                    {project.description}
                  </p>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="px-6 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-black transition-colors"
                  >
                    {project.buttonText || "View"}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute left-0 bottom-0 w-full z-10 ">
          <MaskedText />
        </div>
      </div>
    </section>
  );
}
