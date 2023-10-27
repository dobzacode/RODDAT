"use client";

import useSibling from "@/components/hooks/useIsSibling";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/button/Button";
import Input from "@/components/ui/form/Input";
import P from "@/components/ui/text/P";
import LogInModal from "@/components/user/LogInModal";
import { CommentDetail } from "@/interface/interface";
import { cn, getDateDifference } from "@/utils/utils";
import {
  mdiCancel,
  mdiCheck,
  mdiCommentOutline,
  mdiPencilOutline,
} from "@mdi/js";
import Icon from "@mdi/react";
import { Comment, Vote } from "@prisma/client";
import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import PostSkeleton from "../../skeleton/PostSkeleton";
import DeleteButton from "../DeleteButton";
import VoteButton from "../VoteButton";
import { CommentForm } from "./CommentForm";
import { useSession } from "next-auth/react";
import { BarLoader } from "react-spinners";
import { usePathname, useRouter } from "next/navigation";

export default function CommentBar({
  comment_id,
  content,
  className,
  userId,
}: {
  comment_id: string;
  content: string;
  className?: string;
  children?: ReactNode;
  userId: string | null;
}) {
  const [comment, setComment] = useState<CommentDetail | null>(null);
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [status, setStatus] = useState<"existing" | "deleted">("existing");
  const { isSibling } = useSibling(comment_id);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [edittedContent, setEdittedContent] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const res = await fetch(`/api/comments?comment_id=${comment_id}`, {
          cache: "no-store",
        });

        const { comment: data }: { comment: CommentDetail } = await res.json();

        setComment(data);
        setEdittedContent(data.content);
      } catch (e) {
        console.log(e);
      }
    };

    status === "existing" ? fetchComment() : null;
  }, [content, status]);

  const addNewComment = (newComment: Comment) => {
    if (!comment) return;
    const updatedComment = { ...comment };

    if (updatedComment.child_comments) {
      updatedComment.child_comments.unshift(newComment);
      setComment(updatedComment);
    }
  };

  const submitEdittedComment = async () => {
    setIsSubmitting(true);
    if (content === edittedContent) {
      setIsEditing(false);
      return setIsSubmitting(false);
    }
    try {
      const res = await fetch(`/api/comments`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          edittedContent,
          comment_id: comment?.comment_id,
          email: session?.user?.email,
        }),
      });

      const { updatedComment }: { updatedComment: Comment } = await res.json();
      setComment((prevComment) => {
        if (prevComment) {
          return {
            ...prevComment,
            content: updatedComment?.content,
            positivity: updatedComment?.positivity,
          };
        }
        return null;
      });
      setIsEditing(false);
      return router.push(
        `${pathname}?popup=true&type=modified&content=comment`,
      );
    } catch (e) {
      comment?.content ? setEdittedContent(comment.content) : "";
      console.log(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEdittedContent(e.target.value);
  };

  return (
    <>
      {status === "existing" && (
        <section
          className={cn(
            `relative z-50 ml-small flex h-full flex-col gap-sub-large tablet:ml-large `,
            className,
          )}
          id={comment_id}
        >
          {comment ? (
            <>
              <div
                className={cn(
                  "absolute -left-[4rem] -top-medium  flex h-full flex-col  items-center dark:text-primary1 tablet:-left-large tablet:top-auto tablet:z-0",
                  className,
                )}
              >
                <Avatar
                  src={comment?.author.image}
                  size={5}
                  className="relative z-[100] h-[50px] rounded-small tablet:z-10 "
                ></Avatar>

                {isSibling ? (
                  <div
                    className={`pointer-events-none relative z-0 -mb-14 block h-full w-[1px] border-x border-t border-primary20`}
                  ></div>
                ) : null}
              </div>
              <div
                className={cn(
                  "brutalism-border primary-hover peer relative flex h-full  w-full flex-col-reverse rounded-small border-primary80 dark:border-primary1 dark:bg-primary80 tablet:flex-row ",
                )}
              >
                <div className="flex items-center justify-center gap-extra-small rounded-b-small bg-primary10 p-small dark:bg-primary90  dark:text-primary1 tablet:flex-col tablet:justify-normal tablet:rounded-b-none tablet:rounded-l-small">
                  <VoteButton
                    votes={comment.votes}
                    upvotes={comment.votes?.filter(
                      (vote: Vote) => vote.type === "UPVOTE",
                    )}
                    downvotes={comment.votes?.filter(
                      (vote: Vote) => vote.type === "DOWNVOTE",
                    )}
                    id={comment_id}
                    to="comment"
                    userId={userId}
                  ></VoteButton>
                </div>
                <div
                  className={`relative -mr-medium flex h-full w-full flex-col justify-between gap-small  p-small dark:text-primary1 tablet:w-[90%] ${
                    isSubmitting ? "animate-pulse" : ""
                  }`}
                >
                  <div className="caption flex w-full items-center gap-extra-small">
                    <P className="" type="caption">{`Posted by u/${
                      comment?.author.name ? comment?.author.name : "deleted"
                    }`}</P>
                    <P
                      type="caption"
                      className="mr-small self-start mobile-large:mr-0"
                    >
                      {comment?.createdAt &&
                        getDateDifference(comment?.createdAt)}
                    </P>
                  </div>
                  {!isEditing ? (
                    <P className="break-words">{comment.content}</P>
                  ) : (
                    <Input
                      placeholder={comment.content}
                      required
                      disabled={isSubmitting}
                      type="textarea"
                      hiddenLabel={true}
                      className={`} dark:border-primary10/[.2] dark:bg-primary80 dark:text-primary1 dark:outline-primary10/[.2] 
                      dark:placeholder:text-primary10/[.4]`}
                      id="content"
                      value={edittedContent as string}
                      onChange={handleContentChange}
                      rows={3}
                      cols={50}
                    />
                  )}
                  <div className="flex flex-wrap justify-between">
                    <div className="flex  flex-wrap  gap-sub-medium">
                      {!isEditing && (
                        <Button
                          onClick={() =>
                            userId
                              ? setIsReplying(!isReplying)
                              : setIsOpen(true)
                          }
                          className="flex w-fit items-start gap-extra-small"
                        >
                          <Icon path={mdiCommentOutline} size={1.4}></Icon>
                          <P>Reply</P>
                        </Button>
                      )}
                      {!isEditing && userId === comment.author_id ? (
                        <Button
                          className="flex w-fit items-start gap-extra-small"
                          onClick={() => setIsEditing(!isEditing)}
                        >
                          <Icon path={mdiPencilOutline} size={1.4}></Icon>
                          <P>Edit</P>
                        </Button>
                      ) : null}
                    </div>
                    {isEditing && (
                      <div className="flex gap-sub-medium">
                        <Button
                          disabled={isSubmitting}
                          className="flex w-fit items-start gap-extra-small"
                          onClick={() => submitEdittedComment()}
                        >
                          <Icon path={mdiCheck} size={1.4}></Icon>
                          <P>Validate</P>
                        </Button>
                        <Button
                          disabled={isSubmitting}
                          className="flex w-fit items-start gap-extra-small "
                          onClick={() => {
                            setEdittedContent(comment.content);
                            setIsEditing(false);
                          }}
                        >
                          <Icon path={mdiCancel} size={1.4}></Icon>
                          <P>Cancel</P>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                {comment.author_id === userId && (
                  <div className="heading body absolute right-4 top-4 flex flex-col duration-fast peer-hover:translate-x-2  peer-hover:scale-[110%] ">
                    <DeleteButton
                      aria-disabled={isSubmitting}
                      setStatus={setStatus}
                      to="comment"
                      comment_id={comment_id}
                    ></DeleteButton>
                  </div>
                )}
              </div>

              {isReplying && userId ? (
                <CommentForm
                  className="ml-large"
                  parent_comment_id={comment.comment_id}
                  post_id={comment.post_id}
                  isReplying={isReplying}
                  setIsReplying={setIsReplying}
                  addNewComment={addNewComment}
                  userId={userId}
                />
              ) : null}
              {comment.child_comments &&
                comment.child_comments.map((comment) => {
                  return (
                    <CommentBar
                      userId={userId}
                      className="tablet:z-0"
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
      )}
      {!userId && (
        <LogInModal isOpen={isOpen} setIsOpen={setIsOpen}></LogInModal>
      )}
    </>
  );
}
