import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { ChangeEmailModal, ChangeNameModal, ChangePasswordModal, DeleteAccountModal, LogOutModal } from "./Popups/SettingsModals";

export const AccountSettings = ({
  user,
} : {
  user: { fullName: string; avatar: string, email: string, };
}) => {
  
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl md:text-3xl max-md:w-full text-left">Account settings</h1>
      <Separator />
      <div className="w-full flex flex-col py-4 md:py-6">
        <div className="flex justify-between items-center px-3 py-3 rounded-lg even:bg-gray-100 
                        md:px-6 max-md:flex-col max-md:justify-center max-md:items-stretch max-md:gap-4">
          <div className="flex flex-col justify-center items-start md:gap-3 gap-1">
            <span className="md:text-xl text-base">Profile photo</span>
            <span className="md:tetx-base text-sm text-gray-400">Change your profile picture.</span>
          </div>
          <div className="max-md:w-full max-md:flex max-md:justify-end items-center">
            <Button variant={"outline"} className="md:text-base text-sm">Change photo</Button>
          </div>
        </div>
        <div className="flex justify-between items-center px-3 py-3 rounded-lg even:bg-gray-100 md:px-6 max-md:flex-col max-md:gap-4">
          <div className="flex flex-col justify-center items-start md:gap-3 gap-1 max-md:w-full">
            <span className="md:text-xl text-base">First name and last name</span>
            <span className="md:tetx-base text-sm text-gray-400">Update your first and last name for your profile where it&apos;s displayed.</span>
          </div>
          <div className="flex justify-center items-center md:gap-6 gap-2 max-md:w-full max-md:flex-col max-md:justify-end max-md:items-end ">
            <span className="md:text-lg text-sm">{user.fullName}</span>
            <ChangeNameModal />
          </div>
        </div>
        <div className="flex justify-between items-center px-3 py-3 rounded-lg even:bg-gray-100 md:px-6 max-md:flex-col max-md:gap-4">
          <div className="flex flex-col justify-center items-start md:gap-3 gap-1 max-md:w-full">
            <span className="md:text-xl text-base">Email</span>
            <span className="md:tetx-base text-sm text-gray-400">Update the email address associated with your account.</span>
          </div>
          <div className="flex justify-center items-center md:gap-6 gap-2 max-md:w-full max-md:flex-col max-justify-end max-md:items-end ">
            <span className="md:text-lg text-sm">{user.email}</span>
            <ChangeEmailModal email={user.email} />
          </div>
        </div>
        <div className="flex justify-between items-center px-3 py-3 rounded-lg even:bg-gray-100 md:px-6 max-md:flex-col max-md:gap-4">
          <div className="flex flex-col justify-center items-start md:gap-3 gap-1 max-md:w-full">
            <span className="md:text-xl text-base">Password</span>
            <span className="md:tetx-base text-sm text-gray-400">Change your account&apos;s password.</span>
          </div>
          <div className="flex justify-center items-center md:gap-6 gap-2 max-md:w-full max-md:flex-col max-md:justify-end max-md:items-end">
            <span className="md:text-lg text-sm">***************</span>
            <ChangePasswordModal />
          </div>
        </div>
        <div className="flex justify-between items-center px-3 py-3 rounded-lg even:bg-gray-100 md:px-6 max-md:flex-col max-md:gap-4">
          <div className="flex flex-col justify-center items-start md:gap-3 gap-1 max-md:w-full">
            <span className="md:text-xl text-base">Log out</span>
            <span className="md:tetx-base text-sm text-gray-400">Ends current session, disconnecting user from account or system.</span>
          </div>
          <div className="max-md:w-full max-md:flex max-md:justify-end items-center">
            <LogOutModal />
          </div>
        </div>
        <div className="flex justify-between items-center px-3 py-3 rounded-lg even:bg-gray-100 md:px-6 max-md:flex-col max-md:gap-4">
          <div className="flex flex-col justify-center items-start md:gap-3 gap-1 max-md:w-full">
            <span className="md:text-xl text-base">Delete account</span>
            <span className="md:tetx-base text-sm text-gray-400">Permanently remove your account and associated data, disabling access and erasing personal information.</span>
          </div>
          <div className="max-md:w-full max-md:flex max-md:justify-end items-center">
            <DeleteAccountModal />
          </div>
        </div>
      </div>
    </div>
  );
};