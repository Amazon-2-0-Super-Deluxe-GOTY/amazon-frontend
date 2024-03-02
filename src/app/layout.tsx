import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const mulish = Mulish({ subsets: ["latin"] });

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
    <html lang="en">
      <Providers>
        <body className={mulish.className}>{children}</body>
      </Providers>
    </html>
  );
}
