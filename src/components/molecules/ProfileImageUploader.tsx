import { useState, ChangeEvent } from "react";
import styled from "styled-components";

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
  height: 88px;
  padding: 24px;
  justify-content: space-between;
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
  width: 80px;
  height: 80px;
  align-items: center;
  justify-content: center;
  border-radius: 70px;
  background: #f0f0f0;
  margin: 0 auto;
  gap: 10px;
  padding: 4px;
`;

const PreviewImage = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 70px;
  object-fit: cover;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: -8px;
  right: -8px;
  width: 32px;
  height: 32px;
  color: #fff;
  border: none;
  border-radius: 50%;
  font-size: 14px;
  cursor: pointer;
`;

const ImageBox = styled.div`
  display: flex;
  width: 64px;
  height: 64px;
  padding: 0px 16px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background: #fafafa;
`;

interface Props {
  image: string | null;
  setImage: (url: string | null) => void;
}

const ProfileImageUploader = ({ image, setImage }: Props) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("2MB 이하만 업로드 가능합니다.");
      return;
    }

    const previewURL = URL.createObjectURL(file);
    setImage(previewURL);
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
          <PreviewImage src={image} alt="Preview profile" />
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
          <ImageBox>
            <img
              src="/assets/images/icon/upload-image.png"
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
