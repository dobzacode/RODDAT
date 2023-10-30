import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { getServerSession } from "next-auth";

import { Suspense } from "react";

import PostSkeleton from "@/components/skeleton/PostSkeleton";
import ProfileInfo from "@/components/profile/ProfileInfo";
import { BASE_URL } from "@/utils/utils";
import { User } from "@prisma/client";
import UserPostAndCommunities from "@/components/profile/UserPostsAndCommunities";
import { CommunityDetailsProps, PostDetailProps } from "@/interface/interface";
import { redirect } from "next/navigation";

const fetchUserInfo = async (userEmail: string) => {
  const resUser = await fetch(`${BASE_URL}/api/user?email=${userEmail}`, {
    cache: "no-store",
  });

  const {
    userInfo,
    posts: postAmount,
    communities,
  }: {
    userInfo: User;
    posts: number;
    communities: number;
  } = await resUser.json();

  return { userInfo, postAmount, communities };
};

const fetchUserPosts = async (userId: string) => {
  const resPost = await fetch(`${BASE_URL}/api/posts/details?user=${userId}`, {
    cache: "no-store",
  });

  const { posts }: { posts: PostDetailProps[] } = await resPost.json();
  return { posts };
};

const fetchUserCommunities = async (userId: string) => {
  const resCom = await fetch(
    `${BASE_URL}/api/communities/details?user=${userId}`,
    {
      cache: "no-store",
    },
  );

  const {
    communitiesDetails,
  }: { communitiesDetails: CommunityDetailsProps[] } = await resCom.json();

  return { communitiesDetails };
};

export const revalidate = 0;

export default async function ProfilePage({}) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/");
  }

  const { userInfo, postAmount, communities } = await fetchUserInfo(
    session?.user?.email,
  );
  const { posts } = await fetchUserPosts(userInfo.id);
  const { communitiesDetails } = await fetchUserCommunities(userInfo.id);

  console.log(communitiesDetails);

  return (
    <main className="mx-extra-small flex justify-center gap-medium mobile-large:mx-small laptop-large:mx-extra-large ">
      <UserPostAndCommunities
        userPosts={posts}
        userCommunities={communitiesDetails}
        userInfo={userInfo}
      ></UserPostAndCommunities>

      <aside className="brutalism-border items  hidden h-fit w-[350px] flex-col gap-small rounded-medium border-primary80 p-medium text-primary80 dark:border-primary1 dark:bg-primary80 dark:text-primary1 laptop:flex">
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
