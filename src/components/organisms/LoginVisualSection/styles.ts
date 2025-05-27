import styled from "styled-components";

export const Wrapper = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-align: center;
  text-shadow: 0px 4px 20px rgba(0, 0, 0, 0.6);
  font-family: "Titan One", sans-serif;
  font-weight: 400;
  letter-spacing: -0.25px;
  overflow: hidden;
`;

export const BackgroundImage = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background-image: url("/assets/images/login/background.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 0;
`;

export const TextContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
`;

export const Title = styled.h1`
  font-size: clamp(3rem, 9vw, 9.375rem);
  line-height: 100%;
`;

export const SubTitle = styled.h2`
  font-size: clamp(1.5rem, 4vw, 3rem);
  line-height: 140%;
`;
