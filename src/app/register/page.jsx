"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

// ------------------------------------
// VALIDATION SCHEMA
// ------------------------------------
const schema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  dob: yup.string().required("Date of birth is required"),
  gender: yup.string().required("Gender is required"),
  address: yup.string().required("Address is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .matches(/^\d{10}$/, "Enter a valid 10-digit number")
    .required("Phone number is required"),

  college: yup.string().required("College name is required"),
  course: yup.string().required("Course is required"),
  year: yup.string().required("Year is required"),
  domain: yup.string().required("Domain is required"),
  skills: yup.string().required("Skills are required"),
  couponCode: yup.string().nullable(),
  username: yup
    .string()
    .required("Username is required")
    .min(4, "Username must be at least 4 characters")
    .max(24, "Username must be at most 24 characters")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Username can contain only letters and numbers (no spaces or symbols)"
    ),
  password: yup
  .string()
  .required("Password is required")
  .min(8, "Password must be at least 8 characters")
  .matches(/[A-Z]/, "Must contain at least one uppercase letter")
  .matches(/[a-z]/, "Must contain at least one lowercase letter")
  .matches(/[0-9]/, "Must contain at least one number")
  .matches(/[@$!%*?&#]/, "Must contain at least one special character"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match"),

  agreeTerms: yup.bool().oneOf([true], "You must agree to terms"),
  confirmInfo: yup.bool().oneOf([true], "You must confirm information"),
});

