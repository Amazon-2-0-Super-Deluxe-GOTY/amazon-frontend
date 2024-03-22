import React from "react";

export const useMediaQuery = (query: string) => {
  const [targetReached, setTargetReached] = React.useState(false);

  const updateTarget = React.useCallback((e: MediaQueryListEvent) => {
    setTargetReached(e.matches);
  }, []);

  React.useEffect(() => {
    const media = window.matchMedia(query);
    media.addEventListener("change", updateTarget);

    if (media.matches) {
      setTargetReached(true);
    }

    return () => media.removeEventListener("change", updateTarget);
  }, [query, updateTarget]);

  return targetReached;
};

const screenSizesMin = {
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1280px)",
  "2xl": "(min-width: 1536px)",
};
const screenSizesMax = {
  sm: "(max-width: 640px)",
  md: "(max-width: 768px)",
  lg: "(max-width: 1024px)",
  xl: "(max-width: 1280px)",
  "2xl": "(max-width: 1536px)",
};

export type ScreenSize = keyof typeof screenSizesMin;

type Params =
  | { minSize: ScreenSize }
  | {
      maxSize: ScreenSize;
    };

export const useScreenSize = (params: Params) => {
  const query =
    "minSize" in params
      ? screenSizesMin[params.minSize]
      : screenSizesMax[params.maxSize];
  return useMediaQuery(query);
};
