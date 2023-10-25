"use client";

import { PostDetailProps } from "@/interface/interface";
import { sortPosts } from "@/utils/utils";
import { useEffect, useState } from "react";

export default function usePostsSort(
  posts: PostDetailProps[] | null,
  sortBy: "upvote" | "downvote" | "comment" | "date" | null,
) {
  const [sortedPosts, setSortedPosts] = useState<PostDetailProps[] | null>(
    posts,
  );

  useEffect(() => {
    if (sortBy && posts) {
      const sortedPosts = sortPosts(posts, sortBy);
      setSortedPosts(sortedPosts);
    } else {
      setSortedPosts(posts);
    }
  }, [sortBy, posts]);

  return { sortedPosts };
}
