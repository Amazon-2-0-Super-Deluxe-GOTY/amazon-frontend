import * as React from "react";
import Image from "next/image";
import placeholder from "@/../public/Icons/placeholder.svg";
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
import { useScreenSize } from "@/lib/media";

export const SignInUpModals = ({
  variant,
}: {
  variant: "banner" | "sidebar";
}) => {
  
  return (
    <div className="flex gap-3">
      <SignInUpModal variant={variant === "banner" ? "outline" : "secondary"} />
    </div>
  );
};

const SignInUpModal = ({
  variant,
} : {
  variant: "default" | "outline" | "secondary";
}) => {
  const isDesktop = useScreenSize({minSize:"md"});

  const [modal, setModal] = useState<string>("");
  const handleChangeModal = (newModal: string) => {
    setModal(newModal);
  };
  const onOpenSignUpModal = () => {
    setModal("signup");
  };
  const onOpenLogInModal = () => {
    setModal("login");
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onOpenModalChange = (value:boolean) => {
    setIsOpen(value);
  };
  const onClodeModal = () => {
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
      <DialogContent className="w-full h-full flex max-w-screen-xl max-h-[680px]" hideClose={isDesktop ? true : false} >
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
