import { type ClassValue, clsx } from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const useExpandableList = <T>(params: {
  maxItems: number;
  items: T[];
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const isExpandable = params.items.length > params.maxItems;

  const items = React.useMemo(() => {
    if (!isExpandable || isExpanded) return params.items;
    return params.items.slice(0, params.maxItems);
  }, [isExpandable, isExpanded, params.maxItems]);

  const onExpand = () => setIsExpanded(true);
  const onHide = () => setIsExpanded(false);

  return { items, isExpandable, isExpanded, onExpand, onHide };
};

export const textAvatar = (text: string, avatarMaxLenght = 2) => {
  const parts = text.split(" ");
  let avatar = "";

  const lenght = Math.min(parts.length, avatarMaxLenght);
  for (let i = 0; i < lenght; i++) {
    avatar += parts[i][0].toUpperCase();
  }

  return avatar;
};
