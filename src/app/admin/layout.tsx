import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Perry",
  description: "Perry admin panel",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
