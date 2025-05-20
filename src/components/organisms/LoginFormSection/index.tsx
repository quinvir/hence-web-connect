import SocialLoginButtonGroup from "../../molecules/SocialLoginButton";
import EmailLoginForm from "../EmailLoginForm";
import { Divider, Line, Text, TextBox, Wrapper } from "./styles";

const LoginFormSection = () => {
  return (
    <Wrapper>
      <TextBox>
        <h1>환영합니다 👋🏻</h1>
        <p>
          계정에 로그인하고 <span>HENCE Connect</span> 서비스를 이용해보세요
        </p>
      </TextBox>
      <SocialLoginButtonGroup />
      <Divider>
        <Line />
        <Text>또는</Text>
        <Line />
      </Divider>
      <EmailLoginForm />
    </Wrapper>
  );
};

export default LoginFormSection;
