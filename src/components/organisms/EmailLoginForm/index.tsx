import Button from "../../atoms/Button";
import InputField from "../../molecules/InputField";
import { FooterText, Form, SubRow, TextButton, TopSection } from "./styles";

const EmailLoginForm = () => {
  return (
    <Form>
      <TopSection>
        <InputField
          label="이메일"
          type="email"
          name="email"
          placeholder="이메일 주소를 입력하세요"
        />
        <InputField
          label="비밀번호"
          type="password"
          name="password"
          placeholder="비밀번호를 입력하세요"
        />
        <SubRow>
          <TextButton>비밀번호를 잊어버리셨나요?</TextButton>
        </SubRow>
      </TopSection>
      <Button $backgroudnColor="#2B77F5" $textColor="#FFF">
        로그인
      </Button>
      <FooterText>
        <p>아직 계정이 없으신가요?</p>
        <Button width="auto" height="auto" $textColor="#2B77F5">
          회원가입
        </Button>
      </FooterText>
    </Form>
  );
};

export default EmailLoginForm;
