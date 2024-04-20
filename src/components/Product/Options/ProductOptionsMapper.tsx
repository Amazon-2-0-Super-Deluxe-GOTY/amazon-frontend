import { OptionSizes } from "./OptionSizes";
import { OptionColors } from "./OptionsColors";
import { ColorsData, OptionsComponent, SizesData } from "./types";

export const ProductOptionsMapper = ({
  options,
  onChange,
}: {
  options: OptionsComponent[];
  onChange: () => void;
}) => {
  return options.map((opt) => {
    switch (opt.type) {
      case "size":
        return (
          <OptionSizes
            data={opt.data as SizesData}
            onChange={onChange}
            key={opt.type}
          />
        );

      case "color":
        return (
          <OptionColors
            data={opt.data as ColorsData}
            onChange={onChange}
            key={opt.type}
          />
        );

      default:
        return null;
    }
  });
};
