import { Suspense } from "react";
import VerifyOtpClient from "./VerifyOtpClient";

export default function VerifyOtpPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#F9FAFB]">
          <div className="text-sm text-gray-500">Loading...</div>
        </div>
      }
    >
      <VerifyOtpClient />
    </Suspense>
  );
}
