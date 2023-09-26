import H2 from "../text/H2";
import Form from "./Form";

export default function FormShowcase() {
  return (
    <div className="flex flex-col gap-sub-large">
      <H2 type="laptop-large:heading--extra-large heading--large">Form</H2>
      <Form theme="primary"></Form>
    </div>
  );
}
