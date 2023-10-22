"use client";
import { BASE_URL, formatDateConverter } from "@/utils/utils";
import P from "../ui/text/P";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Community } from "@prisma/client";
import CommunitySkeleton from "./CommunitySkeleton";

export default function CommunityBar({
  id,
  community,
}: {
  id?: string | null;
  community: Community;
}) {
  return (
    <Link
      className="brutalism-border primary-hover dark:primary-hover-dark peer flex h-fit w-full  items-center justify-between rounded-small border-primary80  dark:border-primary20 dark:bg-primary90"
      href={`/community/${community?.name}`}
    >
      <div className="flex h-full w-fit  flex-col items-center gap-extra-small rounded-l-small bg-primary10 p-small dark:bg-primary90">
        <P className="body whitespace-nowrap font-medium ">
          r/{community?.name}
        </P>
      </div>

      <div className="flex flex-col gap-extra-small p-small">
        <P className="font-medium">Cake day</P>
        <P>
          {community?.createdAt
            ? formatDateConverter(community?.createdAt)
            : null}
        </P>
      </div>
    </Link>
  );
}
