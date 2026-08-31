"use client";

import React, { useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  FileText,
  KeyRound,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useVerifyOtpMutation } from "@/slices/Auth";

const VerifyOtpClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") ?? "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [otpverify, { isLoading }] = useVerifyOtpMutation();

  // =========================================================
  // OTP CHANGE
  // =========================================================
  const onHandleOtpChange = (value: string, index: number) => {
    // Handle pasted / multiple digits
    if (value.length > 1) {
      const digits = value.replace(/\D/g, "").slice(0, 6).split("");

      const newOtp = ["", "", "", "", "", ""];

      digits.forEach((digit, i) => {
        newOtp[i] = digit;
      });

      setOtp(newOtp);

      const nextIndex = Math.min(digits.length, 5);

      inputRefs.current[nextIndex]?.focus();

      return;
    }

    // Only allow numbers
    if (value && !/^\d$/.test(value)) {
      return;
    }

    const newOtp = [...otp];

    newOtp[index] = value;

    setOtp(newOtp);

    // Move to next input
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // =========================================================
  // KEYBOARD NAVIGATION
  // =========================================================
  const onHandleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // =========================================================
  // SUBMIT
  // =========================================================
  const onHandleSubmit = async () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      toast.error("Please enter the complete 6-digit verification code.");
      return;
    }

    if (!email) {
      toast.error("Email address is missing. Please start again.");
      return;
    }

    try {
      const res = await otpverify({
        otp: enteredOtp,
        email,
      }).unwrap();

      if (res?.status === "200") {
        toast.success("OTP verified successfully!");

        router.push("/login");
      } else {
        toast.error(res?.message || "Invalid verification code.");
      }
    } catch {
      toast.error("Invalid or expired verification code.");
    }
  };

  const isComplete = otp.every((digit) => digit !== "");

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
                <ShieldCheck className="h-3.5 w-3.5 text-white" />

                <span className="text-[11px] font-medium text-white">
                  Secure account verification
                </span>
              </div>

              <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-white xl:text-5xl">
                One quick step
                <br />
                <span className="text-white/55">before you continue.</span>
              </h1>

              <p className="mt-4 max-w-sm text-sm leading-6 text-white/60">
                Verify your email to keep your NoteHive account secure and start
                learning with your notes, friends and AI tools.
              </p>

              {/* Verification steps */}
              <div className="mt-7 space-y-4">
                {/* Step 1 */}
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white">
                    <Check className="h-4 w-4 text-[#4235CE]" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-white">
                      Email sent
                    </p>

                    <p className="mt-0.5 text-[10px] text-white/45">
                      A verification code has been sent.
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
                      Enter your code
                    </p>

                    <p className="mt-0.5 text-[10px] text-white/45">
                      Enter the 6-digit code from your inbox.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-white">
                      Start learning
                    </p>

                    <p className="mt-0.5 text-[10px] text-white/45">
                      Access notes, groups and AI tools.
                    </p>
                  </div>
                </div>
              </div>

              {/* Security card */}
              <div className="mt-7 rounded-xl border border-white/10 bg-white/[0.08] p-3.5">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-white" />

                  <span className="text-[11px] font-semibold text-white">
                    Why verify your email?
                  </span>
                </div>

                <p className="mt-1.5 text-[10px] leading-4 text-white/45">
                  Email verification helps protect your account and makes sure
                  you can recover it when needed.
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
            RIGHT OTP PANEL
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
                <Mail className="h-4 w-4 text-[#4235CE]" />
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Check your inbox
              </h2>

              <p className="mt-1.5 text-xs leading-5 text-gray-500">
                We've sent a 6-digit verification code to your email address.
              </p>
            </div>

            {/* Card */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xl shadow-gray-200/40 sm:p-6">
              {/* Email */}
              <div className="mb-5 flex items-center gap-3 rounded-xl bg-gray-50 px-3.5 py-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#4235CE]/10">
                  <Mail className="h-3.5 w-3.5 text-[#4235CE]" />
                </div>

                <div className="min-w-0">
                  <p className="text-[9px] uppercase tracking-wider text-gray-400">
                    Verification email
                  </p>

                  <p className="mt-0.5 truncate text-xs font-semibold text-gray-700">
                    {email || "your email address"}
                  </p>
                </div>
              </div>

              {/* OTP */}
              <div>
                <p className="mb-3 text-xs font-semibold text-gray-700">
                  Verification code
                </p>

                <div className="flex justify-center gap-1.5 sm:gap-2.5">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      autoComplete={index === 0 ? "one-time-code" : "off"}
                      maxLength={1}
                      value={digit}
                      onChange={(e) => onHandleOtpChange(e.target.value, index)}
                      onKeyDown={(e) => onHandleKeyDown(e, index)}
                      className={`
                        h-12 w-10 rounded-xl
                        border-2
                        bg-gray-50/70
                        text-center
                        text-lg
                        font-bold
                        outline-none
                        transition-all
                        sm:h-14 sm:w-12
                        ${
                          digit
                            ? "border-[#4235CE] bg-[#4235CE]/5 text-[#4235CE]"
                            : "border-gray-200 text-gray-900"
                        }
                        focus:border-[#4235CE]
                        focus:bg-white
                        focus:ring-4
                        focus:ring-[#4235CE]/10
                      `}
                    />
                  ))}
                </div>

                <p className="mt-3 text-center text-[10px] text-gray-400">
                  Enter the 6-digit code from your email.
                </p>
              </div>

              {/* Verify button */}
              <button
                type="button"
                onClick={onHandleSubmit}
                disabled={isLoading || !isComplete}
                className="
                  group
                  mt-6
                  flex
                  h-11
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#4235CE]
                  text-xs
                  font-semibold
                  text-white
                  shadow-md
                  shadow-[#4235CE]/20
                  transition-all
                  hover:bg-[#362BB5]
                  active:scale-[0.99]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                <span>{isLoading ? "Verifying..." : "Verify email"}</span>

                {!isLoading && (
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                )}
              </button>

              {/* Resend */}
              <div className="mt-5 text-center">
                <p className="text-[11px] text-gray-400">
                  Didn't receive the code?
                </p>

                <button
                  type="button"
                  className="mt-1 text-[11px] font-semibold text-[#4235CE] hover:underline"
                >
                  Resend verification code
                </button>
              </div>

              {/* Back */}
              <div className="mt-5 border-t border-gray-100 pt-4 text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-gray-500 transition hover:text-[#4235CE]"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back to login
                </Link>
              </div>
            </div>

            {/* Footer */}
            <p className="mt-3 text-center text-[9px] text-gray-400">
              Securely verify your NoteHive account.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default VerifyOtpClient;
