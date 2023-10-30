"use client";

import { Community } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CommunitySnippet from "./CommunitySnippet";
import { v4 as uuidv4 } from "uuid";
import { CommunityDetailsProps } from "@/interface/interface";
import H2 from "../ui/text/H2";

export default function CommunitiesSection({
  communities: propsCommunities,
}: {
  communities: CommunityDetailsProps[];
}) {
  const [communities, setCommunities] =
    useState<CommunityDetailsProps[]>(propsCommunities);
  const [filteredCommunities, setFilteredCommunities] = useState<
    CommunityDetailsProps[] | null
  >(null);
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const [isFetching, setIsFetching] = useState<boolean>(true);

  useEffect(() => {
    if (name) {
      setFilteredCommunities(
        communities?.filter((community) => {
          return community.name.startsWith(name);
        }),
      );
    }
  }, [searchParams]);

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
