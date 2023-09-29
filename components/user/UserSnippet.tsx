import { Session } from "next-auth";
import Avatar from "../Avatar";

export default function UserSnippet({ session }: { session: Session }) {
  return (
    <div className="bg-white gap-extra-small text-body font-medium rounded-full flex justify-center items-center px-sub-medium brutalism-border py-1 border-primary80">
      <Avatar></Avatar>
      <p>{session?.user?.name}</p>
    </div>
  );
}
