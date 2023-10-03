interface H3Props {
  children: string | JSX.Element;
  textColor?: string;
  bgColor?: string;
  type?: string;
}

export default function H3({
  children,
  textColor = "",
  bgColor = "",
  type = "",
}: H3Props) {
  return (
    <h3 className={`${type} ${textColor} ${bgColor} ${type}`}>{children}</h3>
  );
}
