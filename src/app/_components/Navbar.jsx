"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Rocket } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const NAV_SECTIONS = ["about", "domains", "timeline", "rules", "prizes", "faq"];

  // Handle scroll to add shadow to navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section
      const scrollPos = window.scrollY + 100; // offset for navbar height
      let currentSection = "";
      NAV_SECTIONS.forEach((section) => {
        const el = document.getElementById(section);
        if (el && el.offsetTop <= scrollPos) {
          currentSection = section;
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

 // Smooth scroll to section with offset for fixed navbar
const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) {
    const navbarHeight = 80; // adjust this to your navbar's actual height
    const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight;
    window.scrollTo({
      top,
      behavior: "smooth",
    });
    setMobileMenuOpen(false); // close mobile menu
  }
};

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-lg border-b border-slate-200 shadow-sm"
          : "bg-white/70 backdrop-blur-md border-b border-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative w-55 h-11 rounded-2xl flex items-center shadow-lg">
              <img
                src="/logo.png"
                alt="logo"
                className="rounded-xl"
              />
            </div>
            <div>
              <div className="text-lg md:text-xl font-extrabold tracking-tight">
                CODE4BHARAT
              </div>
              <div className="text-xs text-indigo-600 font-semibold">
                National Hackathon 2026
              </div>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {NAV_SECTIONS.map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`px-3 py-2 rounded-md transition-colors ${
                  activeSection === section
                    ? "text-indigo-600 font-semibold"
                    : "text-slate-700 hover:text-indigo-500"
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}

            <Link
              href="/ambassador-register"
              className="px-5 py-2.5 rounded-full bg-white border border-indigo-300 text-indigo-700 hover:bg-indigo-50 transition"
            >
              Ambassador Register
            </Link>
          </nav>

          {/* Actions & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/register"
              className="hidden sm:inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg hover:bg-indigo-700 transition"
            >
              <Rocket size={16} /> Register Now
            </Link>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-slate-700 p-2"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? "max-h-96" : "max-h-0"
        } bg-white border-t border-slate-200 shadow-sm`}
      >
        <div className="px-4 py-3 flex flex-col gap-2">
          {NAV_SECTIONS.map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                activeSection === section
                  ? "text-indigo-600 font-semibold"
                  : "text-slate-700 hover:text-indigo-500"
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}

          <Link
            href="/register"
            className="mt-2 flex items-center justify-center gap-2 bg-indigo-600 text-white px-3 py-2.5 rounded-full text-sm font-semibold hover:bg-indigo-700 transition"
          >
            <Rocket size={16} /> Register Now
          </Link>

          <Link
            href="/ambassador-register"
            className="flex items-center justify-center bg-white border border-indigo-300 text-indigo-700 px-3 py-2.5 rounded-full text-sm font-semibold hover:bg-indigo-50 transition"
          >
            Ambassador Register
          </Link>
        </div>
      </div>
    </header>
  );
}
