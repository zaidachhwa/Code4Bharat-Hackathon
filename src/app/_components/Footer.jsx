"use client";
import { Trophy, Clock, Users, Award, MessageCircle, Link2, Linkedin, Twitter, Instagram, Rocket } from "lucide-react";
import Link from "next/link";

export default function Footer({ scrollToSection, NAV_SECTIONS }) {
  return (
    <footer className="mt-8 border-t border-slate-200 bg-white/90 backdrop-blur">
      <div className="h-1 w-full bg-gradient-to-r from-indigo-600 via-sky-500 to-violet-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid md:grid-cols-4 gap-10 mb-8">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md">
                🇮🇳
              </div>
              <div>
                <h3 className="text-xl font-extrabold">CODE4BHARAT</h3>
                <p className="text-xs text-slate-500">National Hackathon 2026 · Solo Edition</p>
              </div>
            </div>

            <p className="text-sm text-slate-600 mb-4 max-w-md">
              A focused 6-hour solo hackathon designed to help you ship a real project and compete with great minds across India.
            </p>

            <div className="flex gap-2">
              {[MessageCircle, Link2, Linkedin, Twitter, Instagram].map((Icon, index) => (
                <button key={index} className="w-9 h-9 rounded-full bg-slate-100 border p-2 hover:bg-indigo-50 hover:text-indigo-700 transition">
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>

          {/* Event Snapshot */}
          <div>
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Trophy size={16} className="text-indigo-600" /> Event Snapshot
            </h3>

            <div className="space-y-2 text-sm text-slate-600">
              {[ 
                { icon: <Clock size={16} className="text-indigo-600" />, label: "6-Hour Sprint" },
                { icon: <Users size={16} className="text-sky-600" />, label: "Solo Hackathon" },
                { icon: <Award size={16} className="text-amber-600" />, label: "Gifts & Certificates" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 border p-2 rounded-lg bg-slate-50">
                  {item.icon}
                  <p className="text-sm font-medium">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-slate-600 mb-4">
              {NAV_SECTIONS.map((id) => (
                <li key={id}>
                  <button
                    onClick={() => scrollToSection(id)}
                    className="hover:text-indigo-700 transition inline-flex gap-1"
                  >
                    → {id === "terms" ? "Terms & Conditions" : id.charAt(0).toUpperCase() + id.slice(1)}
                  </button>
                </li>
              ))}
            </ul>

            <button
              onClick={() => scrollToSection("submission")}
              className="bg-indigo-600 text-white px-4 py-2 rounded-full text-xs font-semibold hover:bg-indigo-700 transition"
            >
              <Rocket size={16} className="inline-block mr-1" /> Register Now
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t pt-4 text-xs text-slate-500 flex flex-wrap justify-between items-center">
          <p>© 2026 CODE4BHARAT • All Rights Reserved</p>

          <button
            onClick={() => scrollToSection("terms")}
            className="text-indigo-700 hover:underline"
          >
            Terms & Privacy
          </button>
        </div>
      </div>
    </footer>
  );
}
