"use client";

import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {
  Upload,
  Trash2,
  Download,
  Lock,
  CheckCircle,
  ImageDown,
} from "lucide-react";

export default function Step1Promotion({ ambassadorId, adminImages = [] }) {
  const [files, setFiles] = useState({ day1: [], day2: [] });
  const [day1Confirmed, setDay1Confirmed] = useState(false);
  const [day2Confirmed, setDay2Confirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  const isStepComplete =
    files.day1.length > 0 &&
    files.day2.length > 0 &&
    day1Confirmed &&
    day2Confirmed;

  // Download all admin images
  const handleDownloadAssets = () => {
    if (!adminImages.length) {
      toast.error("No assets available to download yet.");
      return;
    }

    adminImages.forEach((url, index) => {
      const link = document.createElement("a");
      link.href = url;
      link.download = `promotion-asset-${index + 1}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  // Upload handler
  const handleUpload = async (event, day) => {
    const selectedFiles = Array.from(event.target.files);

    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("screenshots", file));
    formData.append("day", day);

    try {
      setLoading(true);
      await axios.post(
        `http://localhost:5000/api/task/upload/${ambassadorId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setFiles((prev) => ({
        ...prev,
        [day]: [...prev[day], ...selectedFiles],
      }));

      toast.success(`${day.toUpperCase()} upload successful ✔`);
    } catch (error) {
      toast.error("Upload failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // Delete preview locally
  const removeFile = (day, index) => {
    setFiles((prev) => ({
      ...prev,
      [day]: prev[day].filter((_, i) => i !== index),
    }));
  };

  // Submit final proof
  const handleSubmit = async () => {
    try {
      setLoading(true);
      await axios.post(
        `http://localhost:5000/api/task/submit-step1/${ambassadorId}`,
        { day1Confirmed, day2Confirmed }
      );
      toast.success("Step 1 submitted — pending admin approval 🚀");
    } catch (error) {
      toast.error("Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  const progressWidth =
    (files.day1.length ? 40 : 0) +
    (day1Confirmed ? 10 : 0) +
    (files.day2.length ? 40 : 0) +
    (day2Confirmed ? 10 : 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 px-4 sm:px-6 lg:px-8 py-8">
      <Toaster position="top-right" />

      <div className="max-w-3xl mx-auto">
        {/* Top bar with title + assets download */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <p className="text-[11px] uppercase text-blue-500 tracking-[0.2em]">
              Step 1 of 3
            </p>
            <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900">
              Promotion Proof
            </h1>
            <p className="text-slate-600 mt-1 text-sm">
              Upload screenshots for both days and confirm to unlock Step 2.
            </p>
          </div>

          <div className="flex flex-col items-stretch gap-2 sm:items-end">
            <button
              type="button"
              onClick={handleDownloadAssets}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs sm:text-sm font-medium text-blue-700 hover:bg-blue-100 transition"
            >
              <ImageDown size={16} />
              Download All Assets
              {adminImages.length > 0 && (
                <span className="ml-1 rounded-full bg-blue-600 text-white text-[10px] px-2 py-[2px]">
                  {adminImages.length}
                </span>
              )}
            </button>
            <span className="text-[11px] text-slate-500">
              Provided by admin for your posts
            </span>
          </div>
        </div>

        {/* Status Box */}
        <div
          className={`border rounded-2xl p-5 mb-8 shadow-sm transition-all ${
            isStepComplete
              ? "bg-emerald-50 border-emerald-400"
              : "bg-white border-slate-200"
          }`}
        >
          <div className="flex items-center gap-3">
            {isStepComplete ? (
              <CheckCircle className="text-emerald-600 w-5 h-5" />
            ) : (
              <Lock className="text-slate-400 w-5 h-5" />
            )}
            <div>
              <p className="text-sm font-medium text-slate-800">
                {isStepComplete
                  ? "Step completed — waiting for admin approval"
                  : "Complete this step to proceed"}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Upload screenshots and confirm that posts stayed online.
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-200 h-2 mt-4 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(progressWidth, 100)}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Upload Sections */}
        <div className="grid gap-6">
          {["day1", "day2"].map((day) => {
            const isDay2Locked = day === "day2" && !day1Confirmed;
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
                className={`relative bg-white border rounded-2xl p-6 shadow-sm transition ${
                  isDay2Locked
                    ? "opacity-60 pointer-events-none"
                    : "hover:border-blue-200 hover:shadow-md"
                }`}
              >
                {day === "day2" && (
                  <span className="absolute -top-2 right-4 rounded-full bg-slate-900 text-white text-[10px] px-3 py-[3px]">
                    Unlocks after Day 1 confirm
                  </span>
                )}

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900">
                      {title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      {subtitle}
                    </p>
                  </div>
                  {files[day].length > 0 && (
                    <span className="text-[11px] rounded-full bg-blue-50 text-blue-700 px-2.5 py-[3px] border border-blue-100">
                      {files[day].length} file
                      {files[day].length > 1 ? "s" : ""} uploaded
                    </span>
                  )}
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <label className="cursor-pointer inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-xs sm:text-sm font-medium shadow-sm hover:bg-blue-700 transition">
                    <Upload size={16} />
                    <span>Upload Image(s)</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => handleUpload(e, day)}
                    />
                  </label>
                  <p className="text-[11px] sm:text-xs text-slate-500">
                    JPG, PNG only. You can upload multiple screenshots.
                  </p>
                </div>

                {/* Preview Files */}
                {files[day].length > 0 && (
                  <div className="mt-4 space-y-3">
                    {files[day].map((file, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center bg-slate-50 px-4 py-3 border border-slate-100 rounded-lg"
                      >
                        <p className="text-sm text-slate-800 truncate max-w-[60%]">
                          {file.name}
                        </p>
                        <div className="flex items-center gap-3">
                          <a
                            href={URL.createObjectURL(file)}
                            download={file.name}
                            className="flex items-center text-blue-600 hover:text-blue-700 text-xs"
                          >
                            <Download size={16} className="mr-1" />
                            Preview / Download
                          </a>
                          <button
                            type="button"
                            onClick={() => removeFile(day, i)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Checkbox */}
                <label className="flex items-center gap-3 mt-4 text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    disabled={files[day].length === 0}
                    checked={confirmed}
                    onChange={() =>
                      day === "day1"
                        ? setDay1Confirmed(!day1Confirmed)
                        : setDay2Confirmed(!day2Confirmed)
                    }
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-xs sm:text-sm">
                    I confirm the post stayed online for{" "}
                    {day === "day1" ? "Day 1" : "Day 2"}.
                  </span>
                </label>
              </div>
            );
          })}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!isStepComplete || loading}
          className={`w-full py-3 mt-8 rounded-xl font-medium text-sm sm:text-base text-white shadow-sm transition ${
            isStepComplete && !loading
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-slate-300 cursor-not-allowed"
          }`}
        >
          {loading ? "Submitting..." : "Submit Proof"}
        </button>
      </div>
    </div>
  );
}
