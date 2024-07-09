import { Header } from "@/components/Admin/Header";

export default function AdminLayout({
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
