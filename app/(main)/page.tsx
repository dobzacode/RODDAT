import NewPostBar from "@/components/home/NewPostBar";

import UserInfo from "@/components/home/UserInfoHome";

import { Suspense } from "react";
import PostSkeleton from "@/components/skeleton/PostSkeleton";
import Posts from "@/components/post/Posts";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import LogInModal from "@/components/user/LogInModal";
import PopUp from "@/components/ui/div/PopUp";
import GoUpButton from "@/components/home/GoUpButton";
import SearchBar from "@/components/ui/header/SearchBar";
import MobileSearchBar from "@/components/home/MobileSearchBar";

export const revalidate = 20;

export default async function Home() {
  const session: Session | null = await getServerSession(authOptions);

  return (
    <main className="mx-extra-small flex justify-center gap-medium mobile-large:mx-small laptop-large:mx-extra-large ">
      <div className="flex w-full flex-col gap-sub-large tablet:w-[600px]">
        <MobileSearchBar></MobileSearchBar>
        <section className="flex w-full flex-col gap-sub-large tablet:w-[600px]">
          <ul className="flex w-full flex-col items-center justify-center gap-sub-large">
            <Suspense
              fallback={
                <>
                  <PostSkeleton />
                  <PostSkeleton />
                  <PostSkeleton />
                  <PostSkeleton />
                  <PostSkeleton />
                  <PostSkeleton />
                </>
              }
            >
              <Posts session={session}></Posts>
            </Suspense>
          </ul>
        </section>
      </div>
      <aside className=" brutalism-border items  hidden h-fit w-[350px] flex-col gap-small rounded-medium border-primary80 p-medium text-primary80 dark:border-primary1 dark:bg-primary80 dark:text-primary1 laptop:flex">
        <UserInfo></UserInfo>
      </aside>
      <PopUp></PopUp>
      <GoUpButton></GoUpButton>
    </main>
  );
}
