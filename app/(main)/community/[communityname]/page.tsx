import CommunityInfo from "@/components/community/CommunityInfo";
import PostSection from "@/components/community/PostSection";
import NewPostBar from "@/components/home/NewPostBar";
import PopUp from "@/components/ui/div/PopUp";
import { PostDetailProps } from "@/interface/interface";
import prisma from "@/prisma/client";
import { BASE_URL } from "@/utils/utils";
import { Community, CommunityUser } from "@prisma/client";

export async function generateStaticParams() {
  const communities: Community[] = await prisma.community.findMany();
  return communities.map((community) => ({
    name: community.name,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { communityname: string };
}) {
  return {
    title: `${params.communityname}`,
  };
}

export const revalidate = 0;

export const dynamic = "force-dynamic";

export default async function CommunityPage({
  params,
}: {
  params: { communityname: string };
}) {
  const res = await fetch(
    `${BASE_URL}/api/posts/details?community=${params.communityname}`,
    {
      cache: "no-cache",
    },
  );
  const {
    posts,
    community: { community_id },
  }: {
    posts: PostDetailProps[];
    community: { community_id: string };
  } = await res.json();

  const resComDetails = await fetch(
    `${BASE_URL}/api/communities/details?id=${community_id}`,
    {
      cache: "no-cache",
    },
  );

  console.log(posts, "posts");

  const {
    community,
    postAmount,
    userAmount,
  }: {
    community: Community & { communityUsers: CommunityUser[] };
    postAmount: number;
    userAmount: number;
  } = await resComDetails.json();

  return (
    <main className="mx-small flex flex-wrap-reverse gap-small laptop:flex-wrap laptop:justify-center laptop:gap-medium laptop-large:mx-extra-large">
      <section className="flex flex-col gap-small tablet:gap-sub-large laptop:w-[600px] ">
        <NewPostBar
          communityId={community_id}
          communityVisibility={community.visibility}
          communityUsers={community.communityUsers}
          communityname={community.name}
        ></NewPostBar>

        <div className="flex w-full flex-col items-center justify-center gap-small laptop:gap-sub-large">
          <PostSection posts={posts}></PostSection>
        </div>
      </section>
      <aside className="w-full laptop:w-fit">
        <CommunityInfo
          postAmount={postAmount}
          userAmount={userAmount}
          community={community}
        ></CommunityInfo>
      </aside>
      <PopUp></PopUp>
    </main>
  );
}
