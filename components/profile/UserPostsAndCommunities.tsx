"use client";

import { useEffect, useState } from "react";
import PostSnippet from "../post/PostSnippet";
import { BASE_URL } from "@/utils/utils";
import { User } from "@prisma/client";
import { CommunityDetailsProps, PostDetailProps } from "@/interface/interface";
import { v4 as uuidv4 } from "uuid";
import Button from "../ui/button/Button";
import PostSnippetSkeleton from "../skeleton/SnippetSkeleton";
import UserPostsAndCommunitiesSkeleton from "../skeleton/UserPostsAndCommunitiesSkeleton";
import CommunitySnippet from "../community/CommunitySnippet";

export default function UserPostAndCommunities({
  userInfo,
  postAmount,
  communityAmount,
}: {
  userInfo: User;
  postAmount: number;
  communityAmount: number;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<null | PostDetailProps[]>(null);
  const [communities, setCommunities] = useState<
    null | CommunityDetailsProps[]
  >(null);
  const [showContent, setShowContent] = useState<"communities" | "posts">(
    "posts",
  );

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(
        `${BASE_URL}/api/posts/details?user=${userInfo.id}`,
      );

      const { posts }: { posts: PostDetailProps[] } = await res.json();
      setPosts(posts);
    };
    const fetchCommunities = async () => {
      const res = await fetch(
        `${BASE_URL}/api/communities/details?user=${userInfo.id}`,
      );

      const {
        communitiesDetails,
      }: { communitiesDetails: CommunityDetailsProps[] } = await res.json();
      console.log(communitiesDetails);
      setCommunities(communitiesDetails);
      setIsLoading(false);
    };
    fetchPost();
    fetchCommunities();
  }, []);

  if (isLoading)
    return (
      <UserPostsAndCommunitiesSkeleton
        communityAmount={communityAmount}
        showContent={showContent}
        postAmount={postAmount}
      ></UserPostsAndCommunitiesSkeleton>
    );

  return (
    <section className="flex w-full flex-col gap-sub-large laptop:w-[600px]">
      <div className="brutalism-border flex h-[60px] w-full justify-between overflow-hidden rounded-medium border-primary80   text-primary80 dark:border-primary1 dark:bg-primary80 dark:text-primary1">
        <Button
          intent="pastelPrimary"
          size="small"
          transparent={showContent === "posts" ? false : true}
          className="h-full w-1/2 rounded-l-small border-r dark:border-primary1 "
          onClick={() => setShowContent("posts")}
        >
          Posts
        </Button>
        <Button
          intent="pastelPrimary"
          size="small"
          transparent={showContent === "communities" ? false : true}
          className="h-full w-1/2 rounded-r-small border-l dark:border-primary1"
          onClick={() => setShowContent("communities")}
        >
          Community
        </Button>
      </div>
      <ul className="flex w-full flex-col  justify-center gap-sub-large">
        {showContent === "posts" &&
          posts?.map((post) => {
            return (
              <PostSnippet
                post_id={post.post_id}
                createdAt={post.createdAt}
                communityname={post.community.name}
                title={post.title}
                votes={post.votes}
                commentamount={post.comments.length}
                key={uuidv4()}
              ></PostSnippet>
            );
          })}
        {showContent === "communities" &&
          communities?.map((community) => {
            return (
              <CommunitySnippet
                name={community.community.name}
                visibility={community.community.visibility}
                isNsfw={community.community.isNsfw}
                picture={community.community.picture}
                description={community.community.description}
                postAmount={community.postAmount}
                createdAt={community.community.createdAt}
                userAmount={community.userAmount}
                key={uuidv4()}
              ></CommunitySnippet>
            );
          })}
      </ul>
    </section>
  );
}
