import type { Metadata } from "next";
import { Header } from "@/components/Admin/Header";

export const metadata: Metadata = {
  title: "Admin | Perry",
  description: "Perry admin panel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="grow w-full px-4 max-w-[1600px] mx-auto flex flex-col pb-5 lg:pb-10">
        {children}
      </main>
    </>
  );
}
