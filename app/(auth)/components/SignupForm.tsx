"use client";

import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import {
  ArrowRight,
  Check,
  Eye,
  EyeClosed,
  FileText,
  Sparkles,
  Users,
  Brain,
} from "lucide-react";
import Link from "next/link";
import { useSignup } from "@/hooks/auth/useSignup";

const SignupForm = () => {
  const {
    formData,
    isDisabled,
    errors,
    isLoading,
    isWeakPassword,
    isConfirmPasswordMismatch,
    showPassword,
    showConfirmPassword,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    onHandleChange,
    onHandleSubmit,
  } = useSignup();

  const onHandleGoogleSignIn = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  return (
    <main className="h-screen overflow-hidden bg-[#F7F7FB]">
      <div className="grid h-full lg:grid-cols-[0.9fr_1.1fr]">
        {/* =====================================================
            LEFT SIDE
        ===================================================== */}
        <section className="relative hidden h-full overflow-hidden bg-[#4235CE] lg:block">
          {/* Decorative background */}
          <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

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

            {/* Main */}
            <div className="max-w-md">
              {/* Badge */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5">
                <Sparkles className="h-3.5 w-3.5 text-white" />

                <span className="text-[11px] font-medium text-white">
                  AI-powered study workspace
                </span>
              </div>

              <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-white xl:text-5xl">
                Study smarter.
                <br />
                <span className="text-white/55">Together.</span>
              </h1>

              <p className="mt-4 max-w-sm text-sm leading-6 text-white/60">
                Create notes, share them with friends and use AI to turn your
                study material into powerful learning tools.
              </p>

              {/* Features */}
              <div className="mt-7 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                    <FileText className="h-4 w-4 text-white" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-white">
                      Smart Notes
                    </p>

                    <p className="text-[10px] text-white/45">
                      Create and organize your knowledge.
                    </p>
                  </div>

                  <Check className="ml-auto h-4 w-4 text-white/35" />
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                    <Brain className="h-4 w-4 text-white" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-white">
                      AI Study Tools
                    </p>

                    <p className="text-[10px] text-white/45">
                      Summaries, quizzes and slides in seconds.
                    </p>
                  </div>

                  <Check className="ml-auto h-4 w-4 text-white/35" />
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                    <Users className="h-4 w-4 text-white" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-white">
                      Share & Collaborate
                    </p>

                    <p className="text-[10px] text-white/45">
                      Learn together with your friends.
                    </p>
                  </div>

                  <Check className="ml-auto h-4 w-4 text-white/35" />
                </div>
              </div>

              {/* AI preview */}
              <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.08] p-3.5">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-white" />

                  <span className="text-[11px] font-semibold text-white">
                    Powered by NoteHive AI
                  </span>
                </div>

                <div className="mt-2.5 flex gap-2">
                  <span className="rounded-md bg-white/10 px-2.5 py-1.5 text-[9px] text-white/60">
                    Summarize
                  </span>

                  <span className="rounded-md bg-white/10 px-2.5 py-1.5 text-[9px] text-white/60">
                    Quiz
                  </span>

                  <span className="rounded-md bg-white/10 px-2.5 py-1.5 text-[9px] text-white/60">
                    Slides
                  </span>

                  <span className="rounded-md bg-white/10 px-2.5 py-1.5 text-[9px] text-white/60">
                    AI Q&A
                  </span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <p className="text-[9px] text-white/30">
                Learn better. Together.
              </p>

              <p className="text-[9px] text-white/30">
                © {new Date().getFullYear()} NoteHive
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            RIGHT SIDE
        ===================================================== */}
        <section className="flex h-full items-center justify-center overflow-y-auto px-5 py-5 sm:px-8">
          <div className="w-full max-w-[410px]">
            {/* Mobile logo */}
            <div className="mb-4 flex justify-center lg:hidden">
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
            <div className="mb-4">
              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-[#4235CE]/10">
                <Sparkles className="h-4 w-4 text-[#4235CE]" />
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Create your account
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Start learning smarter with NoteHive.
              </p>
            </div>

            {/* Card */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xl shadow-gray-200/40">
              {/* Social */}

              {/* Social login */}
              <div className="space-y-3">
                <Button
                  type="button"
                  onClick={onHandleGoogleSignIn}
                  color="black"
                  className="group flex h-11 w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md active:scale-[0.99]"
                >
                  {/* Google logo */}
                  <svg
                    className="h-5 w-5 shrink-0"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>

                  <span className="text-black">Continue with Google</span>
                </Button>
              </div>
              {/* Divider */}
              <div className="my-3.5 flex items-center gap-3">
                <div className="h-px flex-1 bg-gray-200" />

                <span className="text-[9px] font-medium text-gray-400">OR</span>

                <div className="h-px flex-1 bg-gray-200" />
              </div>
              {/* Form */}
              <form onSubmit={onHandleSubmit} className="space-y-2.5">
                {/* Name */}
                <Input
                  type="text"
                  placeHolder="Alex Johnson"
                  labelName="Full Name"
                  value={formData.username}
                  name="username"
                  onChange={onHandleChange}
                  className="h-9 w-full"
                />

                {/* Email */}
                <div>
                  <Input
                    type="email"
                    name="email"
                    placeHolder="alex@university.edu"
                    labelName="Email Address"
                    value={formData.email}
                    onChange={onHandleChange}
                    className="h-9 w-full"
                  />

                  {errors.email && (
                    <p className="mt-0.5 text-[9px] text-red-500">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeHolder="Create a password"
                    labelName="Password"
                    name="password"
                    value={formData.password}
                    onChange={onHandleChange}
                    className="h-9 w-full pr-9"
                  />

                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-[40px] text-gray-400"
                  >
                    {showPassword ? <Eye size={15} /> : <EyeClosed size={15} />}
                  </button>

                  {errors.password && (
                    <p className="mt-0.5 text-[9px] text-red-500">
                      {errors.password}
                    </p>
                  )}

                  {/* Strength */}
                  <div className="mt-1 flex gap-1">
                    {[1, 2, 3, 4, 5, 6].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full ${
                          isWeakPassword >= level
                            ? "bg-[#4235CE]"
                            : "bg-gray-100"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Confirm */}
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeHolder="Confirm your password"
                    labelName="Confirm Password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={onHandleChange}
                    className="h-9 w-full pr-9"
                  />

                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute right-3 top-[40px] text-gray-400"
                  >
                    {showConfirmPassword ? (
                      <Eye size={15} />
                    ) : (
                      <EyeClosed size={15} />
                    )}
                  </button>

                  {errors.confirmPassword && (
                    <p className="mt-0.5 text-[9px] text-red-500">
                      {errors.confirmPassword || "Passwords do not match"}
                    </p>
                  )}
                </div>

                {/* Terms */}
                <label className="flex items-start gap-2 pt-0.5">
                  <input
                    type="checkbox"
                    className="mt-0.5 h-3 w-3 accent-[#4235CE]"
                  />

                  <span className="text-[9px] leading-3.5 text-gray-500">
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="font-semibold text-[#4235CE]"
                    >
                      Terms
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="font-semibold text-[#4235CE]"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>

                {/* CTA */}
                <Button
                  type="submit"
                  disabled={isDisabled || isLoading}
                  className="group flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#4235CE] text-xs font-semibold text-white shadow-md shadow-[#4235CE]/20 transition hover:bg-[#362BB5] disabled:opacity-50"
                >
                  {isLoading ? "Creating account..." : "Create account"}

                  {!isLoading && (
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  )}
                </Button>
              </form>
              {/* Login */}
              <div className="mt-3 border-t border-gray-100 pt-3 text-center">
                <p className="text-[10px] text-gray-500">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-bold text-[#4235CE] hover:underline"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>

            <p className="mt-2 text-center text-[8px] text-gray-400">
              Your notes. Your knowledge. Your AI workspace.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default SignupForm;
