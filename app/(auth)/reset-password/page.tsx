"use client";

import { Suspense } from "react";
import ResetPasswordForm from "../components/ResetPasswordForm";

const ResetPassword = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
};
export default ResetPassword;
