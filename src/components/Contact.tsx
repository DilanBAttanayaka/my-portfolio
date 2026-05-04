"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { sendEmail } from "@/app/actions/sendEmail";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const contactInfo = [
    {
      icon: Mail,
      text: "your.email@example.com",
      href: "mailto:your.email@example.com",
    },
    { icon: Phone, text: "+1 (555) 123-4567", href: "tel:+15551234567" },
    { icon: MapPin, text: "Your City, Country", href: "#" },
  ];

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
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

      // Animate contact info
      gsap.fromTo(
        contactInfoRef.current,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contactInfoRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate form
      gsap.fromTo(
        formRef.current,
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (status === "loading") return;
    gsap.to(e.currentTarget, {
      scale: 1.02,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const handleButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, { scale: 1, duration: 0.2, ease: "power2.out" });
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (status === "loading") return;
    gsap.to(e.currentTarget, {
      scale: 0.98,
      duration: 0.1,
      ease: "power2.out",
    });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const result = await sendEmail(formData);

    if (result.error) {
      setStatus("error");
      setErrorMessage(result.error);
    } else {
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    }
  }

  return (
    <section ref={sectionRef} id="contact" className="py-20 bg-stone-900">
      <div className="container mx-auto px-4">
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Get In Touch
          </h2>
          <p className="text-xl text-stone-300 max-w-3xl mx-auto">
            I&apos;m always interested in new opportunities and exciting
            projects. Let&apos;s connect!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div ref={contactInfoRef}>
            <h3 className="text-2xl font-semibold text-white mb-6">
              Contact Information
            </h3>
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  className="flex items-center gap-4 text-stone-300 hover:text-white transition-colors"
                >
                  <info.icon className="w-5 h-5" />
                  <span>{info.text}</span>
                </a>
              ))}
            </div>

            <div className="mt-8">
              <h4 className="text-lg font-semibold text-white mb-4">
                Follow Me
              </h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="p-3 bg-neutral-800 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-stone-700/50"
                    aria-label={social.label}
                  >
                    <social.icon className="w-6 h-6 text-stone-300 hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div ref={formRef}>
            <form 
              onSubmit={handleSubmit}
              className="bg-neutral-800/50 p-8 rounded-lg shadow-lg border border-stone-700/50"
            >
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-stone-300 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-2 bg-stone-800 border border-stone-700/50 text-white rounded-lg focus:ring-2 focus:ring-stone-600 focus:border-transparent outline-none transition-all"
                    required
                    disabled={status === "loading"}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-stone-300 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 bg-stone-800 border border-stone-700/50 text-white rounded-lg focus:ring-2 focus:ring-stone-600 focus:border-transparent outline-none transition-all"
                    required
                    disabled={status === "loading"}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-stone-300 mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-2 bg-stone-800 border border-stone-700/50 text-white rounded-lg focus:ring-2 focus:ring-stone-600 focus:border-transparent outline-none transition-all"
                  required
                  disabled={status === "loading"}
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-stone-300 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-2 bg-stone-800 border border-stone-700/50 text-white rounded-lg focus:ring-2 focus:ring-stone-600 focus:border-transparent outline-none transition-all resize-none"
                  required
                  disabled={status === "loading"}
                />
              </div>

              {status === "success" && (
                <div className="mb-6 flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg animate-in fade-in slide-in-from-top-2">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm font-medium">Message sent successfully! I&apos;ll get back to you soon.</p>
                </div>
              )}

              {status === "error" && (
                <div className="mb-6 flex items-center gap-3 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-lg animate-in fade-in slide-in-from-top-2">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm font-medium">{errorMessage || "Something went wrong. Please try again."}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-stone-700 text-white py-3 px-6 rounded-lg hover:bg-stone-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                onMouseEnter={handleButtonHover}
                onMouseLeave={handleButtonLeave}
                onMouseDown={handleButtonClick}
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
