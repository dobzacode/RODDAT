import { PostDetailProps } from "@/interface/interface";
import VoteButton from "./VoteButton";
import Image from "next/image";
import DeleteButton from "./DeleteButton";
import P from "../ui/text/P";
import { getDateDifference } from "@/utils/utils";
import H2 from "../ui/text/H2";
import Link from "next/link";

interface PostSnippetProps extends Omit<PostDetailProps, "community_id"> {
  userId: string;
}

export default function PostSnippet({
  picture,
  positivity,
  post_id,
  createdAt,
  author_id,
  author,
  community,
  title,
  content,
  votes,
  comments,
  userId,
}: PostSnippetProps) {
  const upvotes = votes?.filter((vote) => vote.type === "UPVOTE");
  const downvotes = votes?.filter((vote) => vote.type === "DOWNVOTE");

  return (
    <li className="w-full">
      <Link
        href={`/community/${community.name}/${title}`}
        className="brutalism-border primary-hover dark:primary-hover-dark peer relative flex h-fit w-full  rounded-small border-primary80 dark:border-primary20"
      >
        <div className="flex flex-col items-center  gap-extra-small rounded-l-small bg-primary10 p-small dark:bg-primary90">
          <VoteButton
            userId={null}
            id={post_id}
            to="post"
            votes={votes}
            upvotes={upvotes}
            downvotes={downvotes}
          ></VoteButton>
        </div>

        <div className=" my-small ml-small flex flex-col gap-extra-small dark:text-primary1">
          <P type="caption">
            Posted {getDateDifference(createdAt)} on r/{community?.name}
          </P>
          <H2 type="sub-heading">{title}</H2>
          <P type="caption">
            {comments.length} {comments.length > 1 ? "Comments" : "Comment"}
          </P>
        </div>
      </Link>
    </li>
  );
}
