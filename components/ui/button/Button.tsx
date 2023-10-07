import { cn } from "@/utils/utils";
import { VariantProps, cva } from "class-variance-authority";
import { ButtonHTMLAttributes, FC, forwardRef } from "react";

const buttonVariants = cva(
  "whitespace-nowrap inline-flex items-center justify-center",
  {
    variants: {
      size: {
        small: "py-small px-sub-large body leading-body font-medium",
        medium: "py-sub-medium px-sub-large heading",
        large: "py-sub-large px-large heading--sub-large",
      },
      intent: {
        primary: "bg-primary40 text-primary1 border-primary80",
        secondary: "bg-secondary40 text-secondary1 border-secondary80",
        tertiary: "bg-tertiary40 text-tertiary1 border-tertiary80",
        success: "bg-success40 text-success1 border-success80",
        error: "bg-error40 text-error1 border-error80",
        warning: "bg-warning40 text-warning1 border-warning 80",
        info: "bg-info40 text-info1 border-info80",
        neutral: "bg-neutral40 text-neutral1 border-neutral80",
        pastelPrimary: "bg-primary10 text-primary80 border-primary80",
        pastelSecondary: "bg-secondary10 text-secondary80 border-secondary80",
        pastelTertiary: "bg-tertiary10 text-tertiary80 border-tertiary80",
        pastelSuccess: "bg-success10 text-success80 border-success80",
        pastelError: "bg-error10 text-error80 border-error80",
        pastelWarning: "bg-warning10 text-warning80 border-warning 80",
        pastelInfo: "bg-info10 text-info80 border-info80",
        pastelNeutral: "bg-neutral10 text-neutral80 border-neutral80",
      },
      modifier: {
        brutalism: "border-b-4 border-l border-r-4 border-t",
      },
      transparent: {
        true: "bg-transparent border-current text-current",
      },
      rounded: {
        small: "rounded-extra-small",
        medium: "rounded-small",
        large: "rounded-medium",
        full: "rounded-full",
      },
      hover: {
        true: "duration-fast hover:scale-[102%]",
      },
    },

    compoundVariants: [
      {
        intent: "primary",
        hover: true,
        className: " hover:shadow-primary-medium",
      },
      {
        intent: "secondary",
        hover: true,
        className: "hover:shadow-secondary-medium",
      },
      {
        intent: "tertiary",
        hover: true,
        className: "hover:shadow-tertiary-medium",
      },
      {
        intent: "info",
        hover: true,
        className: "hover:shadow-info-medium",
      },
      {
        intent: "success",
        hover: true,
        className: "hover:shadow-success-medium",
      },
      {
        intent: "error",
        hover: true,
        className: "hover:shadow-error-medium",
      },
      {
        intent: "warning",
        hover: true,
        className: "hover:shadow-warning-medium",
      },
      {
        intent: "neutral",
        hover: true,
        className: "hover:shadow-neutral-medium",
      },
    ],
  },
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
}

const Button: FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      intent,
      size,
      modifier,
      rounded,
      hover,
      transparent,
      saturated,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          buttonVariants({
            className,
            intent,
            size,
            rounded,
            hover,
            transparent,
            modifier,
            saturated,
          }),
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
export { buttonVariants };

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
