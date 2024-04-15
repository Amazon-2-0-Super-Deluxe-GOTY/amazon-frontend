import * as React from "react";
import Image from "next/image";
import placeholder from "@/../public/Icons/placeholder.svg";
import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InputForm } from "@/components/forms/SignUpForm";

export const ModalLogInSignUp = ({ onClose } : { onClose: () => void }) => {
  return (
    <div className="fixed flex inset-0 justify-center items-center bg-gray-500 bg-opacity-50 z-50">
      <div className="flex max-w-7xl w-full p-6 gap-6 bg-white rounded-lg justify-between">
        <div className="w-full py-12 px-36 justify-center items-center">
          <div className=" w-full">
            <h1 className="text-center text-5xl font-semibold">Welcome back</h1>
            <h2 className="text-center text-2xl">Login into your account</h2>
            <div className="w-full grid-flow-row">
              <InputForm />
            </div>
            <div className="grid-flow-row gap-4 w-full pt-6">
              <Button variant={"default"} className="w-full">Log in</Button>
              <div className="flex w-full justify-center items-center">
                <span className="text-base">Don&apos;t have an account?</span>
                <Button variant={"link"} className="px-1">Sign up</Button>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-xl">
          <Image
            src={placeholder}
            alt="Placeholder"
            className="h-full"
          />
        </div>
      </div>
      <Button variant={"ghost"} className="absolute right-6 top-6 bg-gray-200 max-w-10 max-h-10 p-2 rounded-full" onClick={onClose}>
        <XIcon />
      </Button>
    </div>
  );
}
