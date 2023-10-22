import { BASE_URL, formatDateConverter } from "@/utils/utils";
import P from "../ui/text/P";
import Link from "next/link";

export default async function CommunityBar({ id }: { id?: string | null }) {
  const res = await fetch(`${BASE_URL}/api/communities/details?id=${id}`);

  const { community, postAmount, userAmount } = await res.json();

  return (
    <Link
      className="brutalism-border primary-hover dark:primary-hover-dark peer flex h-fit w-full  items-center justify-between rounded-small border-primary80  dark:border-primary20 dark:bg-primary90"
      href={`/community/${community.name}`}
    >
      <div className="flex h-full w-fit  flex-col items-center gap-extra-small rounded-l-small bg-primary10 p-small dark:bg-primary90">
        <P className="body whitespace-nowrap font-medium ">
          r/{community.name}
        </P>
      </div>

      <div className="flex flex-col gap-extra-small p-small">
        <P className="font-medium">Cake day</P>
        <P>
          {community.createdAt
            ? formatDateConverter(community.createdAt)
            : null}
        </P>
      </div>
      <div className="flex flex-col justify-between gap-extra-small p-small">
        <div className="flex flex-col gap-extra-small">
          <P className="flex gap-extra-small">
            <span className="font-medium">{postAmount}</span> Post
          </P>
        </div>
        <div className="flex flex-col gap-extra-small ">
          <P className="flex gap-extra-small">
            <span className="font-medium">{userAmount}</span> User
          </P>
        </div>
      </div>
    </Link>
  );
}
