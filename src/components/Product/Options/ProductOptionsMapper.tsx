import { OptionSizes } from "./OptionSizes";
import { OptionColors } from "./OptionsColors";
import { ColorsData, OptionsComponent, SizesData } from "./types";

export const ProductOptionsMapper = ({
  options,
}: {
  options: OptionsComponent[];
}) => {
  return options.map((opt) => {
    switch (opt.type) {
      case "sizes":
        return <OptionSizes data={opt.data as SizesData} />;

      case "colors":
        return <OptionColors data={opt.data as ColorsData} />;

      default:
        return null;
    }
  });
};
