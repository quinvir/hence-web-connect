import { useState } from "react";
import {
  BackgroundImage,
  SubTitle,
  TextContainer,
  Title,
  Wrapper,
} from "./styles";

const LoginVisualSection = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Wrapper>
      <BackgroundImage
        src="/assets/images/login/background.jpg"
        alt="Main background"
        onLoad={() => setImageLoaded(true)}
      />
      {imageLoaded && (
        <TextContainer>
          <Title>HENCE</Title>
          <SubTitle>Connect</SubTitle>
        </TextContainer>
      )}
    </Wrapper>
  );
};

export default LoginVisualSection;
