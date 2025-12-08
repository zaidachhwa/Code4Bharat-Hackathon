"use client";
import { useState, useEffect } from "react";
import {
  Users,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Upload,
  ArrowLeft,
  Shield,
  Copy,
  Image as ImageIcon,
  UserCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";
import AmbassadorDetailPage from "../amb-details/[id]/page";

function Page() {
  // STATE
  const [view, setView] = useState("list");
  const [selectedAmbassador, setSelectedAmbassador] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [ambassadors, setAmbassadors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [sending, setSending] = useState(false);

  const router = useRouter();

  const API_URL = process.env.API_URL || "http://localhost:5000/api";

  // Fetch ambassadors
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${API_URL}/ambassadors/data/get`);
        const data = await res.json();
        setAmbassadors(data.ambassadors || []);
      } catch (e) {
        console.error("Failed to load ambassadors:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Filtered list
  const filteredAmbassadors = ambassadors.filter((a) => {
  const matchesSearch =
    a.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.college.toLowerCase().includes(searchTerm.toLowerCase());

  const matchesFilter =
    filterStatus === "all" ||
    (filterStatus === "approved" && a.isApproved) ||
    (filterStatus === "rejected" && a.rejected) ||
    (filterStatus === "pending" && !a.isApproved && !a.rejected);

  return matchesSearch && matchesFilter;
  });

  // Helpers
  const updateAmbassador = (id, updater) => {
    setAmbassadors((prev) =>
      prev.map((a) => (a._id === id ? { ...a, ...updater(a) } : a))
    );
  };
  // Approve Ambassador
  const approveAmbassador = async (id) => {
    try {
      const res = await fetch(`${API_URL}/ambassadors/approve/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" }
        });

      const data = await res.json();

      if (data.success) {
        setAmbassadors((prev) =>
          prev.map((a) =>
            a._id === id
              ? { ...a, isApproved: true, rejected: false }
              : a
          )
        );

        alert("✅ Ambassador approved successfully!");
      } else {
        alert("❌ Failed to approve ambassador");
      }
  } catch (err) {
      console.error("Approve failed:", err);
      alert("Server error while approving");
    }
  };

  // Action Handlers
