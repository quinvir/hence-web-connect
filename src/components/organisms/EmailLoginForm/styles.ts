import styled from "styled-components";
import Button from "../../atoms/Button";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SubRow = styled.div`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
`;

export const TextButton = styled.div`
  text-align: center;
  font-family: "SUIT Variable";
  line-height: 140%;
  letter-spacing: -0.25px;
`;

export const UnderlinedTextButton = styled(Button)`
  font-family: "SUIT Variable";
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-skip-ink: auto;
  text-decoration-thickness: auto;
  text-underline-offset: auto;
  text-underline-position: from-font;
  color: #646464;
  font-size: 14px;
  font-weight: 400;
`;

export const FooterText = styled.div`
  font-family: "SUIT Variable";
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;

  p {
    color: #646464;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    line-height: 140%;
    letter-spacing: -0.25px;
  }
`;
