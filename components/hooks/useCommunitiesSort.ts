"use client";

import { CommunityDetailsProps, PostDetailProps } from "@/interface/interface";
import { sortCommunities, sortPosts } from "@/utils/utils";
import { useEffect, useState } from "react";

export default function useCommunitiesSort(
  communities: CommunityDetailsProps[] | null | undefined,
  sortBy: "visibility" | "postAmount" | "userAmount" | "date" | null,
) {
  const [sortedCommunities, setSortedCommunities] = useState<
    CommunityDetailsProps[] | null | undefined
  >(communities);

  useEffect(() => {
    if (sortBy && communities) {
      const sortedCommunities = sortCommunities(communities, sortBy);
      setSortedCommunities(sortedCommunities);
    } else {
      setSortedCommunities(communities);
    }
  }, [sortBy, communities]);

  return { sortedCommunities };
}
