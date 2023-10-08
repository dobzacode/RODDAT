import Icon from "@mdi/react";
import { IconProps } from "@mdi/react/dist/IconProps";
import Link, { LinkProps } from "next/link";
import { FC } from "react";

interface SocialIconProps extends LinkProps<IconProps> {
  mdiPath: string;

  size: number;
}

const SocialIcon: FC<SocialIconProps> = ({
  mdiPath,
  href,
  size,
  ...props
}: SocialIconProps) => {
  return (
    <Link href={href} {...props}>
      <Icon path={mdiPath} size={size} className="text-white"></Icon>
    </Link>
  );
};

export default SocialIcon;
