import {
  Sidebar,
  SidebarAvatar,
  SidebarDescription,
  SidebarHeader,
  SidebarItem,
  SidebarTitle,
} from "./Sidebar";
import { textAvatar } from "@/lib/utils";
import { Separator } from "../ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import {
  HelpCircleIcon,
  LogOutIcon,
  SettingsIcon,
  ShoppingBagIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useSearchParamsTools } from "@/lib/router";
import { useEffect, useState } from "react";
import { ModalSignInUpVariation } from "../SignInUpModal/ModalSignInUpVariation";

export const UserSidebar = ({
  isOpen,
  closeSidebar,
  user,
  categories,
}: {
  isOpen: boolean;
  closeSidebar: () => void;
  user?: { fullName: string; avatar: string };
  categories: { icon: React.ReactNode; title: string; url: string }[];
}) => {
  const searchParams = useSearchParamsTools();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const isLoggedIn = !!user;

  const openLogInModal = () => {
    closeSidebar();
    searchParams.set("modal", "login");
    setIsModalOpen(true);
  };
  const openSignUpModal = () => {
    closeSidebar();
    searchParams.set("modal", "signup");
    setIsModalOpen(true);
  };
  const closeModal = () => {
    searchParams.set("modal", undefined);
    setIsModalOpen(false);
  };

  const headerData = {
    avatarImage: isLoggedIn ? user.avatar : "",
    avatarFallback: isLoggedIn ? textAvatar(user.fullName) : "?",
    title: isLoggedIn ? user.fullName : "Not signed in",
    description: isLoggedIn
      ? "Customer"
      : "Log in to enjoy a more pleasant experience",
  };

  return (
    <div>
      <Sidebar isOpen={isOpen} closeModal={closeSidebar}>
        <SidebarHeader>
          <SidebarAvatar
            image={headerData.avatarImage}
            fallback={headerData.avatarFallback}
          />
          <div>
            <SidebarTitle>{headerData.title}</SidebarTitle>
            <SidebarDescription>{headerData.description}</SidebarDescription>
          </div>
          {!isLoggedIn && (
            <div className="flex flex-col gap-2 pt-2 lg:pt-4">
              <Button onClick={openSignUpModal}>Sign up</Button>
              <Button onClick={openLogInModal} variant={"secondary"}>
                Log in
              </Button>
            </div>
          )}
        </SidebarHeader>
        <Separator />
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1" className="border-none">
            <AccordionTrigger className="py-3 lg:data-[state=open]:pb-4">
              <SidebarItem icon={<ShoppingBagIcon />} text="Product catalog" />
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-3 lg:gap-4">
              {categories.map((item) => (
                <Link
                  className="w-full"
                  href={item.url}
                  key={item.title}
                  onClick={closeSidebar}
                >
                  <SidebarItem icon={item.icon} text={item.title} />
                </Link>
              ))}
              <Button variant={"outline"}>See all</Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Separator />
        <div className="flex flex-col gap-3 lg;gap-4">
          {isLoggedIn && (
            <Link href={"/profile/settings"}>
              <SidebarItem icon={<SettingsIcon />} text="Settings" />
            </Link>
          )}
          <Link href={"/help"}>
            <SidebarItem icon={<HelpCircleIcon />} text="Help & FAQ" />
          </Link>
        </div>
        {isLoggedIn && (
          <>
            <Separator />
            <button>
              <SidebarItem icon={<LogOutIcon />} text="Log out" />
            </button>
          </>
        )}
      </Sidebar>
      {!isLoggedIn && isModalOpen && (
        <ModalSignInUpVariation onClose={closeModal} />
      )}
    </div>
  );
};
