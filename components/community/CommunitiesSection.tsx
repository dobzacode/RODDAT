"use client";

import { CommunityDetailsProps } from "@/interface/interface";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import H2 from "../ui/text/H2";
import CommunitySnippet from "./CommunitySnippet";

export default function CommunitiesSection({
  communities,
}: {
  communities: CommunityDetailsProps[];
}) {
  const [filteredCommunities, setFilteredCommunities] = useState<
    CommunityDetailsProps[] | null
  >(null);
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  useEffect(() => {
    if (name) {
      setFilteredCommunities(
        communities?.filter((community) => {
          return community.name?.startsWith(name);
        }),
      );
    }
  }, [searchParams, communities, name]);

  return (
    <>
      <ul className="flex w-full flex-col  justify-center gap-small">
        {!name ? (
          <>
            {communities?.map((community) => {
              return (
                <CommunitySnippet
                  name={community.name}
                  visibility={community.visibility}
                  isNsfw={community.isNsfw}
                  picture={community.picture}
                  description={community.description}
                  postAmount={community.postAmount}
                  createdAt={community.createdAt}
                  userAmount={community.userAmount}
                  key={uuidv4()}
                ></CommunitySnippet>
              );
            })}
          </>
        ) : (
          <>
            {filteredCommunities?.map((community) => {
              return (
                <CommunitySnippet
                  name={community.name}
                  visibility={community.visibility}
                  isNsfw={community.isNsfw}
                  picture={community.picture}
                  description={community.description}
                  postAmount={community.postAmount}
                  createdAt={community.createdAt}
                  userAmount={community.userAmount}
                  key={uuidv4()}
                ></CommunitySnippet>
              );
            })}
          </>
        )}
      </ul>
      {!filteredCommunities?.length && (
        <H2
          className="text-center"
          type="heading"
        >{`No community is matching with ${searchParams.get("name")}`}</H2>
      )}
    </>
  );
}
