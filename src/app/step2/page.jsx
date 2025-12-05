"use client";

import { useState } from "react";
import { Users, AlertCircle, Upload, FileImage, X, Ticket, ArrowRight } from "lucide-react";

export default function SeminarPage() {
  const [activeTab, setActiveTab] = useState("seminar");
  const [formData, setFormData] = useState({
    college: "",
    seminarTitle: "",
    seminarDate: "",
    participants: "",
  });
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [couponCode, setCouponCode] = useState("");

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles([...uploadedFiles, ...files]);
  };

  // Remove a file
  const removeFile = (index) => {
    const newFiles = [...uploadedFiles];
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
  };

  // Generate a random coupon
  const generateCoupon = () => {
    const code = "CPN-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    setCouponCode(code);
  };

  // Submit form (placeholder)
  const handleSubmit = () => {
    if (!formData.college || !formData.seminarTitle || !formData.seminarDate || !formData.participants) {
      alert("Please fill all fields.");
      return;
    }
    if (uploadedFiles.length === 0) {
      alert("Please upload at least one proof file.");
      return;
    }
    alert("Seminar proof submitted successfully!");
    // Reset form (optional)
    setFormData({ college: "", seminarTitle: "", seminarDate: "", participants: "" });
    setUploadedFiles([]);
    setCouponCode("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="space-y-8 max-w-5xl mx-auto">
        

        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-8">
          <div className="flex items-start justify-between mb-6 flex-wrap">
            <div className="flex-1 min-w-[250px]">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">STEP 2</span>
                <h2 className="text-3xl font-bold text-gray-900">Host Campus Seminar</h2>
              </div>
              <p className="text-gray-600 max-w-3xl">
                Host an on-campus seminar within 2 months of your promotion post and share proof of completion.
              </p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg mt-4 md:mt-0">
              <Users className="w-8 h-8 text-white" />
            </div>
          </div>

          <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-lg mb-8 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-900">Time Sensitive</p>
              <p className="text-sm text-amber-700">You have 2 months from your promotion date to complete this seminar.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {["college", "seminarTitle", "seminarDate", "participants"].map((field, idx) => (
              <div key={idx}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {field === "college" ? "College Name *" :
                   field === "seminarTitle" ? "Seminar Title *" :
                   field === "seminarDate" ? "Date of Seminar *" :
                   "Number of Participants *"}
                </label>
                <input
                  type={field === "seminarDate" ? "date" : field === "participants" ? "number" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  placeholder={field === "college" ? "Enter your institution name" :
                              field === "seminarTitle" ? "e.g. Career Paths in Product Management" :
                              field === "participants" ? "Enter approximate count" : ""}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                />
              </div>
            ))}
          </div>

          <div className="mt-8">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Seminar Proof *</label>
            <p className="text-sm text-gray-500 mb-4">
              Photos or PDF agenda. Include at least one group photo or a signed verification document.
            </p>

            <label className="relative group cursor-pointer">
              <input 
                type="file" 
                multiple
                accept="image/*,.pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div className="w-full p-8 border-3 border-dashed border-gray-300 rounded-2xl hover:border-blue-500 hover:bg-blue-50/50 transition-all duration-300 flex flex-col items-center justify-center gap-3">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Upload className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-gray-700">Click to upload files</p>
                  <p className="text-sm text-gray-500">or drag and drop</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG, PDF up to 10MB</p>
                </div>
              </div>
            </label>

            {uploadedFiles.length > 0 && (
              <div className="mt-6 space-y-3">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileImage className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{file.name}</p>
                      <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    <button 
                      onClick={() => removeFile(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {couponCode && (
            <div className="mt-8 p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Ticket className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-green-900 mb-2">🎉 Coupon Code Generated!</p>
                  <div className="flex items-center gap-4 mb-2">
                    <p className="text-3xl font-bold tracking-wider text-green-900 font-mono">{couponCode}</p>
                    <button 
                      onClick={() => navigator.clipboard.writeText(couponCode)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors"
                    >
                      Copy Code
                    </button>
                  </div>
                  <p className="text-sm text-green-700">Share this with participants for a discount on program fees.</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200 flex-wrap gap-3">
            <button className="px-6 py-3 text-gray-600 hover:text-gray-900 font-semibold transition-colors">
              Save as Draft
            </button>
            <div className="flex gap-3 flex-wrap">
              {!couponCode && uploadedFiles.length > 0 && (
                <button 
                  onClick={generateCoupon}
                  className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 hover:shadow-lg transition-all duration-300"
                >
                  Generate Coupon
                </button>
              )}
              <button 
                onClick={handleSubmit}
                className="group px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 flex items-center gap-2"
              >
                Submit Proof
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
