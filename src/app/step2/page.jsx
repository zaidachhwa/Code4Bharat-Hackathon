"use client";

import { useEffect, useState } from "react";
import {
  Users,
  AlertCircle,
  Upload,
  FileImage,
  X,
  ArrowRight,
  Calendar,
  Building2,
  UserCheck,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SeminarPage() {
  const [activeTab, setActiveTab] = useState("seminar");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    college: "",
    seminarTitle: "",
    seminarDate: "",
    participants: "",
  });
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    getSeminarData();
    getCreatedTime();
  }, []);

  const getSeminarData = async () => {
    try {
      const res = await axios.get(`${API_URL}/seminar/get-seminar-data`, {
        withCredentials: true,
      });
      const fullName = res.data?.ambassador?.fullName || "";

      console.log("📥 Fetched Ambassador Data:", res);

      const prefix = fullName.substring(0, 4).toUpperCase();
      const randomCode = Math.random()
        .toString(36)
        .substring(2, 6)
        .toUpperCase();
      const generatedCoupon = `${prefix}-${randomCode}`;

      setCouponCode(generatedCoupon);

      console.log("🎟 Generated Coupon Code:", generatedCoupon);
    } catch (error) {
      console.error("❌ Fetch Error:", error);
    }
  };

  const getCreatedTime = async () => {
    try {
      const res = await axios.get(`${API_URL}/seminar/get-created-time`, {
        withCredentials: true,
      });

      console.log("📥 Fetched Created Time:", res.data.createdTime);

      // NEW LOGIC: if backend sent a created time, lock UI
      setIsSubmitted(Boolean(res.data?.seminarSubmitted));
    } catch (err) {
      console.log("⚠ Error fetching created time:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles([...uploadedFiles, ...files]);
  };

  const removeFile = (index) => {
    const newFiles = [...uploadedFiles];
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
  };

  const generateCoupon = () => {
    const code =
      "CPN-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    setCouponCode(code);
  };

  const handleSubmit = async () => {
    if (
      !formData.college ||
      !formData.seminarTitle ||
      !formData.seminarDate ||
      !formData.participants
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (uploadedFiles.length === 0) {
      alert("Please upload at least one proof file.");
      return;
    }

    const data = new FormData();
    data.append("college", formData.college);
    data.append("seminarTitle", formData.seminarTitle);
    data.append("seminarDate", formData.seminarDate);
    data.append("participants", formData.participants);

    uploadedFiles.forEach((file, index) => {
      data.append("proofFiles", file);
    });

    data.append("couponCode", couponCode);

    console.log("📨 Sending coupon in formData:", couponCode);

    console.log("📦 Form Data Sent to Backend:");
    for (const pair of data.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const response = await axios.post(
        `${API_URL}/seminar/upload-proof`,
        data,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("✅ Backend Response:", response.data);
      alert("Seminar proof submitted successfully!");

      setTimeout(() => {
        router.push("/ambassador-dashboard");
      }, 1000);

      setFormData({
        college: "",
        seminarTitle: "",
        seminarDate: "",
        participants: "",
      });
      setUploadedFiles([]);
      setCouponCode("");
    } catch (error) {
      console.error("❌ Upload Error:", error);
      alert("Failed to submit form. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 p-4 sm:p-6 md:p-12">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-amber-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="space-y-8 max-w-6xl mx-auto relative z-10">
        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8 md:p-10 hover:shadow-amber-200/50 transition-all duration-500">
          {/* Header Section */}
          <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
            <div className="flex-1 min-w-[250px]">
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <span className="px-4 py-1.5 bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-xs font-bold rounded-full shadow-lg animate-pulse">
                  STEP 2
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 bg-clip-text text-transparent">
                  Host Campus Seminar
                </h2>
              </div>
              <p className="text-gray-600 text-base sm:text-lg max-w-3xl leading-relaxed">
                Host an on-campus seminar within 2 months of your promotion post
                and share proof of completion.
              </p>
            </div>
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 via-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 relative overflow-hidden group">
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <Users className="w-10 h-10 text-white relative z-10" />
            </div>
          </div>

          {/* Alert Box */}
          <div className="p-5 bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 rounded-2xl mb-8 flex items-start gap-4 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
              <AlertCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-base font-bold text-amber-900 mb-1 flex items-center gap-2">
                Time Sensitive
                <Sparkles className="w-4 h-4 text-amber-600" />
              </p>
              <p className="text-sm text-amber-800 leading-relaxed">
                You have 2 months from your promotion date to complete this
                seminar and upload the proof.
              </p>
            </div>
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* College Name */}
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                <Building2 className="w-4 h-4 text-amber-500" />
                College Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="college"
                  value={formData.college}
                  onChange={handleInputChange}
                  disabled={isSubmitted}
                  placeholder="Enter your institution name"
                  className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm text-gray-800 placeholder:text-gray-400 hover:border-amber-300"
                />
              </div>
            </div>

            {/* Seminar Title */}
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                <Sparkles className="w-4 h-4 text-yellow-500" />
                Seminar Title <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="seminarTitle"
                  value={formData.seminarTitle}
                  onChange={handleInputChange}
                  placeholder="e.g. Career Paths in Product Management"
                  className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/20 outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm text-gray-800 placeholder:text-gray-400 hover:border-yellow-300"
                />
              </div>
            </div>

            {/* Seminar Date */}
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                <Calendar className="w-4 h-4 text-orange-500" />
                Date of Seminar <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="seminarDate"
                  value={formData.seminarDate}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm text-gray-800 hover:border-orange-300"
                />
              </div>
            </div>

            {/* Participants */}
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                <UserCheck className="w-4 h-4 text-amber-500" />
                Number of Participants <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="participants"
                  value={formData.participants}
                  onChange={handleInputChange}
                  placeholder="Enter approximate count"
                  className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm text-gray-800 placeholder:text-gray-400 hover:border-amber-300"
                />
              </div>
            </div>
          </div>

          {/* File Upload Section */}
          <div className="mt-8">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
              <Upload className="w-4 h-4 text-amber-500" />
              Upload Seminar Proof <span className="text-red-500">*</span>
            </label>
            <p className="text-sm text-gray-600 mb-5 leading-relaxed">
              Photos or PDF agenda. Include at least one group photo or a signed
              verification document.
            </p>

            <label className="relative group cursor-pointer block">
              <input
                type="file"
                multiple
                accept="image/*,.pdf"
                disabled={isSubmitted}
                onChange={handleFileUpload}
                className="hidden"
              />
              <div className="w-full p-10 border-3 border-dashed border-gray-300 rounded-3xl hover:border-amber-500 bg-gradient-to-br from-gray-50 to-amber-50/30 hover:from-amber-50 hover:to-yellow-50 transition-all duration-500 flex flex-col items-center justify-center gap-4 hover:shadow-xl group-hover:scale-[1.02]">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xl">
                  <Upload className="w-10 h-10 text-white" />
                </div>
                <div className="text-center">
                  <p className="font-bold text-gray-800 text-lg mb-1">
                    Click to upload files
                  </p>
                  <p className="text-sm text-gray-600 mb-2">or drag and drop</p>
                  <p className="text-xs text-gray-500 bg-white/60 px-4 py-1.5 rounded-full inline-block">
                    PNG, JPG, PDF up to 10MB
                  </p>
                </div>
              </div>
            </label>

            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
              <div className="mt-6 space-y-3">
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-5 bg-gradient-to-r from-white to-amber-50/50 border-2 border-amber-100 rounded-2xl hover:shadow-lg hover:border-amber-300 transition-all duration-300 group"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 via-amber-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <FileImage className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 truncate mb-1">
                        {file.name}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      disabled={isSubmitted} // ⬅️ ADD
                      onClick={() => !isSubmitted && removeFile(index)} // ⬅️ PREVENT CLICK
                      className={`p-2.5 rounded-xl transition-all duration-300 ${
                        isSubmitted
                          ? "opacity-40 cursor-not-allowed"
                          : "text-red-500 hover:bg-red-50"
                      }`}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end items-center mt-10 pt-8 border-t-2 border-gray-200">
            <button
              onClick={!isSubmitted ? handleSubmit : undefined}
              disabled={isSubmitted}
              className={`group px-10 py-4 rounded-2xl font-bold transition-all ${
                isSubmitted
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 text-white hover:scale-105"
              }`}
            >
              <span className="relative z-10 flex items-center gap-2">
                {isSubmitted ? "Already Submitted ✔" : "Submit Proof"}
                {!isSubmitted && (
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                )}
              </span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
