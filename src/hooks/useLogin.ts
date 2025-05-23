import { useMutation } from "@tanstack/react-query";
import { login, LoginPayload } from "../api/auth/auth.api";
import { saveTokens } from "../utils/toeknUtils";

export const useLogin = () => {
  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
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
