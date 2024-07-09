import type { Metadata } from "next";
import "../globals.css";

import { Header } from "@/components/Shared/Header";
import { Footer } from "@/components/Shared/Footer";
import ScrollToTopButton from "@/components/Shared/ScrollToTopButton";

export const metadata: Metadata = {
  title: "Perry",
  description: "Best online marketplace",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="grow w-full max-w-[1600px] mx-auto">{children}</div>
      <Footer />
      <ScrollToTopButton />
    </>
  );
}
