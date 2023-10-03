interface PProps {
  children: string | JSX.Element | number;
  textColor?: string;
  bgColor?: string;
  type?: "body" | "heading" | "sub-heading" | "caption";
  customCSS?: string;
}

export default function P({
  children,
  type = "body",
  textColor = "",
  bgColor = "",
  customCSS = "",
}: PProps) {
  return (
    <p className={`${type} ${textColor} ${bgColor} ${customCSS}`}>{children}</p>
  );
}
