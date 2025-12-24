"use client";
import React, { useEffect, useState } from "react";
import { CheckCircle, Clock, Award, Copy, Check } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";




export default function Step3Completion() {
  const [copied, setCopied] = useState(false);
  const [userCoupon, setUserCoupon] = useState("");

  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5002/api";

  // const API_URL = "https://code4bharat-hackathon-backend.onrender.com/api"

  useEffect(() => {
    getCoupenCode();
  }, []);

  const getCoupenCode = async () => {
    try {
      const res = await axios.get(`${API_URL}/ambassador/coupen-code`, {
        withCredentials: true,
      });

      const code = res?.data?.data?.couponCode;
      setUserCoupon(code || "");
      console.log("Coupon Code Retrieved:", code);
    } catch (err) {
      console.log("❌ Error fetching coupon code", err);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(userCoupon);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const backDashboard = () => {
    router.push("/ambassador-dashboard")
  }

  const backHome = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden mb-4 sm:mb-6 border border-yellow-200">
          <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 p-4 sm:p-6 md:p-8 text-white">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="bg-white/20 backdrop-blur-sm p-1.5 sm:p-2 rounded-lg">
                <Award className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight">Step 3 - Completion</h1>
            </div>
            <p className="text-yellow-50 text-sm sm:text-base md:text-lg leading-relaxed">
              Review your progress, note any remaining actions, and finish your ambassador journey.
            </p>
          </div>

          {/* Status Badges */}
          <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 bg-gradient-to-r from-orange-50 to-yellow-50 border-b border-yellow-200 flex flex-wrap gap-2 sm:gap-3">
            <span className="px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs sm:text-sm font-semibold rounded-full shadow-md flex items-center gap-1.5 sm:gap-2">
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="whitespace-nowrap">Promotion - Completed</span>
            </span>
            <span className="px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs sm:text-sm font-semibold rounded-full shadow-md flex items-center gap-1.5 sm:gap-2">
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="whitespace-nowrap">Seminar - Submitted</span>
            </span>
            <span className="px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 bg-gradient-to-r from-gray-300 to-gray-400 text-gray-700 text-xs sm:text-sm font-semibold rounded-full shadow-md flex items-center gap-1.5 sm:gap-2">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="whitespace-nowrap">Completion - Pending</span>
            </span>
          </div>

          {/* Coupon Code Section */}
          <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
            <div className="bg-gradient-to-br from-yellow-100 via-orange-50 to-amber-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-yellow-300 shadow-xl">
              <p className="text-xs sm:text-sm font-semibold text-orange-700 mb-3 sm:mb-4 uppercase tracking-wide">
                🎉 Your active coupon code
              </p>
              <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 shadow-lg border-2 border-dashed border-orange-300 hover:border-orange-400 transition-all duration-300">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-2 sm:mb-3">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600 tracking-wider break-all">
                    {userCoupon || "Loading..."}
                  </h2>

                  <button
                    onClick={handleCopy}
                    disabled={!userCoupon}
                    className={`w-full sm:w-auto px-4 py-2 rounded-lg flex items-center justify-center gap-2 shadow-md transition-all duration-300 font-medium text-sm sm:text-base flex-shrink-0 ${
                      !userCoupon
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600"
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 font-medium">
                  ✨ Valid for participants from your campus seminar.
                </p>
              </div>
            </div>

            {/* Confirmation Message */}
            {/* <div className="bg-orange-50 border-l-4 border-orange-500 rounded-lg p-4 mt-6">
              <p className="text-sm text-orange-800 font-medium">
                💌 You will receive an email confirmation once all steps are approved.
              </p>
            </div> */}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6 md:pt-8">
              <button onClick={backDashboard} className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-semibold shadow-md hover:shadow-lg text-sm sm:text-base">
                Back to dashboard
              </button>
              <button onClick={backHome} className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-xl hover:from-yellow-600 hover:to-orange-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl text-sm sm:text-base">
                Finish
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}