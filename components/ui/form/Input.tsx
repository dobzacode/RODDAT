"use client";

import { EventHandler } from "react";
import Label from "./Label";
import { v4 as uuidv4 } from "uuid";
import P from "../text/P";
import Icon from "@mdi/react";
import { mdiMagnify } from "@mdi/js";
import InputSelect from "./input/InputSelect";
import InputRadio from "./input/InputRadio";
import InputTextArea from "./input/InputTextArea";
import InputCheckbox from "./input/InputCheckbox";
import InputSearch from "./input/InputSearch";
import InputText from "./input/InputText";
interface InputProps {
  required?: boolean;
  type:
    | "text"
    | "email"
    | "password"
    | "select"
    | "radio"
    | "textarea"
    | "checkbox"
    | "search";
  color?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "neutral"
    | "error"
    | "warning"
    | "success"
    | "info";
  id: string;
  value?: string;
  flex?: string;
  onChange?: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >;
  placeholder?: string;

  hiddenLabel?: boolean;
  choices?: string[];
  customText?: string[];
  children?: JSX.Element[] | JSX.Element;
  loader?: JSX.Element;
}

export default function Input({
  required,
  type,
  id,
  value,
  color = "neutral",
  onChange = () => console.log("empty"),
  placeholder,
  hiddenLabel = false,
  choices = [""],
  customText = [""],

  loader,
}: InputProps) {
  const determineColor = (color: string) => {
    //bg-primary5 placeholder:text-primary90/[.4] text-primary90 border-primary90/[.2] outline-primary90/[.2]
    //bg-secondary5 placeholder:text-secondary90/[.4] text-secondary90 border-secondary90/[.2] outline-secondary90/[.2]
    //bg-tertiary5 placeholder:text-tertiary90/[.4] text-tertiary90 border-tertiary90/[.2] outline-tertiary90/[.2]
    //bg-success5 placeholder:text-success90/[.4] text-success90 border-success90/[.2] outline-success90/[.2]
    //bg-info5 placeholder:text-info90/[.4] text-info90 border-info90/[.2] outline-info90/[.2]
    //bg-warning5 placeholder:text-warning90/[.4] text-warning90 border-warning90/[.2] outline-warning90/[.2]
    //bg-error5 placeholder:text-error90/[.4] text-error90 border-error90/[.2] outline-error90/[.2]
    //bg-neutral5 placeholder:text-neutral90/[.4] text-neutral90 border-neutral90/[.2] outline-neutral90/[.2]
    return `bg-${color}5 placeholder:text-${color}90/[.4] text-${color}90 border-${color}90/[.2] outline-${color}90/[.2]`;
  };

  return (
    <>
      {type === "select" && (
        <InputSelect
          loader={loader}
          determineColor={() => determineColor(color)}
          onChange={onChange}
          required={required}
          id={id}
          value={value}
          placeholder={placeholder}
          choices={choices}
        />
      )}
      {type === "text" || type === "email" || type === "password" ? (
        <InputText
          determineColor={() => determineColor(color)}
          required={required}
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        ></InputText>
      ) : (
        ""
      )}
      {type === "radio" && (
        <fieldset className="flex gap-small flex-col">
          {choices.map((choice, index) => {
            return (
              <div key={uuidv4()} className="flex gap-extra-small items-end">
                <InputRadio
                  determineColor={() => determineColor(color)}
                  required={required}
                  choice={choice}
                  id={id}
                  value={value}
                  onChange={onChange}
                  color={color}
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
          determineColor={() => determineColor(color)}
          id={id}
          value={value}
          onChange={onChange}
          required={required}
        >
          {placeholder}
        </InputTextArea>
      )}
      {type === "checkbox" && (
        <InputCheckbox
          required={required}
          id={id}
          value={value}
          onChange={onChange}
        ></InputCheckbox>
      )}
      {type === "search" && (
        <InputSearch
          determineColor={() => determineColor(color)}
          onChange={onChange}
          required={required}
          id={id}
          value={value}
          placeholder={placeholder}
        ></InputSearch>
      )}
      {type !== "radio" ? (
        <Label style={`text-${color}90 body`} hidden={hiddenLabel} htmlFor={id}>
          {id}
        </Label>
      ) : null}{" "}
    </>
  );
}
