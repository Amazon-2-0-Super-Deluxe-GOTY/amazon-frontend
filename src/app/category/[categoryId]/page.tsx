"use client"
import { useEffect } from 'react';

export default function  CategoryPage ({ params }: { params: { categoryId: string } })  {

  useEffect(() => {
    if (params.categoryId) {
      console.log(`Loading page for category ${params.categoryId}`);
    }
  }, [params.categoryId]);

  return (
    <div className="flex flex-col items-center p-9">
      <main>
        <span className='text-[25px]'>Товары категории {params.categoryId}</span>

      </main>
    </div>
  );
};
