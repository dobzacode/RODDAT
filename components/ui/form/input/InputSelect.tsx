"use client";
import { v4 as uuidv4 } from "uuid";

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

export default function InputSelect({
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
          className={`${determineColor()}   rounded-lg box-border border shadow-inner flex items-center justify-center absolute top-16 w-full h-full`}
        >
          {loader}
          <select
            className={`${determineColor()} body placeholder:body p-extra-small w-full `}
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
