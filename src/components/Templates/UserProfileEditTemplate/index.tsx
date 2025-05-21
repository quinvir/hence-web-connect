import { useForm } from "react-hook-form";
import Button from "../../atoms/Button";
import InputField from "../../molecules/InputField";
import GenderSelector from "../../molecules/GenderSelector";
import MarketingAgreement from "../../molecules/MarketingAgreement";
import ProfileImageUploader from "../../molecules/ProfileImageUploader";
import { useState } from "react";
import { ButtonBox, Container, Form, TempBox } from "./styles";
import TextareaField from "../../molecules/TextareaField";
import AlertModal from "../../molecules/AlertModal";
import { useNavigate } from "react-router-dom";

const UserProfileEditTemplate = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      nickname: "",
      gender: "female",
      bio: "",
      instagram: "",
      kakaotalk: "",
      marketingAgree: "yes",
    },
  });

  const [image, setImage] = useState<string | null>(null);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState<"fileSize" | "saveConfirm" | null>(
    null
  );

  const navigate = useNavigate();

  const handleAlertConfirm = () => {
    setAlertOpen(false);
  };

  const onSubmit = (data: any) => {
    // console.log("프로필 수정 데이터:", data);

    setAlertType("saveConfirm");
    setAlertOpen(true);
  };

  return (
    <Container>
      <TempBox>
        <h1>개인 프로필 수정하기</h1>
        <Button
          onClick={() => navigate("/profile/business/edit")}
          width="150px"
          height="40px"
          $backgroudnColor="#f2eafe"
          fontSize="15px"
          fontWeight={600}
        >
          + 비즈니스 프로필
        </Button>
      </TempBox>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ProfileImageUploader
          image={image}
          setImage={setImage}
          variant="user"
          onFileTooLarge={() => {
            setAlertType("fileSize");
            setAlertOpen(true);
          }}
        />
        {alertOpen && (
          <AlertModal
            type="confirmOnly"
            title={alertType === "fileSize" ? "파일 용량 초과" : "저장 완료"}
            message={
              alertType === "fileSize"
                ? "2MB 이하의 이미지만 업로드할 수 있어요."
                : "프로필이 저장되었어요."
            }
            onConfirm={handleAlertConfirm}
            onCancel={handleAlertConfirm}
          />
        )}

        <InputField
          label={
            <>
              닉네임 <span style={{ color: "#E60000" }}>*</span>
            </>
          }
          name="nickname"
          type="text"
          placeholder="사용하실 닉네임을 입력하세요"
          control={control}
          signup
          errorMessage={errors.nickname?.message}
          rules={{
            required: "닉네임은 필수 입력입니다.",
            minLength: {
              value: 2,
              message: "닉네임은 2자에서 20자까지 가능해요.",
            },
            maxLength: {
              value: 20,
              message: "닉네임은 2자에서 20자까지 가능해요.",
            },
            pattern: {
              value: /^[a-zA-Z0-9가-힣]+$/,
              message: "닉네임에는 한글, 영문, 숫자만 사용할 수 있어요.",
            },
          }}
        />
        <GenderSelector
          control={control}
          errorMessage={errors.gender?.message}
        />
        <TextareaField
          label="자기 소개"
          name="bio"
          control={control}
          placeholder="간단하게 자기소개를 입력하세요"
          errorMessage={errors.bio?.message}
          rules={{
            maxLength: {
              value: 300,
              message: "최대 300자까지 입력할 수 있어요.",
            },
          }}
        />
        <InputField
          label="인스타그램"
          name="instagram"
          type="text"
          placeholder="사용하실 인스타그램 아이디를 입력하세요"
          control={control}
          signup
          errorMessage={errors.instagram?.message}
        />

        <InputField
          label="카카오 채널/오픈채팅"
          name="kakaotalk"
          type="text"
          placeholder="사용하실 카카오 채널/오픈채팅 링크를 입력하세요"
          control={control}
          signup
          errorMessage={errors.kakaotalk?.message}
        />
        <MarketingAgreement
          control={control}
          errorMessage={errors.marketingAgree?.message}
        />
        <ButtonBox>
          <Button
            type="submit"
            width="300px"
            $backgroudnColor={isValid ? "#2B77F5" : "#E6E6E6"}
            $textColor={isValid ? "#fff" : "#969696"}
            $borderRadius="10px"
          >
            프로필 저장하기
          </Button>
        </ButtonBox>
      </Form>
    </Container>
  );
};

export default UserProfileEditTemplate;
