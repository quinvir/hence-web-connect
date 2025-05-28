import styled from "styled-components";
import Button from "../atoms/Button";
import { SocialLoginProvider } from "../../types/auth";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  button {
    min-width: 320px;
  }
`;

const SocialLoginButtonGroup = () => {
  const redirectToOAuth = (
    provider: SocialLoginProvider,
    authUrl: string,
    params: Record<string, string>
  ) => {
    localStorage.setItem("socialProvider", provider);
    const query = new URLSearchParams(params).toString();
    window.location.href = `${authUrl}?${query}`;
  };

  const handleKakaoLogin = () => {
    const clientId = process.env.REACT_APP_KAKAO_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_KAKAO_REDIRECT_URI;

    if (!clientId || !redirectUri) {
      alert("Kakao Client ID 또는 Redirect URI가 설정되지 않았습니다.");
      return;
    }

    redirectToOAuth("KAKAO", "https://kauth.kakao.com/oauth/authorize", {
      response_type: "code",
      client_id: clientId,
      redirect_uri: redirectUri,
      state: "KAKAO",
    });
  };

  const handleNaverLogin = () => {
    const clientId = process.env.REACT_APP_NAVER_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_NAVER_REDIRECT_URI;

    if (!clientId || !redirectUri) {
      alert("Naver Client ID 또는 Redirect URI가 설정되지 않았습니다.");
      return;
    }

    redirectToOAuth("NAVER", "https://nid.naver.com/oauth2.0/authorize", {
      response_type: "code",
      client_id: clientId,
      redirect_uri: redirectUri,
      state: "NAVER",
    });
  };

  const handleGoogleLogin = () => {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_GOOGLE_REDIRECT_URI;

    if (!clientId || !redirectUri) {
      alert("Google Client ID 또는 Redirect URI가 설정되지 않았습니다.");
      return;
    }

    redirectToOAuth("GOOGLE", "https://accounts.google.com/o/oauth2/v2/auth", {
      response_type: "code",
      client_id: clientId,
      redirect_uri: redirectUri,
      scope: "openid email profile",
      state: "GOOGLE",
    });
  };

  return (
    <Wrapper>
      <Button
        $backgroudnColor="#FFE333"
        $textColor="#000"
        onClick={handleKakaoLogin}
      >
        카카오 계정으로 연결하기
      </Button>
      <Button
        $backgroudnColor="#00BB57"
        $textColor="#FFF"
        onClick={handleNaverLogin}
      >
        네이버 계정으로 연결하기
      </Button>
      <Button
        $backgroudnColor="#fff"
        $textColor="#000"
        $borderColor="1px solid #D9D9D9"
        onClick={handleGoogleLogin}
      >
        구글 계정으로 연결하기
      </Button>
    </Wrapper>
  );
};

export default SocialLoginButtonGroup;
