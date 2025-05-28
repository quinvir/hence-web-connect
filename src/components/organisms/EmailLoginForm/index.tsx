import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "../../atoms/Button";
import InputField from "../../molecules/InputField";
import {
  FooterText,
  Form,
  SubRow,
  TextButton,
  TopSection,
  UnderlinedTextButton,
} from "./styles";
import PasswordField from "../../molecules/PasswordField";
import { useLogin } from "../../../hooks/auth/useLogin";
import { useState } from "react";
import AlertModal from "../../molecules/AlertModal";
import { errorCodeMap } from "../../../constants/errorCode";
import { useUserStore } from "../../../stores/userStore";

const EmailLoginForm = () => {
  const navigate = useNavigate();
  const loginUser = useLogin();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    mode: "onBlur",
  });

  const onSignupHandler = () => {
    navigate("/signup");
  };

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("알림");
  const [alertMessage, setAlertMessage] = useState<string | string[]>([]);

  const showAlert = (title: string, message: string | string[]) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertOpen(true);
  };

  const handleAlertConfirm = () => {
    setAlertOpen(false);
  };

  const { setUser } = useUserStore();

  const onSubmit = (data: any) => {
    loginUser.mutate(data, {
      onSuccess: (response) => {
        setUser(response.data.data.user);
        showAlert("Success", "로그인 성공!");
      },
      onError: (err: any) => {
        const code = String(err.code);

        const msg =
          errorCodeMap[code] ??
          "로그인에 실패했습니다. 잠시 후 다시 시도해 주세요.";

        if (code === "3002") {
          setError("email", {
            type: "manual",
            message: "이메일 또는 비밀번호가 일치하지 않습니다.",
          });
          setError("password", {
            type: "manual",
            message: "이메일 또는 비밀번호가 일치하지 않습니다.",
          });
        } else {
          setError("email", {
            type: "manual",
            message: typeof msg === "string" ? msg : msg[0],
          });
        }
      },
    });
  };

  const onForgotPasswordHandler = () => {
    navigate("/forgot-password");
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <TopSection>
        <InputField
          label="이메일"
          type="email"
          name="email"
          placeholder="이메일 주소를 입력하세요"
          gap="8px"
          control={control}
          rules={{
            required: "이메일을 입력해 주세요",
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
          rules={{
            required: "비밀번호를 입력해 주세요",
          }}
        />
        <SubRow>
          <TextButton>
            <UnderlinedTextButton
              onClick={onForgotPasswordHandler}
              width="auto"
              height="auto"
              type="button"
            >
              비밀번호를 잊어버리셨나요?
            </UnderlinedTextButton>
          </TextButton>
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
      {alertOpen && (
        <AlertModal
          type="confirmOnly"
          title="알림"
          message={alertMessage}
          onConfirm={handleAlertConfirm}
          onCancel={handleAlertConfirm}
        />
      )}
    </Form>
  );
};

export default EmailLoginForm;
