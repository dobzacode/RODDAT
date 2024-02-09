import CreatePostContent from "@/components/post/createPostContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Post",
};

export default function Page({}) {
  return <CreatePostContent></CreatePostContent>;
}
