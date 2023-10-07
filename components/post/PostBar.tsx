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
import { Post } from "@prisma/client";
import { getDateDifference } from "@/utils/utils";
import getPostInformation from "@/utils/postUtils/getPostInformation";
import React, { FC, HTMLProps } from "react";

interface PostBarProps extends HTMLProps<HTMLElement> {
  post: Post;
}

export default async function PostBar({ post }: PostBarProps) {
  const { votes, author, commentCount } =
    process.env.NODE_ENV === "production"
      ? await getPostInformation(post)
      : { votes: [], author: null, commentCount: 0 };

  const upvotes = votes.filter((vote) => vote.type === "UPVOTE");
  const downvotes = votes.filter((vote) => vote.type === "DOWNVOTE");

  return (
    <section className="brutalism-border primary-hover flex h-fit w-full rounded-small border-primary80">
      <div className="flex flex-col items-center gap-extra-small  rounded-l-small bg-primary10 p-small">
        <Icon path={mdiArrowUp} size={1}></Icon>
        <P>{votes ? upvotes.length - downvotes.length : 0}</P>
        <Icon path={mdiArrowDown} size={1}></Icon>
      </div>
      <div className="flex w-[92%] flex-col gap-small p-small ">
        <div className="caption flex gap-extra-small">
          <Avatar size={1}></Avatar>
          <P type="caption">r/nextjs</P>
          <P type="caption">{`Posted by u/${
            author?.name ? author?.name : "deleted"
          }`}</P>
          <P type="caption">{getDateDifference(post.createdAt)}</P>
        </div>
        <div className="flex h-fit flex-col gap-extra-small">
          <H2 type="sub-heading">{post.title}</H2>
          <P className="break-words">{post.content}</P>
        </div>
        <div className="flex gap-small">
          <div className="flex gap-extra-small">
            <Icon path={mdiCommentOutline} size={1.4}></Icon>
            <P>
              {commentCount > 1
                ? `${commentCount} comments`
                : `${commentCount} comment`}
            </P>
          </div>
          <div className="flex gap-extra-small">
            <Icon path={mdiShareOutline} size={1.4}></Icon>
            <P>Share</P>
          </div>
        </div>
      </div>
    </section>
  );
}
