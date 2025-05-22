import client from "../client";

export const uploadImageToS3 = (formData: FormData) => {
  return client.post("/api/v1/public/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
