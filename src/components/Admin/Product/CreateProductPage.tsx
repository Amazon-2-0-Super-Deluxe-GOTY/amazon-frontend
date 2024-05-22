"use client";
import { getCategories } from "@/api/categories";
import { getAdminProduct } from "@/api/products";
import { CreateProductForm } from "@/components/forms/CreateProductForm";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { PlusIcon, SquarePenIcon } from "lucide-react";
import Link from "next/link";

export function CreateProductPage({
  productId,
  categoryId,
}: {
  productId?: string;
  categoryId?: string;
}) {
  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  const productQuery = useQuery({
    queryKey: ["product", productId],
    queryFn: () => (productId ? getAdminProduct({ productId }) : undefined),
  });

  const isEdit = !!productQuery.data;

  return (
    <div className="grow grid grid-cols-1 lg:grid-cols-[1fr_auto_2fr] gap-4 lg:gap-6">
      <div className="relative">
        <div className="sticky top-4 flex lg:flex-col gap-4">
          <FormLink elementId="form-general">General information</FormLink>
          <FormLink elementId="form-details">Product details</FormLink>
          <FormLink elementId="form-about">About product</FormLink>
        </div>
        <div className="absolute inset-0 pointer-events-none flex items-end">
          <div className="sticky bottom-6 flex items-center gap-4 pointer-events-auto">
            {isEdit ? (
              <SquarePenIcon className="w-10 h-10" />
            ) : (
              <PlusIcon className="w-10 h-10" />
            )}
            <p className="text-2xl font-semibold">
              {isEdit ? "Edit" : "Create"} product
            </p>
          </div>
        </div>
      </div>
      <Separator orientation="vertical" />
      <CreateProductForm
        categories={categoriesQuery.data?.data ?? []}
        defaultValues={productQuery.data?.data}
        defaultCategoryId={categoryId}
        onSubmit={console.log}
      />
    </div>
  );
}

interface FormLinkProps {
  elementId: string;
  children: string;
}

const FormLink = ({ elementId, children }: FormLinkProps) => {
  return (
    <Link href={`#${elementId}`} className="w-full flex max-lg:justify-center">
      <Button variant={"link"} className={"text-lg"}>
        {children}
      </Button>
    </Link>
  );
};
