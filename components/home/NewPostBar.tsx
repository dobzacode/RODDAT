import Link from "next/link";
import Avatar from "../ui/Avatar";

export default function NewPostBar({}) {
  return (
    <Link
      href="/post/create"
      className="flex gap-extra-small bg-primary10 p-extra-small brutalism-border border-primary80 rounded-small cursor-pointer w-fit"
    >
      <div className="bg-white rounded-small p-extra-small">
        <Avatar></Avatar>
      </div>
      <input
        className="body focus:outline-none bg-white rounded-small px-small placeholder:text-neutral80 cursor-pointer"
        type="text"
        placeholder="New publication"
      />
    </Link>
  );
}
