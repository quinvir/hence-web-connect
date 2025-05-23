import { useMutation } from "@tanstack/react-query";
import { signup, SignupPayload } from "../api/auth/auth.api";
import { saveTokens } from "../utils/toeknUtils";

export const useSignup = () => {
  return useMutation({
    mutationFn: (payload: SignupPayload) => signup(payload),
    onSuccess: (response) => {
      const { code, data, message } = response.data;

      if (code !== 200 || !data) {
        throw { code, message };
      }

      const { accessToken, refreshToken } = data;
      saveTokens(accessToken, refreshToken);
    },
  });
};
