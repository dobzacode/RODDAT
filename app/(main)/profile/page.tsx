import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PostBar from "@/components/post/PostBar";
import UserInfo from "@/components/home/UserInfoHome";
import getUserPosts from "@/utils/postUtils/getUserPosts";

import { getServerSession } from "next-auth";
import { v4 as uuidv4 } from "uuid";
import UserInfoProfile from "@/components/user/UserInfoProfile";

export default async function ProfilePage({}) {
  const session = await getServerSession(authOptions);

  const { posts } = await getUserPosts(session);

  return (
    <main className="flex justify-center gap-medium mx-extra-large ">
      <section className="flex flex-col w-2/5 gap-sub-large ">
        <div className="flex flex-col justify-center items-center gap-sub-large w-full">
          {posts.map((post) => {
            return <PostBar post={post} key={uuidv4()}></PostBar>;
          })}
        </div>
      </section>
      <aside className="w-1/4 text-primary80  brutalism-border p-medium border-primary80 rounded-medium flex flex-col gap-small items h-fit">
        <UserInfoProfile></UserInfoProfile>
      </aside>
    </main>
  );
}
