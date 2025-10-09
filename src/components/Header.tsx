"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-transparent border-transparent"
          : "bg-stone-900/90 backdrop-blur-sm border-b border-stone-700/50"
      }`}
    >
      <nav
        className={`container mx-auto px-4 transition-all ${
          isScrolled ? "py-2" : "py-4"
        }`}
      >
        <div className="flex justify-between items-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={64}
            height={32}
            className={`transition-opacity duration-300 ${
              isScrolled ? "opacity-0" : "opacity-100"
            }`}
          />

          {/* Desktop Navigation - Hidden when scrolled */}
          {!isScrolled && (
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-stone-300 hover:text-white transition-all duration-300 ease-in-out hover:scale-105"
                >
                  {item.name}
                </a>
              ))}
            </div>
          )}

          {/* Menu Button - Shows on mobile always, on desktop when scrolled */}
          <button
            className={`text-white transition-all duration-300 ease-in-out hover:scale-110 active:scale-95 ${
              isScrolled
                ? "bg-stone-900/90 backdrop-blur-sm px-2 py-1.5 rounded-md"
                : "md:hidden"
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="transition-transform duration-300 ease-in-out">
              {isScrolled ? (
                isMenuOpen ? (
                  <X size={20} className="rotate-90" />
                ) : (
                  <Menu size={20} />
                )
              ) : isMenuOpen ? (
                <X size={24} className="rotate-90" />
              ) : (
                <Menu size={24} />
              )}
            </div>
          </button>
        </div>

        {/* Dropdown Navigation */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "max-h-96 opacity-100 mt-4 pb-4"
              : "max-h-0 opacity-0 mt-0 pb-0"
          }`}
        >
          <div
            className={`flex ${
              isScrolled
                ? "flex-row flex-wrap gap-2 justify-end"
                : "flex-col space-y-4 md:hidden"
            }`}
          >
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                style={{
                  transitionDelay: isMenuOpen ? `${index * 50}ms` : "0ms",
                }}
                className={`text-stone-300 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105 ${
                  isScrolled
                    ? "bg-stone-900/90 backdrop-blur-sm px-3 py-1.5 rounded-md text-sm"
                    : ""
                } ${
                  isMenuOpen
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-2 opacity-0"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
