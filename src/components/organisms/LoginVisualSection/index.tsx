import {
  BackgroundImage,
  SubTitle,
  TextContainer,
  Title,
  Wrapper,
} from "./styles";

const LoginVisualSection = () => {
  return (
    <Wrapper>
      <BackgroundImage
        src="/assets/images/login/background.jpg"
        alt="Main background"
      />
      <TextContainer>
        <Title>HENCE</Title>
        <SubTitle>Connect</SubTitle>
      </TextContainer>
    </Wrapper>
  );
};

export default LoginVisualSection;
