"use client";

import Avatar from "@/components/ui/Avatar";
import P from "@/components/ui/text/P";
import { CommentDetail } from "@/interface/interface";
import { cn, countSections, getDateDifference } from "@/utils/utils";
import { mdiArrowDown, mdiArrowUp, mdiCommentOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { Comment, Post, User, Vote } from "@prisma/client";
import { ReactNode, Suspense, useEffect, useState } from "react";
import PostSkeleton from "../PostSkeleton";
import Button from "@/components/ui/button/Button";
import { CommentForm } from "./CommentForm";

export default function CommentBar({
  comment_id,
  content,
  className,
  children,
  sibling,
  setIsLoading,
}: {
  comment_id: string;
  content: string;
  className?: string;
  children?: ReactNode;
  sibling: number;
  setIsLoading: Function;
}) {
  const [upvotes, setUpvotes] = useState<Vote[] | []>([]);
  const [downvotes, setDownvotes] = useState<Vote[] | []>([]);
  const [comment, setComment] = useState<CommentDetail | null>(null);
  const [isReplying, setIsReplying] = useState(false);
  const [isSibling, setIsSibling] = useState<boolean>(false);

  useEffect(() => {
    const fetchComment = async () => {
      const res = await fetch(`/api/comments?comment_id=${comment_id}`);

      const { comment: data }: { comment: CommentDetail } = await res.json();

      setUpvotes(data.votes?.filter((vote: Vote) => vote.type === "UPVOTE"));

      setDownvotes(
        data.votes?.filter((vote: Vote) => vote.type === "DOWNVOTE"),
      );

      setComment(data);

      const element = document.getElementById(comment_id);
      if (element?.parentElement?.childElementCount)
        setIsSibling(element?.parentElement?.childElementCount > 0);

      if (data.child_comments.length === 0) {
        setIsLoading();
      }
    };
    fetchComment();
  }, [content]);

  const addNewComment = (newComment: Comment) => {
    if (!comment) return;
    const updatedComment = { ...comment };

    if (updatedComment.child_comments) {
      updatedComment.child_comments.unshift(newComment);
      setComment(updatedComment);
    }
  };

  return (
    <section
      className={cn(
        `relative z-50 flex h-full w-full flex-col gap-sub-large `,
        className,
      )}
      id={comment_id}
    >
      {comment ? (
        <>
          <div>
            <div
              className={cn(
                "absolute -left-large z-0 flex  h-full flex-col items-center",
                className,
              )}
            >
              <Avatar
                src={comment?.author.image}
                size={5}
                className="relative z-10 rounded-small"
              ></Avatar>
              {sibling > 1 ? (
                <div
                  className={`pointer-events-none relative z-0 -mb-12 block h-full w-[1px] border-x border-t border-primary20`}
                ></div>
              ) : null}
            </div>
            <div
              className={cn(
                "brutalism-border primary-hover relative flex  h-full w-full rounded-small border-primary80",
              )}
            >
              <div className="flex flex-col items-center gap-extra-small  rounded-l-small bg-primary10 p-small">
                <Icon path={mdiArrowUp} size={1}></Icon>
                <P>{comment?.votes ? upvotes.length - downvotes.length : 0}</P>
                <Icon path={mdiArrowDown} size={1}></Icon>
              </div>
              <div className="flex h-full flex-col justify-between gap-small p-small">
                <div className="caption flex items-center gap-extra-small">
                  <P type="caption">{`Posted by u/${
                    comment?.author.name ? comment?.author.name : "deleted"
                  }`}</P>
                  <P type="caption">
                    {comment?.createdAt &&
                      getDateDifference(comment?.createdAt)}
                  </P>
                </div>
                <P>{comment.content}</P>
                <Button
                  onClick={() => setIsReplying(!isReplying)}
                  className="flex w-fit items-start gap-extra-small"
                >
                  <Icon path={mdiCommentOutline} size={1.4}></Icon>
                  <P>Reply</P>
                </Button>
              </div>
            </div>
          </div>
          {isReplying && (
            <CommentForm
              className="ml-large"
              parent_comment_id={comment.comment_id}
              post_id={comment.post_id}
              isReplying={isReplying}
              setIsReplying={setIsReplying}
              addNewComment={addNewComment}
            />
          )}
          {comment.child_comments &&
            comment.child_comments.map((comment) => {
              return (
                <CommentBar
                  setIsLoading={setIsLoading}
                  sibling={isSibling ? 2 : 1}
                  className="z-0 pl-large"
                  comment_id={comment.comment_id}
                  content={comment.content}
                  key={comment.comment_id}
                ></CommentBar>
              );
            })}
        </>
      ) : (
        <PostSkeleton></PostSkeleton>
      )}
    </section>
  );
}
