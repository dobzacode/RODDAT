"use client";

import { CommunityDetailsProps, PostDetailProps } from "@/interface/interface";
import { BASE_URL, sortPosts } from "@/utils/utils";
import { mdiArrowRight } from "@mdi/js";
import Icon from "@mdi/react";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { v4 as uuidv4 } from "uuid";
import CommunitySnippet from "../community/CommunitySnippet";
import PostSnippet from "../post/PostSnippet";
import UserPostsAndCommunitiesSkeleton from "../skeleton/UserPostsAndCommunitiesSkeleton";
import Button from "../ui/button/Button";
import P from "../ui/text/P";

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
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<
    "upvote" | "downvote" | "comment" | "date" | null
  >(null);

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

      setCommunities(communitiesDetails);
      setIsLoading(false);
    };
    fetchPost();
    fetchCommunities();
  }, []);

  useEffect(() => {
    if (sortBy && posts) {
      const sortedPosts = sortPosts(posts, sortBy);
      setPosts(sortedPosts);
    }
  }, [sortBy]);

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
      <div className="flex flex-col">
        <div className="brutalism-border relative z-30 flex h-[60px] w-full justify-between overflow-hidden rounded-medium border-primary80    text-primary80 dark:border-primary1 dark:bg-primary80 dark:text-primary1">
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
        <div className="  relative ml-small">
          <div className="brutalism-border  relative z-20 flex h-[60px] w-1/4 justify-center overflow-hidden   rounded-b-medium border-primary80 border-t-transparent  bg-primary1 text-primary80   dark:border-primary1 dark:border-x-primary1 dark:border-t-transparent dark:bg-primary80 dark:text-primary1">
            <Button
              intent="pastelPrimary"
              size="small"
              transparent={true}
              className="relative   flex h-full items-center  justify-between gap-small rounded-b-small dark:bg-primary80"
              onClick={() => setIsSorting(!isSorting)}
            >
              <P>Sort by</P>
              <Icon className="mt-[2px]" path={mdiArrowRight} size={1.5}></Icon>
            </Button>
          </div>
          <CSSTransition
            in={isSorting}
            timeout={400}
            classNames="fade-horizontally"
            unmountOnExit
          >
            <ul className="fade-enter-done brutalism-border absolute left-[12.5rem] top-0 z-10 flex h-[60px] w-fit cursor-pointer items-center justify-center overflow-hidden rounded-br-sub-large border-t-0 border-primary80 bg-white  text-body font-medium text-primary90 dark:border-primary1 dark:bg-primary80  dark:text-primary1 ">
              <li className="h-full w-full">
                <Button
                  onClick={() => setSortBy("upvote")}
                  className="h-full w-full pl-sub-large pr-small duration-fast hover:bg-primary10 dark:hover:bg-primary30"
                  intent={"pastelPrimary"}
                  transparent={sortBy !== "upvote"}
                >
                  Upvote
                </Button>
              </li>
              <hr className="h-[60px] w-[1px] border-l border-primary80 opacity-20 dark:border-primary10"></hr>
              <li className="h-full w-full">
                <Button
                  onClick={() => setSortBy("downvote")}
                  className="h-full w-full px-medium duration-fast hover:bg-primary10 dark:hover:bg-primary30"
                  intent={"pastelPrimary"}
                  transparent={sortBy !== "downvote"}
                >
                  Downvote
                </Button>
              </li>
              <hr className="h-[60px] w-[1px] border-l border-primary80 opacity-20 dark:border-primary10"></hr>
              <li className="h-full w-full">
                <Button
                  onClick={() => setSortBy("comment")}
                  className="h-full w-full px-medium duration-fast hover:bg-primary10 dark:hover:bg-primary30"
                  intent={"pastelPrimary"}
                  transparent={sortBy !== "comment"}
                >
                  Comment
                </Button>
              </li>
              <hr className="h-[60px] w-[1px] border-l border-primary80 opacity-20 dark:border-primary10"></hr>
              <li className="h-full w-full">
                <Button
                  onClick={() => setSortBy("date")}
                  className="h-full w-full  px-medium duration-fast hover:bg-primary10 dark:hover:bg-primary30"
                  intent={"pastelPrimary"}
                  transparent={sortBy !== "date"}
                >
                  Date
                </Button>
              </li>
            </ul>
          </CSSTransition>
        </div>
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
                admin={community.community.communityUsers.filter((user) => {
                  return user.role === "ADMIN";
                })}
                userId={userInfo.id}
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
