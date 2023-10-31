"use client";

import { useRouter } from "next/navigation";
import Button from "../ui/button/Button";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Community, CommunityUser, User } from "@prisma/client";

export default function JoinCommunityButton({
  communityId,
  additionnalCb,
}: {
  communityId: string;
  additionnalCb?: Function;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAlreadyMember, setIsAlreadyMember] = useState<boolean>(false);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchInfo = async () => {
      const resUser = await fetch(`/api/user?email=${session?.user?.email}`, {
        cache: "no-store",
      });
      const {
        userInfo,
      }: {
        userInfo: User;
      } = await resUser.json();

      const resComDetails = await fetch(
        `/api/communities/details?id=${communityId}`,
      );

      const {
        community,
      }: {
        community: Community & { communityUsers: CommunityUser[] };
      } = await resComDetails.json();

      console.log(community.communityUsers);
      console.log(userInfo.id);

      const isMember = community.communityUsers.some((community) => {
        return community.user_id !== userInfo.id;
      });
      setIsAlreadyMember(isMember);
    };
    fetchInfo();
  });

  if (isLoading || isAlreadyMember) return;

  return (
    <Button
      disabled={isLoading}
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
