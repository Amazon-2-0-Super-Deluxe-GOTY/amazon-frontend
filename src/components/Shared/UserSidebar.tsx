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
import { SignInUpButtons } from "../SignInUpModal/SignInUpModals";
import { logOut, useUser } from "@/api/users";
import { useAuthStore } from "@/lib/storage";
import { useRouter } from "next/navigation";

export const UserSidebar = ({
  isOpen,
  closeSidebar,
  categories,
}: {
  isOpen: boolean;
  closeSidebar: () => void;
  categories: { icon: React.ReactNode; title: string; url: string }[];
}) => {
  const router = useRouter();
  const { user } = useUser();
  const isLoggedIn = !!user;
  const fullName = `${user?.firstName} ${user?.lastName}`;
  const clearToken = useAuthStore((state) => state.clearToken);

  const headerData = {
    avatarImage: user?.avatarUrl ?? "",
    avatarFallback: isLoggedIn ? textAvatar(fullName) : "?",
    title: isLoggedIn ? fullName : "Not signed in",
    description: isLoggedIn
      ? "Customer"
      : "Log in to enjoy a more pleasant experience",
  };

  const onLogOut = () => {
    logOut()
      .then(clearToken)
      .then(() => router.push("/"));
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
              <SignInUpButtons variant="sidebar" />
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
              <Button variant={"secondary"}>See all</Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Separator />
        <div className="flex flex-col gap-3 lg;gap-4">
          {isLoggedIn && (
            <Link href={"/account?tab=settings-open"}>
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
            <button onClick={onLogOut}>
              <SidebarItem icon={<LogOutIcon />} text="Log out" />
            </button>
          </>
        )}
      </Sidebar>
    </div>
  );
};
