import Image from "next/image";
import { AvatarFallback } from "../ui/avatar";
import { cn } from "@/lib/utils";
import noAvatar from "@/../public/Icons/no-avatar.svg";

export const AvatarDefaultFallback = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof AvatarFallback>) => (
  <AvatarFallback {...props} className={cn("relative", className)}>
    <Image
      className="object-cover w-full h-full"
      width={80}
      height={80}
      alt="No Avatar"
      src={noAvatar.src}
    />
  </AvatarFallback>
);
