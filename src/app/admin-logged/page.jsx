"use client";
import { useState, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
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
  Filter,
  X,
} from "lucide-react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5002/api";
const API_URL_IMAGES = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "http://localhost:5002";

// const API_URL = "https://code4bharat-hackathon-backend.onrender.com/api";
// const API_URL_IMAGES = "https://code4bharat-hackathon-backend.onrender.com";

function Page() {
  // MAIN VIEW STATE
  const [view, setView] = useState("list"); // "list" or "details"
  const [selectedAmbassadorId, setSelectedAmbassadorId] = useState(null);

  // LIST VIEW STATE
  const [searchTerm, setSearchTerm] = useState("");
  const [ambassadors, setAmbassadors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [sending, setSending] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  // DETAILS VIEW STATE
  const [detailsData, setDetailsData] = useState({
    ambassador: null,
    images: { promotion: {}, seminar: {} },
    couponUsers: { couponCode: "", totalUsers: 0, users: [] },
    loadingDetails: false,
    loadingImages: false,
  });
  const [showUsersModal, setShowUsersModal] = useState(false);


  const router = useRouter();
  



  useEffect(() => {
    auth();
  }, []);

  const auth = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/auth`, {
        withCredentials: true,
      });

      if (res.data.success === false) {
        toast.error("Please login to have access!");
        router.push("/admin")
      }
    } catch (error) {
      toast.error("Please login to have access!");
      router.push("/admin")
    }
  };

  const getProfileImageUrl = (profilePhoto) => {
    if (!profilePhoto) return null;
    const cleanPath = profilePhoto.replace(/^[\\\/]+/, "").replace(/\\/g, "/");
    return `${API_URL_IMAGES}/${cleanPath}`;
  };

  const handleImageError = (ambassadorId) => {
    setImageErrors((prev) => ({ ...prev, [ambassadorId]: true }));
  };

  // Fetch ambassadors list
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [ambassadorRes, stepsRes] = await Promise.all([
          fetch(`${API_URL}/ambassadors/data/get`),
          axios.get(`${API_URL}/ambassador/steps`, { withCredentials: true }),
        ]);

        const ambassadorData = await ambassadorRes.json();
        const stepsData = stepsRes.data;

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
      } catch (e) {
        console.error("Failed to load ambassadors:", e);
        toast.error("Failed to load ambassadors");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Fetch ambassador details when viewing details
  const fetchAmbassadorDetails = async (id) => {
  setDetailsData((prev) => ({ ...prev, loadingDetails: true, loadingImages: true }));

  try {
    // Fetch ambassador data
    const ambassadorRes = await fetch(`${API_URL}/ambassadors/data/${id}`);
    const ambassadorData = await ambassadorRes.json();

    // Fetch images (handle 404 gracefully)
    let imagesData = { promotion: {}, seminar: {} };
    try {
      const imagesRes = await axios.get(`${API_URL}/images/get/${id}`, {
        withCredentials: true,
      });
      if (imagesRes.data?.success) {
        imagesData = imagesRes.data.data;
      }
    } catch (imageError) {
      // 404 is expected for ambassadors who haven't uploaded yet
      if (imageError.response?.status !== 404) {
        console.error("Image fetch error:", imageError);
      }
    }

    // Fetch coupon users (handle errors gracefully)
    let couponData = { couponCode: "", totalUsers: 0, users: [] };
    try {
      const couponRes = await axios.get(
        `${API_URL}/ambassador-coupen-code-users/${id}`,
        { withCredentials: true }
      );
      couponData = {
        couponCode: couponRes.data?.couponCode || "",
        totalUsers: couponRes.data?.totalUsers || 0,
        users: couponRes.data?.users || [],
      };
    } catch (couponError) {
      // 404 is expected for ambassadors without coupon codes
      if (couponError.response?.status !== 404) {
        console.error("Coupon fetch error:", couponError);
      }
    }

    setDetailsData({
      ambassador: ambassadorData.ambassadors || null,
      images: imagesData,
      couponUsers: couponData,
      loadingDetails: false,
      loadingImages: false,
    });
  } catch (e) {
    console.error("Failed to load ambassador details:", e);
    toast.error("Failed to load details");
    setDetailsData((prev) => ({ 
      ...prev, 
      loadingDetails: false, 
      loadingImages: false,
      images: { promotion: {}, seminar: {} },
      couponUsers: { couponCode: "", totalUsers: 0, users: [] }
    }));
  }
};


  // View Details Handler
  const viewDetails = (id) => {
    setSelectedAmbassadorId(id);
    setView("details");
    fetchAmbassadorDetails(id);
  };

  // Back to List Handler
  const backToList = () => {
    setView("list");
    setSelectedAmbassadorId(null);
    setDetailsData({
      ambassador: null,
      images: { promotion: {}, seminar: {} },
      couponUsers: { couponCode: "", totalUsers: 0, users: [] },
      loadingDetails: false,
      loadingImages: false,
    });
  };

  const filteredAmbassadors = useMemo(() => {
    return ambassadors.filter((a) => {
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
  }, [ambassadors, searchTerm, filterStatus]);

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
        toast.success("✅ Ambassador approved successfully!");
      } else {
        toast.error("❌ Failed to approve ambassador");
      }
    } catch (err) {
      console.error("Approve failed:", err);
      toast.error("Server error while approving");
    }
  };

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
        toast.success("Promotion files sent to all ambassadors!");
        setSelectedFiles([]);
      } else {
        toast.error("❌ Failed to send promotions");
      }
    } catch (err) {
      console.error("Send Error:", err);
      toast.error("Server Error");
    } finally {
      setSending(false);
    }
  };

  const handleGlobalPromotionUpload = (fileList) => {
    const files = Array.from(fileList || []);
    setSelectedFiles((prev) => [...prev, ...files]);
  };

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

  // RENDER DETAILS VIEW
  if (view === "details") {
    return (
      <DetailsView
        detailsData={detailsData}
        backToList={backToList}
        showUsersModal={showUsersModal}
        setShowUsersModal={setShowUsersModal}
      />
    );
  }

  // RENDER LIST VIEW
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
            <div className="flex-1 space-y-4">
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

              <p className="text-xs text-gray-500 flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                JPG, PNG, WEBP • Multiple files supported
              </p>

              {selectedFiles.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                  {selectedFiles.map((file, index) => {
                    const previewUrl = URL.createObjectURL(file);
                    return (
                      <div
                        key={index}
                        className="relative group w-full aspect-square rounded-xl overflow-hidden border-2 border-gray-200 bg-white shadow-md hover:shadow-lg transition-all"
                      >
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

            {selectedFiles.length > 0 && (
              <div className="flex flex-col items-end gap-4">
                <div className="px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
                  <span className="text-sm font-bold text-purple-700">
                    {selectedFiles.length} image(s) selected
                  </span>
                </div>

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
                {filteredAmbassadors.map((a) => {
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

// ============== DETAILS VIEW COMPONENT ==============
function DetailsView({ detailsData, backToList, showUsersModal, setShowUsersModal }) {
  const { ambassador, images, couponUsers, loadingDetails, loadingImages } = detailsData;

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    const cleanPath = imagePath.replace(/^[\\\/]+/, "");
    return `${API_URL_IMAGES}/${cleanPath.replace(/\\/g, "/")}`;
  };

  const promotionImages = useMemo(
    () => [
      ...(images.promotion?.day1Screenshots || []),
      ...(images.promotion?.day2Screenshots || []),
    ],
    [images.promotion]
  );

  const seminarImages = useMemo(
    () => images.seminar?.uploadedProof || [],
    [images.seminar]
  );

  if (loadingDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading details...</p>
        </div>
      </div>
    );
  }

  if (!ambassador) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 p-6">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={backToList}
            className="mb-6 flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-md hover:shadow-lg transition-all text-gray-700 font-medium"
          >
            <ArrowLeft className="w-5 h-5" /> Back to List
          </button>
          <div className="p-10 text-center text-red-500 bg-white rounded-3xl shadow-xl">
            Ambassador not found
          </div>
        </div>
      </div>
    );
  }

  const p = ambassador.task?.promotion;
  const s = ambassador.task?.seminar;
  const o = ambassador.task?.onboarding;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 p-6">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={backToList}
          className="mb-6 flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-md hover:shadow-lg transition-all text-gray-700 font-medium"
        >
          <ArrowLeft className="w-5 h-5" /> Back to List
        </button>

        {/* HEADER */}
        <div className="bg-white rounded-3xl shadow-2xl border-2 border-yellow-200 p-8 mb-6">
          <div className="flex items-start justify-between flex-wrap gap-6">
            <div className="flex items-start gap-6">
              {ambassador.profilePhoto ? (
                <img
                  src={getImageUrl(ambassador.profilePhoto)}
                  alt={ambassador.fullName}
                  className="w-24 h-24 rounded-2xl object-cover shadow-lg"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextElementSibling.style.display = "flex";
                  }}
                />
              ) : null}
              <div
                className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg"
                style={{
                  display: ambassador.profilePhoto ? "none" : "flex",
                }}
              >
                <span className="text-3xl font-black text-white">
                  {ambassador.fullName?.charAt(0)}
                </span>
              </div>
              <div>
                <h1 className="text-3xl font-black text-gray-900 mb-3">
                  {ambassador.fullName}
                </h1>
                <div className="space-y-2 text-sm text-gray-600">
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-yellow-600" />
                    {ambassador.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-yellow-600" />
                    {ambassador.phone}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-yellow-600" />
                    {ambassador.college}, {ambassador.city}
                  </p>
                  <p className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-yellow-600" /> Registered:{" "}
                    {new Date(ambassador.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowUsersModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all font-bold"
            >
              <Eye className="w-5 h-5" />
              View Registered Users
            </button>
          </div>
        </div>

        {/* STEP 1: PROMOTION */}
        <div className="bg-white rounded-3xl shadow-xl border-2 border-yellow-200 p-8 mb-6">
          <StepHeader
            title="Step 1: Promotion"
            subtitle="Social media campaign verification"
            status={p?.status}
            icon={<Upload className="w-7 h-7 text-white" />}
            iconBg="bg-gradient-to-br from-yellow-400 to-orange-500"
          />

          {loadingImages ? (
  <div className="text-center py-8">
    <p className="text-gray-500">Loading images...</p>
  </div>
) : (
  <>
    {promotionImages.length > 0 ? (
      <>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <InfoCard
            title="SUBMITTED ON"
            color="blue"
            value={
              p?.submittedAt
                ? new Date(p.submittedAt).toLocaleDateString()
                : "N/A"
            }
          />
          <InfoCard
            title="TOTAL IMAGES"
            color="purple"
            value={`${promotionImages.length} files`}
          />
        </div>
        <ImageGrid
          images={promotionImages}
          label="Uploaded Proof"
          iconColor="text-yellow-600"
          borderColor="border-yellow-200"
          hoverBorderColor="hover:border-orange-400"
        />
      </>
    ) : (
      <EmptyState icon={Clock} text="No submission yet" />
    )}
  </>
)}

        </div>

        {/* STEP 2: SEMINAR */}
        <div className="bg-white rounded-3xl shadow-xl border-2 border-orange-200 p-8 mb-6">
          <StepHeader
            title="Step 2: Seminar"
            subtitle="Campus workshop verification"
            status={s?.status}
            icon={<Calendar className="w-7 h-7 text-white" />}
            iconBgLocked="bg-gray-300"
            iconBg="bg-gradient-to-br from-orange-400 to-red-500"
          />

          {s?.status === "locked" ? (
  <EmptyState
    icon={Shield}
    text="Step 2 is locked. Approve Step 1 first."
  />
) : (
  <>
    {s?.submittedAt || seminarImages.length > 0 ? (
      <>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <InfoCard
            title="SEMINAR TITLE"
            color="blue"
            value={
              s?.seminarTitle || images.seminar?.seminarTitle || "N/A"
            }
          />
          <InfoCard
            title="DATE"
            color="purple"
            value={
              s?.seminarDate || images.seminar?.seminarDate
                ? new Date(
                    s?.seminarDate || images.seminar?.seminarDate
                  ).toLocaleDateString()
                : "N/A"
            }
          />
          <InfoCard
            title="COLLEGE"
            color="green"
            value={images.seminar?.college || "N/A"}
          />
          <InfoCard
            title="PROOF FILES"
            color="orange"
            value={`${seminarImages.length} uploaded`}
          />
        </div>

        {seminarImages.length > 0 && (
          <ImageGrid
            images={seminarImages}
            label="Uploaded Seminar Proof"
            iconColor="text-orange-600"
            borderColor="border-orange-200"
            hoverBorderColor="hover:border-red-400"
            columns="md:grid-cols-3"
          />
        )}

        {s?.couponCode && (
          <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-300 mb-6">
            <p className="text-xs font-bold text-purple-700 mb-2 flex items-center gap-2">
              <Award className="w-4 h-4" />
              GENERATED COUPON CODE
            </p>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-mono">
                {s.couponCode}
              </p>
              <button
                onClick={() =>
                  navigator.clipboard.writeText(s.couponCode)
                }
                className="px-4 py-2 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition-colors flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                Copy
              </button>
            </div>
            {s.couponGeneratedAt && (
              <p className="text-xs text-purple-600 mt-2">
                Generated on:{" "}
                {new Date(s.couponGeneratedAt).toLocaleDateString()}
              </p>
            )}
          </div>
        )}
      </>
    ) : (
      <EmptyState icon={Clock} text="No submission yet" />
    )}
  </>
)}

        </div>

        {/* STEP 3: ONBOARDING */}
        <div className="bg-white rounded-3xl shadow-xl border-2 border-red-200 p-8">
          <StepHeader
            title="Step 3: Onboarding"
            subtitle="Final completion & rewards"
            status={o?.status}
            icon={<Award className="w-7 h-7 text-white" />}
            iconBgLocked="bg-gray-300"
            iconBgCompleted="bg-gradient-to-br from-green-400 to-emerald-500"
            iconBg="bg-gradient-to-br from-red-400 to-pink-500"
          />
          <div className="text-center py-8">
            {o?.status === "completed" ? (
              <>
                <Award className="w-16 h-16 text-green-500 mx-auto mb-3" />
                <p className="text-green-700 font-bold text-lg">
                  Ambassador journey completed! 🎉
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  Completed on: {new Date(o.completedAt).toLocaleDateString()}
                </p>
              </>
            ) : o?.status === "locked" ? (
              <EmptyState
                icon={Shield}
                text="Step 3 is locked. Approve Step 2 first."
              />
            ) : (
              <EmptyState
                icon={Clock}
                text="Ambassador can now access rewards dashboard"
                iconColor="text-yellow-500"
              />
            )}
          </div>

          <div className="mt-4 grid md:grid-cols-3 gap-4">
            <SimpleInfo
              title="CURRENT STEP"
              color="yellow"
              value={`Step ${ambassador.task?.currentStep || 1}/3`}
            />
            <SimpleInfo
              title="LOGIN STATUS"
              color="blue"
              value={
                ambassador.isApproved ? "Login Approved" : "Login Blocked"
              }
            />
            <SimpleInfo
              title="ONBOARDING STATUS"
              color="red"
              value={
                o?.status === "completed"
                  ? `Completed on ${new Date(
                      o.completedAt
                    ).toLocaleDateString()}`
                  : o?.status === "locked"
                  ? "Waiting for Step 2 approval"
                  : "In progress"
              }
            />
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
                    <h3 className="text-2xl font-black text-white">
                      Registered Users
                    </h3>
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
                  <p className="text-gray-500 font-medium text-lg">
                    No users registered yet
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    Users will appear here once they register with this coupon
                  </p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {couponUsers.users.map((u, i) => (
                    <div
                      key={u.email || i}
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
                Total:{" "}
                <span className="font-bold text-orange-600">
                  {couponUsers.totalUsers}
                </span>{" "}
                registered users
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

// ============== SUB-COMPONENTS ==============

const statusColor = (s) =>
  ({
    approved: "bg-green-100 text-green-700 border-green-300",
    pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
    rejected: "bg-red-100 text-red-700 border-red-300",
    locked: "bg-gray-100 text-gray-600 border-gray-300",
  }[s] || "bg-gray-100 text-gray-600 border-gray-300");

const statusIcon = (s) =>
  ({
    approved: <CheckCircle className="w-4 h-4" />,
    pending: <Clock className="w-4 h-4" />,
    rejected: <XCircle className="w-4 h-4" />,
    locked: <Shield className="w-4 h-4" />,
  }[s] || <Shield className="w-4 h-4" />);

function ImageGrid({
  images,
  label,
  iconColor,
  borderColor,
  hoverBorderColor,
  columns = "md:grid-cols-4",
}) {
  const [imageErrors, setImageErrors] = useState({});

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    const cleanPath = imagePath.replace(/^[\\\/]+/, "");
    return `${API_URL_IMAGES}/${cleanPath.replace(/\\/g, "/")}`;
  };

  const handleImageError = (index) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <div className="mb-6">
      <p className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
        <ImageIcon className={`w-4 h-4 ${iconColor}`} />
        {label} ({images.length})
      </p>
      <div className={`grid grid-cols-2 ${columns} gap-4`}>
        {images.map((img, i) => (
          <div
            key={`${img}-${i}`}
            className={`border-2 ${borderColor} rounded-xl overflow-hidden shadow-sm hover:shadow-lg ${hoverBorderColor} transition-all`}
          >
            {imageErrors[i] ? (
              <div className="w-full h-40 bg-gray-100 flex flex-col items-center justify-center">
                <XCircle className="w-12 h-12 text-gray-400 mb-2" />
                <p className="text-xs text-gray-500 font-medium">
                  Image Not Found
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  File may be deleted
                </p>
              </div>
            ) : (
              <img
                src={getImageUrl(img)}
                alt={`${label} ${i + 1}`}
                className="w-full h-40 object-cover"
                loading="lazy"
                onError={() => handleImageError(i)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function InfoCard({ title, color, value }) {
  const colorMap = {
    blue: "bg-blue-50 border-blue-200 text-blue-900",
    purple: "bg-purple-50 border-purple-200 text-purple-900",
    green: "bg-green-50 border-green-200 text-green-900",
    orange: "bg-orange-50 border-orange-200 text-orange-900",
  };
  const titleColorMap = {
    blue: "text-blue-700",
    purple: "text-purple-700",
    green: "text-green-700",
    orange: "text-orange-700",
  };
  return (
    <div className={`p-4 rounded-xl border ${colorMap[color]}`}>
      <p className={`text-xs font-bold mb-1 ${titleColorMap[color]}`}>
        {title}
      </p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  );
}

function StepHeader({
  title,
  subtitle,
  status,
  icon,
  iconBgLocked,
  iconBg,
  iconBgCompleted,
}) {
  const bg =
    status === "completed"
      ? iconBgCompleted || iconBg
      : status === "locked"
      ? iconBgLocked
      : iconBg;
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${bg}`}
        >
          {icon}
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-900">{title}</h2>
          <p className="text-sm text-gray-600">{subtitle}</p>
        </div>
      </div>
      <div
        className={`px-4 py-2 rounded-xl border-2 font-bold text-sm flex items-center gap-2 ${statusColor(
          status
        )}`}
      >
        {statusIcon(status)}
        {status?.toUpperCase()}
      </div>
    </div>
  );
}

function EmptyState({ icon: Icon, text, iconColor = "text-gray-400" }) {
  return (
    <div className="text-center py-8">
      <Icon className={`w-16 h-16 mx-auto mb-3 ${iconColor}`} />
      <p className="text-gray-500 font-medium">{text}</p>
    </div>
  );
}

function SimpleInfo({ title, color, value }) {
  const colorMap = {
    yellow: "bg-yellow-50 border-yellow-200 text-yellow-900",
    blue: "bg-blue-50 border-blue-200 text-blue-900",
    red: "bg-red-50 border-red-200 text-red-900",
  };
  const titleColorMap = {
    yellow: "text-yellow-700",
    blue: "text-blue-700",
    red: "text-red-700",
  };
  return (
    <div className={`p-4 rounded-xl border ${colorMap[color]}`}>
      <p className={`text-xs font-bold mb-1 ${titleColorMap[color]}`}>
        {title}
      </p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  );
}

export default Page;
