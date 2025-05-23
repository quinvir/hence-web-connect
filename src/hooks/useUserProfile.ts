import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../api/auth/profile.api";

export const useUserProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
