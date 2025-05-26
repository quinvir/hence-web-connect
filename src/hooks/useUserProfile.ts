import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserProfile, updateUserProfile } from "../api/auth/profile.api";
import { useUserStore } from "../stores/userStore";
import { UpdateUserProfilePayload, User } from "../types/user";

// 개인 프로필 정보 가져오기
export const useUserProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

// 개인 프로필 정보 업데이트
export const useUpdateProfile = () => {
  const updateUser = useUserStore((state) => state.updateUser);

  return useMutation<User, any, UpdateUserProfilePayload>({
    mutationFn: async (data) => {
      const res = await updateUserProfile(data);
      const { code, data: user, message } = res;

      if (code !== 200 || !user) {
        throw { code, message };
      }

      return user;
    },
    onSuccess: (user) => {
      updateUser(user);
    },
  });
};
