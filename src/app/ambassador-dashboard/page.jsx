"use client";
import { useState } from "react";
import { Lock, Upload, Calendar, Gift, CheckCircle, Star, Sparkles } from "lucide-react";
import Link from "next/link";

export default function AmbassadorTimeline() {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    { id: 1, label: "Promotion", icon: Upload },
    { id: 2, label: "Seminar", icon: Calendar },
    { id: 3, label: "Rewards", icon: Gift },
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

      {/* Enhanced Step Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full relative z-10">
        {/* STEP 1 - Active */}
        <div className="group bg-white border-2 border-yellow-200 shadow-2xl rounded-3xl p-8 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full -translate-y-16 translate-x-16 opacity-20 group-hover:scale-150 transition-transform duration-700"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xs font-bold text-yellow-600 uppercase tracking-wide">Active</span>
                <h3 className="text-2xl font-black text-gray-800">Step 1: Promotion</h3>
              </div>
            </div>

            <ul className="text-gray-600 space-y-3 mb-6 text-sm">
              <li className="flex items-start gap-2">
                <Star className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                <span>Upload screenshot of the post given by admin</span>
              </li>
              <li className="flex items-start gap-2">
                <Star className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                <span>Must remain posted for 2 days</span>
              </li>
              <li className="flex items-start gap-2">
                <Star className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                <span>Upload section included below</span>
              </li>
            </ul>

            <Link href="/step1">
              <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                <Upload className="w-5 h-5" />
                Upload Screenshot
              </button>
            </Link>
          </div>
        </div>

        {/* STEP 2 - Locked/Unlocked */}
        <div
          className={`group relative rounded-3xl p-8 border-2 shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden
          ${activeStep >= 2 ? "bg-white border-orange-200" : "bg-white/60 border-gray-300"}`}
        >
          {activeStep < 2 && (
            <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-gray-100/80 backdrop-blur-md rounded-3xl flex items-center justify-center z-20">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4 shadow-lg">
                  <Lock size={40} className="text-gray-500" />
                </div>
                <p className="text-gray-700 font-bold text-lg">Locked</p>
                <p className="text-gray-500 text-sm mt-2">Complete Step 1 first</p>
              </div>
            </div>
          )}

          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400 to-red-500 rounded-full -translate-y-16 translate-x-16 opacity-20 group-hover:scale-150 transition-transform duration-700"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
                activeStep >= 2 ? "bg-gradient-to-br from-orange-400 to-red-500" : "bg-gray-300"
              }`}>
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className={`text-xs font-bold uppercase tracking-wide ${
                  activeStep >= 2 ? "text-orange-600" : "text-gray-500"
                }`}>
                  {activeStep >= 2 ? "Available" : "Locked"}
                </span>
                <h3 className="text-2xl font-black text-gray-800">Step 2: Seminar</h3>
              </div>
            </div>

            <ul className="text-gray-600 space-y-3 mb-6 text-sm">
              <li className="flex items-start gap-2">
                <Star className={`w-4 h-4 flex-shrink-0 mt-0.5 ${activeStep >= 2 ? "text-orange-500" : "text-gray-400"}`} />
                <span>Conduct seminar in your college (within 2 months)</span>
              </li>
              <li className="flex items-start gap-2">
                <Star className={`w-4 h-4 flex-shrink-0 mt-0.5 ${activeStep >= 2 ? "text-orange-500" : "text-gray-400"}`} />
                <span>Upload seminar proof</span>
              </li>
              <li className="flex items-start gap-2">
                <Star className={`w-4 h-4 flex-shrink-0 mt-0.5 ${activeStep >= 2 ? "text-orange-500" : "text-gray-400"}`} />
                <span>Coupon code will be generated automatically</span>
              </li>
            </ul>

            <button
              className={`w-full py-4 rounded-2xl font-bold shadow-xl transition-all duration-300 flex items-center justify-center gap-2
              ${
                activeStep >= 2
                  ? "bg-gradient-to-r from-orange-400 to-red-500 text-white hover:scale-105 hover:shadow-2xl"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
            >
              <Upload className="w-5 h-5" />
              Upload Seminar Proof
            </button>
          </div>
        </div>

        {/* STEP 3 - Locked/Unlocked */}
        <div
          className={`group relative rounded-3xl p-8 border-2 shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden
          ${activeStep >= 3 ? "bg-white border-red-200" : "bg-white/60 border-gray-300"}`}
        >
          {activeStep < 3 && (
            <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-gray-100/80 backdrop-blur-md rounded-3xl flex items-center justify-center z-20">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4 shadow-lg">
                  <Lock size={40} className="text-gray-500" />
                </div>
                <p className="text-gray-700 font-bold text-lg">Locked</p>
                <p className="text-gray-500 text-sm mt-2">Complete Step 2 first</p>
              </div>
            </div>
          )}

          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-400 to-pink-500 rounded-full -translate-y-16 translate-x-16 opacity-20 group-hover:scale-150 transition-transform duration-700"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
                activeStep >= 3 ? "bg-gradient-to-br from-red-400 to-pink-500" : "bg-gray-300"
              }`}>
                <Gift className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className={`text-xs font-bold uppercase tracking-wide ${
                  activeStep >= 3 ? "text-red-600" : "text-gray-500"
                }`}>
                  {activeStep >= 3 ? "Available" : "Locked"}
                </span>
                <h3 className="text-2xl font-black text-gray-800">Step 3: Rewards</h3>
              </div>
            </div>

            <ul className="text-gray-600 space-y-3 mb-6 text-sm">
              <li className="flex items-start gap-2">
                <Star className={`w-4 h-4 flex-shrink-0 mt-0.5 ${activeStep >= 3 ? "text-red-500" : "text-gray-400"}`} />
                <span>Get your unique discount coupon</span>
              </li>
              <li className="flex items-start gap-2">
                <Star className={`w-4 h-4 flex-shrink-0 mt-0.5 ${activeStep >= 3 ? "text-red-500" : "text-gray-400"}`} />
                <span>View participant benefits</span>
              </li>
              <li className="flex items-start gap-2">
                <Star className={`w-4 h-4 flex-shrink-0 mt-0.5 ${activeStep >= 3 ? "text-red-500" : "text-gray-400"}`} />
                <span>Access reward dashboard</span>
              </li>
            </ul>

            <button
              className={`w-full py-4 rounded-2xl font-bold shadow-xl transition-all duration-300 flex items-center justify-center gap-2
              ${
                activeStep >= 3
                  ? "bg-gradient-to-r from-red-400 to-pink-500 text-white hover:scale-105 hover:shadow-2xl"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
            >
              <Gift className="w-5 h-5" />
              View Rewards
            </button>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="mt-12 text-center relative z-10">
        <p className="text-gray-600 text-sm mb-3">Your Progress</p>
        <div className="flex items-center gap-2">
          <div className="w-64 h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 transition-all duration-700 rounded-full"
              style={{ width: `${(activeStep / 3) * 100}%` }}
            ></div>
          </div>
          <span className="text-lg font-bold text-gray-700">{activeStep}/3</span>
        </div>
      </div>
    </div>
  );
}