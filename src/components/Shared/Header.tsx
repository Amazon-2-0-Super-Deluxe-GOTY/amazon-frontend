"use client";
import * as React from "react";
import Link from "next/link";
import {
  ArmchairIcon,
  HomeIcon,
  MonitorIcon,
  ShirtIcon,
  WrenchIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { UserSidebar } from "./UserSidebar";
import { ShoppingCart } from "../ShoppingCart/ShoppingCart";
import { MenuIcon, SearchIcon, UserIcon } from "./Icons";
import { Logo } from "./Logo";

const sidebarData = {
  // user: { fullName: "Marsha Shields", avatar: "" },
  categories: [
    {
      icon: <ShirtIcon />,
      title: "Fashion",
      url: "/category/fashion",
    },
    {
      icon: <MonitorIcon />,
      title: "Electronics",
      url: "/category/electronics",
    },
    {
      icon: <HomeIcon />,
      title: "Household",
      url: "/category/household",
    },
    {
      icon: <ArmchairIcon />,
      title: "Furniture",
      url: "/category/furniture",
    },
    {
      icon: <WrenchIcon />,
      title: "Work tools",
      url: "/category/work-tools",
    },
  ],
};

export function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <header className="px-4 py-4 border-b bg-secondary text-light">
      <div className="max-w-[1600px] flex items-center justify-between w-full mx-auto">
        <div className="flex items-center gap-8">
          <button onClick={openSidebar}>
            <MenuIcon className="stroke-3" />
          </button>
          <Link href={"/"} className="hidden lg:block">
            <Logo />
          </Link>
        </div>
        <div className="flex-1 flex relative mx-8 z-0 rounded-lg border-2 border-transparent has-[:focus]:border-foreground overflow-hidden">
          <Input
            placeholder="Search..."
            className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button className="rounded-s-none px-2 absolute top-1/2 -translate-y-1/2 right-0 pointer-events-none lg:px-4 lg:inline-flex lg:right-0 lg:pointer-events-auto">
            <SearchIcon className="stroke-3" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          {/* designer moment 🤡 */}
          <Link href={"/account/?tab=settings-open"} className="p-4">
            <UserIcon className="hidden md:block stroke-3 [&_:nth-child(1)]:stroke-1 w-8 h-8" />
          </Link>
          <ShoppingCart />
        </div>
      </div>
      <UserSidebar
        isOpen={isSidebarOpen}
        closeSidebar={closeSidebar}
        {...sidebarData}
      />
    </header>
  );
}
