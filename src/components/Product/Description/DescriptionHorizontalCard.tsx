import Image from "next/image";
import type { DescriptionHorizontalCardType } from "./types";

export const DescriptionHorizontalCard = ({
  data,
}: {
  data: DescriptionHorizontalCardType["data"];
}) => {
  return (
    <div className="min-h-80 grid lg:grid-cols-2 items-center gap-4 lg:gap-8">
      <div className={data.direction === "ltr" ? "lg:col-[1]" : "lg:col-[2]"}>
        <p className="font-semibold text-xl">{data.title}</p>
        <p className="text-base">{data.text}</p>
      </div>
      <div
        className={
          "relative h-full min-h-40 row-[1] " +
          (data.direction === "ltr" ? "lg:col-[2]" : "lg:col-[1]")
        }
      >
        <Image
          src={data.image}
          fill={true}
          className="object-cover"
          alt="Placeholder"
        />
      </div>
    </div>
  );
};
