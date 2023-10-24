import Image from "next/image";
import Link from "next/link";
import P from "../ui/text/P";
import H2 from "../ui/text/H2";
import { getDateDifference } from "@/utils/utils";
import Icon from "@mdi/react";
import { mdiImageOffOutline } from "@mdi/js";

interface CommunitySnippetProps {
  visibility: "PUBLIC" | "PRIVATE" | "RESTRICTED";
  isNsfw: boolean;
  picture?: string | null;
  description?: string | null;
  name: string;
  userAmount: number;
  postAmount: number;
  createdAt: Date;
}

export default function CommunitySnippet({
  visibility,
  isNsfw,
  picture,

  name,
  postAmount,
  userAmount,
  createdAt,
}: CommunitySnippetProps) {
  return (
    <li className="relative w-full">
      <Link
        href={`/community/${name}`}
        className="brutalism-border primary-hover dark:primary-hover-dark peer relative flex h-fit w-full rounded-small  border-primary80 dark:border-primary1 dark:bg-primary80"
      >
        <div className="relative flex w-[47px] flex-col items-center   gap-extra-small rounded-l-small bg-primary10 p-small dark:bg-primary90">
          {picture ? (
            <Image
              src={picture}
              alt={`${name} picture`}
              objectFit="cover"
              fill
              className="rounded-l-small "
            ></Image>
          ) : (
            <Icon path={mdiImageOffOutline}></Icon>
          )}
        </div>

        <div className=" my-small ml-small flex flex-col gap-extra-small  dark:text-primary1">
          <P type="caption">Created {getDateDifference(createdAt)}</P>
          <H2 type="sub-heading">{name}</H2>
          <P type="caption">
            {postAmount} {postAmount > 1 ? "Posts" : "Post"} {userAmount} User
          </P>
        </div>
      </Link>
      {isNsfw ? (
        <P className="absolute right-6 top-4 font-medium text-error40">NSFW</P>
      ) : null}
      <P className="absolute bottom-6 right-6 font-medium ">
        {visibility.charAt(0) + visibility.slice(1).toLowerCase()}
      </P>
    </li>
  );
}
