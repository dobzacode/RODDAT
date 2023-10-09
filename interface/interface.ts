import { Comment, Post, Vote } from "@prisma/client";

export interface PostDetailProps
  extends Omit<Post, "community_id" | "post_id" | "author_id"> {
  votes: Vote[];
  comments: Comment[];
  author: { name: string };
  community: { name: string; community_id?: string };
  post_id: string;
}
