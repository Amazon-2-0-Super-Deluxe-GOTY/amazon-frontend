"use client";
import * as React from "react";
import Link from "next/link";
import {
  BellIcon,
  HeartIcon,
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
  UserIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { useScreenSize } from "@/lib/media";

export function Header() {
  const isMobile = useScreenSize({ maxSize: "sm" });

  return (
    <header className="px-4 py-4 border-b">
      <div className="max-w-[1600px] flex items-center justify-between w-full mx-auto">
        <div className="flex items-center space-x-4">
          <MenuIcon className="text-gray-700" />
          <Link href={"/"}>
            <span className="font-bold text-xl">Logo</span>
          </Link>
        </div>
        <div className="flex-1 flex max-w-[950px] relative ml-5 lg:mx-auto">
          <Input placeholder="Search..." />
          <Button
            className="rounded-s-none px-2 absolute top-1/2 -translate-y-1/2 right-2 pointer-events-none lg:px-4 lg:inline-flex lg:right-0 lg:pointer-events-auto"
            variant={isMobile ? "ghost" : "default"}
          >
            <SearchIcon />
          </Button>
        </div>
        <div className="flex items-center space-x-4">
          <HeartIcon className="text-gray-700 hidden md:block" />
          <BellIcon className="text-gray-700 hidden md:block" />
          <UserIcon className="text-gray-700 hidden md:block" />
          <ShoppingCartIcon className="text-gray-700" />
        </div>
      </div>
    </header>
  );
}
