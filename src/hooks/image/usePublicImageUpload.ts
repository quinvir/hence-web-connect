import { useMutation } from "@tanstack/react-query";
import { uploadImageToPublicS3 } from "../../api/uplaod/upload.api";

export const usePublicImageUpload = () => {
  return useMutation({
    mutationFn: (formData: FormData) => uploadImageToPublicS3(formData),
  });
};
