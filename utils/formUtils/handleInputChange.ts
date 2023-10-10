import { ChangeEvent } from "react";

export const handleInputChange = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  formData: unknown,
  setFormData: any,
  specialValue?: string,
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
    if (specialValue) {
      return { ...prevFormData, [name]: specialValue };
    }
    return { ...prevFormData, [name]: value };
  });
};
