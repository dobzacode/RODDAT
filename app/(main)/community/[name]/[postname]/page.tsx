import PostBar from "@/components/post/PostBar";
import PostSkeleton from "@/components/post/PostSkeleton";
import prisma from "@/prisma/client";
import { Post } from "@prisma/client";
import { Suspense } from "react";

export async function generateStaticParams() {
  const posts: Post[] = await prisma.post.findMany();
  return posts.map((post) => ({
    postname: post.title,
  }));
}

export default function PostPage({
  params,
}: {
  params: { postname: string; name: string };
}) {
  return (
    <main className="mx-small flex justify-center gap-medium laptop-large:mx-extra-large ">
      <section className="flex w-full flex-col gap-sub-large laptop:w-[600px]">
        <div className="flex w-full flex-col items-center justify-center gap-sub-large">
          <Suspense fallback={<PostSkeleton></PostSkeleton>}>
            <PostBar post={post}></PostBar>
          </Suspense>
        </div>
      </section>
      <aside className="brutalism-border items  hidden h-fit w-[350px] flex-col gap-small rounded-medium border-primary80 p-medium text-primary80 laptop:flex"></aside>
    </main>
  );
}
