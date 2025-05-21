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

const ForgotPasswordTemplate = () => {
  const [email, setEmail] = useState("");

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState<"fileSize" | "saveConfirm" | null>(
    null
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const navigate = useNavigate();

  const handleAlertConfirm = () => {
    setAlertOpen(false);
  };

  const onSubmit = (data: any) => {
    setEmail(data.email);

    setAlertType("saveConfirm");
    setAlertOpen(true);
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
