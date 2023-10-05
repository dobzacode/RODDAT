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
import { getDateDifference } from "@/utils/getDateDifference";
import getPostInformation from "@/utils/postUtils/getPostInformation";

export default async function PostBar({ post }: { post: Post }) {
  const { votes, author, commentCount } = await getPostInformation(post);

  const upvotes = votes.filter((vote) => vote.type === "UPVOTE");
  const downvotes = votes.filter((vote) => vote.type === "DOWNVOTE");

  return (
    <section className="flex brutalism-border border-primary80 rounded-small w-full primary-hover">
      <div className="flex gap-extra-small flex-col items-center  bg-primary10 rounded-l-small p-small">
        <Icon path={mdiArrowUp} size={1}></Icon>
        <P>{votes ? upvotes.length - downvotes.length : 0}</P>
        <Icon path={mdiArrowDown} size={1}></Icon>
      </div>
      <div className="flex flex-col gap-small p-small">
        <div className="flex gap-extra-small caption">
          <Avatar size={1}></Avatar>
          <P type="caption">r/nextjs</P>
          <P type="caption">{`Posted by u/${
            author?.name ? author?.name : "deleted"
          }`}</P>
          <P type="caption">{getDateDifference(post.createdAt)}</P>
        </div>
        <div className="flex flex-col gap-extra-small">
          <H2 type="sub-heading">{post.title}</H2>
          <P>{post.content}</P>
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
