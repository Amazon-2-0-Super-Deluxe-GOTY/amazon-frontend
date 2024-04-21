import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "../globals.css";
import Providers from "../providers";

const mulish = Mulish({
  subsets: ["latin"],
  // weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}