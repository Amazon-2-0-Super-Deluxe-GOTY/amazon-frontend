"use client";
import { deleteProducts, getProducts, type ProductShort } from "@/api/products";
import { Input } from "@/components/ui/input";
import {
  useCallback,
  useMemo,
  useOptimistic,
  useState,
  useTransition,
} from "react";
import { useAdminCategories, type Category } from "@/api/categories";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { ProductAsideCard } from "@/components/Admin/Product/ProductAsideCart";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { splitPrice } from "@/lib/products";

import { useSearchParamsTools } from "@/lib/router";
import { Pagination } from "@/components/Shared/Pagination";
import { useDebounce } from "use-debounce";
import { CategorySelect } from "@/components/Admin/Category/CategorySelect";
import Link from "next/link";
import { useModal } from "@/components/Shared/Modal";
import { AlertDialog } from "@/components/Admin/AlertDialog";
import {
  ArrowUpDownIcon,
  PlusIcon,
  StarFullIcon,
} from "@/components/Shared/Icons";

export default function Page() {
  const searchParams = useSearchParamsTools();
  const [searchQuery, setSearchQuery] = useState(
    () => searchParams.get?.("searchQuery") ?? ""
  );
  const [page, setPage] = useState(() => {
    const pageFromUrl = searchParams.get?.("page");
    const pageNum = parseInt(pageFromUrl ?? "1");
    return isNaN(pageNum) ? 1 : pageNum;
  });
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [selectedProduct, setSelectedProduct] = useState<
    ProductShort | undefined
  >();
  const [defferedSearch] = useDebounce(searchQuery, 300);
  const { showModal } = useModal();
  const [isTransition, startTransition] = useTransition();

  const fetchProducts = useCallback(async () => {
    if (!selectedCategory)
      return { data: [] as ProductShort[], count: { pagesCount: 0 } };
    const res = await getProducts({
      categoryId: selectedCategory.id,
      page,
      searchQuery: defferedSearch,
      pageSize: 7,
    });

    if (res.status === 200) {
      return { data: res.data, count: res.count };
    }

    return { data: [] as ProductShort[], count: { pagesCount: 0 } };
  }, [selectedCategory, page, defferedSearch]);

  const categoriesQuery = useAdminCategories();
  const productsQuery = useQuery({
    queryKey: ["productsShort", selectedCategory?.id, page, defferedSearch],
    queryFn: fetchProducts,
    staleTime: 10 * 1000,
  });

  const [dataOptimistic, setDataOptimistic] = useOptimistic(
    productsQuery.data?.data
  );

  function onSelectCategory(id: number) {
    const value = categoriesQuery.data?.find((c) => c.id === id);
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

  const handleDelete = (...ids: string[]) => {
    showModal({
      component: AlertDialog,
      props: {
        title: "Are you sure?",
        text:
          ids.length > 1
            ? "By removing the selected products you will not be able to restore them."
            : "By removing this product, you will not be able to restore it.",
      },
    }).then(({ action }) => {
      if (action === "CONFIRM") {
        startTransition(async () => {
          setDataOptimistic((current) =>
            current?.filter((v) => !ids.includes(v.id))
          );
          const data = await deleteProducts(ids);

          if (
            data.status === 200 &&
            selectedProduct?.id &&
            ids.includes(selectedProduct.id)
          ) {
            setSelectedProduct(undefined);
          }

          await productsQuery.refetch();
        });
      }
    });
  };

  const tableHeader = (
    <div className="flex items-center gap-4 w-full">
      <div className="flex items-center gap-3 basis-1/3">
        <h2 className="font-medium">Category</h2>
        <div className="min-w-72">
          <CategorySelect
            categories={categoriesQuery.data}
            value={selectedCategory?.id}
            onValueChange={onSelectCategory}
          />
        </div>
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
                <ArrowUpDownIcon className="h-4 w-4" />
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
                src={product.productImages[0].imageUrl}
                alt="Product image"
                width={80}
                height={80}
                className="object-cover rounded-sm aspect-square"
              />
              <p className="max-w-xs line-clamp-2 text-xl">{product.name}</p>
            </div>
          );
        },
      },
      {
        header: "Rating",
        accessorKey: "generalRate",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <StarFullIcon className="w-6 h-6" />
            <span className="text-xl">
              {parseFloat(row.getValue("generalRate")).toFixed(1)}
            </span>
          </div>
        ),
      },
      {
        header: "Price",
        accessorKey: "price",
        cell: ({ row }) => {
          const product = row.original;
          const displayedPrice = product.discountPercent
            ? product.discountPrice
            : product.price;
          const displayedPriceParts = splitPrice(displayedPrice);
          const normalPriceParts = splitPrice(product.price);

          return (
            <div className="flex items-center gap-3">
              <p className="text-xl">
                ${displayedPriceParts.whole}
                <sup>{displayedPriceParts.fraction}</sup>
              </p>
              {!!product.discountPercent && (
                <p className="text-base line-through text-halftone">
                  ${normalPriceParts.whole}
                  <sup>{normalPriceParts.fraction}</sup>
                </p>
              )}
            </div>
          );
        },
      },
      {
        id: "actions",
        header: ({ table }) => {
          const isDelete =
            table.getIsSomeRowsSelected() || table.getIsAllRowsSelected();

          const onDelete = () =>
            handleDelete(
              ...table.getSelectedRowModel().rows.map((row) => row.original.id)
            );

          return (
            <div className="min-w-20 flex justify-end items-center">
              {isDelete ? (
                <button className="text-destructive" onClick={onDelete}>
                  Delete
                </button>
              ) : (
                <Link
                  href={`/admin/products/create?categoryId=${selectedCategory?.id}`}
                >
                  <PlusIcon className="h-4 w-4" />
                </Link>
              )}
            </div>
          );
        },
      },
    ],
    [selectedCategory?.id]
  );

  return (
    <div className="grow flex flex-col lg:flex-row gap-4 lg:gap-6">
      <div className="lg:basis-2/3 flex flex-col gap-4 lg:gap-6">
        {selectedCategory ? (
          <DataTable
            data={dataOptimistic ?? []}
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
                      src={"/no-results.webp"}
                      alt="No results"
                      width={320}
                      height={160}
                      className="aspect-video object-cover"
                    />
                    <p>Product not found</p>
                  </div>
                ) : (
                  <Link
                    href={`/admin/products/create?categoryId=${selectedCategory?.id}`}
                    className="p-8 max-w-sm w-full border border-secondary rounded-lg flex flex-col gap-3 items-center"
                  >
                    <PlusIcon className="w-12 h-12 stroke-secondary" />
                    <span className="text-xl font-medium">Create product</span>
                  </Link>
                )}
              </div>
            }
          />
        ) : (
          <div className="grow flex flex-col gap-3">
            {tableHeader}
            <div className="grow flex flex-col gap-3 justify-center items-center">
              <Image
                src={"/no-results.webp"}
                alt="No results"
                width={320}
                height={160}
                className="aspect-video object-cover"
              />
              <p>No products in the selected category</p>
            </div>
          </div>
        )}
        {!!productsQuery.data &&
          productsQuery.data.data.length > 0 &&
          productsQuery.data.count.pagesCount > 1 && (
            <Pagination
              page={page}
              pagesCount={productsQuery.data.count.pagesCount}
              setPage={changePage}
            />
          )}
      </div>
      <ProductAsideCard
        product={selectedProduct}
        onDelete={handleDelete}
        isButtonsDisabled={isTransition}
      />
    </div>
  );
}
