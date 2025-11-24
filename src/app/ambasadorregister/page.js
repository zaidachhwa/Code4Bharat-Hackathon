"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function HackathonRegistration() {
  const totalSteps = 4;
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    dob: "",
    gender: "",
    address: "",
    email: "",
    phone: "",
    college: "",
    course: "",
    year: "",
    domain: "",
    skills: "",
    username: "",
    password: "",
    confirmPassword: "",
    terms: false,
    confirm: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Validation Logic
  const validateStep = () => {
    if (currentStep === 1) {
      if (
        !form.fullName ||
        !form.dob ||
        !form.gender ||
        !form.address ||
        !form.email ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ||
        form.phone.length !== 10
      ) {
        alert("Please fill all personal details correctly.");
        return false;
      }
    }

    if (currentStep === 2) {
      if (
        !form.college ||
        !form.course ||
        !form.year ||
        !form.domain ||
        !form.skills
      ) {
        alert("Please fill all academic details.");
        return false;
      }
    }

    if (currentStep === 3) {
      if (!form.username || !form.password || form.password.length < 6) {
        alert("Password must be at least 6 chars.");
        return false;
      }
      if (form.password !== form.confirmPassword) {
        alert("Passwords do not match!");
        return false;
      }
    }

    return true;
  };

  const nextStep = () => {
    if (validateStep()) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => setCurrentStep(currentStep - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.terms || !form.confirm) {
      alert("Please accept terms and confirmation.");
      return;
    }
    alert("Registration Successful!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-10 px-4 bg-gradient-to-br from-blue-500 to-white">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white text-center py-10 relative overflow-hidden">
          <h1 className="text-3xl font-bold">🚀 Hackathon Registration</h1>
          <p className="text-white/90 mt-2">
            Join us for an amazing coding experience
          </p>
        </div>

        {/* Progress Bar */}
        <div className="p-6 bg-gray-50 border-b">
          <div className="relative h-2 bg-gray-200 rounded-full">
            <div
              className="absolute top-0 left-0 h-full bg-blue-600 rounded-full transition-all duration-300"
              style={{
                width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
              }}
            ></div>
          </div>

          <div className="flex justify-between mt-4 text-sm font-medium text-gray-600">
            {["Personal", "Academic", "Account", "Confirm"].map(
              (label, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center ${
                    currentStep === index + 1
                      ? "text-blue-600 font-semibold"
                      : ""
                  }`}
                >
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full border-2 
                    ${
                      currentStep > index + 1
                        ? "bg-green-500 border-green-500 text-white"
                        : currentStep === index + 1
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "border-gray-300 text-gray-400"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className="mt-1">{label}</span>
                </div>
              )
            )}
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* STEP 1 --------------------------------------- */}
          {currentStep === 1 && (
            <>
              <h2 className="text-2xl font-semibold">Personal Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                />
                <Input
                  type="date"
                  label="Date of Birth"
                  name="dob"
                  value={form.dob}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="font-medium">Gender *</label>
                <div className="flex gap-6 mt-2">
                  {["male", "female", "other"].map((g) => (
                    <label key={g} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="gender"
                        value={g}
                        onChange={handleChange}
                        className="w-5 h-5"
                      />
                      {g.charAt(0).toUpperCase() + g.slice(1)}
                    </label>
                  ))}
                </div>
              </div>

              <Textarea
                label="Address"
                name="address"
                value={form.address}
                onChange={handleChange}
                required
              />

              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  type="email"
                  label="Email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <Input
                  type="tel"
                  label="Phone Number"
                  name="phone"
                  value={form.phone}
                  onChange={(e) => {
                    if (/^\d{0,10}$/.test(e.target.value)) handleChange(e);
                  }}
                  required
                />
              </div>
            </>
          )}

          {/* STEP 2 --------------------------------------- */}
          {currentStep === 2 && (
            <>
              <h2 className="text-2xl font-semibold">Academic Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="College Name"
                  name="college"
                  value={form.college}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Course"
                  name="course"
                  value={form.course}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Select
                  label="Year"
                  name="year"
                  value={form.year}
                  onChange={handleChange}
                  options={["1", "2", "3", "4", "5"]}
                />
                <Select
                  label="Domain"
                  name="domain"
                  value={form.domain}
                  onChange={handleChange}
                  options={[
                    "Web",
                    "Mobile",
                    "AI/ML",
                    "Blockchain",
                    "IoT",
                    "Cybersecurity",
                    "Data Science",
                  ]}
                />
              </div>

              <Textarea
                label="Skills"
                name="skills"
                value={form.skills}
                onChange={handleChange}
                required
              />
            </>
          )}

          {/* STEP 3 --------------------------------------- */}
          {currentStep === 3 && (
            <>
              <h2 className="text-2xl font-semibold">Account Setup</h2>

              <Input
                label="Username"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
              />

              <div className="grid md:grid-cols-2 gap-4">
                <PasswordInput
                  label="Password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  show={showPassword}
                  toggle={() => setShowPassword(!showPassword)}
                />
                <PasswordInput
                  label="Confirm Password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  show={showConfirm}
                  toggle={() => setShowConfirm(!showConfirm)}
                />
              </div>
            </>
          )}

          {/* STEP 4 --------------------------------------- */}
          {currentStep === 4 && (
            <>
              <h2 className="text-2xl font-semibold">Terms & Confirmation</h2>

              <div className="space-y-4 bg-gray-50 p-6 rounded-xl border">
                <Checkbox
                  label="I agree to the terms and conditions"
                  name="terms"
                  checked={form.terms}
                  onChange={handleChange}
                />
                <Checkbox
                  label="I confirm that the above information is correct"
                  name="confirm"
                  checked={form.confirm}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          {/* BUTTONS */}
          <div className="flex justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 bg-gray-200 rounded-xl font-medium hover:bg-gray-300"
              >
                ← Previous
              </button>
            ) : (
              <div></div>
            )}

            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
              >
                Next →
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700"
              >
                Submit Registration
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

/* REUSABLE COMPONENTS -------------------------------------------------- */

function Input({ label, ...props }) {
  return (
    <div className="flex flex-col">
      <label className="font-medium mb-1">{label} *</label>
      <input
        {...props}
        className="p-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

function Textarea({ label, ...props }) {
  return (
    <div className="flex flex-col">
      <label className="font-medium mb-1">{label} *</label>
      <textarea
        {...props}
        className="p-3 border rounded-xl min-h-[100px] focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

function Select({ label, options, ...props }) {
  return (
    <div className="flex flex-col">
      <label className="font-medium mb-1">{label} *</label>
      <select
        {...props}
        className="p-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select</option>
        {options.map((o, idx) => (
          <option key={idx} value={o.toLowerCase()}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function PasswordInput({ label, show, toggle, ...props }) {
  return (
    <div className="flex flex-col">
      <label className="font-medium mb-1">{label} *</label>
      <div className="relative">
        <input
          {...props}
          type={show ? "text" : "password"}
          className="p-3 w-full border rounded-xl focus:ring-2 focus:ring-blue-500 pr-12"
        />
        <button
          type="button"
          onClick={toggle}
          className="absolute right-3 top-3 text-gray-500"
        >
          {show ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    </div>
  );
}

function Checkbox({ label, ...props }) {
  return (
    <label className="flex items-start gap-3">
      <input type="checkbox" {...props} className="w-5 h-5 mt-1" />
      <span className="text-gray-700">{label}</span>
    </label>
  );
}
