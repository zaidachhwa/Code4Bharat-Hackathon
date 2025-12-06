"use client";
import { useState } from "react";
import { Upload, Calendar, Gift, CheckCircle, Star, Sparkles, Zap, Award, Clock, Image as ImageIcon, Users, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AmbassadorTimeline() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    { id: 1, label: "Promotion", icon: Upload },
    { id: 2, label: "Seminar", icon: Calendar },
    { id: 3, label: "Onboarding", icon: Gift },
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 px-6 py-12 flex flex-col items-center relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-700"></div>
      
      {/* Title Section */}
      <div className="text-center mb-12 relative z-10">
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-orange-500 px-6 py-2 rounded-full mb-4 shadow-lg">
          <Sparkles className="w-5 h-5 text-white animate-pulse" />
          <span className="text-white font-bold text-sm uppercase tracking-wide">Ambassador Program</span>
        </div>
        <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 mb-3">
          Your Journey to Success
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Complete these steps to unlock exclusive rewards and become a campus leader
        </p>
      </div>

      {/* Enhanced Timeline Bar */}
      <div className="flex items-center justify-center w-full max-w-5xl mb-16 relative z-10">
        <div className="absolute top-1/2 left-0 w-full h-[6px] bg-gray-300 -translate-y-1/2 rounded-full shadow-inner"></div>

        {/* Progress Line with Gradient */}
        <div
          className="absolute top-1/2 left-0 h-[6px] bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 -translate-y-1/2 transition-all duration-700 ease-in-out rounded-full shadow-lg"
          style={{
            width:
              activeStep === 1
                ? "0%"
                : activeStep === 2
                ? "50%"
                : "100%",
          }}
        ></div>

        {/* Step Dots with Icons */}
        <div className="flex w-full justify-between z-10">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                className={`relative flex flex-col items-center transition-all duration-500 ${
                  activeStep >= step.id ? "scale-110" : "scale-100"
                }`}
              >
                <div
                  className={`w-16 h-16 flex items-center justify-center rounded-full font-bold shadow-xl border-4 border-white transition-all duration-500
                  ${
                    activeStep >= step.id
                      ? "bg-gradient-to-br from-yellow-400 to-orange-600 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {activeStep > step.id ? (
                    <CheckCircle className="w-8 h-8" />
                  ) : (
                    <Icon className="w-8 h-8" />
                  )}
                </div>
                <span
                  className={`mt-3 font-bold text-sm ${
                    activeStep >= step.id ? "text-orange-600" : "text-gray-500"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ALL STEPS UNLOCKED - Enhanced Step Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full relative z-10 mb-12">
        
        {/* ==================== STEP 1 - PROMOTION ==================== */}
        <div className="group bg-white border-2 border-yellow-200 shadow-2xl rounded-3xl p-8 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full -translate-y-16 translate-x-16 opacity-20 group-hover:scale-150 transition-transform duration-700"></div>
          
          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Upload className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-xs font-bold text-yellow-600 uppercase tracking-wide">Step 1</span>
                <h3 className="text-2xl font-black text-gray-800">Promotion</h3>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-gray-700 font-semibold mb-3">What you need to do:</p>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <span>Get the promotional post from admin</span>
                </li>
                <li className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <span>Share it on your social media (Instagram/WhatsApp Status)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <span>Keep the post live for <strong>2 days minimum</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <span>Take screenshots showing your post is live</span>
                </li>
                <li className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <span>Upload multiple screenshots as proof</span>
                </li>
              </ul>
            </div>

            {/* What Admin Will Do */}
            <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-xs font-bold text-blue-700 uppercase mb-2 flex items-center gap-2">
                <Award className="w-4 h-4" />
                Admin Action
              </p>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Review your screenshots</li>
                <li>• Verify post was live for 2 days</li>
                <li>• Approve and unlock Step 2</li>
              </ul>
            </div>

            {/* Fields in Database */}
            <div className="mb-6 p-4 bg-purple-50 rounded-xl border border-purple-200">
              <p className="text-xs font-bold text-purple-700 uppercase mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Database Fields
              </p>
              <div className="text-xs text-purple-800 space-y-1 font-mono">
                <p>• promotion.completed: false</p>
                <p>• promotion.images: ["url1", "url2"]</p>
                <p>• promotion.submittedAt: Date</p>
                <p>• promotion.approvedAt: null</p>
              </div>
            </div>

            {/* Action Button */}
            <button 
              onClick={() => router.push("/step1")}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            >
              <Upload className="w-5 h-5" />
              Upload Screenshot
            </button>

            {/* Reward Info */}
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">Reward: Unlock Step 2 🎯</p>
            </div>
          </div>
        </div>

        {/* ==================== STEP 2 - SEMINAR ==================== */}
        <div className="group bg-white border-2 border-orange-200 shadow-2xl rounded-3xl p-8 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400 to-red-500 rounded-full -translate-y-16 translate-x-16 opacity-20 group-hover:scale-150 transition-transform duration-700"></div>

          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Calendar className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-xs font-bold text-orange-600 uppercase tracking-wide">Step 2</span>
                <h3 className="text-2xl font-black text-gray-800">Seminar</h3>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-gray-700 font-semibold mb-3">What you need to do:</p>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span>Organize a seminar/workshop in your college</span>
                </li>
                <li className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span>Timeline: <strong>Within 2 months</strong> of Step 1 completion</span>
                </li>
                <li className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span>Topic: InnovateX Hackathon & opportunities</span>
                </li>
                <li className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span>Take photos/videos during the seminar</span>
                </li>
                <li className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span>Get attendance sheet or participant list</span>
                </li>
                <li className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span>Upload proof (photos, videos, attendance)</span>
                </li>
              </ul>
            </div>

            {/* What Admin Will Do */}
            <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-xs font-bold text-blue-700 uppercase mb-2 flex items-center gap-2">
                <Award className="w-4 h-4" />
                Admin Action
              </p>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Verify seminar was conducted</li>
                <li>• Check quality of engagement</li>
                <li>• Generate unique coupon code</li>
                <li>• Unlock Step 3 & Rewards</li>
              </ul>
            </div>

            {/* Fields in Database */}
            <div className="mb-6 p-4 bg-purple-50 rounded-xl border border-purple-200">
              <p className="text-xs font-bold text-purple-700 uppercase mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Database Fields
              </p>
              <div className="text-xs text-purple-800 space-y-1 font-mono">
                <p>• seminar.completed: false</p>
                <p>• seminar.proof: "url"</p>
                <p>• seminar.submittedAt: Date</p>
                <p>• seminar.approvedAt: null</p>
                <p>• seminar.unlocked: false</p>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => router.push("/step2")}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-400 to-red-500 text-white font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            >
              <Upload className="w-5 h-5" />
              Upload Seminar Proof
            </button>

            {/* Reward Info */}
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">Reward: Coupon Code + Step 3 🎁</p>
            </div>
          </div>
        </div>

        {/* ==================== STEP 3 - ONBOARDING & REWARDS ==================== */}
        <div className="group bg-white border-2 border-red-200 shadow-2xl rounded-3xl p-8 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-400 to-pink-500 rounded-full -translate-y-16 translate-x-16 opacity-20 group-hover:scale-150 transition-transform duration-700"></div>

          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Gift className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-xs font-bold text-red-600 uppercase tracking-wide">Step 3</span>
                <h3 className="text-2xl font-black text-gray-800">Onboarding</h3>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-gray-700 font-semibold mb-3">What you get:</p>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>Your unique discount coupon code</span>
                </li>
                <li className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>Share coupon with students to get discounts</span>
                </li>
                <li className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>Track how many people used your coupon</span>
                </li>
                <li className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>View your impact and statistics</span>
                </li>
                <li className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>Access exclusive ambassador benefits</span>
                </li>
                <li className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>Certificate of recognition</span>
                </li>
              </ul>
            </div>

            {/* Coupon Preview */}
            <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-300">
              <p className="text-xs font-bold text-purple-700 uppercase mb-2 flex items-center gap-2">
                <Gift className="w-4 h-4" />
                Your Coupon Code
              </p>
              <div className="bg-white rounded-lg p-3 border-2 border-dashed border-purple-300">
                <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 text-center">
                  INNOVATE2024XYZ
                </p>
                <p className="text-xs text-center text-gray-500 mt-1">Example: Generated after Step 2</p>
              </div>
            </div>

            {/* Fields in Database */}
            <div className="mb-6 p-4 bg-purple-50 rounded-xl border border-purple-200">
              <p className="text-xs font-bold text-purple-700 uppercase mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Database Fields
              </p>
              <div className="text-xs text-purple-800 space-y-1 font-mono">
                <p>• onboarding.completed: true</p>
                <p>• onboarding.couponCode: "CODE"</p>
                <p>• onboarding.approvedAt: Date</p>
                <p>• onboarding.unlocked: false</p>
                <p>• isFullyCompleted: true</p>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => router.push("/step3")}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-400 to-pink-500 text-white font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            >
              <Gift className="w-5 h-5" />
              View My Dashboard
            </button>

            {/* Reward Info */}
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">Final Reward: Full Access 🏆</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}