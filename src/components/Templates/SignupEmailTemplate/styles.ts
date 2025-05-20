import styled from "styled-components";

export const Form = styled.form`
  width: 360px;
  height: auto;
  margin: 0 auto;
`;

export const InputFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
`;

export const Highlight = styled.span`
  color: #000;
  font-family: "Titan One", sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.25px;
`;

export const ButonBox = styled.div`
  margin-bottom: 24px;
`;

export const NoticeBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-family: "SUIT Variable";
  font-size: 12px;
  line-height: 140%;
  letter-spacing: -0.25px;

  p {
    font-weight: 400;
  }

  span {
    font-weight: 700;
    text-decoration-line: underline;
    text-decoration-style: solid;
    text-decoration-skip-ink: auto;
    text-decoration-thickness: auto;
    text-underline-offset: auto;
    text-underline-position: from-font;
  }
`;
