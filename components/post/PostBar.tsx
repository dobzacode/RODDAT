import { PostDetailProps } from "@/interface/interface";
import { getDateDifference } from "@/utils/utils";
import { mdiCommentOutline, mdiShareOutline } from "@mdi/js";
import Icon from "@mdi/react";
import Link from "next/link";
import { ReactNode } from "react";
import Avatar from "../ui/Avatar";
import H2 from "../ui/text/H2";
import P from "../ui/text/P";
import DeleteButton from "./DeleteButton";
import VoteButton from "./VoteButton";
import ThreadLine from "./ThreadLine";

interface PostBarProps extends Omit<PostDetailProps, "community_id"> {
  isPagePost?: boolean;
  children?: ReactNode;
  isLoading?: boolean;
  userId: string | null;
  author_id: string;
}

export default function PostBar({
  createdAt,
  author,
  post_id,
  community,
  title,
  content,
  votes,
  comments,
  isPagePost = false,
  children,
  isLoading,
  userId,
  author_id,
}: PostBarProps & {}) {
  const upvotes = votes?.filter((vote) => vote.type === "UPVOTE");
  const downvotes = votes?.filter((vote) => vote.type === "DOWNVOTE");

  console.log(isLoading);

  const postContent = () => {
    return (
      <>
        <div className="caption flex items-center gap-extra-small dark:text-primary1">
          {!isPagePost && (
            <Avatar
              src={author.image}
              size={2}
              className="rounded-full"
            ></Avatar>
          )}
          <P type="caption">r/{community?.name}</P>
          <P type="caption">{`Posted by u/${
            author.name ? author.name : "deleted"
          }`}</P>
          <P type="caption">{getDateDifference(createdAt)}</P>
        </div>
        <div className=" flex h-fit flex-col gap-extra-small">
          <H2 type="sub-heading">
            {title.charAt(0).toUpperCase() + title.slice(1).toLowerCase()}
          </H2>
          <P className="break-words">{content}</P>
        </div>
        <div className="flex gap-small dark:text-primary1">
          <div className="flex gap-extra-small">
            <Icon path={mdiCommentOutline} size={1.4}></Icon>
            <P>
              {comments?.length > 1
                ? `${comments?.length} comments`
                : `${comments?.length} comment`}
            </P>
          </div>
          <div className="flex gap-extra-small dark:text-primary1">
            <Icon path={mdiShareOutline} size={1.4}></Icon>
            <P>Share</P>
          </div>
        </div>
      </>
    );
  };

  return (
    <div
      id={post_id}
      className="relative flex h-full w-full flex-col gap-sub-large "
    >
      {isPagePost && (
        <div className="absolute -left-large flex h-full flex-col items-center">
          <Avatar
            src={author.image}
            size={5}
            className="rounded-small"
          ></Avatar>
          <ThreadLine
            id={post_id}
            comments_length={comments.length}
            isLoading={isLoading}
          ></ThreadLine>
        </div>
      )}
      <section className="relative flex h-fit w-full dark:text-primary1">
        <div className="brutalism-border primary-hover dark:primary-hover-dark peer flex h-fit  w-full rounded-small border-primary80 dark:border-primary1">
          <div className="flex flex-col items-center  gap-extra-small rounded-l-small bg-primary10 p-small dark:bg-primary90">
            <VoteButton
              userId={userId}
              id={post_id}
              to="post"
              votes={votes}
              upvotes={upvotes}
              downvotes={downvotes}
            ></VoteButton>
          </div>
          {!isPagePost ? (
            <Link
              href={{
                pathname: `/community/${community.name}/${title.replace(
                  /\s/g,
                  "_",
                )}`,
              }}
              className=" flex w-[92%] flex-col gap-small rounded-r-small p-small dark:bg-primary80"
            >
              {postContent()}
            </Link>
          ) : (
            <div className="flex w-[92%] flex-col gap-small rounded-r-small p-small  dark:bg-primary80">
              {postContent()}
            </div>
          )}
        </div>
        {author_id === userId && (
          <DeleteButton
            to="post"
            className="heading body absolute right-4 top-4 duration-fast peer-hover:translate-x-2  peer-hover:scale-[110%] "
            post_id={post_id}
          ></DeleteButton>
        )}
      </section>
      {children}
    </div>
  );
}
