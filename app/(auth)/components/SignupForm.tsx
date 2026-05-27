"use client";

import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import Text from "@/app/components/ui/Text";
import note from "@/public/note.svg";

import Image from "next/image";
import Link from "next/link";

import { useSignup } from "@/hooks/auth/useSignup";
const SignupForm = () => {
  const {
    formData,
    isDisabled,
    isLoading,
    isWeakPassword,
    onHandleChange,
    onHandleSubmit,
  } = useSignup();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-[#F9FAFB] text-[#1F2937]">
      {/* Brand Header */}
      <div className="flex flex-col items-center gap-2 mb-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#4F46E5] text-white shadow-md">
          {/* Using your note icon asset */}
          <Image alt="NoteShare Logo" src={note} className="w-6 h-6" />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            NoteShare
          </h1>
          <p className="text-sm font-medium text-gray-500 mt-0.5">
            Empowering students through AI notes
          </p>
        </div>
      </div>

      {/* Main Card Container */}
      <div className="w-full max-w-[440px] bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="text-center mb-5">
          <h2 className="text-lg font-bold text-gray-900">Join NoteShare</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Empowering students through AI notes
          </p>
        </div>

        {/* Social Authentication Buttons */}
        <div className="flex gap-3 mb-5">
          <Button className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50 transition-colors">
            {/* Replace with actual Google icon asset/SVG */}
            <span className="w-4 h-4 rounded-full bg-gray-200 inline-block" />
            Google
          </Button>
          <Button className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            {/* Replace with actual GitHub icon asset/SVG */}
            <span className="w-4 h-4 rounded-full bg-gray-900 inline-block" />
            GitHub
          </Button>
        </div>

        {/* Section Divider */}
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px bg-gray-200 w-full" />
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
            or continue with email
          </span>
          <div className="h-px bg-gray-200 w-full" />
        </div>

        {/* Form Registration Fields */}
        <div className="space-y-4">
          <Input
            type="text"
            placeHolder="Alex Johnson"
            labelName="Full Name"
            value={formData.username}
            name="username"
            onChange={onHandleChange}
            className="w-full"
          />

          <Input
            type="email"
            name="email"
            placeHolder="alex@university.edu"
            labelName="Email Address"
            value={formData.email}
            onChange={onHandleChange}
            className="w-full"
          />

          {/* Upgraded Native Select Dropdown */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-700">
              I am a...
            </label>
            <div className="relative">
              <select className="w-full appearance-none border border-gray-200 bg-gray-50/50 rounded-xl px-3.5 py-2.5 text-sm font-medium text-gray-800 outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#EEF2F6] transition-all cursor-pointer">
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="developer">Developer</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-gray-400">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Password Input Block */}
          <div className="space-y-2">
            <Input
              type="password"
              placeHolder="••••••••"
              labelName="Password"
              name="password"
              value={formData.password}
              onChange={onHandleChange}
              className="w-full"
            />

            {/* Multi-segmented Password Strength Indicators */}
            <div className="space-y-1">
              <div className="grid grid-cols-4 gap-1.5">
                <div className="h-1 bg-[#5E52FF] rounded-full" />
                <div className="h-1 bg-[#5E52FF] rounded-full" />
                <div className="h-1 bg-gray-100 rounded-full" />
                <div className="h-1 bg-gray-100 rounded-full" />
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide block">
                Strength:{" "}
                <span className="text-gray-500 font-extrabold">Fair</span>
              </span>
            </div>
          </div>

          <Input
            type="password"
            placeHolder="••••••••"
            labelName="Confirm Password"
            name="confirmPassword"
            className="w-full"
          />
        </div>

        {/* Legal Consent Checkbox */}
        <div className="mt-4 flex items-start gap-2.5">
          <input
            type="checkbox"
            id="terms"
            className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#4F46E5] focus:ring-[#4F46E5] cursor-pointer accent-[#4F46E5]"
          />
          <label
            htmlFor="terms"
            className="text-xs leading-normal font-medium text-gray-500 select-none cursor-pointer"
          >
            I agree to the{" "}
            <span className="text-[#4F46E5] hover:underline font-semibold">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="text-[#4F46E5] hover:underline font-semibold">
              Privacy Policy
            </span>
            .
          </label>
        </div>

        {/* Primary Action Call to Action */}
        <button
          className="w-full mt-6 py-3 px-4 bg-[#4F46E5] hover:bg-[#4338CA] disabled:bg-gray-300 text-white font-semibold text-sm rounded-xl shadow-md transition-all active:scale-[0.99]"
          onClick={onHandleSubmit}
          disabled={isDisabled || isLoading}
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </button>

        {/* Form Separator Footer Link */}
        <div className="mt-5 pt-4 border-t border-gray-100 text-center">
          <p className="text-sm font-medium text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#4F46E5] font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Social proof Section */}
      <div className="mt-8 flex flex-col items-center gap-2">
        <div className="flex -space-x-2 overflow-hidden">
          {/* Map through random avatar assets if available */}
          <div className="inline-block h-7 w-7 rounded-full ring-2 ring-white bg-gray-300" />
          <div className="inline-block h-7 w-7 rounded-full ring-2 ring-white bg-gray-400" />
          <div className="inline-block h-7 w-7 rounded-full ring-2 ring-white bg-gray-500" />
        </div>
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          Join 10,000+ Students Today
        </span>
      </div>
    </div>
  );
};

export default SignupForm;
