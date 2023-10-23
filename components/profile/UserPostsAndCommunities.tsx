"use client";

import { useEffect, useState } from "react";
import PostSnippet from "../post/PostSnippet";
import { BASE_URL } from "@/utils/utils";
import { User } from "@prisma/client";
import { CommunityDetailsProps, PostDetailProps } from "@/interface/interface";
import { v4 as uuidv4 } from "uuid";
import Button from "../ui/button/Button";

export default function UserPostAndCommunities({
  userInfo,
}: {
  userInfo: User;
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
    };
    fetchPost();
    fetchCommunities();
    setIsLoading(false);
  }, []);

  if (isLoading) return;

  if (!posts && !communities) return;

  return (
    <section className="flex w-full flex-col gap-sub-large laptop:w-[600px]">
      <div className="brutalism-border flex h-full w-full justify-between overflow-hidden rounded-medium  border-primary80 text-primary80 dark:border-primary20 dark:bg-primary80 dark:text-primary1">
        <Button
          intent="pastelPrimary"
          size="small"
          transparent={showContent === "posts" ? false : true}
          className="shadow-in h-full w-1/2 rounded-l-small border-r"
          onClick={() => setShowContent("posts")}
        >
          Posts
        </Button>
        <Button
          intent="pastelPrimary"
          size="small"
          transparent={showContent === "communities" ? false : true}
          className="h-full w-1/2 rounded-r-small border-l"
          onClick={() => setShowContent("communities")}
        >
          Community
        </Button>
      </div>
      <ul className="flex w-full flex-col items-center justify-center gap-sub-large">
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
            return <h1 key={uuidv4()}>{community.community.name}</h1>;
          })}
      </ul>
    </section>
  );
}
