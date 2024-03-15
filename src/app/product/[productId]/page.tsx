"use client";
import { useEffect } from "react";

export default function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  useEffect(() => {
    if (params.productId) {
      console.log(`Loading page for product ${params.productId}`);
    }
  }, [params.productId]);

  return (
    <main className="flex flex-col items-center p-9 grow">
      <span className="text-lg">Товар {params.productId}</span>
    </main>
  );
}
