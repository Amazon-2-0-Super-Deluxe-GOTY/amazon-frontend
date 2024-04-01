import React, { useMemo } from "react";

interface Item {
  title: string;
  text: string;
}

export const ProductDetails = ({ items }: { items: Item[] }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      {items.map((item, i) => (
        <div className="text-base lg:text-lg" key={i}>
          <h3 className="font-semibold">{item.title}</h3>
          <p>{item.text}</p>
        </div>
      ))}
    </div>
  );
};
