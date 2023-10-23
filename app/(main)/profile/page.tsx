import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { getServerSession } from "next-auth";

import { Suspense } from "react";

import PostSkeleton from "@/components/post/PostSkeleton";
import Posts from "@/components/post/Posts";
import ProfileInfo from "@/components/profile/ProfileInfo";
import { User } from "@prisma/client";
import { BASE_URL } from "@/utils/utils";
import { PostDetailProps } from "@/interface/interface";
import PostBar from "@/components/post/PostBar";
import { v4 as uuidv4 } from "uuid";
import PostSnippet from "@/components/post/PostSnippet";

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

  const resPost = await fetch(
    `${BASE_URL}/api/posts/details?user=${userInfo.id}`,
  );

  const { posts }: { posts: PostDetailProps[] } = await resPost.json();

  console.log(posts);

  return (
    <main className="mx-small flex justify-center gap-medium laptop-large:mx-extra-large ">
      <section className="flex w-full flex-col gap-sub-large laptop:w-[600px]">
        <ul className="flex w-full flex-col items-center justify-center gap-sub-large">
          <Suspense fallback={skeletons()}>
            {posts.map((post) => {
              return (
                <PostSnippet
                  picture={post.picture}
                  userId={userInfo?.id}
                  positivity={post.positivity}
                  post_id={post.post_id}
                  createdAt={post.createdAt}
                  author_id={post.author_id}
                  author={post.author}
                  community={post.community}
                  title={post.title}
                  content={post.content}
                  votes={post.votes}
                  comments={post.comments}
                  key={uuidv4()}
                ></PostSnippet>
              );
            })}
          </Suspense>
        </ul>
      </section>
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
