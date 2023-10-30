import { getDateDifference } from "@/utils/utils";
import { mdiCog, mdiImageOffOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { CommunityUser } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import H2 from "../ui/text/H2";
import P from "../ui/text/P";

interface CommunitySnippetProps {
  visibility: "PUBLIC" | "PRIVATE" | "RESTRICTED";
  isNsfw: boolean;
  picture?: string | null;
  description?: string | null;
  name: string;
  userAmount: number;
  postAmount: number;
  createdAt: Date;
  userId?: string;
  admin?: CommunityUser[];
}

export default function CommunitySnippet({
  visibility,
  isNsfw,
  picture,
  name,
  postAmount,
  userAmount,
  createdAt,
  userId,
  admin,
}: CommunitySnippetProps) {
  return (
    <li className="relative w-full">
      <div className="brutalism-border primary-hover dark:primary-hover-dark peer relative flex h-fit w-full rounded-small  border-primary80 dark:border-primary1 dark:bg-primary80">
        <div className="relative flex w-[47px] flex-col items-center   gap-extra-small rounded-l-small bg-primary10 p-small dark:bg-primary90">
          {picture ? (
            <Image
              src={picture}
              alt={`${name} picture`}
              objectFit="cover"
              fill
              className="rounded-l-[14px] "
            ></Image>
          ) : (
            <Icon path={mdiImageOffOutline}></Icon>
          )}
        </div>

        <Link
          href={`/community/${name}`}
          className=" my-small ml-small flex flex-col gap-extra-small  dark:text-primary1"
        >
          <P type="caption">Created {getDateDifference(createdAt)}</P>
          <H2 type="sub-heading">r/{name}</H2>
          <P type="caption">
            {postAmount} {postAmount > 1 ? "Posts" : "Post"} {userAmount} User
          </P>
        </Link>
      </div>
      {admin &&
      admin.some((admin) => {
        return admin.user_id === userId;
      }) ? (
        <Link
          href={`/modify/community/${name}`}
          className="absolute  right-6 top-3 z-10 duration-fast  hover:scale-[110%] peer-hover:translate-x-2 peer-hover:scale-[110%]"
        >
          <Icon path={mdiCog} size={1.4}></Icon>
        </Link>
      ) : null}
      {isNsfw ? (
        <P className="absolute  right-6 top-1/2 z-10 -translate-y-1/2  transform text-error40 duration-fast  peer-hover:translate-x-2 peer-hover:scale-[110%] dark:text-error40">
          NSFW
        </P>
      ) : null}
      <P className="absolute  bottom-6 right-6 z-10 font-medium duration-fast  peer-hover:translate-x-2 peer-hover:scale-[110%]">
        {visibility.charAt(0) + visibility.slice(1).toLowerCase()}
      </P>
    </li>
  );
}
