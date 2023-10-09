import PostBar from "@/components/post/PostBar";
import PostInfo from "@/components/community/CommunityInfo";
import PostSkeleton from "@/components/post/PostSkeleton";
import { PostDetailProps } from "@/interface/interface";
import prisma from "@/prisma/client";
import { Post, User } from "@prisma/client";
import { Suspense } from "react";
import CommunityInfo from "@/components/community/CommunityInfo";

export async function generateStaticParams() {
  const posts: Post[] = await prisma.post.findMany();
  return posts.map((post) => ({
    postname: post.title,
  }));
}

export default async function PostPage({
  params,
}: {
  params: { postname: string; communityname: string };
}) {
  const res = await fetch(
    `http://localhost:3000/api/posts/details?post=${params.postname}&community=${params.communityname}`,
    {
      cache: "no-store",
    },
  );

  const { postDetails }: { postDetails: PostDetailProps } = await res.json();

  return (
    <main className="mx-small flex justify-center gap-medium laptop-large:mx-extra-large ">
      <section className="flex w-full flex-col gap-sub-large laptop:w-[600px]">
        <div className="flex w-full flex-col items-center justify-center gap-sub-large">
          <Suspense fallback={<PostSkeleton></PostSkeleton>}>
            <PostBar
              isPagePost={true}
              post_id={postDetails.post_id}
              createdAt={postDetails.createdAt}
              author={postDetails.author}
              community={postDetails.community}
              title={postDetails.title}
              content={postDetails.content}
              votes={postDetails.votes}
              comments={postDetails.comments}
            ></PostBar>
          </Suspense>
        </div>
      </section>
      <aside className="brutalism-border items  hidden h-fit w-[350px] flex-col gap-small rounded-medium border-primary80 p-medium text-primary80 laptop:flex">
        <CommunityInfo id={postDetails.community.community_id}></CommunityInfo>
      </aside>
    </main>
  );
}
