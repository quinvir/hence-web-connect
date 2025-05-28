import { useMutation } from "@tanstack/react-query";
import { requestPasswordReset } from "../../api/auth/auth.api";

export const usePasswordReset = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  return useMutation({
    mutationFn: (email: string) => requestPasswordReset(email),
    onSuccess: (response) => {
      const { code, message } = response.data;
      if (code !== 200) {
        throw new Error(message || "비밀번호 재설정 요청 실패");
      }
      onSuccess?.();
    },
    onError: (error) => {
      onError?.(error as Error);
    },
  });
};
