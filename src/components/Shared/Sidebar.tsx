import { useScreenSize } from "@/lib/media";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { ChevronsLeftIcon, XIcon } from "lucide-react";

export const Sidebar = ({
  isOpen,
  closeModal,
  children,
}: {
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}) => {
  const isDesktop = useScreenSize({ minSize: "lg" });

  const onOpenChange = (value: boolean) => {
    if (!value) closeModal();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent
        side={"left"}
        hideClose={isDesktop}
        className="w-full space-y-4 lg:space-y-6"
      >
        {children}
        {isDesktop && isOpen && (
          <SheetClose className="absolute -right-16 top-0  w-10 h-10 bg-white rounded-full flex justify-center items-center">
            <ChevronsLeftIcon />
            <span className="sr-only">Close</span>
          </SheetClose>
        )}
      </SheetContent>
    </Sheet>
  );
};

export const SidebarHeader = ({ children }: { children: React.ReactNode }) => {
  return <SheetHeader className="gap-2 text-start">{children}</SheetHeader>;
};

export const SidebarTitle = ({ children }: { children: string }) => {
  return <SheetTitle className="text-base lg:text-lg">{children}</SheetTitle>;
};

export const SidebarDescription = ({ children }: { children: string }) => {
  return (
    <SheetDescription className="text-xs sm:text-sm">
      {children}
    </SheetDescription>
  );
};

export const SidebarAvatar = ({
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

export const SidebarItem = ({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) => {
  return (
    <div className="flex items-center gap-2">
      <figure className="w-6 h-6 [&>svg]:w-full [&>svg]:h-full">{icon}</figure>
      <p className="text-sm lg:text-base">{text}</p>
    </div>
  );
};
