import { FC, InputHTMLAttributes } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
}
const InputCheckbox: FC<CheckboxProps> = ({
  className,
  id,
  ...props
}: CheckboxProps) => {
  return <input name={id} {...props}></input>;
};

export default InputCheckbox;
