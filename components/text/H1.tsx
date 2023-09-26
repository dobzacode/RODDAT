interface H1Props {
  children: string | JSX.Element;
  type: string;
  textColor?: string;
  bgColor?: string;
  padding?: string;
  rounded?: string;
}

export default function H1({
  children,
  type,
  textColor = "",
  bgColor = "",
  padding = "",
  rounded = "",
}: H1Props) {
  return (
    <h1 className={`${type} ${textColor} ${bgColor} ${padding} ${rounded}`}>
      {children}
    </h1>
  );
}
