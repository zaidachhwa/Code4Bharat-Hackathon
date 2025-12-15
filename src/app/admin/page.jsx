"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Button = ({ children, className = "", ...props }) => (
  <button
    className={`w-full rounded-lg py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 shadow-md hover:shadow-lg hover:from-yellow-500 hover:via-orange-600 hover:to-red-500 active:scale-[0.98] transition-all disabled:opacity-50 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Input = ({ ...props }) => (
  <input
    {...props}
    className="w-full border border-orange-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none transition"
  />
);

const Label = ({ children }) => (
  <label className="text-sm font-medium text-gray-800">{children}</label>
);

const FieldError = ({ message }) =>
  message ? <p className="text-xs text-red-600 mt-1">{message}</p> : null;

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Page() {
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5002/api";

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
      const res = await axios.post(`${API_URL}/admin/login`, data, {
        withCredentials: true
      });
      if (res.data?.success) {
        toast.dismiss();
        toast.success(res.data.message || "Login successful!");
        router.push("/admin-logged");
      }
    } catch {
      toast.dismiss();
      toast.error("Invalid email or password");
    }
  };

  return (
    <>
      <Toaster position="top-right" />

      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 border border-amber-100">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
            <p className="text-sm text-gray-500">Access management panel</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label>Email Address</Label>
              <Input
                type="email"
                placeholder="admin@example.com"
                {...register("email")}
              />
              <FieldError message={errors.email?.message} />
            </div>

            <div>
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Enter password"
                {...register("password")}
              />
              <FieldError message={errors.password?.message} />
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Login"}
            </Button>
          </form>

          <p className="text-xs text-center text-gray-500 mt-4 cursor-pointer hover:underline">
            Forgot Password?
          </p>
        </div>
      </div>
    </>
  );
}
