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
} from "lucide-react";

export default function Code4BharatLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenuOpen(false);
  };

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

  useEffect(() => {
    const handler = () => {
      const scrolled = window.pageYOffset;
      const hero = heroRef.current;
      if (hero && scrolled < 800) {
        hero.style.transform = `translateY(${scrolled * 0.28}px)`;
        hero.style.opacity = `${Math.max(0.35, 1 - scrolled * 0.0015)}`;
      } else if (hero) {
        hero.style.transform = "";
        hero.style.opacity = "";
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="min-h-screen text-slate-50 bg-[#0a0a0f] antialiased relative overflow-x-hidden">
      <style jsx global>{`
        @keyframes floatY {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-12px) rotate(2deg);
          }
        }
        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(139, 92, 246, 0.6);
          }
        }
        @keyframes slide-in {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
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
        @keyframes grid-flow {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(40px);
          }
        }
        @keyframes rotate-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-floatY {
          animation: floatY 4s ease-in-out infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
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
            rgba(255, 255, 255, 0.3),
            transparent
          );
          animation: shimmer 3s linear infinite;
          transform: skewX(-20deg);
        }

        .fade-in-section {
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .fade-in-section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .grid-pattern {
          background-image: linear-gradient(
              rgba(139, 92, 246, 0.03) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(139, 92, 246, 0.03) 1px,
              transparent 1px
            );
          background-size: 40px 40px;
          animation: grid-flow 20s linear infinite;
        }

        .glow-card {
          position: relative;
          transition: all 0.3s ease;
        }
        .glow-card::before {
          content: "";
          position: absolute;
          inset: -2px;
          background: linear-gradient(45deg, #8b5cf6, #3b82f6, #8b5cf6);
          border-radius: inherit;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
          filter: blur(8px);
        }
        .glow-card:hover::before {
          opacity: 0.6;
        }
      `}</style>

      {/* Animated grid background */}
      <div className="fixed inset-0 grid-pattern opacity-30 -z-10"></div>

      {/* Gradient orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${
              mousePosition.y * 0.02
            }px)`,
            transition: "transform 0.3s ease-out",
          }}
        ></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          style={{
            transform: `translate(${-mousePosition.x * 0.02}px, ${
              -mousePosition.y * 0.02
            }px)`,
            transition: "transform 0.3s ease-out",
          }}
        ></div>
      </div>

      {/* Header */}
      <header
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-2xl bg-black/60 border-b border-purple-500/20 shadow-lg shadow-purple-500/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 via-violet-600 to-blue-600 flex items-center justify-center shadow-xl shadow-purple-500/50 animate-floatY">
                <span className="text-2xl">🇮🇳</span>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 blur opacity-50 -z-10"></div>
              </div>
              <div>
                <div className="text-lg md:text-xl font-black tracking-tight bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  CODE4BHARAT
                </div>
                <div className="text-xs text-purple-400 font-semibold">
                  Hackathon 2026
                </div>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              {["about", "domains", "timeline", "rules", "prizes", "faq"].map(
                (id) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className="relative text-slate-300 hover:text-purple-400 py-2 px-1 font-semibold transition-colors group"
                  >
                    {id[0].toUpperCase() + id.slice(1)}
                    <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-gradient-to-r from-purple-600 to-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  </button>
                )
              )}
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={() => scrollToSection("submission")}
                className="hidden sm:inline-flex items-center gap-2 btn-shimmer bg-gradient-to-r from-purple-600 via-violet-600 to-blue-600 px-6 py-3 rounded-xl text-white font-bold shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 hover:scale-105 transition-all"
              >
                <Rocket className="w-4 h-4" />
                Register Now
              </button>

              <button
                className="md:hidden text-purple-400 p-2 hover:bg-purple-500/10 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen((s) => !s)}
              >
                {mobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden backdrop-blur-2xl bg-black/90 border-b border-purple-500/30 p-6">
            <div className="flex flex-col gap-3">
              {["about", "domains", "timeline", "rules", "prizes", "faq"].map(
                (id) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className="text-left text-slate-300 hover:text-purple-400 hover:bg-purple-500/10 px-4 py-3 rounded-lg transition-all font-semibold"
                  >
                    {id[0].toUpperCase() + id.slice(1)}
                  </button>
                )
              )}
              <button
                onClick={() => scrollToSection("submission")}
                className="mt-2 bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-3 rounded-lg text-white font-bold"
              >
                Register Now
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <main className="relative z-10 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div ref={heroRef} className="relative">
            <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
            <div
              className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-600/30 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>

            <div className="relative text-center space-y-8 mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-semibold text-purple-400">
                  India's Premier Hackathon
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight">
                <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                  CODE4BHARAT
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-blue-400 bg-clip-text text-transparent">
                  2026
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-light">
                Code. Compete. Conquer. Build innovative solutions that shape
                India's digital future.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-xl backdrop-blur-sm">
                  <Calendar className="w-5 h-5 text-purple-400" />
                  <span className="font-semibold">Feb 6, 2026</span>
                </div>
                <div className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-xl backdrop-blur-sm">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <span className="font-semibold">24 Hours</span>
                </div>
                <div className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-xl backdrop-blur-sm">
                  <Globe className="w-5 h-5 text-violet-400" />
                  <span className="font-semibold">Online Event</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-5 pt-4">
                <button
                  onClick={() => scrollToSection("submission")}
                  className="group flex items-center gap-3 btn-shimmer bg-gradient-to-r from-purple-600 via-violet-600 to-blue-600 px-8 py-4 rounded-xl text-white font-bold shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 hover:scale-105 transition-all"
                >
                  <Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  Register Now
                </button>

                <button
                  onClick={() => scrollToSection("domains")}
                  className="flex items-center gap-3 px-8 py-4 rounded-xl border-2 border-purple-500/50 text-purple-400 font-bold hover:bg-purple-500/10 hover:border-purple-400 transition-all backdrop-blur-sm"
                >
                  <Code className="w-5 h-5" />
                  Explore Domains
                </button>
              </div>

              <p className="text-slate-400 flex items-center justify-center gap-3 flex-wrap">
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Open to All
                </span>
                <span>•</span>
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-400" />
                  Solo or Teams
                </span>
                <span>•</span>
                <span className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-yellow-400" />
                  ₹30K in Prizes
                </span>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Stats Section */}
      <section className="fade-in-section px-6 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: "24", label: "Hours", icon: Clock, color: "purple" },
              {
                num: "₹30K",
                label: "Prize Pool",
                icon: Trophy,
                color: "yellow",
              },
              {
                num: "1000+",
                label: "Participants",
                icon: Users,
                color: "blue",
              },
              { num: "2", label: "Domains", icon: Code, color: "violet" },
            ].map((stat, i) => (
              <div
                key={i}
                className="glow-card relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center group hover:scale-105 transition-all"
              >
                <stat.icon
                  className={`w-8 h-8 mx-auto mb-4 text-${stat.color}-400`}
                />
                <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-2">
                  {stat.num}
                </div>
                <div className="text-slate-400 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="fade-in-section px-6 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="glow-card bg-gradient-to-br from-purple-500/5 to-blue-500/5 backdrop-blur-sm rounded-3xl p-10 md:p-16 border border-purple-500/20">
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-6">
              About CODE4BHARAT
            </h2>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-4xl">
              CODE4BHARAT is a 24-hour online hackathon bringing together
              India's brightest minds to solve real-world challenges through
              technology. Whether you're a beginner or experienced developer,
              this is your platform to innovate, learn, and showcase your skills
              on a national stage. Join us in shaping India's digital future.
            </p>
          </div>
        </div>
      </section>

      {/* Domains */}
      <section id="domains" className="fade-in-section px-6 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-4">
              Competition Domains
            </h2>
            <p className="text-slate-300 text-lg">
              Choose ONE domain to compete in. Build innovative solutions that
              push boundaries.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="glow-card group relative overflow-hidden rounded-3xl p-10 bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/30 hover:border-purple-500/50 transition-all hover:scale-105">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl -z-10"></div>
              <Globe className="w-12 h-12 text-purple-400 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-3xl font-black mb-4 text-white">
                🌐 Web Development
              </h3>
              <p className="text-slate-300 text-lg leading-relaxed">
                Create stunning websites, web applications, dashboards, and
                interactive tools. Showcase your frontend and backend expertise
                with modern frameworks and technologies.
              </p>
            </div>

            <div className="glow-card group relative overflow-hidden rounded-3xl p-10 bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/30 hover:border-blue-500/50 transition-all hover:scale-105">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -z-10"></div>
              <Code className="w-12 h-12 text-blue-400 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-3xl font-black mb-4 text-white">
                💻 Data Structures & Algorithms
              </h3>
              <p className="text-slate-300 text-lg leading-relaxed">
                Demonstrate your problem-solving prowess through efficient
                algorithms, optimized code, and innovative solutions to complex
                computational challenges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section id="timeline" className="fade-in-section px-6 mb-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-12 text-center">
            Event Timeline
          </h2>

          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-600 via-violet-600 to-blue-600"></div>

            {[
              {
                num: "1",
                title: "Registration Opens",
                date: "January 20 — February 5, 2026",
              },
              {
                num: "2",
                title: "Opening Ceremony",
                date: "February 6 • 9:00 AM IST (Virtual)",
              },
              {
                num: "3",
                title: "Hackathon Begins",
                date: "February 6 • 10:00 AM IST",
              },
              {
                num: "4",
                title: "Submission Deadline",
                date: "February 7 • 10:00 AM IST (Sharp)",
              },
              {
                num: "5",
                title: "Results Announcement",
                date: "February 7 • 6:00 PM IST",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`relative mb-8 md:mb-12 flex items-center ${
                  i % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`flex-1 ${
                    i % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"
                  } ml-20 md:ml-0`}
                >
                  <div className="glow-card bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all">
                    <h4 className="text-xl md:text-2xl font-bold mb-2">
                      {item.title}
                    </h4>
                    <p className="text-purple-400 font-semibold">{item.date}</p>
                  </div>
                </div>
                <div className="absolute left-8 md:left-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center font-black text-xl border-4 border-[#0a0a0f] shadow-lg shadow-purple-500/50 md:-translate-x-1/2">
                  {item.num}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rules */}
      <section id="rules" className="fade-in-section px-6 mb-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-4 text-center">
            Rules & Guidelines
          </h2>
          <p className="text-slate-300 text-center mb-12 text-lg">
            Please read carefully. Violations may result in disqualification.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Users className="w-6 h-6" />,
                title: "Eligibility",
                desc: "Open to all students and developers. Participants must be 18+ or have parental consent. Solo or teams up to 4 members.",
                color: "purple",
              },
              {
                icon: <Target className="w-6 h-6" />,
                title: "Original Work",
                desc: "All submissions must be original work created during the hackathon. Pre-existing projects or plagiarism = disqualification.",
                color: "blue",
              },
              {
                icon: <Clock className="w-6 h-6" />,
                title: "Time Limit",
                desc: "You have exactly 24 hours from start. Late submissions will NOT be accepted under any circumstances.",
                color: "violet",
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Technology Stack",
                desc: "Use any programming language, framework, or tool. Open-source libraries permitted. Code must be documented.",
                color: "purple",
              },
              {
                icon: <Github className="w-6 h-6" />,
                title: "Submission Requirements",
                desc: "Must include: GitHub repo (public), README, demo video (3-5 mins), presentation slides (PPT/PDF).",
                color: "blue",
              },
              {
                icon: <Award className="w-6 h-6" />,
                title: "Judging Criteria",
                desc: "Innovation (30%), Technical Implementation (30%), Impact/Usefulness (20%), Presentation (20%).",
                color: "violet",
              },
            ].map((rule, i) => (
              <div
                key={i}
                className={`glow-card group bg-gradient-to-br from-${rule.color}-500/10 to-${rule.color}-500/5 backdrop-blur-sm rounded-2xl p-8 border border-${rule.color}-500/30 hover:border-${rule.color}-500/50 transition-all hover:scale-105`}
              >
                <div
                  className={`text-${rule.color}-400 mb-4 group-hover:scale-110 transition-transform`}
                >
                  {rule.icon}
                </div>
                <h4 className="text-xl font-bold mb-3">{rule.title}</h4>
                <p className="text-slate-300 leading-relaxed">{rule.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prizes */}
      <section id="prizes" className="fade-in-section px-6 mb-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-4 text-center">
            Prizes & Recognition
          </h2>
          <p className="text-slate-300 text-center mb-12 text-lg">
            Compete for exciting prizes and recognition!
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                place: "🥇 1st Place",
                prize: "₹15,000",
                desc: "Cash Prize + Trophy + Certificate + Featured Showcase + LinkedIn Recognition",
                gradient: "from-yellow-500 to-orange-500",
              },
              {
                place: "🥈 2nd Place",
                prize: "₹10,000",
                desc: "Cash Prize + Trophy + Certificate + Project Highlight + LinkedIn Recognition",
                gradient: "from-slate-400 to-slate-500",
              },
              {
                place: "🥉 3rd Place",
                prize: "₹5,000",
                desc: "Cash Prize + Certificate + Project Feature + LinkedIn Recognition",
                gradient: "from-orange-700 to-orange-800",
              },
            ].map((p, i) => (
              <div
                key={i}
                className={`glow-card relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-10 border border-white/20 text-center group hover:scale-105 transition-all ${
                  i === 0 ? "md:-translate-y-4" : ""
                }`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${p.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity`}
                ></div>
                <div className="text-5xl mb-4">{p.place.split(" ")[0]}</div>
                <h3 className="text-2xl font-bold mb-4">
                  {p.place.split(" ").slice(1).join(" ")}
                </h3>
                <div
                  className={`text-5xl md:text-6xl font-black bg-gradient-to-r ${p.gradient} bg-clip-text text-transparent mb-6`}
                >
                  {p.prize}
                </div>
                <p className="text-slate-300 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-full">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span className="text-purple-400 font-semibold text-lg">
                All participants receive digital certificates of participation!
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Submission */}
      <section id="submission" className="fade-in-section px-6 mb-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-4 text-center">
            Submission Guidelines
          </h2>
          <p className="text-slate-300 text-center mb-12 text-lg">
            Ensure your submission is complete to avoid disqualification.
          </p>

          <div className="glow-card bg-gradient-to-br from-purple-500/10 to-blue-500/5 backdrop-blur-sm rounded-3xl p-10 md:p-14 border border-purple-500/30">
            <div className="grid md:grid-cols-2 gap-10 mb-10">
              <div>
                <h4 className="flex items-center gap-3 text-2xl font-bold text-purple-400 mb-6">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                    📦
                  </div>
                  Required Items
                </h4>
                <ul className="space-y-4 text-slate-300">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Public GitHub repository with complete code</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Detailed README.md file with setup instructions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Demo video (3-5 minutes, uploaded to YouTube/Drive)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Presentation slides (PPT or PDF format)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Live deployment link (if applicable)</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="flex items-center gap-3 text-2xl font-bold text-blue-400 mb-6">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    📝
                  </div>
                  Documentation Must Include
                </h4>
                <ul className="space-y-4 text-slate-300">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Project title and team member names</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Problem statement & solution approach</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Technology stack used</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Installation and usage instructions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Screenshots/demos of key features</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <button className="group inline-flex items-center gap-3 btn-shimmer bg-gradient-to-r from-purple-600 via-violet-600 to-blue-600 px-10 py-5 rounded-2xl text-white text-lg font-black shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 hover:scale-105 transition-all">
                <Rocket className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                Submit Your Registration
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="fade-in-section px-6 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="glow-card relative overflow-hidden rounded-3xl p-12 md:p-16 bg-gradient-to-r from-purple-600 via-violet-600 to-blue-600">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
            <div className="relative z-10 text-center space-y-6">
              <h3 className="text-3xl md:text-5xl font-black text-white">
                Ready to code for India?
              </h3>
              <p className="text-xl md:text-2xl text-purple-100 max-w-2xl mx-auto">
                Join CODE4BHARAT and showcase your skills on a national
                platform!
              </p>
              <button
                onClick={() => scrollToSection("submission")}
                className="inline-flex items-center gap-3 bg-white text-purple-600 px-10 py-5 rounded-2xl text-lg font-black shadow-2xl hover:shadow-white/50 hover:scale-105 transition-all"
              >
                Register Now
                <Rocket className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="fade-in-section px-6 mb-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                q: "Who can participate in CODE4BHARAT?",
                a: "All students and developers are welcome! Whether you're a beginner or expert, you can participate solo or in teams of up to 4 members.",
              },
              {
                q: "Is there a registration fee?",
                a: "No! CODE4BHARAT is completely free to participate. Just register and start building.",
              },
              {
                q: "Can I participate without a team?",
                a: "Yes — solo participation is allowed. Use our community platform to find teammates before the event.",
              },
              {
                q: "What if I'm a beginner?",
                a: "Perfect! Mentors will be available during the hackathon to guide you, and it's an excellent learning opportunity.",
              },
              {
                q: "Are there any restrictions on technology?",
                a: "No restrictions! Use any programming language, framework, or tool you prefer. Open-source libraries are permitted.",
              },
              {
                q: "What happens if I submit late?",
                a: "Late submissions will NOT be accepted. Please ensure you submit before February 7, 10:00 AM IST sharp.",
              },
              {
                q: "How will projects be judged?",
                a: "Based on innovation (30%), technical implementation (30%), impact (20%), and presentation quality (20%).",
              },
              {
                q: "Will I get a certificate?",
                a: "Yes! All participants receive digital certificates. Winners get special recognition certificates along with prizes.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="glow-card bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-purple-500/30 transition-all"
              >
                <h4 className="font-bold text-purple-400 text-lg mb-3">
                  {faq.q}
                </h4>
                <p className="text-slate-300 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-500/20 bg-black/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                  <span className="text-xl">🇮🇳</span>
                </div>
                <h3 className="text-2xl font-black bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  CODE4BHARAT
                </h3>
              </div>
              <p className="text-slate-300 mb-6 leading-relaxed">
                Empowering Indian developers to build innovative solutions for
                tomorrow's challenges.
              </p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 flex items-center justify-center transition-all hover:scale-110"
                >
                  💬
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 flex items-center justify-center transition-all hover:scale-110"
                >
                  🔗
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 flex items-center justify-center transition-all hover:scale-110"
                >
                  🐦
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 flex items-center justify-center transition-all hover:scale-110"
                >
                  📷
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-purple-400 mb-6">
                Quick Links
              </h3>
              <ul className="space-y-3 text-slate-300">
                {["about", "domains", "timeline", "rules", "prizes", "faq"].map(
                  (id) => (
                    <li key={id}>
                      <button
                        onClick={() => scrollToSection(id)}
                        className="hover:text-purple-400 transition-colors hover:translate-x-1 inline-block"
                      >
                        → {id[0].toUpperCase() + id.slice(1)}
                      </button>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-purple-400 mb-6">
                Contact Us
              </h3>
              <ul className="text-slate-300 space-y-3">
                <li className="flex items-center gap-2">
                  <span>📧</span>
                  <a
                    href="mailto:info@code4bharat.in"
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    info@code4bharat.in
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <span>📱</span>
                  <a
                    href="mailto:support@code4bharat.in"
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    support@code4bharat.in
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <span>🌐</span>
                  <span>code4bharat.in</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>📍</span>
                  <span>Online (India)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-purple-500/20 pt-8 text-center text-slate-400">
            <p className="mb-2">© 2026 CODE4BHARAT • All Rights Reserved</p>
            <p className="flex items-center justify-center gap-2 flex-wrap">
              Made with <span className="text-red-400">❤️</span> for Indian
              Developers •
              <a href="#" className="text-purple-400 hover:text-purple-300">
                Privacy Policy
              </a>{" "}
              •
              <a href="#" className="text-purple-400 hover:text-purple-300">
                Terms of Service
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
