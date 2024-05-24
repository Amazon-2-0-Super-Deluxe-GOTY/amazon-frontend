import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export const AccountSettings = ({
  user,

} : {
  user: { fullName: string; avatar: string, email: string, };

}) => {
  
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-3xl">Account settings</h1>
      <Separator />
      <div className="w-full flex flex-col py-6">
        <div className="flex justify-between items-center px-6 py-3 rounded-lg even:bg-gray-100">
          <div className="flex flex-col justify-center items-start gap-3">
            <span className="text-xl">Profile photo</span>
            <span className="tetx-base text-gray-400">Change your profile picture.</span>
          </div>
          <Button variant={"outline"} className="text-base">Change photo</Button>
        </div>
        <div className="flex justify-between items-center px-6 py-3 rounded-lg even:bg-gray-100">
          <div className="flex flex-col justify-center items-start gap-3">
            <span className="text-xl">First name and last name</span>
            <span className="tetx-base text-gray-400">Update your first and last name for your profile where it&apos;s displayed.</span>
          </div>
          <div className="flex justify-center items-center gap-6">
            <span className="text-lg">{user.fullName}</span>
            <Button variant={"outline"} className="text-base">Change name</Button>
          </div>
        </div>
        <div className="flex justify-between items-center px-6 py-3 rounded-lg even:bg-gray-100">
          <div className="flex flex-col justify-center items-start gap-3">
            <span className="text-xl">Email</span>
            <span className="tetx-base text-gray-400">Update the email address associated with your account.</span>
          </div>
          <div className="flex justify-center items-center gap-6">
            <span className="text-lg">{user.email}</span>
            <Button variant={"outline"} className="text-base">Change email</Button>
          </div>
        </div>
        <div className="flex justify-between items-center px-6 py-3 rounded-lg even:bg-gray-100">
          <div className="flex flex-col justify-center items-start gap-3">
            <span className="text-xl">Password</span>
            <span className="tetx-base text-gray-400">Change your account&apos;s password.</span>
          </div>
          <div className="flex justify-center items-center gap-6">
            <span className="text-lg">***************</span>
            <Button variant={"outline"} className="text-base">Change password</Button>
          </div>
        </div>
        <div className="flex justify-between items-center px-6 py-3 rounded-lg even:bg-gray-100">
          <div className="flex flex-col justify-center items-start gap-3">
            <span className="text-xl">Log out</span>
            <span className="tetx-base text-gray-400">Ends current session, disconnecting user from account or system.</span>
          </div>
          <Button variant={"outline"} className="text-base">Log out</Button>
        </div>
        <div className="flex justify-between items-center px-6 py-3 rounded-lg even:bg-gray-100">
          <div className="flex flex-col justify-center items-start gap-3">
            <span className="text-xl">Delete account</span>
            <span className="tetx-base text-gray-400">Permanently remove your account and associated data, disabling access and erasing personal information.</span>
          </div>
          <Button variant={"destructive"} className="text-base">Delete</Button>
        </div>
      </div>
    </div>
  );
};