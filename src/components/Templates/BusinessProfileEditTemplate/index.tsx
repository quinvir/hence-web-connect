import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import InputField from "../../molecules/InputField";
import ProfileImageUploader from "../../molecules/ProfileImageUploader";
import Button from "../../atoms/Button";
import { ButtonBox, Container, Form, TempBox } from "./styles";
import BusinessTypeSelector from "../../molecules/BusinessTypeSelector";
import BusinessCategorySelector from "../../molecules/BusinessCategorySelector";
import { useNavigate } from "react-router-dom";
import AlertModal from "../../molecules/AlertModal";
import TextareaField from "../../molecules/TextareaField";
import { useUploadProfileImage } from "../../../hooks/usePrivateImageUpload";
import { errorCodeMap } from "../../../constants/errorCode";
import {
  useBusinessProfile,
  useCreateBusinessProfile,
  useUpdateBusinessProfile,
} from "../../../hooks/useBusinessProfile";
import { useUserStore } from "../../../stores/userStore";
import { useBusinessUserStore } from "../../../stores/businessUserStore";

const BusinessProfileEditTemplate = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
    setValue,
    clearErrors,
    watch,
    reset,
    formState,
  } = useForm({
    mode: "onChange",
    shouldUnregister: true,
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
      businessType: "CORPORATION",
      businessNumber: "",
      businessCategory: "FOOD_TRUCK",
      introduction: "",
      instagram: "",
      kakao: "",
    },
  });

  const [image, setImage] = useState<string | null>(null);

  const showAlert = (title: string, message: string | string[]) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertOpen(true);
  };

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("알림");
  const [alertMessage, setAlertMessage] = useState<string | string[]>([]);

  const navigate = useNavigate();

  const handleAlertConfirm = () => {
    setAlertOpen(false);
  };

  const businessType = watch("businessType");
  const isSimplified = businessType === "SIMPLIFIED";

  const errors = formState.errors;

  // 개인&법인 <-> 간이과세자 버튼 전환시 입력 필드 비우기
  useEffect(() => {
    const errorExists = !!formState.errors.businessNumber;
    const value = watch("businessNumber");

    if (businessType === "SIMPLIFIED") {
      if (errorExists || (value && !/^\d{6}$/.test(value))) {
        setValue("businessNumber", "");
        clearErrors("businessNumber");
      }
    } else {
      if (errorExists || (value && !/^\d{3}-\d{2}-\d{5}$/.test(value))) {
        setValue("businessNumber", "");
        clearErrors("businessNumber");
      }
    }
  }, [businessType]);

  const { businessUser, setBusinessUser, clearBusinessUser } =
    useBusinessUserStore();
  const { data } = useBusinessProfile(businessUser?.id || "");

  const { mutate: createBusinessProfile } = useCreateBusinessProfile();
  const { mutate: updateBusinessProfile } = useUpdateBusinessProfile(
    businessUser?.id || ""
  );
  const { mutateAsync: uploadImage } = useUploadProfileImage();
  const isEdit = !!businessUser?.id;

  useEffect(() => {
    if (businessUser) {
      reset({
        name: businessUser.name ?? "",
        email: businessUser.email ?? "",
        phoneNumber: businessUser.phoneNumber ?? "",
        address: businessUser.address ?? "",
        businessType: businessUser.businessType ?? "INDIVIDUAL",
        businessNumber: businessUser.businessNumber ?? "",
        businessCategory: businessUser.businessCategory ?? "FOOD_TRUCK",
        introduction: businessUser.introduction ?? "",
        instagram: businessUser.instagram ?? "",
        kakao: businessUser.kakao ?? "",
      });
      setImage(businessUser.thumbImageUrl ?? null);
    }
  }, []);

  useEffect(() => {
    if (data?.code === 200 && data.data) {
      const fetched = data.data;
      setBusinessUser(fetched);
      reset({
        name: fetched.name ?? "",
        email: fetched.email ?? "",
        phoneNumber: fetched.phoneNumber ?? "",
        address: fetched.address ?? "",
        businessType: fetched.businessType ?? "INDIVIDUAL",
        businessNumber: fetched.businessNumber ?? "",
        businessCategory: fetched.businessCategory ?? "FOOD_TRUCK",
        introduction: fetched.introduction ?? "",
        instagram: fetched.instagram ?? "",
        kakao: fetched.kakao ?? "",
      });
      setImage(fetched.thumbImageUrl ?? null);
    } else if (data?.code === 3000) {
      // 벤더 정보 없음 ->  상태 초기화
      clearBusinessUser();
      reset();
      setImage(null);
    }
  }, [data]);

  const onSubmit = async (data: any) => {
    let uploadedImageUrl = image ?? "";

    try {
      if (image && image.startsWith("data:")) {
        const blob = await (await fetch(image)).blob();
        const formData = new FormData();
        formData.append("file", blob, "business-profile.png");

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
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      address: data.address,
      businessType: data.businessType,
      businessNumber: data.businessNumber,
      businessCategory: data.businessCategory,
      introduction: data.intro ?? "",
      instagram: data.instagram ?? "",
      kakao: data.kakaotalk ?? "",
      thumbImageUrl: uploadedImageUrl,
    };

    if (businessUser?.id) {
      // 수정
      updateBusinessProfile(payload, {
        onSuccess: (profile) => {
          showAlert("수정 완료", "비즈니스 프로필이 수정되었어요.");
        },
        onError: (err: any) => {
          const msg =
            err.errors?.map((e: any) => e.msg).join("\n") ??
            errorCodeMap[String(err.code)] ??
            err.message ??
            "비즈니스 프로필 수정에 실패했습니다.";
          showAlert("Error", msg);
        },
      });
    } else {
      // 등록
      createBusinessProfile(payload, {
        onSuccess: (profile) => {
          showAlert("저장 완료", "비즈니스 프로필이 저장되었어요.");
        },
        onError: (err: any) => {
          const msg =
            err.errors?.map((e: any) => e.msg).join("\n") ??
            errorCodeMap[String(err.code)] ??
            err.message ??
            "비즈니스 프로필 등록에 실패했습니다.";
          showAlert("Error", msg);
        },
      });
    }
  };

  return (
    <Container>
      {/* <h1>비즈니스 기본 정보</h1> */}
      <TempBox>
        <h1>비즈니스 기본 정보</h1>
        <Button
          onClick={() => navigate("/products/new")}
          width="150px"
          height="40px"
          $backgroudnColor="#fcfbd9"
          fontSize="15px"
          fontWeight={600}
        >
          + 판매 물품 추가
        </Button>
      </TempBox>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ProfileImageUploader
          image={image}
          setImage={setImage}
          variant="business"
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
          name="phoneNumber"
          type="text"
          placeholder="연락처를 입력하세요"
          control={control}
          signup
          errorMessage={errors.phoneNumber?.message}
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
              {isSimplified ? "생년월일(6자리)" : "사업자 번호"}
              <span style={{ color: "#E60000" }}>*</span>
            </>
          }
          name="businessNumber"
          type="text"
          placeholder={isSimplified ? "900101" : "123-12-12345"}
          control={control}
          signup
          isSimplified={isSimplified}
          errorMessage={errors.businessNumber?.message}
          rules={{
            required: isSimplified
              ? "생년월일은 필수입니다."
              : "사업자 번호는 필수입니다.",
            pattern: {
              value: isSimplified ? /^\d{6}$/ : /^\d{3}-\d{2}-\d{5}$/,
              message: isSimplified
                ? "생년월일은 6자리 숫자로 입력해 주세요 (예: 900101)"
                : "사업자등록번호 형식이 올바르지 않습니다.",
            },
          }}
        />

        <BusinessCategorySelector
          control={control}
          errorMessage={errors.businessCategory?.message}
        />

        <TextareaField
          label="비즈니스 소개"
          name="intro"
          placeholder="내 비즈니스에 대한 간단한 소개를 입력하세요"
          control={control}
          errorMessage={errors.introduction?.message}
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
          errorMessage={errors.kakao?.message}
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
            프로필 {isEdit ? "수정" : "등록"}하기
          </Button>
        </ButtonBox>
      </Form>
    </Container>
  );
};

export default BusinessProfileEditTemplate;
