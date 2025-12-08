"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Rocket } from "lucide-react";

export default function Navbar({ scrollToSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const NAV_SECTIONS = ["about", "domains", "timeline", "rules", "prizes", "faq"];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            <div className="relative w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg">
              <img
                src="https://education.code4bharat.com/_next/image?url=%2F18.jpeg&w=640&q=75"
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
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">


            <Link
              href="/ambassador-register"
              className="px-5 py-2.5 rounded-full bg-white border border-indigo-300 text-indigo-700 hover:bg-indigo-50 transition"
            >
              Ambassador Register
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/register"
              className="hidden sm:inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg hover:bg-indigo-700"
            >
              <Rocket size={16} /> Register Now
            </Link>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-slate-700 p-2"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 shadow-sm">
          <div className="px-4 py-3 flex flex-col gap-2">
          
            <Link
              href="/register"
              className="mt-2 flex items-center justify-center gap-2 bg-indigo-600 text-white px-3 py-2.5 rounded-full text-sm font-semibold hover:bg-indigo-700"
            >
              <Rocket size={16} /> Register Now
            </Link>

            <Link
              href="/ambassador-register"
              className="flex items-center justify-center bg-white border border-indigo-300 text-indigo-700 px-3 py-2.5 rounded-full text-sm font-semibold hover:bg-indigo-50"
            >
              Ambassador Register
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
