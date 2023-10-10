import {
  mdiArrowDown,
  mdiArrowUp,
  mdiCommentOutline,
  mdiShareOutline,
} from "@mdi/js";
import Icon from "@mdi/react";
import Avatar from "../ui/Avatar";
import H2 from "../ui/text/H2";
import P from "../ui/text/P";
import prisma from "@/prisma/client";
import { Post, Vote } from "@prisma/client";
import { cn, getDateDifference } from "@/utils/utils";
import getPostInformation from "@/utils/postUtils/getPostInformation";
import React, { FC, HTMLProps } from "react";
import { PostDetailProps } from "@/interface/interface";
import Link from "next/link";

export default async function PostBar({
  createdAt,
  author,
  post_id,
  community,
  title,
  content,
  votes,
  comments,
  isPagePost = false,
}: PostDetailProps & { isPagePost?: boolean }) {
  const upvotes = votes?.filter((vote) => vote.type === "UPVOTE");
  const downvotes = votes?.filter((vote) => vote.type === "DOWNVOTE");

  console.log(author);

  const postContent = () => {
    return (
      <>
        {!isPagePost && (
          <Avatar src={author.image} size={1} className="rounded-full"></Avatar>
        )}
        <div className="caption flex items-center gap-extra-small">
          <P type="caption">r/{community?.name}</P>
          <P type="caption">{`Posted by u/${
            author.name ? author.name : "deleted"
          }`}</P>
          <P type="caption">{getDateDifference(createdAt)}</P>
        </div>
        <div className="flex h-fit flex-col gap-extra-small">
          <H2 type="sub-heading">
            {title.charAt(0).toUpperCase() + title.slice(1).toLowerCase()}
          </H2>
          <P className="break-words">{content}</P>
        </div>
        <div className="flex gap-small">
          <div className="flex gap-extra-small">
            <Icon path={mdiCommentOutline} size={1.4}></Icon>
            <P>
              {comments?.length > 1
                ? `${comments?.length} comments`
                : `${comments?.length} comment`}
            </P>
          </div>
          <div className="flex gap-extra-small">
            <Icon path={mdiShareOutline} size={1.4}></Icon>
            <P>Share</P>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <section className="relative flex h-fit w-full">
        {isPagePost && (
          <div className="absolute -left-large top-small flex flex-col items-center">
            <Avatar
              src={author.image}
              size={5}
              className="rounded-small"
            ></Avatar>
            <div className="h-[35rem] w-[1px] border border-primary20"></div>
          </div>
        )}
        <div className="brutalism-border primary-hover flex h-fit w-full  rounded-small border-primary80">
          <div className="flex flex-col items-center gap-extra-small  rounded-l-small bg-primary10 p-small">
            <Icon path={mdiArrowUp} size={1}></Icon>
            <P>{votes ? upvotes.length - downvotes.length : 0}</P>
            <Icon path={mdiArrowDown} size={1}></Icon>
          </div>
          {!isPagePost ? (
            <Link
              href={{
                pathname: `/community/${community.name}/${title.replace(
                  /\s/g,
                  "_",
                )}`,
              }}
              className="flex w-[92%] flex-col gap-small p-small "
            >
              {postContent()}
            </Link>
          ) : (
            <div className="flex w-[92%] flex-col gap-small p-small ">
              {postContent()}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
