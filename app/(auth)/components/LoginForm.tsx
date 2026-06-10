"use client";

import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import Text from "@/app/components/ui/Text";
import note from "@/public/note.svg";
import { useLoginMutation } from "@/slices/Auth";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const onHandleGoogleSignIn = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };
  const logout = () => {
    window.location.href = "http://localhost:8080/logout";
  };

  const [postLogin] = useLoginMutation();

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
      await postLogin(formData).unwrap();
    } catch (error) {
      console.error("Failed to login:", error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-[#F9FAFB] text-[#1F2937]">
      {/* Brand Header */}
      <div className="flex flex-col items-center gap-2 mb-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#5E52FF] text-white shadow-md">
          {/* NoteShare Icon */}
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <div className="text-center">
          <Text
            size={"sm"}
            weight={"bold"}
            color={"heading"}
            as={"h1"}
            className="text-2xl font-bold tracking-tight text-gray-900"
          >
            NoteShare
          </Text>
          <Text
            className="text-sm font-medium text-gray-500 mt-0.5"
            size={"sm"}
            weight={"bold"}
            color={"subHeading"}
            as={"p"}
          >
            Streamline your learning journey
          </Text>
        </div>
      </div>

      {/* Login Card Container */}
      <div className="w-full max-w-[440px] bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm">
        {/* Social Authentication Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <Button
            onClick={onHandleGoogleSignIn}
            color="black"
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            {/* Google Vector placeHolder */}
            <svg className="w-4 h-4" viewBox="0 0 24 24">
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
            <span className="text-sm font-semibold text-black">Google</span>
          </Button>
          <Button
            onClick={logout}
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            {/* GitHub Vector placeHolder */}
            <svg
              className="w-4 h-4 text-gray-800"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"
              />
            </svg>
            <span className="text-sm font-semibold text-black">GitHub</span>
          </Button>
        </div>

        {/* Section Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px bg-gray-200 w-full" />
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">
            or continue with email
          </span>
          <div className="h-px bg-gray-200 w-full" />
        </div>

        {/* Form Registration Fields */}
        <div className="space-y-4">
          {/* Email Block */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-700">
              Email Address
            </label>
            <Input
              type="email"
              name="email"
              onChange={handleInputChange}
              value={formData.email}
              placeHolder="student@university.edu"
              className="w-full border border-gray-200 bg-gray-50/40 rounded-xl px-3.5 py-2.5 text-sm font-medium text-gray-800 placeHolder-gray-400 outline-none focus:border-[#5E52FF] focus:ring-2 focus:ring-[#EEF2F6] transition-all"
            />
          </div>

          {/* Password Block */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-gray-700">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs font-semibold text-[#5E52FF] hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              type="password"
              name="password"
              placeHolder="••••••••"
              onChange={handleInputChange}
              value={formData.password}
              className="w-full border border-gray-200 bg-gray-50/40 rounded-xl px-3.5 py-2.5 text-sm font-medium text-gray-800 placeHolder-gray-400 outline-none focus:border-[#5E52FF] focus:ring-2 focus:ring-[#EEF2F6] transition-all"
            />
          </div>
        </div>

        {/* Remember Me Checkbox */}
        <div className="mt-4 flex items-center gap-2.5">
          <Input
            type="checkbox"
            // id="remember"
            name="remember"
            className="h-4 w-4 rounded border-gray-300 text-[#5E52FF] focus:ring-[#5E52FF] cursor-pointer accent-[#5E52FF]"
          />
          <label
            htmlFor="remember"
            className="text-xs font-medium text-gray-500 select-none cursor-pointer"
          >
            Remember me for 30 days
          </label>
        </div>

        {/* Primary Submit Action */}
        <Button
          onClick={handleLoginSubmit}
          className="w-full mt-6 py-3 px-4 bg-[#5E52FF] hover:bg-[#4E42EF] text-white font-semibold text-sm rounded-xl shadow-md transition-all active:scale-[0.99]"
        >
          Log In
        </Button>
      </div>

      {/* Form Navigation Alternative */}
      <div className="mt-5 text-center">
        <p className="text-sm font-medium text-gray-500">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-[#5E52FF] font-semibold hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>

      {/* Footer Legal Policy Links */}
      <div className="mt-8 flex gap-4 text-xs font-medium text-gray-400">
        <Link href="/privacy" className="hover:text-gray-600 transition-colors">
          Privacy Policy
        </Link>
        <Link href="/terms" className="hover:text-gray-600 transition-colors">
          Terms of Service
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
