import Link from "next/link";
import Avatar from "../ui/Avatar";
import { Session, getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function NewPostBar({}) {
  const session: Session | null = await getServerSession(authOptions);

  console.log(session);

  return (
    <Link
      href="/post/create"
      className="brutalism-border primary-hover flex w-full cursor-pointer gap-extra-small rounded-small border-primary80 bg-primary10 p-extra-small dark:border-primary20 dark:bg-primary80"
    >
      <div className="rounded-small bg-white p-extra-small dark:bg-primary90">
        <Avatar
          className="rounded-small dark:text-primary1"
          src={session?.user?.image}
        ></Avatar>
      </div>
      <input
        className="body w-full cursor-pointer rounded-small bg-white px-small placeholder:text-neutral80 focus:outline-none dark:bg-primary90 dark:placeholder:text-primary1"
        type="text"
        placeholder="New publication"
      />
    </Link>
  );
}
