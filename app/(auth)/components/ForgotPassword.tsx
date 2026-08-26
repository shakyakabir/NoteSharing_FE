"use client";

import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import Text from "@/app/components/ui/Text";
import note from "@/public/note.svg";
import Image from "next/image";
import Link from "next/link";

const ForgotPassword = () => {
  return (
    <div className="flex-center flex-col min-h-screen px-4">
      {/* Logo */}
      <div className="p-2 bg-primary rounded-lg">
        <Image alt="Note" src={note} className="w-8 h-8 sm:w-10 sm:h-10" />
      </div>

      {/* Card */}
      <div className="w-full max-w-md border border-gray-300 rounded-xl p-4 sm:p-6 bg-white mt-5 shadow-sm">
        {/* Heading */}
        <div className="flex flex-col mt-3 text-center">
          <Text size={"lg"} weight={"bold"} color={"heading"} as={"h1"}>
            Forgot Password
          </Text>
          <Text size={"sm"} weight={"medium"} color={"subHeading"} as={"p"}>
            Streamline your learning journey
          </Text>
        </div>

        {/* Inputs */}
        <div className="space-y-4 flex flex-col">
          <Input
            name="email"
            type="email"
            placeHolder="Enter your Email"
            labelName="Email"
          />
        </div>

        {/* Remember + forgot */}

        {/* Button */}
        <Button className="w-full">Login</Button>
      </div>
    </div>
  );
};

export default ForgotPassword;
