import CommunityForm from "@/components/community/CommunityForm";

export default function CreatePost({}) {
  return (
    <>
      <section className="flex w-full justify-center p-extra-small">
        <CommunityForm
          theme="primary"
          title={
            <p>
              Create
              <span className="hidden mobile-large:inline"> community</span>
            </p>
          }
        ></CommunityForm>
      </section>
    </>
  );
}
