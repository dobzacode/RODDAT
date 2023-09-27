interface PProps {
  children: string | JSX.Element | number;
  textColor?: string;
  bgColor?: string;
  type?: "body" | "heading" | "sub-heading" | "caption";
}

export default function P({
  children,
  type = "body",
  textColor = "",
  bgColor = "",
}: PProps) {
  return <p className={`${type} ${textColor} ${bgColor}`}>{children}</p>;
}
