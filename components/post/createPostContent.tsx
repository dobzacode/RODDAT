"use client";

import { useEffect, useState } from "react";
import PopUp from "../ui/div/PopUp";
import H2 from "../ui/text/H2";
import PostForm from "./PostForm";

export default function CreatePostContent({}) {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setIsSuccess(false);
    }, 4000);
  }, [isSuccess]);

  return (
    <>
      <section className="flex justify-center">
        <PostForm
          theme="primary"
          title="Create Post"
          setIsSuccess={() => setIsSuccess(true)}
        ></PostForm>
      </section>
      <PopUp isSuccess={isSuccess}>
        <H2 type="sub-heading" textColor="text-success90">
          Your post was successfully created
        </H2>
      </PopUp>
    </>
  );
}
