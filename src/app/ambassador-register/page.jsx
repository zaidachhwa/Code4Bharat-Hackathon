"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import axios from "axios";
import {useRouter} from "next/navigation";

/* -----------------------------
   UI PRIMITIVES (Tailwind only)
------------------------------ */

const Button = React.forwardRef(
  ({ className = "", children, type = "button", disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium
        bg-indigo-600 text-white hover:bg-indigo-700 transition-colors
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2
        disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

const SecondaryButton = React.forwardRef(
  ({ className = "", children, ...props }, ref) => (
    <button
      ref={ref}
      className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium
    bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  )
);
SecondaryButton.displayName = "SecondaryButton";

const Input = React.forwardRef(
  ({ className = "", type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={`block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm
      placeholder:text-gray-400
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-1
      disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

const Textarea = React.forwardRef(
  ({ className = "", rows = 3, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        rows={rows}
        className={`block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm
      placeholder:text-gray-400 min-h-[120px]
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-1
      disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

const Label = ({ className = "", children, ...props }) => {
  return (
    <label
      className={`text-sm font-medium text-gray-700 flex items-center gap-1 ${className}`}
      {...props}
    >
      {children}
    </label>
  );
};

const FieldError = ({ message }) =>
  message ? (
    <p className="mt-1 text-xs text-red-600 font-medium">{message}</p>
  ) : null;

const RequiredDot = () => (
  <span className="text-red-600 align-middle text-base">*</span>
);

/* -----------------------------
   Zod Schema (unchanged validation)
------------------------------ */

const formSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100),
  email: z.string().email("Invalid email address").max(255),
  phone: z.string().min(10, "Phone number must be at least 10 digits").max(15),
  dob: z.string().min(1, "Date of birth is required"),
  college: z.string().min(2, "College name is required").max(200),
  courseYear: z.string().min(2, "Course and year is required").max(100),
  city: z.string().min(2, "City/State is required").max(100),
  gender: z.enum(["male", "female", "prefer-not-to-say"], {
    required_error: "Please select a gender",
  }),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
  instagram: z.string().min(1, "Instagram username is required"),
  linkedin: z.string().optional(),
  instagramFollowers: z.string().min(1, "Please select your followers range"),
  postActivity: z.string().min(1, "Please select your activity level"),
  motivation: z
    .string()
    .min(10, "Please provide at least 10 characters")
    .max(500),
  previousExperience: z.enum(["yes", "no"], {
    required_error: "Please select an option",
  }),
  experienceDescription: z.string().optional(),

  skills: z.array(z.string()).min(1, "Please select at least one skill"),
  responsibilities: z
    .array(z.string())
    .min(1, "Please select at least one responsibility"),
  hoursPerWeek: z.string().min(1, "Please select hours per week"),
  availability: z.string().min(1, "Please select your availability"),
  studentIdCard: z.any().optional(),
  profilePhoto: z.any().optional(),
  additionalInfo: z.string().optional(),
  agreement: z
    .boolean()
    .refine((val) => val === true, "You must agree to the terms"),
});

/* -----------------------------
   Page Component (converted to multistep)
------------------------------ */

export default function CampusAmbassadorPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5002/api";

  // const API_URL = "https://code4bharat-hackathon-backend.onrender.com/api"


  const [step, setStep] = useState(0);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    trigger,
    getValues,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skills: [],
      responsibilities: [],
      agreement: false,
    },
  });

  const selectedSkills = watch("skills") || [];
  const selectedResponsibilities = watch("responsibilities") || [];
  const agreement = watch("agreement");

  const skillsList = [
    "Communication",
    "Social Media Marketing",
    "Public Speaking",
    "Designing (Canva/Figma)",
    "Team Leadership",
    "Event Management",
  ];

  const responsibilitiesList = [
    "Promote on social media",
    "Share in WhatsApp groups",
    "Help students register",
    "Represent the hackathon in your class",

  ];

  const toggleSkill = (skill) => {
    const current = selectedSkills;
    const updated = current.includes(skill)
      ? current.filter((s) => s !== skill)
      : [...current, skill];
    setValue("skills", updated, { shouldValidate: true });
  };

  const toggleResponsibility = (item) => {
    const current = selectedResponsibilities;
    const updated = current.includes(item)
      ? current.filter((r) => r !== item)
      : [...current, item];
    setValue("responsibilities", updated, { shouldValidate: true });
  };

  // sending form data to backend
  const onSubmit = async (data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof FileList && value.length > 0) {
        formData.append(key, value[0]);
      } else if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    });

    try {
      const res = await axios.post(
        `${API_URL}/ambassadors/register`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.dismiss(); // remove pending toasts if any

      if (res.data?.success) {
        toast.success(res.data.message || "Submitted successfully!");

       setTimeout(() => {
          router.push(`/ambassador-login`);
        }, 1500);
      } else {
        toast.error(res.data.message || "Something went wrong");
      }

    } catch (error) {
      console.error(error);

      const msg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Server error while submitting";

      toast.error(msg);
    }
  };

  const steps = [
    { id: 0, title: "Personal", label: "Personal Details" },
    { id: 1, title: "Social", label: "Social Presence" },
    { id: 2, title: "Skills", label: "Skills & Experience" },
    { id: 3, title: "Commitment", label: "Responsibilities" },
    { id: 4, title: "Uploads", label: "Uploads & Agreement" },
    { id: 5, title: "Review", label: "Review & Submit" },
  ];

  // fields to validate per step
  const stepFields = {
    0: [
      "fullName",
      "email",
      "phone",
      "dob",
      "college",
      "courseYear",
      "city",
      "gender",
      "password",
    ],
    1: ["instagram", "instagramFollowers", "postActivity", "linkedin"],
    2: ["motivation", "previousExperience", "experienceDescription", "skills"], // ⬅ Fixed
    3: ["responsibilities", "hoursPerWeek", "availability"],
    4: ["profilePhoto", "agreement"],
    5: [],
  };



  const handleNext = async () => {
    const fields = stepFields[step] || [];
    const ok = fields.length ? await trigger(fields) : true;
    if (ok) setStep((s) => Math.min(s + 1, steps.length - 1));
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => setStep((s) => Math.max(s - 1, 0));

  const renderProgress = () => (
    <div className="flex items-center gap-3 w-full">
      {steps.map((s, idx) => (
        <div key={s.id} className="flex-1">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold
                ${idx <= step
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-600"
                }`}
            >
              {idx + 1}
            </div>
            <div className="hidden sm:block">
              <div
                className={`text-xs ${idx <= step ? "text-gray-800" : "text-gray-400"
                  }`}
              >
                {s.title}
              </div>
              <div className="text-[11px] text-gray-400">{s.label}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white text-gray-800 py-8 px-4">
        <div className="mx-auto max-w-4xl">
          {/* Header Card */}
          <div className="mb-6 rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-indigo-500 mb-1">
                  Code4Bharat
                </p>
                <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
                  Campus Ambassador Application
                </h1>
                <p className="mt-2 text-sm text-gray-600">
                   Fill in the details
                  below so we can get to know you better.
                </p>
              </div>
              <div className="flex flex-col items-start sm:items-end gap-1 text-xs text-gray-500">
                <span className="inline-flex items-center gap-1 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-[11px] font-medium text-indigo-600">
                  ● Applications Open
                </span>
                
              </div>
            </div>
          </div>

          {/* Main Card */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-6 rounded-2xl border border-gray-100 bg-white p-6 shadow"
          >
            {/* Progress */}
            <div className="mb-3">{renderProgress()}</div>

            {/* Step content */}
            {step === 0 && (
              <section className="space-y-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                      Section 1 · Personal Details
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Tell us about yourself and your college background.
                    </p>
                  </div>

                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="fullName">
                      Full Name <RequiredDot />
                    </Label>
                    <Input
                      id="fullName"
                      placeholder="Enter your full name"
                      {...register("fullName")}
                    />
                    <FieldError message={errors.fullName?.message} />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="email">
                      Email Address <RequiredDot />
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      {...register("email")}
                    />
                    <FieldError message={errors.email?.message} />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="password">
                      Password <RequiredDot />
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a password"
                      {...register("password")}
                    />
                    <FieldError message={errors.password?.message} />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="phone">
                      Phone Number <RequiredDot />
                    </Label>
                    <Input
                      id="phone"
                      placeholder="+91-XXXXX-XXXXX"
                      {...register("phone")}
                    />
                    <FieldError message={errors.phone?.message} />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="dob">
                      Date of Birth <RequiredDot />
                    </Label>
                    <Input id="dob" type="date" {...register("dob")} />
                    <FieldError message={errors.dob?.message} />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="college">
                      College / Institute Name <RequiredDot />
                    </Label>
                    <Input
                      id="college"
                      placeholder="Enter your college or institute"
                      {...register("college")}
                    />
                    <FieldError message={errors.college?.message} />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="courseYear">
                      Course &amp; Year <RequiredDot />
                    </Label>
                    <Input
                      id="courseYear"
                      placeholder="e.g., B.Voc – 1st Year"
                      {...register("courseYear")}
                    />
                    <FieldError message={errors.courseYear?.message} />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="city">
                      City / State <RequiredDot />
                    </Label>
                    <Input
                      id="city"
                      placeholder="Mumbai, Maharashtra"
                      {...register("city")}
                    />
                    <FieldError message={errors.city?.message} />
                  </div>

                  <div className="space-y-1.5">
                    <Label>
                      Gender <RequiredDot />
                    </Label>
                    <div className="flex flex-wrap gap-3 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5">
                      {[
                        { label: "Male", value: "male" },
                        { label: "Female", value: "female" },
                        ,
                      ].map((option) => (
                        <label
                          key={option.value}
                          className="inline-flex items-center gap-2 text-xs sm:text-sm text-gray-700"
                        >
                          <input
                            type="radio"
                            value={option.value}
                            {...register("gender")}
                            className="h-3.5 w-3.5 accent-indigo-500"
                          />
                          <span>{option.label}</span>
                        </label>
                      ))}
                    </div>
                    <FieldError message={errors.gender?.message} />
                  </div>
                </div>
              </section>
            )}

            {step === 1 && (
              <section className="space-y-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                      Section 2 · Social Media Presence
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Share your online presence so we can understand your
                      reach.
                    </p>
                  </div>
                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-[11px] text-indigo-600 border border-indigo-100">
                    Outreach
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="instagram">
                      Instagram Username <RequiredDot />
                    </Label>
                    <Input
                      id="instagram"
                      placeholder="@username"
                      {...register("instagram")}
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      We may view your profile to understand your content style.
                    </p>
                    <FieldError message={errors.instagram?.message} />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="linkedin">
                      LinkedIn Profile (optional)
                    </Label>
                    <Input
                      id="linkedin"
                      placeholder="https://www.linkedin.com/in/your-profile"
                      {...register("linkedin")}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="instagramFollowers">
                        Instagram Followers (approx.) <RequiredDot />
                      </Label>
                      <select
                        id="instagramFollowers"
                        {...register("instagramFollowers")}
                        className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700"
                      >
                        <option value="" disabled>
                          Select followers range
                        </option>
                        <option value="0-500">0–500</option>
                        <option value="500-1000">500–1,000</option>
                        <option value="1000-5000">1,000–5,000</option>
                        <option value="5000+">5,000+</option>
                      </select>
                      <FieldError
                        message={errors.instagramFollowers?.message}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="postActivity">
                        Do you post actively on social media? <RequiredDot />
                      </Label>
                      <select
                        id="postActivity"
                        {...register("postActivity")}
                        className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700"
                      >
                        <option value="" disabled>
                          Choose an option
                        </option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                        <option value="sometimes">Sometimes</option>
                      </select>
                      <FieldError message={errors.postActivity?.message} />
                    </div>
                  </div>
                </div>
              </section>
            )}

            {step === 2 && (
              <section className="space-y-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                      Section 3 · Skills & Experience
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Help us understand why you’re a great fit for this role.
                    </p>
                  </div>
                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-[11px] text-indigo-600 border border-indigo-100">
                    Fit & Potential
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="motivation">
                      Why do you want to become an ambassador? <RequiredDot />
                    </Label>
                    <Textarea
                      id="motivation"
                      placeholder="Share your motivation..."
                      {...register("motivation")}
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      A few short paragraphs are enough. Be specific and
                      concise.
                    </p>
                    <FieldError message={errors.motivation?.message} />
                  </div>

                  <div className="space-y-1.5">
                    <Label>
                      Previous ambassador / leadership experience?{" "}
                      <RequiredDot />
                    </Label>
                    <div className="flex flex-wrap gap-3 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5">
                      {[
                        { label: "Yes", value: "yes" },
                        { label: "No", value: "no" },
                      ].map((option) => (
                        <label
                          key={option.value}
                          className="inline-flex items-center gap-2 text-xs sm:text-sm text-gray-700"
                        >
                          <input
                            type="radio"
                            value={option.value}
                            {...register("previousExperience")}
                            className="h-3.5 w-3.5 accent-indigo-500"
                          />
                          <span>{option.label}</span>
                        </label>
                      ))}
                    </div>
                    <FieldError message={errors.previousExperience?.message} />
                  </div>



                  <div className="space-y-2">
                    <Label>
                      Skills (select all that apply) <RequiredDot />
                    </Label>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {skillsList.map((skill) => (
                        <label
                          key={skill}
                          className="flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-xs sm:text-sm text-gray-700 hover:border-indigo-300 transition"
                        >
                          <input
                            type="checkbox"
                            className="h-3.5 w-3.5 accent-indigo-500"
                            checked={selectedSkills.includes(skill)}
                            onChange={() => toggleSkill(skill)}
                          />
                          <span>{skill}</span>
                        </label>
                      ))}
                    </div>
                    <FieldError
                      message={errors.skills?.Message || errors.skills?.message}
                    />
                  </div>
                </div>
              </section>
            )}

            {step === 3 && (
              <section className="space-y-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                      Section 4 · Responsibilities & Availability
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Let us know how you can support the campaign.
                    </p>
                  </div>
                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-[11px] text-indigo-600 border border-indigo-100">
                    Commitment
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>
                      Are you willing to do the following? <RequiredDot />
                    </Label>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {responsibilitiesList.map((item) => (
                        <label
                          key={item}
                          className="flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-xs sm:text-sm text-gray-700 hover:border-indigo-300 transition"
                        >
                          <input
                            type="checkbox"
                            className="h-3.5 w-3.5 accent-indigo-500"
                            checked={selectedResponsibilities.includes(item)}
                            onChange={() => toggleResponsibility(item)}
                          />
                          <span>{item}</span>
                        </label>
                      ))}
                    </div>
                    <FieldError message={errors.responsibilities?.message} />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="hoursPerWeek">
                        Hours per week commitment <RequiredDot />
                      </Label>
                      <select
                        id="hoursPerWeek"
                        {...register("hoursPerWeek")}
                        className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700"
                      >
                        <option value="" disabled>
                          Select an option
                        </option>
                        <option value="1-3">1–3 hours</option>
                        <option value="3-5">3–5 hours</option>
                        <option value="5-10">5–10 hours</option>
                        <option value="10+">10+ hours</option>
                      </select>
                      <FieldError message={errors.hoursPerWeek?.message} />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="availability">
                        Available till the event completes? <RequiredDot />
                      </Label>
                      <select
                        id="availability"
                        {...register("availability")}
                        className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700"
                      >
                        <option value="" disabled>
                          Select an option
                        </option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                        <option value="maybe">Maybe</option>
                      </select>
                      <FieldError message={errors.availability?.message} />
                    </div>
                  </div>
                </div>
              </section>
            )}

            {step === 4 && (
              <section className="space-y-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                      Section 5 · Uploads & Agreement
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Attach documents and confirm the program terms.
                    </p>
                  </div>
                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-[11px] text-indigo-600 border border-indigo-100">
                    Final Step
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="studentIdCard">
                        Upload Student ID Card (optional)
                      </Label>
                      <Input
                        id="studentIdCard"
                        type="file"
                        accept="image/*,.pdf"
                        {...register("studentIdCard")}
                        className="cursor-pointer file:mr-2 file:rounded-md file:border-none file:bg-indigo-50 file:px-3 file:py-1 file:text-xs file:text-indigo-700"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="profilePhoto">
                        Upload Profile Photo <RequiredDot />
                      </Label>
                      <Input
                        id="profilePhoto"
                        type="file"
                        accept="image/*"
                        {...register("profilePhoto")}
                        className="cursor-pointer file:mr-2 file:rounded-md file:border-none file:bg-indigo-50 file:px-3 file:py-1 file:text-xs file:text-indigo-700"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="additionalInfo">
                      Any additional information (optional)
                    </Label>
                    <Textarea
                      id="additionalInfo"
                      placeholder="Add anything else you would like us to know (availability, constraints, ideas, etc.)."
                      {...register("additionalInfo")}
                    />
                  </div>

                  <div className="space-y-2 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                    <label className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                      <input
                        type="checkbox"
                        className="mt-1.5 h-3.5 w-3.5 accent-indigo-500"
                        checked={!!agreement}
                        onChange={(e) =>
                          setValue("agreement", e.target.checked, {
                            shouldValidate: true,
                          })
                        }
                      />
                      <span>
                        <RequiredDot /> I confirm that the information provided
                        is true and I agree to follow the rules of the Campus
                        Ambassador program.
                      </span>
                    </label>
                    <FieldError message={errors.agreement?.message} />
                    <p className="text-[11px] text-gray-500">
                      By submitting, you apply for the 
                      Ambassador role and agree to be contacted regarding this
                      opportunity.
                    </p>
                  </div>
                </div>
              </section>
            )}

            {step === 5 && (
              <section className="space-y-6">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                    Review & Submit
                  </h2>
                  <p className="text-sm text-gray-500">
                    Please verify your details before submitting.
                  </p>
                </div>

                {/* Summary Card */}
                <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-5">
                  <div className="space-y-6">

                    {/* PERSONAL INFO */}
                    <div>
                      <h3 className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">
                        Personal Details
                      </h3>
                      <div className="mt-3 divide-y rounded-lg border bg-gray-50">
                        {[
                          "fullName",
                          "email",
                          "phone",
                          "dob",
                          "college",
                          "courseYear",
                          "city",
                          "gender",
                        ].map((field) => (
                          <div key={field} className="flex justify-between px-4 py-2 text-sm">
                            <span className="font-medium capitalize">
                              {field.replace(/([A-Z])/g, " $1")}
                            </span>
                            <span className="text-gray-700">{getValues()[field]}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* SOCIAL MEDIA */}
                    <div>
                      <h3 className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">
                        Social Presence
                      </h3>
                      <div className="mt-3 divide-y rounded-lg border bg-gray-50">
                        {[
                          "instagram",
                          "linkedin",
                          "instagramFollowers",
                          "postActivity",
                        ].map((field) => (
                          <div key={field} className="flex justify-between px-4 py-2 text-sm">
                            <span className="font-medium capitalize">
                              {field.replace(/([A-Z])/g, " $1")}
                            </span>
                            <span className="text-gray-700">
                              {getValues()[field] || "Not Provided"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* SKILLS & EXPERIENCE */}
                    <div>
                      <h3 className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">
                        Skills & Experience
                      </h3>
                      <div className="mt-3 divide-y rounded-lg border bg-gray-50">
                        <div className="flex justify-between px-4 py-2 text-sm">
                          <span className="font-medium">Skills</span>
                          <span className="text-gray-700">
                            {getValues().skills?.join(", ")}
                          </span>
                        </div>

                        <div className="flex justify-between px-4 py-2 text-sm">
                          <span className="font-medium">Experience</span>
                          <span className="text-gray-700">{getValues().previousExperience}</span>
                        </div>

                        <div className="px-4 py-2 text-sm">
                          <span className="font-medium">Motivation</span>
                          <p className="mt-2 text-gray-700">{getValues().motivation}</p>
                        </div>
                      </div>
                    </div>

                    {/* COMMITMENT */}
                    <div>
                      <h3 className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">
                        Responsibilities & Availability
                      </h3>
                      <div className="mt-3 divide-y rounded-lg border bg-gray-50">
                        <div className="flex justify-between px-4 py-2 text-sm">
                          <span className="font-medium">Hours Per Week</span>
                          <span className="text-gray-700">{getValues().hoursPerWeek}</span>
                        </div>

                        <div className="flex justify-between px-4 py-2 text-sm">
                          <span className="font-medium">Availability</span>
                          <span className="text-gray-700">{getValues().availability}</span>
                        </div>

                        <div className="px-4 py-2 text-sm">
                          <span className="font-medium">Responsibilities</span>
                          <p className="mt-2 text-gray-700">
                            {getValues().responsibilities?.join(", ")}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* FILES */}
                    <div>
                      <h3 className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">
                        Documents & Agreement
                      </h3>
                      <div className="mt-3 divide-y rounded-lg border bg-gray-50">
                        <div className="flex justify-between px-4 py-2 text-sm">
                          <span className="font-medium">Student ID</span>
                          <span className="text-gray-700">
                            {getValues().studentIdCard ? "Uploaded" : "Not Uploaded"}
                          </span>
                        </div>

                        <div className="flex justify-between px-4 py-2 text-sm">
                          <span className="font-medium">Profile Photo</span>
                          <span className="text-gray-700">
                            {getValues().profilePhoto ? "Uploaded" : "Not Uploaded"}
                          </span>
                        </div>

                        <div className="px-4 py-2 text-sm">
                          <span className="font-medium">Agreement</span>
                          <p className="mt-2 text-gray-700">
                            {getValues().agreement ? "✔ Accepted" : "❌ Not Accepted"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-gray-500">
                  Once submitted, you cannot modify the details.
                </p>
              </section>

            )}

            {/* Footer & Navigation Buttons */}
            <div className="flex flex-col gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[12px] text-gray-500">
                Please review your details before submitting. Fields marked with{" "}
                <span className="text-red-600">*</span> are required.
              </p>

              <div className="flex gap-2">
                {step > 0 && (
                  <SecondaryButton onClick={handleBack} type="button">
                    Back
                  </SecondaryButton>
                )}

                {step < steps.length - 1 ? (
                  <Button type="button" onClick={handleNext}>
                    Next
                  </Button>
                ) : (
                  <Button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleSubmit(onSubmit)}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>

                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
