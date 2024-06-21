"use client";
import { updateUserAvatar } from "@/api/users";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import { useModal } from "@/components/Shared/Modal";
import { isImageValid } from "@/lib/products";
import { AlertDialog } from "@/components/Admin/AlertDialog";

export function ChangePhotoForm({ onSubmit }: { onSubmit: () => void }) {
  const { showModal } = useModal();

  const [isUploading, startUploadTransition] = useTransition();

  function onUploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || !files[0]) return;

    const newAvatar = files[0];

    if (!isImageValid(newAvatar)) {
      showModal({
        component: AlertDialog,
        props: {
          title: "Error",
          text: "Your file exceeds 5 MB or does not match any format, namely JPEG or PNG.",
          buttonConfirmText: "Try again",
          buttonCloseText: "Back",
          colorVariant: "primary",
        },
      });
      return;
    }

    startUploadTransition(async () => {
      const data = await updateUserAvatar(newAvatar);
      if (data.status === 200) {
        onSubmit();
      }
    });
  }

  return (
    <form className="relative">
      <fieldset id="form-general">
        <div className="relative">
          <div className="flex flex-wrap gap-4">
            <div className="flex justify-center items-center relative">
              <Button
                variant={"secondary"}
                className="text-sm md:text-base"
                disabled={isUploading}
              >
                Change photo
              </Button>
              <label className="absolute inset-0 cursor-pointer z-10">
                <Input
                  className="invisible"
                  type="file"
                  accept="image/jpg,image/jpeg,image/png"
                  multiple
                  value={""}
                  onChange={onUploadImage}
                  disabled={isUploading}
                />
              </label>
            </div>
          </div>
          {/* <p className="text-sm font-medium text-destructive px-4" /> */}
        </div>
      </fieldset>
    </form>
  );
}
