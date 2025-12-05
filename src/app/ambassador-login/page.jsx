"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AmbassadorLoginPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/ambassador/login", data);
      const user = res.data?.ambassador;

      console.log("Ambassador Login Response:", res.data);

      if(!res){
        toast.error("Login failed. Please try again.");
        return;
      }

      // Handle wrong login
    //   if (!res.data?.success || !user) {
    //     toast.error(res.data?.message || "Invalid email or password");
    //     return;
    //   }

      // Handle not approved case
      if (user.isApproved === false) {
        toast.error("Your application is under review. Admin has not approved yet.");
        return;
      }

      // Handle approved login
      if (user.isApproved === true) {
        toast.success("Login Successful 🎉");
        setTimeout(() => {
          router.push("/ambassador-dashboard");
        }, 800);
      }

    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white text-gray-800 flex justify-center items-center px-4">
        <div className="w-full max-w-md bg-white p-6 rounded-2xl border border-gray-200 shadow-md">
          
          {/* Header */}
          <div className="text-center mb-6">
            <p className="text-xs uppercase tracking-[0.25em] text-indigo-500 mb-1">
              InnovateX Hackathon
            </p>
            <h1 className="text-2xl font-semibold text-gray-900">
              Ambassador Login
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Access your dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                {...register("email", { required: "Email is required" })}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-indigo-300 text-sm"
              />
              {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                {...register("password", { required: "Password is required" })}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-indigo-300 text-sm"
              />
              {errors.password && <p className="text-xs text-red-600">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 text-white rounded-md transition font-medium text-sm 
                ${loading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"}
              `}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Register Redirect */}
          <div className="text-center mt-5">
            <p className="text-sm text-gray-600">
              Not registered yet?{" "}
              <button
                className="text-indigo-600 hover:underline font-medium"
                onClick={() => router.push("/ambassador-register")}
              >
                Apply as Ambassador
              </button>
            </p>
          </div>

        </div>
      </div>
    </>
  );
}
