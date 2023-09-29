import NewPostBar from "@/components/home/NewPostBar";
import HomePosts from "@/components/home/HomePosts";

export default async function Home() {
  return (
    <main className="flex justify-between flex-col items-center flex-wrap gap-large mx-auto">
      <NewPostBar></NewPostBar>
      <HomePosts></HomePosts>
    </main>
  );
}
