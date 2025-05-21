import styled from "styled-components";

export const FormCardWrapper = styled.section`
  position: relative;
  width: 640px;
  height: auto;
  min-height: 640px;
  min-width: 500px;
  max-width: 720px;
  margin: 0 auto;
  padding: 64px 0;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    color: #000;
    font-family: "SUIT Variable";
    font-size: 36px;
    font-style: normal;
    font-weight: 400;
  }

  h1:first-child span {
    color: #000;
    text-align: center;
    font-family: "Titan One";
    font-size: 36px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%;
    letter-spacing: -0.25px;
  }

  h1:last-child span {
    fcolor: #000;
    font-family: "SUIT Variable";
    font-size: 36px;
    font-style: normal;
    font-weight: 700;
    line-height: 160%;
    letter-spacing: -0.25px;
  }
`;

export const ImageBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 240px;
    height: 240px;
  }
`;

export const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
