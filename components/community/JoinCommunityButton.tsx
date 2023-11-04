"use client";

import { useRouter } from "next/navigation";
import Button from "../ui/button/Button";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Community, CommunityUser, User } from "@prisma/client";
import { cn } from "@/utils/utils";

export default function JoinCommunityButton({
  communityId,
  additionnalCb,
  className,
}: {
  communityId: string;
  additionnalCb?: Function;
  className: string;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAlreadyMember, setIsAlreadyMember] = useState<boolean>(false);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchInfo = async () => {
      if (!session) return;
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

      const isMember = community.communityUsers.some((community) => {
        return community.user_id !== userInfo.id;
      });
      setIsAlreadyMember(isMember);
      setIsLoading(false);
    };
    fetchInfo();
  });

  if (isLoading) return;

  return (
    <Button
      disabled={isLoading || isAlreadyMember}
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
      className={cn(
        "rounded-br-small tablet:rounded-r-small laptop:rounded-extra-small laptop:border-b-4 laptop:border-l laptop:border-r-4 laptop:border-t",
        className,
      )}
      hover={isLoading || isAlreadyMember ? false : true}
    >
      {isAlreadyMember ? "Member" : "Join"}
    </Button>
  );
}
