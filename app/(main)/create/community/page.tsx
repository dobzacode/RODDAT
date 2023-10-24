import CommunityForm from "@/components/community/CommunityForm";

export default function CreatePost({}) {
  return (
    <>
      <section className="flex w-full justify-center p-extra-small">
        <CommunityForm theme="primary" title="Create community"></CommunityForm>
      </section>
    </>
  );
}
