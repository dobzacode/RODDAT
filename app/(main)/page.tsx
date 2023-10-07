import NewPostBar from "@/components/home/NewPostBar";
import HomePosts from "@/components/home/HomePosts";

import UserInfo from "@/components/home/UserInfoHome";
import prisma from "@/prisma/client";
import { Post } from "@prisma/client";
import { Suspense } from "react";
import PostSkeleton from "@/components/post/PostSkeleton";

export default async function Home() {
  return (
    <main className="mx-extra-large flex justify-center gap-medium ">
      <section className="flex w-2/5 flex-col gap-sub-large ">
        <NewPostBar></NewPostBar>

        <div className="flex w-full flex-col items-center justify-center gap-sub-large">
          <Suspense
            fallback={
              <>
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
              </>
            }
          >
            <HomePosts></HomePosts>
          </Suspense>
        </div>
      </section>
      <aside className="brutalism-border items  flex h-fit w-1/4 flex-col gap-small rounded-medium border-primary80 p-medium text-primary80">
        <UserInfo></UserInfo>
      </aside>
    </main>
  );
}
