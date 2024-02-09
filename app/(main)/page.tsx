import UserInfo from "@/components/home/UserInfoHome";

import GoUpButton from "@/components/home/GoUpButton";
import MobileSearchBar from "@/components/home/MobileSearchBar";
import Posts from "@/components/post/Posts";
import PostSkeleton from "@/components/skeleton/PostSkeleton";
import PopUp from "@/components/ui/div/PopUp";
import { Metadata } from "next";
import { Session, getServerSession } from "next-auth";
import { Suspense } from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const revalidate = 20;

export const metadata: Metadata = {
  title: "RODDAT",
};

export default async function Home() {
  const session: Session | null = await getServerSession(authOptions);

  return (
    <main className="mx-extra-small flex justify-center gap-medium mobile-large:mx-small laptop-large:mx-extra-large ">
      <div className="flex w-full flex-col gap-small tablet:w-[600px] tablet:gap-sub-large">
        <MobileSearchBar></MobileSearchBar>
        <section className="flex w-full flex-col gap-sub-large tablet:w-[600px]">
          <ul className="flex w-full flex-col items-center justify-center gap-small tablet:gap-sub-large">
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
