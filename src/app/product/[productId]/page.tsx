"use client"
import { useEffect } from 'react';

export default function ProductPage ({ params }: { params: { productId: string } })  {

  useEffect(() => {
    if (params.productId) {
      console.log(`Loading page for product ${params.productId}`);
    }
  }, [params.productId]);

  return (
    <div className="flex flex-col items-center p-9">
      <main>
        <span className='text-[25px]'>Товар {params.productId}</span>

      </main>
    </div>
  );
};
