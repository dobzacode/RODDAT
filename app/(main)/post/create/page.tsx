"use client";

import PopUp from "@/components/div/PopUp";
import PostForm from "@/components/form/PostForm";
import H2 from "@/components/text/H2";
import { useEffect, useState } from "react";

export default function CreatePost({}) {
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
