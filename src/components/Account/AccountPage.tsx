"use client";
import React from "react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useSearchParamsTools } from "@/lib/router";
import Link from "next/link";
import { Slash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { AccountSettings } from "@/components/Account/AccountSettings";
import { Wishlist } from "@/components/Account/Wishlist";
import { MyOrders } from "@/components/Account/MyOrders";
import { User } from "@/api/types";
import { useUser } from "@/api/users";
import { AvatarDefaultFallback } from "../Shared/AvatarDefaultFallback";
import { ChevronLeftIcon, HomeIcon } from "../Shared/Icons";
import clsx from "clsx";

export function AccountPage({ user: initialUser }: { user: User }) {
  const [user, setUser] = useState(initialUser);
  const userData = useUser({ initialData: initialUser });
  const param = useSearchParamsTools();

  const userFullName = `${user.firstName} ${user.lastName}`;
  const tabFromParams = param.get?.("tab");

  const [isOpenTab, setIsOpenTab] = useState<boolean>(() => {
    const defaultValue = param.get?.("tab");
    if (defaultValue) {
      const value = defaultValue.split("-")[1];
      if (value && value === "open") return true;
    }
    return false;
  });

  const [accountTab, setAccountTab] = useState<string>(() => {
    const defaultValue = param.get?.("tab");
    if (defaultValue) {
      const value = defaultValue.split("-")[0];
      if (value) return value;
    }
    return "";
  });

  const onChangeAccountTab = (name: string) => {
    setAccountTab(name);
    setIsOpenTab(true);
  };

  const onBack = () => {
    setIsOpenTab(false);
  };

  useEffect(() => {
    param.set("tab", accountTab + "-" + (isOpenTab ? "open" : "switch"));
  }, [onChangeAccountTab, onBack]);

  useEffect(() => {
    if (userData.user) {
      setUser(userData.user);
    }
  }, [userData.user]);

  return (
    <main className="flex flex-col items-center w-full px-4">
      <section
        className={cn(
          "w-full flex items-left gap-1",
          isOpenTab && "max-md:hidden"
        )}
      >
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">
                  <HomeIcon size={24} />
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
      <section className="w-full md:pt-5">
        <div className="grid md:grid-cols-[0.5fr_min-content_1fr_1fr] gap-6 w-full p-1 h-full">
          <aside
            className={cn(
              "flex flex-col gap-6 sticky h-max py-6 px-4 min-h-[582px]",
              isOpenTab && "max-md:hidden"
            )}
          >
            <div className="flex gap-4">
              <AvatarNameBlock image={user.avatarUrl} />
              <div className="flex flex-col">
                <span className="text-lg lg:text-xl font-semibold">
                  {userFullName}
                </span>
                <span className="text-sm sm:text-base font-light">
                  Customer
                </span>
              </div>
            </div>
            <button
              onClick={() => onChangeAccountTab("orders")}
              className={clsx(
                "flex justify-start font-normal text-base px-6 py-4 rounded-sm",
                accountTab === "orders" && "lg:bg-tertiary-hover"
              )}
            >
              My orders
            </button>
            <button
              onClick={() => onChangeAccountTab("wishlist")}
              className={clsx(
                "flex justify-start font-normal text-base px-6 py-4 rounded-sm",
                accountTab === "wishlist" && "lg:bg-tertiary-hover"
              )}
            >
              Wishlist
            </button>
            <button
              onClick={() => onChangeAccountTab("settings")}
              className={clsx(
                "flex justify-start font-normal text-base px-6 py-4 rounded-sm",
                accountTab === "settings" && "lg:bg-tertiary-hover"
              )}
            >
              Account settings
            </button>
          </aside>
          <Separator orientation="vertical" className="hidden md:block" />
          <div
            className={cn(
              "col-span-2 relative md:block",
              !isOpenTab && "max-md:hidden"
            )}
          >
            <div>
              <button
                className="flex items-center gap-2 mb-3 md:hidden"
                onClick={onBack}
              >
                <ChevronLeftIcon className="w-6 h-6 text-secondary" />
                <span className="text-base">Back</span>
              </button>
              {(() => {
                switch (accountTab) {
                  case "settings":
                    return (
                      <AccountSettings
                        user={user}
                        refetchUser={userData.refetch}
                      />
                    );
                  case "wishlist":
                    return <Wishlist />;
                  case "orders":
                    return <MyOrders />;
                  default:
                    return null;
                }
              })()}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

const AvatarNameBlock = ({ image }: { image?: string }) => {
  return (
    <Avatar
      className="w-14 h-14"
      style={{ boxShadow: "0px 0px 16px 0px hsla(216, 75%, 26%, 0.25)" }}
    >
      <AvatarImage src={image} />
      <AvatarDefaultFallback />
    </Avatar>
  );
};
