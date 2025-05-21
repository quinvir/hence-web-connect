import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "../../atoms/Button";
import InputField from "../../molecules/InputField";
import { FooterText, Form, SubRow, TextButton, TopSection } from "./styles";
import PasswordField from "../../molecules/PasswordField";

const EmailLoginForm = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const onSignupHandler = () => {
    navigate("/signup");
  };

  const onValid = (data: any) => {
    // console.log("로그인 요청 데이터:", data);
  };

  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <TopSection>
        <InputField
          label="이메일"
          type="email"
          name="email"
          placeholder="이메일 주소를 입력하세요"
          gap="8px"
          control={control}
          rules={{
            required: "이메일을 입력해주세요",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "올바른 이메일 형식이 아닙니다",
            },
          }}
          errorMessage={
            typeof errors.email?.message === "string"
              ? errors.email.message
              : undefined
          }
        />
        <PasswordField
          label="비밀번호"
          name="password"
          placeholder="비밀번호를 입력하세요"
          control={control}
          errorMessage={
            typeof errors.password?.message === "string"
              ? errors.password.message
              : undefined
          }
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
        <Button
          onClick={onSignupHandler}
          width="auto"
          height="auto"
          $textColor="#2B77F5"
        >
          회원가입
        </Button>
      </FooterText>
    </Form>
  );
};

export default EmailLoginForm;
