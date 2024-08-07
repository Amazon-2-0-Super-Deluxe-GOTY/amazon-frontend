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
import Link from "next/link";
import type { User } from "@/api/types";
import { useAuthStore } from "@/lib/storage";
import { logOut } from "@/api/users";
import { useRouter } from "next/navigation";
import {
  CategoryIcon,
  ExitIcon,
  OrdersIcon,
  ProductsIcon,
  ReviewsIcon,
  UsersIcon,
} from "../Shared/Icons";

const links = [
  {
    title: "Users",
    url: "/admin/users",
    icon: <UsersIcon />,
  },
  {
    title: "Category",
    url: "/admin/categories",
    icon: <CategoryIcon />,
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: <ProductsIcon />,
  },
  {
    title: "Orders",
    url: "/admin/orders",
    icon: <OrdersIcon />,
  },
  {
    title: "Reviews",
    url: "/admin/reviews",
    icon: <ReviewsIcon />,
  },
];

export const AdminSidebar = ({
  isOpen,
  closeSidebar,
  user,
}: {
  isOpen: boolean;
  closeSidebar: () => void;
  user?: User | null;
}) => {
  const router = useRouter();
  const clearToken = useAuthStore((state) => state.clearToken);
  const fullName = `${user?.firstName} ${user?.lastName}`;

  const onLogOut = () => {
    logOut()
      .then(clearToken)
      .then(() => router.push("/admin"))
      .then(closeSidebar);
  };

  return (
    <div>
      <Sidebar isOpen={isOpen} closeModal={closeSidebar}>
        <SidebarHeader>
          <SidebarAvatar image={user?.avatarUrl} />
          <div>
            <SidebarTitle>{fullName}</SidebarTitle>
            <SidebarDescription>Administrator</SidebarDescription>
          </div>
        </SidebarHeader>
        <Separator />
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
        <Separator />
        <button onClick={onLogOut}>
          <SidebarItem icon={<ExitIcon />} text="Log out" />
        </button>
      </Sidebar>
    </div>
  );
};
