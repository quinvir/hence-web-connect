import client from "../client";

// 프로필 정보 불러오기
export const getUserProfile = async (data: any) => {
  const response = await client.get("/api/v1/user/me", data);
  return response.data;
};

// 프로필 수정
export const patchUserProfile = async (data: any) => {
  const response = await client.patch("/api/v1/user/me", data);
  return response.data;
};
