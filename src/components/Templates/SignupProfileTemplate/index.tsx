import { useForm } from "react-hook-form";
import AuthFormCard from "../../organisms/AuthFormCard";
import InputField from "../../molecules/InputField";
import Button from "../../atoms/Button";
import ProfileImageUploader from "../../molecules/ProfileImageUploader";
import { Form, InputFieldWrapper } from "./styles";
import { useEffect, useState } from "react";
import GenderSelector from "../../molecules/GenderSelector";
import MarketingAgreement from "../../molecules/MarketingAgreement";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserStore } from "../../../stores/userStore";
import AlertModal from "../../molecules/AlertModal";
import { useUploadProfileImage } from "../../../hooks/useUploadProfileImage";
import { useSignup } from "../../../hooks/useSignup";
import { errorCodeMap } from "../../../constants/errorCode";

const SignupProfileTemplate = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      nickname: "",
      gender: "FEMALE",
      marketingAgree: "yes",
    },
  });

  const [image, setImage] = useState<string | null>(null);

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

  const { setNickname, setProfileImage } = useUserStore();

  const { mutateAsync: uploadImage } = useUploadProfileImage();
  const { mutateAsync: signupUser } = useSignup();

  const location = useLocation();
  const navigate = useNavigate();

  const { email, password } = location.state || {};

  // 새로고침시 state 사라짐 -> 이전 화면으로 이동
  if (!email || !password) {
    navigate("/signup", { replace: true });
    return null;
  }

  const onSubmit = async (data: any) => {
    let uploadedImageUrl = "";

    try {
      if (image) {
        const blob = await (await fetch(image)).blob();
        const formData = new FormData();
        formData.append("file", blob, "profile.png");

        const res = await uploadImage(formData);
        const { code, data } = res.data;

        if (code !== 200) {
          const msg =
            errorCodeMap[code.toString()] ??
            "이미지 업로드 중 오류가 발생했습니다.";
          showAlert("Error", msg);
          return;
        }

        uploadedImageUrl = data.url;
      }
    } catch (uploadError) {
      console.error("이미지 업로드 실패", uploadError);
      showAlert("Error", [
        "프로필 이미지 업로드에 실패했습니다.",
        "잠시 후 다시 시도해 주세요.",
      ]);
      return;
    }

    try {
      const payload = {
        email,
        password,
        nickname: data.nickname,
        gender: data.gender,
        marketingAgree: data.marketingAgree === "yes",
        profileImageUrl: uploadedImageUrl,
      };

      const res = await signupUser(payload);
      const { code } = res.data;

      if (code !== 200) {
        const msg = errorCodeMap[code.toString()] ?? [
          "회원가입에 실패했습니다.",
          "다시 시도해주세요.",
        ];
        showAlert("Error", msg);
        return;
      }

      setNickname(data.nickname);
      setProfileImage(uploadedImageUrl);
      navigate("/welcome");
    } catch (signupError) {
      console.error("회원가입 실패", signupError);
      showAlert("Error", [
        "회원가입에 실패했습니다.",
        "잠시 후 다시 시도해 주세요.",
      ]);
    }
  };

  return (
    <AuthFormCard
      title="가입 완료하기 👍"
      subtitle={<>작성한 정보는 얼마든지 변경이 가능하니 걱정마세요 😌</>}
    >
      <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <InputFieldWrapper>
          <ProfileImageUploader
            image={image}
            setImage={setImage}
            onFileTooLarge={() =>
              showAlert(
                "파일 용량 초과",
                "2MB 이하의 이미지만 업로드할 수 있어요."
              )
            }
            onError={(msg) => showAlert("Error", msg)}
          />
          {alertOpen && (
            <AlertModal
              type="confirmOnly"
              title={alertTitle}
              message={alertMessage}
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
            errorMessage={
              touchedFields.nickname ? (errors.nickname?.message as string) : ""
            }
            signup
            gap="8px"
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
