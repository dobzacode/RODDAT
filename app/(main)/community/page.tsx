import CommunityBar from "@/components/community/CommunityBar";
import { BASE_URL } from "@/utils/utils";
import { Community } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

export const revalidate = 0;

export default async function CommunityPage({}) {
  const res = await fetch(`${BASE_URL}/api/communities`);
  const { communities }: { communities: Community[] } = await res.json();

  return (
    <main className="mx-small flex justify-center gap-medium laptop-large:mx-extra-large">
      <section className="flex flex-col gap-sub-large laptop:w-[600px] ">
        <ul>
          {communities.map((community) => {
            return (
              <li
                className="relative flex h-full w-full flex-col gap-sub-large"
                key={uuidv4()}
              >
                <CommunityBar id={community.community_id}></CommunityBar>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
