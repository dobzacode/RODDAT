import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CommunityForm from "@/components/community/CommunityForm";
import PopUp from "@/components/ui/div/PopUp";
import H2 from "@/components/ui/text/H2";
import prisma from "@/prisma/client";
import { BASE_URL } from "@/utils/utils";
import { Community, CommunityUser, User } from "@prisma/client";
import { Session, getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

interface ModifyCommunityRes extends Community {
  communityUsers: CommunityUser[];
}

export async function generateStaticParams() {
  const communities: Community[] = await prisma.community.findMany();
  return communities.map((community) => ({
    name: community.name,
  }));
}

export const revalidate = 0;

export default async function ModifyCommunity({
  params,
}: {
  params: { communityname: string };
}) {
  const communityRes = await fetch(
    `${BASE_URL}/api/communities?community=${params.communityname}`,
    {
      cache: "no-store",
    },
  );
  const { community }: { community: ModifyCommunityRes } =
    await communityRes.json();

  if (!community) {
    return redirect("/");
  }

  const session: Session | null = await getServerSession(authOptions);

  const userRes = await fetch(
    `${BASE_URL}/api/user/getuserinformation?email=${session?.user?.email}`,
    {
      cache: "no-store",
    },
  );

  const { user }: { user: User } = await userRes.json();

  console.log(community.communityUsers);

  if (
    !community.communityUsers.some((communityUser) => {
      return (
        communityUser.user_id === user.id && communityUser.role === "ADMIN"
      );
    })
  ) {
    return redirect("/");
  }

  return (
    <>
      <section className="flex w-full justify-center p-sub-large">
        <CommunityForm
          community={community}
          theme="primary"
          title="Create community"
        ></CommunityForm>
      </section>
    </>
  );
}
