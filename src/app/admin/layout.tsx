import type { Metadata } from "next";
import "../globals.css";
import { Header } from "@/components/Admin/Header";
import { ModalProvider } from "@/components/Admin/Modal";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
        <ModalProvider>{children}</ModalProvider>
      </main>
    </>
  );
}