export default function Register() {
  const [step, setStep] = useState(1);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5002/api";

  // const API_URL = "https://code4bharat-hackathon-backend.onrender.com/api"

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const next = async () => {
    let fieldsToValidate = [];

    if (step === 1) {
      fieldsToValidate = [
        "fullName",
        "dob",
        "gender",
        "address",
        "email",
        "phone",
      ];
    } else if (step === 2) {
      fieldsToValidate = ["college", "course", "year", "domain", "skills"];
    } else if (step === 3) {
      fieldsToValidate = ["username", "password", "confirmPassword"];
    }

    const isValid = await trigger(fieldsToValidate);

    if (isValid) {
      setStep(step + 1);
    } else {
      toast.error("Please fill all required fields correctly");
    }
  };

  const prev = () => setStep(step - 1);

  const onSubmit = async (data) => {
    // ----------------------------
    // KEEP ALL YOUR CONSOLE LOGS
    // ----------------------------
    console.log("=== HACKATHON REGISTRATION DATA ===");
    console.log("Full Name:", data.fullName);
    console.log("Date of Birth:", data.dob);
    console.log("Gender:", data.gender);
    console.log("Address:", data.address);
    console.log("Email:", data.email);
    console.log("Phone:", data.phone);
    console.log("College:", data.college);
    console.log("Course:", data.course);
    console.log("Year:", data.year);
    console.log("Domain:", data.domain);
    console.log("Skills:", data.skills);
    console.log("Username:", data.username);
    console.log("=====================================");
    console.log("Complete Data Object:", data);

    try {
      // 🔹 Call backend
      const response = await axios.post(`${API_URL}/users/register`, { data });

      // 🔹 SUCCESS (201 / 200)
      toast.success(response.data.message || "Registration Successful!", {
        duration: 4000,
        style: {
          background: "#10b981",
          color: "#fff",
        },
      });

      console.log("✅ Backend Response:", response.data);
    } catch (error) {
      console.error("❌ Registration Error:", error);

      // 🔴 BACKEND ERROR MESSAGE (email exists, username taken, etc.)
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";

      toast.error(errorMessage, {
        duration: 4000,
      });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(onSubmit)(e);
  };

  return (
    <div className="min-h-screen px-4 py-12 flex justify-center bg-gradient-to-br from-indigo-50 to-indigo-100">
      <Toaster position="top-right" />

      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-indigo-800 to-indigo-900 px-8 py-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Hackathon Registration</h1>
          <p className="text-indigo-300">
            Complete all steps to register for the hackathon event
          </p>
        </div>

        {/* STEP INDICATOR */}
        <div className="px-8 py-6 bg-indigo-50 border-b border-indigo-200">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {[
              { num: 1, label: "Personal" },
              { num: 2, label: "Academic" },
              { num: 3, label: "Account" },
              { num: 4, label: "Confirm" },
            ].map((item, idx) => (
              <div key={item.num} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                      step >= item.num
                        ? "bg-indigo-800 text-white"
                        : "bg-indigo-200 text-indigo-500"
                    }`}
                  >
                    {item.num}
                  </div>
                  <span
                    className={`text-xs mt-2 font-medium ${
                      step >= item.num ? "text-indigo-800" : "text-indigo-400"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
                {idx < 3 && (
                  <div
                    className={`h-0.5 flex-1 mx-2 transition-all ${
                      step > item.num ? "bg-indigo-800" : "bg-indigo-200"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* FORM */}
        <div className="px-8 py-10">
          <div className="max-w-3xl mx-auto">
            {/* ================================================================== */}
            {/* STEP 1 — PERSONAL DETAILS */}
            {/* ================================================================== */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-indigo-800 mb-2">
                    Personal Information
                  </h2>
                  <p className="text-indigo-500 text-sm">
                    Tell us about yourself
                  </p>
                </div>

                {/* Full Name */}
                <div>
                  <label className="block font-medium text-indigo-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("fullName")}
                    className="w-full bg-indigo-50 border-b-2 border-indigo-200 focus:border-indigo-800 px-4 py-3 transition-colors outline-none"
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                {/* DOB & Gender */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-medium text-indigo-700 mb-2">
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      {...register("dob")}
                      className="w-full bg-indigo-50 border-b-2 border-indigo-200 focus:border-indigo-800 px-4 py-3 transition-colors outline-none"
                    />
                    {errors.dob && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.dob.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block font-medium text-indigo-700 mb-2">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-6 mt-3">
                      {["male", "female"].map((g) => (
                        <label
                          key={g}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="radio"
                            {...register("gender")}
                            value={g}
                            className="w-4 h-4 accent-indigo-800"
                          />
                          <span className="text-indigo-700">
                            {g.charAt(0).toUpperCase() + g.slice(1)}
                          </span>
                        </label>
                      ))}
                    </div>
                    {errors.gender && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.gender.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block font-medium text-indigo-700 mb-2">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...register("address")}
                    rows={3}
                    className="w-full bg-indigo-50 border-b-2 border-indigo-200 focus:border-indigo-800 px-4 py-3 transition-colors outline-none resize-none"
                    placeholder="Enter your complete address"
                  ></textarea>
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address.message}
                    </p>
                  )}
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-medium text-indigo-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("email")}
                      className="w-full bg-indigo-50 border-b-2 border-indigo-200 focus:border-indigo-800 px-4 py-3 transition-colors outline-none"
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block font-medium text-indigo-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("phone")}
                      maxLength={10}
                      className="w-full bg-indigo-50 border-b-2 border-indigo-200 focus:border-indigo-800 px-4 py-3 transition-colors outline-none"
                      placeholder="9876543210"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end pt-6">
                  <button
                    type="button"
                    onClick={next}
                    className="px-8 py-3 bg-indigo-800 text-white font-medium rounded-lg hover:bg-indigo-900 transition-colors"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* ================================================================== */}
            {/* STEP 2 — ACADEMIC INFO */}
            {/* ================================================================== */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-indigo-800 mb-2">
                    Academic Information
                  </h2>
                  <p className="text-indigo-500 text-sm">
                    Share your educational background
                  </p>
                </div>

                {/* College */}
                <div>
                  <label className="block font-medium text-indigo-700 mb-2">
                    College Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("college")}
                    className="w-full bg-indigo-50 border-b-2 border-indigo-200 focus:border-indigo-800 px-4 py-3 transition-colors outline-none"
                    placeholder="Your college name"
                  />
                  {errors.college && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.college.message}
                    </p>
                  )}
                </div>

                {/* Course & Year */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-medium text-indigo-700 mb-2">
                      Course <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("course")}
                      className="w-full bg-indigo-50 border-b-2 border-indigo-200 focus:border-indigo-800 px-4 py-3 transition-colors outline-none"
                      placeholder="B.Tech, BCA, etc."
                    />
                    {errors.course && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.course.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block font-medium text-indigo-700 mb-2">
                      Year <span className="text-red-500">*</span>
                    </label>
                    <select
                      {...register("year")}
                      className="w-full bg-indigo-50 border-b-2 border-indigo-200 focus:border-indigo-800 px-4 py-3 transition-colors outline-none cursor-pointer"
                    >
                      <option value="">Select Year</option>
                      <option value="1st">1st Year</option>
                      <option value="2nd">2nd Year</option>
                      <option value="3rd">3rd Year</option>
                      <option value="4th">4th Year</option>
                    </select>
                    {errors.year && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.year.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Domain */}
                <div>
                  <label className="block font-medium text-indigo-700 mb-2">
                    Domain of Interest <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("domain")}
                    className="w-full bg-indigo-50 border-b-2 border-indigo-200 focus:border-indigo-800 px-4 py-3 transition-colors outline-none cursor-pointer"
                  >
                    <option value="">Select Domain</option>
                    <option value="web">Web Development</option>
                    <option value="mobile">
                      Mobile Application Development
                    </option>
                    <option value="ai">
                      Artificial Intelligence / Machine Learning
                    </option>
                    <option value="blockchain">Blockchain Technology</option>
                    <option value="iot">Internet of Things (IoT)</option>
                    <option value="cybersecurity">Cybersecurity</option>
                  </select>
                  {errors.domain && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.domain.message}
                    </p>
                  )}
                </div>

                {/* Skills */}
                <div>
                  <label className="block font-medium text-indigo-700 mb-2">
                    Technical Skills <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...register("skills")}
                    rows={3}
                    className="w-full bg-indigo-50 border-b-2 border-indigo-200 focus:border-indigo-800 px-4 py-3 transition-colors outline-none resize-none"
                    placeholder="List your technical skills (e.g., React, Python, Node.js)"
                  ></textarea>
                  {errors.skills && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.skills.message}
                    </p>
                  )}
                </div>

                {/* Coupon Code */}
                <div>
                  <label className="block font-medium text-indigo-700 mb-2">
                    Referral / Ambassador Coupon Code{" "}
                    <span className="text-red-500"></span>
                  </label>
                  <input
                    {...register("couponCode")}
                    className="w-full bg-indigo-50 border-b-2 border-indigo-200 focus:border-indigo-800 px-4 py-3 transition-colors outline-none"
                    placeholder="Enter coupon code if applicable"
                  />
                  {errors.couponCode && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.couponCode.message}
                    </p>
                  )}
                </div>

                <div className="flex justify-between pt-6">
                  <button
                    type="button"
                    onClick={prev}
                    className="px-8 py-3 border-2 border-indigo-300 text-indigo-700 font-medium rounded-lg hover:bg-indigo-50 transition-colors"
                  >
                    Back
                  </button>

                  <button
                    type="button"
                    onClick={next}
                    className="px-8 py-3 bg-indigo-800 text-white font-medium rounded-lg hover:bg-indigo-900 transition-colors"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* ================================================================== */}
            {/* STEP 3 — ACCOUNT SETUP */}
            {/* ================================================================== */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-indigo-800 mb-2">
                    Account Setup
                  </h2>
                  <p className="text-indigo-500 text-sm">
                    Create your login credentials
                  </p>
                </div>

                {/* Username */}
                <div>
                  <label className="block font-medium text-indigo-700 mb-2">
                    Username <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("username")}
                    className="w-full bg-indigo-50 border-b-2 border-indigo-200 focus:border-indigo-800 px-4 py-3 transition-colors outline-none"
                    placeholder="Choose a username (min. 4 characters)"
                  />
                  {errors.username && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.username.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block font-medium text-indigo-700 mb-2">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    {...register("password")}
                    className="w-full bg-indigo-50 border-b-2 border-indigo-200 focus:border-indigo-800 px-4 py-3 transition-colors outline-none"
                    placeholder="Create a strong password (min. 6 characters)"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block font-medium text-indigo-700 mb-2">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    {...register("confirmPassword")}
                    className="w-full bg-indigo-50 border-b-2 border-indigo-200 focus:border-indigo-800 px-4 py-3 transition-colors outline-none"
                    placeholder="Re-enter your password"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <div className="flex justify-between pt-6">
                  <button
                    onClick={prev}
                    type="button"
                    className="px-8 py-3 border-2 border-indigo-300 text-indigo-700 font-medium rounded-lg hover:bg-indigo-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    className="px-8 py-3 bg-indigo-800 text-white font-medium rounded-lg hover:bg-indigo-900 transition-colors"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* ================================================================== */}
            {/* STEP 4 — CONFIRMATION */}
            {/* ================================================================== */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-indigo-800 mb-2">
                    Confirmation
                  </h2>
                  <p className="text-indigo-500 text-sm">
                    Review and confirm your registration
                  </p>
                </div>

                <div className="bg-indigo-50 p-6 rounded-lg space-y-4">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      {...register("agreeTerms")}
                      className="w-5 h-5 mt-1 accent-indigo-800 cursor-pointer"
                    />
                    <label className="text-indigo-700 cursor-pointer">
                      I agree to the{" "}
                      <span className="font-semibold text-indigo-800">
                        terms and conditions
                      </span>{" "}
                      of the hackathon
                    </label>
                  </div>
                  {errors.agreeTerms && (
                    <p className="text-red-500 text-sm ml-8">
                      {errors.agreeTerms.message}
                    </p>
                  )}

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      {...register("confirmInfo")}
                      className="w-5 h-5 mt-1 accent-indigo-800 cursor-pointer"
                    />
                    <label className="text-indigo-700 cursor-pointer">
                      I confirm that all the information provided is{" "}
                      <span className="font-semibold text-indigo-800">
                        accurate and correct
                      </span>
                    </label>
                  </div>
                  {errors.confirmInfo && (
                    <p className="text-red-500 text-sm ml-8">
                      {errors.confirmInfo.message}
                    </p>
                  )}
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  <p className="text-blue-800 text-sm">
                    <span className="font-semibold">Note:</span> Once submitted,
                    you will receive a confirmation email with further
                    instructions.
                  </p>
                </div>

                {/* SUBMIT */}
                <div className="flex justify-between pt-6">
                  <button
                    type="button"
                    onClick={prev}
                    className="px-8 py-3 border-2 border-indigo-300 text-indigo-700 font-medium rounded-lg hover:bg-indigo-50 transition-colors"
                  >
                    Back
                  </button>

                  <button
                    type="button"
                    onClick={handleFormSubmit}
                    className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-lg"
                  >
                    Submit Registration
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
