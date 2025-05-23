import client from "../client";

export const uploadImageToPublicS3 = (formData: FormData) => {
  return client.post("/api/v1/public/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const uploadImageToPrivateS3 = (formData: FormData) => {
  return client.post("/api/v1/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
