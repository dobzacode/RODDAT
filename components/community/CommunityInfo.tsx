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
  console.log(userAmount);
  return (
    <>
      {community?.picture && (
        <div className="relative h-[300px] w-full rounded-small">
          <Image
            quality={100}
            fill
            sizes="100vw"
            className="rounded-small"
            style={{
              objectFit: "cover",
            }}
            alt={`${community?.name} image`}
            src={community?.picture}
          ></Image>
        </div>
      )}
      <div className="flex items-end gap-small">
        <Link
          href={`/community/${community?.name}`}
          className="body w-full whitespace-nowrap font-medium laptop:block"
        >
          r/{community?.name}
        </Link>
      </div>
      <hr className=" border border-primary80 opacity-20"></hr>

      <div className="flex justify-between">
        <div className="flex flex-col gap-extra-small">
          <P className="font-medium">Cake day</P>
          <P>
            {community?.createdAt
              ? formatDateConverter(community?.createdAt)
              : null}
          </P>
        </div>
        <JoinCommunityButton
          communityId={community.community_id}
        ></JoinCommunityButton>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col gap-extra-small">
          <P className="flex gap-extra-small">
            <span className="font-medium">{postAmount}</span> Post
          </P>
        </div>
        <div className="flex flex-col gap-extra-small">
          <P className="flex gap-extra-small">
            <span className="font-medium">{userAmount}</span> User
          </P>
        </div>
      </div>
    </>
  );
}
