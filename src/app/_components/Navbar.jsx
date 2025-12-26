"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, Rocket, ChevronDown } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [participateDropdownOpen, setParticipateDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);
  const participateDropdownRef = useRef(null);

  const NAV_SECTIONS = [
    "about",
    "domains",
    "timeline",
    "rules",
    "prizes",
    "FAQ",
  ];

  useEffect(() => {
    if (pathname !== "/") return;

    const hash = window.location.hash.replace("#", "");
    if (!hash) return;

    const timeout = setTimeout(() => {
      const el = document.getElementById(hash);
      if (!el) return;

      const navbarHeight = 80;
      const top =
        el.getBoundingClientRect().top + window.scrollY - navbarHeight;

      window.scrollTo({ top, behavior: "smooth" });
    }, 100);

    return () => clearTimeout(timeout);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const scrollPos = window.scrollY + 100;
      let currentSection = "";

      NAV_SECTIONS.forEach((section) => {
        const el = document.getElementById(section);
        if (el && el.offsetTop <= scrollPos) {
          currentSection = section;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (participateDropdownRef.current && !participateDropdownRef.current.contains(e.target)) {
        setParticipateDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);

    if (pathname === "/") {
      const el = document.getElementById(id);
      if (!el) return;

      const navbarHeight = 80;
      const top =
        el.getBoundingClientRect().top + window.scrollY - navbarHeight;

      window.scrollTo({ top, behavior: "smooth" });
    } else {
      router.push(`/#${id}`);
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
            <Link href="/" className="relative w-55 h-11 flex items-center">
              <img
                src={
                  "https://education.code4bharat.com/_next/image?url=%2F18.jpeg&w=640&q=75"
                }
                alt="logo"
                className="rounded-xl cursor-pointer"
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="cursor-pointer hidden md:flex items-center gap-6 text-sm font-medium">
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

            {/* Ambassador Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="px-5 py-2.5 rounded-full bg-white border border-indigo-300 text-indigo-700 hover:bg-indigo-50 transition flex items-center gap-2"
              >
                Ambassador
                <ChevronDown
                  size={15}
                  className={`${
                    dropdownOpen ? "rotate-180" : ""
                  } transition-transform`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white border border-gray-200 shadow-lg rounded-xl w-44 py-2 z-[9999]">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDropdownOpen(false);
                      router.push("/ambassador-register");
                    }}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-indigo-50"
                  >
                    Register
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDropdownOpen(false);
                      router.push("/ambassador-login");
                    }}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-indigo-50"
                  >
                    Login
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Participate Dropdown */}
            <div className="hidden sm:block relative" ref={participateDropdownRef}>
              <button
                onClick={() => setParticipateDropdownOpen(!participateDropdownOpen)}
                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg hover:bg-indigo-700 transition"
              >
                <Rocket size={16} /> Participate
                <ChevronDown
                  size={15}
                  className={`${
                    participateDropdownOpen ? "rotate-180" : ""
                  } transition-transform`}
                />
              </button>

              {participateDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white border border-gray-200 shadow-lg rounded-xl w-44 py-2 z-[9999]">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setParticipateDropdownOpen(false);
                      router.push("/register");
                    }}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-indigo-50"
                  >
                    Register
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setParticipateDropdownOpen(false);
                      window.location.href = "https://hackathon.code4bharat.com/login";
                    }}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-indigo-50"
                  >
                    Go to Hackathon Dashboard
                  </button>
                </div>
              )}
            </div>

            {/* Mobile toggle */}
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
          mobileMenuOpen ? "max-h-[500px]" : "max-h-0"
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

          {/* Mobile Ambassador Dropdown */}
          <details className="mt-2 border border-indigo-300 rounded-lg p-2">
            <summary className="cursor-pointer font-semibold text-indigo-700">
              Ambassador
            </summary>

            <div className="mt-2 flex flex-col gap-1">
              <Link
                href="/ambassador-register"
                className="px-3 py-2 rounded-md bg-gray-50"
              >
                Register
              </Link>
              <Link
                href="/ambassador-login"
                className="px-3 py-2 rounded-md bg-gray-50"
              >
                Login
              </Link>
            </div>
          </details>

          {/* Mobile Participate Dropdown */}
          <details className="mt-2 border border-indigo-600 rounded-lg p-2 bg-indigo-50">
            <summary className="cursor-pointer font-semibold text-indigo-700 flex items-center gap-2">
              <Rocket size={16} /> Participate
            </summary>

            <div className="mt-2 flex flex-col gap-1">
              <Link
                href="/register"
                className="px-3 py-2 rounded-md bg-white"
              >
                Register
              </Link>
              <a
                href="https://hackathon.code4bharat.com/login"
                className="px-3 py-2 rounded-md bg-white"
              >
                Go to Hackathon Dashboard
              </a>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
