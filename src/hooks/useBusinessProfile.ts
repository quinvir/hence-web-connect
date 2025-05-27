import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getBusinessProfile,
  createBusinessProfile,
  updateBusinessProfile,
} from "../api/auth/profile.api";
import { useBusinessUserStore } from "../stores/businessUserStore";
import {
  BusinessProfileResponse,
  CreateBusinessProfilePayload,
} from "../types/business";

// 비즈니스 프로필 조회
export const useBusinessProfile = (vendorId: string) => {
  return useQuery({
    queryKey: ["businessProfile", vendorId],
    queryFn: () => getBusinessProfile(vendorId),
    enabled: !!vendorId,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

// 비즈니스 프로필 등록
export const useCreateBusinessProfile = () => {
  const setBusinessUser = useBusinessUserStore(
    (state) => state.setBusinessUser
  );

  return useMutation<
    BusinessProfileResponse, // Success 타입
    { code: number; message?: string; errors?: any[] }, // Error 타입
    CreateBusinessProfilePayload
  >({
    mutationFn: async (data) => {
      const res = await createBusinessProfile(data);
      const { code, data: profile, message, errors } = res;

      if (code !== 200 || !profile) {
        throw { code, message, errors };
      }

      return profile;
    },
    onSuccess: (data) => {
      setBusinessUser(data);
    },
  });
};

// 비즈니스 프로필 수정
export const useUpdateBusinessProfile = (vendorId: string) => {
  const setBusinessUser = useBusinessUserStore(
    (state) => state.setBusinessUser
  );

  return useMutation<
    BusinessProfileResponse,
    { code: number; message?: string; errors?: { msg: string }[] },
    Partial<CreateBusinessProfilePayload>
  >({
    mutationFn: async (data) => {
      const res = await updateBusinessProfile(vendorId, data);
      const { code, data: profile, message, errors } = res;

      if (code !== 200 || !profile) {
        throw { code, message, errors };
      }

      return profile;
    },
    onSuccess: (profile) => {
      setBusinessUser(profile);
    },
  });
};
