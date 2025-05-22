import client from "../client";

export interface SignupPayload {
  email: string;
  password: string;
  profileImageUrl?: string | null;
  nickname: string;
  gender: "MALE" | "FEMALE" | "SECRET";
  marketingAgree?: boolean;
}

// 회원가입
export const signup = (data: SignupPayload) => {
  return client.post("/api/v1/user/join", data);
};

// 이메일 중복 여부 체크
export const checkEmailDuplication = (email: string) => {
  return client.get(`/api/v1/user/check-email/${email}`);
};
