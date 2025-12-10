"use client";

import {
  Trophy,
  Clock,
  Users,
  Award,
  MessageCircle,
  Link2,
  Linkedin,
  Twitter,
  Instagram,
  Rocket,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Footer({ NAV_SECTIONS = [] }) {
  const router = useRouter();

  // Proper smooth scroll with navbar offset
  const scrollToSection = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (!el) return;

    const navbarHeight = 100; // adjust if your navbar height is different
    const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  };

  // fallback sections
  const SECTIONS =
    NAV_SECTIONS.length > 0
      ? NAV_SECTIONS.map((x) => x.toLowerCase())
      : ["about", "domains", "timeline", "rules", "prizes", "FAQ"];

  return (
    <footer className="mt-5 border-t border-slate-200 bg-white/90 backdrop-blur">
      <div className="h-10 w-full " />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-10 mb-10">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
 
              <div>
              <div className="relative w-65 h-11 flex items-center">
              <img
                src="/logo.png"
                alt="logo"
                className="rounded-xl"
              />
              </div>
                <p className="text-xs ml-15 text-slate-500">
                  National Hackathon 2026 · Solo Edition
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-600 mb-6 leading-relaxed max-w-md">
              A focused 6-hour solo hackathon designed to help you ship a real
              project end-to-end and compete with builders across India.
            </p>
          </div>

          {/* Snapshot */}
          <div>
            <h3 className="text-sm font-semibold mb-4 flex items-center gap-2 text-slate-900">
              <Trophy size={16} className="text-indigo-600" />
              Event Snapshot
            </h3>

            <div className="space-y-2 text-sm text-slate-600">
              {[
                { icon: <Clock size={16} className="text-indigo-600" />, label: "6-Hour Sprint" },
                { icon: <Users size={16} className="text-sky-600" />, label: "Solo Hackathon" },
                { icon: <Award size={16} className="text-amber-600" />, label: "Gifts & Certificates" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 border p-2 rounded-lg bg-slate-50 hover:bg-slate-100 transition"
                >
                  {item.icon}
                  <p className="text-sm font-medium">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2.5 text-sm text-slate-600 mb-6">
              {SECTIONS.map((id) => (
                <li key={id}>
                  <button
                    onClick={() => scrollToSection(id)}
                    className="hover:text-indigo-700 hover:translate-x-0.5 transition-all inline-flex items-center gap-1"
                  >
                    <span className="text-slate-400">→</span>
                    <span className="capitalize">{id}</span>
                  </button>
                </li>
              ))}
            </ul>

            <button
              onClick={() => scrollToSection("submission")}
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-full text-xs font-semibold shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition-all"
            >
              <Rocket className="w-4 h-4" />
              Register for Hackathon
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-200 pt-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-slate-500">
          <p>© 2026 CODE4BHARAT • All Rights Reserved</p>

          <div className="flex items-center gap-3 flex-wrap">
            <span>
              Hosted by{" "}
              <span className="font-semibold text-slate-700">
                CODE4BHARAT Team
              </span>
            </span>

            <span className="hidden sm:inline text-slate-300">|</span>

            <button
              onClick={() => router.push("/privacy")}
              className="text-indigo-700 hover:text-indigo-800 underline-offset-2 hover:underline"
            >
              Privacy Policy
            </button>

            <span className="hidden sm:inline text-slate-300">|</span>

            <button
              onClick={() => router.push("/terms")}
              className="text-indigo-700 hover:text-indigo-800 underline-offset-2 hover:underline"
            >
              Terms & Conditions
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
