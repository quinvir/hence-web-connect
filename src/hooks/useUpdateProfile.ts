// hooks/useUpdateProfile.ts
import { useMutation } from "@tanstack/react-query";
import { useUserStore } from "../stores/userStore";
import { patchUserProfile } from "../api/auth/auth.api";

export const useUpdateProfile = () => {
  const updateUser = useUserStore((state) => state.updateUser);

  return useMutation({
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
