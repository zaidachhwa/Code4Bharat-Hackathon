"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  Menu,
  X,
  Calendar,
  ChevronDown,
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
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import { useRouter } from "next/navigation";

const faqs = [
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
];

export default function Code4BharatLanding() {
  const router = useRouter();
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const leftFaqs = faqs.slice(0, 3);
  const rightFaqs = faqs.slice(3, 6);
  /* ================================================================
      HEADER SCROLL STATE
  ================================================================= */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================================================================
      MOUSE SPOTLIGHT
  ================================================================= */
  useEffect(() => {
    const handleMouseMove = (e) =>
      setMousePosition({ x: e.clientX, y: e.clientY });

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  /* ================================================================
      SMOOTH SCROLL TO SECTIONS
  ================================================================= */
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenuOpen(false);
  };

  /* ================================================================
      FADE-IN ON SCROLL
  ================================================================= */
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-in-section");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        }),
      { threshold: 0.12 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);


      // HERO PARALLAX EFFECT
  useEffect(() => {
    const handler = () => {
      const y = window.pageYOffset;
      if (heroRef.current && y < 600) {
        heroRef.current.style.transform = `translateY(${y * 0.15}px)`;
        heroRef.current.style.opacity = `${Math.max(0.45, 1 - y * 0.0012)}`;
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased relative overflow-x-hidden">
      <Navbar />

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

        button {
          cursor: pointer !important;
        }
      `}</style>

    
          {/* Background Spotlight */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -top-40 left-1/2 w-[600px] h-[600px] rounded-full bg-indigo-200/50 blur-3xl"
          style={{
            transform: `translateX(${mousePosition.x * 0.02}px)`,
            opacity: 0.4,
          }}
        />
      </div>

     
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
                  onClick={() => {router.push("/register")}}
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

      <section className="fade-in-section px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-5">

            {/* Hours */}
            <div className="card-soft  p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-start">
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
            <div className="card-soft p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-start">
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
            <div className="card-soft p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-start">
              <div className="rounded-xl bg-sky-50 text-sky-600 p-2.5 mb-4">
                <Users className="w-5 h-5" />
              </div>
              <div className="text-3xl md:text-4xl font-extrabold text-slate-900">
                10000+
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-600">
                Expected Participants
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Compete with solo coders from across India.
              </p>
            </div>

            {/* Domains */}
            <div className="card-soft p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-start">
              <div className="rounded-xl bg-violet-50 text-violet-600 p-2.5 mb-4">
                <Code className="w-5 h-5" />
              </div>
              <div className="text-3xl md:text-4xl font-extrabold text-slate-900">
                3
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
      <section
      id="about"
        className="fade-in-section px-4 sm:px-6 lg:px-8 mb-16"
      >
        <div className="max-w-7xl mx-auto">
          <div className="card-soft  p-8 sm:p-10 md:p-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-5">
              About CODE4BHARAT
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-4xl leading-relaxed">
              CODE4BHARAT is a national-level solo hackathon focused on
              real-world problem solving. Participants ideate, design, build,
              and present solutions individually in a structured and
              professional format, mirroring how modern product teams work with
              ownership and clarity.
            </p>
            <p className="mt-4 text-sm text-slate-500 max-w-3xl">
              Whether you&apos;re just starting your coding journey or
              you&apos;re an experienced developer, this hackathon gives you a
              platform to independently own an idea, execute it end-to-end, and
              present it to experienced judges.
            </p>
          </div>
        </div>
      </section>

      {/* Domains */}
      <section
        id="domains"
        className="fade-in-section px-4 sm:px-6 lg:px-8 mb-16"
      >
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
                business use cases. You can work on dashboards, portals, landing
                pages, or end-to-end web experiences.
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
        <div className="max-w-4xl mx-auto relative">

          {/* Blur Overlay */}
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="backdrop-blur-md bg-white/70 px-8 py-5 rounded-2xl border border-slate-200 shadow-lg">
              <span className="text-2xl sm:text-3xl font-black text-slate-800">
                Coming Soon
              </span>
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-8 text-center">
            Event Timeline
          </h2>
          {/* Original Content (Blurred) */}
          <div className="blur-sm pointer-events-none select-none">



            <div className="relative pl-8 md:pl-0">
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-indigo-400 via-indigo-300 to-slate-200" />

              {[
                { num: "1", title: "Registration Window", date: "January 20 – February 5, 2026" },
                { num: "2", title: "Opening Briefing", date: "February 6 • 9:00 AM IST (Virtual)" },
                { num: "3", title: "Hackathon Starts", date: "February 6 • 10:00 AM IST" },
                { num: "4", title: "Submission Deadline", date: "February 6 • 4:00 PM IST" },
                { num: "5", title: "Results & Closing", date: "February 6 • 6:00 PM IST" },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`relative mb-8 md:mb-10 flex md:items-center ${i % 2 === 0 ? "md:flex-row-reverse" : ""
                    }`}
                >
                  <div
                    className={`flex-1 ${i % 2 === 0 ? "md:pr-12" : "md:pl-12"
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

        </div>
      </section>

    {/* Rules */}
      <section
        id="rules"
        className="fade-in-section px-4 sm:px-6 lg:px-8 mb-16"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-3 text-center">
            Rules &amp; Guidelines
          </h2>
          <p className="text-slate-600 text-center mb-10 text-base sm:text-lg max-w-3xl mx-auto">
            Please go through the rules carefully. All participants are expected
            to follow a fair and professional code of conduct.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
          </div>
        </div>
      </section>

    {/* Prizes */}
      <section
        id="prizes"
        className="fade-in-section px-4 sm:px-6 lg:px-8 mb-16"
      >
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
     {/* <section
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
      </section>  */}

     {/* CTA Section */}
      {/* <section className="fade-in-section px-4 sm:px-6 lg:px-8 mb-16">
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
      </section> */}

      {/* FAQ */}
<div className="max-w-7xl mb-20 mx-auto px-4 sm:px-8" id="FAQ">
  {/* Title */}
  <h1 className="text-3xl sm:text-4xl font-black text-center text-slate-900 mb-10">
    Frequently Asked Questions
  </h1>

  {/* Grid */}
  <div className="grid md:grid-cols-2 gap-6">
    {/* LEFT */}
    <div className="space-y-4">
      {leftFaqs.map((faq, i) => {
        const index = i;
        const isOpen = openFaqIndex === index;

        return (
          <div key={index} className="card-soft">
            <button
              onClick={() => setOpenFaqIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between p-6 text-left"
            >
              <span className="font-semibold text-slate-900">
                {faq.q}
              </span>

              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isOpen && (
              <div className="px-6 pb-6 text-sm text-slate-600">
                {faq.a}
              </div>
            )}
          </div>
        );
      })}
    </div>

    {/* RIGHT */}
    <div className="space-y-4">
      {rightFaqs.map((faq, i) => {
        const index = i + 3;
        const isOpen = openFaqIndex === index;

        return (
          <div key={index} className="card-soft">
            <button
              onClick={() => setOpenFaqIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between p-6 text-left"
            >
              <span className="font-semibold text-slate-900">
                {faq.q}
              </span>

              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isOpen && (
              <div className="px-6 pb-6 text-sm text-slate-600">
                {faq.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  </div>
</div>

      <Footer/>

    </div>
  );
}
