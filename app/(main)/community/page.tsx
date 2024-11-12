import CommunitiesSection from "@/components/community/CommunitiesSection";
import { CommunityDetailsProps } from "@/interface/interface";
import { BASE_URL } from "@/utils/utils";
import { Metadata } from "next";

export const revalidate = 0;

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Communities",
};

const fetchCommunities = async () => {
  const resCom = await fetch(`${BASE_URL}/api/communities/details`, {
    next: {
      revalidate: 0,
    },
  });

  const {
    communitiesDetails,
  }: { communitiesDetails: CommunityDetailsProps[] } = await resCom.json();

  console.log(communitiesDetails);

  return { communitiesDetails };
};

export default async function CommunityPage({}) {
  const {
    communitiesDetails,
  }: { communitiesDetails: CommunityDetailsProps[] } = await fetchCommunities();

  return (
    <main className="mx-small flex justify-center gap-medium laptop-large:mx-extra-large">
      <section className="flex w-full max-w-3xl flex-col gap-sub-large ">
        <CommunitiesSection
          communities={communitiesDetails}
        ></CommunitiesSection>
      </section>
    </main>
  );
}
