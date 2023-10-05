import { mdiMagnify } from "@mdi/js";
import Icon from "@mdi/react";
import { LegacyRef, Ref, forwardRef } from "react";

interface SearchProps {
  determineColor: Function;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  id: string;
  value?: string;
  placeholder?: string;
}

const InputSearch = forwardRef(function InputSearch(
  {
    determineColor = () => {},
    onChange,
    required,
    id,
    value,
    placeholder,
  }: SearchProps,
  ref: LegacyRef<HTMLInputElement>
) {
  return (
    <div
      className={`${determineColor()}   rounded-lg box-border border shadow-inner flex items-center px-extra-small`}
    >
      <Icon path={mdiMagnify} size={2}></Icon>
      <input
        className={`${determineColor()} body placeholder:body p-extra-small w-full`}
        required={required}
        type="search"
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder ? placeholder : ""}
        ref={ref}
      ></input>
    </div>
  );
});

export default InputSearch;
