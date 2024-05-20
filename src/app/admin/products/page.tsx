"use client";
import { getProductsShort, type ProductShort } from "@/api/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCallback, useMemo, useState } from "react";
import { getCategories, type Category } from "@/api/categories";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, PlusIcon, StarIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { ProductAsideCard } from "@/components/Admin/Product/ProductAsideCart";
import placeholder from "@/../public/Icons/placeholder.svg";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { splitPrice } from "@/lib/products";

import { TreeNodeType, createTreeArray } from "@/lib/checkboxTree";
import { useSearchParamsTools } from "@/lib/router";
import { Pagination } from "@/components/Shared/Pagination";
import { useDebounce } from "use-debounce";
import { CategorySelect } from "@/components/Admin/Category/CategorySelect";

export default function Page() {
  const searchParams = useSearchParamsTools();
  const [searchQuery, setSearchQuery] = useState(
    () => searchParams.get("searchQuery") ?? ""
  );
  const [page, setPage] = useState(() => {
    const pageFromUrl = searchParams.get("page");
    const pageNum = parseInt(pageFromUrl ?? "1");
    return isNaN(pageNum) ? 1 : pageNum;
  });
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [selectedProduct, setSelectedProduct] = useState<
    ProductShort | undefined
  >();
  const [defferedSearch] = useDebounce(searchQuery, 300);

  const fetchProducts = useCallback(async () => {
    if (!selectedCategory) return { data: [], count: { pageCount: 0 } };
    return getProductsShort({
      categoryId: selectedCategory.id,
      page,
      searchQuery: defferedSearch,
      pageSize: 7,
    });
  }, [selectedCategory, page, defferedSearch]);

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  const productsQuery = useQuery({
    queryKey: ["productsShort", selectedCategory?.id, page, defferedSearch],
    queryFn: fetchProducts,
  });

  function onSelectCategory(id: string) {
    const value = categoriesQuery.data?.data.find((c) => c.id === id);
    value && setSelectedCategory(value);
  }

  const changeSearchQuery = (value: string) => {
    setSearchQuery(value);
    searchParams.set("searchQuery", value);
    changePage(1);
  };
  const changePage = (value: number) => {
    setPage(value);
    searchParams.set("page", value.toString());
  };

  const tableHeader = (
    <div className="flex items-center gap-4 w-full">
      <div className="flex items-center gap-3 basis-1/3">
        <h2 className="font-medium">Category</h2>
        <CategorySelect
          categories={categoriesQuery.data?.data}
          value={selectedCategory?.id}
          onValueChange={onSelectCategory}
        />
      </div>
      <Input
        type="text"
        placeholder="Search..."
        className="basis-2/3"
        value={searchQuery}
        onChange={(e) => changeSearchQuery(e.target.value)}
      />
    </div>
  );

  const columns = useMemo<ColumnDef<ProductShort>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <div className="h-full flex items-center">
            <Checkbox
              size="lg"
              checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
              }
              onCheckedChange={(value) =>
                table.toggleAllPageRowsSelected(!!value)
              }
              aria-label="Select all"
            />
          </div>
        ),
        cell: ({ row }) => (
          <Checkbox
            size="lg"
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        header: ({ column }) => {
          return (
            <div className="flex items-center gap-3">
              Product name
              <button
                onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
                }
              >
                <ArrowUpDown className="h-4 w-4" />
              </button>
            </div>
          );
        },
        accessorKey: "name",
        cell: ({ row }) => {
          const product = row.original;
          return (
            <div className="flex items-center gap-3">
              <Image
                src={product.images[0]}
                alt="Product image"
                width={80}
                height={80}
                className="object-cover"
              />
              <p className="max-w-xs line-clamp-2 text-xl">{product.name}</p>
            </div>
          );
        },
      },
      {
        header: "Rating",
        accessorKey: "rating",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <StarIcon className="fill-black w-6 h-6" />
            <span className="text-xl">
              {parseFloat(row.getValue("rating")).toFixed(1)}
            </span>
          </div>
        ),
      },
      {
        header: "Price",
        accessorKey: "price",
        cell: ({ row }) => {
          const product = row.original;
          const price = splitPrice(product.price);
          const discountPrice = product.discountPrice
            ? splitPrice(product.discountPrice)
            : undefined;
          const firstPrice = discountPrice ?? price;
          const secondPrice = discountPrice ? price : undefined;

          return (
            <div className="flex items-center gap-3">
              <p className="text-xl">
                ${firstPrice.whole}
                <sup>{firstPrice.fraction}</sup>
              </p>
              {!!secondPrice && (
                <p className="text-base line-through text-gray-500">
                  ${secondPrice.whole}
                  <sup>{secondPrice.fraction}</sup>
                </p>
              )}
            </div>
          );
        },
      },
      {
        id: "actions",
        header: ({ table }) => {
          return (
            <button>
              <PlusIcon className="h-4 w-4" />
            </button>
          );
        },
      },
    ],
    []
  );

  return (
    <div className="grow flex flex-col lg:flex-row gap-4 lg:gap-6">
      <div className="lg:basis-2/3 flex flex-col gap-4 lg:gap-6">
        {selectedCategory ? (
          <DataTable
            data={productsQuery.data?.data ?? []}
            columns={columns}
            onRowClick={(row) => setSelectedProduct(row.original)}
            classNames={{
              row: (row) =>
                row.original.id === selectedProduct?.id
                  ? "bg-muted"
                  : "cursor-pointer",
            }}
            header={(table) => tableHeader}
            empty={
              <div className="flex flex-col justify-center items-center">
                {defferedSearch ? (
                  <div className="grow flex flex-col gap-3 justify-center items-center">
                    <Image
                      src={placeholder}
                      alt="not found"
                      className="max-w-xs aspect-video object-cover"
                    />
                    <p>Product not found</p>
                  </div>
                ) : (
                  <button className="p-8 max-w-sm w-full border rounded-lg flex flex-col gap-3 items-center">
                    <PlusIcon className="w-12 h-12" />
                    <span className="text-xl font-medium">Create product</span>
                  </button>
                )}
              </div>
            }
          />
        ) : (
          <div className="grow flex flex-col gap-3">
            {tableHeader}
            <div className="grow flex flex-col gap-3 justify-center items-center">
              <Image
                src={placeholder}
                alt="not found"
                className="max-w-xs aspect-video object-cover"
              />
              <p>No products in the selected category</p>
            </div>
          </div>
        )}
        {!!productsQuery.data && productsQuery.data.data.length > 0 && (
          <Pagination
            page={page}
            pagesCount={productsQuery.data.count.pageCount}
            setPage={changePage}
          />
        )}
      </div>
      <ProductAsideCard product={selectedProduct} onDelete={console.log} />
    </div>
  );
}