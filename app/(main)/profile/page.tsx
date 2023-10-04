import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PostBar from "@/components/post/Post";
import getUserPosts from "@/utils/postUtils/getUserPosts";

import { getServerSession } from "next-auth";
import { v4 as uuidv4 } from "uuid";

export default async function ProfilePage({}) {
  const session = await getServerSession(authOptions);

  const { posts } = await getUserPosts(session);

  return (
    <div className="flex flex-col justify-center items-center gap-sub-large">
      {posts.map((post) => {
        return <PostBar post={post} key={uuidv4()}></PostBar>;
      })}
    </div>
  );
}
