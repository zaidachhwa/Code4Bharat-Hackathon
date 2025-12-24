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

  const API_URL =  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5002/api";

  // const API_URL = "https://code4bharat-hackathon-backend.onrender.com/api"

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // New backend feedback states
  const [backendError, setBackendError] = useState("");
  const [backendSuccess, setBackendSuccess] = useState("");

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validation
  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email))
      newErrors.email = "Enter a valid email";

    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone))
      newErrors.phone = "Phone must be 10 digits";

    if (!formData.collegeYear.trim())
      newErrors.collegeYear = "College and year are required";

    if (!formData.domain) newErrors.domain = "Please select a domain";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitted(true);
    setBackendError("");
    setBackendSuccess("");

    try {
      const res = await axios.post(`${API_URL}/registration`, formData);

      setBackendSuccess(res.data.message || "Registration successful!");

      // Reset form
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
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        "Something went wrong. Please try again.";

      setBackendError(message);
      setSubmitted(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center py-12 px-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-md ring-1 ring-gray-100 overflow-hidden">
        {/* Header */}
        <div className="px-8 py-10 bg-gradient-to-r from-slate-800 to-indigo-600 text-white">
          <h2 className="text-2xl font-semibold">Hackathon Registration</h2>
          <p className="text-sm opacity-90">Provide accurate details</p>
        </div>

        {/* Backend Success */}
        {backendSuccess && (
          <div className="mx-8 mt-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg">
            {backendSuccess}
          </div>
        )}

        {/* Backend Error */}
        {backendError && (
          <div className="mx-8 mt-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {backendError}
          </div>
        )}

        <form className="px-8 pb-8 pt-6" onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full name <span className="text-red-500">*</span>
              </label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`mt-2 w-full rounded-lg border px-3 py-2 text-sm ${
                  errors.fullName ? "border-red-400" : "border-gray-300"
                }`}
                placeholder="John Doe"
              />
              {errors.fullName && (
                <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>
              )}
            </div>

            {/* Email + Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`mt-2 w-full rounded-lg border px-3 py-2 text-sm ${
                    errors.email ? "border-red-400" : "border-gray-300"
                  }`}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    if (value.length <= 10) {
                      setFormData((prev) => ({ ...prev, phone: value }));
                    }
                  }}
                  className={`mt-2 w-full rounded-lg border px-3 py-2 text-sm ${
                    errors.phone ? "border-red-400" : "border-gray-300"
                  }`}
                  placeholder="10-digit number"
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* College */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                College & Year <span className="text-red-500">*</span>
              </label>
              <input
                name="collegeYear"
                value={formData.collegeYear}
                onChange={handleChange}
                className={`mt-2 w-full rounded-lg border px-3 py-2 text-sm ${
                  errors.collegeYear ? "border-red-400" : "border-gray-300"
                }`}
                placeholder="XYZ Institute — 2nd Year"
              />
              {errors.collegeYear && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.collegeYear}
                </p>
              )}
            </div>

            {/* Domain */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Domain <span className="text-red-500">*</span>
              </label>
              <select
                name="domain"
                value={formData.domain}
                onChange={handleChange}
                className={`mt-2 w-full rounded-lg border px-3 py-2 text-sm ${
                  errors.domain ? "border-red-400" : "border-gray-300"
                }`}
              >
                <option value="">Select domain</option>
                <option value="DSA">DSA</option>
                <option value="Web Development">Web Development</option>
                <option value="MySQL">MySQL</option>
              </select>
              {errors.domain && (
                <p className="mt-1 text-xs text-red-600">{errors.domain}</p>
              )}
            </div>

            {/* OPTIONAL FIELDS */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                GitHub
              </label>
              <input
                name="github"
                value={formData.github}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border px-3 py-2 text-sm border-gray-300"
                placeholder="github.com/username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                LinkedIn
              </label>
              <input
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border px-3 py-2 text-sm border-gray-300"
                placeholder="linkedin.com/in/username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Social Presence (Portfolio / Insta / X)
              </label>
              <input
                name="socialPresence"
                value={formData.socialPresence}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border px-3 py-2 text-sm border-gray-300"
                placeholder="yourwebsite.com"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white rounded-lg px-4 py-3 font-semibold hover:bg-indigo-700 transition"
            >
              {submitted ? "Submitting..." : "Submit Registration"}
            </button>

            {/* Home Link */}
            <Link
              href="/"
              className="block text-center text-indigo-600 text-sm mt-4 hover:underline"
            >
              ← Go back to Home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
