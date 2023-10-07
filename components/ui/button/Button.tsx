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
