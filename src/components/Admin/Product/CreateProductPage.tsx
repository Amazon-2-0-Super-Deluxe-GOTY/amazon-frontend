"use client";
import { useAdminCategories } from "@/api/categories";
import { getProductById } from "@/api/products";
import { CreateProductForm } from "@/components/forms/admin/CreateProductForm";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import Link from "next/link";
import { EditIcon, PlusIcon } from "@/components/Shared/Icons";

export function CreateProductPage({
  productId,
  categoryId,
}: {
  productId?: string;
  categoryId?: number;
}) {
  const categoriesQuery = useAdminCategories();
  const productQuery = useQuery({
    queryKey: ["product", productId],
    staleTime: 0,
    queryFn: () => (productId ? getProductById({ productId }) : null),
    select(data) {
      return data?.status === 200 ? data.data : null;
    },
  });
  const router = useRouter();

  const onSubmit = () => {
    router.push("/admin/products");
  };

  const formDefaultValues = useMemo(() => {
    const product = productQuery.data;
    if (!product) return;

    return {
      productId: productId,
      name: product.name,
      code: product.code ?? "",
      price: product.price,
      discount: product.discountPercent,
      categoryId: product.category.id,
      images: product.productImages,
      quantity: product.quantity,
      productDetails: product.productProperties.map((p) => ({
        name: p.key,
        text: p.value,
      })),
      aboutProduct: product.aboutProductItems.map((p) => ({
        name: p.title,
        text: p.text,
      })),
    };
  }, [productQuery.data, productId]);

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
              <EditIcon className="w-10 h-10" />
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
        categories={categoriesQuery.data ?? []}
        defaultValues={formDefaultValues}
        defaultCategoryId={categoryId}
        onSubmit={onSubmit}
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
