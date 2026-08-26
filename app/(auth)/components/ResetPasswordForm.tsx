"use client";

import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import Text from "@/app/components/ui/Text";
import note from "@/public/note.svg";
import Image from "next/image";
import Link from "next/link";

const ResetPasswordForm = () => {
  return (
    <div className="flex-center flex-col min-h-screen px-4">
      {/* Logo */}
      <div className="p-2 bg-primary rounded-lg">
        <Image alt="Note" src={note} className="w-8 h-8 sm:w-10 sm:h-10" />
      </div>

      {/* Heading */}
      <div className="flex flex-col mt-3 text-center">
        <Text size={"lg"} weight={"bold"} color={"heading"} as={"h1"}>
          Note Sharing
        </Text>
        <Text size={"sm"} weight={"medium"} color={"subHeading"} as={"p"}>
          Streamline your learning journey
        </Text>
      </div>

      {/* Card */}
      <div className="w-full max-w-md border border-gray-300 rounded-xl p-4 sm:p-6 bg-white mt-5 shadow-sm">
        {/* Inputs */}
        <div className="space-y-4 flex flex-col">
          <Input
            name="email"
            type="email"
            placeHolder="Enter your Email"
            labelName="Email"
          />
          <Input
            name="password"
            type="password"
            placeHolder="Enter your Password"
            labelName="Password"
          />
        </div>

        {/* Remember + forgot */}
        <div className="mt-3 mb-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div className="flex gap-2 items-center">
            <Input type="checkbox" />
            <Text size={"sm"} weight={"medium"} color={"subHeading"} as={"p"}>
              Remember me
            </Text>
          </div>

          <Link href="/">
            <span className="text-sm font-medium text-primary cursor-pointer">
              Forgot Password
            </span>
          </Link>
        </div>

        {/* Button */}
        <Button className="w-full">Login</Button>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
