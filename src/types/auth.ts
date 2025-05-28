export type SocialLoginProvider = "GOOGLE" | "NAVER" | "KAKAO";

export interface SocialLoginRequest {
  credential: string;
  platform: "WEB" | "IOS" | "ANDROID";
  provider: SocialLoginProvider;
}

export interface User {
  id: string;
  email: string;
  name: string;
  provider: SocialLoginProvider;
  role: string;
  gender: "MALE" | "FEMALE" | "SECRET";
  profileImageUrl: string | null;
  introduction: string | null;
  phoneNumber: string | null;
  marketingConsent: boolean;
  marketingConsentDate: string | null;
  instagram: string | null;
  kakao: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SocialLoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  isNewUser: boolean;
}
