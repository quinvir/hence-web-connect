import { useMutation } from "@tanstack/react-query";
import { uploadImageToPrivateS3 } from "../../api/uplaod/upload.api";

export const useUploadProfileImage = () => {
  return useMutation({
    mutationFn: (formData: FormData) => uploadImageToPrivateS3(formData),
  });
};
