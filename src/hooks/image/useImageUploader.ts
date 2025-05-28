import { errorCodeMap } from "../../constants/errorCode";
import { useUploadProfileImage } from "./usePrivateImageUpload";

interface UseImageUploaderProps {
  onFileTooLarge?: () => void;
  onError?: (msg: string) => void;
}

export const useImageUploader = ({
  onFileTooLarge,
  onError,
}: UseImageUploaderProps) => {
  const { mutateAsync } = useUploadProfileImage();

  const handleUpload = async (file: File): Promise<string | null> => {
    const MAX_FILE_SIZE = 2 * 1024 * 1024;

    if (file.size > MAX_FILE_SIZE) {
      onFileTooLarge?.();
      return null;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await mutateAsync(formData);
      const { code, data } = res.data;

      if (code === 200 && data?.url) {
        return data.url;
      }

      const errorMessage =
        errorCodeMap[String(code)] ??
        "이미지 업로드 중 알 수 없는 오류가 발생했습니다.";
      onError?.(errorMessage);
      return null;
    } catch (err: any) {
      const message = err?.message ?? "이미지 업로드에 실패했습니다.";

      if (err?.code && errorCodeMap[String(err.code)]) {
        onError?.(errorCodeMap[String(err.code)]);
      } else {
        onError?.(message);
      }

      console.error("이미지 업로드 에러:", err);
      return null;
    }
  };

  return { handleUpload };
};
