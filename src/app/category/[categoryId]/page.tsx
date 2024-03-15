"use client";
import { useEffect } from "react";

export default function CategoryPage({
  params,
}: {
  params: { categoryId: string };
}) {
  useEffect(() => {
    if (params.categoryId) {
      console.log(`Loading page for category ${params.categoryId}`);
    }
  }, [params.categoryId]);

  return (
    <main className="flex flex-col items-center p-9 grow">
      <span className="text-lg">Товары категории {params.categoryId}</span>
    </main>
  );
}
