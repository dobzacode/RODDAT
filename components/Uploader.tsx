import { uploadMedia } from "@/utils/utils";
import { useState } from "react";

const Uploader = () => {
  const [uploadedUrl, setUploadedUrl] = useState("");

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]!;
    const res = await uploadMedia(
      file,
      "post",
      "153507ad-43c9-41e5-9cf8-06d6b5634eba",
    );
    console.log(res.status);
    setUploadedUrl(res.uploadedUrl);
  };

  return (
    <>
      {uploadedUrl && <img src={uploadedUrl} alt="Preview" />}
      <label className="hidden" htmlFor="picture"></label>
      <input
        name="picture"
        id="picture"
        type="file"
        onChange={handleChange}
        accept="image/png, image/jpeg"
      />
    </>
  );
};

export default Uploader;
