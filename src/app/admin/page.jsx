"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

/* ---------------- UI Components ---------------- */

const Button = ({ children, className = "", ...props }) => (
  <button
    className={`w-full bg-indigo-600 text-white rounded-md py-2 text-sm font-medium hover:bg-indigo-700 transition disabled:opacity-50 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Input = ({ ...props }) => (
  <input
    {...props}
    className="w-full border rounded-md px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-indigo-300 outline-none"
  />
);

const Label = ({ children }) => (
  <label className="text-sm font-medium text-gray-700">{children}</label>
);

const FieldError = ({ message }) =>
  message ? <p className="text-xs text-red-600 mt-1">{message}</p> : null;

/* --------------- Validation Schema ---------------- */

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

/* ------------------ Component -------------------- */

export default function Page() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      toast.loading("Logging in...");

      console.log("Admin Login Data:", data);

    //   Later you will call backend:
      const res = await axios.post("http://localhost:5000/api/admin/login", data);

      if(res.data?.success){
        toast.dismiss();
        toast.success(res.data.message || "Login successful!");
        // redirect after login
        router.push("/admin-logged");
      }

    } catch (error) {
      toast.dismiss();
      toast.error("Invalid email or password");
    }
  };

  return (
    <>
      <Toaster position="top-right" />

      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 border border-gray-200">

          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Admin Login</h1>
            <p className="text-sm text-gray-500">Access management panel</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <div>
              <Label>Email Address</Label>
              <Input type="email" placeholder="admin@example.com" {...register("email")} />
              <FieldError message={errors.email?.message} />
            </div>

            <div>
              <Label>Password</Label>
              <Input type="password" placeholder="Enter password" {...register("password")} />
              <FieldError message={errors.password?.message} />
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Login"}
            </Button>
          </form>

          {/* Optional Forgot Password */}
          <p className="text-xs text-center text-gray-500 mt-4 cursor-pointer hover:underline">
            Forgot Password?
          </p>
        </div>
      </div>
    </>
  );
}
