import { Separator } from "@/components/ui/separator";

export const ReturnsContent = () => {
  return (
    <div className="grow space-y-4 lg:space-y-6">
      <p className="text-sm sm:text-base">
        You have 14 days to terminate the contract.
      </p>
      <Separator orientation="horizontal" />
      <div>
        <h3 className="text-lg lg:text-xl font-semibold">Cost of returning</h3>
        <p className="text-sm sm:text-base">
          The refund rate depends on the shipping method you choose when
          purchasing.
        </p>
      </div>
      {/* FIXME: I don't know yet how the data will look like, so I hardcoded here data from design */}
      <table className="w-full">
        <tbody>
          <tr className="text-sm sm:text-base flex justify-between items-center p-4 even:bg-gray-200 rounded-md">
            <td>
              <p>Pilot Freight Services</p>
              <p className="text-xs sm:text-sm">Free on purchase from $150</p>
            </td>
            <td>At your expense</td>
          </tr>
          <tr className="text-sm sm:text-base flex justify-between items-center p-4 even:bg-gray-200 rounded-md">
            <td>
              <p>USPS</p>
              <p className="text-xs sm:text-sm">Free on purchase from $100</p>
            </td>
            <td>At your expense</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
