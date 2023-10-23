"use client";

import Uploader from "@/components/Uploader";
import CommunityBar from "@/components/community/CommunityBar";
import CommunitySkeleton from "@/components/community/CommunitySkeleton";
import { Community } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const revalidate = 0;

export default function CommunityPage({}) {
  const [communities, setCommunities] = useState<Community[] | null>(null);
  const searchParams = useSearchParams();
  const [isFetching, setIsFetching] = useState<boolean>(true);

  useEffect(() => {
    setIsFetching(true);
    const fetchCommunities = async () => {
      const name = searchParams ? searchParams.get("name") : null;
      const res = await fetch(`/api/communities${name ? `?name=${name}` : ""}`);

      const { communities }: { communities: Community[] } = await res.json();
      console.log(communities);
      setCommunities(communities);
      setIsFetching(false);
    };
    fetchCommunities();
  }, [searchParams]);

  return (
    <main className="mx-small flex justify-center gap-medium laptop-large:mx-extra-large">
      <section className="flex flex-col gap-sub-large laptop:w-[600px] ">
        {isFetching ? (
          <CommunitySkeleton></CommunitySkeleton>
        ) : (
          <ul>
            {communities?.map((community) => {
              return (
                <li
                  key={uuidv4()}
                  className="relative flex h-full w-full flex-col gap-sub-large"
                >
                  <CommunityBar
                    community={community}
                    id={community.community_id}
                  ></CommunityBar>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
}
