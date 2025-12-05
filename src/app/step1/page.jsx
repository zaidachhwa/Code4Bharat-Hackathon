"use client";

import { useState } from "react";
import { Upload, Lock, Check, X } from "lucide-react";

export default function Step1Promotion() {
  const [files, setFiles] = useState([]);
  const [day1Confirmed, setDay1Confirmed] = useState(false);
  const [day2Confirmed, setDay2Confirmed] = useState(false);

  const handleFileUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles([...files, ...newFiles]);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const isStep1Complete =
    files.length >= 1 && day1Confirmed && day2Confirmed;

  return (
    <div className="min-h-screen bg-[#F7F9FC] px-6 lg:px-12 py-12">
      {/* Step Progress Header */}
      <div className="mb-10">
        <p className="text-sm font-medium text-blue-600 mb-1">Step 1 of 3</p>
        <h1 className="text-3xl font-bold text-gray-900">Promotion</h1>
        <p className="text-gray-600 mt-1">
          Upload proof of your social media post and keep it live for 2 days to unlock Step 2.
        </p>
      </div>

      {/* Unlock Indicator */}
      <div className={`rounded-2xl p-5 mb-8 border shadow-sm 
            ${isStep1Complete ? "bg-green-50 border-green-300" : "bg-white border-gray-200"}
        `}
      >
        <div className="flex items-center gap-3">
          {isStep1Complete ? (
            <Check size={20} className="text-green-600" />
          ) : (
            <Lock size={20} className="text-gray-500" />
          )}

          <p className="text-gray-800 text-sm">
            {isStep1Complete
              ? "Step 1 completed — Step 2 unlocked!"
              : "Complete Step 1 to unlock Step 2"}
          </p>
        </div>

        {/* Progress bar */}
        <div className="mt-4 w-full h-2 bg-gray-200 rounded-full">
          <div
            className="h-full bg-blue-600 rounded-full transition-all"
            style={{
              width: `${(files.length > 0 ? 33 : 0) +
                (day1Confirmed ? 33 : 0) +
                (day2Confirmed ? 34 : 0)}%`,
            }}
          ></div>
        </div>
      </div>

      {/* Assigned Post */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-10">
        <h3 className="text-gray-800 font-semibold mb-3">Assigned Post Content</h3>

        <div className="bg-gray-50 border rounded-xl p-5 text-gray-700 leading-relaxed">
          <p className="font-medium text-lg text-gray-900">
            “Join our Product Bootcamp this Fall”
          </p>
          <p className="mt-2 text-gray-600">
            Share this post on your social media and use the registration link provided.
            Keep the caption close to the suggested content.
          </p>
        </div>
      </div>

      {/* Upload Section */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 mb-10">
        <h3 className="text-gray-900 font-semibold mb-4">Upload Screenshot</h3>

        <label className="cursor-pointer inline-flex items-center gap-2 bg-blue-50 hover:bg-blue-100 
            text-blue-700 border border-blue-300 px-4 py-2 rounded-lg text-sm font-medium transition">
          <Upload size={18} />
          Upload screenshot
          <input type="file" className="hidden" onChange={handleFileUpload} multiple />
        </label>

        <p className="text-xs text-gray-500 mt-2">
          Upload at least 1 proof image. Max 3 files.
        </p>

        {/* File list */}
        <div className="mt-5 space-y-3">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-50 border border-gray-200 
                  rounded-xl px-4 py-3"
            >
              <div>
                <p className="text-gray-800 text-sm">{file.name}</p>
                <p className="text-gray-500 text-xs">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>

              <button
                onClick={() => removeFile(index)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 2-Day Confirmation */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-10 shadow-sm">
        <h3 className="text-gray-900 font-semibold mb-4">
          2-Day Posting Confirmation
        </h3>

        <div className="space-y-4">
          {/* Day 1 */}
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={day1Confirmed}
              onChange={() => setDay1Confirmed(!day1Confirmed)}
              className="h-5 w-5"
            />
            <span className="text-gray-700">I confirm the post stayed live for Day 1</span>
          </label>

          {/* Day 2 */}
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={day2Confirmed}
              onChange={() => setDay2Confirmed(!day2Confirmed)}
              className="h-5 w-5"
            />
            <span className="text-gray-700">I confirm the post stayed live for Day 2</span>
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <button
        disabled={!isStep1Complete}
        className={`px-6 py-3 rounded-xl text-white font-semibold w-full md:w-auto shadow 
        ${
          isStep1Complete
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        Submit Promotion Proof
      </button>
    </div>
  );
}
