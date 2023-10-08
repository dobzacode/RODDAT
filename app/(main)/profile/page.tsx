import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PostBar from "@/components/post/PostBar";
import UserInfo from "@/components/home/UserInfoHome";
import getUserPosts from "@/utils/postUtils/getUserPosts";

import { getServerSession } from "next-auth";
import { v4 as uuidv4 } from "uuid";
import UserInfoProfile from "@/components/user/UserInfoProfile";
import { Suspense } from "react";
import ProfilePosts from "@/components/profile/ProfilePosts";
import PostSkeleton from "@/components/post/PostSkeleton";

export default async function ProfilePage({}) {
  const session = await getServerSession(authOptions);

  console.log(session);

  return (
    <main className="mx-small flex justify-center gap-medium laptop-large:mx-extra-large ">
      <section className="flex w-full flex-col gap-sub-large laptop:w-[600px]">
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
            <ProfilePosts session={session}></ProfilePosts>
          </Suspense>
        </div>
      </section>
      <aside className="brutalism-border items  hidden h-fit w-[350px] flex-col gap-small rounded-medium border-primary80 p-medium text-primary80 laptop:flex">
        <UserInfoProfile session={session}></UserInfoProfile>
      </aside>
    </main>
  );
}
