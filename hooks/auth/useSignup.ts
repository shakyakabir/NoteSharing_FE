"use client";

import { useRegisterMutation } from "@/slices/Auth";
import { useRouter } from "next/navigation";
import React from "react";

type FormData = {
  username: string;
  email: string;
  password: string;
};

export const useSignup = () => {
  const [formData, setFormData] = React.useState<FormData>({
    username: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const [register, { isLoading, error }] = useRegisterMutation();
  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onHandleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const res = await register(formData).unwrap();
      if (res.status === "200") {
        router.push(`/verify_otp?email=${formData.email}`);
      }
      setFormData({
        username: "",
        email: "",
        password: "",
      });
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  const isDisabled =
    !formData.username || !formData.email || !formData.password || isLoading;

  const isWeakPassword =
    formData.password.length > 0 && formData.password.length < 6;

  return {
    formData,
    isLoading,
    error,
    isDisabled,
    isWeakPassword,
    onHandleChange,
    onHandleSubmit,
  };
};
