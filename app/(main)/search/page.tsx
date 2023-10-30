import NewPostBar from "@/components/home/NewPostBar";

import UserInfo from "@/components/home/UserInfoHome";

import { Suspense } from "react";
import PostSkeleton from "@/components/skeleton/PostSkeleton";
import Posts from "@/components/post/Posts";
import { Session, getServerSession } from "next-auth";

import LogInModal from "@/components/user/LogInModal";
import PopUp from "@/components/ui/div/PopUp";
import GoUpButton from "@/components/home/GoUpButton";

export const revalidate = 0;

export default async function Home() {
  return (
    <main className="mx-extra-small flex justify-center gap-medium mobile-large:mx-small laptop-large:mx-extra-large "></main>
  );
}
