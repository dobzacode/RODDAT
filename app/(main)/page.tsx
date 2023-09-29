import NewPostBar from "@/components/home/NewPostBar";
import HomePosts from "@/components/home/HomePosts";

import UserInfo from "@/components/user/UserInfo";

export default async function Home() {
  return (
    <main className="flex justify-center flex-wrap gap-medium mx-auto ">
      <section className="flex flex-col w-fit ">
        <NewPostBar></NewPostBar>

        <HomePosts></HomePosts>
      </section>
      <aside className="w-1/3 text-primary80  brutalism-border p-medium border-primary80 rounded-medium flex flex-col gap-small items">
        <UserInfo></UserInfo>
      </aside>
    </main>
  );
}
