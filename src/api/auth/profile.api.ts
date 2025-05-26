import {
  BusinessProfileResponse,
  CreateBusinessProfilePayload,
} from "../../types/business";
import client from "../client";

// 개인 프로필 정보 불러오기
export const getUserProfile = async () => {
  const response = await client.get("/api/v1/user/me");
  return response.data;
};

// 개인 프로필 수정
export const updateUserProfile = async (data: any) => {
  const response = await client.patch("/api/v1/user/me", data);
  return response.data;
};

// 비즈니스 프로필 등록하기
export const createBusinessProfile = async (
  data: CreateBusinessProfilePayload
): Promise<{
  code: number;
  data: BusinessProfileResponse;
  message?: string;
}> => {
  const response = await client.post("/api/v1/vendor", data);

  console.log("비즈니스 프로필 등록 성공!", response);
  return response.data;
};

// 비즈니스 프로필 정보 불러오기
export const getBusinessProfile = async (vendorId: string) => {
  const response = await client.get(`/api/v1/vendor/${vendorId}`);

  console.log("비즈니스 프로필 정보 불러오기", response);
  return response.data;
};

// 비즈니스 프로필 수정
export const updateBusinessProfile = async (vendorId: string, data: any) => {
  const response = await client.patch(`/api/v1/vendor/${vendorId}`, data);

  console.log("비즈니스 프로필 업데이트 성공!", response);
  return response.data;
};
