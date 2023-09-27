import PostBar from "./PostBar";

async function getPosts() {
  try {
    const res = await fetch("http://localhost:3000/api/posts");
    return res.json();
  } catch (e) {
    return e;
  }
}

export default async function HomePosts({}) {
  const posts = await getPosts();
  console.log(posts);
  return (
    <div className="flex flex-col justify-center items-center gap-sub-large">
      <PostBar></PostBar>
      <PostBar></PostBar>
      <PostBar></PostBar>
    </div>
  );
}
