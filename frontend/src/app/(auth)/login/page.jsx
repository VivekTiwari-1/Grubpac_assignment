"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";

export default function LoginPage() {
  const { login } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setServerError("");
    try {
      await login(data.email, data.password);
      router.push("/dashboard");
    } catch (err) {
      setServerError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-orange-200 p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome back</h1>
      <p className="text-sm text-gray-500 mb-6">Log in to your account</p>

      {serverError && (
        <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl mb-4 border border-red-100">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          label="Email"
          type="email"
          placeholder="abc@example.com"
          error={errors.email?.message}
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
          })}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Your password"
          error={errors.password?.message}
          {...register("password", { required: "Password is required" })}
        />

        <Button type="submit" loading={loading} className="w-full mt-2">
          Log In
        </Button>
      </form>

      <p className="text-sm text-center text-gray-500 mt-6">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="text-blue-600 hover:underline font-medium"
        >
          Register
        </Link>
      </p>
    </div>
  );
}
