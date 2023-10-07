"use client";

import { FC, InputHTMLAttributes, forwardRef } from "react";
import Label from "../Label";
import { VariantProps } from "class-variance-authority";
import { inputVariants } from "../Input";

interface RadioProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  choice: string;
}

const InputRadio: FC<RadioProps> = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, id, choice, ...props }, ref) => {
    return (
      <div className="flex items-center gap-extra-small">
        <input
          className={`${className}`}
          type="radio"
          id={choice}
          name={id}
          value={choice}
          checked={props.value === choice}
          {...props}
        ></input>
        <Label
          className="text-90 body font-medium"
          isHidden={false}
          htmlFor={choice}
        >
          {choice}
        </Label>
      </div>
    );
  },
);

InputRadio.displayName = "InputRadio";

export default InputRadio;
