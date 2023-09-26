interface ColorDivProps {
  children?: JSX.Element;
  color?: string;
  padding?: string;
  margin?: string;
  rounded?: string;
  flex?: string;
  shadow?: string;
}

export default function ColorDiv({
  children,
  color = "",
  padding = "",
  margin = "",
  rounded = "",
  flex = "",
  shadow = "",
}: ColorDivProps) {
  return (
    <div
      className={`${color} ${padding} ${margin} ${rounded} ${flex} ${shadow}`}
    >
      {children}
    </div>
  );
}
