import React from "react";

const variantStyles = {
  primary: "bg-primary text-white hover:opacity-90",
  secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
  danger: "bg-red-500 text-white hover:opacity-90",
  ghost: "bg-transparent text-primary hover:bg-gray-100",
} as const;

const sizeStyles = {
  sm: "px-3 py-1 text-sm",
  base: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
} as const;

type Variant = keyof typeof variantStyles;
type Size = keyof typeof sizeStyles;
type ButtonType = "button" | "submit" | "reset";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  type?: ButtonType;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({
  children,
  variant = "primary",
  size = "base",
  className = "",
  type = "button",
  onClick,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        rounded-md font-medium transition-all
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
