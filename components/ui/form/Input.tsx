"use client";

import { EventHandler } from "react";
import Label from "./Label";
import { v4 as uuidv4 } from "uuid";
import P from "../text/P";
import Icon from "@mdi/react";
import { mdiMagnify } from "@mdi/js";
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

interface SelectProps {
  determineColor: Function;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  required?: boolean;
  id: string;
  value?: string;
  placeholder?: string;
  choices: string[];
  loader?: JSX.Element;
}

function InputSelect({
  determineColor = () => {},
  onChange,
  required,
  id,
  value,
  placeholder,
  choices,
  loader,
}: SelectProps) {
  return (
    <>
      {!loader ? (
        <select
          className={`${determineColor()} body placeholder:body px-extra-small py-[1.1rem] rounded-lg box-border border shadow-inner minimal cursor-pointer`}
          onChange={onChange}
          required={required}
          id={id}
          name={id}
          value={value}
          placeholder={placeholder ? placeholder : ""}
          aria-label={id}
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
          className={`${determineColor()}   rounded-lg box-border border shadow-inner flex items-center justify-center relative`}
        >
          {loader}
          <select
            className={`${determineColor()} body placeholder:body p-extra-small w-full`}
            onChange={onChange}
            required={required}
            id={id}
            name={id}
            value={value}
            placeholder={placeholder ? placeholder : ""}
            aria-label={id}
            disabled={
              choices[0] === "" || choices[0] === "No community is matching"
            }
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
}

interface RadioProps {
  determineColor: Function;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  id: string;
  value?: string;
  placeholder?: string;
  choice: string;
  color: string;
}

function InputRadio({
  required,
  choice,
  id,
  value,
  onChange,
  color,
}: RadioProps) {
  return (
    <div className="flex gap-extra-small items-center">
      <input
        className={`cursor-pointer `}
        required={required}
        type="radio"
        id={choice}
        name={id}
        value={choice}
        checked={value === choice}
        onChange={onChange}
      ></input>
      <Label
        style={`text-${color}90 body font-medium`}
        hidden={false}
        htmlFor={choice}
      >
        {choice}
      </Label>
    </div>
  );
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
        <input
          className={`${determineColor(
            color
          )} body placeholder:body p-extra-small  rounded-lg box-border border shadow-inner`}
          required={required}
          type={type}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder ? placeholder : ""}
        ></input>
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
        <textarea
          className={`${determineColor(
            color
          )} body placeholder:body p-extra-small  rounded-lg box-border border shadow-inner w-full leading-9 h-auto`}
          id={id}
          name={id}
          rows={3}
          cols={50}
          value={value}
          onChange={onChange}
        >
          {placeholder}
        </textarea>
      )}
      {type === "checkbox" && (
        <input
          type={type}
          required={required}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
        ></input>
      )}
      {type === "search" && (
        <div
          className={`${determineColor(
            color
          )}   rounded-lg box-border border shadow-inner flex items-center px-extra-small`}
        >
          <Icon path={mdiMagnify} size={2}></Icon>
          <input
            className={`${determineColor(
              color
            )} body placeholder:body p-extra-small w-full`}
            required={required}
            type={type}
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder ? placeholder : ""}
          ></input>
        </div>
      )}
      {type !== "radio" ? (
        <Label style={`text-${color}90 body`} hidden={hiddenLabel} htmlFor={id}>
          {id}
        </Label>
      ) : null}{" "}
    </>
  );
}
