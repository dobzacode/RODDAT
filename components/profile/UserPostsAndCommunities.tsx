"use client";

import { CommunityDetailsProps, PostDetailProps } from "@/interface/interface";
import { mdiArrowRight } from "@mdi/js";
import Icon from "@mdi/react";
import { User } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { v4 as uuidv4 } from "uuid";
import CommunitySnippet from "../community/CommunitySnippet";
import usePostsSort from "../hooks/usePostsSort";
import PostSnippet from "../post/PostSnippet";
import Button from "../ui/button/Button";
import P from "../ui/text/P";
import useCommunitiesSort from "../hooks/useCommunitiesSort";
import useBetterMediaQuery from "../hooks/useBetterMediaQuery";
import PostAndCommunitySorter from "./PostAndCommunitySorter";

export default function UserPostAndCommunities({
  userInfo,
  userCommunities,
  userPosts,
}: {
  userInfo: User;
  userCommunities: CommunityDetailsProps[];
  userPosts: PostDetailProps[];
}) {
  const [showContent, setShowContent] = useState<"communities" | "posts">(
    "posts",
  );
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [sortPostBy, setSortPostBy] = useState<
    "upvote" | "downvote" | "comment" | "date" | null
  >(null);
  const [sortCommunityBy, setSortCommunityBy] = useState<
    "visibility" | "postAmount" | "userAmount" | "date" | null
  >(null);
  const isTablet = useBetterMediaQuery("(max-width: 768px)");
  const { sortedPosts } = usePostsSort(userPosts, sortPostBy);
  const { sortedCommunities } = useCommunitiesSort(
    userCommunities,
    sortCommunityBy,
  );

  useEffect(() => {
    setSortPostBy(null);
    setSortCommunityBy(null);
  }, [showContent]);

  useEffect(() => {
    isTablet ? setIsSorting(true) : "";
  }, [isTablet]);

  return (
    <section className="flex w-full flex-col gap-sub-large laptop:w-[600px]">
      <div className="flex flex-col">
        <div className="brutalism-border relative z-[19] flex h-[60px] w-full justify-between overflow-hidden rounded-medium border-primary80    text-primary80 dark:border-primary1 dark:bg-primary80 dark:text-primary1">
          <Button
            intent="pastelPrimary"
            size="small"
            transparent={showContent === "posts" ? false : true}
            className="h-full w-1/2 rounded-l-small border-r duration-fast hover:bg-primary10 dark:border-primary1 dark:hover:bg-primary30 "
            onClick={() => setShowContent("posts")}
          >
            Posts
          </Button>
          <Button
            intent="pastelPrimary"
            size="small"
            transparent={showContent === "communities" ? false : true}
            className="h-full w-1/2 rounded-r-small border-l duration-fast hover:bg-primary10 dark:border-primary1 dark:hover:bg-primary30"
            onClick={() => setShowContent("communities")}
          >
            Community
          </Button>
        </div>
        <div className="  relative flex w-full flex-col tablet:ml-small tablet:flex-row laptop:block laptop:w-auto">
          <div className="brutalism-border relative z-20  ml-small flex h-[60px] w-fit justify-center overflow-hidden rounded-b-medium border-primary80   border-t-transparent bg-primary1 text-primary80  dark:border-primary1 dark:border-x-primary1   dark:border-t-transparent dark:bg-primary80 dark:text-primary1 tablet:ml-0 laptop:w-1/4">
            <Button
              intent="pastelPrimary"
              size="small"
              transparent={true}
              className="relative   flex h-full items-center  justify-between gap-small rounded-b-small dark:bg-primary80"
              onClick={() => (!isTablet ? setIsSorting(!isSorting) : "")}
            >
              <P>Sort by</P>
              <Icon
                className="mt-[2px] hidden tablet:block"
                path={mdiArrowRight}
                size={1.5}
              ></Icon>
            </Button>
          </div>
          <PostAndCommunitySorter
            isSorting={isSorting}
            setSortCommunityBy={setSortCommunityBy}
            setSortPostBy={setSortPostBy}
            showContent={showContent}
            sortPostBy={sortPostBy}
            sortCommunityBy={sortCommunityBy}
          ></PostAndCommunitySorter>
        </div>
      </div>

      <ul className="flex w-full flex-col  justify-center gap-small">
        {showContent === "posts"
          ? sortedPosts?.map((post) => {
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
            })
          : null}
        {showContent === "communities" &&
          sortedCommunities?.map((community) => {
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
