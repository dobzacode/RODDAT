import { PostDetailProps } from "@/interface/interface";
import { getDateDifference } from "@/utils/utils";
import Link from "next/link";
import H2 from "../ui/text/H2";
import P from "../ui/text/P";
import VoteButton from "./VoteButton";
import { Vote } from "@prisma/client";

interface PostSnippetProps {
  post_id: string;
  createdAt: Date;
  communityname: string;
  title: string;
  votes: Vote[];
  commentamount: number;
}

export default function PostSnippet({
  post_id,
  createdAt,
  communityname,
  title,
  votes,
  commentamount,
}: PostSnippetProps) {
  const upvotes = votes?.filter((vote: Vote) => vote.type === "UPVOTE");
  const downvotes = votes?.filter((vote: Vote) => vote.type === "DOWNVOTE");

  return (
    <li className="w-full">
      <Link
        href={`/community/${communityname}/${title}`}
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
            Posted {getDateDifference(createdAt)} on r/{communityname}
          </P>
          <H2 type="sub-heading">{title}</H2>
          <P type="caption">
            {commentamount} {commentamount > 1 ? "Comments" : "Comment"}
          </P>
        </div>
      </Link>
    </li>
  );
}
