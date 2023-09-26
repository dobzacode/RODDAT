"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import Input from "./Input";
import Label from "./Label";

import H1 from "../text/H1";

import Button from "../button/Button";

interface FormData {
  name: string;
  password: string;
  email: string;
  selectValue: string;
  radioValue: string;
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
    password: "",
    email: "",
    selectValue: "",
    radioValue: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    console.log(formData);
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
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
      className={`flex flex-col gap-medium items-center bg-${theme}1 rounded-extra-small shadow-${theme}-high border border-${theme}10 p-sub-large`}
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
        className={`body flex flex-col gap-sub-medium `}
        onSubmit={handleSubmit}
      >
        <Input
          hiddenLabel={true}
          placeholder="Nom"
          color={theme}
          type="text"
          flex="flex flex-col gap-small"
          id="name"
          value={formData.name}
          onChange={handleChange}
        ></Input>

        <Input
          hiddenLabel={true}
          placeholder="Email"
          color={theme}
          type="email"
          flex="flex flex-col gap-small"
          id="email"
          value={formData.email}
          onChange={handleChange}
        ></Input>
        <Input
          hiddenLabel={true}
          placeholder="Password"
          color={theme}
          type="password"
          flex="flex flex-col gap-small"
          id="password"
          value={formData.password}
          onChange={handleChange}
        ></Input>
        <Input
          type="select"
          hiddenLabel={true}
          placeholder="Your choice"
          color={theme}
          id="selectValue"
          choices={["First choice", "Second choice", "Third choice"]}
          value={formData.selectValue}
          onChange={handleChange}
        ></Input>

        <Input
          type="radio"
          hiddenLabel={true}
          color={theme}
          id="radioValue"
          choices={["First choice", "Second choice"]}
          value={formData.radioValue}
          onChange={handleChange}
        ></Input>

        <Button
          type="submit"
          size="small"
          color={theme}
          margin="mx-large mt-small"
        >
          ENVOYER
        </Button>
      </form>
    </div>
  );
}
