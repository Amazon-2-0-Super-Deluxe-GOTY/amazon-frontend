"use client"
import React from "react";
import { useState, useEffect } from "react";

import { cn, textAvatar } from "@/lib/utils";
import { useSearchParamsTools } from "@/lib/router";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Slash, XIcon } from "lucide-react";

import HouseLine from "@/../public/Icons/HouseLine.svg";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { MediaQueryCSS } from "@/components/Shared/MediaQuery";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import clsx from "clsx";
import { Separator } from "@/components/ui/separator";
import { AccountSettings } from "@/components/Account/AccountSettings";
import { Wishlist } from "@/components/Account/Wishlist";
import { MyOrders } from "@/components/Account/MyOrders";
import { useScreenSize } from "@/lib/media";

export default function AccountPage(
  // { user, }: { user?: { fullName: string; avatar: string }; }*
) {
  const user = { avatar: "user", fullName: "Qwert Aswdesh", email: "qwerty11@gmail.com", };
  // const isLoggedIn = !!user;
  const isLoggedIn = true;
  const headerData = {
    avatarImage: isLoggedIn ? user.avatar : "",
    avatarFallback: isLoggedIn ? textAvatar(user.fullName) : "?",
    title: isLoggedIn ? user.fullName : "Not signed in",
    description: isLoggedIn
      ? "Customer"
      : "Log in to enjoy a more pleasant experience",
  };

  const isDesktop = useScreenSize({minSize: "md"});
  const [isOpenTab, setIsOpenTab] = useState<boolean>(false);

  const [accountTab, setAccountTab] = useState<string>("");
  const onChangeAccountTab = (name:string) => {
    setAccountTab(name);
  };

  const onBack = () => {
    setAccountTab("");
  }

  useEffect(() => {
    if(!isDesktop && accountTab.length !== 0)
      setIsOpenTab(true);
    else if(!isDesktop)
      setIsOpenTab(false);
  }, [accountTab]);

  useEffect(() => {
    if(isDesktop) {
      setIsOpenTab(false);
      setAccountTab("");
    } 
  }, [isDesktop]);


  console.log(isDesktop);
  console.log(accountTab);

  return (
    <main className="flex flex-col items-center w-full px-4">
      <section className={cn("w-full flex items-left gap-1", isOpenTab && "hidden")}>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">
                  <Image src={HouseLine} width={24} height={24} alt="Home" />
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/account">Account</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>
      <section className="w-full pt-6">
        <div className="grid md:grid-cols-[0.5fr_min-content_1fr_1fr] gap-6 w-full p-1 h-full">
          <aside className={cn("flex flex-col gap-6 sticky h-max py-6 px-4", isOpenTab && "hidden")}>
            <div className="flex gap-4">
              <AvatarNameBlock
                image={headerData.avatarImage}
                fallback={headerData.avatarFallback}
              />
              <div className="flex flex-col">
                <span className="text-lg lg:text-xl font-semibold">{headerData.title}</span>
                <span className="text-sm sm:text-base font-light">{headerData.description}</span>
              </div>
            </div>
            <Button 
              variant={"ghost"} 
              onClick={() => onChangeAccountTab("orders")}
              className="flex justify-start font-normal text-base"
            >My orders</Button>
            <Button 
              variant={"ghost"} 
              onClick={() => onChangeAccountTab("wishlist")}
              className="flex justify-start font-normal text-base"
            >Wishlist</Button>
            <Button 
              variant={"ghost"} 
              onClick={() => onChangeAccountTab("settings")}
              className="flex justify-start font-normal text-base"
            >Account settings</Button>
          </aside>
          <Separator orientation="vertical" className="hidden md:block" />
          <div className={cn("col-span-2 relative md:block", !isOpenTab && "hidden")}>
            <div>
            {!isDesktop && <Button variant={"ghost"} className="pl-2" onClick={onBack} >
              <ChevronLeft />
              <span className="text-base">Back</span>
            </Button>}
            {(() => {
              switch (accountTab) {
                default:
                case "settings":
                  return <AccountSettings user={user} />;
                case "wishlist":
                  return <Wishlist />;
                case "orders":
                  return <MyOrders />;

              }
            })()}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

const AvatarNameBlock = ({
  image,
  fallback,
}: {
  image: string;
  fallback: string;
}) => {
  return (
    <Avatar className="w-12 h-12">
      <AvatarImage src={image} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
};
