import {
  Comment,
  Community,
  CommunityUser,
  Post,
  User,
  Vote,
} from "@prisma/client";

interface PostWithDetails extends Post {
  votes: Vote[];
  community: Community;
  author: User;
}

interface CommunityWithDetails extends Community {
  postAmount: number;
  userAmount: number;
}

export interface PostDetailProps extends Omit<Post, "post_id" | "picture"> {
  votes: Vote[];
  comments: Comment[];
  picture?: string;
  author: { name: string; image: string | null };
  community: { name: string; community_id?: string };
  post_id: string;
}

export interface CommunityDetailsProps extends Community {
  communityUsers?: CommunityUser[];
  userAmount: number;
  postAmount: number;
}

export interface CommentDetail extends Comment {
  votes: Vote[];
  author: { name: string; image: string | null };
  child_comments: Comment[];
}
