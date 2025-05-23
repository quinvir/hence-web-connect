import { useMutation } from "@tanstack/react-query";
import { useUserStore } from "../stores/userStore";
import { patchUserProfile } from "../api/auth/profile.api";
import type { PatchUserProfilePayload, User } from "../types/user";

export const useUpdateProfile = () => {
  const updateUser = useUserStore((state) => state.updateUser);

  return useMutation<User, any, PatchUserProfilePayload>({
    mutationFn: async (data) => {
      const res = await patchUserProfile(data);
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
