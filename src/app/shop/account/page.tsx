"use server";
import { getUserProfileServer } from "@/api/server";
import { AccountPage } from "@/components/Account/AccountPage";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function Page() {
  const queryClient = new QueryClient();
  const token = cookies().get("jwt")?.value;

  if (!token) {
    return redirect("/");
  }

  const data = await queryClient.fetchQuery({
    queryKey: ["user", token],
    queryFn: () => getUserProfileServer(token),
  });

  if (data.status !== 200) {
    return redirect("/");
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AccountPage user={data.data} />
    </HydrationBoundary>
  );
}
