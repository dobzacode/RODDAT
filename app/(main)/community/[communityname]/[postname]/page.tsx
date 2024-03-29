import CommunityInfo from "@/components/community/CommunityInfo";
import CommentSection from "@/components/post/comment/CommentSection";
import PopUp from "@/components/ui/div/PopUp";
import { PostDetailProps } from "@/interface/interface";
import prisma from "@/prisma/client";
import { BASE_URL } from "@/utils/utils";
import { Community, CommunityUser, Post } from "@prisma/client";
import { redirect } from "next/navigation";

export const revalidate = 0;

export async function generateStaticParams() {
  const posts: Post[] = await prisma.post.findMany();
  return posts.map((post) => ({
    postname: post.title.replace(/\s/g, "_"),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { postname: string; communityname: string };
}) {
  return {
    title: `${params.postname}`,
  };
}

export default async function PostPage({
  params,
}: {
  params: { postname: string; communityname: string };
}) {
  const res = await fetch(
    `${BASE_URL}/api/posts/details?post=${params.postname.replace(
      /_/g,
      " ",
    )}&community=${params.communityname}`,
    {
      cache: "no-store",
    },
  );
  const { postDetails }: { postDetails: PostDetailProps } = await res.json();

  if (!postDetails) redirect(`/community/${params.communityname}`);

  const resComDetails = await fetch(
    `${BASE_URL}/api/communities/details?id=${postDetails?.community?.community_id}`,
  );

  const {
    community,
    postAmount,
    userAmount,
  }: {
    community: Community & { communityUsers: CommunityUser[] };
    postAmount: number;
    userAmount: number;
  } = await resComDetails.json();

  return (
    <main className="mx-small flex flex-wrap-reverse gap-small laptop:flex-wrap laptop:justify-center laptop:gap-medium laptop-large:mx-extra-large">
      <CommentSection
        communityVisibility={community.visibility}
        postDetails={postDetails}
        communityUsers={community.communityUsers}
      ></CommentSection>

      <aside className="w-full laptop:w-fit">
        <CommunityInfo
          community={community}
          postAmount={postAmount}
          userAmount={userAmount}
        ></CommunityInfo>
      </aside>
      <PopUp></PopUp>
    </main>
  );
}
