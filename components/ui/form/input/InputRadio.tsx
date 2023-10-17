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
  ({ className, value, choice, name, onChange }, ref) => {
    return (
      <div className="flex items-center gap-extra-small">
        <input
          className={`${className}`}
          type="radio"
          id={choice}
          value={choice}
          checked={value === choice}
          name={name}
          onChange={onChange}
        ></input>
        <Label
          className="body font-medium text-primary90 dark:text-primary10"
          isHidden={false}
          htmlFor={choice}
        ></Label>
      </div>
    );
  },
);

InputRadio.displayName = "InputRadio";

export default InputRadio;
