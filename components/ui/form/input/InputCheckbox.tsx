interface CheckboxProps {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  id: string;
  value?: string;

  children?: string;
}

export default function InputCheckbox({
  required,
  id,
  value,
  onChange,
}: CheckboxProps) {
  return (
    <input
      type="checkbox"
      required={required}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
    ></input>
  );
}
