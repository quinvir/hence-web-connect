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
  const navigate = useNavigate();

  const handleAlertConfirm = () => {
    setAlertOpen(false);
  };

  const onSubmit = (data: any) => {
    // console.log("비즈니스 프로필 데이터:", data);

    setAlertOpen(true);
  };

  return (
    <Container>
      <h1>비즈니스 프로필 수정하기</h1>
      {/* {alertOpen && (
        <AlertModal
          type="confirmOnly"
          message="비지니스 프로필이 저장 완료되었습니다."
          onConfirm={handleAlertConfirm}
          onCancel={handleAlertConfirm}
        />
      )} */}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <ProfileImageUploader
          image={image}
          setImage={setImage}
          variant="default"
          onFileTooLarge={() => setAlertOpen(true)}
        />
        {alertOpen && (
          <AlertModal
            type="confirmOnly"
            message="2MB 이하의 이미지만 업로드할 수 있어요."
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
          type="email"
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
            pattern: {
              value: /^[0-9]*$/,
              message: "숫자만 입력 가능합니다.",
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
              value: /^[0-9]*$/,
              message: "숫자만 입력 가능합니다.",
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
