import Avatar from "../Avatar";

export default function UserSnippet({}) {
  return (
    <div className="bg-white gap-extra-small text-body font-medium rounded-full flex justify-center items-center px-sub-medium brutalism-border py-1 border-primary80">
      <Avatar></Avatar>
      <p>
        Corentin <br></br> Kittel
      </p>
    </div>
  );
}
