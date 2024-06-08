"use client";
import * as React from "react";
import Link from "next/link";
import { MenuIcon, UserIcon } from "lucide-react";
import { AdminSidebar } from "./AdminSidebar";
import { useUser } from "@/api/users";

export function Header() {
  const { user } = useUser();
  const [isSidebarOpen, setIsSedebarOpen] = React.useState(false);

  const openSidebar = () => setIsSedebarOpen(true);
  const closeSidebar = () => setIsSedebarOpen(false);

  return (
    <header className="px-4 py-4 border-b">
      <div className="max-w-[1600px] flex items-center justify-between w-full mx-auto">
        <div className="flex items-center space-x-4">
          <button onClick={openSidebar}>
            <MenuIcon className="text-gray-700" />
          </button>
          <Link href={"/"}>
            <span className="font-bold text-xl">Logo</span>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <UserIcon className="text-gray-700 hidden md:block" />
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
