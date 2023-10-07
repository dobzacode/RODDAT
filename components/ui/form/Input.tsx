"use client";

import {
  ChangeEventHandler,
  EventHandler,
  FC,
  InputHTMLAttributes,
  LegacyRef,
  Ref,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
  forwardRef,
} from "react";
import Label from "./Label";
import { v4 as uuidv4 } from "uuid";
import P from "../text/P";
import Icon from "@mdi/react";
import { mdiMagnify } from "@mdi/js";
import InputSelect from "./input/Select";
import InputRadio from "./input/InputRadio";
import InputTextArea from "./input/InputTextArea";
import InputCheckbox from "./input/InputCheckbox";
import InputSearch from "./input/InputSearch";
import InputText from "./input/InputText";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/utils/utils";
import Select from "./input/Select";

const inputVariants = cva("", {
  variants: {
    intent: {
      primary:
        "bg-primary5 placeholder:text-primary90/[.4] text-primary90 border-primary90/[.2] outline-primary90/[.2]",
      secondary:
        "bg-secondary5 placeholder:text-secondary90/[.4] text-secondary90 border-secondary90/[.2] outline-secondary90/[.2]",
      tertiary:
        "bg-tertiary5 placeholder:text-tertiary90/[.4] text-tertiary90 border-tertiary90/[.2] outline-tertiary90/[.2]",
      success:
        "      bg-success5 placeholder:text-success90/[.4] text-success90 border-success90/[.2] outline-success90/[.2]",
      error:
        "bg-error5 placeholder:text-error90/[.4] text-error90 border-error90/[.2] outline-error90/[.2]",
      warning:
        "      bg-warning5 placeholder:text-warning90/[.4] text-warning90 border-warning90/[.2] outline-warning90/[.2]",
      info: "bg-info5 placeholder:text-info90/[.4] text-info90 border-info90/[.2] outline-info90/[.2]",
      neutral:
        "bg-${color}5 placeholder:text-${color}90/[.4] text-${color}90 border-${color}90/[.2] outline-${color}90/[.2]",
    },
  },
});

interface InputProps
  extends InputHTMLAttributes<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    VariantProps<typeof inputVariants> {
  children?: React.ReactNode;
  hiddenLabel?: boolean;
  choices?: string[];
  customText?: string[];
  loader?: JSX.Element;
  onChange?:
    | SelectHTMLAttributes<HTMLSelectElement>["onChange"]
    | InputHTMLAttributes<HTMLInputElement>["onChange"]
    | TextareaHTMLAttributes<HTMLTextAreaElement>["onChange"];
}

// interface InputProps {
//   required?: boolean;
//   type:
//     | "text"
//     | "email"
//     | "password"
//     | "select"
//     | "radio"
//     | "textarea"
//     | "checkbox"
//     | "search";
//   color?:
//     | "primary"
//     | "secondary"
//     | "tertiary"
//     | "neutral"
//     | "error"
//     | "warning"
//     | "success"
//     | "info";
//   id: string;
//   value?: string;
//   flex?: string;
//   onChange?: React.ChangeEventHandler<
//     HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
//   >;
//   placeholder?: string;

//   hiddenLabel?: boolean;
//   choices?: string[];
//   customText?: string[];
//   children?: JSX.Element[] | JSX.Element;
//   loader?: JSX.Element;
// }

const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      intent,
      hiddenLabel = false,
      choices = [""],
      customText = [""],
      loader,
      children,
      onChange,
      id,
      ...props
    },
    ref,
  ) => {
    return (
      <>
        {type === "select" && (
          <Select
            className={cn(
              inputVariants({
                className,
                intent,
              }),
            )}
            loader={loader}
            choices={choices}
            {...props}
          />
        )}
        {type === "text" || type === "email" || type === "password" ? (
          <InputText
            className={cn(
              inputVariants({
                className,
                intent,
              }),
            )}
            {...props}
          ></InputText>
        ) : (
          ""
        )}
        {type === "radio" && (
          <fieldset className="flex flex-col gap-small">
            {choices.map((choice, index) => {
              return (
                <div key={uuidv4()} className="flex items-end gap-extra-small">
                  <InputRadio
                    className={cn(
                      inputVariants({
                        className,
                        intent,
                      }),
                    )}
                    choice={choice[index]}
                    {...props}
                  />
                  {customText[index] && (
                    <P textColor="text-secondary30 caption">
                      {customText[index]}
                    </P>
                  )}
                </div>
              );
            })}
          </fieldset>
        )}
        {type === "textarea" && (
          <InputTextArea
            className={cn(
              inputVariants({
                className,
                intent,
              }),
            )}
            {...props}
          >
            {props.placeholder}
          </InputTextArea>
        )}
        {type === "checkbox" && <InputCheckbox {...props}></InputCheckbox>}
        {type === "search" && <InputSearch ref={ref} {...props}></InputSearch>}
        {type !== "radio" ? (
          <Label
            className="text-90 body font-medium"
            isHidden={false}
            htmlFor={id}
          >
            {id}
          </Label>
        ) : null}{" "}
      </>
    );
  },
);

Input.displayName = "Button";

export default Input;
export { inputVariants };
