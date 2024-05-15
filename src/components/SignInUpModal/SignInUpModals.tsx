import * as React from "react";
import Image from "next/image";
import placeholder from "@/../public/Icons/placeholder.svg";
import { useSearchParamsTools } from "@/lib/router";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ModalRestorePassword, ModalLogIn, ModalSignUp, ModalSignUpCode, ModalSignUpSuccessful, ModalResetPassword, ModalFirstLastName } from "./ModalsContent";
import { cn } from "@/lib/utils";

const modalParamName = "modal";

export const SignInUpModals = ({
  variant,
}: {
  variant: "banner" | "sidebar";
}) => {
  
  return (
    <div className="flex gap-4">
      <SignInUpModal variant={variant === "banner" ? "outline" : "secondary"} />
    </div>
  );
};

const SignInUpModal = ({
  variant,
} : {
  variant: "default" | "outline" | "secondary";
}) => {
  const searchParams = useSearchParamsTools();

  const [modal, setModal] = useState<string>(() => {
    const defaultValue = searchParams.get(modalParamName);
    if (defaultValue) return defaultValue;
    return "";
  });
  const handleChangeModal = (newModal: string) => {
    searchParams.set(modalParamName, newModal);
    setModal(newModal);
  };

  const [isOpen, setIsOpen] = useState<boolean>(() => {
    const defaultValue = searchParams.get(modalParamName);
    if (defaultValue) return true;
    return false;
  });
  const onOpenSignUpModal = () => {
    searchParams.set(modalParamName, "signup");
    setModal("signup");
  };
  const onOpenLogInModal = () => {
    searchParams.set(modalParamName, "login");
    setModal("login");
  };
  const onOpenModalChange = (value:boolean) => {
    if(!value)
      searchParams.set(modalParamName, undefined);
    setIsOpen(value);
  };
  const onClodeModal = () => {
    searchParams.set(modalParamName, undefined);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onOpenModalChange(!isOpen)} >
      <DialogTrigger onClick={onOpenSignUpModal}>
        <span
          className={cn("h-11 px-8 inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-base lg:text-xl", 
            "bg-primary text-primary-foreground hover:bg-primary/90",
          )}
        >
          Sign up
        </span>
      </DialogTrigger>
      <DialogTrigger onClick={onOpenLogInModal}>
        <span
          className={cn("h-11 px-8 inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-base lg:text-xl", 
            variant === "outline" && "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
            variant === "secondary" && "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            variant === "default" && "bg-primary text-primary-foreground hover:bg-primary/90",
          )}
        >
          Log in
        </span>
      </DialogTrigger>
      <DialogContent className="w-full h-full flex max-w-screen-xl max-h-[680px]" hideClose >
        <div className="flex justify-between items-center w-full h-full gap-6">
          {(() => {
            switch (modal) {
              case "login":
                return <ModalLogIn changeModal={handleChangeModal} />;
              case "restore-password":
                return <ModalRestorePassword changeModal={handleChangeModal} />;
              case "reset-password":
                return <ModalResetPassword changeModal={handleChangeModal} />;
              case "signup":
                return <ModalSignUp changeModal={handleChangeModal} />;
              case "signup-code":
                return <ModalSignUpCode changeModal={handleChangeModal} />;
              case "finishing-touches":
                return <ModalFirstLastName changeModal={handleChangeModal} />;
              case "successful-registration":
                return <ModalSignUpSuccessful onClose={onClodeModal} />;

              default:
                return null;
            }
          })()}
          <div className="w-full h-full max-w-[530px] max-md:hidden">
            <Image src={placeholder} alt="Placeholder" className="h-full" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
