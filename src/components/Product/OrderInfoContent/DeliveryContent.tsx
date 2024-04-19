import { Separator } from "@/components/ui/separator";
import { countriesList, getCountry } from "@/lib/location";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import ReactSelect, { type SingleValue } from "react-select";

export const DeliveryContent = () => {
  const [location, setLocation] = useState(() => {
    const country = getCountry();
    if (!country) return undefined;
    return {
      label: country.country,
      value: country.code,
    };
  });
  const countries = useMemo(
    () =>
      Object.entries(countriesList).map(([code, name]) => ({
        label: name,
        value: code,
      })),
    []
  );

  const onSearchQueryChange = (
    value: SingleValue<{ label: string; value: string }>
  ) => {
    if (!value) return;
    setLocation(value);
  };

  return (
    <div className="grow">
      <Separator orientation="horizontal" className="mb-4 lg:mb-6" />

      <div className="space-y-4 lg:space-y-6">
        <div className="space-y-5">
          <p className="flex justify-between items-center text-base">
            <span className="font-semibold">Delivery from</span>
            <span>New York, United States</span>
          </p>
          <div className="space-y-2">
            <div className="relative px-0.5">
              <label
                className="absolute left-5 bottom-10 bg-white text-sm z-10 pointer-events-none"
                htmlFor="country-select"
              >
                Country of delivery
              </label>
              <ReactSelect
                name={"Country"}
                unstyled={true}
                isSearchable={true}
                hideSelectedOptions={true}
                placeholder={"Country"}
                id="country-select"
                classNames={{
                  control: (e) =>
                    cn(
                      `rounded-md border`,
                      `border-input p-3 text-base`,
                      e.isFocused ? "ring-1 ring-ring" : ""
                    ),
                  dropdownIndicator: () => "text-gray-400",
                  menu: () =>
                    cn(
                      "absolute top-0 mt-1 text-sm z-10 w-full",
                      "rounded-md border bg-popover shadow-md overflow-x-hidden"
                    ),
                  option: () =>
                    cn(
                      "cursor-default",
                      "rounded-sm py-1.5 my-1 px-2 text-sm outline-none",
                      "focus:bg-gray-200 hover:bg-gray-200 w-auto"
                    ),
                  noOptionsMessage: () => "p-5",
                  multiValue: () => "bg-gray-200 px-2 p-1 rounded mr-2",
                  input: () => "text-sm overflow-x-hidden",
                }}
                options={countries}
                value={location}
                onChange={onSearchQueryChange}
              />
            </div>
          </div>
        </div>

        <Separator orientation="horizontal" />

        <div className="space-y-3">
          <p className="sm:text-lg font-semibold">Pickup points</p>
          {/* FIXME: I don't know yet how the data will look like, so I hardcoded here data from design */}
          <table className="w-full">
            <tbody>
              <tr className="text-sm sm:text-base flex justify-between items-center p-4 even:bg-gray-200 rounded-md">
                <td>
                  <p>Pilot Freight Services</p>
                  <p className="text-xs sm:text-sm">Mar 24 to point</p>
                </td>
                <td>$27.00</td>
              </tr>
              <tr className="text-sm sm:text-base flex justify-between items-center p-4 even:bg-gray-200 rounded-md">
                <td>
                  <p>Pilot Freight Services</p>
                  <p className="text-xs sm:text-sm">Mar 24 to point</p>
                </td>
                <td>$27.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="space-y-3">
          <p className="sm:text-lg font-semibold">Delivery by courier</p>
          {/* FIXME: I don't know yet how the data will look like, so I hardcoded here data from design */}
          <table className="w-full">
            <tbody>
              <tr className="text-sm sm:text-base flex justify-between items-center p-4 even:bg-gray-200 rounded-md">
                <td>
                  <p>Pilot Freight Services</p>
                  <p className="text-xs sm:text-sm">Mar 24 to point</p>
                </td>
                <td>$27.00</td>
              </tr>
              <tr className="text-sm sm:text-base flex justify-between items-center p-4 even:bg-gray-200 rounded-md">
                <td>
                  <p>Pilot Freight Services</p>
                  <p className="text-xs sm:text-sm">Mar 24 to point</p>
                </td>
                <td>$27.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
