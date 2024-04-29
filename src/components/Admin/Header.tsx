import * as React from "react";
import Link from "next/link";
import { MenuIcon, UserIcon } from "lucide-react";

export function Header() {
  return (
    <header className="px-4 py-4 border-b">
      <div className="max-w-[1600px] flex items-center justify-between w-full mx-auto">
        <div className="flex items-center space-x-4">
          <button>
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
    </header>
  );
}
