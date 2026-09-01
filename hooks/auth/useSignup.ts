"use client";

import { signupSchema } from "@/app/(auth)/lib/Validator";
import { useRegisterMutation } from "@/slices/Auth";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const useSignup = () => {
  const [formData, setFormData] = React.useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = React.useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [hasTouched, setHasTouched] = React.useState(false);
  const router = useRouter();

  const [register, { isLoading, error }] = useRegisterMutation();
  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    setHasTouched(true);
  };
  React.useEffect(() => {
    const result = signupSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      setErrors({
        email: formData.email.length > 0 ? fieldErrors.email?.[0] || "" : "",

        password:
          formData.password.length > 0 ? fieldErrors.password?.[0] || "" : "",

        confirmPassword:
          formData.confirmPassword.length > 0
            ? fieldErrors.confirmPassword?.[0] || ""
            : "",
      });
    } else {
      setErrors({});
    }
  }, [formData]);
  const onHandleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement> | React.SubmitEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    const result = signupSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      setErrors({
        email: fieldErrors.email?.[0] || "",
        password: fieldErrors.password?.[0] || "",
        confirmPassword: fieldErrors.confirmPassword?.[0] || "",
      });

      toast.error("Please fix form errors");
      return;
    }

    try {
      const res = await register({
        email: formData.email,
        password: formData.password,
        username: formData.username,
      }).unwrap();
      if (res.status === "200") {
        router.push(`/verify_otp?email=${formData.email}`);
      }
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  const isConfirmPasswordMismatch =
    formData.confirmPassword.length > 0 &&
    formData.password === formData.confirmPassword;
  const isDisabled =
    !signupSchema.safeParse(formData).success ||
    isLoading ||
    !isConfirmPasswordMismatch;

  const getPasswordStrength = (password: string) => {
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (/[!@#$%^&*(),.?":{}|<>_\-\\[\]]/.test(password)) score++;

    return score;
  };
  const isWeakPassword = getPasswordStrength(formData.password);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };
  return {
    formData,
    isLoading,
    error,
    isDisabled,
    isWeakPassword,
    errors,
    togglePasswordVisibility,
    showPassword,
    showConfirmPassword,
    toggleConfirmPasswordVisibility,
    isConfirmPasswordMismatch,
    onHandleChange,
    onHandleSubmit,
  };
};
