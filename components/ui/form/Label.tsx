interface LabelProps {
  children: string | JSX.Element;
  htmlFor: string;
  hidden: boolean;
  style?: string;
}

export default function Label({
  children,
  htmlFor,
  hidden,
  style = "",
}: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={`${hidden ? "--visually-hidden" : ""} ${style}`}
    >
      {children}
    </label>
  );
}
