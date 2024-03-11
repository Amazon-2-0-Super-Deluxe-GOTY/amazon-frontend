import * as React from "react";
import {
    BellIcon,
    HeartIcon,
    MenuIcon,
    ShoppingCartIcon,
    UserIcon,
  } from "lucide-react";
import { Input } from "@/components/ui/input";

export function Header() {
  return (
    <header className="flex justify-center items-center px-2 py-4 border-b w-full">
        <div className="max-w-screen-xl flex items-center justify-between w-full">
        <div className="flex items-center space-x-4">
            <MenuIcon className="text-gray-700" />
            <span className="font-bold text-xl">Logo</span>
        </div>
        <div className="flex-1 mx-4">
            <Input placeholder="Search..." />
        </div>
        <div className="flex items-center space-x-4">
            <HeartIcon className="text-gray-700" />
            <BellIcon className="text-gray-700" />
            <UserIcon className="text-gray-700" />
            <ShoppingCartIcon className="text-gray-700" />
        </div>
        </div>
    </header>
  );
}
