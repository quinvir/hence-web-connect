import { useEffect, useState } from "react";
import {
  BackgroundImage,
  SubTitle,
  TextContainer,
  Title,
  Wrapper,
} from "./styles";

const LoginVisualSection = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "/assets/images/login/background.jpg";
    img.onload = () => setLoaded(true);
  }, []);

  return (
    <Wrapper>
      <BackgroundImage $loaded={loaded} />
      <TextContainer>
        <Title>HENCE</Title>
        <SubTitle>Connect</SubTitle>
      </TextContainer>
    </Wrapper>
  );
};

export default LoginVisualSection;
