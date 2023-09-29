interface H2Props {
  children: any;
  type: string;
  textColor?: string;
  bgColor?: string;
}

export default function H2({
  children,
  type,
  textColor = "",
  bgColor = "",
}: H2Props) {
  return <h2 className={`${type} ${textColor} ${bgColor} `}>{children}</h2>;
}
