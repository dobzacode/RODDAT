import { mdiAccount } from "@mdi/js";
import Icon from "@mdi/react";
import { getSession } from "next-auth/react";
import Image from "next/image";

export default function Avatar({
  size = 3,
  src,
}: {
  size?: number;
  src?: string | null;
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt="profile-picture"
        width={30}
        height={30}
        className="rounded-full mr-4 my-extra-small"
      ></Image>
    );
  }

  return <Icon path={mdiAccount} size={size}></Icon>;
}
