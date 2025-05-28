import { useState } from "react";
import AuthFormCard from "../../organisms/AuthFormCard";
import {
  ButtonBox,
  Container,
  Form,
  StyledEmail,
  StyledMessage,
} from "./styles";
import { useNavigate } from "react-router-dom";
import AlertModal from "../../molecules/AlertModal";
import InputField from "../../molecules/InputField";
import { useForm } from "react-hook-form";
import Button from "../../atoms/Button";
import { useCheckEmail } from "../../../hooks/auth/useCheckEmail";
import { usePasswordReset } from "../../../hooks/auth/usePasswordReset";

const ForgotPasswordTemplate = () => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const [email, setEmail] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState<"fileSize" | "saveConfirm" | null>(
    null
  );

  const watchEmail = watch("email");
  const navigate = useNavigate();

  // 호출부에서 객체가 아니라 boolean만 넘기기
  const { refetch: refetchEmailCheck } = useCheckEmail(watchEmail, false);

  const passwordResetMutation = usePasswordReset({
    onSuccess: () => {
      setEmail(watchEmail);
      setAlertOpen(true);
    },
    onError: (error) => {
      setError("email", {
        type: "manual",
        message: error.message || "비밀번호 재설정 요청에 실패했습니다.",
      });
    },
  });

  const handleAlertConfirm = () => {
    setAlertOpen(false);
  };

  const onSubmit = async (data: any) => {
    const { data: checkResult } = await refetchEmailCheck();
    if (!checkResult?.exists) {
      setError("email", {
        type: "manual",
        message: "존재하지 않는 이메일입니다.",
      });
      return;
    }

    passwordResetMutation.mutate(data.email);
  };

  return (
    <Container>
      <h1>비밀번호 찾기</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {alertOpen && (
          <AlertModal
            type="confirmOnly"
            title="알림"
            message={
              <StyledMessage>
                비밀번호 재설정 링크를 <br />
                <StyledEmail>{email}</StyledEmail> 으로 <br />
                보내드렸어요 😎
              </StyledMessage>
            }
            onConfirm={handleAlertConfirm}
            onCancel={handleAlertConfirm}
          />
        )}

        <InputField
          label="이메일"
          type="email"
          name="email"
          placeholder="이메일을 입력하세요"
          gap="8px"
          control={control}
          signup
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
        <ButtonBox>
          <Button
            type="submit"
            width="320px"
            $backgroudnColor={isValid ? "#2B77F5" : "#E6E6E6"}
            $textColor={isValid ? "#fff" : "#969696"}
            $borderRadius="10px"
          >
            비밀번호 재설정 하기
          </Button>
        </ButtonBox>
      </Form>
    </Container>
  );
};

export default ForgotPasswordTemplate;
