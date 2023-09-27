import { mdiAccount } from "@mdi/js";
import Icon from "@mdi/react";

export default function UserSnippet({}) {
  return (
    <div className="bg-white gap-extra-small text-body font-medium rounded-full flex justify-center items-center px-sub-medium brutalism-border py-1 border-primary80">
      <Icon path={mdiAccount} size={3}></Icon>

      <p>
        Corentin <br></br> Kittel
      </p>
    </div>
  );
}
