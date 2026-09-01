"use client";

import React, { useState } from "react";
import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Eye,
  EyeClosed,
  FileText,
  KeyRound,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { resetPasswordSchema } from "@/app/(auth)/lib/Validator";
import { useResetPasswordMutation } from "@/slices/Auth";

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState(() => ({
    email: searchParams.get("email") ?? "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = resetPasswordSchema.safeParse(formData);

    if (!result.success) {
      const first =
        result.error.issues[0]?.message ?? "Please fix the form errors";

      toast.error(first);
      return;
    }

    try {
      const res = await resetPassword({
        email: formData.email,
        otp: formData.otp,
        newPassword: formData.newPassword,
      }).unwrap();

      if (res.status === "200") {
        toast.success("Password reset successful. Please log in.");

        router.push("/login");
      } else {
        toast.error(res.message || "Failed to reset password");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="h-screen overflow-hidden bg-[#F7F7FB]">
      <div className="grid h-full lg:grid-cols-[0.9fr_1.1fr]">
        {/* =====================================================
            LEFT BRAND PANEL
        ===================================================== */}
        <section className="relative hidden h-full overflow-hidden bg-[#4235CE] lg:block">
          {/* Decorative shapes */}
          <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

          <div className="absolute -bottom-40 -right-20 h-[420px] w-[420px] rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10 flex h-full flex-col justify-between px-10 py-7 xl:px-14">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white">
                <FileText className="h-5 w-5 text-[#4235CE]" />
              </div>

              <div>
                <p className="text-lg font-bold leading-none text-white">
                  NoteHive
                </p>

                <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-white/45">
                  Learn • Share • Grow
                </p>
              </div>
            </Link>

            {/* Main content */}
            <div className="max-w-md">
              {/* Badge */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5">
                <LockKeyhole className="h-3.5 w-3.5 text-white" />

                <span className="text-[11px] font-medium text-white">
                  Secure password recovery
                </span>
              </div>

              <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-white xl:text-5xl">
                Almost back to
                <br />
                <span className="text-white/55">your workspace.</span>
              </h1>

              <p className="mt-4 max-w-sm text-sm leading-6 text-white/60">
                Create a new password and get back to your notes, shared study
                groups and AI-powered learning tools.
              </p>

              {/* Steps */}
              <div className="mt-7 space-y-4">
                {/* Step 1 */}
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10">
                    <Check className="h-4 w-4 text-white" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-white">
                      Email verified
                    </p>

                    <p className="mt-0.5 text-[10px] text-white/45">
                      Your password reset request is ready.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10">
                    <KeyRound className="h-4 w-4 text-white" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-white">
                      Enter verification code
                    </p>

                    <p className="mt-0.5 text-[10px] text-white/45">
                      Use the code sent to your email.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10">
                    <LockKeyhole className="h-4 w-4 text-white" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-white">
                      Set a new password
                    </p>

                    <p className="mt-0.5 text-[10px] text-white/45">
                      Choose a password you'll remember.
                    </p>
                  </div>
                </div>
              </div>

              {/* Security card */}
              <div className="mt-7 rounded-xl border border-white/10 bg-white/[0.08] p-3.5">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-white" />

                  <span className="text-[11px] font-semibold text-white">
                    Keep your account secure
                  </span>
                </div>

                <p className="mt-1.5 text-[10px] leading-4 text-white/45">
                  Use a strong password that you don't use on other websites or
                  services.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <p className="text-[9px] text-white/30">
                Your notes. Your knowledge. Your AI workspace.
              </p>

              <p className="text-[9px] text-white/30">
                © {new Date().getFullYear()} NoteHive
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            RIGHT FORM PANEL
        ===================================================== */}
        <section className="flex h-full items-center justify-center overflow-y-auto px-5 py-6 sm:px-8">
          <div className="w-full max-w-[410px]">
            {/* Mobile logo */}
            <div className="mb-5 flex justify-center lg:hidden">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#4235CE]">
                  <FileText className="h-5 w-5 text-white" />
                </div>

                <span className="text-lg font-bold text-[#4235CE]">
                  NoteHive
                </span>
              </Link>
            </div>

            {/* Header */}
            <div className="mb-5">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-[#4235CE]/10">
                <LockKeyhole className="h-4 w-4 text-[#4235CE]" />
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Create new password
              </h2>

              <p className="mt-1.5 max-w-sm text-xs leading-5 text-gray-500">
                Enter the verification code from your email and create a new
                password for your account.
              </p>
            </div>

            {/* Card */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xl shadow-gray-200/40 sm:p-6">
              {/* Email */}
              <div className="mb-4 rounded-xl bg-gray-50 px-3.5 py-3">
                <p className="text-[9px] font-medium uppercase tracking-wider text-gray-400">
                  Resetting password for
                </p>

                <p className="mt-0.5 truncate text-xs font-semibold text-gray-700">
                  {formData.email || "your email address"}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* Email */}
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeHolder="name@example.com"
                  labelName="Email Address"
                  className="h-10 w-full"
                />

                {/* OTP */}
                <div>
                  <Input
                    name="otp"
                    type="text"
                    // inputMode="numeric"
                    // maxLength={6}
                    value={formData.otp}
                    onChange={handleChange}
                    placeHolder="123456"
                    labelName="Verification Code"
                    className="h-10 w-full tracking-[0.3em]"
                  />

                  <p className="mt-1 text-[9px] text-gray-400">
                    Enter the 6-digit code sent to your email.
                  </p>
                </div>

                {/* New password */}
                <div className="relative">
                  <Input
                    name="newPassword"
                    type={showPassword ? "text" : "password"}
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeHolder="Create a new password"
                    labelName="New Password"
                    className="h-10 w-full pr-10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-[31px] text-gray-400 transition hover:text-gray-600"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <Eye size={15} /> : <EyeClosed size={15} />}
                  </button>
                </div>

                {/* Confirm password */}
                <div className="relative">
                  <Input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeHolder="Confirm your new password"
                    labelName="Confirm Password"
                    className="h-10 w-full pr-10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-[31px] text-gray-400 transition hover:text-gray-600"
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <Eye size={15} />
                    ) : (
                      <EyeClosed size={15} />
                    )}
                  </button>
                </div>

                {/* Password hint */}
                <div className="flex items-start gap-2 rounded-lg bg-[#4235CE]/5 px-3 py-2.5">
                  <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#4235CE]" />

                  <p className="text-[9px] leading-4 text-gray-500">
                    Use at least 8 characters with a mix of letters, numbers and
                    symbols.
                  </p>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="group mt-1 flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#4235CE] text-xs font-semibold text-white shadow-md shadow-[#4235CE]/20 transition hover:bg-[#362BB5] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <LockKeyhole className="h-3.5 w-3.5" />

                  <span>
                    {isLoading ? "Resetting password..." : "Reset password"}
                  </span>

                  {!isLoading && (
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  )}
                </Button>
              </form>

              {/* Back */}
              <div className="mt-5 border-t border-gray-100 pt-4 text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#4235CE] transition hover:text-[#362BB5]"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back to login
                </Link>
              </div>
            </div>

            {/* Footer */}
            <p className="mt-3 text-center text-[9px] text-gray-400">
              Securely recover your NoteHive account.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ResetPasswordForm;
