import BackButton from "../../atoms/BackButton";
import { BackButtonBox, FormCardWrapper, TextBox } from "./styles";

interface AuthFormCardProps {
  title: string;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  showBackButton?: boolean;
}

const AuthFormCard = ({ title, subtitle, children }: AuthFormCardProps) => {
  return (
    <FormCardWrapper>
      <BackButtonBox>
        <BackButton />
      </BackButtonBox>
      <TextBox>
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </TextBox>
      {children}
    </FormCardWrapper>
  );
};

export default AuthFormCard;
