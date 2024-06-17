"use client";
import * as React from "react";
import { AdminSidebar } from "./AdminSidebar";
import { useUser } from "@/api/users";
import { Logo } from "../Shared/Logo";
import { MenuIcon, UserIcon } from "../Shared/Icons";

export function Header() {
  const { user } = useUser();
  const [isSidebarOpen, setIsSedebarOpen] = React.useState(false);

  const openSidebar = () => setIsSedebarOpen(true);
  const closeSidebar = () => setIsSedebarOpen(false);

  return (
    <header className="px-4 py-4 border-b bg-secondary text-light">
      <div className="max-w-[1600px] flex items-center justify-between w-full mx-auto">
        <div className="flex items-center space-x-4">
          <button onClick={openSidebar}>
            <MenuIcon className="stroke-3" />
          </button>
          <Logo />
        </div>
        <div className="flex items-center space-x-4">
          <UserIcon className="w-8 h-8 stroke-3 [&_:nth-child(1)]:stroke-1 hidden md:block" />
        </div>
      </div>
      <AdminSidebar
        isOpen={isSidebarOpen}
        closeSidebar={closeSidebar}
        user={user}
      />
    </header>
  );
}
