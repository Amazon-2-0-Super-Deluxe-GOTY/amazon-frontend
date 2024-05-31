import * as React from "react";
import Image from "next/image";
import placeholder from "@/../public/Icons/placeholder.svg";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  ModalRestorePassword,
  ModalLogIn,
  ModalSignUp,
  ModalSignUpCode,
  ModalSignUpSuccessful,
  ModalResetPassword,
  ModalFirstLastName,
} from "./ModalsContent";
import { useScreenSize } from "@/lib/media";
import { Button } from "../ui/button";
import { useModal } from "../Shared/Modal";
import type { SignInUpModalVariants } from "./types";

export const SignInUpButtons = ({
  variant,
}: {
  variant: "banner" | "sidebar";
}) => {
  const { showModal } = useModal();

  function onOpenSignUpModal() {
    showModal({
      component: AuthModal,
      props: { variant: "signup" },
    });
  }
  function onOpenLogInModal() {
    showModal({
      component: AuthModal,
      props: { variant: "login" },
    });
  }

  return (
    <>
      <Button
        variant={"default"}
        className="h-11 px-8 text-base lg:text-xl"
        onClick={onOpenSignUpModal}
      >
        Sign up
      </Button>
      <Button
        variant={variant === "banner" ? "outline" : "secondary"}
        className="h-11 px-8 text-base lg:text-xl"
        onClick={onOpenLogInModal}
      >
        Log in
      </Button>
    </>
  );
};

export const AuthModal = ({
  variant,
  closeModal,
}: {
  variant: SignInUpModalVariants;
  closeModal: () => void;
}) => {
  const isDesktop = useScreenSize({ minSize: "md" });

  const [modal, setModal] = useState<SignInUpModalVariants>(variant);
  const handleChangeModal = (newModal: SignInUpModalVariants) => {
    setModal(newModal);
  };

  return (
    <Dialog open onOpenChange={(value) => !value && closeModal()}>
      <DialogContent
        className="w-full h-full flex max-w-screen-xl max-h-[680px]"
        hideClose={isDesktop}
      >
        <div className="flex justify-between items-center w-full h-full gap-6">
          {(() => {
            switch (modal) {
              case "login":
                return (
                  <ModalLogIn
                    changeModal={handleChangeModal}
                    closeModal={closeModal}
                  />
                );
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
                return <ModalSignUpSuccessful onClose={closeModal} />;

              default:
                return null;
            }
          })()}
          <div className="w-full h-full max-w-[530px] max-md:hidden">
            <Image
              src={placeholder}
              alt="Placeholder"
              className="h-full object-cover"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
