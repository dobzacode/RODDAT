import PostBar from "./PostBar";

export default async function HomePosts({}) {
  return (
    <div className="flex flex-col justify-center items-center gap-sub-large">
      <PostBar></PostBar>
      <PostBar></PostBar>
      <PostBar></PostBar>
    </div>
  );
}
