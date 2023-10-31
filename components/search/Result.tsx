"use client";

import { Community, Post, User, Vote } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import P from "../ui/text/P";
import Avatar from "../ui/Avatar";
import { getDateDifference } from "@/utils/utils";
import H2 from "../ui/text/H2";
import Icon from "@mdi/react";
import { mdiArrowRight, mdiCommentOutline, mdiImageOffOutline } from "@mdi/js";
import Comments from "../post/comment/Comments";
import VoteButton from "../post/VoteButton";
import CommunitySnippet from "../community/CommunitySnippet";
import Button from "../ui/button/Button";
import Image from "next/image";
import Link from "next/link";
import PostSkeleton from "../skeleton/PostSkeleton";
import SnippetSkeleton from "../skeleton/SnippetSkeleton";
import useBetterMediaQuery from "../hooks/useBetterMediaQuery";
import usePostsSort from "../hooks/usePostsSort";
import useCommunitiesSort from "../hooks/useCommunitiesSort";
import { CommunityDetailsProps, PostDetailProps } from "@/interface/interface";
import PostAndCommunitySorter from "../profile/PostAndCommunitySorter";

interface Result {
  users: User[];
  communities: CommunityDetailsProps[];
  posts: PostDetailProps[];
}

export default function Result() {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [result, setResult] = useState<Result | null>(null);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [sortPostBy, setSortPostBy] = useState<
    "upvote" | "downvote" | "comment" | "date" | null
  >(null);
  const [sortCommunityBy, setSortCommunityBy] = useState<
    "visibility" | "postAmount" | "userAmount" | "date" | null
  >(null);
  const isTablet = useBetterMediaQuery("(max-width: 768px)");
  const { sortedPosts } = usePostsSort(result?.posts, sortPostBy);
  const { sortedCommunities } = useCommunitiesSort(
    result?.communities,
    sortCommunityBy,
  );

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  useEffect(() => {
    setResult(null);
    const contentType = searchParams.get("type")
      ? searchParams.get("type")
      : "posts";
    const term = searchParams.get("term");
    const fetchResult = async () => {
      try {
        const res = term
          ? await fetch(`/api/search?term=${term}&type=${contentType}`)
          : await fetch(`/api/search?type=${contentType}`);
        const { content }: { content: Result } = await res.json();
        setResult(content);
      } catch (e) {}
    };
    fetchResult();
  }, [searchParams.get("term")]);

  useEffect(() => {
    setSortPostBy(null);
    setSortCommunityBy(null);
  }, [searchParams.get("type")]);

  useEffect(() => {
    isTablet ? setIsSorting(true) : "";
  }, [isTablet]);

  const generateSkeleton = (
    count: number,
    type: "community" | "post" | "user",
  ) => {
    const skeletons = [];
    switch (type) {
      case "post":
        for (let i = 0; i < count; i++) {
          skeletons.push(
            <PostSkeleton
              className="h-[195px] w-full min-[820px]:w-[800px]"
              key={uuidv4()}
            />,
          );
        }
      case "community":
        for (let i = 0; i < count; i++) {
          skeletons.push(<SnippetSkeleton key={uuidv4()} />);
        }
      case "user":
        for (let i = 0; i < count; i++) {
          skeletons.push(<SnippetSkeleton isUser={true} key={uuidv4()} />);
        }
    }
    return skeletons;
  };

  return (
    <section className="flex w-fit flex-col items-center gap-small">
      <div className="max-mobile-large: flex  w-full flex-col laptop:w-[800px]">
        <div className="brutalism-border relative z-[19] flex h-[60px] w-full justify-between overflow-hidden rounded-medium border-primary80    text-primary80 dark:border-primary1 dark:bg-primary80 dark:text-primary1">
          <Button
            intent="pastelPrimary"
            size="small"
            transparent={
              searchParams.get("type") === "posts" || !searchParams.get("type")
                ? false
                : true
            }
            onClick={() => {
              router.push(pathName + "?" + createQueryString("type", "posts"));
            }}
            className="h-full w-1/2 rounded-l-small border-r duration-fast hover:bg-primary10 dark:border-primary1 dark:hover:bg-primary30 max-[420px]:w-[100px]"
          >
            Posts
          </Button>
          <Button
            intent="pastelPrimary"
            size="small"
            transparent={
              searchParams.get("type") === "communities" ? false : true
            }
            onClick={() => {
              router.push(
                pathName + "?" + createQueryString("type", "communities"),
              );
            }}
            className="h-full w-1/2 duration-fast hover:bg-primary10 dark:border-primary1 dark:hover:bg-primary30 max-[420px]:w-[130px]"
          >
            Community
          </Button>
          <Button
            intent="pastelPrimary"
            size="small"
            transparent={searchParams.get("type") === "users" ? false : true}
            onClick={() => {
              router.push(pathName + "?" + createQueryString("type", "users"));
            }}
            className="h-full w-1/2 rounded-r-small border-l duration-fast hover:bg-primary10  dark:border-primary1 dark:hover:bg-primary30 max-[420px]:w-[80px]"
          >
            User
          </Button>
        </div>
        {searchParams.get("type") !== "users" ? (
          <div className="  relative flex w-full flex-col tablet:ml-small tablet:flex-row laptop:w-auto laptop:flex-row">
            <div className="brutalism-border relative z-20  ml-small flex h-[60px] w-fit justify-center overflow-hidden rounded-b-medium border-primary80 border-t-transparent   bg-primary1 text-primary80 dark:border-primary1  dark:border-x-primary1 dark:border-t-transparent   dark:bg-primary80 dark:text-primary1 tablet:ml-0 ">
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
              extraPaddingLeft="laptop:pl-[5.5rem]"
              isSorting={isSorting}
              setSortCommunityBy={setSortCommunityBy}
              setSortPostBy={setSortPostBy}
              showContent={searchParams.get("type")}
              sortPostBy={sortPostBy}
              sortCommunityBy={sortCommunityBy}
              className=""
            ></PostAndCommunitySorter>
          </div>
        ) : null}
      </div>

      {result && sortedPosts && sortedCommunities ? (
        <ul className="flex w-full max-w-[798px] flex-col items-center justify-center gap-small ">
          {searchParams.get("type") === "posts" ||
          (!searchParams.get("type") && sortedPosts) ? (
            <>
              {sortedPosts?.length > 0 ? (
                sortedPosts?.map((post) => {
                  return (
                    <li
                      className="brutalism-border  primary-hover dark:primary-hover-dark peer flex h-fit w-full  rounded-small border-primary80 dark:border-primary1"
                      key={uuidv4()}
                    >
                      <Link
                        href={`/community/${post.community.name}/${post.title}`}
                        className="flex w-full flex-col-reverse tablet:flex-row"
                      >
                        <div className="flex items-center   justify-center gap-extra-small rounded-l-small rounded-br-small rounded-tl-none bg-primary10 p-small dark:bg-primary90 tablet:w-[8%]   tablet:flex-col tablet:justify-start tablet:rounded-br-none tablet:rounded-tl-small tablet:rounded-tr-none">
                          <VoteButton
                            userId={null}
                            id={post.post_id}
                            to="post"
                            votes={post.votes}
                            upvotes={post.votes?.filter(
                              (vote: Vote) => vote.type === "UPVOTE",
                            )}
                            downvotes={post.votes?.filter(
                              (vote: Vote) => vote.type === "DOWNVOTE",
                            )}
                          ></VoteButton>
                        </div>

                        <div className="flex flex-col gap-small rounded-r-small p-small dark:bg-primary80 tablet:w-[92%]">
                          <div className="caption flex items-center gap-extra-small dark:text-primary1">
                            <Avatar
                              src={post.author.image}
                              alt={`${post.author.name} profil picture`}
                              size={2}
                              className="h-[20px] rounded-full"
                            ></Avatar>
                            <P type="caption">r/{post.community?.name}</P>
                            <P type="caption">{`Posted by u/${
                              post.author.name ? post.author.name : "deleted"
                            }`}</P>
                            <P type="caption">
                              {getDateDifference(post.createdAt)}
                            </P>
                          </div>
                          <div className=" flex max-h-[196px] flex-col gap-extra-small overflow-clip tablet:h-fit tablet:max-h-none">
                            <H2 type="sub-heading break-words">
                              {post.title.charAt(0).toUpperCase() +
                                post.title.slice(1).toLowerCase()}
                            </H2>
                            <P className="h-fit   break-words">
                              {post.content}
                            </P>
                          </div>
                          <div className="flex gap-small dark:text-primary1">
                            <div className="flex gap-extra-small">
                              <Icon path={mdiCommentOutline} size={1.4}></Icon>
                              <P>
                                {post.comments?.length > 1
                                  ? `${post.comments?.length} comments`
                                  : `${post.comments?.length} comment`}
                              </P>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                })
              ) : (
                <H2 type="heading">
                  {`No post was found with
                  ${searchParams.get("term") as string}`}
                </H2>
              )}
            </>
          ) : null}
          {searchParams.get("type") === "communities" ? (
            <>
              {sortedCommunities.length > 0 ? (
                sortedCommunities.map((community) => {
                  return (
                    <li key={uuidv4()} className="relative w-full">
                      <Link
                        href={`/community/${community.name}`}
                        className="brutalism-border primary-hover dark:primary-hover-dark peer flex h-fit w-full rounded-small  border-primary80 dark:border-primary1 dark:bg-primary80"
                      >
                        <div className="relative flex w-[47px] flex-col items-center   gap-extra-small rounded-l-small bg-primary10 p-small dark:bg-primary90">
                          {community.picture ? (
                            <Image
                              src={community.picture}
                              alt={`${community.name} picture`}
                              objectFit="cover"
                              fill
                              className="rounded-l-[14px] "
                            ></Image>
                          ) : (
                            <Icon path={mdiImageOffOutline}></Icon>
                          )}
                        </div>
                        <div className=" my-small ml-small flex flex-col gap-extra-small  dark:text-primary1">
                          <P type="caption">
                            Created {getDateDifference(community.createdAt)}
                          </P>
                          <H2 type="sub-heading">r/{community.name}</H2>
                          <P type="caption">
                            {community.postAmount}{" "}
                            {community.postAmount > 1 ? "Posts" : "Post"}{" "}
                            {community.userAmount} User
                          </P>
                        </div>
                      </Link>
                      {community.isNsfw ? (
                        <P className="absolute  right-6 top-1/2 z-10 -translate-y-1/2  transform text-error40 duration-fast  peer-hover:translate-x-2 peer-hover:scale-[110%] dark:text-error40">
                          NSFW
                        </P>
                      ) : null}
                      <P className="absolute  bottom-6 right-6 z-10 font-medium duration-fast  peer-hover:translate-x-2 peer-hover:scale-[110%]">
                        {community.visibility.charAt(0) +
                          community.visibility.slice(1).toLowerCase()}
                      </P>
                    </li>
                  );
                })
              ) : (
                <H2 type="heading">
                  {`No community was found with
                  ${searchParams.get("term") as string}`}
                </H2>
              )}
            </>
          ) : null}
          {searchParams.get("type") === "users" ? (
            <>
              {result.users.length > 0 ? (
                result.users.map((user) => {
                  return (
                    <li
                      key={uuidv4()}
                      className="brutalism-border primary-hover dark:primary-hover-dark peer relative flex h-fit w-full rounded-small border-primary80  p-extra-small dark:border-primary1 dark:bg-primary80"
                    >
                      <Link
                        href={`/user/${user.name}`}
                        key={uuidv4()}
                        className="flex items-center gap-extra-small"
                      >
                        <Avatar
                          alt={`${user.name} picture`}
                          src={
                            user.image
                              ? user.image
                              : "http://dummyimage.com/912x809.png/dddddd/000000"
                          }
                          size={3}
                          className=" h-[30px] rounded-full"
                        ></Avatar>

                        <div className="flex flex-col items-start gap-extra-small">
                          <P>u/{user.name}</P>
                          <P className="caption">User</P>
                        </div>
                      </Link>
                    </li>
                  );
                })
              ) : (
                <H2 type="heading">
                  {`No user was found with
                  ${searchParams.get("term") as string}`}
                </H2>
              )}
            </>
          ) : null}
        </ul>
      ) : null}
      {!result && (
        <>
          {
            <ul className="flex w-full flex-col items-center justify-center gap-small ">
              {searchParams.get("type") === "posts" || !searchParams.get("type")
                ? generateSkeleton(10, "post")
                : null}
              {searchParams.get("type") === "communities"
                ? generateSkeleton(10, "community")
                : null}
              {searchParams.get("type") === "users"
                ? generateSkeleton(10, "user")
                : null}
            </ul>
          }
        </>
      )}
    </section>
  );
}
