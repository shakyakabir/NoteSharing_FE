"use client";

import React, { useState } from "react";
import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
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
import note from "@/public/note.svg";
import { useForgotPasswordMutation } from "@/slices/Auth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    try {
      await forgotPassword({ email }).unwrap();

      toast.success("If an account exists, a reset code has been sent.");

      router.push(`/reset-password?email=${encodeURIComponent(email)}`);
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

            {/* Content */}
            <div className="max-w-md">
              {/* Badge */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-white" />

                <span className="text-[11px] font-medium text-white">
                  Secure account recovery
                </span>
              </div>

              <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-white xl:text-5xl">
                Get back to
                <br />
                <span className="text-white/55">learning faster.</span>
              </h1>

              <p className="mt-4 max-w-sm text-sm leading-6 text-white/60">
                Forgot your password? Don't worry. We'll help you securely
                regain access to your notes, AI tools and study workspace.
              </p>

              {/* Recovery steps */}
              <div className="mt-7 space-y-4">
                {/* Step 1 */}
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10">
                    <Mail className="h-4 w-4 text-white" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-white">
                      Enter your email
                    </p>

                    <p className="mt-0.5 text-[10px] text-white/45">
                      Tell us which account belongs to you.
                    </p>
                  </div>

                  <Check className="ml-auto h-4 w-4 text-white/30" />
                </div>

                {/* Step 2 */}
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10">
                    <KeyRound className="h-4 w-4 text-white" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-white">
                      Verify your code
                    </p>

                    <p className="mt-0.5 text-[10px] text-white/45">
                      We'll send a secure verification code.
                    </p>
                  </div>

                  <Check className="ml-auto h-4 w-4 text-white/30" />
                </div>

                {/* Step 3 */}
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-white">
                      Create a new password
                    </p>

                    <p className="mt-0.5 text-[10px] text-white/45">
                      Get back to your NoteHive workspace.
                    </p>
                  </div>

                  <Check className="ml-auto h-4 w-4 text-white/30" />
                </div>
              </div>

              {/* Security card */}
              <div className="mt-7 rounded-xl border border-white/10 bg-white/[0.08] p-3.5">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-white" />

                  <span className="text-[11px] font-semibold text-white">
                    Your account stays protected
                  </span>
                </div>

                <p className="mt-1.5 text-[10px] leading-4 text-white/45">
                  For your security, we'll never reveal whether an email is
                  registered with NoteHive.
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

            {/* Heading */}
            <div className="mb-5">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-[#4235CE]/10">
                <KeyRound className="h-4 w-4 text-[#4235CE]" />
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Forgot your password?
              </h2>

              <p className="mt-1.5 max-w-sm text-xs leading-5 text-gray-500">
                Enter the email address connected to your NoteHive account and
                we'll send you a verification code.
              </p>
            </div>

            {/* Form Card */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xl shadow-gray-200/40 sm:p-6">
              {/* Info */}
              <div className="mb-5 flex gap-3 rounded-xl bg-[#4235CE]/5 p-3.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#4235CE]/10">
                  <Mail className="h-4 w-4 text-[#4235CE]" />
                </div>

                <div>
                  <p className="text-[11px] font-semibold text-gray-800">
                    Reset link will be sent to your email
                  </p>

                  <p className="mt-0.5 text-[10px] leading-4 text-gray-500">
                    Check your inbox and spam folder after submitting this form.
                  </p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
                    placeHolder="name@example.com"
                    labelName="Email Address"
                    className="h-10 w-full"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || !email.trim()}
                  className="group flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#4235CE] text-xs font-semibold text-white shadow-md shadow-[#4235CE]/20 transition hover:bg-[#362BB5] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <KeyRound className="h-3.5 w-3.5" />

                  <span>
                    {isLoading ? "Sending code..." : "Send reset code"}
                  </span>

                  {!isLoading && (
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  )}
                </Button>
              </form>

              {/* Back to login */}
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

            {/* Bottom text */}
            <p className="mt-3 text-center text-[9px] text-gray-400">
              Securely recover your NoteHive account.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
