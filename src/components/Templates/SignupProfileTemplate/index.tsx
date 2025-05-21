import { useForm } from "react-hook-form";
import AuthFormCard from "../../organisms/AuthFormCard";
import InputField from "../../molecules/InputField";
import Button from "../../atoms/Button";
import ProfileImageUploader from "../../molecules/ProfileImageUploader";
import { Form, InputFieldWrapper } from "./styles";
import DashedBorderBox from "../../atoms/DashedBorderBox";
import { useState } from "react";
import GenderSelector from "../../molecules/GenderSelector";
import MarketingAgreement from "../../molecules/MarketingAgreement";
import { useNavigate } from "react-router-dom";

const SignupProfileTemplate = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      nickname: "",
      gender: "female",
      marketingAgree: "yes",
    },
  });

  const [image, setImage] = useState<string | null>(null);

  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    console.log("회원가입 데이터:", data);

    localStorage.setItem("nickname", data.nickname);
    navigate("/welcome");
  };

  return (
    <AuthFormCard
      title="가입 완료하기 👍"
      subtitle={<>작성한 정보는 얼마든지 변경이 가능하니 걱정마세요 😌</>}
    >
      <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* <DashedBorderBox> */}
        <InputFieldWrapper>
          <ProfileImageUploader image={image} setImage={setImage} />

          {/* </DashedBorderBox> */}

          <InputField
            label="닉네임"
            name="nickname"
            type="text"
            placeholder="사용하실 닉네임을 입력하세요"
            control={control}
            errorMessage={errors.nickname?.message as string}
            signup
            gap="8px"
            rules={{
              required: "닉네임은 필수 입력입니다.",
              minLength: {
                value: 2,
                message: "닉네임은 2자에서 20자까지 가능합니다.",
              },
              maxLength: {
                value: 20,
                message: "닉네임은 2자에서 20자까지 가능합니다.",
              },
            }}
          />
          <GenderSelector
            control={control}
            errorMessage={errors.gender?.message}
          />
          <MarketingAgreement
            control={control}
            errorMessage={errors.marketingAgree?.message}
          />
        </InputFieldWrapper>
        <Button
          type="submit"
          disabled={!isValid}
          $backgroudnColor={isValid ? "#2B77F5" : "#E6E6E6"}
          $textColor={isValid ? "#fff" : "#969696"}
          $borderRadius="10px"
        >
          프로필 설정 완료하기
        </Button>
      </Form>
    </AuthFormCard>
  );
};

export default SignupProfileTemplate;
