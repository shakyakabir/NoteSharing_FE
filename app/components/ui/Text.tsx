import React from "react";

const sizeMap = {
  sm: "text-sm",
  md: "text-md",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
  "6xl": "text-6xl",
  "7xl": "text-7xl",
} as const;

const weightMap = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
} as const;

const colorMap = {
  default: "text-gray-800",
  muted: "text-gray-500",
  heading: "text-heading",
  subHeading: "text-subHeading",
  primary: "text-primary",
  danger: "text-red-500",
} as const;

type Size = keyof typeof sizeMap;
type Weight = keyof typeof weightMap;
type Color = keyof typeof colorMap;

interface TextProps {
  children: React.ReactNode;
  className?: string;
  size: Size;
  weight: Weight;
  color: Color;
  as: React.ElementType;
}

export default function Text({
  children,
  className = "",
  size = "base",
  weight = "normal",
  color: colorVariant = "default",
  as: Tag = "p",
}: TextProps) {
  return (
    <Tag
      className={`
        ${sizeMap[size]}
        ${weightMap[weight]}
        ${colorMap[colorVariant]}
        ${className}
      `}
    >
      {children}
    </Tag>
  );
}
