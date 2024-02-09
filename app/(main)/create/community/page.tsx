import CommunityForm from "@/components/community/CommunityForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Community",
};

export default function CreateCommunity({}) {
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
