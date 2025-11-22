"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  Menu,
  X,
  Calendar,
  Clock,
  Globe,
  Award,
  Users,
  Code,
  Zap,
  Target,
  Trophy,
  CheckCircle,
  Sparkles,
  Rocket,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  MessageCircle,
  Link2,
} from "lucide-react";
import Link from "next/link";

export default function Code4BharatLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  const NAV_SECTIONS = [
    "about",
    "domains",
    "timeline",
    "rules",
    "prizes",
    "faq",
    "terms",
  ];

  // Header scroll state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mouse position for subtle spotlight
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Smooth scroll to sections
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenuOpen(false);
  };

  // Fade-in on scroll
  useEffect(() => {
    const els = document.querySelectorAll(".fade-in-section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Hero parallax effect
  useEffect(() => {
    const handler = () => {
      const scrolledY = window.pageYOffset;
      const hero = heroRef.current;
      if (hero && scrolledY < 600) {
        hero.style.transform = `translateY(${scrolledY * 0.15}px)`;
        hero.style.opacity = `${Math.max(0.45, 1 - scrolledY * 0.0012)}`;
      } else if (hero) {
        hero.style.transform = "";
        hero.style.opacity = "";
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased relative overflow-x-hidden">
      <style jsx global>{`
        @keyframes floatYSoft {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }

        @keyframes shimmer {
          0% {
            left: -150%;
          }
          100% {
            left: 150%;
          }
        }

        .btn-shimmer {
          position: relative;
          overflow: hidden;
        }
        .btn-shimmer::before {
          content: "";
          position: absolute;
          top: 0;
          left: -150%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.35),
            transparent
          );
          animation: shimmer 3s linear infinite;
          transform: skewX(-20deg);
          opacity: 0.8;
        }

        .fade-in-section {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .fade-in-section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .card-soft {
          background: #ffffff;
          border-radius: 1.25rem;
          border: 1px solid rgba(148, 163, 184, 0.25);
          box-shadow: 0 18px 40px rgba(15, 23, 42, 0.06);
          transition: transform 0.18s ease, box-shadow 0.18s ease,
            border-color 0.18s ease;
        }
        .card-soft:hover {
          transform: translateY(-3px);
          box-shadow: 0 22px 50px rgba(15, 23, 42, 0.12);
          border-color: rgba(79, 70, 229, 0.45);
        }

        .stat-card {
          background: #ffffff;
          border-radius: 1.25rem;
          border: 1px solid rgba(226, 232, 240, 1);
          box-shadow: 0 14px 30px rgba(15, 23, 42, 0.05);
          transition: transform 0.18s ease, box-shadow 0.18s ease,
            border-color 0.18s ease;
        }
        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 22px 45px rgba(15, 23, 42, 0.1);
          border-color: rgba(79, 70, 229, 0.5);
        }
      `}</style>

      {/* Subtle background spotlight */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -top-40 left-1/2 w-[600px] h-[600px] rounded-full bg-indigo-200/50 blur-3xl"
          style={{
            transform: `translateX(${mousePosition.x * 0.02}px)`,
            opacity: 0.4,
          }}
        />
      </div>

      {/* Header */}
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-lg border-b border-slate-200 shadow-sm"
            : "bg-white/70 backdrop-blur-md border-b border-slate-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex items-center justify-between gap-6">
            {/* Logo / Brand */}
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/25 animate-[floatYSoft_4s_ease-in-out_infinite]">
                <span className="text-xl">🇮🇳</span>
              </div>
              <div>
                <div className="text-lg md:text-xl font-extrabold tracking-tight text-slate-900">
                  CODE4BHARAT
                </div>
                <div className="text-xs font-medium text-indigo-600">
                  National Hackathon 2026
                </div>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
              {NAV_SECTIONS.map((id) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="relative text-slate-600 hover:text-indigo-600 transition-colors"
                >
                  {id === "terms"
                    ? "Terms"
                    : id[0].toUpperCase() + id.slice(1)}
                  <span className="absolute left-0 right-0 -bottom-1 h-[2px] scale-x-0 bg-indigo-500/80 rounded-full transition-transform origin-left hover:scale-x-100" />
                </button>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => scrollToSection("submission")}
                className="hidden sm:inline-flex items-center gap-2 btn-shimmer relative bg-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-md shadow-indigo-500/30 hover:bg-indigo-700 transition-colors"
              >
                <Rocket className="w-4 h-4" />
                Register Now
              </button>

              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden text-slate-700 p-2 rounded-lg hover:bg-slate-100 transition-colors"
                onClick={() => setMobileMenuOpen((s) => !s)}
              >
                {mobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 shadow-sm">
            <div className="px-4 py-3 flex flex-col gap-1">
              {NAV_SECTIONS.map((id) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="text-left text-slate-700 hover:bg-slate-100 px-3 py-2 rounded-md text-sm font-medium"
                >
                  {id === "terms"
                    ? "Terms"
                    : id[0].toUpperCase() + id.slice(1)}
                </button>
              ))}
              <button
                onClick={() => scrollToSection("submission")}
                className="mt-2 inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-3 py-2.5 rounded-full text-sm font-semibold hover:bg-indigo-700 transition-colors"
              >
                <Rocket className="w-4 h-4" />
                Register Now
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <main className="relative z-10 pt-28 pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={heroRef} className="relative">
            <div className="relative text-center space-y-8 mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Online National Hackathon</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight text-slate-900">
                CODE4BHARAT{" "}
                <span className="text-indigo-600 drop-shadow-sm">2026</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto font-normal">
                A 6-hour online hackathon to build impactful solutions for
                India. Ideate, build, and present your project as a solo
                participant in a focused, product-first format.
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-sm text-slate-700">
                  <Calendar className="w-4 h-4 text-indigo-600" />
                  <span>February 6, 2026</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-sm text-slate-700">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  <span>6-Hour Hackathon</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-sm text-slate-700">
                  <Globe className="w-4 h-4 text-indigo-600" />
                  <span>Fully Online • PAN India</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4 pt-2">
                <button
                  onClick={() => scrollToSection("submission")}
                  className="group inline-flex items-center gap-2 btn-shimmer relative bg-indigo-600 text-white px-7 py-3 rounded-full text-sm sm:text-base font-semibold shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition-colors"
                >
                  <Rocket className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  Register as a Participant
                </button>

                <button
                  onClick={() => scrollToSection("domains")}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-slate-300 bg-white text-sm sm:text-base font-semibold text-slate-800 hover:border-indigo-400 hover:text-indigo-700 hover:bg-indigo-50/60 transition-colors"
                >
                  <Code className="w-4 h-4" />
                  View Problem Domains
                </button>
              </div>

              <p className="text-xs sm:text-sm text-slate-500 flex items-center justify-center gap-3 flex-wrap pt-1">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  Open to all college students
                </span>
                <span className="hidden sm:inline text-slate-300">|</span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-sky-500" />
                  Solo participation only
                </span>
                <span className="hidden sm:inline text-slate-300">|</span>
                <span className="flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  Surprise gifts + certificates for top 20
                </span>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Stats */}
      <section className="fade-in-section px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-5">
            {/* Hours */}
            <div className="stat-card p-6 flex flex-col items-start">
              <div className="rounded-xl bg-indigo-50 text-indigo-600 p-2.5 mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-3xl md:text-4xl font-extrabold text-slate-900">
                6
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-600">
                Hours of Building
              </div>
              <p className="mt-2 text-xs text-slate-500">
                A focused sprint to design, build, and present.
              </p>
            </div>

            {/* Prize Highlight */}
            <div className="stat-card p-6 flex flex-col items-start">
              <div className="rounded-xl bg-amber-50 text-amber-600 p-2.5 mb-4">
                <Trophy className="w-5 h-5" />
              </div>
              <div className="text-3xl md:text-4xl font-extrabold text-slate-900">
                Surprise
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-600">
                1st Prize Reward
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Exciting surprise gift for the top performer.
              </p>
            </div>

            {/* Participants */}
            <div className="stat-card p-6 flex flex-col items-start">
              <div className="rounded-xl bg-sky-50 text-sky-600 p-2.5 mb-4">
                <Users className="w-5 h-5" />
              </div>
              <div className="text-3xl md:text-4xl font-extrabold text-slate-900">
                1000+
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-600">
                Expected Participants
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Compete with solo coders from across India.
              </p>
            </div>

            {/* Domains */}
            <div className="stat-card p-6 flex flex-col items-start">
              <div className="rounded-xl bg-violet-50 text-violet-600 p-2.5 mb-4">
                <Code className="w-5 h-5" />
              </div>
              <div className="text-3xl md:text-4xl font-extrabold text-slate-900">
                2
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-600">
                Core Domains
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Web Development &amp; DSA-focused problem statements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="fade-in-section px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto">
          <div className="card-soft p-8 sm:p-10 md:p-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-5">
              About CODE4BHARAT
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-4xl leading-relaxed">
              CODE4BHARAT is a national-level solo hackathon focused on real-world
              problem solving. Participants ideate, design, build, and present
              solutions individually in a structured and professional format,
              mirroring how modern product teams work with ownership and clarity.
            </p>
            <p className="mt-4 text-sm text-slate-500 max-w-3xl">
              Whether you&apos;re just starting your coding journey or you&apos;re an
              experienced developer, this hackathon gives you a platform to
              independently own an idea, execute it end-to-end, and present it
              to experienced judges.
            </p>
          </div>
        </div>
      </section>

      {/* Domains */}
      <section id="domains" className="fade-in-section px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-3">
              Competition Domains
            </h2>
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
              Select one domain that best aligns with your strengths. All
              problem statements are designed to be practical and industry
              relevant.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {/* Web Dev */}
            <div className="card-soft p-8 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-indigo-50 text-indigo-600 p-3">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Web Development
                </h3>
              </div>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Build responsive, accessible, and scalable web applications.
                Focus on user experience, clean architecture, and real-world
                business use cases. You can work on dashboards, portals,
                landing pages, or end-to-end web experiences.
              </p>
              <ul className="mt-2 space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-emerald-500" />
                  Modern frontend frameworks (React, Next.js, etc.)
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-emerald-500" />
                  API integrations, authentication, dashboards, and more
                </li>
              </ul>
            </div>

            {/* DSA */}
            <div className="card-soft p-8 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-sky-50 text-sky-600 p-3">
                  <Code className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Data Structures &amp; Algorithms
                </h3>
              </div>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Solve algorithmic challenges with optimal solutions. Emphasis is
                on correctness, time &amp; space complexity, and clean coding
                style. Ideal for those who enjoy competitive programming and
                problem-solving.
              </p>
              <ul className="mt-2 space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-emerald-500" />
                  Focus on algorithm design and optimisation
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-emerald-500" />
                  Code clarity, edge case handling, and efficiency
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section
        id="timeline"
        className="fade-in-section px-4 sm:px-6 lg:px-8 mb-16"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-8 text-center">
            Event Timeline
          </h2>

          <div className="relative pl-8 md:pl-0">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-400 via-indigo-300 to-slate-200" />

            {[
              {
                num: "1",
                title: "Registration Window",
                date: "January 20 – February 5, 2026",
              },
              {
                num: "2",
                title: "Opening Briefing",
                date: "February 6 • 9:00 AM IST (Virtual)",
              },
              {
                num: "3",
                title: "Hackathon Starts",
                date: "February 6 • 10:00 AM IST",
              },
              {
                num: "4",
                title: "Submission Deadline",
                date: "February 6 • 4:00 PM IST",
              },
              {
                num: "5",
                title: "Results & Closing",
                date: "February 6 • 6:00 PM IST",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`relative mb-8 md:mb-10 flex md:items-center ${
                  i % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`flex-1 ${
                    i % 2 === 0 ? "md:pr-12" : "md:pl-12"
                  } ml-6 md:ml-0`}
                >
                  <div className="card-soft p-5">
                    <h4 className="text-base sm:text-lg md:text-xl font-semibold text-slate-900 mb-1">
                      {item.title}
                    </h4>
                    <p className="text-sm text-indigo-700 font-medium">
                      {item.date}
                    </p>
                  </div>
                </div>
                <div className="absolute left-0 md:left-1/2 w-11 h-11 rounded-full bg-white border border-indigo-200 flex items-center justify-center font-bold text-sm text-indigo-700 shadow-sm md:-translate-x-1/2">
                  {item.num}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rules */}
      <section id="rules" className="fade-in-section px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-3 text-center">
            Rules &amp; Guidelines
          </h2>
          <p className="text-slate-600 text-center mb-10 text-base sm:text-lg max-w-3xl mx-auto">
            Please go through the rules carefully. All participants are expected
            to follow a fair and professional code of conduct.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Each rule card */}
            <div className="card-soft p-6 flex flex-col gap-3">
              <div className="inline-flex items-center gap-2 text-indigo-700 text-sm font-semibold">
                <Users className="w-4 h-4" />
                Eligibility
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Open to all college students and early professionals. This is a
                solo hackathon—each project must be built and submitted by a
                single individual.
              </p>
            </div>

            <div className="card-soft p-6 flex flex-col gap-3">
              <div className="inline-flex items-center gap-2 text-sky-700 text-sm font-semibold">
                <Target className="w-4 h-4" />
                Original Work
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                All projects must be built during the hackathon. Pre-built
                projects or plagiarism (including code &amp; design) will lead
                to disqualification.
              </p>
            </div>

            <div className="card-soft p-6 flex flex-col gap-3">
              <div className="inline-flex items-center gap-2 text-violet-700 text-sm font-semibold">
                <Clock className="w-4 h-4" />
                Timeframe
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                The active hacking window is strictly 6 hours. Submissions
                received after the deadline will not be evaluated.
              </p>
            </div>

            <div className="card-soft p-6 flex flex-col gap-3">
              <div className="inline-flex items-center gap-2 text-indigo-700 text-sm font-semibold">
                <Zap className="w-4 h-4" />
                Tech Stack
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                You are free to choose any programming language, framework, or
                tools. Open-source libraries are allowed with proper credits.
              </p>
            </div>

            <div className="card-soft p-6 flex flex-col gap-3">
              <div className="inline-flex items-center gap-2 text-sky-700 text-sm font-semibold">
                <Github className="w-4 h-4" />
                Submission Assets
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Each participant must submit a GitHub repository, a README with
                setup instructions, a short demo video (3–5 mins), and slides.
              </p>
            </div>

            <div className="card-soft p-6 flex flex-col gap-3">
              <div className="inline-flex items-center gap-2 text-violet-700 text-sm font-semibold">
                <Award className="w-4 h-4" />
                Evaluation Criteria
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Projects are judged on Innovation (30%), Technical Depth (30%),
                Impact &amp; Relevance (20%), and Presentation Quality (20%).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Prizes */}
      <section id="prizes" className="fade-in-section px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-3 text-center">
            Prizes &amp; Recognition
          </h2>
          <p className="text-slate-600 text-center mb-10 text-base sm:text-lg max-w-2xl mx-auto">
            Top solo performers will receive exciting gifts and recognition. The
            exact first prize is a surprise, revealed during the event.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* 1st */}
            <div className="card-soft p-8 text-center flex flex-col gap-4 md:-translate-y-2">
              <div className="text-4xl mb-1">🥇</div>
              <h3 className="text-xl font-semibold text-slate-900">
                1st Prize
              </h3>
              <div className="text-2xl font-black text-amber-600">
                Surprise Gift
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                A special surprise gift hamper, certificate of excellence, and
                featured recognition across our platforms.
              </p>
            </div>

            {/* 2nd */}
            <div className="card-soft p-8 text-center flex flex-col gap-4">
              <div className="text-4xl mb-1">🥈</div>
              <h3 className="text-xl font-semibold text-slate-900">
                2nd Prize
              </h3>
              <div className="text-2xl font-black text-slate-700">
                Premium Gift Hamper
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Curated goodies, certificate of achievement, and official
                mention as a runner-up.
              </p>
            </div>

            {/* 3rd */}
            <div className="card-soft p-8 text-center flex flex-col gap-4">
              <div className="text-4xl mb-1">🥉</div>
              <h3 className="text-xl font-semibold text-slate-900">
                3rd Prize
              </h3>
              <div className="text-2xl font-black text-orange-700">
                Gift &amp; Swag
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Themed swag, small gift items, and a certificate highlighting
                your performance.
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-medium">
              <Trophy className="w-4 h-4" />
              Top 20 participants will receive participation certificates.
            </div>
          </div>
        </div>
      </section>

      {/* Submission Guidelines / CTA */}
      <section
        id="submission"
        className="fade-in-section px-4 sm:px-6 lg:px-8 mb-16"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-3 text-center">
            Submission Guidelines
          </h2>
          <p className="text-slate-600 text-center mb-10 text-base sm:text-lg max-w-2xl mx-auto">
            Follow these guidelines to ensure your submission is complete and
            ready for evaluation.
          </p>

          <div className="card-soft p-8 sm:p-10">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="flex items-center gap-2 text-lg font-semibold text-slate-900 mb-4">
                  <span className="inline-flex w-9 h-9 rounded-full bg-indigo-50 text-indigo-700 items-center justify-center text-sm">
                    📦
                  </span>
                  Required Items
                </h4>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-emerald-500" />
                    Public GitHub repository with complete and organized code.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-emerald-500" />
                    Detailed README with setup instructions and project
                    overview.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-emerald-500" />
                    Demo video (3–5 mins) hosted on YouTube/Drive with public
                    access.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-emerald-500" />
                    Presentation deck in PPT or PDF format.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-emerald-500" />
                    Live demo link (if applicable) for web-based projects.
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="flex items-center gap-2 text-lg font-semibold text-slate-900 mb-4">
                  <span className="inline-flex w-9 h-9 rounded-full bg-sky-50 text-sky-700 items-center justify-center text-sm">
                    📝
                  </span>
                  Documentation Checklist
                </h4>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-emerald-500" />
                    Project title, problem statement, and participant details.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-emerald-500" />
                    Solution approach, architecture, and key decisions taken.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-emerald-500" />
                    Tech stack used and justification (where relevant).
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-emerald-500" />
                    Clear instructions to run and test the project locally.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-emerald-500" />
                    Screenshots or GIFs for key features and flows.
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center pt-2">
              <button className="group inline-flex items-center gap-2 btn-shimmer relative bg-indigo-600 text-white px-8 py-3.5 rounded-full text-sm sm:text-base font-semibold shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition-colors">
                <Rocket className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                Submit Your Registration
              </button>
              <p className="mt-3 text-xs text-slate-500">
                You will receive a confirmation email after successful
                registration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="fade-in-section px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-500 text-white px-6 sm:px-10 py-10 sm:py-12 md:py-14 flex flex-col items-center text-center shadow-lg shadow-indigo-500/30">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3">
              Build something meaningful for Bharat.
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-indigo-100 max-w-2xl mb-6">
              Register as a solo participant, pick your domain, and experience a
              professionally organized hackathon with focused timelines and
              clear expectations.
            </p>
            <button
              onClick={() => scrollToSection("submission")}
              className="inline-flex items-center gap-2 bg-white text-indigo-700 px-7 py-3 rounded-full text-sm sm:text-base font-semibold shadow-md hover:bg-indigo-50 transition-colors"
            >
              Get Started with Registration
              <Rocket className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Terms & Conditions Section */}
      <section
        id="terms"
        className="fade-in-section px-4 sm:px-6 lg:px-8 mb-16"
      >
        <div className="max-w-5xl mx-auto">
          <div className="card-soft p-8 sm:p-10 md:p-12">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
              Terms &amp; Conditions
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mb-6">
              By registering and participating in CODE4BHARAT 2026, you agree to
              the following terms and conditions. Please read them carefully
              before submitting your registration.
            </p>

            <div className="space-y-4 text-sm text-slate-600">
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">
                  1. Eligibility
                </h3>
                <p>
                  Participants must be currently enrolled students or early
                  career professionals. This is a solo hackathon—only one person
                  can work on and submit each project. The organisers reserve
                  the right to verify identity and eligibility at any stage.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-1">
                  2. Registration Details
                </h3>
                <p>
                  All information provided during registration must be accurate
                  and complete. Providing false, incomplete, or misleading
                  details may result in rejection of your registration or
                  disqualification from the event.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-1">
                  3. Original Work
                </h3>
                <p>
                  Your project must be created during the 6-hour hackathon
                  window. You may use publicly available libraries and
                  frameworks, but copying entire projects or code without proper
                  attribution is strictly prohibited.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-1">
                  4. Intellectual Property
                </h3>
                <p>
                  Unless explicitly stated otherwise, the intellectual property
                  of the project remains with the participant. However, the
                  organisers may showcase your project (with credit) for
                  promotional, educational, or marketing purposes related to the
                  event.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-1">
                  5. Code of Conduct
                </h3>
                <p>
                  All participants are expected to maintain respectful and
                  professional behaviour. Any form of harassment, abuse, or
                  discriminatory conduct will not be tolerated and may lead to
                  immediate removal from the hackathon.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-1">
                  6. Prizes &amp; Rewards
                </h3>
                <p>
                  Prizes will be in the form of gifts and hampers. The exact
                  nature of the first prize is a surprise and may be updated or
                  modified by the organisers if required. Prizes are
                  non-transferable and cannot be exchanged for cash.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-1">
                  7. Certificates
                </h3>
                <p>
                  Certificates of participation will be awarded to the top 20
                  participants based on the final evaluation. The organisers
                  reserve the right to decide the final list of certificate
                  recipients.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-1">
                  8. Evaluation &amp; Jury Decision
                </h3>
                <p>
                  All submissions will be evaluated by a designated jury panel.
                  The decision of the jury will be final and binding. Requests
                  for re-evaluation or contesting the results will not be
                  entertained.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-1">
                  9. Data &amp; Privacy
                </h3>
                <p>
                  Registration details will be used only for communication,
                  coordination, and event analytics. Personal data will not be
                  sold to third parties. By registering, you consent to receive
                  event-related communications via email and other channels.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-1">
                  10. Changes &amp; Cancellation
                </h3>
                <p>
                  The organisers may modify the schedule, structure, prizes, or
                  terms of the event, or cancel the hackathon if required due to
                  unavoidable circumstances. Any major updates will be
                  communicated to registered participants through official
                  channels.
                </p>
              </div>
            </div>

            <p className="mt-6 text-xs text-slate-500">
              By continuing with registration and participation, you confirm
              that you have read, understood, and agreed to these Terms &amp;
              Conditions.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="fade-in-section px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                q: "Who can participate in CODE4BHARAT?",
                a: "Any college student or early professional with an interest in technology can participate. This is a solo hackathon, so each person participates individually.",
              },
              {
                q: "Is there any registration fee?",
                a: "No, participation in CODE4BHARAT is completely free. Simply register your details and you are ready to go.",
              },
              {
                q: "Do I need prior hackathon experience?",
                a: "Not at all. Beginners are welcome. The format and guidelines are structured to help you learn and contribute effectively.",
              },
              {
                q: "How are projects evaluated?",
                a: "Evaluation is done by a panel of reviewers based on innovation, technical depth, impact, and presentation quality.",
              },
              {
                q: "Can I work on an existing project?",
                a: "No. All work must be created during the 6-hour hackathon window. However, you may reuse standard libraries, frameworks, and boilerplates.",
              },
              {
                q: "Will I receive a certificate?",
                a: "Certificates of participation will be awarded to the top 20 participants based on overall performance and evaluation.",
              },
              {
                q: "What is the mode of communication during the event?",
                a: "All official communication, announcements, and support will be provided via email and designated online channels shared post-registration.",
              },
              {
                q: "Can non-technical students participate?",
                a: "Yes, as long as you are willing to build and submit a project on your own. Design, research, and presentation skills are also valuable.",
              },
            ].map((faq, i) => (
              <div key={i} className="card-soft p-6">
                <h4 className="font-semibold text-sm sm:text-base text-slate-900 mb-2">
                  {faq.q}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

          {/* Footer – Hackathon styled */}
        {/* Footer – Hackathon style */}
            {/* Footer – Hackathon styled */}
      <footer className="mt-8 border-t border-slate-200 bg-white/90 backdrop-blur">
        {/* Gradient accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-indigo-600 via-sky-500 to-violet-500" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid md:grid-cols-4 gap-10 mb-8">
            {/* Brand & About */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/40">
                  🇮🇳
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    CODE4BHARAT
                  </h3>
                  <p className="text-xs text-slate-500">
                    National Hackathon 2026 · Solo Edition
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-600 mb-4 leading-relaxed max-w-md">
                A focused 6-hour solo hackathon designed to help you ship a real
                project end-to-end, showcase your skills, and compete with some
                of the brightest minds across India.
              </p>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs uppercase tracking-wide text-slate-500">
                  Follow the event
                </span>
                <div className="flex gap-2.5">
                  <a
                    href="#"
                    className="w-9 h-9 rounded-full bg-slate-100 hover:bg-indigo-50 border border-slate-200 inline-flex items-center justify-center text-slate-600 hover:text-indigo-700 text-sm transition-colors"
                    aria-label="Message"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    className="w-9 h-9 rounded-full bg-slate-100 hover:bg-indigo-50 border border-slate-200 inline-flex items-center justify-center text-slate-600 hover:text-indigo-700 text-sm transition-colors"
                    aria-label="Website"
                  >
                    <Link2 className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    className="w-9 h-9 rounded-full bg-slate-100 hover:bg-indigo-50 border border-slate-200 inline-flex items-center justify-center text-slate-600 hover:text-indigo-700 text-sm transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    className="w-9 h-9 rounded-full bg-slate-100 hover:bg-indigo-50 border border-slate-200 inline-flex items-center justify-center text-slate-600 hover:text-indigo-700 text-sm transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    className="w-9 h-9 rounded-full bg-slate-100 hover:bg-indigo-50 border border-slate-200 inline-flex items-center justify-center text-slate-600 hover:text-indigo-700 text-sm transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Event snapshot – feels like hackathon */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-indigo-600" />
                Event Snapshot
              </h3>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  <div>
                    <p className="font-semibold text-slate-800">6-Hour Sprint</p>
                    <p className="text-xs text-slate-500">
                      Build and ship in a focused window.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                  <Users className="w-4 h-4 text-sky-600" />
                  <div>
                    <p className="font-semibold text-slate-800">Solo Hackathon</p>
                    <p className="text-xs text-slate-500">
                      One participant, one project, full ownership.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                  <Award className="w-4 h-4 text-amber-600" />
                  <div>
                    <p className="font-semibold text-slate-800">
                      Gifts &amp; Certificates
                    </p>
                    <p className="text-xs text-slate-500">
                      Surprise gift for 1st, certificates for top 20.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links + CTA */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-3">
                Quick Links
              </h3>
              <ul className="space-y-2 text-sm text-slate-600 mb-4">
                {NAV_SECTIONS.map((id) => (
                  <li key={id}>
                    <button
                      onClick={() => scrollToSection(id)}
                      className="hover:text-indigo-700 hover:translate-x-0.5 transition-transform transition-colors inline-flex items-center gap-1"
                    >
                      <span>→</span>
                      <span>
                        {id === "terms"
                          ? "Terms & Conditions"
                          : id[0].toUpperCase() + id.slice(1)}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => scrollToSection("submission")}
                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-full text-xs font-semibold shadow-md shadow-indigo-500/30 hover:bg-indigo-700 transition-colors"
              >
                <Rocket className="w-4 h-4" />
                Register for the Hackathon
              </button>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-slate-200 pt-4 flex flex-col md:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-slate-500">
            <p>© 2026 CODE4BHARAT • All Rights Reserved</p>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="flex items-center gap-1">
                Hosted &amp; managed by{" "}
                <span className="font-semibold text-slate-700">
                  CODE4BHARAT Organising Team
                </span>
              </span>
              <span className="hidden sm:inline text-slate-300">|</span>
              <a
                href="#"
                className="text-indigo-700 hover:text-indigo-800 underline-offset-2 hover:underline"
              >
                Privacy Policy
              </a>
              <span className="hidden sm:inline text-slate-300">|</span>
              <button
                onClick={() => scrollToSection("terms")}
                className="text-indigo-700 hover:text-indigo-800 underline-offset-2 hover:underline"
              >
                Terms &amp; Conditions
              </button>
            </div>
          </div>
        </div>
      </footer>



    </div>
  );
}
