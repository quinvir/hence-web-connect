import { useForm } from "react-hook-form";
import Button from "../../atoms/Button";
import InputField from "../../molecules/InputField";
import PasswordField from "../../molecules/PasswordField";
import AuthFormCard from "../../organisms/AuthFormCard";
import {
  ButonBox,
  Form,
  Highlight,
  InputFieldWrapper,
  NoticeBox,
} from "./styles";
import { useNavigate } from "react-router-dom";

const SignupEmailTemplate = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onBlur",
  });

  const email = watch("email");
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const isPasswordConfirmed = confirmPassword === password;
  const isFormReady =
    email &&
    password &&
    confirmPassword &&
    isPasswordConfirmed &&
    !errors.email &&
    !errors.password;

  const navigate = useNavigate();

  const onSignupHandler = (data: any) => {
    console.log("회원가입 데이터", data);

    navigate("/signup-profile");
  };

  return (
    <AuthFormCard
      title="이메일 회원가입하기 👏🏻"
      subtitle={
        <>
          지금 회원가입하고 <Highlight>HENCE Connect</Highlight> 서비스를
          이용해보세요
        </>
      }
    >
      <Form onSubmit={handleSubmit(onSignupHandler)}>
        <InputFieldWrapper>
          <InputField
            label="이메일"
            type="email"
            placeholder="이메일을 입력하세요"
            name="email"
            signup
            control={control}
            rules={{
              required: "이메일을 입력해주세요",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "유효한 이메일 주소를 입력해주세요",
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
            placeholder="비밀번호를 입력하세요"
            name="password"
            control={control}
            signup
            rules={{
              required: "비밀번호를 입력해주세요",
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=])[A-Za-z\d!@#$%^&*()_\-+=]{8,20}$/,
                message:
                  "8~20자, 대문자, 소문자, 숫자, 특수문자를 포함해주세요.",
              },
            }}
            errorMessage={
              typeof errors.password?.message === "string"
                ? errors.password.message
                : undefined
            }
          />
          <PasswordField
            label="비밀번호 확인"
            name="confirmPassword"
            placeholder="비밀번호를 다시 입력하세요"
            signup
            control={control}
            rules={{
              validate: (value) =>
                value === password || "비밀번호가 일치하지 않습니다",
            }}
            errorMessage={
              typeof errors.confirmPassword?.message === "string"
                ? errors.confirmPassword.message
                : undefined
            }
          />
        </InputFieldWrapper>
        <ButonBox>
          <Button
            type="submit"
            disabled={!isFormReady}
            $backgroudnColor={isFormReady ? "#2B77F5" : "#E6E6E6"}
            $textColor={isFormReady ? "#FFF" : "#969696"}
            $borderRadius="10px"
          >
            회원가입 하기
          </Button>
        </ButonBox>
      </Form>
      <NoticeBox>
        <p>
          회원가입을 누르시면 <span>이용약관</span>과{" "}
          <span>개인정보 보호방침</span>에 동의하는 것으로 간주됩니다.
        </p>
      </NoticeBox>
    </AuthFormCard>
  );
};

export default SignupEmailTemplate;
