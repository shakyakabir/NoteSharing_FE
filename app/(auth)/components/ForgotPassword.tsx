"use client";

import React, { useState } from "react";
import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import Text from "@/app/components/ui/Text";
import note from "@/public/note.svg";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, KeyRound, Mail } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    // Simulate API reset call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F9FAFD] px-4 py-12">
      {/* Container */}
      <div className="w-full max-w-md space-y-6">
        {/* Brand Icon */}
        <div className="flex justify-center">
          <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-600/20">
            <Image
              alt="Note"
              src={note}
              className="w-8 h-8 sm:w-10 sm:h-10 invert brightness-200"
            />
          </div>
        </div>

        {/* Card */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          {!isSubmitted ? (
            <>
              {/* Header */}
              <div className="text-center space-y-1.5">
                <Text size={"lg"} weight={"bold"} color={"heading"} as={"h1"}>
                  Forgot Password?
                </Text>
                <Text
                  size={"sm"}
                  weight={"medium"}
                  color={"subHeading"}
                  as={"p"}
                >
                  No worries! Enter your email address below and we’ll send you
                  instructions to reset your password.
                </Text>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <Input
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
                    placeHolder="name@example.com"
                    labelName="Email Address"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition shadow-md shadow-indigo-600/10 flex items-center justify-center space-x-2"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>
                    {isLoading ? "Sending Link..." : "Send Reset Link"}
                  </span>
                </Button>
              </form>
            </>
          ) : (
            /* Success State */
            <div className="text-center space-y-4 py-2">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100 flex items-center justify-center mx-auto">
                <Mail className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <h2 className="text-lg font-bold text-slate-800">
                  Check your email
                </h2>
                <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                  We sent a password reset link to{" "}
                  <span className="font-semibold text-slate-700">{email}</span>.
                </p>
              </div>

              <Button
                onClick={() => setIsSubmitted(false)}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl transition text-xs"
              >
                Resend Email
              </Button>
            </div>
          )}

          {/* Back to Login Footer */}
          <div className="pt-2 border-t border-slate-50 text-center">
            <Link
              href="/login"
              className="inline-flex items-center space-x-2 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Login</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
