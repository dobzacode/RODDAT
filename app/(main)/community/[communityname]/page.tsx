import CommunityInfo from "@/components/community/CommunityInfo";
import NewPostBar from "@/components/home/NewPostBar";
import PostSection from "@/components/community/PostSection";
import PostSkeleton from "@/components/post/PostSkeleton";
import { PostDetailProps } from "@/interface/interface";
import prisma from "@/prisma/client";
import { Community } from "@prisma/client";
import { Suspense } from "react";

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
    `http://localhost:3000/api/posts/details?community=${params.communityname}`,
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
          <Suspense
            fallback={
              <>
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
              </>
            }
          >
            <PostSection posts={posts}></PostSection>
          </Suspense>
        </div>
      </section>
      <aside className="brutalism-border items  hidden h-fit w-[350px] flex-col gap-small rounded-medium border-primary80 p-medium text-primary80 dark:border-primary20 dark:bg-primary80 dark:text-primary1 laptop:flex">
        <CommunityInfo id={community.community_id}></CommunityInfo>
      </aside>
    </main>
  );
}
