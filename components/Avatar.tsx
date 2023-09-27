import { mdiAccount } from "@mdi/js";
import Icon from "@mdi/react";

export default function Avatar({ size = 3 }: { size?: number }) {
  return <Icon path={mdiAccount} size={size}></Icon>;
}
