"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Users, Search, CheckCircle, XCircle, Clock, Mail, Phone,
  MapPin, Calendar, Award, Upload, ArrowLeft, Shield, Copy, Image as ImageIcon
} from "lucide-react";

export default function AmbassadorDetailPage() {
  const { id } = useParams(); // get ambassador ID from URL
  const router = useRouter();

  const [ambassador, setAmbassador] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch ambassador data from backend
  useEffect(() => {
    async function fetchAmbassador() {
      try {
        const res = await fetch(`http://localhost:5000/api/ambassadors/data/${id}`);
        
        const data = await res.json();
        setAmbassador(data.ambassadors || null);
        console.log(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchAmbassador();
  }, [id]);

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!ambassador) return <div className="p-10 text-center text-red-500">Ambassador not found</div>;

  const getStatusColor = (status) => {
    const colors = {
      approved: "bg-green-100 text-green-700 border-green-300",
      pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
      rejected: "bg-red-100 text-red-700 border-red-300",
      locked: "bg-gray-100 text-gray-600 border-gray-300",
    };
    return colors[status] || colors.locked;
  };

  const getStatusIcon = (status) => {
    const icons = {
      approved: <CheckCircle className="w-4 h-4" />,
      pending: <Clock className="w-4 h-4" />,
      rejected: <XCircle className="w-4 h-4" />,
      locked: <Shield className="w-4 h-4" />,
    };
    return icons[status] || icons.locked;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 p-6">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => router.push("/admin-logged")}
          className="mb-6 flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-md hover:shadow-lg transition-all text-gray-700 font-medium"
        >
          <ArrowLeft className="w-5 h-5" /> Back to List
        </button>

        {/* Profile Header + Steps */}
        <div className="bg-white rounded-3xl shadow-2xl border-2 border-yellow-200 p-8 mb-6">
          <div className="flex items-start justify-between flex-wrap gap-6">
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-3xl font-black text-white">{ambassador.fullName?.charAt(0)}</span>
              </div>
              <div>
                <h1 className="text-3xl font-black text-gray-900 mb-3">{ambassador.fullName}</h1>
                <div className="space-y-2 text-sm text-gray-600">
                  <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-yellow-600" /> {ambassador.email}</p>
                  <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-yellow-600" /> {ambassador.phone}</p>
                  <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-yellow-600" /> {ambassador.college}, {ambassador.city}</p>
                  <p className="flex items-center gap-2"><Calendar className="w-4 h-4 text-yellow-600" /> Registered: {new Date(ambassador.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Step 1 - Promotion */}
          <div className="bg-white rounded-3xl shadow-xl border-2 border-yellow-200 p-8 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Upload className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-gray-900">
                    Step 1: Promotion
                  </h2>
                  <p className="text-sm text-gray-600">
                    Social media verification
                  </p>
                </div>
              </div>
              <div
                className={`px-4 py-2 rounded-xl border-2 font-bold text-sm flex items-center gap-2 ${getStatusColor(
                  ambassador.task?.promotion?.status
                )}`}
              >
                {getStatusIcon(ambassador.task?.promotion?.status)}
                {ambassador.task?.promotion?.status?.toUpperCase()}
              </div>
            </div>
            {ambassador.task?.promotion?.submittedAt ? (
              <>
                <div className="grid md:grid-cols-4 gap-4 mb-6">
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <p className="text-xs font-bold text-blue-700 mb-1">
                      SUBMITTED ON
                    </p>
                    <p className="text-sm text-blue-900 font-semibold">
                      {new Date(
                        ambassador.task.promotion.submittedAt
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                    <p className="text-xs font-bold text-purple-700 mb-1">
                      SCREENSHOTS
                    </p>
                    <p className="text-sm text-purple-900 font-semibold">
                      {ambassador.task.promotion.screenshots?.length || 0} files
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                    <p className="text-xs font-bold text-green-700 mb-1">
                      DAY 1
                    </p>
                    <p className="text-sm text-green-900 font-semibold">
                      {ambassador.task.promotion.day1Confirmed
                        ? "✓ Confirmed"
                        : "✗ Not confirmed"}
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                    <p className="text-xs font-bold text-green-700 mb-1">
                      DAY 2
                    </p>
                    <p className="text-sm text-green-900 font-semibold">
                      {ambassador.task.promotion.day2Confirmed
                        ? "✓ Confirmed"
                        : "✗ Not confirmed"}
                    </p>
                  </div>
                </div>
                {ambassador.task.promotion.screenshots?.length > 0 && (
                  <div className="mb-6">
                    <p className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-yellow-600" />
                      Uploaded Screenshots (
                      {ambassador.task.promotion.screenshots.length})
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {ambassador.task.promotion.screenshots.map((img, idx) => (
                        <div
                          key={idx}
                          className="aspect-square bg-gray-100 rounded-xl border-2 border-gray-200 flex items-center justify-center hover:border-yellow-400 transition-all cursor-pointer group"
                        >
                          <div className="text-center">
                            <ImageIcon className="w-12 h-12 text-gray-400 group-hover:text-yellow-500 transition-colors mx-auto mb-2" />
                            <p className="text-xs text-gray-500">
                              Screenshot {idx + 1}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {ambassador.task.promotion.status === "pending" && (
                  <div className="flex gap-3">
                    <button
                      onClick={() =>
                        handlePromotionAction(ambassador._id, "approve")
                      }
                      className="flex-1 py-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Approve & Unlock Step 2
                    </button>
                    <button
                      onClick={() =>
                        handlePromotionAction(ambassador._id, "reject")
                      }
                      className="flex-1 py-3 bg-gradient-to-r from-red-400 to-rose-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                    >
                      <XCircle className="w-5 h-5" />
                      Reject Step 1
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8">
                <Clock className="w-16 h-16 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">No submission yet</p>
              </div>
            )}
          </div>

          {/* Step 2 - Seminar */}
          <div className="bg-white rounded-3xl shadow-xl border-2 border-orange-200 p-8 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${
                    ambassador.task?.seminar?.status === "locked"
                      ? "bg-gray-300"
                      : "bg-gradient-to-br from-orange-400 to-red-500"
                  }`}
                >
                  <Calendar className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-gray-900">
                    Step 2: Seminar
                  </h2>
                  <p className="text-sm text-gray-600">
                    Campus workshop verification
                  </p>
                </div>
              </div>
              <div
                className={`px-4 py-2 rounded-xl border-2 font-bold text-sm flex items-center gap-2 ${getStatusColor(
                  ambassador.task?.seminar?.status
                )}`}
              >
                {getStatusIcon(ambassador.task?.seminar?.status)}
                {ambassador.task?.seminar?.status?.toUpperCase()}
              </div>
            </div>
            {ambassador.task?.seminar?.status !== "locked" &&
            ambassador.task?.seminar?.submittedAt ? (
              <>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <p className="text-xs font-bold text-blue-700 mb-1">
                      SEMINAR TITLE
                    </p>
                    <p className="text-sm text-blue-900 font-semibold">
                      {ambassador.task.seminar.seminarTitle}
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                    <p className="text-xs font-bold text-purple-700 mb-1">
                      DATE
                    </p>
                    <p className="text-sm text-purple-900 font-semibold">
                      {new Date(
                        ambassador.task.seminar.seminarDate
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                    <p className="text-xs font-bold text-green-700 mb-1">
                      PARTICIPANTS
                    </p>
                    <p className="text-sm text-green-900 font-semibold">
                      {ambassador.task.seminar.participants} students
                    </p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
                    <p className="text-xs font-bold text-orange-700 mb-1">
                      PROOF FILES
                    </p>
                    <p className="text-sm text-orange-900 font-semibold">
                      {ambassador.task.seminar.uploadedProof?.length || 0} uploaded
                    </p>
                  </div>
                </div>

                {ambassador.task.seminar.uploadedProof?.length > 0 && (
                  <div className="mb-6">
                    <p className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-orange-600" />
                      Uploaded Seminar Proof (
                      {ambassador.task.seminar.uploadedProof.length})
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {ambassador.task.seminar.uploadedProof.map((img, idx) => (
                        <div
                          key={idx}
                          className="aspect-square bg-gray-100 rounded-xl border-2 border-gray-200 flex items-center justify-center hover:border-orange-400 transition-all cursor-pointer group"
                        >
                          <div className="text-center">
                            <ImageIcon className="w-12 h-12 text-gray-400 group-hover:text-orange-500 transition-colors mx-auto mb-2" />
                            <p className="text-xs text-gray-500">
                              Proof {idx + 1}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {ambassador.task.seminar.couponCode && (
                  <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-300 mb-6">
                    <p className="text-xs font-bold text-purple-700 mb-2 flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      GENERATED COUPON CODE
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-mono">
                        {ambassador.task.seminar.couponCode}
                      </p>
                      <button className="px-4 py-2 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition-colors flex items-center gap-2">
                        <Copy className="w-4 h-4" />
                        Copy
                      </button>
                    </div>
                    <p className="text-xs text-purple-600 mt-2">
                      Generated on:{" "}
                      {new Date(
                        ambassador.task.seminar.couponGeneratedAt
                      ).toLocaleDateString()}
                    </p>
                  </div>
                )}
                {ambassador.task.seminar.status === "pending" && (
                  <div className="flex gap-3">
                    <button
                      onClick={() =>
                        handleSeminarAction(ambassador._id, "approve")
                      }
                      className="flex-1 py-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Approve & Generate Coupon
                    </button>
                    <button
                      onClick={() =>
                        handleSeminarAction(ambassador._id, "reject")
                      }
                      className="flex-1 py-3 bg-gradient-to-r from-red-400 to-rose-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                    >
                      <XCircle className="w-5 h-5" />
                      Reject Step 2
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8">
                <Shield className="w-16 h-16 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">
                  {ambassador.task?.seminar?.status === "locked"
                    ? "Step 2 is locked. Approve Step 1 first."
                    : "No submission yet"}
                </p>
              </div>
            )}
          </div>

          {/* Step 3 - Onboarding */}
          <div className="bg-white rounded-3xl shadow-xl border-2 border-red-200 p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${
                    ambassador.task?.onboarding?.status === "completed"
                      ? "bg-gradient-to-br from-green-400 to-emerald-500"
                      : ambassador.task?.onboarding?.status === "locked"
                      ? "bg-gray-300"
                      : "bg-gradient-to-br from-red-400 to-pink-500"
                  }`}
                >
                  <Award className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-gray-900">
                    Step 3: Onboarding
                  </h2>
                  <p className="text-sm text-gray-600">
                    Final completion & rewards
                  </p>
                </div>
              </div>
              <div
                className={`px-4 py-2 rounded-xl border-2 font-bold text-sm flex items-center gap-2 ${getStatusColor(
                  ambassador.task?.onboarding?.status
                )}`}
              >
                {getStatusIcon(ambassador.task?.onboarding?.status)}
                {ambassador.task?.onboarding?.status?.toUpperCase()}
              </div>
            </div>
            <div className="text-center py-8">
              {ambassador.task?.onboarding?.status === "completed" ? (
                <>
                  <Award className="w-16 h-16 text-green-500 mx-auto mb-3" />
                  <p className="text-green-700 font-bold text-lg">
                    Ambassador journey completed! 🎉
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    Completed on:{" "}
                    {new Date(
                      ambassador.task.onboarding.completedAt
                    ).toLocaleDateString()}
                  </p>
                </>
              ) : ambassador.task?.onboarding?.status === "locked" ? (
                <>
                  <Shield className="w-16 h-16 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500 font-medium">
                    Step 3 is locked. Approve Step 2 first.
                  </p>
                </>
              ) : (
                <>
                  <Clock className="w-16 h-16 text-yellow-500 mx-auto mb-3" />
                  <p className="text-yellow-700 font-medium">
                    Ambassador can now access rewards dashboard
                  </p>
                </>
              )}
            </div>

            <div className="mt-4 grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                <p className="text-xs font-bold text-yellow-700 mb-1">
                  CURRENT STEP
                </p>
                <p className="text-sm text-yellow-900 font-semibold">
                  Step {ambassador.task?.currentStep}/3
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <p className="text-xs font-bold text-blue-700 mb-1">
                  LOGIN STATUS
                </p>
                <p className="text-sm text-blue-900 font-semibold">
                  {ambassador.isApproved ? "Login Approved" : "Login Blocked"}
                </p>
              </div>
              <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                <p className="text-xs font-bold text-red-700 mb-1">
                  ONBOARDING STATUS
                </p>
                <p className="text-sm text-red-900 font-semibold">
                  {ambassador.task?.onboarding?.status === "completed"
                    ? `Completed on ${new Date(
                        ambassador.task.onboarding.completedAt
                      ).toLocaleDateString()}`
                    : ambassador.task?.onboarding?.status === "locked"
                    ? "Waiting for Step 2 approval"
                    : "In progress"}
                </p>
              </div>
            </div>
          </div>

      </div>
    </div>
  );
}
