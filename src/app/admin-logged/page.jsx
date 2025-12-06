"use client";
import { useState } from "react";
import { 
  Users, Search, CheckCircle, XCircle, Clock, Eye, Mail, Phone, 
  MapPin, Calendar, Award, Upload, ArrowLeft, Shield, Copy, Image as ImageIcon,
  UserCheck, Filter, Download, TrendingUp
} from "lucide-react";

function Page() {
  const [view, setView] = useState("list");
  const [selectedAmbassador, setSelectedAmbassador] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock data
  const mockAmbassadors = [
    {
      _id: "1",
      name: "Rahul Sharma",
      email: "rahul@college.edu",
      phone: "+91 98765 43210",
      college: "IIT Delhi",
      city: "New Delhi",
      registeredAt: "2024-01-15",
      isApproved: true,
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
      task: {
        currentStep: 3,
        promotion: { status: "approved", screenshots: ["img4.jpg"], submittedAt: "2024-01-28", day1Confirmed: true, day2Confirmed: true },
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

  const handlePromotionAction = (ambassadorId, action) => {
    alert(`Promotion ${action}d successfully! ${action === 'approve' ? 'Step 2 unlocked.' : ''}`);
  };

  const handleSeminarAction = (ambassadorId, action) => {
    alert(`Seminar ${action}d! ${action === 'approve' ? 'Coupon code generated & Step 3 unlocked.' : ''}`);
  };

  const toggleLoginAccess = (ambassadorId, currentStatus) => {
    alert(`Login access ${!currentStatus ? 'GRANTED' : 'REVOKED'} for ambassador!`);
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

  // Detail View
  if (view === "detail" && selectedAmbassador) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 p-6">
        <div className="max-w-7xl mx-auto">
          <button onClick={() => setView("list")} className="mb-6 flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-md hover:shadow-lg transition-all text-gray-700 font-medium">
            <ArrowLeft className="w-5 h-5" />
            Back to List
          </button>

          {/* Profile Header */}
          <div className="bg-white rounded-3xl shadow-2xl border-2 border-yellow-200 p-8 mb-6">
            <div className="flex items-start justify-between flex-wrap gap-6">
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-3xl font-black text-white">{selectedAmbassador.name?.charAt(0)}</span>
                </div>
                <div>
                  <h1 className="text-3xl font-black text-gray-900 mb-3">{selectedAmbassador.name}</h1>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-yellow-600" />{selectedAmbassador.email}</p>
                    <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-yellow-600" />{selectedAmbassador.phone}</p>
                    <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-yellow-600" />{selectedAmbassador.college}, {selectedAmbassador.city}</p>
                    <p className="flex items-center gap-2"><Calendar className="w-4 h-4 text-yellow-600" />Registered: {new Date(selectedAmbassador.registeredAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 mb-2 font-semibold">Login Access Control</p>
                <button onClick={() => toggleLoginAccess(selectedAmbassador._id, selectedAmbassador.isApproved)}
                  className={`px-6 py-3 rounded-xl font-bold shadow-lg transition-all hover:scale-105 ${selectedAmbassador.isApproved ? "bg-gradient-to-r from-green-400 to-emerald-500" : "bg-gradient-to-r from-red-400 to-rose-500"} text-white`}>
                  {selectedAmbassador.isApproved ? "✓ Login Approved" : "✗ Login Blocked"}
                </button>
                <p className="text-xs text-gray-500 mt-2">{selectedAmbassador.isApproved ? "Ambassador can login" : "Ambassador cannot login"}</p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-bold text-gray-700">Overall Progress</p>
                <p className="text-sm font-bold text-yellow-600">Step {selectedAmbassador.task?.currentStep}/3</p>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 transition-all" style={{ width: `${(selectedAmbassador.task?.currentStep / 3) * 100}%` }}></div>
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
                  <h2 className="text-2xl font-black text-gray-900">Step 1: Promotion</h2>
                  <p className="text-sm text-gray-600">Social media verification</p>
                </div>
              </div>
              <div className={`px-4 py-2 rounded-xl border-2 font-bold text-sm flex items-center gap-2 ${getStatusColor(selectedAmbassador.task?.promotion?.status)}`}>
                {getStatusIcon(selectedAmbassador.task?.promotion?.status)}
                {selectedAmbassador.task?.promotion?.status?.toUpperCase()}
              </div>
            </div>
            {selectedAmbassador.task?.promotion?.submittedAt ? (
              <>
                <div className="grid md:grid-cols-4 gap-4 mb-6">
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <p className="text-xs font-bold text-blue-700 mb-1">SUBMITTED ON</p>
                    <p className="text-sm text-blue-900 font-semibold">{new Date(selectedAmbassador.task.promotion.submittedAt).toLocaleDateString()}</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                    <p className="text-xs font-bold text-purple-700 mb-1">SCREENSHOTS</p>
                    <p className="text-sm text-purple-900 font-semibold">{selectedAmbassador.task.promotion.screenshots?.length || 0} files</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                    <p className="text-xs font-bold text-green-700 mb-1">DAY 1</p>
                    <p className="text-sm text-green-900 font-semibold">{selectedAmbassador.task.promotion.day1Confirmed ? "✓ Confirmed" : "✗ Not confirmed"}</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                    <p className="text-xs font-bold text-green-700 mb-1">DAY 2</p>
                    <p className="text-sm text-green-900 font-semibold">{selectedAmbassador.task.promotion.day2Confirmed ? "✓ Confirmed" : "✗ Not confirmed"}</p>
                  </div>
                </div>
                {selectedAmbassador.task.promotion.screenshots?.length > 0 && (
                  <div className="mb-6">
                    <p className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-yellow-600" />
                      Uploaded Screenshots ({selectedAmbassador.task.promotion.screenshots.length})
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {selectedAmbassador.task.promotion.screenshots.map((img, idx) => (
                        <div key={idx} className="aspect-square bg-gray-100 rounded-xl border-2 border-gray-200 flex items-center justify-center hover:border-yellow-400 transition-all cursor-pointer group">
                          <div className="text-center">
                            <ImageIcon className="w-12 h-12 text-gray-400 group-hover:text-yellow-500 transition-colors mx-auto mb-2" />
                            <p className="text-xs text-gray-500">Screenshot {idx + 1}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {selectedAmbassador.task.promotion.status === "pending" && (
                  <div className="flex gap-3">
                    <button onClick={() => handlePromotionAction(selectedAmbassador._id, "approve")}
                      className="flex-1 py-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
                      <CheckCircle className="w-5 h-5" />Approve & Unlock Step 2
                    </button>
                    <button onClick={() => handlePromotionAction(selectedAmbassador._id, "reject")}
                      className="flex-1 py-3 bg-gradient-to-r from-red-400 to-rose-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
                      <XCircle className="w-5 h-5" />Reject Step 1
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
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${selectedAmbassador.task?.seminar?.status === "locked" ? "bg-gray-300" : "bg-gradient-to-br from-orange-400 to-red-500"}`}>
                  <Calendar className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-gray-900">Step 2: Seminar</h2>
                  <p className="text-sm text-gray-600">Campus workshop verification</p>
                </div>
              </div>
              <div className={`px-4 py-2 rounded-xl border-2 font-bold text-sm flex items-center gap-2 ${getStatusColor(selectedAmbassador.task?.seminar?.status)}`}>
                {getStatusIcon(selectedAmbassador.task?.seminar?.status)}
                {selectedAmbassador.task?.seminar?.status?.toUpperCase()}
              </div>
            </div>
            {selectedAmbassador.task?.seminar?.status !== "locked" && selectedAmbassador.task?.seminar?.submittedAt ? (
              <>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <p className="text-xs font-bold text-blue-700 mb-1">SEMINAR TITLE</p>
                    <p className="text-sm text-blue-900 font-semibold">{selectedAmbassador.task.seminar.seminarTitle}</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                    <p className="text-xs font-bold text-purple-700 mb-1">DATE</p>
                    <p className="text-sm text-purple-900 font-semibold">{new Date(selectedAmbassador.task.seminar.seminarDate).toLocaleDateString()}</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                    <p className="text-xs font-bold text-green-700 mb-1">PARTICIPANTS</p>
                    <p className="text-sm text-green-900 font-semibold">{selectedAmbassador.task.seminar.participants} students</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
                    <p className="text-xs font-bold text-orange-700 mb-1">PROOF FILES</p>
                    <p className="text-sm text-orange-900 font-semibold">{selectedAmbassador.task.seminar.uploadedProof?.length || 0} uploaded</p>
                  </div>
                </div>
                {selectedAmbassador.task.seminar.couponCode && (
                  <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-300 mb-6">
                    <p className="text-xs font-bold text-purple-700 mb-2 flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      GENERATED COUPON CODE
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-mono">
                        {selectedAmbassador.task.seminar.couponCode}
                      </p>
                      <button className="px-4 py-2 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition-colors flex items-center gap-2">
                        <Copy className="w-4 h-4" />
                        Copy
                      </button>
                    </div>
                    <p className="text-xs text-purple-600 mt-2">Generated on: {new Date(selectedAmbassador.task.seminar.couponGeneratedAt).toLocaleDateString()}</p>
                  </div>
                )}
                {selectedAmbassador.task.seminar.status === "pending" && (
                  <div className="flex gap-3">
                    <button onClick={() => handleSeminarAction(selectedAmbassador._id, "approve")}
                      className="flex-1 py-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
                      <CheckCircle className="w-5 h-5" />Approve & Generate Coupon
                    </button>
                    <button onClick={() => handleSeminarAction(selectedAmbassador._id, "reject")}
                      className="flex-1 py-3 bg-gradient-to-r from-red-400 to-rose-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
                      <XCircle className="w-5 h-5" />Reject Step 2
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8">
                <Shield className="w-16 h-16 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">{selectedAmbassador.task?.seminar?.status === "locked" ? "Step 2 is locked. Approve Step 1 first." : "No submission yet"}</p>
              </div>
            )}
          </div>

          {/* Step 3 - Onboarding */}
          <div className="bg-white rounded-3xl shadow-xl border-2 border-red-200 p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${
                  selectedAmbassador.task?.onboarding?.status === "completed" ? "bg-gradient-to-br from-green-400 to-emerald-500" :
                  selectedAmbassador.task?.onboarding?.status === "locked" ? "bg-gray-300" : "bg-gradient-to-br from-red-400 to-pink-500"}`}>
                  <Award className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-gray-900">Step 3: Onboarding</h2>
                  <p className="text-sm text-gray-600">Final completion & rewards</p>
                </div>
              </div>
              <div className={`px-4 py-2 rounded-xl border-2 font-bold text-sm flex items-center gap-2 ${getStatusColor(selectedAmbassador.task?.onboarding?.status)}`}>
                {getStatusIcon(selectedAmbassador.task?.onboarding?.status)}
                {selectedAmbassador.task?.onboarding?.status?.toUpperCase()}
              </div>
            </div>
            <div className="text-center py-8">
              {selectedAmbassador.task?.onboarding?.status === "completed" ? (
                <>
                  <Award className="w-16 h-16 text-green-500 mx-auto mb-3" />
                  <p className="text-green-700 font-bold text-lg">Ambassador journey completed! 🎉</p>
                  <p className="text-gray-600 text-sm mt-2">Completed on: {new Date(selectedAmbassador.task.onboarding.completedAt).toLocaleDateString()}</p>
                </>
              ) : selectedAmbassador.task?.onboarding?.status === "locked" ? (
                <>
                  <Shield className="w-16 h-16 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500 font-medium">Step 3 is locked. Approve Step 2 first.</p>
                </>
              ) : (
                <>
                  <Clock className="w-16 h-16 text-yellow-500 mx-auto mb-3" />
                  <p className="text-yellow-700 font-medium">Ambassador can now access rewards dashboard</p>
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600">
                Admin Dashboard
              </h1>
              <p className="text-gray-600">Manage ambassador applications & tasks</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white rounded-2xl p-6 border-2 border-blue-200 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Total</p>
                  <p className="text-3xl font-black text-blue-600">{mockAmbassadors.length}</p>
                </div>
                <Users className="w-12 h-12 text-blue-400" />
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 border-2 border-green-200 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Approved</p>
                  <p className="text-3xl font-black text-green-600">
                    {mockAmbassadors.filter(a => a.isApproved).length}
                  </p>
                </div>
                <UserCheck className="w-12 h-12 text-green-400" />
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 border-2 border-yellow-200 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Pending</p>
                  <p className="text-3xl font-black text-yellow-600">
                    {mockAmbassadors.filter(a => a.task?.promotion?.status === "pending" || a.task?.seminar?.status === "pending").length}
                  </p>
                </div>
                <Clock className="w-12 h-12 text-yellow-400" />
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 border-2 border-purple-200 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Completed</p>
                  <p className="text-3xl font-black text-purple-600">
                    {mockAmbassadors.filter(a => a.task?.onboarding?.status === "completed").length}
                  </p>
                </div>
                <Award className="w-12 h-12 text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name, email, or college..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:ring-4 focus:ring-yellow-200 outline-none transition-all"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:ring-4 focus:ring-yellow-200 outline-none transition-all font-medium"
            >
              <option value="all">All Status</option>
              <option value="approved">Login Approved</option>
              <option value="pending">Pending Review</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Ambassadors Table */}
        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-yellow-100 to-orange-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-black text-gray-700">Ambassador</th>
                  <th className="px-6 py-4 text-left text-sm font-black text-gray-700">Contact</th>
                  <th className="px-6 py-4 text-left text-sm font-black text-gray-700">College</th>
                  <th className="px-6 py-4 text-center text-sm font-black text-gray-700">Step Progress</th>
                  <th className="px-6 py-4 text-center text-sm font-black text-gray-700">Login Status</th>
                  <th className="px-6 py-4 text-center text-sm font-black text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockAmbassadors.map((ambassador) => (
                  <tr key={ambassador._id} className="hover:bg-yellow-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-md">
                          <span className="text-lg font-bold text-white">{ambassador.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{ambassador.name}</p>
                          <p className="text-xs text-gray-500">{new Date(ambassador.registeredAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-700">{ambassador.email}</p>
                      <p className="text-xs text-gray-500">{ambassador.phone}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-700">{ambassador.college}</p>
                      <p className="text-xs text-gray-500">{ambassador.city}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3].map((step) => (
                            <div
                              key={step}
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                                ambassador.task.currentStep >= step
                                  ? "bg-gradient-to-br from-green-400 to-emerald-500 text-white"
                                  : "bg-gray-200 text-gray-500"
                              }`}
                            >
                              {step}
                            </div>
                          ))}
                        </div>
                        <span className="text-xs font-medium text-gray-600">Step {ambassador.task.currentStep}/3</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                        ambassador.isApproved
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                        {ambassador.isApproved ? "✓ Approved" : "✗ Blocked"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => viewDetails(ambassador)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg font-bold hover:shadow-lg transition-all"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page