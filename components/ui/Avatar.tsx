import { mdiAccount } from "@mdi/js";
import Icon from "@mdi/react";
import { getSession } from "next-auth/react";
import Image, { ImageProps } from "next/image";
import { FC } from "react";
import { IconProps } from "@mdi/react/dist/IconProps";
import { cn } from "@/utils/utils";

interface AvatarProps {
  className?: string;
  size?: number;
  src?: string | null;
  alt?: string;
  path?: string;
}

const Avatar: FC<AvatarProps> = ({
  className,
  size = 3,
  src,
  alt,
  ...props
}) => {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt || "profile-picture"}
        width={size * 10}
        height={size * 10}
        className={className}
      ></Image>
    );
  }

  return <Icon path={mdiAccount} className={className} size={size}></Icon>;
};

export default Avatar;
