import { useQuery } from "@tanstack/react-query";
import { AuthAPI } from "../api";

export const useCheckEmail = (email: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["checkEmail", email],
    queryFn: () =>
      AuthAPI.checkEmailDuplication(email).then((res) => res.data.data),
    enabled: !!email && enabled,
    retry: false,
    staleTime: 0,
  });
};
