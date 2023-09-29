import NewPostBar from "@/components/home/NewPostBar";
import HomePosts from "@/components/home/HomePosts";
import NewCommunityModal from "@/components/community/NewCommunityModal";

export default async function Home() {
  return (
    <main className="flex justify-between flex-col items-center flex-wrap gap-large mx-auto">
      <NewPostBar></NewPostBar>
      <NewCommunityModal></NewCommunityModal>
      <HomePosts></HomePosts>
    </main>
  );
}
