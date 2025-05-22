import { useState, ChangeEvent } from "react";
import styled from "styled-components";
import fileToBase64 from "../../utils/fileToBase64";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ProfileImageLabel = styled.div`
  font-family: "SUIT Variable";
  font-size: 14px;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.25px;

  p {
    color: #000;
  }

  span {
    color: #646464;
  }
`;

const UploadBox = styled.label`
  position: relative;
  display: flex;
  gap: 24px;
  height: 88px;
  padding: 24px;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  cursor: pointer;
  border-radius: 10px;
  border: 1px dashed #d9d9d9;

  &:hover {
    background-color: #f0f0f0;
  }

  input {
    display: none;
  }
`;

const Instruction = styled.div`
  display: flex;
  flex-direction: column;

  font-family: "SUIT Variable";
  font-size: 14px;
  line-height: 140%;
  letter-spacing: -0.25px;

  p {
    color: #999;
    font-weight: 400;
  }

  span {
    color: #2b77f5;
    font-weight: 700;
  }
`;

const PreviewWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  margin: 0 auto;
`;

const ImageOuterCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
  padding: 4px;
  border-radius: 70px;
  background-color: #f0f0f0;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 70px;
  object-fit: cover;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: -1px;
  right: -1px;
  width: 32px;
  height: 32px;
  color: #fff;
  border: none;
  border-radius: 50%;
  font-size: 14px;
  cursor: pointer;
`;

const ImageBox = styled.div<{ $isUserProfile?: boolean }>`
  display: flex;
  width: 64px;
  height: 64px;
  padding: 0px 16px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background: ${({ $isUserProfile }) =>
    $isUserProfile ? "#2B77F51A" : "#fafafa"};
`;

interface Props {
  image: string | null;
  setImage: (url: string | null) => void;
  variant?: "default" | "user";
  onFileTooLarge?: () => void;
  onError?: (message: string) => void;
}

const ProfileImageUploader = ({
  image,
  setImage,
  variant = "default",
  onFileTooLarge,
  onError,
}: Props) => {
  const MAX_FILE_SIZE_MB = 2;
  const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";

    if (!file) return;

    if (file.size > MAX_FILE_SIZE_BYTES) {
      onFileTooLarge?.();
      return;
    }

    try {
      const base64 = await fileToBase64(file);
      setImage(base64);
    } catch (error) {
      console.error("파일 변환 실패", error);
      onError?.("이미지를 처리할 수 없습니다.");
    }
  };

  const handleRemove = () => setImage(null);

  return (
    <Wrapper>
      <ProfileImageLabel>
        <p>
          프로필 사진 <span>(선택)</span>
        </p>
      </ProfileImageLabel>
      {image ? (
        <PreviewWrapper>
          <ImageOuterCircle>
            <PreviewImage
              src={image}
              alt={variant === "user" ? "User profile" : "Business profile"}
            />
          </ImageOuterCircle>
          <RemoveButton onClick={handleRemove}>
            <img
              src="/assets/images/icon/upload-remove.svg"
              alt="닫기"
              style={{ width: "32px", height: "32px" }}
            />
          </RemoveButton>
        </PreviewWrapper>
      ) : (
        <UploadBox>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <ImageBox $isUserProfile={variant === "user"}>
            <img
              src={
                variant === "user"
                  ? "/assets/images/img/upload-image-user.png"
                  : "/assets/images/img/upload-image.png"
              }
              alt="placeholder"
              style={{ width: "32px", height: "32px" }}
            />
          </ImageBox>
          <Instruction>
            <p>사진을 업로드 해주세요.</p>
            <p>
              <span>2MB</span> 이하의 파일만 업로드 할 수 있어요.
            </p>
          </Instruction>
        </UploadBox>
      )}
    </Wrapper>
  );
};

export default ProfileImageUploader;
