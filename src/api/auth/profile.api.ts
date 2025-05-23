import client from "../client";

// 프로필 수정
export const patchUserProfile = async (data: any) => {
  const response = await client.patch("/api/v1/user/me", data);
  return response.data;
};
