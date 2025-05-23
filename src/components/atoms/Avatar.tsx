import styled from "styled-components";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number;
}

const AvatarWrapper = styled.div<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 24px;
  background: #f0f0f0;
  padding: 2px;
  gap: 10px;
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 24px;
  object-fit: cover;
`;

const Avatar = ({ src, alt = "User Avatar", size = 32 }: AvatarProps) => {
  return (
    <AvatarWrapper size={size}>
      {src ? <AvatarImage src={src} alt={alt} /> : null}
    </AvatarWrapper>
  );
};

export default Avatar;
