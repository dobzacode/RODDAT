import Icon from "@mdi/react";
import Link from "next/link";

interface SocialIconProps {
  mdiPath: string;
  linkTo: string;
  size: number;
}

export default function SocialIcon({ mdiPath, linkTo, size }: SocialIconProps) {
  return (
    <Link href={linkTo}>
      <Icon path={mdiPath} size={size} className="text-white"></Icon>
    </Link>
  );
}
