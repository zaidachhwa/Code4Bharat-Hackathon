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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6 border border-yellow-200">
          <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 p-8 text-white">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                <Award className="w-8 h-8" />
              </div>
              <h1 className="text-3xl font-bold">Step 3 - Completion</h1>
            </div>
            <p className="text-yellow-50 text-lg">
              Review your progress, note any remaining actions, and finish your ambassador journey.
            </p>
          </div>

          {/* Status Badges */}
          <div className="px-8 py-6 bg-gradient-to-r from-orange-50 to-yellow-50 border-b border-yellow-200 flex flex-wrap gap-3">
            <span className="px-5 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-semibold rounded-full shadow-md flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Promotion - Completed
            </span>
            <span className="px-5 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-semibold rounded-full shadow-md flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Seminar - Submitted
            </span>
            <span className="px-5 py-2 bg-gradient-to-r from-gray-300 to-gray-400 text-gray-700 text-sm font-semibold rounded-full shadow-md flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Completion - Pending
            </span>
          </div>

          {/* Coupon Code Section */}
          <div className="p-8 space-y-6">
            <div className="bg-gradient-to-br from-yellow-100 via-orange-50 to-amber-100 rounded-2xl p-8 border-2 border-yellow-300 shadow-xl">
              <p className="text-sm font-semibold text-orange-700 mb-4 uppercase tracking-wide">
                🎉 Your active coupon code
              </p>
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-dashed border-orange-300 hover:border-orange-400 transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600 tracking-wider">
                    {userCoupon || "Loading..."}
                  </h2>

                  <button
                    onClick={handleCopy}
                    disabled={!userCoupon}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 shadow-md transition-all duration-300 ${
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
                <p className="text-sm text-gray-600 font-medium">
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
            <div className="flex gap-4 pt-8">
              <button onClick={backDashboard} className="px-8 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-semibold shadow-md hover:shadow-lg">
                Back to dashboard
              </button>
              <button onClick={backHome} className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-xl hover:from-yellow-600 hover:to-orange-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl">
                Finish
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}