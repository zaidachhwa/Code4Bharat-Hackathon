"use client";
import { useState } from "react";
import {
  Users, Search, CheckCircle, XCircle, Clock, Eye, Mail, Phone,
  MapPin, Calendar, Award, Upload, ArrowLeft, Shield, Copy, Image as ImageIcon
} from "lucide-react";

function Page() {
  const initialAmbassadors = [
    {
      _id: "1", name: "Rahul Sharma", email: "rahul@college.edu", phone: "+91 98765 43210",
      college: "IIT Delhi", city: "New Delhi", registeredAt: "2024-01-15",
      isApproved: false, rejected: false,
      task: {
        currentStep: 2,
        promotion: { status: "approved", screenshots: ["img1.jpg", "img2.jpg"], submittedAt: "2024-01-20", day1Confirmed: true, day2Confirmed: true },
        seminar: { status: "pending", college: "IIT Delhi", seminarTitle: "InnovateX Workshop", seminarDate: "2024-02-15", participants: 150, uploadedProof: ["proof1.jpg"], submittedAt: "2024-02-16", couponCode: null },
        onboarding: { status: "locked" }
      }
    },
    {
      _id: "2", name: "Priya Patel", email: "priya@university.edu", phone: "+91 87654 32109",
      college: "Mumbai University", city: "Mumbai", registeredAt: "2024-01-18",
      isApproved: false, rejected: false,
      task: {
        currentStep: 1,
        promotion: { status: "pending", screenshots: ["img3.jpg"], submittedAt: "2024-01-25", day1Confirmed: true, day2Confirmed: true },
        seminar: { status: "locked" }, onboarding: { status: "locked" }
      }
    },
    {
      _id: "3", name: "Arjun Singh", email: "arjun@tech.edu", phone: "+91 76543 21098",
      college: "NIT Trichy", city: "Tiruchirappalli", registeredAt: "2024-01-22",
      isApproved: true, rejected: false,
      task: {
        currentStep: 3,
        promotion: { status: "approved", screenshots: ["img4.jpg"], submittedAt: "2024-01-28", day1Confirmed: true, day2Confirmed: true },
        seminar: { status: "approved", college: "NIT Trichy", seminarTitle: "Career Workshop", seminarDate: "2024-03-01", participants: 200, uploadedProof: ["proof2.jpg"], submittedAt: "2024-03-02", couponCode: "INNOVATE2024ABC", couponGeneratedAt: "2024-03-05" },
        onboarding: { status: "completed", completedAt: "2024-03-10" }
      }
    }
  ];

  const [ambassadors, setAmbassadors] = useState(initialAmbassadors);
  const [view, setView] = useState("list");
  const [selectedAmbassador, setSelectedAmbassador] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const updateAmbassador = (id, updater) => {
    setAmbassadors(prev => prev.map(a => a._id === id ? { ...a, ...updater(a) } : a));
  };

  const handlePromotionAction = (id, action) => {
    alert(`Promotion ${action}d! ${action === "approve" ? "Step 2 unlocked." : ""}`);
    updateAmbassador(id, a => ({
      task: { ...a.task, promotion: { ...a.task.promotion, status: action === "approve" ? "approved" : "rejected" } }
    }));
  };

  const handleSeminarAction = (id, action) => {
    alert(`Seminar ${action}d! ${action === "approve" ? "Coupon generated & Step 3 unlocked." : ""}`);
    updateAmbassador(id, a => ({
      task: { ...a.task, seminar: { ...a.task.seminar, status: action === "approve" ? "approved" : "rejected" } }
    }));
  };

  const toggleLoginAccess = (id, current) => {
    alert(`Login ${!current ? "GRANTED" : "REVOKED"}!`);
    updateAmbassador(id, () => ({ isApproved: !current }));
  };

  let filtered = ambassadors;
  if (searchTerm.trim()) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(a => a.name.toLowerCase().includes(term) || a.email.toLowerCase().includes(term) || a.college.toLowerCase().includes(term));
  }
  if (filterStatus === "approved") filtered = filtered.filter(a => a.isApproved && !a.rejected);
  else if (filterStatus === "pending") filtered = filtered.filter(a => !a.isApproved && !a.rejected);
  else if (filterStatus === "rejected") filtered = filtered.filter(a => a.rejected);
  else if (filterStatus === "completed") filtered = filtered.filter(a => a.task?.onboarding?.status === "completed");

  const StatusBadge = ({ status }) => {
    const styles = {
      approved: "bg-green-100 text-green-700 border-green-300",
      pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
      rejected: "bg-red-100 text-red-700 border-red-300",
      locked: "bg-gray-100 text-gray-600 border-gray-300"
    };
    const icons = {
      approved: <CheckCircle className="w-5 h-5" />,
      pending: <Clock className="w-5 h-5" />,
      rejected: <XCircle className="w-5 h-5" />,
      locked: <Shield className="w-5 h-5" />
    };
    return (
      <div className={`px-5 py-2.5 rounded-xl border-2 font-bold text-base flex items-center gap-2 ${styles[status] || styles.locked}`}>
        {icons[status] || icons.locked}
        {status?.toUpperCase()}
      </div>
    );
  };

  const InfoCard = ({ label, value, color = "blue" }) => (
    <div className={`p-5 bg-${color}-50 rounded-xl border-2 border-${color}-200`}>
      <p className="text-xs font-bold text-${color}-700 mb-1">{label}</p>
      <p className="text-base text-${color}-900 font-semibold">{value}</p>
    </div>
  );

  if (view === "detail" && selectedAmbassador) {
    const a = ambassadors.find(x => x._id === selectedAmbassador._id) || selectedAmbassador;

    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 p-8">
        <div className="max-w-7xl mx-auto">
          <button onClick={() => setView("list")} className="mb-8 flex items-center gap-3 px-6 py-3 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all text-gray-700 font-semibold text-lg">
            <ArrowLeft className="w-6 h-6" />
            Back to List
          </button>

          {/* Profile Header */}
          <div className="bg-white rounded-3xl shadow-2xl border-2 border-yellow-200 p-10 mb-8">
            <div className="flex items-start justify-between flex-wrap gap-8">
              <div className="flex items-start gap-8">
                <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl flex items-center justify-center shadow-xl">
                  <span className="text-5xl font-black text-white">{a.name?.charAt(0)}</span>
                </div>
                <div>
                  <h1 className="text-4xl font-black text-gray-900 mb-4">{a.name}</h1>
                  <div className="space-y-3 text-base text-gray-600">
                    <p className="flex items-center gap-3"><Mail className="w-5 h-5 text-yellow-600" />{a.email}</p>
                    <p className="flex items-center gap-3"><Phone className="w-5 h-5 text-yellow-600" />{a.phone}</p>
                    <p className="flex items-center gap-3"><MapPin className="w-5 h-5 text-yellow-600" />{a.college}, {a.city}</p>
                    <p className="flex items-center gap-3"><Calendar className="w-5 h-5 text-yellow-600" />Registered: {new Date(a.registeredAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-base text-gray-600 mb-3 font-semibold">Login Access Control</p>
                <button onClick={() => toggleLoginAccess(a._id, a.isApproved)}
                  className={`px-8 py-4 rounded-2xl font-bold text-lg shadow-xl transition-all hover:scale-105 ${a.isApproved ? "bg-gradient-to-r from-green-400 to-emerald-500" : "bg-gradient-to-r from-red-400 to-rose-500"} text-white`}>
                  {a.isApproved ? "✓ Login Approved" : "✗ Login Blocked"}
                </button>
              </div>
            </div>
            <div className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border-2 border-yellow-200">
              <div className="flex items-center justify-between mb-3">
                <p className="text-base font-bold text-gray-700">Overall Progress</p>
                <p className="text-base font-bold text-yellow-600">Step {a.task?.currentStep}/3</p>
              </div>
              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 transition-all" style={{ width: `${(a.task?.currentStep / 3) * 100}%` }}></div>
              </div>
            </div>
          </div>

          {/* Step 1 - Promotion */}
          <div className="bg-white rounded-3xl shadow-xl border-2 border-yellow-200 p-10 mb-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl flex items-center justify-center shadow-xl">
                  <Upload className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-gray-900">Step 1: Promotion</h2>
                  <p className="text-base text-gray-600 mt-1">Social media verification</p>
                </div>
              </div>
              <StatusBadge status={a.task?.promotion?.status} />
            </div>
            {a.task?.promotion?.submittedAt ? (
              <>
                <div className="grid md:grid-cols-4 gap-5 mb-8">
                  <InfoCard label="SUBMITTED ON" value={new Date(a.task.promotion.submittedAt).toLocaleDateString()} color="blue" />
                  <InfoCard label="SCREENSHOTS" value={`${a.task.promotion.screenshots?.length || 0} files`} color="purple" />
                  <InfoCard label="DAY 1" value={a.task.promotion.day1Confirmed ? "✓ Confirmed" : "✗ Not confirmed"} color="green" />
                  <InfoCard label="DAY 2" value={a.task.promotion.day2Confirmed ? "✓ Confirmed" : "✗ Not confirmed"} color="green" />
                </div>
                {a.task.promotion.screenshots?.length > 0 && (
                  <div className="mb-8">
                    <p className="text-base font-bold text-gray-700 mb-4 flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-yellow-600" />
                      Uploaded Screenshots ({a.task.promotion.screenshots.length})
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                      {a.task.promotion.screenshots.map((img, idx) => (
                        <div key={idx} className="aspect-square bg-gray-100 rounded-2xl border-2 border-gray-200 flex items-center justify-center hover:border-yellow-400 transition-all cursor-pointer group">
                          <div className="text-center">
                            <ImageIcon className="w-16 h-16 text-gray-400 group-hover:text-yellow-500 transition-colors mx-auto mb-3" />
                            <p className="text-sm text-gray-500">Screenshot {idx + 1}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {a.task.promotion.status === "pending" && (
                  <div className="flex gap-4">
                    <button onClick={() => handlePromotionAction(a._id, "approve")}
                      className="flex-1 py-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3">
                      <CheckCircle className="w-6 h-6" />Approve & Unlock Step 2
                    </button>
                    <button onClick={() => handlePromotionAction(a._id, "reject")}
                      className="flex-1 py-4 bg-gradient-to-r from-red-400 to-rose-500 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3">
                      <XCircle className="w-6 h-6" />Reject Step 1
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <Clock className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 font-medium text-lg">No submission yet</p>
              </div>
            )}
          </div>

          {/* Step 2 - Seminar */}
          <div className="bg-white rounded-3xl shadow-xl border-2 border-orange-200 p-10 mb-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-5">
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center shadow-xl ${a.task?.seminar?.status === "locked" ? "bg-gray-300" : "bg-gradient-to-br from-orange-400 to-red-500"}`}>
                  <Calendar className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-gray-900">Step 2: Seminar</h2>
                  <p className="text-base text-gray-600 mt-1">Campus workshop verification</p>
                </div>
              </div>
              <StatusBadge status={a.task?.seminar?.status} />
            </div>
            {a.task?.seminar?.status !== "locked" && a.task?.seminar?.submittedAt ? (
              <>
                <div className="grid md:grid-cols-2 gap-5 mb-8">
                  <InfoCard label="SEMINAR TITLE" value={a.task.seminar.seminarTitle} color="blue" />
                  <InfoCard label="DATE" value={new Date(a.task.seminar.seminarDate).toLocaleDateString()} color="purple" />
                  <InfoCard label="PARTICIPANTS" value={`${a.task.seminar.participants} students`} color="green" />
                  <InfoCard label="PROOF FILES" value={`${a.task.seminar.uploadedProof?.length || 0} uploaded`} color="orange" />
                </div>
                {a.task.seminar.couponCode && (
                  <div className="p-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-300 mb-8">
                    <p className="text-sm font-bold text-purple-700 mb-3 flex items-center gap-2">
                      <Award className="w-5 h-5" />GENERATED COUPON CODE
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-mono">{a.task.seminar.couponCode}</p>
                      <button className="px-6 py-3 bg-purple-600 text-white rounded-xl font-bold text-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
                        <Copy className="w-5 h-5" />Copy
                      </button>
                    </div>
                  </div>
                )}
                {a.task.seminar.status === "pending" && (
                  <div className="flex gap-4">
                    <button onClick={() => handleSeminarAction(a._id, "approve")}
                      className="flex-1 py-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3">
                      <CheckCircle className="w-6 h-6" />Approve & Generate Coupon
                    </button>
                    <button onClick={() => handleSeminarAction(a._id, "reject")}
                      className="flex-1 py-4 bg-gradient-to-r from-red-400 to-rose-500 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3">
                      <XCircle className="w-6 h-6" />Reject Step 2
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <Shield className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 font-medium text-lg">{a.task?.seminar?.status === "locked" ? "Step 2 is locked. Approve Step 1 first." : "No submission yet"}</p>
              </div>
            )}
          </div>

          {/* Step 3 - Onboarding */}
          <div className="bg-white rounded-3xl shadow-xl border-2 border-red-200 p-10">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-5">
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center shadow-xl ${a.task?.onboarding?.status === "completed" ? "bg-gradient-to-br from-green-400 to-emerald-500" : a.task?.onboarding?.status === "locked" ? "bg-gray-300" : "bg-gradient-to-br from-red-400 to-pink-500"}`}>
                  <Award className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-gray-900">Step 3: Onboarding</h2>
                  <p className="text-base text-gray-600 mt-1">Final completion & rewards</p>
                </div>
              </div>
              <StatusBadge status={a.task?.onboarding?.status} />
            </div>
            <div className="text-center py-12">
              {a.task?.onboarding?.status === "completed" ? (
                <>
                  <Award className="w-20 h-20 text-green-500 mx-auto mb-4" />
                  <p className="text-green-700 font-bold text-2xl">Ambassador journey completed! 🎉</p>
                  <p className="text-gray-600 text-base mt-3">Completed on: {new Date(a.task.onboarding.completedAt).toLocaleDateString()}</p>
                </>
              ) : a.task?.onboarding?.status === "locked" ? (
                <>
                  <Shield className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 font-medium text-lg">Step 3 is locked. Approve Step 2 first.</p>
                </>
              ) : (
                <>
                  <Clock className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
                  <p className="text-yellow-700 font-medium text-lg">Ambassador can now access rewards dashboard</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // List View
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-5 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl flex items-center justify-center shadow-xl">
              <Users className="w-9 h-9 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600">Admin Dashboard</h1>
              <p className="text-gray-600 text-base mt-1">Approve, reject and manage ambassadors</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-6 border-2 border-blue-200 shadow-lg">
              <p className="text-sm text-gray-500 mb-1">Total</p>
              <p className="text-4xl font-black text-blue-600">{ambassadors.length}</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border-2 border-green-200 shadow-lg">
              <p className="text-sm text-gray-500 mb-1">Approved</p>
              <p className="text-4xl font-black text-green-600">{ambassadors.filter(a => a.isApproved && !a.rejected).length}</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border-2 border-yellow-200 shadow-lg">
              <p className="text-sm text-gray-500 mb-1">Pending</p>
              <p className="text-4xl font-black text-yellow-600">{ambassadors.filter(a => !a.isApproved && !a.rejected).length}</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border-2 border-red-200 shadow-lg">
              <p className="text-sm text-gray-500 mb-1">Rejected</p>
              <p className="text-4xl font-black text-red-600">{ambassadors.filter(a => a.rejected).length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input type="text" placeholder="Search by name, email, or college..." value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none text-base" />
            </div>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none text-base font-medium">
              <option value="all">All</option>
              <option value="approved">Login Approved</option>
              <option value="pending">Pending Approval</option>
              <option value="rejected">Rejected</option>
              <option value="completed">Onboarding Completed</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-base">
              <thead className="bg-gradient-to-r from-yellow-100 to-orange-100">
                <tr>
                  <th className="px-6 py-4 text-left font-bold text-gray-700">Ambassador</th>
                  <th className="px-6 py-4 text-left font-bold text-gray-700">Contact</th>
                  <th className="px-6 py-4 text-left font-bold text-gray-700">College</th>
                  <th className="px-6 py-4 text-center font-bold text-gray-700">Progress</th>
                  <th className="px-6 py-4 text-center font-bold text-gray-700">Status</th>
                  <th className="px-6 py-4 text-center font-bold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.length === 0 ? (
                  <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-500 text-base">No ambassadors match this filter.</td></tr>
                ) : (
                  filtered.map(a => (
                    <tr key={a._id} className="hover:bg-yellow-50/60 transition-colors">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-white text-lg font-bold">
                            {a.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 text-base">{a.name}</p>
                            <p className="text-sm text-gray-500">{new Date(a.registeredAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <p className="text-gray-800">{a.email}</p>
                        <p className="text-sm text-gray-500">{a.phone}</p>
                      </td>
                      <td className="px-6 py-5">
                        <p className="text-gray-800 font-semibold">{a.college}</p>
                        <p className="text-sm text-gray-500">{a.city}</p>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <div className="flex items-center gap-1.5">
                            {[1, 2, 3].map(step => (
                              <div key={step} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${a.task.currentStep >= step ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"}`}>
                                {step}
                              </div>
                            ))}
                          </div>
                          <span className="text-sm text-gray-500 font-medium">Step {a.task.currentStep}/3</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span className={`inline-flex px-4 py-2 rounded-full text-sm font-bold ${a.rejected ? "bg-red-100 text-red-700" : a.isApproved ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                          {a.rejected ? "Rejected" : a.isApproved ? "Login Approved" : "Pending Approval"}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-center gap-2">
                          <button onClick={() => updateAmbassador(a._id, () => ({ isApproved: true, rejected: false }))}
                            className="px-4 py-2 rounded-lg bg-green-500 text-white text-sm font-bold hover:bg-green-600 transition-colors">
                            Approve
                          </button> 
                          <button onClick={() => updateAmbassador(a._id, () => ({ isApproved: false, rejected: true }))}
                            className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition-colors">
                            Reject
                          </button>
                          <button onClick={() => { setSelectedAmbassador(a); setView("detail"); }}
                            className="px-4 py-2 rounded-lg border-2 border-yellow-300 text-yellow-700 text-sm font-bold hover:bg-yellow-50 flex items-center gap-1 transition-colors">
                            <Eye className="w-4 h-4" />View
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