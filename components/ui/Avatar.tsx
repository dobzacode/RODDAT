import { mdiAccount } from "@mdi/js";
import Icon from "@mdi/react";
import { getSession } from "next-auth/react";
import Image, { ImageProps } from "next/image";
import { FC } from "react";
import { IconProps } from "@mdi/react/dist/IconProps";

interface AvatarProps {
  size?: number;
  src?: string | null;
  alt?: string;
  path?: string;
}

const Avatar: FC<AvatarProps> = ({ size = 3, src, alt }) => {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt || "profile-picture"}
        width={30}
        height={30}
        className="my-extra-small mr-4 rounded-full"
      ></Image>
    );
  }

  return <Icon path={mdiAccount} size={size}></Icon>;
};

export default Avatar;
