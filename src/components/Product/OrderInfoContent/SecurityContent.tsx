import { Separator } from "@/components/ui/separator";

export const SecurityContent = () => {
  return (
    <div className="grow space-y-4 lg:space-y-6 overflow-y-auto">
      <Separator orientation="horizontal" />
      <p className="text-sm sm:text-base">
        You buy safely in [Marketplace’s name]. Here you will learn about your
        rights after purchase.
      </p>
      <Separator orientation="horizontal" />
      <div className="space-y-3">
        <h3 className="text-lg lg:text-xl font-semibold">Complaint</h3>
        <p className="text-sm sm:text-base">
          Seller is responsible for defective goods within{" "}
          <span className="font-semibold">1 year</span> from the moment of
          delivery.
        </p>
        <h3 className="lg:text-lg font-semibold flex justify-between items-center">
          <span>Complaint deadline</span>
          <span>1 year</span>
        </h3>
        <p className="text-sm sm:text-base">
          Applies to complaints about the guarantee or non-conformity of the
          goods to the contract.
        </p>
      </div>
      <Separator orientation="horizontal" />
      <div className="space-y-3">
        <h3 className="text-lg lg:text-xl font-semibold">Guarantee</h3>
        <p className="text-sm sm:text-base">
          Will apply to the seller’s goods for 1 month from the date of
          purchase.
        </p>
        <h3 className="lg:text-lg font-semibold flex justify-between items-center">
          <span>Guarantee deadline</span>
          <span>1 month</span>
        </h3>
      </div>
    </div>
  );
};
