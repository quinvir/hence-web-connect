import styled from "styled-components";

export const FormCardWrapper = styled.div`
  position: relative;
  width: 640px;
  height: auto;
  min-height: 640px;
  min-width: 500px;
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 64px 0;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
`;

export const BackButtonBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding-left: 24px;
`;

export const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;

  h2 {
    color: #000;
    font-family: "SUIT Variable";
    font-size: 24px;
    font-weight: 700;
    line-height: 140%;
    letter-spacing: -0.25px;
  }

  p {
    color: #646464;
    font-family: "SUIT Variable";
    font-size: 14px;
    font-weight: 400;
    line-height: 140%;
    letter-spacing: -0.25px;
  }
`;
