import { FC, InputHTMLAttributes, forwardRef } from "react";
import { inputVariants } from "../Input";
import { VariantProps } from "class-variance-authority";
import { cn } from "@/utils/utils";

interface TextProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const InputText: FC<TextProps> = forwardRef<HTMLInputElement, TextProps>(
  ({ className, id, ...props }, ref) => {
    return (
      <input
        className={cn(
          "body placeholder:body box-border  rounded-lg border p-extra-small shadow-inner",
          className,
        )}
        name={id}
        id={id}
        {...props}
      ></input>
    );
  },
);

InputText.displayName = "InputText";

export default InputText;
