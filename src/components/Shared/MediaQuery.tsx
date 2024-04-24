"use client";
import { type ScreenSize, useScreenSize, getScreeSizeClass } from "@/lib/media";
import React from "react";

interface Props {
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

interface PropsMin extends Props {
  minSize: ScreenSize;
}

interface PropsMax extends Props {
  maxSize: ScreenSize;
}

export const MediaQuery = (props: PropsMin | PropsMax) => {
  const isVisible = useScreenSize(props);

  if (isVisible) {
    return props.children;
  }

  return props.fallback ? props.fallback : null;
};

export const MediaQueryCSS = (props: PropsMin | PropsMax) => {
  const className = getScreeSizeClass(props);

  return <div className={className}>{props.children}</div>;
};
