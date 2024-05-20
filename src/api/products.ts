export interface Product {
  id: string;
  name: string;
  images: string[];
  price: number;
  discountPrice?: number;
  rating: number;
}

export interface ProductShort {
  id: string;
  name: string;
  images: string[];
  price: number;
  discountPrice?: number;
  rating: number;
}

const defaultPageSize = "7";

export function getProductsShort({
  categoryId,
  searchQuery,
  page,
  pageSize,
}: {
  categoryId: string;
  searchQuery?: string;
  page?: number;
  pageSize?: number;
}): Promise<{ data: ProductShort[]; count: { pageCount: number } }> {
  const params = new URLSearchParams();
  params.set("categoryId", categoryId);
  searchQuery && params.set("searchQuery", searchQuery);
  params.set("page", page ? page.toString() : "1");
  params.set("pageSize", pageSize ? pageSize.toString() : defaultPageSize);

  return fetch(`/api/admin/products/short?${params.toString()}`).then((r) =>
    r.json()
  );
}

export function uploadImage(
  files: File[]
): Promise<{ id: string; imageUrl: string }[]> {
  const data = new FormData();

  for (const file of files) {
    data.append("files[]", file, file.name);
  }

  return fetch("/api/admin/upload", {
    method: "POST",
    body: data,
  }).then((r) => r.json());
}