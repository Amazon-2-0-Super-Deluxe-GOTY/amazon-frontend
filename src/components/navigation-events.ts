"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouterEvents } from "@/store/events";

export function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const routerEvents = useRouterEvents();

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    routerEvents.emit("change", url);
  }, [pathname, searchParams]);

  return null;
}