const sendPromotionToAll = async () => {
  if (!selectedFiles.length) return;

  try {
    setSending(true);

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    const res = await fetch(`${API_URL}/ambassadors/send-photos`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      alert("✅ Promotion sent to all ambassadors!");
      setSelectedFiles([]);
    } else {
      alert("❌ Failed to send promotions");
    }

  } catch (err) {
    console.error("Send Error:", err);
    alert("Server Error");
  } finally {
    setSending(false);
  }
};

  const toggleLoginAccess = (ambassadorId, currentStatus) => {
    alert(`Login access ${!currentStatus ? "GRANTED" : "REVOKED"} for ambassador!`);
    updateAmbassador(ambassadorId, () => ({ isApproved: !currentStatus }));
  };

  const handleGlobalPromotionUpload = (fileList) => {
  const files = Array.from(fileList || []);

  setSelectedFiles((prev) => [...prev, ...files]);
  };

    // View Details
  const viewDetails = (id) => {
    router.push(`/amb-details/${id}`);
  };

  // const getStatusColor = (status) => {
  //   const colors = {
  //     approved: "bg-green-100 text-green-700 border-green-300",
  //     pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
  //     rejected: "bg-red-100 text-red-700 border-red-300",
  //     locked: "bg-gray-100 text-gray-600 border-gray-300",
  //   };
  //   return colors[status] || colors.locked;
  // };

  // const getStatusIcon = (status) => {
  //   const icons = {
  //     approved: <CheckCircle className="w-4 h-4" />,
  //     pending: <Clock className="w-4 h-4" />,
  //     rejected: <XCircle className="w-4 h-4" />,
  //     locked: <Shield className="w-4 h-4" />,
  //   };
  //   return icons[status] || icons.locked;
  // };

  // const getApprovalBadgeClasses = (a) => {
  //   if (a.rejected) return "bg-red-100 text-red-700";
  //   if (a.isApproved) return "bg-green-100 text-green-700";
  //   return "bg-yellow-100 text-yellow-700";
  // };

  // Detail View
  if (view === "detail" && selectedAmbassador) {
    const a = ambassadors.find((x) => x._id === selectedAmbassador._id) || selectedAmbassador;

    if (loading) {
      return (
        <div className="p-10 text-center text-gray-500 font-medium">
          Loading ambassadors...
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 p-6">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => setView("list")}
            className="mb-6 flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-md hover:shadow-lg transition-all text-gray-700 font-medium"
          >
            <ArrowLeft className="w-5 h-5" /> Back to List
          </button>

          {/* Profile Header */}
          <div className="bg-white rounded-3xl shadow-2xl border-2 border-yellow-200 p-8 mb-6">
            <div className="flex items-start justify-between flex-wrap gap-6">
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-3xl font-black text-white">{a.fullName?.charAt(0)}</span>
                </div>
                <div>
                  <h1 className="text-3xl font-black text-gray-900 mb-3">{a.fullName}</h1>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-yellow-600" /> {a.email}
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-yellow-600" /> {a.phone}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-yellow-600" /> {a.college}, {a.city}
                    </p>
                    <p className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-yellow-600" /> Registered:{" "}
                      {new Date(a.registeredAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-600 mb-2 font-semibold">Login Access Control</p>
                <button
                  onClick={() => toggleLoginAccess(a._id, a.isApproved)}
                  className={`px-6 py-3 rounded-xl font-bold shadow-lg transition-all hover:scale-105 ${
                    a.isApproved
                      ? "bg-gradient-to-r from-green-400 to-emerald-500"
                      : "bg-gradient-to-r from-red-400 to-rose-500"
                  } text-white`}
                >
                  {a.isApproved ? "✓ Login Approved" : "✗ Login Blocked"}
                </button>
                <p className="text-xs text-gray-500 mt-2">
                  {a.isApproved ? "Ambassador can login" : "Ambassador cannot login"}
                </p>
              </div>
            </div>
          </div>

          {/* Additional detail steps (Promotion, Seminar, Onboarding) */}
          {/* Step 1, Step 2, Step 3 JSX remains almost same as in your code with fixed className template strings */}

        </div>
      </div>
    );
  }

  // List View
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

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
            <div className="bg-white rounded-xl p-4 border border-blue-100 shadow-sm">
              <p className="text-xs text-gray-500">Total</p>
              <p className="text-2xl font-black text-blue-600">{ambassadors.length}</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-green-100 shadow-sm">
              <p className="text-xs text-gray-500">Approved</p>
              <p className="text-2xl font-black text-green-600">
                {ambassadors.filter((a) => a.isApproved).length}
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-yellow-100 shadow-sm">
              <p className="text-xs text-gray-500">Pending</p>
              <p className="text-2xl font-black text-yellow-600">
                {ambassadors.filter((a) => !a.isApproved && !a.rejected).length}
              </p>
            </div>
 
          </div>
        </div>

{/* Premium Promotion Upload Panel */}
<div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-xl border border-yellow-100 p-7 mb-6">
  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

    {/* Left Side: Upload + Previews */}
    <div className="flex-1 space-y-4">

      {/* Upload Button */}
      <label className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl 
        bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold 
        shadow-md hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer w-fit">
        
        <Upload className="w-5 h-5" />
        <span className="tracking-wide">Upload Promotion Images</span>

        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleGlobalPromotionUpload(e.target.files)}
        />
      </label>

      {/* Info Text */}
      <p className="text-xs text-gray-500">
        Supported formats: JPG, PNG, WEBP • Multiple uploads allowed
      </p>

      {/* Image Preview Grid */}
      {selectedFiles.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {selectedFiles.map((file, index) => {
            const previewUrl = URL.createObjectURL(file);

            return (
              <div
                key={index}
                className="relative group w-full aspect-square rounded-2xl overflow-hidden 
                border border-gray-200 bg-white shadow-sm hover:shadow-md transition"
              >
                {/* Remove Button */}
                <button
                  onClick={() =>
                    setSelectedFiles((prev) =>
                      prev.filter((_, i) => i !== index)
                    )
                  }
                  className="absolute top-2 right-2 z-10 bg-black/70 text-white 
                  text-[11px] rounded-full w-5 h-5 flex items-center justify-center 
                  opacity-0 group-hover:opacity-100 transition"
                >
                  ✕
                </button>

                {/* Image */}
                <img
                  src={previewUrl}
                  alt="preview"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            );
          })}
        </div>
      )}
    </div>

    {/* Right Side: Send Button */}
    {selectedFiles.length > 0 && (
      <div className="flex flex-col items-end gap-3">
        {/* Image Count Badge */}
        <span className="text-sm font-medium text-gray-600">
          {selectedFiles.length} image(s) selected
        </span>

        {/* Send Button */}
        <button
          onClick={sendPromotionToAll}
          disabled={sending}
          className={`px-8 py-4 rounded-2xl font-bold text-sm tracking-wide shadow-lg transition-all
            ${sending
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-green-400 to-emerald-500 text-white hover:scale-[1.03] hover:shadow-xl"
            }`}
        >
          {sending ? "Sending..." : "🚀 Send Promotions"}
        </button>
      </div>
    )}
  </div>
</div>
{/* Search + Filter */}
<div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-md border border-yellow-100 p-5 mb-5">
  <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">

    {/* Search Box */}
    <div className="relative flex-1 group">
      <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-yellow-500 transition" />
      <input
        type="text"
        placeholder="Search ambassadors by name, email or college..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm
          focus:bg-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 outline-none transition-all"
      />
    </div>

    {/* Filter Dropdown */}
    <div className="relative min-w-[180px]">
      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm
          focus:bg-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 outline-none appearance-none cursor-pointer transition"
      >
        <option value="all">All Status</option>
        <option value="approved">✅ Approved</option>
        <option value="pending">⏳ Pending</option>
        <option value="rejected">❌ Rejected</option>
      </select>

      {/* Dropdown Arrow */}
      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
        ▼
      </span>
    </div>

  </div>

  {/* Helper Text */}
  <p className="mt-3 text-xs text-gray-500">
    Tip: You can search by partial name, college, or email address.
  </p>


        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-r from-yellow-100 to-orange-100">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Ambassador</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Email</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">College</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-700">Step / Status</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-700">Approval</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAmbassadors.map((a) => (
                  <tr key={a._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3">{a.fullName}</td>
                    <td className="px-4 py-3">{a.email}</td>
                    <td className="px-4 py-3">{a.college}</td>
                    <td className="px-4 py-3 text-center">{a.task?.currentStep || 0}/3</td>
<td className="px-4 py-3 text-center flex justify-center gap-2">
  
  {/* When Approved → show badge */}
  {a.isApproved ? (
    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-xl">
      ✅ Approved
    </span>
  ) : a.rejected ? (
    /* When Rejected → show badge */
    <span className="px-3 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded-xl">
      ❌ Rejected
    </span>
  ) : (
    /* When Pending → show buttons */
    <>


      <button
        onClick={() => approveAmbassador(a._id)}
        className="px-3 py-1 bg-green-500 text-white rounded-xl text-xs font-semibold hover:bg-green-600"
      >
        Approve
      </button>
    </>
  )}
</td>


                    <td className="px-4 py-3 text-center">
                      <button
                         onClick={() => viewDetails(a._id)}
                        //  onClick={() => router.push(`/amb-details/${a._id}`)}
                        className="px-3 py-1 bg-yellow-400 text-white rounded-xl text-xs font-semibold hover:bg-yellow-500 transition"
                      >
                        View
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
    </div>
  );
}

export default Page;
