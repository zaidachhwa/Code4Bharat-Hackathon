"use client";

import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  Upload,
  Trash2,
  Download,
  CheckCircle,
  ImageDown,
  ArrowLeft,
  X,
} from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Step1Promotion({ ambassadorId, adminImages = [] }) {
  const [files, setFiles] = useState({ day1: [], day2: [] });
  const [day1Confirmed, setDay1Confirmed] = useState(false);
  const [day2Confirmed, setDay2Confirmed] = useState(false);
  const [waitingHours, setWaitingHours] = useState(null);
  const [currentDay, setCurrentDay] = useState("day1");
  const [adminPromotionImages, setAdminPromotionImages] = useState([]);
  const [showImagesModal, setShowImagesModal] = useState(false);
  const router = useRouter();

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5002/api";
  const API_URL_IMAGES =
    process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "http://localhost:5002";

  useEffect(() => {
    getPromotionData();
    getAdminImages();
  }, []);

  const getAdminImages = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/promotion/images`);
      const images = res.data.adminImages[0]?.images || [];
      console.log("Fetched images:", images);
      console.log("Number of images:", images.length);
      setAdminPromotionImages(images);
    } catch (err) {
      console.log("Error fetching admin images:", err);
    }
  };

  const getPromotionData = async () => {
    try {
      const res = await axios.get(`${API_URL}/step1/get-promotion-data`, {
        withCredentials: true,
      });
      console.log("Promotion Data", res.data);

      const promotion = res.data?.data?.promotion;
      setDay1Confirmed(promotion?.day1Confirmed ?? false);
      setDay2Confirmed(promotion?.day2Confirmed ?? false);

      if (!promotion) return;

      const today = new Date().toDateString();
      const submissionDate = promotion?.submittedAt
        ? new Date(promotion.submittedAt).toDateString()
        : null;

      if (!promotion.day1Confirmed) {
        setCurrentDay("day1");
        return;
      }

      if (
        submissionDate === today &&
        promotion.day1Confirmed &&
        !promotion.day2Confirmed
      ) {
        setCurrentDay("lockedDay2");
        return;
      }

      if (
        submissionDate !== today &&
        promotion.day1Confirmed &&
        !promotion.day2Confirmed
      ) {
        setCurrentDay("day2");
        return;
      }

      if (promotion.day1Confirmed && promotion.day2Confirmed) {
        setCurrentDay("completed");
      }
    } catch (err) {
      console.log(err);
      toast.error("Error fetching promotion data");
    }
  };

  const isCompleted = currentDay === "completed";
  const isDay1Active = currentDay === "day1";
  const isDay2Active = currentDay === "day2";
  const isLocked = currentDay === "lockedDay2";

  const handleDownloadAssets = () => {
    if (!adminPromotionImages.length) {
      toast.error("No assets available to download yet.");
      return;
    }
    setShowImagesModal(true);
  };

  const downloadSingleImage = async (imagePath, index) => {
    try {
      const imageUrl = `${API_URL_IMAGES}${imagePath}`;

      // Fetch image as blob
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `promotion-asset-${index + 1}${imagePath.substring(
        imagePath.lastIndexOf(".")
      )}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success(`Downloaded asset ${index + 1}`);
    } catch (err) {
      console.error("Download failed:", err);
      toast.error('Download failed. Try "Open Full" instead.');
    }
  };

  const handleUpload = (event, day) => {
    const selectedFiles = Array.from(event.target.files || []);
    if (!selectedFiles.length) return;

    if (day === "day1" && !isDay1Active) {
      toast.error("Day 1 upload is closed. You are in Day 2 phase now.");
      event.target.value = "";
      return;
    }
    if (day === "day2" && (!isDay2Active || isLocked)) {
      toast.error(
        "Day 2 uploads will open after Day 1 is submitted (24h in real app)."
      );
      event.target.value = "";
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("screenshots", file));
    formData.append("day", day);
    formData.append("ambassadorId", ambassadorId);

    console.log(`=== SINGLE ${day.toUpperCase()} UPLOAD FormData ===`);
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    setFiles((prev) => ({ ...prev, [day]: [...prev[day], ...selectedFiles] }));
    toast.success(`${day.toUpperCase()} upload (local) recorded ✔`);
    event.target.value = "";
  };

  const removeFile = (day, index) => {
    if (isLocked) return;
    if (day === "day1" && !isDay1Active) return;
    if (day === "day2" && !isDay2Active) return;

    setFiles((prev) => ({
      ...prev,
      [day]: prev[day].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    if (currentDay === "day1") {
      const formData = new FormData();
      files.day1.forEach((file) => formData.append("day1Screenshots", file));
      formData.append("day1Confirmed", String(day1Confirmed));
      formData.append("ambassadorId", ambassadorId);

      console.log("=== SUBMIT DAY 1 FormData (send this to backend) ===");
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const res = await axios.post(`${API_URL}/step1/day1/uploads`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Day 1 submitted!");

      setTimeout(() => {
        router.push("/ambassador-dashboard");
      }, 1000);
    } else if (currentDay === "day2") {
      const formData = new FormData();
      files.day2.forEach((file) => formData.append("screenshots", file));
      formData.append("day2Confirmed", String(day2Confirmed));
      formData.append("ambassadorId", ambassadorId);

      console.log("=== SUBMIT DAY 2 FormData to backend ===");
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }

      try {
        const res = await axios.post(
          `${API_URL}/step1/day2/uploads`,
          formData,
          {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        toast.success("Day 2 submitted successfully! Step 1 Completed.");

        setTimeout(() => {
          router.push("/ambassador-dashboard");
        }, 1000);
      } catch (err) {
        console.log(err);
        toast.error("Day 2 submission failed");
      }
    }
  };

  const handleBackToDashboard = () => {
    router.push("/ambassador-dashboard");
  };

  const canSubmitDay1 = isDay1Active && files.day1.length > 0 && day1Confirmed;
  const canSubmitDay2 = isDay2Active && files.day2.length > 0 && day2Confirmed;
  const buttonDisabled =
    isCompleted ||
    isLocked ||
    (currentDay === "day1" && !canSubmitDay1) ||
    (currentDay === "day2" && !canSubmitDay2);

  const buttonLabel = isCompleted
    ? "Step Completed ✔"
    : isLocked
    ? "Come Back Tomorrow ⏳"
    : currentDay === "day1"
    ? "Submit Day 1 Proof"
    : "Submit Day 2 Proof";

  const progressWidth = (day1Confirmed ? 50 : 0) + (day2Confirmed ? 50 : 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 px-6 py-10">
      <Toaster position="top-right" />

      {/* Images Modal */}
      {showImagesModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b-2 border-yellow-200 p-6 flex items-center justify-between rounded-t-3xl">
              <h2 className="text-2xl font-black text-gray-900">
                Promotion Assets ({adminPromotionImages.length})
              </h2>
              <button
                onClick={() => setShowImagesModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {adminPromotionImages.map((imagePath, index) => (
                <div
                  key={index}
                  className="border-2 border-gray-200 rounded-2xl p-4 hover:border-yellow-400 transition-all"
                >
                  <img
                    src={`${API_URL_IMAGES}${imagePath}`}
                    alt={`Asset ${index + 1}`}
                    className="w-full h-64 object-cover rounded-xl mb-4"
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={() => downloadSingleImage(imagePath, index)}
                      className="flex-1 flex items-center justify-center gap-2 
bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 
text-white px-4 py-3 rounded-xl font-bold 
shadow-md hover:shadow-xl hover:scale-105 transition-all"
                    >
                      <Download size={18} />
                      Download
                    </button>
                    <a
                      href={`${API_URL_IMAGES}${imagePath}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 
bg-gradient-to-r from-yellow-100 to-orange-100 
text-orange-700 px-4 py-3 rounded-xl font-bold 
border-2 border-orange-300 
hover:bg-gradient-to-r hover:from-yellow-200 hover:to-orange-200 
hover:shadow-md transition-all"
                    >
                      Open Full
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto">
        <button
          onClick={handleBackToDashboard}
          className="flex items-center gap-2 mb-6 text-gray-700 hover:text-gray-900 font-semibold transition-colors bg-white/60 backdrop-blur-sm px-4 py-2 rounded-xl hover:bg-white/80"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>

        <div className="bg-white rounded-3xl shadow-2xl border-2 border-yellow-200 p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Upload className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-xs uppercase text-yellow-600 tracking-widest font-bold">
                    Step 1 of 3
                  </p>
                  <h1 className="text-3xl font-black text-gray-900">
                    Promotion Proof
                  </h1>
                </div>
              </div>
              <p className="text-base text-gray-600 ml-[68px]">
                Complete Day 1, then Day 2 opens after 24 hours.
              </p>
            </div>

            <button
              onClick={handleDownloadAssets}
              className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 px-6 py-4 text-base font-bold text-white shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <ImageDown size={20} />
              View & Download Assets
              {adminPromotionImages.length > 0 && (
                <span className="rounded-full bg-white text-orange-600 text-xs px-2.5 py-1 font-bold">
                  {adminPromotionImages.length}
                </span>
              )}
            </button>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border-2 border-yellow-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-yellow-600 w-6 h-6" />
                <p className="text-base font-bold text-gray-800">
                  {currentDay === "day1"
                    ? "Currently on Day 1"
                    : currentDay === "day2"
                    ? "Currently on Day 2"
                    : "Step Completed"}
                </p>
              </div>
              <p className="text-sm font-bold text-yellow-600">
                {Math.min(progressWidth, 100)}% Complete
              </p>
            </div>
            <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 transition-all duration-500 rounded-full"
                style={{ width: `${Math.min(progressWidth, 100)}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-3">
              {currentDay === "waiting"
                ? `⏳ Day 2 unlocks in ~${waitingHours} hours`
                : "Only one day is active at a time"}
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          {["day1", "day2"].map((day) => {
            const isActive =
              (day === "day1" && isDay1Active) ||
              (day === "day2" && isDay2Active);
            const title =
              day === "day1"
                ? "Day 1 Screenshot Upload"
                : "Day 2 Screenshot Upload";
            const subtitle =
              day === "day1"
                ? "Upload proof of your first-day promotion post."
                : "Upload proof of your second-day promotion post.";
            const confirmed = day === "day1" ? day1Confirmed : day2Confirmed;

            return (
              <div
                key={day}
                className={`relative bg-white border-2 rounded-3xl p-8 shadow-xl transition-all ${
                  isActive
                    ? "border-yellow-300 hover:shadow-2xl"
                    : "border-gray-200 opacity-60 pointer-events-none"
                }`}
              >
                {day === "day2" && !isActive && !isCompleted && (
                  <span className="absolute -top-3 right-6 rounded-full bg-gray-900 text-white text-xs px-4 py-2 font-bold shadow-lg">
                    🔒 Locked (next day open)
                  </span>
                )}

                {day === "day2" && isActive && (
                  <span className="absolute -top-3 right-6 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs px-4 py-2 font-bold shadow-lg">
                    ✓ Day 2 Active
                  </span>
                )}

                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${
                        isActive
                          ? "bg-gradient-to-br from-yellow-400 to-orange-500"
                          : "bg-gray-300"
                      }`}
                    >
                      <span className="text-xl font-black text-white">
                        {day === "day1" ? "1" : "2"}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-gray-900">
                        {title}
                      </h3>
                      <p className="text-base text-gray-600 mt-1">{subtitle}</p>
                    </div>
                  </div>
                  {files[day].length > 0 && (
                    <span className="text-sm rounded-full bg-blue-100 text-blue-700 px-4 py-2 border-2 border-blue-200 font-bold">
                      {files[day].length} file{files[day].length > 1 ? "s" : ""}
                    </span>
                  )}
                </div>

                <label className="cursor-pointer inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl text-base font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105">
                  <Upload size={20} />
                  Upload Image(s)
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => handleUpload(e, day)}
                  />
                </label>
                <p className="text-sm text-gray-500 mt-3">
                  JPG, PNG only. Multiple screenshots allowed.
                </p>

                {files[day].length > 0 && (
                  <div className="mt-6 space-y-3">
                    {files[day].map((file, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center bg-gradient-to-r from-gray-50 to-gray-100 px-5 py-4 border-2 border-gray-200 rounded-xl hover:border-yellow-300 transition-all"
                      >
                        <p className="text-base text-gray-800 font-semibold truncate max-w-[60%]">
                          {file.name}
                        </p>
                        <div className="flex items-center gap-4">
                          <a
                            href={URL.createObjectURL(file)}
                            download={file.name}
                            className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-bold"
                          >
                            <Download size={18} className="mr-2" />
                            Download
                          </a>
                          <button
                            type="button"
                            onClick={() => removeFile(day, i)}
                            className="text-red-500 hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <label className="flex items-center gap-3 mt-6 text-gray-700 cursor-pointer bg-yellow-50 p-4 rounded-xl border-2 border-yellow-200">
                  <input
                    type="checkbox"
                    disabled={files[day].length === 0 || !isActive}
                    checked={confirmed}
                    onChange={() =>
                      day === "day1"
                        ? setDay1Confirmed(!day1Confirmed)
                        : setDay2Confirmed(!day2Confirmed)
                    }
                    className="h-5 w-5 rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                  />
                  <span className="text-base font-medium">
                    I confirm the post stayed online for{" "}
                    {day === "day1" ? "Day 1" : "Day 2"}.
                  </span>
                </label>
              </div>
            );
          })}
        </div>

        <button
          onClick={handleSubmit}
          disabled={buttonDisabled}
          className={`w-full py-5 mt-8 rounded-2xl font-bold text-lg shadow-xl transition-all ${
            !buttonDisabled
              ? "bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white hover:shadow-2xl hover:scale-[1.02]"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}
