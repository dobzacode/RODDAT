import CommunitiesSection from "@/components/community/CommunitiesSection";
import { CommunityDetailsProps } from "@/interface/interface";
import { BASE_URL } from "@/utils/utils";

export const revalidate = 0;

const fetchCommunities = async () => {
  const resCom = await fetch(`${BASE_URL}/api/communities/details`, {
    cache: "no-store",
  });

  const {
    communitiesDetails,
  }: { communitiesDetails: CommunityDetailsProps[] } = await resCom.json();

  return { communitiesDetails };
};

export default async function CommunityPage({}) {
  const {
    communitiesDetails,
  }: { communitiesDetails: CommunityDetailsProps[] } = await fetchCommunities();

  return (
    <main className="mx-small flex justify-center gap-medium laptop-large:mx-extra-large">
      <section className="flex flex-col gap-sub-large laptop:w-[600px] ">
        <CommunitiesSection
          communities={communitiesDetails}
        ></CommunitiesSection>
      </section>
    </main>
  );
}
