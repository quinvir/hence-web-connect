interface AvatarProps {
  src: string;
  alt?: string;
  size?: number;
}

const Avatar = ({ src, alt = "User Avatar", size = 32 }: AvatarProps) => {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className="rounded-full object-cover"
    />
  );
};

export default Avatar;
