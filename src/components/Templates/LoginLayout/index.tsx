import { Helmet } from "react-helmet";
import LoginFormSection from "../../organisms/LoginFormSection";
import LoginVisualSection from "../../organisms/LoginVisualSection";
import { Left, Right, Wrapper } from "./styles";

export default function LoginLayout() {
  return (
    <>
      <Helmet>
        <title>HENCE Connect 로그인</title>
        <link
          rel="preload"
          href="/assets/images/login/background.jpg"
          as="image"
          type="image/jpeg"
        />
      </Helmet>

      <Wrapper>
        <Left>
          <LoginVisualSection />
        </Left>
        <Right>
          <LoginFormSection />
        </Right>
      </Wrapper>
    </>
  );
}
