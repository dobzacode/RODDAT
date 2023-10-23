import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { getServerSession } from "next-auth";

import { Suspense } from "react";

import PostSkeleton from "@/components/post/PostSkeleton";
import ProfileInfo from "@/components/profile/ProfileInfo";
import { BASE_URL } from "@/utils/utils";
import { User } from "@prisma/client";
import UserPostAndCommunities from "@/components/profile/UserPostsAndCommunities";

export const revalidate = 0;

export default async function ProfilePage({}) {
  const session = await getServerSession(authOptions);

  const resUser = await fetch(
    `${BASE_URL}/api/user?email=${session?.user?.email}`,
    {
      cache: "no-store",
    },
  );

  const {
    userInfo,
    posts: postAmount,
    communities,
  }: {
    userInfo: User;
    posts: number;
    communities: number;
  } = await resUser.json();

  const skeletons = () => {
    const skeletonElements = [];
    for (let i = 0; i < postAmount; i++) {
      skeletonElements.push(<PostSkeleton />);
    }
    return skeletonElements;
  };

  return (
    <main className="mx-small flex justify-center gap-medium laptop-large:mx-extra-large ">
      <Suspense fallback={skeletons()}>
        <UserPostAndCommunities userInfo={userInfo}></UserPostAndCommunities>
      </Suspense>

      <aside className="brutalism-border items  hidden h-fit w-[350px] flex-col gap-small rounded-medium border-primary80 p-medium text-primary80 dark:border-primary20 dark:bg-primary80 dark:text-primary1 laptop:flex">
        <ProfileInfo
          email={session?.user?.email}
          name={session?.user?.name}
          image={session?.user?.image}
          createdAt={userInfo?.createdAt}
          postAmount={postAmount}
          communityAmount={communities}
        ></ProfileInfo>
      </aside>
    </main>
  );
}
