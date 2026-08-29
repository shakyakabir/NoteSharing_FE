"use client";

import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import { ArrowRight, Check, FileText, Sparkles } from "lucide-react";

import { useLazyGetUserProfileQuery, useLoginMutation } from "@/slices/Auth";

import { setProfile } from "@/slices/profileSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const [getUserProfile] = useLazyGetUserProfileQuery();
  const [postLogin, { isLoading }] = useLoginMutation();

  const onHandleGoogleSignIn = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await postLogin(formData).unwrap();

      if (response.status === "200") {
        localStorage.setItem("email", response.data);

        const profileResponse = await getUserProfile().unwrap();

        if (profileResponse) {
          dispatch(setProfile(profileResponse));
        }

        if (profileResponse?.email === "admin@gmail.com") {
          router.push("/admin/dashboard");
        } else {
          router.push("/dashboard");
        }
      } else if (response.status === "400") {
        toast.error("Invalid credentials");
      } else if (response.status === "403") {
        toast.error("Please verify your email first");
      } else if (response.status === "404") {
        toast.error("User not found");
      } else {
        toast.error(response.message || "Login failed");
      }
    } catch (error) {
      console.error("Failed to login:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-[#F8F9FC]">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* =====================================================
            LEFT SIDE
        ===================================================== */}
        <section className="relative hidden overflow-hidden bg-[#4235CE] lg:flex">
          {/* Background decoration */}
          <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

          <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10 flex w-full flex-col justify-between px-12 py-9 xl:px-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white">
                <FileText className="h-5 w-5 text-[#4235CE]" />
              </div>

              <div>
                <div className="text-lg font-bold leading-none text-white">
                  NoteHive
                </div>

                <div className="mt-1 text-[8px] font-medium uppercase tracking-[0.2em] text-white/50">
                  Learn • Share • Grow
                </div>
              </div>
            </Link>

            {/* Center content */}
            <div className="max-w-lg">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5">
                <Sparkles className="h-3.5 w-3.5 text-white" />

                <span className="text-xs font-medium text-white">
                  AI-powered learning
                </span>
              </div>

              <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-white xl:text-5xl">
                Turn your notes
                <br />
                into smarter learning.
              </h1>

              <p className="mt-4 max-w-md text-sm leading-6 text-white/65 xl:text-base">
                Create notes, share them with friends and use AI to transform
                your study material into summaries, quizzes, presentations and
                more.
              </p>

              {/* Compact benefits */}
              <div className="mt-7 grid grid-cols-2 gap-x-5 gap-y-3">
                {[
                  "Create & organize notes",
                  "Share with friends",
                  "AI summaries & quizzes",
                  "Earn points & AI credits",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10">
                      <Check className="h-3 w-3 text-white" />
                    </div>

                    <span className="text-xs font-medium text-white/75">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom */}
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-white/35">
                Learn better. Together.
              </p>

              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                <Sparkles className="h-3 w-3 text-white/60" />
                <span className="text-[10px] text-white/50">
                  AI-powered workspace
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            RIGHT SIDE
        ===================================================== */}
        <section className="flex min-h-screen items-center justify-center px-5 py-6 sm:px-8 lg:px-12">
          <div className="w-full max-w-[390px]">
            {/* Mobile logo */}
            <div className="mb-7 flex justify-center lg:hidden">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#4235CE]">
                  <FileText className="h-5 w-5 text-white" />
                </div>

                <span className="text-lg font-bold text-[#4235CE]">
                  NoteHive
                </span>
              </Link>
            </div>

            {/* Heading */}
            <div className="mb-5">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#4235CE]/10">
                <Sparkles className="h-4 w-4 text-[#4235CE]" />
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Welcome back
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Sign in to continue to your workspace.
              </p>
            </div>

            {/* Login card */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-lg shadow-gray-200/40 sm:p-6">
              {/* Social buttons */}
              <div className="grid grid-cols-2 gap-2.5">
                <Button
                  type="button"
                  onClick={onHandleGoogleSignIn}
                  color="black"
                  className="flex h-10 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white text-xs font-semibold text-gray-700 hover:bg-gray-50"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
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
                  Google
                </Button>

                <Button
                  type="button"
                  color="black"
                  className="flex h-10 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white text-xs font-semibold text-gray-700 hover:bg-gray-50"
                >
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"
                    />
                  </svg>
                  GitHub
                </Button>
              </div>

              {/* Divider */}
              <div className="my-4 flex items-center gap-3">
                <div className="h-px flex-1 bg-gray-200" />

                <span className="text-[9px] font-semibold uppercase tracking-wider text-gray-400">
                  or
                </span>

                <div className="h-px flex-1 bg-gray-200" />
              </div>

              {/* Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-3.5">
                {/* Email */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                    Email address
                  </label>

                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeHolder="you@example.com"
                    className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm outline-none transition focus:border-[#4235CE] focus:bg-white focus:ring-2 focus:ring-[#4235CE]/10"
                  />
                </div>

                {/* Password */}
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label className="text-xs font-semibold text-gray-700">
                      Password
                    </label>

                    <Link
                      href="/forgot-password"
                      className="text-[11px] font-semibold text-[#4235CE] hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeHolder="Enter your password"
                    className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm outline-none transition focus:border-[#4235CE] focus:bg-white focus:ring-2 focus:ring-[#4235CE]/10"
                  />
                </div>

                {/* Remember */}
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-3.5 w-3.5 rounded border-gray-300 accent-[#4235CE]"
                  />

                  <span className="text-[11px] text-gray-500">Remember me</span>
                </label>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="group flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#4235CE] text-sm font-semibold text-white shadow-md shadow-[#4235CE]/20 transition hover:bg-[#362bb5] disabled:opacity-60"
                >
                  {isLoading ? "Signing in..." : "Sign in"}

                  {!isLoading && (
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  )}
                </Button>
              </form>

              {/* Signup */}
              <div className="mt-5 border-t border-gray-100 pt-4 text-center">
                <p className="text-xs text-gray-500">
                  Don't have an account?{" "}
                  <Link
                    href="/signup"
                    className="font-bold text-[#4235CE] hover:underline"
                  >
                    Create a free account
                  </Link>
                </p>
              </div>
            </div>

            {/* Footer */}
            <p className="mt-4 text-center text-[10px] text-gray-400">
              By continuing, you agree to our{" "}
              <Link href="/terms" className="hover:text-gray-600">
                Terms
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="hover:text-gray-600">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default LoginForm;
