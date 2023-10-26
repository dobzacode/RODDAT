import { mdiAccount } from "@mdi/js";
import Icon from "@mdi/react";
import Image from "next/image";
import { FC } from "react";

interface AvatarProps {
  className?: string;
  size?: number;
  src?: string | null;
  alt?: string;
  path?: string;
  fill?: boolean;
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
        {...props}
      ></Image>
    );
  }

  return <Icon path={mdiAccount} className={className} size={size}></Icon>;
};

export default Avatar;
