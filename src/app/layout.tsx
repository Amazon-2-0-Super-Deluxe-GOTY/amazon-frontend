import "./globals.css";
import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import Providers from "./providers";
import { Suspense } from "react";

const mulish = Mulish({
  subsets: ["latin"],
  // weight: ["400", "500", "600", "700"],
});

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
    <html lang="en" className="scroll-smooth">
      <Providers>
        <body
          className={`${mulish.className} min-h-screen flex flex-col gap-5 lg:gap-10`}
        >
          <Suspense fallback={null}>{children}</Suspense>
        </body>
      </Providers>
    </html>
  );
}
