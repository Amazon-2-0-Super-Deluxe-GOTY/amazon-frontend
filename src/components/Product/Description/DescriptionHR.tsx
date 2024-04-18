import { DescriptionHRType } from "./types";

export const DescriptionHR = ({
  data,
}: {
  data: DescriptionHRType["data"];
}) => {
  return (
    <div>
      <hr className="my-6 border-0 border-b-2" />
    </div>
  );
};
