"use client";
import { useState, useEffect } from "react";
import  toast from "react-hot-toast";
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
  Filter,
  TrendingUp,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

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
  const [imageErrors, setImageErrors] = useState({});

  const router = useRouter();

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5002/api";
  const API_URL_IMAGES =
    process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "http://localhost:5002";

  useEffect(() => {
    auth();
  }, []);

  const auth = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/auth`, {
        withCredentials: true,
      });

      console.log("admin auth status:", res.data.success);

      if (res.data.success === false) {
        router.push("/admin");
        toast.error("Please login to have access!");
      }
    } catch (error) {
      // Any error → treat as unauthenticated
      router.push("/admin");
      toast.error("Please login to have access!");
    }
  };

  // Helper function to get profile image URL
  const getProfileImageUrl = (profilePhoto) => {
    if (!profilePhoto) return null;
    // Remove leading slashes and convert backslashes to forward slashes
    const cleanPath = profilePhoto.replace(/^[\\\/]+/, "").replace(/\\/g, "/");
    return `${API_URL_IMAGES}/${cleanPath}`;
  };

  // Handle image error
  const handleImageError = (ambassadorId) => {
    setImageErrors((prev) => ({ ...prev, [ambassadorId]: true }));
  };

  // Fetch ambassadors with step data merged
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // Fetch both endpoints in parallel
        const [ambassadorRes, stepsRes] = await Promise.all([
          fetch(`${API_URL}/ambassadors/data/get`),
          axios.get(`${API_URL}/ambassador/steps`, { withCredentials: true }),
        ]);

        const ambassadorData = await ambassadorRes.json();
        const stepsData = stepsRes.data;

        console.log("Ambassador data:", ambassadorData);
        console.log("Steps data:", stepsData);

        // Create a map of ambassadorId to step data for quick lookup
        const stepsMap = new Map();
        if (stepsData.success && stepsData.ambassadors) {
          stepsData.ambassadors.forEach((step) => {
            if (step.ambassadorId && step.ambassadorId._id) {
              stepsMap.set(step.ambassadorId._id, {
                currentStep: step.currentStep || 0,
                isFullyCompleted: step.isFullyCompleted || false,
                promotion: step.promotion || {},
                seminar: step.seminar || {},
                onboarding: step.onboarding || {},
              });
            }
          });
        }

        // Merge ambassador data with step data
        const mergedAmbassadors = (ambassadorData.ambassadors || []).map(
          (ambassador) => {
            const stepData = stepsMap.get(ambassador._id);
            return {
              ...ambassador,
              task: stepData || { currentStep: 0 },
              stepDetails: stepData || null,
            };
          }
        );

        setAmbassadors(mergedAmbassadors);
        console.log("Merged ambassadors:", mergedAmbassadors);
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
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (data.success) {
        setAmbassadors((prev) =>
          prev.map((a) =>
            a._id === id ? { ...a, isApproved: true, rejected: false } : a
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
    alert(
      `Login access ${!currentStatus ? "GRANTED" : "REVOKED"} for ambassador!`
    );
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

  // Get step badge color
  const getStepBadgeColor = (currentStep) => {
    if (currentStep === 0) return "bg-gray-100 text-gray-600";
    if (currentStep === 1) return "bg-yellow-100 text-yellow-700";
    if (currentStep === 2) return "bg-orange-100 text-orange-700";
    if (currentStep === 3) return "bg-green-100 text-green-700";
    return "bg-blue-100 text-blue-700";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading ambassadors...</p>
        </div>
      </div>
    );
  }

  // List View
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-xl">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600">
                  Admin Dashboard
                </h1>
                <p className="text-gray-600 text-sm md:text-base mt-1">
                  Manage and oversee all ambassadors
                </p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-6 border-2 border-blue-100 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Total
                </p>
                <Users className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-4xl font-black text-blue-600">
                {ambassadors.length}
              </p>
              <p className="text-xs text-gray-500 mt-2">All ambassadors</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-green-100 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Approved
                </p>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-4xl font-black text-green-600">
                {ambassadors.filter((a) => a.isApproved).length}
              </p>
              <p className="text-xs text-gray-500 mt-2">Active ambassadors</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-yellow-100 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Pending
                </p>
                <Clock className="w-5 h-5 text-yellow-500" />
              </div>
              <p className="text-4xl font-black text-yellow-600">
                {ambassadors.filter((a) => !a.isApproved && !a.rejected).length}
              </p>
              <p className="text-xs text-gray-500 mt-2">Awaiting approval</p>
            </div>
          </div>
        </div>

        {/* Premium Promotion Upload Panel */}
        <div className="bg-white rounded-3xl shadow-2xl border-2 border-yellow-200 p-6 md:p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
              <Upload className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-900">
                Send Promotions
              </h2>
              <p className="text-sm text-gray-600">
                Upload and send to all ambassadors
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Left Side: Upload + Previews */}
            <div className="flex-1 space-y-4">
              {/* Upload Button */}
              <label className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer">
                <Upload className="w-5 h-5" />
                <span>Choose Images</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => handleGlobalPromotionUpload(e.target.files)}
                />
              </label>

              {/* Info Text */}
              <p className="text-xs text-gray-500 flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                JPG, PNG, WEBP • Multiple files supported
              </p>

              {/* Image Preview Grid */}
              {selectedFiles.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                  {selectedFiles.map((file, index) => {
                    const previewUrl = URL.createObjectURL(file);

                    return (
                      <div
                        key={index}
                        className="relative group w-full aspect-square rounded-xl overflow-hidden border-2 border-gray-200 bg-white shadow-md hover:shadow-lg transition-all"
                      >
                        {/* Remove Button */}
                        <button
                          onClick={() =>
                            setSelectedFiles((prev) =>
                              prev.filter((_, i) => i !== index)
                            )
                          }
                          className="absolute top-1 right-1 z-10 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 text-xs font-bold"
                        >
                          ✕
                        </button>

                        {/* Image */}
                        <img
                          src={previewUrl}
                          alt="preview"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right Side: Send Button */}
            {selectedFiles.length > 0 && (
              <div className="flex flex-col items-end gap-4">
                {/* Image Count Badge */}
                <div className="px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
                  <span className="text-sm font-bold text-purple-700">
                    {selectedFiles.length} image(s) selected
                  </span>
                </div>

                {/* Send Button */}
                <button
                  onClick={sendPromotionToAll}
                  disabled={sending}
                  className={`px-8 py-4 rounded-2xl font-bold shadow-xl transition-all ${
                    sending
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-green-400 to-emerald-500 text-white hover:scale-105 hover:shadow-2xl"
                  }`}
                >
                  {sending ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </span>
                  ) : (
                    "🚀 Send to All"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Search + Filter */}
        <div className="bg-white rounded-3xl shadow-lg border-2 border-gray-100 p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-bold text-gray-900">Search & Filter</h3>
          </div>

          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
            {/* Search Box */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name, email or college..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 text-sm focus:bg-white focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100 outline-none transition-all"
              />
            </div>

            {/* Filter Dropdown */}
            <div className="relative min-w-[200px]">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 text-sm font-medium focus:bg-white focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100 outline-none appearance-none cursor-pointer transition-all"
              >
                <option value="all">📊 All Status</option>
                <option value="approved">✅ Approved</option>
                <option value="pending">⏳ Pending</option>
                <option value="rejected">❌ Rejected</option>
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                ▼
              </span>
            </div>
          </div>

          {/* Results Count */}
          <p className="mt-4 text-sm text-gray-600 font-medium">
            Showing{" "}
            <span className="text-yellow-600 font-bold">
              {filteredAmbassadors.length}
            </span>{" "}
            of <span className="font-bold">{ambassadors.length}</span>{" "}
            ambassadors
          </p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl shadow-2xl border-2 border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-bold">Ambassador</th>
                  <th className="px-6 py-4 text-left font-bold">Email</th>
                  <th className="px-6 py-4 text-left font-bold">College</th>
                  <th className="px-6 py-4 text-center font-bold">Progress</th>
                  <th className="px-6 py-4 text-center font-bold">Status</th>
                  <th className="px-6 py-4 text-center font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredAmbassadors.map((a, idx) => {
                  const currentStep = a.task?.currentStep || 0;
                  const badgeColor = getStepBadgeColor(currentStep);
                  const profileImageUrl = getProfileImageUrl(a.profilePhoto);
                  const hasImageError = imageErrors[a._id];

                  return (
                    <tr
                      key={a._id}
                      className="hover:bg-gradient-to-r hover:from-yellow-50 hover:to-orange-50 transition-all"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {profileImageUrl && !hasImageError ? (
                            <img
                              src={profileImageUrl}
                              alt={a.fullName}
                              className="w-10 h-10 rounded-xl object-cover shadow-md"
                              onError={() => handleImageError(a._id)}
                            />
                          ) : (
                            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-white font-black shadow-md">
                              {a.fullName?.charAt(0)}
                            </div>
                          )}
                          <span className="font-semibold text-gray-900">
                            {a.fullName}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-sm">
                        {a.email}
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-sm">
                        {a.college}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`px-3 py-1 ${badgeColor} rounded-full text-xs font-bold inline-flex items-center gap-1`}
                        >
                          {currentStep === 3 ? (
                            <>
                              <CheckCircle className="w-3 h-3" />
                              Completed
                            </>
                          ) : currentStep === 0 ? (
                            <>Not Started</>
                          ) : (
                            <>Step {currentStep}/3</>
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          {a.isApproved ? (
                            <span className="px-4 py-2 bg-green-100 text-green-700 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm">
                              <CheckCircle className="w-4 h-4" />
                              Approved
                            </span>
                          ) : a.rejected ? (
                            <span className="px-4 py-2 bg-red-100 text-red-600 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm">
                              <XCircle className="w-4 h-4" />
                              Rejected
                            </span>
                          ) : (
                            <button
                              onClick={() => approveAmbassador(a._id)}
                              className="px-4 py-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-xl text-xs font-bold hover:scale-105 transition-all shadow-md hover:shadow-lg"
                            >
                              Approve Now
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => viewDetails(a._id)}
                          className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl text-xs font-bold hover:scale-105 transition-all shadow-md hover:shadow-lg flex items-center gap-2 mx-auto"
                        >
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredAmbassadors.length === 0 && (
            <div className="text-center py-16">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-medium text-lg">
                No ambassadors found
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
