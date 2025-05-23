import { useState } from "react";
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
      <BackgroundImage />
      <TextContainer>
        <Title>HENCE</Title>
        <SubTitle>Connect</SubTitle>
      </TextContainer>
    </Wrapper>
  );
};

export default LoginVisualSection;
