"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast, { Toaster } from "react-hot-toast";

// ------------------------------------
// VALIDATION SCHEMA
// ------------------------------------
const schema = yup.object().shape({
  // STEP 1 — Personal Details
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email().required("Valid email is required"),
  phone: yup
    .string()
    .matches(/^\d{10}$/, "Enter a valid 10-digit number")
    .required("Phone number is required"),
  dob: yup.string().required("Date of birth is required"),
  college: yup.string().required("College/Institute name is required"),
  course: yup.string().required("Course is required"),
  year: yup.string().required("Year is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  gender: yup.string().required("Gender is required"),

  // STEP 2 — Social Media
  instagramUser: yup.string().required("Instagram username is required"),
  linkedin: yup.string().required("LinkedIn profile is required"),
  instaRange: yup.string().required("Select followers range"),
  activePosting: yup.string().required("Select an option"),

  // STEP 3 — Skills & Experience
  motivation: yup.string().required("This field is required"),
  pastExperience: yup.string().required("Experience is required"),
  reason: yup.string().required("This field is required"),
  skills: yup.string().required("Skills are required"),

  // STEP 4 — Responsibilities
  willPromote: yup.bool().oneOf([true], "Required"),
  willShare: yup.bool().oneOf([true], "Required"),
  hours: yup.string().required("Hours per week is required"),
  availability: yup.string().required("Availability is required"),
  additionalInfo: yup.string().optional(),

  // STEP 5 — Review and Submit
  studentId: yup.mixed().required("Student ID is required"),
  profilePhoto: yup.mixed().required("Profile photo is required"),
  agreeTerms: yup.bool().oneOf([true], "You must agree to terms"),
});

export default function AmbassadorForm() {
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  // STEP VALIDATION
  const next = async () => {
    let fields = [];

    if (step === 1)
      fields = [
        "fullName",
        "email",
        "phone",
        "dob",
        "college",
        "course",
        "year",
        "city",
        "state",
        "gender",
      ];

    if (step === 2)
      fields = ["instagramUser", "linkedin", "instaRange", "activePosting"];

    if (step === 3)
      fields = ["motivation", "pastExperience", "reason", "skills"];

    if (step === 4)
      fields = ["willPromote", "willShare", "hours", "availability"];

    const isValid = await trigger(fields);

    if (!isValid) {
      toast.error("Please fix all errors before proceeding");
      return;
    }

    setStep(step + 1);
  };

  const prev = () => setStep(step - 1);

  const onSubmit = (data) => {
    console.clear();
    console.log("AMBASSADOR FORM DATA:");
    console.log(data);

    toast.success("Application Submitted Successfully!", {
      icon: "🎉",
      duration: 4000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 py-12 px-4">
      <Toaster position="top-right" />

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* HEADER */}
        <div className="bg-indigo-900 px-8 py-8 text-white">
          <h1 className="text-3xl font-bold">Campus Ambassador Application</h1>
          <p className="text-indigo-300 mt-2">
            Become the face of our Hackathon at your campus
          </p>
        </div>

        {/* STEPPER */}
        <div className="bg-indigo-50 px-8 py-6 border-b border-indigo-200">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {[
              "Personal",
              "Social Media",
              "Experience",
              "Responsibilities",
              "Submit",
            ].map((label, i) => {
              const num = i + 1;
              return (
                <div key={i} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 flex items-center justify-center rounded-full font-semibold ${
                        step >= num
                          ? "bg-indigo-800 text-white"
                          : "bg-indigo-200 text-indigo-500"
                      }`}
                    >
                      {num}
                    </div>
                    <p
                      className={`text-xs mt-2 ${
                        step >= num ? "text-indigo-800" : "text-indigo-400"
                      }`}
                    >
                      {label}
                    </p>
                  </div>
                  {i < 4 && (
                    <div
                      className={`h-0.5 flex-1 mx-2 ${
                        step > num ? "bg-indigo-800" : "bg-indigo-200"
                      }`}
                    ></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* FORM BODY */}
        <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-10">
          <div className="max-w-3xl mx-auto">
            {/* ================================================================================= */}
            {/* STEP 1 — PERSONAL DETAILS */}
            {/* ================================================================================= */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl text-indigo-800 font-semibold">
                  Personal Details
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <InputField
                    label="Full Name"
                    name="fullName"
                    register={register}
                    errors={errors}
                  />
                  <InputField
                    label="Email"
                    name="email"
                    register={register}
                    errors={errors}
                  />
                  <InputField
                    label="Phone Number"
                    name="phone"
                    register={register}
                    errors={errors}
                  />
                  <InputField
                    label="Date of Birth"
                    name="dob"
                    type="date"
                    register={register}
                    errors={errors}
                  />
                  <InputField
                    label="College / Institute Name"
                    name="college"
                    register={register}
                    errors={errors}
                  />
                  <InputField
                    label="Course"
                    name="course"
                    register={register}
                    errors={errors}
                  />
                  <SelectField
                    label="Year"
                    name="year"
                    options={["1st", "2nd", "3rd", "4th"]}
                    register={register}
                    errors={errors}
                  />
                  <InputField
                    label="City"
                    name="city"
                    register={register}
                    errors={errors}
                  />
                  <InputField
                    label="State"
                    name="state"
                    register={register}
                    errors={errors}
                  />
                  <SelectField
                    label="Gender"
                    name="gender"
                    options={["Male", "Female", "Other"]}
                    register={register}
                    errors={errors}
                  />
                </div>

                <NextButton next={next} />
              </div>
            )}

            {/* ================================================================================= */}
            {/* STEP 2 — SOCIAL MEDIA */}
            {/* ================================================================================= */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl text-indigo-800 font-semibold">
                  Social Media Presence
                </h2>

                <InputField
                  label="Instagram Username"
                  name="instagramUser"
                  register={register}
                  errors={errors}
                />
                <InputField
                  label="LinkedIn Profile URL"
                  name="linkedin"
                  register={register}
                  errors={errors}
                />

                <SelectField
                  label="Instagram Followers Range"
                  name="instaRange"
                  options={["0-500", "500-1000", "1000-5000", "5000+"]}
                  register={register}
                  errors={errors}
                />

                <SelectField
                  label="Do you post actively on social media?"
                  name="activePosting"
                  options={["Yes", "No"]}
                  register={register}
                  errors={errors}
                />

                <NavButtons prev={prev} next={next} />
              </div>
            )}

            {/* ================================================================================= */}
            {/* STEP 3 — SKILLS & EXPERIENCE */}
            {/* ================================================================================= */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl text-indigo-800 font-semibold">
                  Skills & Experience
                </h2>

                <TextAreaField
                  label="Why do you want to become an ambassador?"
                  name="motivation"
                  register={register}
                  errors={errors}
                />
                <TextAreaField
                  label="Previous ambassador / leadership experience"
                  name="pastExperience"
                  register={register}
                  errors={errors}
                />
                <TextAreaField
                  label="Why should we choose you?"
                  name="reason"
                  register={register}
                  errors={errors}
                />
                <TextAreaField
                  label="Your Skills"
                  name="skills"
                  register={register}
                  errors={errors}
                />

                <NavButtons prev={prev} next={next} />
              </div>
            )}

            {/* ================================================================================= */}
            {/* STEP 4 — RESPONSIBILITIES & AVAILABILITY */}
            {/* ================================================================================= */}
            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl text-indigo-800 font-semibold">
                  Responsibilities & Availability
                </h2>

                <CheckboxField
                  label="Willing to promote on social media"
                  name="willPromote"
                  register={register}
                  errors={errors}
                />
                <CheckboxField
                  label="Willing to share in WhatsApp groups"
                  name="willShare"
                  register={register}
                  errors={errors}
                />

                <InputField
                  label="Hours per week commitment"
                  name="hours"
                  register={register}
                  errors={errors}
                />

                <InputField
                  label="Availability for meetings"
                  name="availability"
                  register={register}
                  errors={errors}
                />

                <TextAreaField
                  label="Additional information or comments"
                  name="additionalInfo"
                  register={register}
                  errors={errors}
                />

                <NavButtons prev={prev} next={next} />
              </div>
            )}

            {/* ================================================================================= */}
            {/* STEP 5 — FINAL SUBMISSION */}
            {/* ================================================================================= */}
            {step === 5 && (
              <div className="space-y-6">
                <h2 className="text-2xl text-indigo-800 font-semibold">
                  Review & Submit
                </h2>

                <FileField
                  label="Upload Student ID"
                  name="studentId"
                  register={register}
                  errors={errors}
                />
                <FileField
                  label="Upload Profile Photo"
                  name="profilePhoto"
                  register={register}
                  errors={errors}
                />

                <CheckboxField
                  label="I agree to the terms and conditions"
                  name="agreeTerms"
                  register={register}
                  errors={errors}
                />

                <div className="flex justify-between">
                  <button
                    onClick={prev}
                    type="button"
                    className="px-8 py-3 border-2 border-indigo-300 text-indigo-700 rounded-lg hover:bg-indigo-50"
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Submit Application
                  </button>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

/* ================================================================================= */
/* REUSABLE COMPONENTS */
/* ================================================================================= */

function InputField({ label, name, register, errors, type = "text" }) {
  return (
    <div>
      <label className="block font-medium text-indigo-700 mb-1">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        type={type}
        {...register(name)}
        className="w-full bg-indigo-50 border-b-2 border-indigo-200 px-4 py-2 outline-none focus:border-indigo-800"
      />
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
      )}
    </div>
  );
}

function TextAreaField({ label, name, register, errors }) {
  return (
    <div>
      <label className="block font-medium text-indigo-700 mb-1">
        {label} <span className="text-red-500">*</span>
      </label>
      <textarea
        {...register(name)}
        rows={3}
        className="w-full bg-indigo-50 border-b-2 border-indigo-200 px-4 py-2 outline-none resize-none focus:border-indigo-800"
      ></textarea>
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
      )}
    </div>
  );
}

function SelectField({ label, name, options, register, errors }) {
  return (
    <div>
      <label className="block font-medium text-indigo-700 mb-1">
        {label} <span className="text-red-500">*</span>
      </label>
      <select
        {...register(name)}
        className="w-full bg-indigo-50 border-b-2 border-indigo-200 px-4 py-2 outline-none focus:border-indigo-800"
      >
        <option value="">Select</option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
      )}
    </div>
  );
}

function CheckboxField({ label, name, register, errors }) {
  return (
    <div className="flex items-start gap-3">
      <input
        type="checkbox"
        {...register(name)}
        className="w-5 h-5 mt-1 accent-indigo-800"
      />
      <label className="text-indigo-700">{label}</label>
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
      )}
    </div>
  );
}

function FileField({ label, name, register, errors }) {
  return (
    <div>
      <label className="block font-medium text-indigo-700 mb-1">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        type="file"
        {...register(name)}
        className="w-full bg-indigo-50 border-b-2 border-indigo-200 px-4 py-2 outline-none"
      />
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
      )}
    </div>
  );
}

function NavButtons({ prev, next }) {
  return (
    <div className="flex justify-between pt-6">
      <button
        type="button"
        onClick={prev}
        className="px-8 py-3 border-2 border-indigo-300 text-indigo-700 rounded-lg hover:bg-indigo-50"
      >
        Back
      </button>
      <button
        type="button"
        onClick={next}
        className="px-8 py-3 bg-indigo-800 text-white rounded-lg hover:bg-indigo-900"
      >
        Continue
      </button>
    </div>
  );
}

function NextButton({ next }) {
  return (
    <div className="flex justify-end pt-6">
      <button
        type="button"
        onClick={next}
        className="px-8 py-3 bg-indigo-800 text-white rounded-lg hover:bg-indigo-900"
      >
        Continue
      </button>
    </div>
  );
}
