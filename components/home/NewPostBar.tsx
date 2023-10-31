"use client";

import { getUserInformation } from "@/utils/utils";
import { CommunityUser } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Avatar from "../ui/Avatar";
import Button from "../ui/button/Button";
import LogInModal from "../user/LogInModal";
import Modal from "../ui/div/Modal";
import H2 from "../ui/text/H2";
import P from "../ui/text/P";
import JoinCommunityButton from "../community/JoinCommunityButton";

export default function NewPostBar({
  communityname,
  communityUsers,
  communityVisibility,
  communityId,
}: {
  communityname?: string;
  communityUsers: CommunityUser[];
  communityVisibility: "RESTRICTED" | "PRIVATE" | "PUBLIC";
  communityId: string;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: session, status } = useSession();
  const url = communityname
    ? `/create/post?community=${communityname}`
    : "/create/post";

  const [isInCommunity, setIsInCommunity] = useState<boolean>(
    communityVisibility === "PUBLIC",
  );

  useEffect(() => {
    const getId = async () => {
      const user = await getUserInformation();
      if (!user) return;

      const isUserInCommunity = communityUsers.some((comUser) => {
        return comUser.user_id === user.id;
      });
      setIsInCommunity(isUserInCommunity);
    };
    !isInCommunity ? getId() : "";
  }, []);

  return (
    <>
      {status === "authenticated" ? (
        <>
          {isInCommunity ? (
            <Link
              href={url}
              className="brutalism-border primary-hover flex w-full cursor-pointer gap-extra-small rounded-small border-primary80 bg-primary10 p-extra-small dark:border-primary1 dark:bg-primary80"
            >
              <div className="rounded-small bg-white p-[1.3rem] dark:bg-primary90">
                <Avatar
                  className="rounded-[1.2rem]  dark:text-primary1"
                  src={session?.user?.image}
                  size={4}
                ></Avatar>
              </div>
              <input
                className="body w-full cursor-pointer rounded-small bg-white px-small placeholder:text-neutral80 focus:outline-none dark:bg-primary90 dark:placeholder:text-primary1"
                type="text"
                placeholder="New publication"
              />
            </Link>
          ) : (
            <>
              <Button
                onClick={() => setIsOpen(true)}
                className="brutalism-border primary-hover flex w-full cursor-pointer gap-extra-small rounded-small border-primary80 bg-primary10 p-extra-small dark:border-primary1 dark:bg-primary80"
              >
                <div className="rounded-small bg-white p-[1.3rem] dark:bg-primary90">
                  <Avatar
                    className="rounded-[1.2rem]  dark:text-primary1"
                    src={session?.user?.image}
                    size={4}
                  ></Avatar>
                </div>
                <input
                  className="body h-full w-full cursor-pointer rounded-small bg-white px-small placeholder:text-neutral80 focus:outline-none dark:bg-primary90 dark:placeholder:text-primary1"
                  type="text"
                  placeholder="New publication"
                />
              </Button>
              <Modal
                title="This community is private !"
                onClose={() => setIsOpen(false)}
                isOpen={isOpen}
              >
                <div className="flex flex-col gap-medium">
                  <P>
                    You need to be a member of {communityname} if you want to
                    publish in it.
                  </P>
                  <JoinCommunityButton
                    additionnalCb={() => setIsOpen(false)}
                    communityId={communityId}
                  ></JoinCommunityButton>
                </div>
              </Modal>
            </>
          )}
        </>
      ) : (
        <>
          <Button
            onClick={() => setIsOpen(true)}
            className="brutalism-border primary-hover flex w-full cursor-pointer gap-extra-small rounded-small border-primary80 bg-primary10 p-extra-small dark:border-primary1 dark:bg-primary80"
          >
            <div className="rounded-small bg-white p-extra-small dark:bg-primary90">
              <Avatar className="rounded-small dark:text-primary1"></Avatar>
            </div>
            <input
              className="body h-full w-full cursor-pointer rounded-small bg-white px-small placeholder:text-neutral80 focus:outline-none dark:bg-primary90 dark:placeholder:text-primary1"
              type="text"
              placeholder="New publication"
            />
          </Button>
          <LogInModal isOpen={isOpen} setIsOpen={setIsOpen}></LogInModal>
        </>
      )}
    </>
  );
}
