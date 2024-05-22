import { ChevronLeft } from "lucide-react";
import { SignUpCodeForm } from "../forms/SignUpCodeForm";
import { Button } from "../ui/button";
import { SignUpForm } from "../forms/SignUpForm";
import { LogInForm } from "../forms/LogInForm";
import Link from "next/link";
import { RestorePasswordForm } from "../forms/RestorePasswordForm";
import { ResetPasswordForm } from "../forms/ResetPasswordForm";
import { SignUpFirstLastNameForm } from "../forms/SignUpFirstLastNameForm";

const titleStyle = "text-center lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-semibold";
const textStyle = "text-center lg:text-2xl sm:text-xl text-md mt-1";

export const ModalLogIn = ({
    changeModal,
  }: {
    changeModal: (modal: string) => void;
  }) => {
  return (
    <div className="w-full h-full py-14">
      <div className="w-full h-full flex flex-col justify-between items-center gap-3">
        <div className="w-full h-full flex flex-col justify-between items-center gap-3">
          <div>
            <h1 className="text-center lg:text-5xl sm:text-4xl text-3xl font-semibold" >Welcome back</h1>
            <h2 className={textStyle} >Login into your account</h2>
          </div>
          <div className="max-w-md w-full h-full">
            <LogInForm changeModal={changeModal} />
          </div>
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

export const ModalRestorePassword = ({
  changeModal,
}: {
  changeModal: (modal: string) => void;
}) => {
  return (
    <div className="w-full h-full py-14">
      <div className="w-full h-full flex flex-col justify-between items-center gap-3">
        <div>
          <h1 className={titleStyle} >Forgot password</h1>
          <h2 className={textStyle} >Enter your email to reset your password</h2>
        </div>
        <div className="max-w-md w-full h-full">
          <RestorePasswordForm changeModal={changeModal} />
        </div>
      </div>
      <div className="absolute flex left-6 top-6 max-md:left-4 max-md:top-4">
        <Button
          variant={"ghost"}
          onClick={() => {
            changeModal("login");
          }}
          className="absolute p-3 pl-1"
        >
          <ChevronLeft />
          <span className="lg:text-2xl md:text-xl text-base">Back</span>
        </Button>
      </div>
    </div>
  );
};

export const ModalResetPassword = ({
  changeModal,
}: {
  changeModal: (modal: string) => void;
}) => {
  return (
    <div className="w-full h-full py-14">
      <div className="w-full h-full flex flex-col justify-between items-center gap-3">
        <div>
          <h1 className={titleStyle} >Reset password</h1>
          <h2 className={textStyle} >Set a new password for your account</h2>
        </div>
        <div className="max-w-md w-full h-full">
          <ResetPasswordForm changeModal={changeModal} />
        </div>
      </div>
      <div className="absolute flex left-6 top-6 max-md:left-4 max-md:top-4">
        <Button
          variant={"ghost"}
          onClick={() => {
            changeModal("restore-password");
          }}
          className="absolute p-3 pl-1"
        >
          <ChevronLeft />
          <span className="lg:text-2xl md:text-xl text-base">Back</span>
        </Button>
      </div>
    </div>
  );
};

export const ModalSignUp = ({
  changeModal,
}: {
  changeModal: (modal: string) => void;
}) => {
  return (
    <div className="w-full h-full flex flex-col justify-between items-center py-14">
      <div className="w-full h-full flex flex-col justify-between items-center">
        <div className="h-full flex flex-col justify-between gap-3">
          <div>
            <h1 className={titleStyle} >Create account</h1>
            <h2 className={textStyle} >Shop in the marketplace while traveling</h2>
          </div>
          <div className="max-w-md w-full h-full">
            <SignUpForm onChangeModal={changeModal} />
          </div>
        </div>
        <div className="flex w-full justify-center items-center">
          <span className="text-base max-sm:text-sm">Do you have an account?</span>
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
      <div className="absolute flex bottom-6 text-gray-600 max-lg:flex-col max-lg:justify-center max-lg:items-center">
        <span className="max-md:text-sm">By clicking “Continue”, you agree with</span>
        <Link href="/terms&conditions" className="ml-2 underline text-black max-md:text-sm" >PERRY Terms and Conditions</Link>
      </div>
    </div>
  );
};

export const ModalSignUpCode = ({
  changeModal,
}: {
  changeModal: (modal: string) => void;
}) => {
  return (
    <div className="w-full h-full flex flex-col justify-between items-center py-14">
      <div className="w-full h-full flex flex-col justify-between items-center">
        <div>
          <h1 className={titleStyle} >Sent code</h1>
          <h2 className={textStyle} >Enter the code to confirm your email</h2>
        </div>
        <div className="max-w-md w-full h-full">
          <SignUpCodeForm onChangeModal={changeModal} />
        </div>
      </div>
      <div className="absolute flex left-6 top-6 max-md:left-4 max-md:top-4">
        <Button
          variant={"ghost"}
          onClick={() => {
            changeModal("signup");
          }}
          className="absolute p-3 pl-1"
        >
          <ChevronLeft />
          <span className="lg:text-2xl md:text-xl text-base">Back</span>
        </Button>
      </div>
    </div>
  );
};

export const ModalFirstLastName = ({
  changeModal,
}: {
  changeModal: (modal: string) => void;
}) => {
  return (
    <div className="w-full h-full flex flex-col justify-between items-center py-14">
      <div className="w-full h-full flex flex-col justify-between items-center gap-3">
        <div>
          <h1 className={titleStyle} >Finishing touches</h1>
          <h2 className={textStyle} >Enter your first and last name</h2>
        </div>
        <div className="max-w-md w-full h-full">
          <SignUpFirstLastNameForm onChangeModal={changeModal} />
        </div>
      </div>
    </div>
  );
};

export const ModalSignUpSuccessful = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div>
        <h1 className={titleStyle} >Congratulation!</h1>
        <h2 className={textStyle} >The registration was completed</h2>
        <Button variant={"default"} className="w-full mt-32" onClick={onClose}>
          <Link href={"/"}>
            Let&apos;s go shopping
          </Link>
        </Button>
      </div>
    </div>
  );
};
