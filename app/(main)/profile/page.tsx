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

  return (
    <main className="mx-extra-large flex justify-center gap-medium ">
      <section className="flex w-2/5 flex-col gap-sub-large ">
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
      <aside className="brutalism-border items  flex h-fit w-1/4 flex-col gap-small rounded-medium border-primary80 p-medium text-primary80">
        <UserInfoProfile></UserInfoProfile>
      </aside>
    </main>
  );
}
