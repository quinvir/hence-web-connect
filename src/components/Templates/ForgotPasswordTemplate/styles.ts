import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 640px;
  max-width: 640px;
  margin: 0 auto;
  padding: 24px 0px 48px 0px;
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  h1 {
    color: #000;
    font-family: "SUIT Variable";
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 140%;
    letter-spacing: -0.25px;
  }
`;

export const InputFieldBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledMessage = styled.div`
  color: #000;
  text-align: center;
  font-family: "SUIT Variable";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.25px;
`;

export const StyledEmail = styled.span`
  color: #000;
  font-family: "SUIT Variable";
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%;
  letter-spacing: -0.25px;
`;
