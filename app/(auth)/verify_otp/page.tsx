"use client";

import Input from "@/app/components/ui/Input";
import { useVerifyOtpMutation } from "@/slices/Auth";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

const VerifyOtpPage = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const onHandleOtpChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];

    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const onHandleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [otpverify, { isLoading, error }] = useVerifyOtpMutation();

  const onHandleSubmit = () => {
    const enteredOtp = otp.join("");
    console.log("Entered OTP:", enteredOtp);
    otpverify({ otp: enteredOtp, email: email });
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F9FAFB] p-4 text-[#1F2937]">
      <div className="w-full max-w-md flex flex-col items-center">
        {/* Logo / Brand Header */}
        <div className="mb-8 flex flex-col items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4F46E5] text-white shadow-md">
            {/* Replace with your specific NoteShare icon */}
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-[#4F46E5]">
            NoteShare
          </span>
        </div>

        {/* Main Card */}
        <div className="w-full rounded-2xl bg-white p-8 shadow-sm border border-gray-100 flex flex-col items-center">
          {/* Decorative Email Icon */}
          <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#EEF2F6]">
            {/* <Mail className="h-8 w-8 text-[#4F46E5]" /> */}
            <div className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-[#4F46E5] text-white border-2 border-white">
              {/* <ShieldCheck className="h-3.5 w-3.5" /> */}
            </div>
          </div>

          {/* Heading Content */}
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Check your inbox
          </h2>
          <p className="text-center text-sm text-gray-500 max-w-xs mb-8 leading-relaxed">
            We've sent a 6-digit verification code to{" "}
            <span className="font-medium text-gray-800">
              student@university.edu
            </span>
          </p>

          {/* OTP Inputs Container */}
          <div className="flex justify-center gap-2 sm:gap-3 w-full mb-8">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={data}
                ref={(el) => (inputRefs.current[index] = el)}
                onKeyDown={(e) => onHandleKeyDown(e, index)}
                onChange={(e) => onHandleOtpChange(e.target.value, index)}
                className="w-12 h-14 sm:w-14 sm:h-14 text-center text-xl font-semibold border-2 border-gray-200 rounded-xl focus:border-[#4F46E5] focus:ring-2 focus:ring-[#EEF2F6] outline-none transition-all duration-150 bg-gray-50/50"
              />
            ))}
          </div>

          {/* Submit Action Button */}
          <button
            onClick={onHandleSubmit}
            className="w-full py-3.5 px-4 bg-[#4F46E5] hover:bg-[#4338CA] active:scale-[0.99] text-white font-semibold rounded-xl shadow-md transition-all duration-200 mb-6 flex justify-center items-center"
          >
            Verify Account
          </button>

          {/* Resend Code Section */}
          <div className="flex flex-col items-center gap-1 text-sm text-gray-400">
            <span className="flex items-center gap-1.5 text-[#4F46E5] font-medium">
              {/* <RotateCw className="w-3.5 h-3.5 animate-pulse" /> Resend code in 0:59 */}
            </span>
            <span className="text-gray-400 text-xs">
              Didn't receive the email?
            </span>
          </div>
        </div>

        {/* Footer Navigation */}
        <button className="mt-6 flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#4F46E5] transition-colors">
          {/* <Arrow className="h-4 w-4" /> */}
          Back to login
        </button>
      </div>
    </div>
  );
};
export default VerifyOtpPage;
