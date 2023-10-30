"use client";

import { ChangeEvent, FC, ReactNode, useEffect, useState } from "react";
import Input from "../ui/form/Input";

import { handleInputChange } from "@/utils/formUtils/handleInputChange";
import { uploadMedia } from "@/utils/utils";
import { Community } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Uploader from "../Uploader";
import ColorDiv from "../ui/div/colorDiv";
import GenericForm from "../ui/form/GenericForm";
import H3 from "../ui/text/H3";
import P from "../ui/text/P";

interface CommunityFormData {
  name: string;
  visibility: "Public" | "Restricted" | "Private";
  isNsfw: boolean;
  description: string;
}

interface CommunityFormProps {
  title: string | ReactNode;
  theme: "primary" | "secondary" | "tertiary" | "neutral";
  setIsOpen?: Function;

  community?: Community;
}

const regex = /^[a-zA-Z0-9\s]+$/;

const CommunityForm: FC<CommunityFormProps> = ({
  title,
  theme,
  setIsOpen,

  community,
}) => {
  const visibilityBase = community
    ? community.visibility.charAt(0) +
      community.visibility.slice(1).toLowerCase()
    : "Public";

  const [formData, setFormData] = useState<CommunityFormData>({
    name: community ? community.name : "",
    visibility: visibilityBase as "Public" | "Restricted" | "Private",
    isNsfw: community ? community.isNsfw : false,
    description: community?.description ? community.description : "",
  });

  const [isSpecialCharacter, setIsSpecialCharacter] = useState<boolean>(false);
  const { data: session } = useSession();
  const [isAlreadyTaken, setIsAlreadyTaken] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setIsSuccess(false);
    }, 4000);
  }, [isSuccess]);

  console.log(isSuccess);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setIsAlreadyTaken(null);
    if (e.target.name === "name") {
      if (e.target.value === "") {
        setIsSpecialCharacter(false);
      } else if (!regex.test(e.target.value)) {
        setIsSpecialCharacter(true);
      } else {
        setIsSpecialCharacter(false);
      }
      const specialValue = e.target.value.replace(/\s/g, "");
      return handleInputChange(e, formData, setFormData, specialValue);
    }
    handleInputChange(e, formData, setFormData);
  };

  const handleSubmit = async () => {
    if (isSpecialCharacter) {
      return;
    }

    let data;
    try {
      if (community?.community_id) {
        const res = await fetch(
          `/api/communities?community=${community.community_id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          },
        );
        data = await res.json();
      } else {
        const res = await fetch(
          `/api/communities?email=${session?.user?.email}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          },
        );
        data = await res.json();
      }

      if (data.status === 400) {
        setIsAlreadyTaken(data.communityName);
        throw new Error("400");
      }

      if (selectedFile) {
        const uploadRes = await uploadMedia(
          selectedFile,
          "community",
          data.community.community_id,
        );
      }

      setIsAlreadyTaken(null);
      return router.push(
        `/community/${data.community.name}?popup=true&type=${
          community?.community_id ? "modified" : "created"
        }&name=${data.community.name}`,
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div
        className={`flex flex-col text-${theme}80 h-auto w-full  items-center gap-medium rounded-extra-small`}
      >
        <GenericForm
          className=""
          theme={theme}
          setIsOpen={setIsOpen}
          setIsSuccess={setIsSuccess}
          title={title}
          formData={formData}
          onSubmit={handleSubmit}
          isSpecialCharacter={isSpecialCharacter}
        >
          <div className="flex flex-col gap-sub-medium">
            <div className="flex flex-wrap  gap-sub-medium">
              <div className="flex flex-col gap-sub-medium  ">
                <H3 type="sub-heading">Picture</H3>
                <Uploader
                  communityPicture={community?.picture}
                  selectedFile={selectedFile}
                  setSelectedFile={setSelectedFile}
                ></Uploader>
              </div>
              <div className="flex grow flex-col gap-sub-medium">
                <H3 type="sub-heading">Name</H3>
                <Input
                  required
                  hiddenLabel={true}
                  placeholder="r/"
                  intent={theme}
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
            </div>
          </div>
          {isSpecialCharacter && (
            <p className="  text-error40">
              Special characters are not allowed in post title
            </p>
          )}
          <div className="flex flex-col gap-sub-medium  ">
            <H3 type="sub-heading">Description</H3>
            <Input
              hiddenLabel={true}
              intent={theme}
              type="textarea"
              rows={4}
              className="flex flex-col gap-small"
              id="description"
              value={formData.description}
              onChange={handleChange}
            ></Input>
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
            <label className="flex flex-wrap items-center gap-extra-small">
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
              <P className="toggle-label">18+ Years old community</P>
            </label>
          </div>
        </GenericForm>
      </div>
    </>
  );
};

export default CommunityForm;
