"use client";

import Avatar from "@/components/ui/Avatar";
import P from "@/components/ui/text/P";
import { CommentDetail } from "@/interface/interface";
import { getDateDifference } from "@/utils/utils";
import { mdiArrowDown, mdiArrowUp, mdiCommentOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { Comment, Post, Vote } from "@prisma/client";
import { useEffect, useState } from "react";
import PostSkeleton from "../PostSkeleton";
import Button from "@/components/ui/button/Button";
import { CommentForm } from "./CommentForm";

export default function CommentBar({
  content,
  comment_id,
  handleReplyClick,
  replyingTo,
}: {
  content: string;
  comment_id: string;
  handleReplyClick: Function;
  replyingTo: string;
}) {
  const [comment, setComment] = useState<CommentDetail | null>(null);
  const [childComments, setChildComments] = useState<Comment[] | null>(null);
  const [upvotes, setUpvotes] = useState<Vote[] | []>([]);
  const [downvotes, setDownvotes] = useState<Vote[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCommenting, setIsCommenting] = useState<boolean>(false);

  useEffect(() => {
    const fetchComment = async () => {
      const url: string = `/api/comments?comment_id=${comment_id}`;

      const res = await fetch(url);

      const { comment: data }: { comment: CommentDetail } = await res.json();

      setComment(data);

      setUpvotes(data.votes?.filter((vote: Vote) => vote.type === "UPVOTE"));

      setDownvotes(
        data.votes?.filter((vote: Vote) => vote.type === "DOWNVOTE"),
      );

      setIsLoading(false);
    };
    fetchComment();

    console.log(replyingTo);
  }, [content]);

  if (isLoading) return <PostSkeleton></PostSkeleton>;

  return (
    <section className="relative">
      <div className="absolute -left-large top-small flex  flex-col items-center">
        <Avatar
          src={comment?.author.image}
          size={5}
          className="rounded-small"
        ></Avatar>
        <div
          className={`pointer-events-none block h-[32rem] w-[1px] border border-primary20`}
        ></div>
      </div>
      <div className="brutalism-border primary-hover relative flex  h-[14rem] w-full rounded-small border-primary80">
        <div className="primary-hover flex flex-col items-center gap-extra-small  rounded-l-small bg-primary10 p-small">
          <Icon path={mdiArrowUp} size={1}></Icon>
          <P>{comment?.votes ? upvotes.length - downvotes.length : 0}</P>
          <Icon path={mdiArrowDown} size={1}></Icon>
        </div>
        <div className="flex flex-col justify-between gap-extra-small p-small">
          <div className="caption flex items-center gap-extra-small">
            <P type="caption">{`Posted by u/${
              comment?.author.name ? comment?.author.name : "deleted"
            }`}</P>
            <P type="caption">
              {comment?.createdAt && getDateDifference(comment?.createdAt)}
            </P>
          </div>
          <P>{content}</P>
          <Button
            onClick={() => {
              handleReplyClick(comment?.comment_id ? comment?.comment_id : "");
              setIsCommenting(true);
            }}
            className="flex w-fit items-start gap-extra-small"
          >
            <Icon path={mdiCommentOutline} size={1.4}></Icon>
            <P>Reply</P>
          </Button>
        </div>
      </div>
    </section>
  );
}
