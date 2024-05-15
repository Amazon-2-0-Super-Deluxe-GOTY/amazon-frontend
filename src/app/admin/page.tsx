import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      <Link href={"/categories"} className="text-blue-700 underline">
        Categories page
      </Link>
      <Link href={"/users"} className="text-blue-700 underline">
        Users page
      </Link>
    </div>
  );
}
