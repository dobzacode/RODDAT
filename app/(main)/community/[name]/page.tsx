import prisma from "@/prisma/client";
import { Community } from "@prisma/client";

export async function generateStaticParams() {
  const communities: Community[] = await prisma.community.findMany();
  return communities.map((community) => ({
    name: community.name,
  }));
}

export default function CommunityPage({
  params,
}: {
  params: { name: string };
}) {
  console.log(params);
  return (
    <div>
      <p>{params.name}</p>
    </div>
  );
}
