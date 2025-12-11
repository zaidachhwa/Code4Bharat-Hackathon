"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function HackathonRegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    collegeYear: "",
    domain: "",
    github: "",
    linkedin: "",
    socialPresence: "",
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // ⭐ NEW STATES FOR BACKEND FEEDBACK
  const [backendError, setBackendError] = useState("");
  const [backendSuccess, setBackendSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName || formData.fullName.trim().length < 2)
      newErrors.fullName = "Please enter your full name";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email))
      newErrors.email = "Enter a valid email address";

    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone))
      newErrors.phone = "Phone must be 10 digits";

    if (!formData.collegeYear || formData.collegeYear.trim().length < 2)
      newErrors.collegeYear = "Please enter your college and year";

    if (!formData.domain) newErrors.domain = "Select a domain of interest";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitted(true);
    setBackendError("");
    setBackendSuccess("");

    try {
      const res = await axios.post(`${API_URL}/registration`, formData);

      // ⭐ Show success from backend
      setBackendSuccess(res.data.message || "Registration successful!");

    } catch (err) {
      console.error("Submit error:", err);

      const message =
        err?.response?.data?.message || "Something went wrong.";

      // ⭐ Show backend error message
      setBackendError(message);
      setSubmitted(false);
      return;
    }

    setTimeout(() => {
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        collegeYear: "",
        domain: "",
        github: "",
        linkedin: "",
        socialPresence: "",
      });
      setSubmitted(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center py-12 px-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-md ring-1 ring-gray-100 overflow-hidden">

        {/* Header */}
        <div className="px-8 py-10 bg-gradient-to-r from-slate-800 to-indigo-600 text-white">
          <h2 className="text-2xl font-semibold tracking-tight">
            Hackathon Registration
          </h2>
          <p className="mt-1 text-sm opacity-90">
            Formal registration — please provide accurate details
          </p>
        </div>

        {/* ⭐ Backend Success Message */}
        {backendSuccess && (
          <div className="mx-8 mt-6 p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700">
            <div className="font-medium">{backendSuccess}</div>
          </div>
        )}

        {/* ⭐ Backend Error Message */}
        {backendError && (
          <div className="mx-8 mt-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700">
            <div className="font-medium">Error</div>
            <div className="text-sm">{backendError}</div>
          </div>
        )}

        <form className="px-8 pb-8 pt-6" onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 gap-6">

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full name <span className="text-rose-500">*</span>
              </label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className={`mt-2 block w-full rounded-lg border px-3 py-2 text-sm shadow-sm ${
                  errors.fullName ? "border-rose-400" : "border-gray-200"
                }`}
              />
              {errors.fullName && <p className="mt-1 text-xs text-rose-600">{errors.fullName}</p>}
            </div>

            {/* Email + Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email <span className="text-rose-500">*</span>
                </label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  className={`mt-2 block w-full rounded-lg border px-3 py-2 text-sm shadow-sm ${
                    errors.email ? "border-rose-400" : "border-gray-200"
                  }`}
                />
                {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone <span className="text-rose-500">*</span>
                </label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    if (value.length <= 10)
                      setFormData((prev) => ({ ...prev, phone: value }));
                    if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
                  }}
                  placeholder="10-digit number"
                  className={`mt-2 block w-full rounded-lg border px-3 py-2 text-sm shadow-sm ${
                    errors.phone ? "border-rose-400" : "border-gray-200"
                  }`}
                />
                {errors.phone && <p className="mt-1 text-xs text-rose-600">{errors.phone}</p>}
              </div>
            </div>

            {/* College */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                College & Year <span className="text-rose-500">*</span>
              </label>
              <input
                name="collegeYear"
                value={formData.collegeYear}
                onChange={handleChange}
                placeholder="Institute Name — 2nd Year"
                className={`mt-2 block w-full rounded-lg border px-3 py-2 text-sm shadow-sm ${
                  errors.collegeYear ? "border-rose-400" : "border-gray-200"
                }`}
              />
              {errors.collegeYear && <p className="mt-1 text-xs text-rose-600">{errors.collegeYear}</p>}
            </div>

            {/* Domain */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Domain of interest <span className="text-rose-500">*</span>
              </label>
              <select
                name="domain"
                value={formData.domain}
                onChange={handleChange}
                className={`mt-2 block w-full rounded-lg border px-3 py-2 text-sm shadow-sm ${
                  errors.domain ? "border-rose-400" : "border-gray-200"
                }`}
              >
                <option value="">Select a domain</option>
                <option value="DSA">DSA</option>
                <option value="Web Development">Web Development</option>
                <option value="MySQL">MySQL</option>
              </select>
              {errors.domain && <p className="mt-1 text-xs text-rose-600">{errors.domain}</p>}
            </div>

            {/* GitHub + LinkedIn */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  GitHub profile
                </label>
                <input
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  placeholder="github.com/username"
                  className={`mt-2 block w-full rounded-lg border px-3 py-2 text-sm shadow-sm ${
                    errors.github ? "border-rose-400" : "border-gray-200"
                  }`}
                />
                {errors.github && <p className="mt-1 text-xs text-rose-600">{errors.github}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  LinkedIn profile
                </label>
                <input
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="linkedin.com/in/username"
                  className={`mt-2 block w-full rounded-lg border px-3 py-2 text-sm shadow-sm ${
                    errors.linkedin ? "border-rose-400" : "border-gray-200"
                  }`}
                />
                {errors.linkedin && <p className="mt-1 text-xs text-rose-600">{errors.linkedin}</p>}
              </div>
            </div>

            {/* Social Presence */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Social Presence (Portfolio / Instagram / X / Any URL)
              </label>
              <input
                name="socialPresence"
                value={formData.socialPresence}
                onChange={handleChange}
                placeholder="yourwebsite.com or social link"
                className={`mt-2 block w-full rounded-lg border px-3 py-2 text-sm shadow-sm ${
                  errors.socialPresence ? "border-rose-400" : "border-gray-200"
                }`}
              />
              {errors.socialPresence && (
                <p className="mt-1 text-xs text-rose-600">{errors.socialPresence}</p>
              )}
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95"
              >
                {submitted ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Submitted
                  </>
                ) : (
                  "Submit registration"
                )}
              </button>

              <p className="mt-3 text-center text-xs text-gray-400">
                All fields marked with * are required — by submitting you agree to event terms.
              </p>
            </div>

            {/* Go to Home Page Button */}
            <div className="mt-4">
              <Link
                href="/"
                className="w-full block text-center rounded-lg text-indigo-600 px-4 py-2 text-sm font-semibold hover:bg-indigo-50 transition"
              >
                ← Go to Home Page
              </Link>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}
