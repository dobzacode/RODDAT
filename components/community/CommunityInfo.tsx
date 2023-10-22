import { formatDateConverter } from "@/utils/utils";
import P from "../ui/text/P";
import Link from "next/link";

export default async function CommunityInfo({ id }: { id?: string | null }) {
  const res = await fetch(
    `http://localhost:3000/api/communities/details?id=${id}`,
  );

  const { community, postAmount, userAmount } = await res.json();

  return (
    <>
      <div className="flex items-end gap-small">
        <Link
          href={`/community/${community.name}`}
          className="body w-full whitespace-nowrap font-medium laptop:block"
        >
          r/{community.name}
        </Link>
      </div>
      <hr className=" border border-primary80 opacity-20"></hr>

      <div className="flex flex-col gap-extra-small">
        <P className="font-medium">Cake day</P>
        <P>
          {community.createdAt
            ? formatDateConverter(community.createdAt)
            : null}
        </P>
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
