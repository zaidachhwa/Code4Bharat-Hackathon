"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Users,
  CheckCircle,
  XCircle,
  Clock,
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
  Eye,
  X,
} from "lucide-react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5002/api";
const API_URL_IMAGES = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "http://localhost:5002";

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

// Helper function to format image URL (moved outside component to prevent recreation)
const getImageUrl = (imagePath) => {
  if (!imagePath) return "";
  const cleanPath = imagePath.replace(/^[\\\/]+/, "");
  const finalPath = cleanPath.startsWith("uploads")
    ? cleanPath
    : `uploads/${cleanPath}`;
  return `${API_URL_IMAGES}/${finalPath.replace(/\\/g, "/")}`;
};

export default function AmbassadorDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [ambassador, setAmbassador] = useState(null);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState({ promotion: {}, seminar: {} });
  const [loadingImages, setLoadingImages] = useState(true);
  const [showUsersModal, setShowUsersModal] = useState(false);
  const [couponUsers, setCouponUsers] = useState({
    couponCode: "",
    totalUsers: 0,
    users: [],
  });

  useEffect(() => {
    if (!id) return;
    
    const fetchData = async () => {
      await Promise.all([
        fetchAmbassador(),
        fetchImages(),
        getCouponCodeUsers(),
      ]);
    };
    
    fetchData();
  }, [id]);

  const fetchAmbassador = async () => {
    try {
      const res = await fetch(`${API_URL}/ambassadors/data/${id}`);
      const data = await res.json();
      setAmbassador(data.ambassadors || null);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchImages = async () => {
    try {
      const res = await axios.get(`${API_URL}/images/get/${id}`, {
        withCredentials: true,
      });
      if (res.data?.success) {
        setImages(res.data.data || { promotion: {}, seminar: {} });
      }
    } catch (e) {
      console.error("Image fetch failed:", e);
    } finally {
      setLoadingImages(false);
    }
  };

  const getCouponCodeUsers = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/ambassador-coupen-code-users/${id}`,
        {
          withCredentials: true,
        }
      );
      const { couponCode, totalUsers, users } = res.data || {};
      setCouponUsers({
        couponCode: couponCode || "",
        totalUsers: totalUsers || 0,
        users: users || [],
      });
    } catch (e) {
      console.error("Failed to fetch coupon code users:", e);
    }
  };

  const handlePromotionAction = async () => {
    // your existing logic
  };

  const handleSeminarAction = async () => {
    // your existing logic
  };

  // Memoize image arrays to prevent unnecessary re-renders
  const promotionImages = useMemo(() => [
    ...(images.promotion?.day1Screenshots || []),
    ...(images.promotion?.day2Screenshots || []),
  ], [images.promotion]);

  const seminarImages = useMemo(() => 
    images.seminar?.uploadedProof || [], 
    [images.seminar]
  );

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!ambassador)
    return (
      <div className="p-10 text-center text-red-500">Ambassador not found</div>
    );

  const p = ambassador.task?.promotion;
  const s = ambassador.task?.seminar;
  const o = ambassador.task?.onboarding;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 p-6">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => router.push("/admin-logged")}
          className="mb-6 flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-md hover:shadow-lg transition-all text-gray-700 font-medium"
        >
          <ArrowLeft className="w-5 h-5" /> Back to List
        </button>

        {/* HEADER */}
        <div className="bg-white rounded-3xl shadow-2xl border-2 border-yellow-200 p-8 mb-6">
          <div className="flex items-start justify-between flex-wrap gap-6">
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
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
          ) : promotionImages.length > 0 ? (
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

              {p?.status === "pending" && (
                <div className="flex gap-3 mt-6">
                  <ActionButton
                    onClick={() =>
                      handlePromotionAction(ambassador._id, "approve")
                    }
                    from="green-400"
                    to="emerald-500"
                    icon={<CheckCircle className="w-5 h-5" />}
                    label="Approve & Unlock Step 2"
                  />
                  <ActionButton
                    onClick={() =>
                      handlePromotionAction(ambassador._id, "reject")
                    }
                    from="red-400"
                    to="rose-500"
                    icon={<XCircle className="w-5 h-5" />}
                    label="Reject Step 1"
                  />
                </div>
              )}
            </>
          ) : (
            <EmptyState icon={Clock} text="No submission yet" />
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

          {s?.status !== "locked" && (s?.submittedAt || seminarImages.length > 0) ? (
            <>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <InfoCard
                  title="SEMINAR TITLE"
                  color="blue"
                  value={s?.seminarTitle || images.seminar?.seminarTitle || "N/A"}
                />
                <InfoCard
                  title="DATE"
                  color="purple"
                  value={
                    s?.seminarDate || images.seminar?.seminarDate
                      ? new Date(s?.seminarDate || images.seminar?.seminarDate).toLocaleDateString()
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

              {s?.status === "pending" && (
                <div className="flex gap-3">
                  <ActionButton
                    onClick={() =>
                      handleSeminarAction(ambassador._id, "approve")
                    }
                    from="green-400"
                    to="emerald-500"
                    icon={<CheckCircle className="w-5 h-5" />}
                    label="Approve & Generate Coupon"
                  />
                  <ActionButton
                    onClick={() =>
                      handleSeminarAction(ambassador._id, "reject")
                    }
                    from="red-400"
                    to="rose-500"
                    icon={<XCircle className="w-5 h-5" />}
                    label="Reject Step 2"
                  />
                </div>
              )}
            </>
          ) : (
            <EmptyState
              icon={Shield}
              text={
                s?.status === "locked"
                  ? "Step 2 is locked. Approve Step 1 first."
                  : "No submission yet"
              }
            />
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
                  Completed on:{" "}
                  {new Date(o.completedAt).toLocaleDateString()}
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

/* SUB-COMPONENTS */

// New optimized ImageGrid component
function ImageGrid({ images, label, iconColor, borderColor, hoverBorderColor, columns = "md:grid-cols-4" }) {
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
            <img
              src={getImageUrl(img)}
              alt={`${label} ${i + 1}`}
              className="w-full h-40 object-cover"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/400x300?text=Image+Not+Found";
              }}
            />
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

function ActionButton({ onClick, from, to, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-3 bg-gradient-to-r from-${from} to-${to} text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2`}
    >
      {icon}
      {label}
    </button>
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