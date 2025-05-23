import { useForm } from "react-hook-form";
import { useState } from "react";
import InputField from "../../molecules/InputField";
import ProfileImageUploader from "../../molecules/ProfileImageUploader";
import Button from "../../atoms/Button";
import { ButtonBox, Container, Form } from "./styles";
import MarketingAgreement from "../../molecules/MarketingAgreement";
import BusinessTypeSelector from "../../molecules/BusinessTypeSelector";
import BusinessCategorySelector from "../../molecules/BusinessCategorySelector";
import { useNavigate } from "react-router-dom";
import AlertModal from "../../molecules/AlertModal";
import TextareaField from "../../molecules/TextareaField";

const BusinessProfileEditTemplate = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      businessType: "corporate",
      businessNumber: "",
      category: "푸드트럭",
      intro: "",
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
    // console.log("비즈니스 프로필 데이터:", data);

    setAlertType("saveConfirm");
    setAlertOpen(true);
  };

  return (
    <Container>
      <h1>비즈니스 기본 정보</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ProfileImageUploader
          image={image}
          setImage={setImage}
          variant="default"
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
                : "비즈니스 프로필이 저장되었어요."
            }
            onConfirm={handleAlertConfirm}
            onCancel={handleAlertConfirm}
          />
        )}
        <InputField
          label={
            <>
              상호명 <span style={{ color: "#E60000" }}>*</span>
            </>
          }
          name="name"
          type="text"
          placeholder="사용하실 상호명을 입력하세요"
          control={control}
          signup
          errorMessage={errors.name?.message}
          rules={{ required: "상호명은 필수입니다." }}
        />

        <InputField
          label={
            <>
              이메일 <span style={{ color: "#E60000" }}>*</span>
            </>
          }
          name="email"
          inputMode="email"
          type="text"
          placeholder="이메일을 입력하세요"
          control={control}
          signup
          errorMessage={errors.email?.message}
          rules={{
            required: "이메일은 필수입니다.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "올바른 이메일 형식이 아닙니다",
            },
          }}
        />

        <InputField
          label={
            <>
              연락처 <span style={{ color: "#E60000" }}>*</span>
            </>
          }
          name="phone"
          type="text"
          placeholder="연락처를 입력하세요"
          control={control}
          signup
          errorMessage={errors.phone?.message}
          rules={{
            required: "연락처는 필수입니다.",
            validate: (value) => {
              if (!value) return true;

              const [a = "", b = "", c = ""] = value.split("-");

              if (!a || !b || !c) return "전화번호 형식이 잘못되었습니다.";

              // 휴대폰
              if (/^01[016789]$/.test(a)) {
                if (a === "010") {
                  if (b.length !== 4) return "010 번호는 가운데 4자리여야 해요";
                } else {
                  if (b.length !== 3)
                    return `${a} 번호는 가운데 3자리여야 해요`;
                }

                if (c.length !== 4) return "휴대폰 번호는 4자리로 끝나야 해요";
                return true;
              }

              // 서울
              if (a === "02") {
                if (b.length < 3 || b.length > 4)
                  return "서울 번호의 가운데 자리는 3~4자리여야 해요";
                if (c.length !== 4) return "전화번호는 4자리로 끝나야 해요";
                return true;
              }

              // 지역번호
              if (/^0[3-6][1-9]$/.test(a)) {
                if (b.length < 3 || b.length > 4)
                  return "지역 번호의 가운데 자리는 3~4자리여야 해요";
                if (c.length !== 4) return "전화번호는 4자리로 끝나야 해요";
                return true;
              }

              return "유효한 전화번호 형식이 아닙니다.";
            },
          }}
        />

        <InputField
          label="주소"
          name="address"
          type="text"
          placeholder="주소를 입력하세요"
          control={control}
          signup
          errorMessage={errors.address?.message}
        />

        <BusinessTypeSelector
          control={control}
          errorMessage={errors.businessType?.message}
        />

        <InputField
          label={
            <>
              사업자 번호<span style={{ color: "#E60000" }}>*</span>
            </>
          }
          name="businessNumber"
          type="text"
          placeholder="123-12-12345"
          control={control}
          signup
          errorMessage={errors.businessNumber?.message}
          rules={{
            required: "사업자 번호는 필수입니다.",
            pattern: {
              value: /^\d{3}-\d{2}-\d{5}$/,
              message: "사업자등록번호 형식이 올바르지 않습니다.",
            },
          }}
        />

        <BusinessCategorySelector
          control={control}
          errorMessage={errors.category?.message}
        />

        <TextareaField
          label="비즈니스 소개"
          name="intro"
          placeholder="내 비즈니스에 대한 간단한 소개를 입력하세요"
          control={control}
          errorMessage={errors.intro?.message}
        />

        <InputField
          label="인스타그램"
          name="instagram"
          type="text"
          placeholder="인스타그램 링크를 입력하세요"
          control={control}
          signup
          errorMessage={errors.instagram?.message}
        />

        <InputField
          label="카카오 채널/오픈채팅"
          name="kakaotalk"
          type="text"
          placeholder="카카오 채널/오픈채팅 링크를 입력하세요"
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
            disabled={!isValid}
          >
            프로필 저장하기
          </Button>
        </ButtonBox>
      </Form>
    </Container>
  );
};

export default BusinessProfileEditTemplate;
