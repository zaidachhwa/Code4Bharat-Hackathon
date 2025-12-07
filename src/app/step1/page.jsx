"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  Upload,
  Trash2,
  Download,
  Lock,
  CheckCircle,
  ImageDown,
} from "lucide-react";
import axios from "axios";

// No API calls here. Only UI + console logs.
export default function Step1Promotion({ ambassadorId, adminImages = [] }) {
  const [files, setFiles] = useState({ day1: [], day2: [] });
  const [day1Confirmed, setDay1Confirmed] = useState(false);
  const [day2Confirmed, setDay2Confirmed] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;


  // "currentDay" simulates which phase you are in:
  // - "day1": only Day 1 active
  // - "day2": only Day 2 active (this would be set by backend after 24h in real app)
  const [currentDay, setCurrentDay] = useState("day1");

  // Helpers to know which side should be active
  const isDay1Active = currentDay === "day1";
  const isDay2Active = currentDay === "day2";

  // Download admin assets (unchanged)
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

  // Upload handler for one day (only logs FormData for that day)
  const handleUpload = (event, day) => {
    const selectedFiles = Array.from(event.target.files || []);
    if (!selectedFiles.length) return;

    // Lock rules:
    if (day === "day1" && !isDay1Active) {
      toast.error("Day 1 upload is closed. You are in Day 2 phase now.");
      event.target.value = "";
      return;
    }
    if (day === "day2" && !isDay2Active) {
      toast.error("Day 2 uploads will open after Day 1 is submitted (24h in real app).");
      event.target.value = "";
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      // field name for backend: e.g. multer.array("screenshots")
      formData.append("screenshots", file);
    });
    formData.append("day", day);
    formData.append("ambassadorId", ambassadorId);

    console.log(`=== SINGLE ${day.toUpperCase()} UPLOAD FormData ===`);
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    // Update local preview
    setFiles((prev) => ({
      ...prev,
      [day]: [...prev[day], ...selectedFiles],
    }));

    toast.success(`${day.toUpperCase()} upload (local) recorded ✔`);
    event.target.value = "";
  };

  const removeFile = (day, index) => {
    if (day === "day1" && !isDay1Active) return;
    if (day === "day2" && !isDay2Active) return;

    setFiles((prev) => ({
      ...prev,
      [day]: prev[day].filter((_, i) => i !== index),
    }));
  };

  // Submit button behavior:
  // - When currentDay === "day1": send only Day1 data, then switch to "day2"
  // - When currentDay === "day2": send only Day2 data
  const handleSubmit = async() => {
    if (currentDay === "day1") {
      // Build FormData for Day 1 only
      const formData = new FormData();
      files.day1.forEach((file) => {
        formData.append("day1Screenshots", file);
      });
      formData.append("day1Confirmed", String(day1Confirmed));
      formData.append("ambassadorId", ambassadorId);

      console.log("=== SUBMIT DAY 1 FormData (send this to backend) ===");
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }

      // TODO: your API call for day1 submit:
      //////////// data going to backend of step1 day1 ////////////
      const res = await axios.post(
        `${API_URL}/step1/day1/uploads`,
        formData,
        {
          withCredentials: true, // ⭐ sends cookie (JWT)
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // console.log("hello world", formData);

      toast.success("Day 1 submitted — now waiting 24h (simulated).");

      // In real app you would switch to Day 2 only after backend says 24h passed.
      // For now, we switch immediately so you can test the UI.

      // setCurrentDay("day2"); ////////////////////////////
    } else if (currentDay === "day2") {
      const formData = new FormData();
      files.day2.forEach((file) => {
        formData.append("day2Screenshots", file);
      });
      formData.append("day2Confirmed", String(day2Confirmed));
      formData.append("ambassadorId", ambassadorId);

      console.log("=== SUBMIT DAY 2 FormData (send this to backend) ===");
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }

      // TODO: your API call for day2 submit:
      // fetch('/api/task/submit-step1-day2/' + ambassadorId, { method: 'POST', body: formData })

      toast.success("Day 2 submitted — Step 1 complete (simulated).");
    }
  };

  // Button enable logic per phase
  const canSubmitDay1 =
    isDay1Active && files.day1.length > 0 && day1Confirmed;
  const canSubmitDay2 =
    isDay2Active && files.day2.length > 0 && day2Confirmed;

  const buttonDisabled =
    (currentDay === "day1" && !canSubmitDay1) ||
    (currentDay === "day2" && !canSubmitDay2);

  const buttonLabel =
    currentDay === "day1" ? "Submit Day 1 Proof" : "Submit Day 2 Proof";

  // Simple progress (just for UI feedback)
  const progressWidth =
    (files.day1.length && day1Confirmed ? 50 : 0) +
    (files.day2.length && day2Confirmed ? 50 : 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 px-4 sm:px-6 lg:px-8 py-8">
      <Toaster position="top-right" />

      <div className="max-w-3xl mx-auto">
        {/* Top bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <p className="text-[11px] uppercase text-blue-500 tracking-[0.2em]">
              Step 1 of 3
            </p>
            <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900">
              Promotion Proof
            </h1>
            <p className="text-slate-600 mt-1 text-sm">
              First complete Day 1, then after 24 hours Day 2 will open.
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
        <div className="border rounded-2xl p-5 mb-8 shadow-sm bg-white border-slate-200">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-blue-500 w-5 h-5" />
            <div>
              <p className="text-sm font-medium text-slate-800">
                {currentDay === "day1"
                  ? "You are on Day 1."
                  : "You are on Day 2."}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Only one day is active at a time. Backend will move to Day 2
                after 24 hours.
              </p>
            </div>
          </div>

          <div className="w-full bg-slate-200 h-2 mt-4 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(progressWidth, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Upload Sections */}
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
                className={`relative bg-white border rounded-2xl p-6 shadow-sm transition ${
                  isActive
                    ? "hover:border-blue-200 hover:shadow-md"
                    : "opacity-60 pointer-events-none"
                }`}
              >
                {day === "day2" && (
                  <span className="absolute -top-2 right-4 rounded-full bg-slate-900 text-white text-[10px] px-3 py-[3px]">
                    {isDay2Active
                      ? "Day 2 is active"
                      : "Locked until backend moves you to Day 2 (24h)"}
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

                <label className="flex items-center gap-3 mt-4 text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    disabled={files[day].length === 0 || !isActive}
                    checked={confirmed}
                    onChange={() => {
                      if (day === "day1") {
                        setDay1Confirmed(!day1Confirmed);
                      } else {
                        setDay2Confirmed(!day2Confirmed);
                      }
                    }}
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

        {/* Submit Button – works for one day at a time */}
        <button
          onClick={handleSubmit}
          disabled={buttonDisabled}
          className={`w-full py-3 mt-8 rounded-xl font-medium text-sm sm:text-base text-white shadow-sm transition ${
            !buttonDisabled
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-slate-300 cursor-not-allowed"
          }`}
        >
          {buttonLabel} (check console)
        </button>
      </div>
    </div>
  );
}
