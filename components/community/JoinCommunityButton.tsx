"use client";

import { useRouter } from "next/navigation";
import Button from "../ui/button/Button";

export default function JoinCommunityButton({
  communityId,
  additionnalCb,
}: {
  communityId: string;
  additionnalCb?: Function;
}) {
  const router = useRouter();

  return (
    <Button
      onClick={async () => {
        const res = await fetch(
          `/api/communities/subscribe?id=${communityId}`,
          { method: "POST" },
        );
        const data = await res.json;
        if (additionnalCb) {
          additionnalCb();
          return setTimeout(() => {
            router.refresh();
          }, 500);
        }
        router.refresh();
      }}
      intent="pastelPrimary"
      size="small"
      rounded="small"
      hover={true}
      modifier={"brutalism"}
    >
      Join
    </Button>
  );
}
