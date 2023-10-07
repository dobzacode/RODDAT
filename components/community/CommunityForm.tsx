"use client";

import { ChangeEvent, FC, FormEvent, HTMLProps, useState } from "react";
import Input from "../ui/form/Input";
import Label from "../ui/form/Label";

import H1 from "../ui/text/H1";

import Button from "../ui/button/Button";
import H2 from "../ui/text/H2";
import H3 from "../ui/text/H3";
import ColorDiv from "../ui/div/colorDiv";
import P from "../ui/text/P";
import { getSession } from "next-auth/react";
import { ClipLoader } from "react-spinners";
import { CSSTransition } from "react-transition-group";
import GenericForm from "../ui/form/GenericForm";
import { handleInputChange } from "@/utils/formUtils/handleInputChange";

interface CommunityFormData {
  name: string;
  visibility: "Public" | "Restricted" | "Private";
  isNsfw: boolean;
}

interface CommunityFormProps extends HTMLProps<HTMLElement> {
  title: string;
  theme: "primary" | "secondary" | "tertiary" | "neutral";
  setIsOpen: Function;
  setIsSuccess: Function;
}

const CommunityForm: FC<CommunityFormProps> = ({
  title,
  theme,
  setIsOpen,
  setIsSuccess,
}) => {
  const [formData, setFormData] = useState<CommunityFormData>({
    name: "",
    visibility: "Public",
    isNsfw: false,
  });

  const [isAlreadyTaken, setIsAlreadyTaken] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    handleInputChange(e, formData, setFormData);
  };

  const handleSubmit = async () => {
    const session = await getSession();
    const res = await fetch(`/api/communities?email=${session?.user?.email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();

    if (data.status === 400) {
      setIsAlreadyTaken(data.communityName);
      throw new Error("400");
    }

    setIsAlreadyTaken(null);
    return data;
  };

  return (
    <div
      className={`flex flex-col text-${theme}80 items-center gap-medium bg-${theme}1 h-auto rounded-extra-small`}
    >
      <GenericForm
        theme={theme}
        setIsOpen={setIsOpen}
        setIsSuccess={setIsSuccess}
        title={title}
        formData={formData}
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-sub-medium">
          <H3 type="sub-heading">Name</H3>
          <Input
            required
            hiddenLabel={true}
            placeholder="r/"
            color={theme}
            type="text"
            className="flex flex-col gap-small"
            id="name"
            value={formData.name}
            onChange={handleChange}
          ></Input>
          {isAlreadyTaken && (
            <p className="text-error40">{`r/${isAlreadyTaken} is already taken`}</p>
          )}
        </div>
        <div className="flex flex-col gap-sub-medium">
          <H3 type="sub-heading">Community type</H3>
          <Input
            required
            type="radio"
            hiddenLabel={false}
            intent={theme}
            id="visibility"
            choices={["Public", "Restricted", "Private"]}
            customText={[
              "Anyone can view, post, and comment to this community",
              "Anyone can view this community, but only approved users can post",
              "Only approved users can view and submit to this community",
            ]}
            value={formData.visibility}
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
      </GenericForm>
    </div>
  );
};

export default CommunityForm;
