import CommunityInfo from "@/components/community/CommunityInfo";
import PostSection from "@/components/community/PostSection";
import NewPostBar from "@/components/home/NewPostBar";
import PopUp from "@/components/ui/div/PopUp";
import H2 from "@/components/ui/text/H2";
import { PostDetailProps } from "@/interface/interface";
import prisma from "@/prisma/client";
import { BASE_URL } from "@/utils/utils";
import { Community } from "@prisma/client";

export async function generateStaticParams() {
  const communities: Community[] = await prisma.community.findMany();
  return communities.map((community) => ({
    name: community.name,
  }));
}

export const revalidate = 0;

export default async function CommunityPage({
  params,
}: {
  params: { communityname: string };
}) {
  const res = await fetch(
    `${BASE_URL}/api/posts/details?community=${params.communityname}`,
    {
      cache: "no-store",
    },
  );
  const {
    posts,
    community,
  }: { posts: PostDetailProps[]; community: Community } = await res.json();

  return (
    <main className="mx-small flex justify-center gap-medium laptop-large:mx-extra-large ">
      <section className="flex flex-col gap-sub-large laptop:w-[600px] ">
        <NewPostBar communityname={community.name}></NewPostBar>

        <div className="flex w-full flex-col items-center justify-center gap-sub-large">
          <PostSection posts={posts}></PostSection>
        </div>
      </section>
      <aside className="brutalism-border items  hidden h-fit w-[350px] flex-col gap-small rounded-medium border-primary80 p-medium text-primary80 dark:border-primary1 dark:bg-primary80 dark:text-primary1 laptop:flex">
        <CommunityInfo id={community.community_id}></CommunityInfo>
      </aside>
      <PopUp></PopUp>
    </main>
  );
}
