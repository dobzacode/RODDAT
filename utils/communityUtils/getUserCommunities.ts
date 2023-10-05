import { Community } from "@prisma/client";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

export default async function getUserCommunities() {
  const session: Session | null = await getSession();
  const data = await fetch(`/api/communities?email=${session?.user?.email}`);
  const userCommunities: { communities: Community[] } = await data.json();

  const communityNames: string[] = userCommunities.communities.map(
    (community) => community.name
  );

  return communityNames;
}
