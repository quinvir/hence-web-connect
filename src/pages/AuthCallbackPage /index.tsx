import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { socialLogin } from "../../api/auth/auth.api";
import { SocialLoginProvider } from "../../types/auth";
import { useUserStore } from "../../stores/userStore";
import styled from "styled-components";
import AlertModal from "../../components/molecules/AlertModal";

const Wrapper = styled.div`
  height: 100vh;
  background-color: #fff;
`;

const AuthCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("알림");
  const [alertMessage, setAlertMessage] = useState<string | string[]>([]);
  const [afterAlertCallback, setAfterAlertCallback] = useState<() => void>(
    () => {}
  );

  const showAlert = (
    title: string,
    message: string | string[],
    callback?: () => void
  ) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAfterAlertCallback(() => callback || (() => {}));
    setAlertOpen(true);
  };

  const handleAlertConfirm = () => {
    setAlertOpen(false);
    afterAlertCallback();
  };
  useEffect(() => {
    const handleAuth = async () => {
      const state = searchParams.get("state");
      const code = searchParams.get("code");
      const error = searchParams.get("error");

      if (error || !code) {
        showAlert("소셜 로그인 실패", "잠시 후 다시 시도해 주세요", () =>
          navigate("/")
        );
        return;
      }

      let provider: SocialLoginProvider | null = null;

      if (state) {
        provider = state as SocialLoginProvider;
      } else {
        const stored = localStorage.getItem("socialProvider");
        provider = stored as SocialLoginProvider | null;
      }

      if (!provider) {
        showAlert(
          "소셜 로그인 실패",
          ["Provider 정보를 찾을 수 없습니다.", "잠시 후 다시 시도해 주세요"],
          () => navigate("/")
        );
        return;
      }

      try {
        const res = await socialLogin({
          credential: code,
          platform: "WEB",
          provider,
        });

        if (res.code !== 200 || !res.data) {
          showAlert(
            "소셜 로그인 실패",
            [
              res.message || "유효하지 않은 응답입니다.",
              "잠시 후 다시 시도해 주세요",
            ],
            () => navigate("/")
          );
          return;
        }

        const { accessToken, refreshToken, isNewUser, user } = res.data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        useUserStore.getState().setUser(user);

        console.log("소셜 로그인 응답:", res);

        if (isNewUser) {
          navigate("/signup-profile");
        } else {
          navigate("/profile/edit");
        }
      } catch (err: any) {
        const message = [
          err?.response?.data?.message || "로그인 처리 중 오류가 발생했습니다.",
          "잠시 후 다시 시도해 주세요",
        ];
        showAlert("오류", message, () => navigate("/"));
      }
    };

    handleAuth();
  }, [navigate, searchParams]);

  return (
    <Wrapper>
      {alertOpen && (
        <AlertModal
          type="confirmOnly"
          title={alertTitle}
          message={alertMessage}
          onConfirm={handleAlertConfirm}
          onCancel={handleAlertConfirm}
        />
      )}
    </Wrapper>
  );
};

export default AuthCallbackPage;
