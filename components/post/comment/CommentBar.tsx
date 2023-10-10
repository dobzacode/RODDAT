import Avatar from "@/components/ui/Avatar";
import P from "@/components/ui/text/P";
import { CommentDetail } from "@/interface/interface";
import { getDateDifference } from "@/utils/utils";
import { mdiArrowDown, mdiArrowUp, mdiCommentOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { Comment, Post, Vote } from "@prisma/client";

export default async function CommentBar({
  content,
  comment_id,
}: {
  content: string;
  comment_id: string;
}) {
  const url: string = `http://localhost:3000/api/comments?comment_id=${comment_id}`;

  const res = await fetch(url, { cache: "no-store" });

  const { comment }: { comment: CommentDetail } = await res.json();

  const upvotes = comment.votes?.filter((vote: Vote) => vote.type === "UPVOTE");
  const downvotes = comment.votes?.filter(
    (vote: Vote) => vote.type === "DOWNVOTE",
  );

  return (
    <section className="brutalism-border primary-hover relative flex  h-[14rem] w-full rounded-small border-primary80">
      <div className="flex flex-col items-center gap-extra-small  rounded-l-small bg-primary10 p-small">
        <Icon path={mdiArrowUp} size={1}></Icon>
        <P>{comment.votes ? upvotes.length - downvotes.length : 0}</P>
        <Icon path={mdiArrowDown} size={1}></Icon>
      </div>
      <div className="flex flex-col justify-between gap-extra-small p-small">
        <div className="caption flex items-center gap-extra-small">
          <div className="absolute -left-large top-small flex flex-col items-center">
            <Avatar
              src={comment.author.image}
              size={5}
              className="rounded-small"
            ></Avatar>
            <div className="pointer-events-none block h-[15rem] w-[1px] border border-primary20"></div>
          </div>

          <P type="caption">{`Posted by u/${
            comment.author.name ? comment.author.name : "deleted"
          }`}</P>
          <P type="caption">{getDateDifference(comment.createdAt)}</P>
        </div>
        <P>{content}</P>
        <div className="flex gap-extra-small">
          <Icon path={mdiCommentOutline} size={1.4}></Icon>
          <P>Reply</P>
        </div>
      </div>
    </section>
  );
}
