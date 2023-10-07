"use client";
import { VariantProps } from "class-variance-authority";
import {
  FC,
  InputHTMLAttributes,
  SelectHTMLAttributes,
  forwardRef,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { inputVariants } from "../Input";
import { cn } from "@/utils/utils";

interface SelectProps
  extends SelectHTMLAttributes<HTMLSelectElement>, // Use SelectHTMLAttributes
    VariantProps<typeof inputVariants> {
  choices: string[];
  loader?: JSX.Element;
}

const Select: FC<SelectProps> = forwardRef<HTMLInputElement, SelectProps>(
  ({ className, choices, loader, id, placeholder, ...props }, ref) => {
    return (
      <>
        {!loader ? (
          <select
            className={cn(
              "body placeholder:body box-border cursor-pointer rounded-lg border px-extra-small py-[1.1rem] shadow-inner",
              className,
            )}
            name={id}
            aria-label={id}
            {...props}
          >
            {placeholder && (
              <option value="" className="" disabled hidden>
                {placeholder}
              </option>
            )}
            {choices.map((choice) => {
              return (
                <option key={uuidv4()} value={choice}>
                  {choice}
                </option>
              );
            })}
          </select>
        ) : (
          <span
            className={cn(
              "absolute top-16 box-border flex h-full w-full items-center justify-center rounded-lg border shadow-inner",
              className,
            )}
          >
            {loader}
            <select
              className={cn(
                `body placeholder:body w-full p-extra-small `,
                className,
              )}
              name={id}
              placeholder={placeholder ? placeholder : ""}
              aria-label={id}
              disabled={
                choices[0] === "" || choices[0] === "No community is matching"
              }
              {...props}
            >
              {placeholder && (
                <option value="" className="" disabled hidden>
                  {placeholder}
                </option>
              )}
              {choices.map((choice) => {
                return (
                  <option key={uuidv4()} value={choice}>
                    {choice}
                  </option>
                );
              })}
            </select>
          </span>
        )}
      </>
    );
  },
);

Select.displayName = "Select";

export default Select;
