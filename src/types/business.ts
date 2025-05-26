export interface CreateBusinessProfilePayload {
  address: string;
  businessCategory:
    | "FOOD_TRUCK"
    | "FLEA_MARKET"
    | "PLAY"
    | "PERFORMANCE"
    | "ETC";
  businessNumber: string;
  businessType: "CORPORATION" | "INDIVIDUAL" | "SIMPLIFIED";
  email: string;
  instagram: string;
  introduction: string;
  kakao: string;
  name: string;
  phoneNumber: string;
  thumbImageUrl: string;
}

export interface BusinessProfileResponse {
  id: string;
  address: string | null;
  businessCategory:
    | "FOOD_TRUCK"
    | "FLEA_MARKET"
    | "PLAY"
    | "PERFORMANCE"
    | "ETC";
  businessNumber: string;
  businessType: "CORPORATION" | "INDIVIDUAL" | "SIMPLIFIED";
  email: string;
  instagram: string | null;
  introduction: string | null;
  kakao: string | null;
  name: string;
  phoneNumber: string;
  thumbImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    profileImageUrl: string | null;
  };
}
