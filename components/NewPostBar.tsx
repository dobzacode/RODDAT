import Avatar from "./Avatar";

export default function NewPostBar({}) {
  return (
    <section className="flex gap-extra-small bg-primary10 p-extra-small brutalism-border border-primary80 rounded-small">
      <div className="bg-white rounded-small p-extra-small">
        <Avatar></Avatar>
      </div>
      <input
        className="body focus:outline-none bg-white rounded-small px-small placeholder:text-neutral80"
        type="text"
        placeholder="New publication"
      />
    </section>
  );
}
