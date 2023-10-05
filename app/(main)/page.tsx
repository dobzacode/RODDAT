import NewPostBar from "@/components/home/NewPostBar";
import HomePosts from "@/components/home/HomePosts";

import UserInfo from "@/components/user/UserInfo";
import prisma from "@/prisma/client";
import { Post } from "@prisma/client";

export default async function Home() {
  return (
    <main className="flex justify-center gap-medium mx-extra-large ">
      <section className="flex flex-col w-2/5 gap-sub-large ">
        <NewPostBar></NewPostBar>

        <HomePosts></HomePosts>
      </section>
      <aside className="w-1/4 text-primary80  brutalism-border p-medium border-primary80 rounded-medium flex flex-col gap-small items h-fit">
        <UserInfo></UserInfo>
      </aside>
    </main>
  );
}
