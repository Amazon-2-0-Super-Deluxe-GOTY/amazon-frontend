import { InfoIcon } from "lucide-react";
import { Separator } from "../ui/separator";
import {
  ChangeEmailModal,
  ChangeNameModal,
  ChangePasswordModal,
  DeleteAccountModal,
  LogOutModal,
} from "./Popups/SettingsModals";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ChangePhotoForm } from "../forms/shop/account/ChangePhotoForm";
import type { User } from "@/api/types";
import { useAuthStore } from "@/lib/storage";
import { deleteCurrentUser, logOut } from "@/api/users";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

export const AccountSettings = ({
  user,
  refetchUser,
}: {
  user: User;
  refetchUser: () => void;
}) => {
  const router = useRouter();
  const clearToken = useAuthStore((state) => state.clearToken);
  const [isLoggingOut, startLogOutTransition] = useTransition();
  const [isDeletingAccount, startDeleteAccountTransition] = useTransition();

  const onLogOut = () => {
    startLogOutTransition(async () => {
      await logOut().then(clearToken);
      await refetchUser();
      router.push("/");
    });
  };

  const onDeleteAccount = () => {
    startDeleteAccountTransition(async () => {
      await deleteCurrentUser().then(clearToken);
      await refetchUser();
      router.push("/");
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl md:text-3xl max-lg:w-full text-left">
        Account settings
      </h1>
      <Separator />
      <div className="w-full flex flex-col py-4 lg:py-6">
        <div className="flex justify-between items-center px-3 py-3 rounded-lg even:bg-card gap-2
                        lg:px-6 max-lg:flex-col max-lg:justify-center max-lg:items-stretch max-lg:gap-3"
        >
          <div className="flex flex-col justify-center items-start gap-1 lg:gap-3">
            <span className="text-base md:text-xl">Profile photo</span>
            <span className="text-sm md:tetx-base text-gray-400">
              Change your profile picture.
            </span>
          </div>
          <div className="max-lg:w-full gap-3 flex max-lg:justify-end items-center">
            <ChangePhotoForm onSubmit={refetchUser} />
            <Popover>
              <PopoverTrigger className="group">
                <InfoIcon className="w-6 h-6 group-data-[state=closed]:stroke-gray-400" />
              </PopoverTrigger>
              <PopoverContent align="start" className="max-w-sm w-full mr-2">
                <div className="space-y-2 text-sm bg-card">
                  <p className="font-semibold">Image requirements</p>
                  <div>
                    <p>
                      Please note that the uploaded image must meet the
                      following requirements:
                    </p>
                    <ul className="list-disc pl-4">
                      <li>Maximum file size: 5 MB</li>
                      <li>Acceptable formats: JPEG, PNG</li>
                    </ul>
                    <p>
                      Images exceeding this size or in other formats will not be
                      accepted. Please ensure your files are optimized and
                      comply with the specified parameters.
                    </p>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="flex justify-between items-center px-3 py-3 rounded-lg even:bg-card gap-2 lg:px-6 max-lg:flex-col max-lg:gap-3">
          <div className="flex flex-col justify-center items-start gap-1 lg:gap-3 max-lg:w-full">
            <span className="text-base md:text-xl">
              First name and last name
            </span>
            <span className="text-sm md:tetx-base text-gray-400">
              Update your first and last name for your profile where it&apos;s
              displayed.
            </span>
          </div>
          <div className="flex justify-center items-center gap-2 lg:gap-6 max-lg:w-full max-lg:flex-col max-lg:justify-end max-lg:items-end ">
            <span className="text-sm md:text-lg">{`${user?.firstName} ${user?.lastName}`}</span>
            <ChangeNameModal onSubmit={refetchUser} user={user} />
          </div>
        </div>
        <div className="flex justify-between items-center px-3 py-3 rounded-lg even:bg-card gap-2 lg:px-6 max-lg:flex-col max-lg:gap-3">
          <div className="flex flex-col justify-center items-start gap-1 lg:gap-3 max-lg:w-full">
            <span className="text-base md:text-xl">Email</span>
            <span className="text-sm md:tetx-base text-gray-400">
              Update the email address associated with your account.
            </span>
          </div>
          <div className="flex justify-center items-center gap-2 lg:gap-6 max-lg:w-full max-lg:flex-col max-justify-end max-lg:items-end ">
            <span className="text-sm md:text-lg">{user?.email}</span>
            <ChangeEmailModal email={user?.email} onSubmit={refetchUser} />
          </div>
        </div>
        <div className="flex justify-between items-center px-3 py-3 rounded-lg even:bg-card gap-2 lg:px-6 max-lg:flex-col max-lg:gap-3">
          <div className="flex flex-col justify-center items-start lg:gap-3 gap-1 max-lg:w-full">
            <span className="text-base md:text-xl">Password</span>
            <span className="text-sm md:tetx-base text-gray-400">
              Change your account&apos;s password.
            </span>
          </div>
          <div className="flex justify-center items-center gap-2 lg:gap-6 max-lg:w-full max-lg:flex-col max-lg:justify-end max-lg:items-end">
            <span className="text-sm md:text-lg">***************</span>
            <ChangePasswordModal onSubmit={refetchUser} />
          </div>
        </div>
        <div className="flex justify-between items-center px-3 py-3 rounded-lg even:bg-card gap-2 lg:px-6 max-lg:flex-col max-lg:gap-3">
          <div className="flex flex-col justify-center items-start gap-1 lg:gap-3 max-lg:w-full">
            <span className="text-base md:text-xl">Log out</span>
            <span className="text-sm md:tetx-base text-gray-400">
              Ends current session, disconnecting user from account or system.
            </span>
          </div>
          <div className="max-lg:w-full max-lg:flex max-lg:justify-end items-center">
            <LogOutModal onSubmit={onLogOut} isButtonsDisabled={isLoggingOut} />
          </div>
        </div>
        <div className="flex justify-between items-center px-3 py-3 rounded-lg even:bg-card gap-2 lg:px-6 max-lg:flex-col max-lg:gap-3">
          <div className="flex flex-col justify-center items-start gap-1 lg:gap-3 max-lg:w-full">
            <span className="text-base md:text-xl">Delete account</span>
            <span className="text-sm md:tetx-base text-gray-400">
              Permanently remove your account and associated data, disabling
              access and erasing personal information.
            </span>
          </div>
          <div className="max-lg:w-full max-lg:flex max-lg:justify-end items-center">
            <DeleteAccountModal
              onSubmit={onDeleteAccount}
              isButtonsDisabled={isDeletingAccount}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
