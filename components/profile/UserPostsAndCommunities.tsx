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
  const refCommunitySort = useRef(null);
  const refPostSort = useRef(null);

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
          {showContent === "posts" ? (
            <CSSTransition
              nodeRef={refPostSort}
              in={isSorting}
              timeout={400}
              classNames="fade-horizontally"
              unmountOnExit
            >
              <ul
                ref={refPostSort}
                className="fade-enter-done brutalism-border left-[12.5rem] top-0 z-10 mx-medium -mt-extra-small flex h-[60px]  cursor-pointer items-center justify-center overflow-hidden rounded-b-sub-large rounded-tr-sub-large border-primary80 bg-white text-body font-medium text-primary90 dark:border-primary1 dark:bg-primary80 dark:text-primary1 tablet:mx-0 tablet:-ml-10 tablet:mr-10 tablet:mt-0 tablet:w-full tablet:flex-nowrap tablet:rounded-b-none tablet:rounded-br-sub-large tablet:rounded-tr-none  tablet:border-t-0 laptop:absolute laptop:ml-0 laptop:mr-0 laptop:w-auto   "
              >
                <li className="h-full w-1/4">
                  <Button
                    onClick={() => setSortPostBy("upvote")}
                    className="h-full w-full pl-sub-large pr-small duration-fast hover:bg-primary10 dark:hover:bg-primary30"
                    intent={"pastelPrimary"}
                    transparent={sortPostBy !== "upvote"}
                  >
                    Upvote
                  </Button>
                </li>
                <hr className="h-[60px] w-[1px] border-l border-primary80 opacity-20 dark:border-primary10"></hr>
                <li className="h-full w-1/4">
                  <Button
                    onClick={() => setSortPostBy("downvote")}
                    className="h-full w-full px-medium duration-fast hover:bg-primary10 dark:hover:bg-primary30"
                    intent={"pastelPrimary"}
                    transparent={sortPostBy !== "downvote"}
                  >
                    Downvote
                  </Button>
                </li>
                <hr className="h-[60px] w-[1px] border-l border-primary80 opacity-20 dark:border-primary10"></hr>
                <li className="h-full w-1/4">
                  <Button
                    onClick={() => setSortPostBy("comment")}
                    className="h-full w-full px-medium duration-fast hover:bg-primary10 dark:hover:bg-primary30"
                    intent={"pastelPrimary"}
                    transparent={sortPostBy !== "comment"}
                  >
                    Comment
                  </Button>
                </li>
                <hr className="h-[60px] w-[1px] border-l border-primary80 opacity-20 dark:border-primary10"></hr>
                <li className="h-full w-1/4">
                  <Button
                    onClick={() => setSortPostBy("date")}
                    className="h-full w-full  px-medium duration-fast hover:bg-primary10 dark:hover:bg-primary30"
                    intent={"pastelPrimary"}
                    transparent={sortPostBy !== "date"}
                  >
                    Date
                  </Button>
                </li>
              </ul>
            </CSSTransition>
          ) : (
            <CSSTransition
              in={isSorting}
              timeout={400}
              classNames="fade-horizontally"
              unmountOnExit
              nodeRef={refCommunitySort}
            >
              <ul
                ref={refCommunitySort}
                className="fade-enter-done brutalism-border left-[12.5rem] top-0 z-10 mx-medium -mt-extra-small flex h-[60px]  cursor-pointer items-center justify-center overflow-hidden rounded-b-sub-large rounded-tr-sub-large border-primary80 bg-white text-body font-medium text-primary90 dark:border-primary1 dark:bg-primary80 dark:text-primary1 tablet:mx-0 tablet:-ml-10 tablet:mr-10 tablet:mt-0 tablet:w-full tablet:flex-nowrap tablet:rounded-b-none tablet:rounded-br-sub-large tablet:rounded-tr-none  tablet:border-t-0 laptop:absolute laptop:ml-0 laptop:mr-0 laptop:w-fit   "
              >
                <li className="h-full w-full">
                  <Button
                    onClick={() => setSortCommunityBy("visibility")}
                    className="h-full w-full pl-sub-large pr-small duration-fast hover:bg-primary10 dark:hover:bg-primary30"
                    intent={"pastelPrimary"}
                    transparent={sortCommunityBy !== "visibility"}
                  >
                    Visibility
                  </Button>
                </li>
                <hr className="h-[60px] w-[1px] border-l border-primary80 opacity-20 dark:border-primary10"></hr>
                <li className="h-full w-full">
                  <Button
                    onClick={() => setSortCommunityBy("postAmount")}
                    className="h-full w-full px-medium duration-fast hover:bg-primary10 dark:hover:bg-primary30"
                    intent={"pastelPrimary"}
                    transparent={sortCommunityBy !== "postAmount"}
                  >
                    Post
                  </Button>
                </li>
                <hr className="h-[60px] w-[1px] border-l border-primary80 opacity-20 dark:border-primary10"></hr>
                <li className="h-full w-full">
                  <Button
                    onClick={() => setSortCommunityBy("userAmount")}
                    className="h-full w-full px-medium duration-fast hover:bg-primary10 dark:hover:bg-primary30"
                    intent={"pastelPrimary"}
                    transparent={sortCommunityBy !== "userAmount"}
                  >
                    User
                  </Button>
                </li>
                <hr className="h-[60px] w-[1px] border-l border-primary80 opacity-20 dark:border-primary10"></hr>
                <li className="h-full w-full">
                  <Button
                    onClick={() => setSortCommunityBy("date")}
                    className="h-full w-full  px-medium duration-fast hover:bg-primary10 dark:hover:bg-primary30"
                    intent={"pastelPrimary"}
                    transparent={sortCommunityBy !== "date"}
                  >
                    Date
                  </Button>
                </li>
              </ul>
            </CSSTransition>
          )}
        </div>
      </div>

      <ul className="flex w-full flex-col  justify-center gap-sub-large">
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
