import { User } from "@/api/types";
import { ChangeEmailForm } from "@/components/forms/shop/account/ChangeEmailForm";
import { ChangeFirstLastNameForm } from "@/components/forms/shop/account/ChangeFirstLastNameForm";
import { ChangePasswordForm } from "@/components/forms/shop/account/ChangePasswordForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const ChangeNameModal = ({
  user,
  onSubmit,
}: {
  user: User;
  onSubmit: () => void;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onClose = () => {
    setIsOpen(false);
  };
  const handleSubmit = () => {
    onClose();
    onSubmit();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className={cn(buttonVariants({ variant:"secondary", size:"default", className:"px-4 py-2" }))}>
        Change name
      </DialogTrigger>
      <DialogContent className="rounded-lg" hideClose>
        <DialogHeader>
          <span className="text-xl md:text-2xl font-medium mb-4 text-left">
            Change name
          </span>
          <Separator />
        </DialogHeader>
        <div className="mt-4">
          <ChangeFirstLastNameForm
            onCancel={onClose}
            onSubmit={handleSubmit}
            defaultValues={user}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const ChangeEmailModal = ({
  email,
  onSubmit,
}: {
  email: string;
  onSubmit: () => void;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onClose = () => {
    setIsOpen(false);
  };
  const handleSubmit = () => {
    onClose();
    onSubmit();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className={cn(buttonVariants({ variant:"secondary", size:"default", className:"px-4 py-2" }))}>
        Change email
      </DialogTrigger>
      <DialogContent className="rounded-lg" hideClose>
        <DialogHeader>
          <span className="text-xl md:text-2xl font-medium mb-3 md:mb-4 text-left">
            Change email
          </span>
          <Separator />
        </DialogHeader>
        <div className="flex flex-col gap-3 md:mt-4">
          <span className="flex text-sm md:text-base">
            Your current email is{" "}
            <p className="text-blue-400 ml-1 text-sm md:text-base">{email}</p>.
          </span>
          <span className="text-sm md:text-base">
            To change it, enter a new email, then click “Send code” and enter it
            in corresponding prompt.
          </span>
        </div>
        <div className="mt-4">
          <ChangeEmailForm onCancel={onClose} onSubmit={handleSubmit} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const ChangePasswordModal = ({ onSubmit }: { onSubmit: () => void }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onClose = () => {
    setIsOpen(false);
  };
  const handleSubmit = () => {
    onClose();
    onSubmit();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className={cn(buttonVariants({ variant:"secondary", size:"default", className:"px-4 py-2" }))}>
        Change password
      </DialogTrigger>
      <DialogContent className="rounded-lg" hideClose>
        <div>
          <ChangePasswordForm onCancel={onClose} onSubmit={handleSubmit} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const LogOutModal = ({
  onSubmit,
  isButtonsDisabled,
}: {
  onSubmit: () => void;
  isButtonsDisabled: boolean;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onClose = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger
        className={cn(buttonVariants({ variant:"secondary", size:"default", className:"px-4 py-2" }))}
        disabled={isButtonsDisabled}
      >
        Log out
      </DialogTrigger>
      <DialogContent className="max-w-[464px] rounded-lg" hideClose>
        <DialogHeader className="flex flex-col justify-center items-center">
          <span className="text-xl md:text-3xl font-semibold mb-3 md:mb-4">
            Log out?
          </span>
          <Separator />
          <span className="text-base md:text-xl text-center pt-5 md:px-4">
            You will log out of your account on this device
          </span>
        </DialogHeader>
        <div className="flex justify-between items-center gap-3 mt-1 md:mt-5">
          <Button
            type="reset"
            variant={"secondary"}
            className="w-full"
            onClick={onClose}
            disabled={isButtonsDisabled}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="w-full"
            onClick={onSubmit}
            disabled={isButtonsDisabled}
          >
            Log out
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const DeleteAccountModal = ({
  onSubmit,
  isButtonsDisabled,
}: {
  onSubmit: () => void;
  isButtonsDisabled: boolean;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onClose = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger
        className={cn(buttonVariants({ variant:"destructive", size:"default", className:"px-4 py-2" }))}
        disabled={isButtonsDisabled}
      >
        Delete
      </DialogTrigger>
      <DialogContent className="max-w-[464px] rounded-lg" hideClose>
        <DialogHeader className="flex flex-col justify-center items-center">
          <span className="text-xl md:text-3xl font-semibold mb-3 md:mb-4">
            Delete account?
          </span>
          <Separator />
          <div className="flex flex-col justify-center items-center text-base md:text-xl text-center md:py-6 pt-[14px] md:px-4 gap-5">
            <span>
              This action will permanently remove your profile and correlated
              data.
            </span>
            <span>
              Once clicked, all associated information, including orders,
              wishlisted items, and settings, is irreversibly erased from the
              system.
            </span>
            <span>Do you wish to proceed?</span>
          </div>
        </DialogHeader>
        <div className="flex justify-between items-center gap-3 mt-1 md:mt-5">
          <Button
            type="reset"
            variant={"secondary"}
            className="w-full"
            onClick={onClose}
            disabled={isButtonsDisabled}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant={"destructive"}
            className="w-full"
            onClick={onSubmit}
            disabled={isButtonsDisabled}
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
