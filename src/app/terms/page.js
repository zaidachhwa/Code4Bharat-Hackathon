"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Calendar,
  Clock,
  Globe,
  MessageCircle,
  Link2,
  Linkedin,
  Twitter,
  Instagram,
  Zap,
} from "lucide-react";

export default function TermsPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 relative overflow-x-hidden">
      {/* Techy background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        {/* Gradient blobs */}
        <div className="absolute -top-32 -left-10 w-80 h-80 bg-indigo-500/40 blur-3xl rounded-full" />
        <div className="absolute top-1/3 right-0 w-[420px] h-[420px] bg-sky-500/30 blur-3xl rounded-full" />
        <div className="absolute bottom-0 -left-10 w-[420px] h-[420px] bg-violet-500/30 blur-3xl rounded-full" />
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),_transparent_55%),_linear-gradient(90deg,_rgba(148,163,184,0.18)_1px,_transparent_1px),_linear-gradient(180deg,_rgba(148,163,184,0.18)_1px,_transparent_1px)] bg-[length:100%_100%,80px_80px,80px_80px] opacity-30 mix-blend-soft-light" />
      </div>

      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-slate-950/90 backdrop-blur-lg border-b border-slate-800 shadow-md shadow-slate-900/60"
            : "bg-slate-950/70 backdrop-blur-md border-b border-slate-800/70"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/40">
              🇮🇳
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-indigo-300">
                CODE4BHARAT
              </p>
              <p className="text-sm sm:text-base font-semibold text-slate-50">
                Terms &amp; Conditions
              </p>
            </div>
          </div>

          {/* Desktop actions */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/"
              className="text-xs sm:text-sm text-slate-300 hover:text-white transition-colors"
            >
              Back to main site
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-indigo-500 hover:bg-indigo-400 text-white text-xs sm:text-sm font-semibold px-4 py-2 shadow-md shadow-indigo-500/40 transition-colors"
            >
              <Zap className="w-4 h-4" />
              Join the Hackathon
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="sm:hidden p-2 rounded-lg text-slate-200 hover:bg-slate-800 transition-colors"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-md">
            <div className="px-4 py-3 flex flex-col gap-2 text-sm">
              <Link
                href="/"
                className="text-slate-200 hover:text-white hover:bg-slate-900 px-3 py-2 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Back to main site
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white px-3 py-2 rounded-full font-semibold transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Zap className="w-4 h-4" />
                Join the Hackathon
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="pt-24 sm:pt-28 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page heading */}
          <section className="mb-10 sm:mb-12">
            <p className="text-xs uppercase tracking-[0.18em] text-indigo-300 mb-2">
              Legal &amp; Participation
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-50 mb-3">
              Terms &amp; Conditions
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
              Please read these terms carefully before registering for the CODE4BHARAT
              Solo Hackathon. By registering and participating, you agree to the
              terms mentioned below.
            </p>
          </section>

          {/* Terms card */}
          <section className="rounded-3xl bg-slate-900/70 border border-slate-700/80 shadow-[0_18px_60px_rgba(15,23,42,0.9)] p-5 sm:p-7 md:p-8 backdrop-blur">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-[0.16em]">
                  Event
                </p>
                <p className="text-sm sm:text-base text-slate-100 font-semibold">
                  CODE4BHARAT — 6-Hour Solo Hackathon
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-[11px] sm:text-xs text-slate-300">
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-800 px-3 py-1 border border-slate-700">
                  <Calendar className="w-3.5 h-3.5 text-indigo-300" />
                  <span>6 February 2026</span>
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-800 px-3 py-1 border border-slate-700">
                  <Clock className="w-3.5 h-3.5 text-indigo-300" />
                  <span>6-hour duration</span>
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-800 px-3 py-1 border border-slate-700">
                  <Globe className="w-3.5 h-3.5 text-indigo-300" />
                  <span>Online • PAN India</span>
                </span>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-7 text-sm sm:text-base">
              {/* 1. Eligibility */}
              <section>
                <h2 className="text-base sm:text-lg font-semibold text-slate-50 mb-2">
                  1. Eligibility
                </h2>
                <ul className="list-disc list-inside space-y-1.5 text-slate-300">
                  <li>Participation is open to college students and early professionals.</li>
                  <li>You must register as an individual. This is a solo hackathon.</li>
                  <li>Participants must provide accurate personal and contact details.</li>
                  <li>
                    The organizing team reserves the right to verify eligibility at any time.
                  </li>
                </ul>
              </section>

              {/* 2. Registration & Participation */}
              <section>
                <h2 className="text-base sm:text-lg font-semibold text-slate-50 mb-2">
                  2. Registration &amp; Participation
                </h2>
                <ul className="list-disc list-inside space-y-1.5 text-slate-300">
                  <li>
                    By submitting the registration form, you confirm that the information
                    provided is correct and complete.
                  </li>
                  <li>
                    Each participant can register only once. Multiple registrations may
                    lead to disqualification.
                  </li>
                  <li>
                    Participation links, communication, and updates will be shared through
                    the email ID you provide during registration.
                  </li>
                  <li>
                    You are responsible for having a stable internet connection and required
                    hardware/software during the event.
                  </li>
                </ul>
              </section>

              {/* 3. Hackathon Format */}
              <section>
                <h2 className="text-base sm:text-lg font-semibold text-slate-50 mb-2">
                  3. Hackathon Format
                </h2>
                <ul className="list-disc list-inside space-y-1.5 text-slate-300">
                  <li>This is a 6-hour solo hackathon.</li>
                  <li>
                    All coding and implementation work should be done within the official
                    hackathon window.
                  </li>
                  <li>
                    You may use public documentation, libraries, and frameworks as long as
                    they are legally allowed and properly credited.
                  </li>
                </ul>
              </section>

              {/* 4. Code of Conduct */}
              <section>
                <h2 className="text-base sm:text-lg font-semibold text-slate-50 mb-2">
                  4. Code of Conduct
                </h2>
                <ul className="list-disc list-inside space-y-1.5 text-slate-300">
                  <li>Participants must maintain professionalism and respectful behavior.</li>
                  <li>
                    Harassment, abusive language, or any form of discrimination will not be
                    tolerated.
                  </li>
                  <li>
                    Any attempt to disrupt the event, platforms, or other participants may
                    result in immediate removal from the hackathon.
                  </li>
                </ul>
              </section>

              {/* 5. Project Ownership & Use */}
              <section>
                <h2 className="text-base sm:text-lg font-semibold text-slate-50 mb-2">
                  5. Project Ownership &amp; Usage
                </h2>
                <ul className="list-disc list-inside space-y-1.5 text-slate-300">
                  <li>
                    The intellectual property (IP) of the project you build remains with
                    you, unless otherwise explicitly agreed in writing.
                  </li>
                  <li>
                    By participating, you grant the organizers a non-exclusive right to
                    showcase your project (screenshots, description, demo) in event
                    promotions, social media, and case studies, with credit to you.
                  </li>
                  <li>
                    You are responsible for ensuring that your project does not infringe any
                    copyrights, trademarks, or third-party rights.
                  </li>
                </ul>
              </section>

              {/* 6. Prizes & Certificates */}
              <section>
                <h2 className="text-base sm:text-lg font-semibold text-slate-50 mb-2">
                  6. Prizes, Gifts &amp; Certificates
                </h2>
                <ul className="list-disc list-inside space-y-1.5 text-slate-300">
                  <li>
                    Prizes will be in the form of gifts. The exact nature of the gifts may
                    be updated and is at the discretion of the organizing team.
                  </li>
                  <li>
                    The first prize is a surprise gift and will be revealed at or after the
                    results announcement.
                  </li>
                  <li>
                    Participation certificates will be provided to the top 20 participants
                    based on evaluation criteria defined by the judges.
                  </li>
                  <li>
                    The decision of the judges and organizing team regarding winners and
                    rankings will be final and binding.
                  </li>
                </ul>
              </section>

              {/* 7. Data & Communication */}
              <section>
                <h2 className="text-base sm:text-lg font-semibold text-slate-50 mb-2">
                  7. Data &amp; Communication
                </h2>
                <ul className="list-disc list-inside space-y-1.5 text-slate-300">
                  <li>
                    Your registration details (name, email, college, etc.) will be used for
                    event communication and coordination.
                  </li>
                  <li>
                    The organizers may contact you post-event for feedback, future
                    opportunities, or related events.
                  </li>
                  <li>
                    Your data will not be sold to third parties. Limited information may be
                    shared with sponsors/judges for evaluation and outreach purposes.
                  </li>
                </ul>
              </section>

              {/* 8. Disqualification */}
              <section>
                <h2 className="text-base sm:text-lg font-semibold text-slate-50 mb-2">
                  8. Disqualification
                </h2>
                <ul className="list-disc list-inside space-y-1.5 text-slate-300">
                  <li>
                    Providing false information during registration or evaluation can lead
                    to disqualification.
                  </li>
                  <li>
                    Plagiarism, submission of pre-built projects, or use of unauthorized
                    code will result in disqualification.
                  </li>
                  <li>
                    Not adhering to timelines, rules, or instructions from the organizing
                    team may affect your participation status.
                  </li>
                </ul>
              </section>

              {/* 9. Changes to the Event */}
              <section>
                <h2 className="text-base sm:text-lg font-semibold text-slate-50 mb-2">
                  9. Event Changes &amp; Cancellation
                </h2>
                <ul className="list-disc list-inside space-y-1.5 text-slate-300">
                  <li>
                    The organizing team reserves the right to modify the event schedule,
                    rules, or structure if necessary.
                  </li>
                  <li>
                    In the event of unforeseen circumstances, the hackathon may be
                    rescheduled, paused, or cancelled. Communication will be shared via
                    email.
                  </li>
                </ul>
              </section>

              {/* 10. Acceptance */}
              <section>
                <h2 className="text-base sm:text-lg font-semibold text-slate-50 mb-2">
                  10. Acceptance of Terms
                </h2>
                <p className="text-slate-300">
                  By registering for and participating in the CODE4BHARAT Solo Hackathon,
                  you acknowledge that you have read, understood, and agree to abide by
                  all of the above terms and conditions.
                </p>
              </section>
            </div>

            <div className="mt-8 border-t border-slate-800 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-400">
              <p>
                For any queries regarding these terms, contact us at{" "}
                <a
                  href="mailto:support@code4bharat.in"
                  className="text-indigo-300 hover:text-indigo-200 underline-offset-2 hover:underline"
                >
                  support@code4bharat.in
                </a>
                .
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-indigo-300 hover:text-indigo-200 underline-offset-2 hover:underline"
              >
                Back to main hackathon page
              </Link>
            </div>
          </section>
        </div>
      </main>

      {/* Footer – dark hackathon style */}
      <footer className="border-t border-slate-800 bg-slate-950/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid md:grid-cols-4 gap-8 mb-6">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/40">
                  🇮🇳
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-slate-50">
                    CODE4BHARAT Solo Hackathon
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Build for Bharat in 6 hours
                  </p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md">
                A focused, high-intensity solo hackathon where you design, build, and
                present a complete solution in a single sprint.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-xs font-semibold text-slate-200 mb-2">
                Links
              </h4>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-400">
                <li>
                  <Link
                    href="/"
                    className="hover:text-indigo-300 transition-colors"
                  >
                    Hackathon Home
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-indigo-300 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <span className="text-slate-500">
                    You are viewing: Terms &amp; Conditions
                  </span>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="text-xs font-semibold text-slate-200 mb-2">
                Connect
              </h4>
              <div className="flex gap-2.5 mb-3">
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700 inline-flex items-center justify-center text-slate-200 hover:text-white text-sm transition-colors"
                  aria-label="Message"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700 inline-flex items-center justify-center text-slate-200 hover:text-white text-sm transition-colors"
                  aria-label="Website"
                >
                  <Link2 className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700 inline-flex items-center justify-center text-slate-200 hover:text-white text-sm transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700 inline-flex items-center justify-center text-slate-200 hover:text-white text-sm transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700 inline-flex items-center justify-center text-slate-200 hover:text-white text-sm transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
              <p className="text-[11px] text-slate-500">
                For support, write to{" "}
                <a
                  href="mailto:support@code4bharat.in"
                  className="text-indigo-300 hover:text-indigo-200"
                >
                  support@code4bharat.in
                </a>
              </p>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] sm:text-xs text-slate-500">
            <p>© 2026 CODE4BHARAT • All Rights Reserved</p>
            <p className="flex items-center gap-1">
              Hosted &amp; managed by{" "}
              <span className="font-semibold text-slate-300">
                CODE4BHARAT Organising Team
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
