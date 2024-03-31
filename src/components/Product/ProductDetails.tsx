import React, { useMemo } from "react";

interface ProductDetails {
  title: string;
  text: string;
}

export const ProductDetails = ({ details }: { details: ProductDetails[] }) => {
  // const detailsGroups = useMemo(() => {
  //   //   const groupSize = 2;
  //   const groupSize = Math.ceil(details.length / 3);
  //   const groupsCount = Math.ceil(details.length / groupSize);
  //   const groups = [];
  //   let offset = 0;

  //   for (let i = 0; i < groupsCount; i++) {
  //     groups.push(details.slice(offset, offset + groupSize));
  //     offset += groupSize;
  //   }
  //   return groups;
  // }, [details.length]);

  // return (
  //   <div className="flex flex-col lg:flex-row justify-between gap-6 relative">
  //     {detailsGroups.map((group, i) => (
  //       <div key={i}>
  //         <div className="flex flex-wrap lg:flex-col w-full gap-4 lg:gap-6">
  //           {group.map((d) => (
  //             <div className="basis-1/2" key={d.title}>
  //               <h3 className="font-semibold text-lg lg:text-xl">{d.title}</h3>
  //               <p className="text-base lg:text-lg">{d.text}</p>
  //             </div>
  //           ))}
  //         </div>
  //         {i !== group.length && (
  //           <div className="basis-1/5 before:absolute before:bg-gray-300 before:h-[1px] before:left-1/4 before:right-1/4 lg:before:h-auto lg:before:w-[1px] lg:before:top-1/4 lg:before:bottom-1/4 lg:before:left-auto lg:before:right-auto" />
  //         )}
  //       </div>
  //     ))}
  //   </div>
  // );

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      {details.map((d) => (
        <div className="" key={d.title}>
          <h3 className="font-semibold text-lg lg:text-xl">{d.title}</h3>
          <p className="text-base lg:text-lg">{d.text}</p>
        </div>
      ))}
    </div>
  );
};
