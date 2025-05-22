import { useMutation } from "@tanstack/react-query";
import { signup, SignupPayload } from "../api/auth/auth.api";
import { saveTokens } from "../utils/toeknUtils";

export const useSignup = () => {
  return useMutation({
    mutationFn: (payload: SignupPayload) => signup(payload),
    onSuccess: (response) => {
      const { accessToken, refreshToken } = response.data.data;
      saveTokens(accessToken, refreshToken);
    },
  });
};
