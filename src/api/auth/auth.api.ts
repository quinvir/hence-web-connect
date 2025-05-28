import { SocialLoginRequest, SocialLoginResponse } from "../../types/auth";
import client from "../client";

export interface SignupPayload {
  email: string;
  password: string;
  profileImageUrl?: string | null;
  name: string;
  gender: "MALE" | "FEMALE" | "SECRET";
  marketingAgree?: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
}

// 회원가입
export const signup = (data: SignupPayload) => {
  return client.post("/api/v1/user/join", data);
};

// 이메일 중복 여부 체크
export const checkEmailDuplication = (email: string) => {
  return client.get(`/api/v1/user/check-email/${email}`);
};

// 로그인
export const login = (data: LoginPayload) => {
  return client.post("/api/v1/user/login", data);
};

// 비밀번호 재설정 링크 요청
export const requestPasswordReset = (email: string) => {
  return client.post("/api/v1/user/password-reset", { email });
};

type RawResponse<T> = {
  code: number;
  message: string;
  data: T | null;
};
// 소셜 로그인
export const socialLogin = async (
  data: SocialLoginRequest
): Promise<RawResponse<SocialLoginResponse>> => {
  const response = await client.post("/api/v1/user/social", data);
  return response.data;
};
