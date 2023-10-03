import { ChangeEvent } from "react";

export const handleInputChange = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  formData: unknown,
  setFormData: any
) => {
  e.stopPropagation();

  const { name, value, type } = e.target;

  setFormData((prevFormData: any) => {
    if (type === "checkbox") {
      return {
        ...prevFormData,
        [name]: (e.target as HTMLInputElement).checked,
      };
    }
    return { ...prevFormData, [name]: value };
  });
};
