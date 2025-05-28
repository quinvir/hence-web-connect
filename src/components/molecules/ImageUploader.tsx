import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { useImageUploader } from "../../hooks/image/useImageUploader";
import fileToBase64 from "../../utils/fileToBase64";

const ImageBox = styled.label<{ $isThumbnail?: boolean }>`
  display: flex;
  width: 80px;
  height: 80px;
  padding: ${({ $isThumbnail }) => ($isThumbnail ? "0px" : "0px 16px;")};
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background: #fafafa;
  cursor: pointer;
  position: relative;

  img {
    width: ${({ $isThumbnail }) => ($isThumbnail ? "80px" : "32px")};
    height: ${({ $isThumbnail }) => ($isThumbnail ? "80px" : "32px")};
    object-fit: cover;
    border-radius: 12px;
  }

  input {
    display: none;
  }
`;

const RemoveButton = styled.button`
  position: absolute;
  top: -6px;
  right: -6px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

interface Props {
  value: string | null;
  onChange: (url: string | null) => void;
  variant?: "default" | "profile" | "product";
  onFileTooLarge?: () => void;
  onError?: (message: string) => void;
  inputId?: string;
}

const ImageUploader = ({
  value,
  onChange,
  variant = "default",
  onFileTooLarge,
  onError,
  inputId,
}: Props) => {
  const { handleUpload } = useImageUploader({ onFileTooLarge, onError });
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";

    if (!file) return;

    setThumbnail(URL.createObjectURL(file));

    const downloadUrl = await handleUpload(file);

    if (downloadUrl) {
      onChange(downloadUrl);
      setThumbnail(null);
    }
  };

  const handleRemove = () => {
    onChange(null);
    setThumbnail(null);
  };

  const displayImage = thumbnail || value;
  const isThumbnail =
    !!displayImage && !displayImage.includes("upload-image.png");

  return (
    <ImageBox htmlFor={inputId} $isThumbnail={isThumbnail}>
      <img
        src={displayImage || "/assets/images/img/upload-image.png"}
        alt="Upload"
      />
      <input
        type="file"
        id={inputId}
        accept="image/*"
        onChange={handleFileChange}
      />
      {/* {isThumbnail && (
        <RemoveButton type="button" onClick={handleRemove}>
          <img
            src="/assets/images/icon/upload-remove.svg"
            alt="삭제"
            width={24}
            height={24}
          />
        </RemoveButton>
      )} */}
    </ImageBox>
  );
};

export default ImageUploader;
