import * as React from "react";
import Image from "next/image";
import placeholder from "@/../public/Icons/placeholder.svg";
import { Button } from "@/components/ui/button";
import { LogInForm } from "@/components/forms/LogInForm";
import { useSearchParamsTools } from "@/lib/router";
import { SignUpForm } from "../forms/SignUpForm";
import { SignUpCodeForm } from "../forms/SignUpCodeForm";
import { ChevronLeft, XIcon } from "lucide-react";
import { useState } from "react";

export const ModalSignInUpVariation = ({
  onClose,
}: {
  onClose: () => void;
}) => {
  const searchParams = useSearchParamsTools();

  const [modal, setModal] = useState<string>(() => {
    const defaultValue = searchParams.get("modal");
    if (defaultValue) return defaultValue;

    return "";
  });

  const handleChangeModal = (newModal: string) => {
    setModal(newModal);
    searchParams.set("modal", newModal);
  };

  return (
    <div className="fixed flex inset-0 justify-center items-center z-50">
      <div
        className="absolute flex inset-0 bg-gray-500 bg-opacity-50 z-49"
        onClick={onClose}
      />
      <div className="flex max-w-7xl max-h-[560px] w-full h-full gap-6 p-6 bg-white rounded-lg justify-between z-50">
        <>
          {(() => {
            switch (modal) {
              case "login":
                return <ModalLogIn changeModal={handleChangeModal} />;
              case "signup":
                return <ModalSignUp changeModal={handleChangeModal} />;
              case "signup-code":
                return <ModalSignUpCode changeModal={handleChangeModal} />;
              case "successful-registration":
                return <ModalSignUpSuccessful onClose={onClose} />;

              default:
                return null;
            }
          })()}
          <div className="lg:max-w-xl md:max-w-sm md:block hidden">
            <Image src={placeholder} alt="Placeholder" className="h-full" />
          </div>
        </>
      </div>
      <Button
        variant={"ghost"}
        className="absolute right-6 top-6 bg-gray-200 max-w-10 max-h-10 p-2 rounded-full"
        onClick={onClose}
      >
        <XIcon />
      </Button>
    </div>
  );
};

const ModalLogIn = ({
  changeModal,
}: {
  changeModal: (modal: string) => void;
}) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-full">
        <h1 className="text-center lg:text-5xl sm:text-4xl text-3xl font-semibold">
          Welcome back
        </h1>
        <h2 className="text-center lg:text-2xl sm:text-xl text-md mt-1">
          Login into your account
        </h2>
        <div className="max-w-md w-full h-full m-auto py-6">
          <LogInForm />
        </div>
        <div className="flex w-full justify-center items-center">
          <span className="text-base max-sm:text-sm">
            Don&apos;t have an account?
          </span>
          <Button
            variant={"link"}
            className="px-1"
            onClick={() => {
              changeModal("signup");
            }}
          >
            Sign up
          </Button>
        </div>
      </div>
    </div>
  );
};

const ModalSignUp = ({
  changeModal,
}: {
  changeModal: (modal: string) => void;
}) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div>
        <h1 className="text-center lg:text-5xl sm:text-4xl text-3xl font-semibold">
          Create account
        </h1>
        <h2 className="text-center lg:text-2xl sm:text-xl text-md mt-1">
          Shop in the marketplace while traveling
        </h2>
        <div className="max-w-md w-full h-full m-auto py-6">
          <SignUpForm onChangeModal={changeModal} />
        </div>
        <div className="flex w-full justify-center items-center">
          <span className="text-base max-sm:text-sm">
            Do you have an account?
          </span>
          <Button
            variant={"link"}
            className="px-1"
            onClick={() => {
              changeModal("login");
            }}
          >
            Log in
          </Button>
        </div>
      </div>
    </div>
  );
};

const ModalSignUpCode = ({
  changeModal,
}: {
  changeModal: (modal: string) => void;
}) => {
  return (
    <div className="w-full h-full">
      <div className="flex justify-start">
        <Button
          variant={"ghost"}
          onClick={() => {
            changeModal("signup");
          }}
          className="absolute p-3 pl-1"
        >
          <ChevronLeft />
          <span className="lg:text-2xl text-xl">Back</span>
        </Button>
      </div>
      <div className="w-full h-full flex justify-center items-center">
        <div>
          <h1 className="text-center lg:text-5xl sm:text-4xl text-3xl font-semibold">
            Sent code
          </h1>
          <h2 className="text-center lg:text-2xl sm:text-xl text-md mt-1">
            Enter the code to confirm your email
          </h2>
          <div className="max-w-md w-full h-full m-auto py-6">
            <SignUpCodeForm onChangeModal={changeModal} />
          </div>
        </div>
      </div>
    </div>
  );
};

const ModalSignUpSuccessful = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div>
        <h1 className="text-center lg:text-5xl sm:text-4xl text-3xl font-semibold">
          Congratulation!
        </h1>
        <h2 className="text-center lg:text-2xl sm:text-xl text-md mt-1">
          The registration was completed
        </h2>
        <Button variant={"default"} className="w-full mt-32" onClick={onClose}>
          Let&apos;s go shopping
        </Button>
      </div>
    </div>
  );
};
