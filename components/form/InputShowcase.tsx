"use client";

import { ChangeEvent, useState } from "react";
import H2 from "../text/H2";
import Input from "./Input";
import H3 from "../text/H3";

export default function InputShowcase({}) {
  const [formData, setFormData] = useState<{ radioValue: string }>({
    radioValue: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    console.log(formData);
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-start w-fit gap-sub-large">
        <H2 type="laptop-large:heading--extra-large heading--large">Input</H2>
        <div className="flex flex-col gap-small w-full">
          <H3 type="heading">Text</H3>
          <Input
            type="text"
            hiddenLabel={true}
            placeholder="Your text"
            color="primary"
            id="empty"
          ></Input>
        </div>
        <div className="flex flex-col gap-small w-full">
          <H3 type="heading">Select</H3>
          <Input
            type="select"
            hiddenLabel={true}
            placeholder="Your choice"
            color="primary"
            id="empty"
            choices={["First choice", "Second choice", "Third choice"]}
          ></Input>
        </div>
        <div className="flex flex-col gap-small ">
          <H3 type="heading">Radio</H3>
          <form>
            <Input
              type="radio"
              hiddenLabel={true}
              color="primary"
              id="radioValue"
              choices={["First choice", "Second choice"]}
              value={formData.radioValue}
              onChange={handleChange}
            ></Input>
          </form>
        </div>
        <div className="flex flex-col gap-small w-full">
          <H3 type="heading">Textarea</H3>
          <form>
            <Input
              type="textarea"
              hiddenLabel={true}
              color="primary"
              id="radioValue"
            ></Input>
          </form>
        </div>
      </div>
      <div></div>
    </div>
  );
}
