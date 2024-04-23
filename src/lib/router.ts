import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useSearchParamsTools = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const set = (name: string, value?: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (!value) {
      current.delete(name);
    } else {
      current.set(name, value);
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.replace(`${pathname}${query}`, { scroll: false });
  };

  return {
    get: searchParams.get.bind(searchParams),
    set,
    params: searchParams,
  };
};
