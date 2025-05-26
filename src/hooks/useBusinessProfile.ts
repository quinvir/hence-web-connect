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
    { code: number; data: BusinessProfileResponse },
    Error,
    CreateBusinessProfilePayload
  >({
    mutationFn: createBusinessProfile,
    onSuccess: (res) => {
      if (res.code === 200 && res.data) {
        setBusinessUser(res.data);
      }
    },
  });
};

// 비즈니스 프로필 수정
export const useUpdateBusinessProfile = (vendorId: string) => {
  const setBusinessUser = useBusinessUserStore(
    (state) => state.setBusinessUser
  );

  return useMutation<
    { code: number; data: BusinessProfileResponse },
    Error,
    Partial<CreateBusinessProfilePayload>
  >({
    mutationFn: (data) => updateBusinessProfile(vendorId, data),
    onSuccess: (res) => {
      const { code, data } = res;
      if (code === 200 && data) {
        setBusinessUser(data);
      }
    },
  });
};
