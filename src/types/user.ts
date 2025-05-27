export interface User {
  id: string;
  email: string;
  name: string;
  provider: "EMAIL" | "KAKAO" | "GOOGLE";
  role: "USER" | "ADMIN";
  gender: "MALE" | "FEMALE";
  profileImageUrl: string | null;
  introduction: string | null;
  phoneNumber: string;
  marketingConsent: boolean;
  marketingConsentDate: string | null;
  instagram: string | null;
  kakao: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserProfilePayload {
  name: string;
  gender: "MALE" | "FEMALE";
  introduction?: string | null;
  instagram?: string | null;
  kakao?: string | null;
  marketingConsent: boolean;
  profileImageUrl?: string | null;
}

export interface UpdateUserResponse {
  code: number;
  message: string;
  data: User;
}
