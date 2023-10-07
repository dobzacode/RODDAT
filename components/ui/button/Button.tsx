"use client";
import { cn } from "@/utils/utils";
import { VariantProps, cva } from "class-variance-authority";
import { ButtonHTMLAttributes, FC, forwardRef } from "react";

const buttonVariants = cva("whitespace-nowrap", {
  variants: {
    intent: {
      primary: "bg-primary40 text-primary1",
      secondary: "bg-secondary40 text-secondary1",
      tertiary: "bg-tertiary40 text-tertiary1",
      success: "bg-success40 text-success1",
      error: "bg-error40 text-error1",
      warning: "bg-warning40 text-warning1",
      info: "bg-info40 text-info1",
      neutral: "bg-neutral40 text-neutral1",
    },
    size: {
      small: "py-small px-sub-large text-body leading-body font-medium",
      medium: "py-sub-medium px-sub-large heading",
      large: "py-sub-large px-large heading--sub-large",
    },
    modifier: {
      outline: "bg-transparent border-current",
    },
    shadow: {
      low: "",
      medium: "",
      high: "",
    },
  },
  compoundVariants: [
    { intent: "primary", shadow: "low", className: "shadow-primary-low" },
    { intent: "primary", shadow: "medium", className: "shadow-primary-medium" },
    { intent: "primary", shadow: "high", className: "shadow-primary-high" },
    { intent: "secondary", shadow: "low", className: "shadow-secondary-low" },
    {
      intent: "secondary",
      shadow: "medium",
      className: "shadow-secondary-medium",
    },
    { intent: "secondary", shadow: "high", className: "shadow-secondary-high" },
    { intent: "tertiary", shadow: "low", className: "shadow-tertiary-low" },
    {
      intent: "tertiary",
      shadow: "medium",
      className: "shadow-tertiary-medium",
    },
    { intent: "tertiary", shadow: "high", className: "shadow-tertiary-high" },
    { intent: "info", shadow: "low", className: "shadow-info-low" },
    { intent: "info", shadow: "medium", className: "shadow-info-medium" },
    { intent: "info", shadow: "high", className: "shadow-info-high" },
    { intent: "error", shadow: "low", className: "shadow-error-low" },
    { intent: "error", shadow: "medium", className: "shadow-error-medium" },
    { intent: "error", shadow: "high", className: "shadow-error-high" },
    { intent: "success", shadow: "low", className: "shadow-success-low" },
    { intent: "success", shadow: "medium", className: "shadow-success-medium" },
    { intent: "success", shadow: "high", className: "shadow-success-high" },
    { intent: "warning", shadow: "low", className: "shadow-warning-low" },
    { intent: "warning", shadow: "medium", className: "shadow-warning-medium" },
    { intent: "warning", shadow: "high", className: "shadow-warning-high" },
    { intent: "neutral", shadow: "low", className: "shadow-neutral-low" },
    { intent: "neutral", shadow: "medium", className: "shadow-neutral-medium" },
    { intent: "neutral", shadow: "high", className: "shadow-neutral-high" },
  ],
  defaultVariants: {
    intent: "primary",
    size: "medium",
  },
});

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
}

const Button: FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, intent, size, modifier, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ className, intent, size, modifier }))}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };

// interface ButtonProps {
//   hover?: string;
//   onClick?: React.MouseEventHandler<HTMLButtonElement>;
//   children: string | JSX.Element;
//   type?: "button" | "submit" | "reset";
//   color?:
//     | "primary"
//     | "secondary"
//     | "tertiary"
//     | "success"
//     | "error"
//     | "warning"
//     | "info"
//     | "neutral";
//   transparent?: boolean;
//   size?: "small" | "medium" | "large";
//   margin?: string;
//   shadow?: "small" | "medium" | "high" | "clay" | "";
//   rounded?: string;
//   customCSS?: string;
// }

// export default function Button({
//   onClick = () => console.log("empty"),
//   children,
//   color,
//   type = "button",
//   margin = "",
//   shadow = "",
//   size,
//   transparent,
//   rounded = "rounded-extra-small",
//   customCSS = "",
//   hover = "",
// }: ButtonProps) {
//   const finalcolor = () => {
//     if (!color) {
//       return "";
//     } else if (transparent) {
//       return color
//         ? `border-2 border-${color}40 text-${color}40 `
//         : "border border-black text-black";
//     } else if (shadow !== "clay") {
//       switch (color) {
//         case "primary":
//           return "bg-primary40 text-primary1";
//         case "secondary":
//           return "bg-secondary40 text-secondary1";
//         case "tertiary":
//           return "bg-tertiary40 text-tertiary1";
//         case "success":
//           return "bg-success40 text-success1";
//         case "error":
//           return "bg-error40 text-error1";
//         case "warning":
//           return "bg-warning40 text-warning1";
//         case "info":
//           return "bg-info40 text-info1";
//         case "neutral":
//           return "bg-neutral40 text-neutral1";
//       }
//     }
//     // text-primary90
//     // text-secondary90
//     // text-tertiary90
//     // text-neutral90
//     else return `text-${color}90`;
//   };

//   const finalShadow = () => {
//     // shadow-primary-clay
//     // shadow-primary-high
//     // shadow-primary-medium
//     // shadow-primary-low
//     // shadow-secondary-clay
//     // shadow-secondary-high
//     // shadow-secondary-medium
//     // shadow-secondary-low
//     // shadow-tertiary-clay
//     // shadow-tertiary-high
//     // shadow-tertiary-medium
//     // shadow-tertiary-low
//     // shadow-info-high
//     // shadow-info-medium
//     // shadow-info-low
//     // shadow-success-high
//     // shadow-success-medium
//     // shadow-success-low
//     // shadow-error-high
//     // shadow-error-medium
//     // shadow-error-low
//     // shadow-warning-high
//     // shadow-warning-medium
//     // shadow-warning-low
//     // shadow-neutral-high
//     // shadow-neutral-medium
//     // shadow-neutral-low
//     // shadow-neutral-clay
//     if (shadow) return `shadow-${color}-${shadow}`;
//     return "";
//   };

//   //button--clay
//   //button--small
//   //button--medium
//   //button--large

//   return (
//     <button
//       onClick={onClick}
//       type={type ? type : "button"}
//       className={`${rounded ? rounded : ""} ${finalcolor()} button--${
//         shadow === "clay" ? "clay" : size
//       } ${margin ? margin : ""} ${finalShadow()} ${
//         customCSS ? customCSS : ""
//       } whitespace-nowrap  ${hover}`}
//     >
//       {children}
//     </button>
//   );
// }
