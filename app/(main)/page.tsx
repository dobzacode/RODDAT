import NewPostBar from "@/components/home/NewPostBar";

import UserInfo from "@/components/home/UserInfoHome";

import { Suspense } from "react";
import PostSkeleton from "@/components/post/PostSkeleton";
import Posts from "@/components/post/Posts";

export default async function Home() {
  return (
    <main className="mx-small flex justify-center gap-medium laptop-large:mx-extra-large ">
      <section className="flex flex-col gap-sub-large laptop:w-[600px] ">
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
                <PostSkeleton />
              </>
            }
          >
            <Posts></Posts>
          </Suspense>
        </div>
      </section>
      <aside className="brutalism-border items  hidden h-fit w-[350px] flex-col gap-small rounded-medium border-primary80 p-medium text-primary80 laptop:flex">
        <UserInfo></UserInfo>
      </aside>
    </main>
  );
}
