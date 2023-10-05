interface TextAreaProps {
  determineColor: Function;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  required?: boolean;
  id: string;
  value?: string;
  placeholder?: string;
  children?: string;
}

export default function InputTextArea({
  required,
  determineColor = () => {},
  id,
  value,
  onChange,
  children,
}: TextAreaProps) {
  return (
    <textarea
      required={required}
      className={`${determineColor()} body placeholder:body p-extra-small  rounded-lg box-border border shadow-inner w-full leading-9 h-auto`}
      id={id}
      name={id}
      rows={3}
      cols={50}
      value={value}
      onChange={onChange}
    >
      {children}
    </textarea>
  );
}
