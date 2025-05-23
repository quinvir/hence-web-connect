import { useForm } from "react-hook-form";
import Button from "../../atoms/Button";
import InputField from "../../molecules/InputField";
import GenderSelector from "../../molecules/GenderSelector";
import MarketingAgreement from "../../molecules/MarketingAgreement";
import ProfileImageUploader from "../../molecules/ProfileImageUploader";
import { useEffect, useState } from "react";
import { ButtonBox, Container, Form, TempBox } from "./styles";
import TextareaField from "../../molecules/TextareaField";
import AlertModal from "../../molecules/AlertModal";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../../stores/userStore";
import { useUpdateProfile } from "../../../hooks/useUpdateProfile";
import { errorCodeMap } from "../../../constants/errorCode";
import { useUploadProfileImage } from "../../../hooks/useUploadProfileImage";
import { useUserProfile } from "../../../hooks/useUserProfile";

const UserProfileEditTemplate = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      nickname: "",
      gender: "FEMALE",
      bio: "",
      instagram: "",
      kakaotalk: "",
      marketingAgree: "yes",
    },
  });

  const [image, setImage] = useState<string | null>(null);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("알림");
  const [alertMessage, setAlertMessage] = useState<string | string[]>([]);

  const { user, updateUser } = useUserStore();
  const { data, isLoading } = useUserProfile();

  // console.log("User 정보 get:", user);

  // 최초 Zustand user로 reset
  useEffect(() => {
    if (user) {
      reset({
        nickname: user.name ?? "",
        gender: user.gender ?? "FEMALE",
        bio: user.introduction ?? "",
        instagram: user.instagram ?? "",
        kakaotalk: user.kakao ?? "",
        marketingAgree: user.marketingConsent ? "yes" : "no",
      });
      setImage(user.profileImageUrl ?? null);
    }
  }, []);

  // 최신 user 동기화용 GET API
  useEffect(() => {
    if (data?.code === 200 && data.data) {
      const fetched = data.data;
      updateUser(fetched);
      reset({
        nickname: fetched.name ?? "",
        gender: fetched.gender ?? "FEMALE",
        bio: fetched.introduction ?? "",
        instagram: fetched.instagram ?? "",
        kakaotalk: fetched.kakao ?? "",
        marketingAgree: fetched.marketingConsent ? "yes" : "no",
      });
      setImage(fetched.profileImageUrl ?? null);
    }
  }, [data]);
  const navigate = useNavigate();

  const handleAlertConfirm = () => {
    setAlertOpen(false);
  };

  const { mutate: updateProfile } = useUpdateProfile();
  const { mutateAsync: uploadImage } = useUploadProfileImage();

  const showAlert = (title: string, message: string | string[]) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertOpen(true);
  };

  const onSubmit = async (data: any) => {
    let uploadedImageUrl = image ?? "";

    try {
      // 새 이미지 업로드가 필요한 경우 (base64)
      if (image && image.startsWith("data:")) {
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
    } catch (err) {
      console.error("이미지 업로드 실패", err);
      showAlert("Error", [
        "프로필 이미지 업로드에 실패했습니다.",
        "잠시 후 다시 시도해 주세요.",
      ]);
      return;
    }

    const payload = {
      name: data.nickname,
      gender: data.gender,
      introduction: data.bio ?? "",
      instagram: data.instagram ?? "",
      kakao: data.kakaotalk ?? "",
      marketingConsent: data.marketingAgree === "yes",
      profileImageUrl: uploadedImageUrl,
    };

    updateProfile(payload, {
      onSuccess: () => {
        showAlert("저장 완료", "프로필이 저장되었어요.");
      },
      onError: (err: any) => {
        const msg = errorCodeMap[String(err.code)] ??
          err.message ?? ["프로필 수정에 실패했습니다.", "다시 시도해 주세요."];
        showAlert("Error", msg);
      },
    });
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
            showAlert(
              "파일 용량 초과",
              "2MB 이하의 이미지만 업로드할 수 있어요."
            );
          }}
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
