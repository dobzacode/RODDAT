interface TextProps {
  determineColor: Function;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  id: string;
  value?: string;
  placeholder?: string;

  type: "text" | "password" | "email";
}

export default function InputText({
  type,
  required,
  determineColor = () => {},
  id,
  value,
  onChange,
  placeholder,
}: TextProps) {
  return (
    <input
      className={`${determineColor()} body placeholder:body p-extra-small  rounded-lg box-border border shadow-inner`}
      required={required}
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder ? placeholder : ""}
    ></input>
  );
}
