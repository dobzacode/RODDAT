import { cn } from "@/utils/utils";
import { VariantProps, cva } from "class-variance-authority";
import { FC, LabelHTMLAttributes } from "react";

const labelVariants = cva("", {
  variants: {
    isHidden: {
      true: "--visually-hidden",
    },
  },
});
interface LabelProps
  extends LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {
  children?: React.ReactNode;
}

const Label: FC<LabelProps> = ({ className, isHidden, children, ...props }) => {
  return (
    <label
      className={cn(
        labelVariants({
          className,
          isHidden,
        }),
      )}
      {...props}
    >
      {props.htmlFor}
    </label>
  );
};

export default Label;
