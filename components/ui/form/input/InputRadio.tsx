"use client";

import Label from "../Label";

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

export default function InputRadio({
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
