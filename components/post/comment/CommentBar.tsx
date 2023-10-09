import P from "@/components/ui/text/P";
import { mdiArrowDown, mdiArrowUp } from "@mdi/js";
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

  const { comment } = await res.json();

  const upvotes = comment.votes?.filter((vote: Vote) => vote.type === "UPVOTE");
  const downvotes = comment.votes?.filter(
    (vote: Vote) => vote.type === "DOWNVOTE",
  );

  return (
    <section className="brutalism-border flex h-[14rem] w-full  rounded-small border-primary80">
      <div className="flex flex-col items-center gap-extra-small  rounded-l-small bg-primary10 p-small">
        <Icon path={mdiArrowUp} size={1}></Icon>
        <P>{comment.votes ? upvotes.length - downvotes.length : 0}</P>
        <Icon path={mdiArrowDown} size={1}></Icon>
      </div>
      <div className="flex flex-col gap-extra-small p-small">
        <P>{content}</P>
      </div>
    </section>
  );
}
