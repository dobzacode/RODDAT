"use client";

import Icon from "@mdi/react";
import Button from "../ui/button/Button";
import { Vote } from "@prisma/client";
import { mdiArrowDown, mdiArrowUp } from "@mdi/js";
import P from "../ui/text/P";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";
import { useState } from "react";

export default function VoteButton({
  upvotes: up,
  downvotes: down,
  votes,
  id,
  userId,
  to,
}: {
  upvotes: Vote[] | [];
  downvotes: Vote[] | [];
  votes: Vote[] | [];
  id: string;
  userId: string | null;
  to: "post" | "comment";
}) {
  const [upvotes, setUpvotes] = useState<Vote[] | []>(up);
  const [downvotes, setDownvotes] = useState<Vote[] | []>(down);

  const handleVote = async (type: "UPVOTE" | "DOWNVOTE") => {
    const vote = { type, user_id: userId, post_id: id };

    if (type === "UPVOTE") {
      setUpvotes([...upvotes, vote as Vote]);

      const existingDownvoteIndex = downvotes.findIndex(
        (vote) => vote.user_id === userId,
      );
      if (existingDownvoteIndex !== -1) {
        const updatedDownvotes = [...downvotes];
        updatedDownvotes.splice(existingDownvoteIndex, 1);
        setDownvotes(updatedDownvotes);
      }
    } else if (type === "DOWNVOTE") {
      setDownvotes([...downvotes, vote as Vote]);

      const existingUpvoteIndex = upvotes.findIndex(
        (vote) => vote.user_id === userId,
      );
      if (existingUpvoteIndex !== -1) {
        const updatedUpvotes = [...upvotes];
        updatedUpvotes.splice(existingUpvoteIndex, 1);
        setUpvotes(updatedUpvotes);
      }
    }
    const session: Session | null = await getSession();
    if (!session) return;

    const res = await fetch(
      `/api/votes?${to}_id=${id}&email=${session?.user?.email}&type=${type}`,
      { method: "POST" },
    );
  };

  const deleteVote = async (type: "UPVOTE" | "DOWNVOTE") => {
    if (type === "UPVOTE") {
      const updatedUpvotes = upvotes.filter((vote) => vote.user_id !== userId);
      setUpvotes(updatedUpvotes);
    } else if (type === "DOWNVOTE") {
      const updatedDownvotes = downvotes.filter(
        (vote) => vote.user_id !== userId,
      );
      setDownvotes(updatedDownvotes);
    }

    const session: Session | null = await getSession();
    if (!session) return;

    const res = await fetch(
      `/api/votes?${to}_id=${id}&email=${session?.user?.email}&type=${type}`,
      { method: "DELETE" },
    );
  };

  return (
    <>
      <Button
        onClick={() => {
          upvotes.some((vote) => vote.user_id === userId)
            ? deleteVote("UPVOTE")
            : handleVote("UPVOTE");
        }}
        disabled={userId ? false : true}
      >
        <Icon
          path={mdiArrowUp}
          className={
            upvotes.some((vote) => vote.user_id === userId)
              ? "text-secondary40"
              : ""
          }
          size={1}
        ></Icon>
      </Button>
      <P>{votes ? upvotes.length - downvotes.length : 0}</P>
      <Button
        disabled={userId ? false : true}
        onClick={() => {
          downvotes.some((vote) => vote.user_id === userId)
            ? deleteVote("DOWNVOTE")
            : handleVote("DOWNVOTE");
        }}
      >
        <Icon
          className={
            downvotes.some((vote) => vote.user_id === userId)
              ? "text-error40"
              : ""
          }
          path={mdiArrowDown}
          size={1}
        ></Icon>
      </Button>
    </>
  );
}
