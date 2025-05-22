import { useMutation } from "@tanstack/react-query";
import { uploadImageToS3 } from "../api/uplaod/upload.api";

export const useUploadProfileImage = () => {
  return useMutation({
    mutationFn: (formData: FormData) => uploadImageToS3(formData),
  });
};
