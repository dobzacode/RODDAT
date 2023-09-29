"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import Input from "./Input";
import Label from "./Label";

import H1 from "../text/H1";

import Button from "../button/Button";
import H2 from "../text/H2";
import H3 from "../text/H3";
import ColorDiv from "../div/colorDiv";
import P from "../text/P";

interface FormData {
  name: string;
  communityType: string;
  isNsfw: boolean;
}

export default function Form({
  title,
  theme,
}: {
  title?: string;
  theme: "primary" | "secondary" | "tertiary" | "neutral";
}) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    communityType: "",
    isNsfw: false,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    e.stopPropagation;
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const newValue = (e.target as HTMLInputElement).checked;
      setFormData((prevFormData) => ({ ...prevFormData, [name]: newValue }));
    } else {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  };

  //bg-primary5
  //bg-secondary5
  //bg-tertiary5
  //bg-neutral5
  //text-primary1
  //text-secondary1
  //text-tertiary1
  //text-neutral1
  //border-primary10
  //border-secondary10
  //border-tertiary10
  //border-neutral10

  return (
    <div
      className={`flex flex-col gap-medium items-center bg-${theme}1 rounded-extra-small `}
    >
      {title && (
        <H1
          type="heading"
          textColor={`text-${theme}`}
          padding="py-small px-sub-large"
          rounded="rounded-t-extra-small"
        >
          {title}
        </H1>
      )}
      <form
        className={`body flex flex-col gap-sub-large `}
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-sub-medium">
          <H3 type="sub-heading">Name</H3>
          <Input
            hiddenLabel={true}
            placeholder="r/"
            color={theme}
            type="text"
            flex="flex flex-col gap-small"
            id="name"
            value={formData.name}
            onChange={handleChange}
          ></Input>
        </div>

        <div className="flex flex-col gap-sub-medium">
          <H3 type="sub-heading">Community type</H3>
          <Input
            type="radio"
            hiddenLabel={false}
            color={theme}
            id="communityType"
            choices={["Public", "Restricted", "Private"]}
            customText={[
              "Anyone can view, post, and comment to this community",
              "Anyone can view this community, but only approved users can post",
              "Only approved users can view and submit to this community",
            ]}
            value={formData.communityType}
            onChange={handleChange}
          ></Input>
        </div>

        <div className="switch flex flex-col gap-sub-medium">
          <H3 type="sub-heading">Adult content</H3>
          <label className="flex items-center gap-extra-small">
            <input
              className="toggle-checkbox"
              type="checkbox"
              id="isNsfw"
              name="isNsfw"
              checked={formData.isNsfw}
              onChange={handleChange}
            />
            <div className="toggle-switch"></div>
            <ColorDiv
              flex="flex justify-center"
              color="bg-error40"
              padding="p-extra-small"
              rounded="rounded-extra-small"
            >
              <P textColor="text-error1">NSFW</P>
            </ColorDiv>
            <span className="toggle-label">18+ Years old community</span>
          </label>
        </div>

        <div className="flex gap-small mt-small">
          <Button
            type="submit"
            size="small"
            margin=""
            customCSS="brutalism-border border-secondary80"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            size="small"
            color={theme}
            customCSS="brutalism-border border-secondary80"
            margin=""
          >
            Create community
          </Button>
        </div>
      </form>
    </div>
  );
}
