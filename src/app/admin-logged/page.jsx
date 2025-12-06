"use client";
import { useState } from "react";
import {
  Users, Search, CheckCircle, XCircle, Clock, Eye, Mail, Phone,
  MapPin, Calendar, Award, Upload, ArrowLeft, Shield, Copy, Image as ImageIcon,
  UserCheck
} from "lucide-react";

function Page() {
  // Initial data
  const initialAmbassadors = [
    {
      _id: "1",
      name: "Rahul Sharma",
      email: "rahul@college.edu",
      phone: "+91 98765 43210",
      college: "IIT Delhi",
      city: "New Delhi",
      registeredAt: "2024-01-15",
      isApproved: false,
      rejected: false,
      task: {
        currentStep: 2,
        promotion: {
          status: "approved",
          screenshots: ["img1.jpg", "img2.jpg"],
          submittedAt: "2024-01-20",
          day1Confirmed: true,
          day2Confirmed: true,
        },
        seminar: {
          status: "pending",
          college: "IIT Delhi",
          seminarTitle: "InnovateX Workshop",
          seminarDate: "2024-02-15",
          participants: 150,
          uploadedProof: ["proof1.jpg"],
          submittedAt: "2024-02-16",
          couponCode: null
        },
        onboarding: { status: "locked" }
      }
    },
    {
      _id: "2",
      name: "Priya Patel",
      email: "priya@university.edu",
      phone: "+91 87654 32109",
      college: "Mumbai University",
      city: "Mumbai",
      registeredAt: "2024-01-18",
      isApproved: false,
      rejected: false,
      task: {
        currentStep: 1,
        promotion: {
          status: "pending",
          screenshots: ["img3.jpg"],
          submittedAt: "2024-01-25",
          day1Confirmed: true,
          day2Confirmed: true,
        },
        seminar: { status: "locked" },
        onboarding: { status: "locked" }
      }
    },
    {
      _id: "3",
      name: "Arjun Singh",
      email: "arjun@tech.edu",
      phone: "+91 76543 21098",
      college: "NIT Trichy",
      city: "Tiruchirappalli",
      registeredAt: "2024-01-22",
      isApproved: true,
      rejected: false,
      task: {
        currentStep: 3,
        promotion: {
          status: "approved",
          screenshots: ["img4.jpg"],
          submittedAt: "2024-01-28",
          day1Confirmed: true,
          day2Confirmed: true
        },
        seminar: {
          status: "approved",
          college: "NIT Trichy",
          seminarTitle: "Career Workshop",
          seminarDate: "2024-03-01",
          participants: 200,
          uploadedProof: ["proof2.jpg"],
          submittedAt: "2024-03-02",
          couponCode: "INNOVATE2024ABC",
          couponGeneratedAt: "2024-03-05"
        },
        onboarding: { status: "completed", completedAt: "2024-03-10" }
      }
    }
  ];

  // STATE
  const [ambassadors, setAmbassadors] = useState(initialAmbassadors);
  const [view, setView] = useState("list");
  const [selectedAmbassador, setSelectedAmbassador] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Derived filtered list – single table
  let filteredAmbassadors = ambassadors;

  if (searchTerm.trim()) {
    const term = searchTerm.toLowerCase();
    filteredAmbassadors = filteredAmbassadors.filter(
      (a) =>
        a.name.toLowerCase().includes(term) ||
        a.email.toLowerCase().includes(term) ||
        a.college.toLowerCase().includes(term)
    );
  }

  if (filterStatus === "approved") {
    filteredAmbassadors = filteredAmbassadors.filter((a) => a.isApproved && !a.rejected);
  } else if (filterStatus === "pending") {
    filteredAmbassadors = filteredAmbassadors.filter((a) => !a.isApproved && !a.rejected);
  } else if (filterStatus === "rejected") {
    filteredAmbassadors = filteredAmbassadors.filter((a) => a.rejected);
  } else if (filterStatus === "completed") {
    filteredAmbassadors = filteredAmbassadors.filter(
      (a) => a.task?.onboarding?.status === "completed"
    );
  }

  // HELPERS

  const updateAmbassador = (id, updater) => {
    setAmbassadors((prev) =>
      prev.map((a) => (a._id === id ? { ...a, ...updater(a) } : a))
    ); // standard way to update an item in a list in React state [web:83][web:86]
  };

  const handlePromotionAction = (ambassadorId, action) => {
    alert(
      `Promotion ${action}d successfully! ${
        action === "approve" ? "Step 2 unlocked." : ""
      }`
    );
    updateAmbassador(ambassadorId, (a) => ({
      task: {
        ...a.task,
        promotion: {
          ...a.task.promotion,
          status: action === "approve" ? "approved" : "rejected"
        }
      }
    }));
  };

  const handleSeminarAction = (ambassadorId, action) => {
    alert(
      `Seminar ${action}d! ${
        action === "approve" ? "Coupon code generated & Step 3 unlocked." : ""
      }`
    );
    updateAmbassador(ambassadorId, (a) => ({
      task: {
        ...a.task,
        seminar: {
          ...a.task.seminar,
          status: action === "approve" ? "approved" : "rejected"
        }
      }
    }));
  };

  const toggleLoginAccess = (ambassadorId, currentStatus) => {
    alert(
      `Login access ${!currentStatus ? "GRANTED" : "REVOKED"} for ambassador!`
    );
    updateAmbassador(ambassadorId, () => ({
      isApproved: !currentStatus
    }));
  };

  // GLOBAL upload for promotion assets (same for all ambassadors)
  const handleGlobalPromotionUpload = (fileList) => {
    const files = Array.from(fileList || []);
    if (!files.length) return;
    alert(`Uploading ${files.length} promotion asset(s) for all ambassadors`);
  };

  // Approve / Reject ambassador (login + status)
  const handleApproveAmbassador = (id) => {
    updateAmbassador(id, () => ({
      isApproved: true,
      rejected: false
    }));
    alert("Ambassador approved and can now login.");
  };

  const handleRejectAmbassador = (id) => {
    updateAmbassador(id, () => ({
      isApproved: false,
      rejected: true
    }));
    alert("Ambassador rejected.");
  };

  const viewDetails = (ambassador) => {
    setSelectedAmbassador(ambassador);
    setView("detail");
  };

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

  const getApprovalLabel = (a) => {
    if (a.rejected) return "Rejected";
    if (a.isApproved) return "Login Approved";
    return "Pending Approval";
  };

  const getApprovalBadgeClasses = (a) => {
    if (a.rejected) return "bg-red-100 text-red-700";
    if (a.isApproved) return "bg-green-100 text-green-700";
    return "bg-yellow-100 text-yellow-700";
  };

  // Detail View (kept as before, using same design)
  if (view === "detail" && selectedAmbassador) {
    const a =
      ambassadors.find((x) => x._id === selectedAmbassador._id) ||
      selectedAmbassador;

    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 p-6">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => setView("list")}
            className="mb-6 flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-md hover:shadow-lg transition-all text-gray-700 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to List
          </button>

          {/* Profile Header */}
          <div className="bg-white rounded-3xl shadow-2xl border-2 border-yellow-200 p-8 mb-6">
            <div className="flex items-start justify-between flex-wrap gap-6">
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-3xl font-black text-white">
                    {a.name?.charAt(0)}
                  </span>
                </div>
                <div>
                  <h1 className="text-3xl font-black text-gray-900 mb-3">
                    {a.name}
                  </h1>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-yellow-600" />
                      {a.email}
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-yellow-600" />
                      {a.phone}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-yellow-600" />
                      {a.college}, {a.city}
                    </p>
                    <p className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-yellow-600" />
                      Registered:{" "}
                      {new Date(a.registeredAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 mb-2 font-semibold">
                  Login Access Control
                </p>
                <button
                  onClick={() =>
                    toggleLoginAccess(a._id, a.isApproved)
                  }
                  className={`px-6 py-3 rounded-xl font-bold shadow-lg transition-all hover:scale-105 ${
                    a.isApproved
                      ? "bg-gradient-to-r from-green-400 to-emerald-500"
                      : "bg-gradient-to-r from-red-400 to-rose-500"
                  } text-white`}
                >
                  {a.isApproved ? "✓ Login Approved" : "✗ Login Blocked"}
                </button>
                <p className="text-xs text-gray-500 mt-2">
                  {a.isApproved
                    ? "Ambassador can login"
                    : "Ambassador cannot login"}
                </p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-bold text-gray-700">
                  Overall Progress
                </p>
                <p className="text-sm font-bold text-yellow-600">
                  Step {a.task?.currentStep}/3
                </p>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 transition-all"
                  style={{
                    width: `${(a.task?.currentStep / 3) * 100}%`,
                  }}
                ></div>
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
                  a.task?.promotion?.status
                )}`}
              >
                {getStatusIcon(a.task?.promotion?.status)}
                {a.task?.promotion?.status?.toUpperCase()}
              </div>
            </div>
            {a.task?.promotion?.submittedAt ? (
              <>
                <div className="grid md:grid-cols-4 gap-4 mb-6">
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <p className="text-xs font-bold text-blue-700 mb-1">
                      SUBMITTED ON
                    </p>
                    <p className="text-sm text-blue-900 font-semibold">
                      {new Date(
                        a.task.promotion.submittedAt
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                    <p className="text-xs font-bold text-purple-700 mb-1">
                      SCREENSHOTS
                    </p>
                    <p className="text-sm text-purple-900 font-semibold">
                      {a.task.promotion.screenshots?.length || 0} files
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                    <p className="text-xs font-bold text-green-700 mb-1">
                      DAY 1
                    </p>
                    <p className="text-sm text-green-900 font-semibold">
                      {a.task.promotion.day1Confirmed
                        ? "✓ Confirmed"
                        : "✗ Not confirmed"}
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                    <p className="text-xs font-bold text-green-700 mb-1">
                      DAY 2
                    </p>
                    <p className="text-sm text-green-900 font-semibold">
                      {a.task.promotion.day2Confirmed
                        ? "✓ Confirmed"
                        : "✗ Not confirmed"}
                    </p>
                  </div>
                </div>
                {a.task.promotion.screenshots?.length > 0 && (
                  <div className="mb-6">
                    <p className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-yellow-600" />
                      Uploaded Screenshots (
                      {a.task.promotion.screenshots.length})
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {a.task.promotion.screenshots.map((img, idx) => (
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
                {a.task.promotion.status === "pending" && (
                  <div className="flex gap-3">
                    <button
                      onClick={() =>
                        handlePromotionAction(a._id, "approve")
                      }
                      className="flex-1 py-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Approve & Unlock Step 2
                    </button>
                    <button
                      onClick={() =>
                        handlePromotionAction(a._id, "reject")
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
                    a.task?.seminar?.status === "locked"
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
                  a.task?.seminar?.status
                )}`}
              >
                {getStatusIcon(a.task?.seminar?.status)}
                {a.task?.seminar?.status?.toUpperCase()}
              </div>
            </div>
            {a.task?.seminar?.status !== "locked" &&
            a.task?.seminar?.submittedAt ? (
              <>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <p className="text-xs font-bold text-blue-700 mb-1">
                      SEMINAR TITLE
                    </p>
                    <p className="text-sm text-blue-900 font-semibold">
                      {a.task.seminar.seminarTitle}
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                    <p className="text-xs font-bold text-purple-700 mb-1">
                      DATE
                    </p>
                    <p className="text-sm text-purple-900 font-semibold">
                      {new Date(
                        a.task.seminar.seminarDate
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                    <p className="text-xs font-bold text-green-700 mb-1">
                      PARTICIPANTS
                    </p>
                    <p className="text-sm text-green-900 font-semibold">
                      {a.task.seminar.participants} students
                    </p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
                    <p className="text-xs font-bold text-orange-700 mb-1">
                      PROOF FILES
                    </p>
                    <p className="text-sm text-orange-900 font-semibold">
                      {a.task.seminar.uploadedProof?.length || 0} uploaded
                    </p>
                  </div>
                </div>

                {a.task.seminar.uploadedProof?.length > 0 && (
                  <div className="mb-6">
                    <p className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-orange-600" />
                      Uploaded Seminar Proof (
                      {a.task.seminar.uploadedProof.length})
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {a.task.seminar.uploadedProof.map((img, idx) => (
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

                {a.task.seminar.couponCode && (
                  <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-300 mb-6">
                    <p className="text-xs font-bold text-purple-700 mb-2 flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      GENERATED COUPON CODE
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-mono">
                        {a.task.seminar.couponCode}
                      </p>
                      <button className="px-4 py-2 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition-colors flex items-center gap-2">
                        <Copy className="w-4 h-4" />
                        Copy
                      </button>
                    </div>
                    <p className="text-xs text-purple-600 mt-2">
                      Generated on:{" "}
                      {new Date(
                        a.task.seminar.couponGeneratedAt
                      ).toLocaleDateString()}
                    </p>
                  </div>
                )}
                {a.task.seminar.status === "pending" && (
                  <div className="flex gap-3">
                    <button
                      onClick={() =>
                        handleSeminarAction(a._id, "approve")
                      }
                      className="flex-1 py-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Approve & Generate Coupon
                    </button>
                    <button
                      onClick={() =>
                        handleSeminarAction(a._id, "reject")
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
                  {a.task?.seminar?.status === "locked"
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
                    a.task?.onboarding?.status === "completed"
                      ? "bg-gradient-to-br from-green-400 to-emerald-500"
                      : a.task?.onboarding?.status === "locked"
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
                  a.task?.onboarding?.status
                )}`}
              >
                {getStatusIcon(a.task?.onboarding?.status)}
                {a.task?.onboarding?.status?.toUpperCase()}
              </div>
            </div>
            <div className="text-center py-8">
              {a.task?.onboarding?.status === "completed" ? (
                <>
                  <Award className="w-16 h-16 text-green-500 mx-auto mb-3" />
                  <p className="text-green-700 font-bold text-lg">
                    Ambassador journey completed! 🎉
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    Completed on:{" "}
                    {new Date(
                      a.task.onboarding.completedAt
                    ).toLocaleDateString()}
                  </p>
                </>
              ) : a.task?.onboarding?.status === "locked" ? (
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
                  Step {a.task?.currentStep}/3
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <p className="text-xs font-bold text-blue-700 mb-1">
                  LOGIN STATUS
                </p>
                <p className="text-sm text-blue-900 font-semibold">
                  {a.isApproved ? "Login Approved" : "Login Blocked"}
                </p>
              </div>
              <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                <p className="text-xs font-bold text-red-700 mb-1">
                  ONBOARDING STATUS
                </p>
                <p className="text-sm text-red-900 font-semibold">
                  {a.task?.onboarding?.status === "completed"
                    ? `Completed on ${new Date(
                        a.task.onboarding.completedAt
                      ).toLocaleDateString()}`
                    : a.task?.onboarding?.status === "locked"
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

  // List View – single clean table with Approve / Reject / View
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Users className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 text-sm">
                Approve, reject and manage ambassadors in one table.
              </p>
            </div>
          </div>

          {/* Stats – still minimal */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-3">
            <div className="bg-white rounded-xl p-4 border border-blue-100 shadow-sm">
              <p className="text-xs text-gray-500">Total</p>
              <p className="text-2xl font-black text-blue-600">
                {ambassadors.length}
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-green-100 shadow-sm">
              <p className="text-xs text-gray-500">Approved</p>
              <p className="text-2xl font-black text-green-600">
                {ambassadors.filter((a) => a.isApproved && !a.rejected).length}
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-yellow-100 shadow-sm">
              <p className="text-xs text-gray-500">Pending</p>
              <p className="text-2xl font-black text-yellow-600">
                {ambassadors.filter((a) => !a.isApproved && !a.rejected).length}
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-red-100 shadow-sm">
              <p className="text-xs text-gray-500">Rejected</p>
              <p className="text-2xl font-black text-red-600">
                {ambassadors.filter((a) => a.rejected).length}
              </p>
            </div>
          </div>
        </div>

        {/* Search, Filter, Global Upload */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-4">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name, email, or college..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none text-sm"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2.5 border border-gray-200 rounded-xl focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none text-sm font-medium"
            >
              <option value="all">All</option>
              <option value="approved">Login Approved</option>
              <option value="pending">Pending Approval</option>
              <option value="rejected">Rejected</option>
              <option value="completed">Onboarding Completed</option>
            </select>
          </div>

          <div className="mt-3 flex justify-end">
            <label className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-semibold shadow cursor-pointer">
              <Upload className="w-4 h-4" />
              <span>Upload Promotion Assets</span>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => handleGlobalPromotionUpload(e.target.files)}
              />
            </label>
          </div>
        </div>

        {/* Single Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-r from-yellow-100 to-orange-100">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">
                    Ambassador
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">
                    Contact
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">
                    College
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-700">
                    Step / Status
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-700">
                    Approval
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredAmbassadors.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-6 text-center text-gray-500 text-sm"
                    >
                      No ambassadors match this filter.
                    </td>
                  </tr>
                ) : (
                  filteredAmbassadors.map((a) => (
                    <tr
                      key={a._id}
                      className="hover:bg-yellow-50/60 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-9 h-9 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-white text-sm font-bold">
                            {a.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">
                              {a.name}
                            </p>
                            <p className="text-[11px] text-gray-500">
                              {new Date(
                                a.registeredAt
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-gray-800">{a.email}</p>
                        <p className="text-[11px] text-gray-500">
                          {a.phone}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-gray-800 font-medium">
                          {a.college}
                        </p>
                        <p className="text-[11px] text-gray-500">
                          {a.city}
                        </p>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <div className="flex items-center gap-1">
                            {[1, 2, 3].map((step) => (
                              <div
                                key={step}
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                                  a.task.currentStep >= step
                                    ? "bg-green-500 text-white"
                                    : "bg-gray-200 text-gray-500"
                                }`}
                              >
                                {step}
                              </div>
                            ))}
                          </div>
                          <span className="text-[11px] text-gray-500">
                            Step {a.task.currentStep}/3
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-[11px] font-semibold ${getApprovalBadgeClasses(
                            a
                          )}`}
                        >
                          {getApprovalLabel(a)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleApproveAmbassador(a._id)}
                            className="px-2.5 py-1.5 rounded-lg bg-green-500 text-white text-[11px] font-semibold hover:bg-green-600"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleRejectAmbassador(a._id)}
                            className="px-2.5 py-1.5 rounded-lg bg-red-500 text-white text-[11px] font-semibold hover:bg-red-600"
                          >
                            Reject
                          </button>
                          <button
                            onClick={() => viewDetails(a)}
                            className="px-2.5 py-1.5 rounded-lg border border-yellow-300 text-yellow-700 text-[11px] font-semibold hover:bg-yellow-50 flex items-center gap-1"
                          >
                            <Eye className="w-3 h-3" />
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
