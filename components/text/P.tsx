interface PProps {
  children: string | JSX.Element;
  textColor?: string;
  bgColor?: string;
  type?: "body" | "heading" | "sub-heading";
}

export default function P({
  children,
  type = "body",
  textColor = "",
  bgColor = "",
}: PProps) {
  return <p className={`${type} ${textColor} ${bgColor}`}>{children}</p>;
}
