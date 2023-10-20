import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { getServerSession } from "next-auth";

import { Suspense } from "react";

import PostSkeleton from "@/components/post/PostSkeleton";
import Posts from "@/components/post/Posts";
import ProfileInfo from "@/components/profile/ProfileInfo";
import { User } from "@prisma/client";

export const revalidate = 0;

export default async function ProfilePage({}) {
  const session = await getServerSession(authOptions);

  const res = await fetch(
    `http://localhost:3000/api/user?email=${session?.user?.email}`,
    {
      cache: "no-store",
    },
  );

  const {
    userInfo,
    posts,
    communities,
  }: { userInfo: User; posts: number; communities: number } = await res.json();

  console.log(session?.user);

  const skeletons = () => {
    const skeletonElements = [];
    for (let i = 0; i < posts; i++) {
      skeletonElements.push(<PostSkeleton />);
    }
    return skeletonElements;
  };

  return (
    <main className="mx-small flex justify-center gap-medium laptop-large:mx-extra-large ">
      <section className="flex w-full flex-col gap-sub-large laptop:w-[600px]">
        <div className="flex w-full flex-col items-center justify-center gap-sub-large">
          <Suspense fallback={skeletons()}>
            <Posts userid={userInfo?.id}></Posts>
          </Suspense>
        </div>
      </section>
      <aside className="brutalism-border items  hidden h-fit w-[350px] flex-col gap-small rounded-medium border-primary80 p-medium text-primary80 dark:border-primary20 dark:bg-primary80 dark:text-primary1 laptop:flex">
        <ProfileInfo
          email={session?.user?.email}
          name={session?.user?.name}
          image={session?.user?.image}
          createdAt={userInfo?.createdAt}
          postAmount={posts}
          communityAmount={communities}
        ></ProfileInfo>
      </aside>
    </main>
  );
}
