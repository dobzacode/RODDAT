import H1 from "@/components/text/H1";
import H2 from "@/components/text/H2";
import H3 from "@/components/text/H3";
import P from "@/components/text/P";

export default function Typography({}) {
  return (
    <div className="flex justify-center mx-small">
      <div className="mb-extra-large flex flex-col gap-sub-large items-start">
        <H1 type="heading--extra-large" textColor="text-neutral80">
          Extra large heading
        </H1>
        <H2 type="heading--large" textColor="text-neutral80">
          Large heading
        </H2>
        <H2 type="heading--sub-large" textColor="text-neutral80">
          Sub-large heading
        </H2>
        <H2 type="heading" textColor="text-neutral80">
          Heading
        </H2>
        <H3 type="sub-heading" textColor="text-neutral80">
          Sub-heading
        </H3>
        <P type="body" textColor="text-neutral80">
          Body text
        </P>
      </div>
    </div>
  );
}
