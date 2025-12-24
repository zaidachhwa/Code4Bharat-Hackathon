"use client";

import { useEffect, useState } from "react";
import { Upload, Calendar, Gift, CheckCircle, Star, Sparkles, Lock, Users, Mail, Phone, MapPin, GraduationCap, X } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function AmbassadorTimeline() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showUsersModal, setShowUsersModal] = useState(false);
  const [couponUsers, setCouponUsers] = useState({
    couponCode: "",
    totalUsers: 0,
    users: [],
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5002/api";

  // const API_URL = "https://code4bharat-hackathon-backend.onrender.com/api"

  useEffect(() => {
    getCurrentStep();
    getCoupenCodeUsers();
    getJwtToken();
  }, []);

  const getCurrentStep = async () => {
    try {
      const res = await axios.get(`${API_URL}/ambassador/current-step`, {
        withCredentials: true,
      });
      setActiveStep(res.data.currentStep || 1);
    } catch (err) {
      console.error("Error fetching current step", err);
      setActiveStep(1);
    } finally {
      setLoading(false);
    }
  };

  const getCoupenCodeUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/ambassador-coupen-code-user`, {
        withCredentials: true,
      });
      console.log("Coupen Code Users:", res.data);
      const { couponCode, totalUsers, users } = res.data || {};
      setCouponUsers({
        couponCode: couponCode || "",
        totalUsers: totalUsers || 0,
        users: users || [],
      });
    } catch (err) {
      console.error("Error fetching coupon users", err);
    }
  };


  const getJwtToken = async () => {
    const res = await axios.get(`${API_URL}/jwtauth/checking`, {
      withCredentials: true
    })

    console.log("is JWT Available:",res.data.success)

    if(res.data.success === false){
      router.push("/ambassador-login")
      toast.error("Please login to have access!")
    }
  }

  const steps = [
    { id: 1, label: "Promotion", icon: Upload },
    { id: 2, label: "Seminar", icon: Calendar },
    { id: 3, label: "Onboarding", icon: Gift },
  ];

  const isStepLocked = (stepId) => {
    if (activeStep === null) return true;
    return stepId > activeStep;
  };

  const isStepCompleted = (stepId) => {
    if (activeStep === null) return false;
    return stepId < activeStep;
  };

  const isStepActive = (stepId) => {
    if (activeStep === null) return false;
    return stepId === activeStep;
  };

  const handleCardClick = (stepId) => {
    if (isStepLocked(stepId)) return;

    if (stepId === 1) router.push("/step1");
    if (stepId === 2) router.push("/step2");
    if (stepId === 3) router.push("/step3");
  };

  const getProgressWidth = () => {
    if (activeStep === 1) return "0%";
    if (activeStep === 2) return "50%";
    if (activeStep === 3) return "100%";
    return "0%";
  };

  if (loading || activeStep === null) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
        <p className="text-gray-700 font-semibold">Loading your journey...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 px-6 py-12 flex flex-col items-center relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-700"></div>

      {/* Title Section with Users Button */}
      <div className="text-center mb-12 relative z-10">
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-orange-500 px-6 py-2 rounded-full mb-4 shadow-lg">
          <Sparkles className="w-5 h-5 text-white animate-pulse" />
          <span className="text-white font-bold text-sm uppercase tracking-wide">
            Ambassador Program
          </span>
        </div>
        <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 mb-3">
          Your Journey to Success
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Complete these steps to unlock exclusive rewards and become a campus leader
        </p>
        
        {/* Users Button */}
        {couponUsers.couponCode && (
          <button
            onClick={() => setShowUsersModal(true)}
            className="mt-6 inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all font-bold"
          >
            <Users className="w-5 h-5" />
            <span>View Registered Users ({couponUsers.totalUsers})</span>
          </button>
        )}
      </div>

      {/* Timeline Bar */}
      <div className="flex items-center justify-center w-full max-w-5xl mb-16 relative z-10">
        <div className="absolute top-1/2 left-0 w-full h-[6px] bg-gray-300 -translate-y-1/2 rounded-full shadow-inner"></div>

        <div
          className="absolute top-1/2 left-0 h-[6px] bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 -translate-y-1/2 transition-all duration-700 ease-in-out rounded-full shadow-lg"
          style={{ width: getProgressWidth() }}
        ></div>

        <div className="flex w-full justify-between z-10">
          {steps.map((step) => {
            const Icon = step.icon;
            const locked = isStepLocked(step.id);
            const completed = isStepCompleted(step.id);
            const active = isStepActive(step.id);

            return (
              <div
                key={step.id}
                className={`relative flex flex-col items-center transition-all duration-500 ${
                  active || completed ? "scale-110" : "scale-100"
                }`}
              >
                <div
                  className={`w-16 h-16 flex items-center justify-center rounded-full font-bold shadow-xl border-4 border-white transition-all duration-500
                  ${
                    completed || active
                      ? "bg-gradient-to-br from-yellow-400 to-orange-600 text-white"
                      : "bg-gray-300 text-gray-600"
                  }
                  ${locked ? "opacity-60" : "opacity-100"}`}
                >
                  {completed ? (
                    <CheckCircle className="w-8 h-8" />
                  ) : locked ? (
                    <Lock className="w-8 h-8" />
                  ) : (
                    <Icon className="w-8 h-8" />
                  )}
                </div>
                <span
                  className={`mt-3 font-bold text-sm ${
                    completed || active ? "text-orange-600" : "text-gray-500"
                  }`}
                >
                  {step.label}
                </span>
                {locked && (
                  <span className="mt-1 text-[10px] uppercase tracking-wide text-gray-400">
                    Locked
                  </span>
                )}
                {active && (
                  <span className="mt-1 text-[10px] uppercase tracking-wide text-green-600">
                    Active
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full relative z-10 mb-12">
        {/* STEP 1 */}
        <div
          className={`group bg-white border-2 border-yellow-200 shadow-2xl rounded-3xl p-8 transition-all duration-500 relative overflow-hidden
          ${isStepLocked(1) ? "opacity-70 cursor-not-allowed" : "hover:shadow-3xl hover:-translate-y-2 cursor-pointer"}`}
          onClick={() => handleCardClick(1)}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full -translate-y-16 translate-x-16 opacity-20 group-hover:scale-150 transition-transform duration-700"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Upload className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-xs font-bold text-yellow-600 uppercase tracking-wide">
                  Step 1
                </span>
                <h3 className="text-2xl font-black text-gray-800">Promotion</h3>
                {isStepCompleted(1) && (
                  <p className="text-xs text-green-600 font-semibold mt-1">Completed</p>
                )}
                {isStepActive(1) && !isStepCompleted(1) && (
                  <p className="text-xs text-orange-500 font-semibold mt-1">
                    Currently Active
                  </p>
                )}
              </div>
            </div>

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
                  <span>
                    Keep the post live for <strong>2 days minimum</strong>
                  </span>
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

            <button
              onClick={(e) => {
                e.stopPropagation();
                if (!isStepLocked(1)) router.push("/step1");
              }}
              disabled={isStepLocked(1)}
              className={`w-full py-4 rounded-2xl text-white font-bold shadow-xl flex items-center justify-center gap-2 transition-all duration-300
              ${
                isStepLocked(1)
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:shadow-2xl hover:scale-105"
              }`}
            >
              <Upload className="w-5 h-5" />
              Upload Screenshot
            </button>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">Reward: Unlock Step 2 🎯</p>
            </div>
          </div>
        </div>

        {/* STEP 2 */}
        <div
          className={`group bg-white border-2 border-orange-200 shadow-2xl rounded-3xl p-8 transition-all duration-500 relative overflow-hidden
          ${isStepLocked(2) ? "opacity-70 cursor-not-allowed" : "hover:shadow-3xl hover:-translate-y-2 cursor-pointer"}`}
          onClick={() => handleCardClick(2)}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400 to-red-500 rounded-full -translate-y-16 translate-x-16 opacity-20 group-hover:scale-150 transition-transform duration-700"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Calendar className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-xs font-bold text-orange-600 uppercase tracking-wide">
                  Step 2
                </span>
                <h3 className="text-2xl font-black text-gray-800">Seminar</h3>
                {isStepLocked(2) && (
                  <p className="text-xs text-gray-400 font-semibold mt-1">
                    Complete Step 1 to unlock
                  </p>
                )}
                {isStepCompleted(2) && (
                  <p className="text-xs text-green-600 font-semibold mt-1">Completed</p>
                )}
                {isStepActive(2) && !isStepCompleted(2) && (
                  <p className="text-xs text-orange-500 font-semibold mt-1">
                    Currently Active
                  </p>
                )}
              </div>
            </div>

            <div className="mb-6">
              <p className="text-gray-700 font-semibold mb-3">What you need to do:</p>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span>Organize a seminar/workshop in your college</span>
                </li>
                <li className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span>
                    Timeline: <strong>Within 2 months</strong> of Step 1 completion
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span>Topic:Hackathon & opportunities</span>
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

            <button
              onClick={(e) => {
                e.stopPropagation();
                if (!isStepLocked(2)) router.push("/step2");
              }}
              disabled={isStepLocked(2)}
              className={`w-full py-4 rounded-2xl text-white font-bold shadow-xl flex items-center justify-center gap-2 transition-all duration-300
              ${
                isStepLocked(2)
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-orange-400 to-red-500 hover:shadow-2xl hover:scale-105"
              }`}
            >
              <Upload className="w-5 h-5" />
              Upload Seminar Proof
            </button>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">Reward: Coupon Code + Step 3 🎁</p>
            </div>
          </div>
        </div>

        {/* STEP 3 */}
        <div
          className={`group bg-white border-2 border-red-200 shadow-2xl rounded-3xl p-8 transition-all duration-500 relative overflow-hidden
          ${isStepLocked(3) ? "opacity-70 cursor-not-allowed" : "hover:shadow-3xl hover:-translate-y-2 cursor-pointer"}`}
          onClick={() => handleCardClick(3)}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-400 to-pink-500 rounded-full -translate-y-16 translate-x-16 opacity-20 group-hover:scale-150 transition-transform duration-700"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Gift className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-xs font-bold text-red-600 uppercase tracking-wide">
                  Step 3
                </span>
                <h3 className="text-2xl font-black text-gray-800">Onboarding</h3>
                {isStepLocked(3) && (
                  <p className="text-xs text-gray-400 font-semibold mt-1">
                    Complete Step 2 to unlock
                  </p>
                )}
                {isStepCompleted(3) && (
                  <p className="text-xs text-green-600 font-semibold mt-1">Completed</p>
                )}
                {isStepActive(3) && !isStepCompleted(3) && (
                  <p className="text-xs text-orange-500 font-semibold mt-1">
                    Currently Active
                  </p>
                )}
              </div>
            </div>

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

            <button
              onClick={(e) => {
                e.stopPropagation();
                if (!isStepLocked(3)) router.push("/step3");
              }}
              disabled={isStepLocked(3)}
              className={`w-full py-4 rounded-2xl text-white font-bold shadow-xl flex items-center justify-center gap-2 transition-all duration-300
              ${
                isStepLocked(3)
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-red-400 to-pink-500 hover:shadow-2xl hover:scale-105"
              }`}
            >
              <Gift className="w-5 h-5" />
              View My Dashboard
            </button>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">Final Reward: Full Access 🏆</p>
            </div>
          </div>
        </div>
      </div>

      {/* USERS MODAL */}
      {showUsersModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-gradient-to-br from-white to-orange-50 rounded-3xl shadow-2xl w-full max-w-3xl border-4 border-orange-200 overflow-hidden">
            <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 px-8 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white">Registered Users</h3>
                    {couponUsers.couponCode && (
                      <div className="flex items-center gap-3 mt-1">
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold text-white">
                          {couponUsers.couponCode}
                        </span>
                        <span className="text-white/90 text-sm font-semibold">
                          {couponUsers.totalUsers} users
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setShowUsersModal(false)}
                  className="w-10 h-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl flex items-center justify-center transition-all"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>

            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {couponUsers.users.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 font-medium text-lg">No users registered yet</p>
                  <p className="text-gray-400 text-sm mt-2">
                    Users will appear here once they register with your coupon
                  </p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {couponUsers.users.map((u, i) => (
                    <div
                      key={i}
                      className="group bg-white border-2 border-yellow-100 rounded-2xl p-5 hover:border-orange-300 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                          <span className="text-lg font-black text-white">
                            {u.fullName?.charAt(0) || "?"}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-900 text-lg mb-2">
                            {u.fullName}
                          </h4>
                          <div className="space-y-1.5">
                            <p className="flex items-center gap-2 text-sm text-gray-600">
                              <Mail className="w-4 h-4 text-orange-500 flex-shrink-0" />
                              <span className="truncate">{u.email}</span>
                            </p>
                            {u.phone && (
                              <p className="flex items-center gap-2 text-sm text-gray-600">
                                <Phone className="w-4 h-4 text-orange-500 flex-shrink-0" />
                                <span>{u.phone}</span>
                              </p>
                            )}
                            {u.college && (
                              <p className="flex items-center gap-2 text-sm text-gray-600">
                                <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0" />
                                <span className="truncate">{u.college}</span>
                              </p>
                            )}
                            <div className="flex items-center gap-3 pt-1">
                              {u.course && (
                                <span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-semibold bg-blue-100 text-blue-700">
                                  <GraduationCap className="w-3 h-3 mr-1" />
                                  {u.course}
                                </span>
                              )}
                              {u.year && (
                                <span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-semibold bg-purple-100 text-purple-700">
                                  {u.year}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-300">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Active
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="px-8 py-5 bg-gradient-to-r from-yellow-50 to-orange-50 border-t-2 border-orange-200 flex justify-between items-center">
              <p className="text-sm text-gray-600 font-medium">
                Total: <span className="font-bold text-orange-600">{couponUsers.totalUsers}</span> registered users
              </p>
              <button
                onClick={() => setShowUsersModal(false)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-bold shadow-md hover:shadow-lg hover:scale-105 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}