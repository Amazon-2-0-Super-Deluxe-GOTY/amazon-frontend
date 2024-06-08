import {
  Sidebar,
  SidebarAvatar,
  SidebarDescription,
  SidebarHeader,
  SidebarItem,
  SidebarTitle,
} from "@/components/Shared/Sidebar";
import { textAvatar } from "@/lib/utils";
import { Separator } from "../ui/separator";
import {
  BarChart3Icon,
  BoxIcon,
  LogOutIcon,
  ScrollTextIcon,
  ShoppingBagIcon,
  UsersRoundIcon,
} from "lucide-react";
import Link from "next/link";
import type { User } from "@/api/types";

const links = [
  {
    title: "Users",
    url: "/users",
    icon: <UsersRoundIcon />,
  },
  {
    title: "Category",
    url: "/categories",
    icon: <ScrollTextIcon />,
  },
  {
    title: "Products",
    url: "/products",
    icon: <ShoppingBagIcon />,
  },
  {
    title: "Orders",
    url: "/orders",
    icon: <BoxIcon />,
  },
  {
    title: "Reviews",
    url: "/reviews",
    icon: <BarChart3Icon />,
  },
];

export const AdminSidebar = ({
  isOpen,
  closeSidebar,
  user,
}: {
  isOpen: boolean;
  closeSidebar: () => void;
  user?: User;
}) => {
  const fullName = `${user?.firstName} ${user?.lastName}`;

  return (
    <div>
      <Sidebar isOpen={isOpen} closeModal={closeSidebar}>
        <SidebarHeader>
          <SidebarAvatar
            image={user?.avatarUrl}
            fallback={textAvatar(fullName)}
          />
          <div>
            <SidebarTitle>{fullName}</SidebarTitle>
            <SidebarDescription>Administrator</SidebarDescription>
          </div>
        </SidebarHeader>
        <Separator className="bg-black" />
        <div className="flex flex-col gap-3 lg:gap-4">
          {links.map((item) => (
            <Link
              className="w-full"
              href={item.url}
              key={item.title}
              onClick={closeSidebar}
            >
              <SidebarItem icon={item.icon} text={item.title} />
            </Link>
          ))}
        </div>
        <Separator className="bg-black" />
        <button>
          <SidebarItem icon={<LogOutIcon />} text="Log out" />
        </button>
      </Sidebar>
    </div>
  );
};
