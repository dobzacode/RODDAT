import { Comment, Post, User, Vote } from "@prisma/client";

export interface PostDetailProps extends Omit<Post, "post_id" | "picture"> {
  votes: Vote[];
  comments: Comment[];
  picture?: string;
  author: { name: string; image: string | null };
  community: { name: string; community_id?: string };
  post_id: string;
}

export interface CommentDetail extends Comment {
  votes: Vote[];
  author: { name: string; image: string | null };
  child_comments: Comment[];
}
