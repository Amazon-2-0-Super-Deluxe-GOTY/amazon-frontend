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

export const ChangeNameModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onClose = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm md:text-base font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
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
          <ChangeFirstLastNameForm onCancel={onClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const ChangeEmailModal = ({ email }: { email: string }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onClose = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm md:text-base font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
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
          <ChangeEmailForm onCancel={onClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const ChangePasswordModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onClose = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm md:text-base font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
        Change password
      </DialogTrigger>
      <DialogContent className="rounded-lg" hideClose>
        <div>
          <ChangePasswordForm onCancel={onClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const LogOutModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onClose = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm md:text-base font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
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
          >
            Cancel
          </Button>
          <Button type="submit" className="w-full">
            Log out
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const DeleteAccountModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onClose = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm md:text-base font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input h-10 px-4 py-2 bg-destructive text-destructive-foreground hover:bg-destructive/90">
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
          >
            Cancel
          </Button>
          <Button type="submit" variant={"destructive"} className="w-full">
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
