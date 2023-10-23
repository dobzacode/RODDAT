import Image from "next/image";
import { useState } from "react";
import Icon from "@mdi/react";
import { mdiImagePlusOutline } from "@mdi/js";

const Uploader = ({
  selectedFile,
  setSelectedFile,
}: {
  selectedFile: File | null;
  setSelectedFile: Function;
}) => {
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]!;
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      {!selectedFile && (
        <>
          <div className="h-[200px] w-[200px] rounded-small border border-primary90/[.2] bg-primary5 dark:border-primary10/[.2] dark:bg-primary90"></div>
          <Icon
            className="-translate-x absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 transform opacity-50"
            path={mdiImagePlusOutline}
            size={5}
          />
        </>
      )}
      {selectedFile && (
        <Image
          src={URL.createObjectURL(selectedFile)}
          alt="Preview"
          className="rounded-small"
          width={200}
          height={200}
        />
      )}

      <label
        className="hidden"
        htmlFor="picture"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          cursor: "pointer",
        }}
      >
        Cliquez pour choisir une image
      </label>
      <input
        name="picture"
        id="picture"
        type="file"
        onChange={handleChange}
        accept="image/png, image/jpeg"
        style={{
          opacity: 0,
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          cursor: "pointer",
        }}
      />
    </div>
  );
};

export default Uploader;
