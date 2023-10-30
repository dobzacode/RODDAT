"use client";

import { useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import Button from "../ui/button/Button";

export default function PostAndCommunitySorter({
  showContent,
  setSortPostBy,
  setSortCommunityBy,
  sortPostBy,
  isSorting,
  sortCommunityBy,
}: {
  showContent: "posts" | "communities";
  setSortPostBy: Function;
  setSortCommunityBy: Function;
  sortPostBy: string | null;
  isSorting: boolean;
  sortCommunityBy: string | null;
}) {
  const refCommunitySort = useRef(null);
  const refPostSort = useRef(null);
  return (
    <>
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
            className="fade-enter-done brutalism-border max-w-lg:mx-medium max-w-lg:rounded-b-sub-large max-w-lg:rounded-tr-sub-large left-[12.5rem] top-0 z-10 -mt-extra-small  flex h-[60px] cursor-pointer items-center justify-center overflow-hidden rounded-medium border-primary80 bg-white text-body font-medium text-primary90 dark:border-primary1 dark:bg-primary80 dark:text-primary1 tablet:mx-0 tablet:-ml-10 tablet:mr-10 tablet:mt-0 tablet:w-full tablet:flex-nowrap tablet:rounded-b-none tablet:rounded-br-sub-large tablet:rounded-tr-none  tablet:border-t-0 laptop:absolute laptop:ml-0 laptop:mr-0 laptop:w-fit    "
          >
            <li className="h-full w-full">
              <Button
                onClick={() => setSortPostBy("upvote")}
                className="h-full w-full  duration-fast hover:bg-primary10 dark:hover:bg-primary30 mobile-large:pl-sub-large mobile-large:pr-small"
                intent={"pastelPrimary"}
                transparent={sortPostBy !== "upvote"}
              >
                Upvote
              </Button>
            </li>
            <hr className="h-[60px] w-[1px] border-l border-primary80 opacity-20 dark:border-primary10"></hr>
            <li className="h-full w-full">
              <Button
                onClick={() => setSortPostBy("downvote")}
                className="h-full w-full duration-fast hover:bg-primary10 dark:hover:bg-primary30 mobile-large:px-medium"
                intent={"pastelPrimary"}
                transparent={sortPostBy !== "downvote"}
              >
                Downvote
              </Button>
            </li>
            <hr className="h-[60px] w-[1px] border-l border-primary80 opacity-20 dark:border-primary10"></hr>
            <li className="h-full w-full">
              <Button
                onClick={() => setSortPostBy("comment")}
                className="h-full w-full duration-fast hover:bg-primary10 dark:hover:bg-primary30 mobile-large:px-medium"
                intent={"pastelPrimary"}
                transparent={sortPostBy !== "comment"}
              >
                Comment
              </Button>
            </li>
            <hr className="h-[60px] w-[1px] border-l border-primary80 opacity-20 dark:border-primary10"></hr>
            <li className="h-full w-full">
              <Button
                onClick={() => setSortPostBy("date")}
                className="h-full w-full duration-fast hover:bg-primary10 dark:hover:bg-primary30 mobile-large:px-medium"
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
            className="fade-enter-done brutalism-border left-[12.5rem] top-0 z-10 -mt-extra-small flex h-[60px] cursor-pointer  items-center justify-center overflow-hidden rounded-medium border-primary80 bg-white text-body font-medium text-primary90 dark:border-primary1 dark:bg-primary80 dark:text-primary1 mobile-large:mx-medium mobile-large:rounded-b-sub-large mobile-large:rounded-tr-sub-large tablet:mx-0 tablet:-ml-10 tablet:mr-10 tablet:mt-0 tablet:w-full tablet:flex-nowrap tablet:rounded-b-none tablet:rounded-br-sub-large tablet:rounded-tr-none  tablet:border-t-0 laptop:absolute laptop:ml-0 laptop:mr-0 laptop:w-fit    "
          >
            <li className="h-full w-full">
              <Button
                onClick={() => setSortCommunityBy("visibility")}
                className="h-full w-full  duration-fast hover:bg-primary10 dark:hover:bg-primary30 mobile-large:pl-sub-large mobile-large:pr-small"
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
                className="h-full w-full duration-fast hover:bg-primary10 dark:hover:bg-primary30 mobile-large:px-medium"
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
                className="h-full w-full duration-fast hover:bg-primary10 dark:hover:bg-primary30 mobile-large:px-medium"
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
                className="h-full w-full  duration-fast hover:bg-primary10 dark:hover:bg-primary30 mobile-large:px-medium"
                intent={"pastelPrimary"}
                transparent={sortCommunityBy !== "date"}
              >
                Date
              </Button>
            </li>
          </ul>
        </CSSTransition>
      )}
    </>
  );
}
