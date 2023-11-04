import { BASE_URL, formatDateConverter } from "@/utils/utils";
import P from "../ui/text/P";
import Link from "next/link";
import Image from "next/image";
import { Community } from "@prisma/client";
import JoinCommunityButton from "./JoinCommunityButton";

export default async function CommunityInfo({
  community,
  postAmount,
  userAmount,
}: {
  community: Community;
  postAmount: number;
  userAmount: number;
}) {
  return (
    <div className="brutalism-border items flex h-fit w-full flex-wrap justify-between overflow-hidden rounded-medium border-primary80 text-primary80 dark:border-primary1 dark:bg-primary80 dark:text-primary1 max-mobile-medium:gap-small tablet:flex-nowrap tablet:gap-small laptop:ml-0 laptop:w-fit laptop:flex-col laptop:justify-start laptop:gap-small  laptop:p-medium">
      {community?.picture && (
        <div className="relative h-[60px] w-full rounded-t-small tablet:h-[80px] tablet:w-1/3 tablet:rounded-l-small tablet:rounded-tr-none laptop:h-[300px] laptop:w-[300px] laptop:rounded-small">
          <Image
            quality={100}
            fill
            sizes="100vw"
            className="rounded-t-small tablet:rounded-l-small tablet:rounded-tr-none laptop:rounded-small"
            style={{
              objectFit: "cover",
            }}
            alt={`${community?.name} image`}
            src={community?.picture}
          ></Image>
        </div>
      )}
      <div className="flex h-full w-full items-center justify-between max-[520px]:flex-wrap max-mobile-medium:gap-small min-[520px]:gap-extra-small tablet:h-auto tablet:w-2/3  tablet:gap-small laptop:w-auto laptop:flex-col laptop:items-start laptop:justify-start">
        <div className="flex h-full flex-col gap-extra-small px-small min-[520px]:w-1/3 min-[520px]:text-center  tablet:h-auto tablet:px-0 tablet:py-0 laptop:w-auto laptop:text-start">
          <div className="flex gap-extra-small laptop:items-end">
            <Link
              href={`/community/${community?.name}`}
              className="body w-full whitespace-nowrap font-medium laptop:block"
            >
              r/{community?.name}
            </Link>
          </div>
          <div className="flex w-full justify-center gap-sub-medium laptop:justify-start">
            <P className="flex gap-2">
              <span className="font-medium">{postAmount}</span>Post
            </P>
            <P className="flex gap-2">
              <span className="font-medium">{userAmount}</span>User
            </P>
          </div>
        </div>
        <hr className="border border-primary80 opacity-20 max-mobile-medium:w-full mobile-medium:h-[60px] min-[520px]:h-large tablet:h-full laptop:block laptop:h-auto laptop:w-full"></hr>
        <div className="flex h-full justify-between gap-extra-small min-[520px]:w-1/3 min-[520px]:items-center  tablet:w-2/3 laptop:h-auto laptop:w-full  laptop:items-start">
          <div className="flex w-full flex-col gap-extra-small px-sub-medium max-mobile-medium:px-small min-[520px]:w-1/3 min-[520px]:justify-center tablet:w-full tablet:justify-start  tablet:px-0 laptop:w-auto">
            <P className="whitespace-nowrap font-medium tablet:text-center laptop:text-start">
              Cake day
            </P>
            <P className="whitespace-nowrap tablet:text-center laptop:text-start">
              {community?.createdAt
                ? formatDateConverter(community?.createdAt)
                : null}
            </P>
          </div>
          <JoinCommunityButton
            className="latop:h-auto hidden h-full w-1/2 py-medium tablet:block tablet:w-auto tablet:py-small"
            communityId={community.community_id}
          ></JoinCommunityButton>
        </div>
        <JoinCommunityButton
          className="w-1/3 max-[520px]:w-full  min-[520px]:py-medium tablet:hidden"
          communityId={community.community_id}
        ></JoinCommunityButton>
      </div>
    </div>
  );
}
